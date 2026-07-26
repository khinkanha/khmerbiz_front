import { acceptHMRUpdate, defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { useDomainStore } from '~/stores/domain'
import type { SiteDesign, DesignStyle, DesignColors, SectionSlot, HeaderDesign, FooterDesign, DesignPreset } from '~/types'
import { defaultDesign, defaultStyle, defaultHeader, defaultFooter } from '~/types/design'

// ============================================================================
// Design store — holds the tenant's SiteDesign and persists it.
//
// Persistence strategy (so Phase 1 works BEFORE the backend `site_designs`
// table/endpoints exist):
//   1. Production zero-flash path: the design ships inside the SSR payload as
//      window.__NUXT_DESIGN__ (injected by server/plugins/domain-hydration.ts
//      once the backend adds `design` to GET /site/config). hydrateFromServer()
//      reads it synchronously on mount.
//   2. Admin load: GET /admin/design?domain_id=. Once the backend is ready,
//      this is the source of truth.
//   3. Dev fallback: a domain-scoped localStorage key (kb_design_<id>). Shared
//      same-origin between the admin builder and the public site, so color
//      changes made in the builder show on the public site after a reload even
//      with no backend.
//   4. Lazy seed: if nothing exists yet, seed from the current settings.theme
//      so a tenant's existing look is preserved until they actively design.
// ============================================================================

const LS_PREFIX = 'kb_design_'

const lsKey = (domainId: number | null | undefined) => `${LS_PREFIX}${domainId ?? 'local'}`

const readLs = (domainId?: number | null): SiteDesign | null => {
  if (!import.meta.client) return null
  try {
    const raw = localStorage.getItem(lsKey(domainId))
    return raw ? (JSON.parse(raw) as SiteDesign) : null
  } catch {
    return null
  }
}

const writeLs = (design: SiteDesign) => {
  if (!import.meta.client) return
  localStorage.setItem(lsKey(design.domain_id), JSON.stringify(design))
}

const normalize = (d: Partial<SiteDesign> | null | undefined, domainId: number | null): SiteDesign => ({
  version: d?.version ?? 1,
  domain_id: d?.domain_id ?? domainId,
  style: d?.style ?? defaultStyle(),
  header: d?.header ?? null,
  footer: d?.footer ?? null,
  pages: d?.pages ?? {},
})

export const useDesignStore = defineStore('design', () => {
  const api = useApi()

  const design = ref<SiteDesign | null>(null)
  const loading = ref(false)
  const saving = ref(false)
  const dirty = ref(false)

  const style = computed(() => design.value?.style ?? null)

  // ---- Phase 4: undo / redo ------------------------------------------------
  // Every mutation replaces design.value immutably, so a flush:'sync' watcher
  // on the ref captures each change. `muted` suppresses recording during
  // initial load and during undo/redo themselves.
  const past = ref<SiteDesign[]>([])
  const future = ref<SiteDesign[]>([])
  const HISTORY_LIMIT = 60
  let muted = 0
  watch(design, (_n, o) => {
    if (muted > 0 || !o) return
    past.value.push(JSON.parse(JSON.stringify(o)))
    if (past.value.length > HISTORY_LIMIT) past.value.shift()
    future.value = []
  }, { flush: 'sync' })
  const undo = () => {
    if (!past.value.length || !design.value) return
    muted++
    try {
      future.value.push(JSON.parse(JSON.stringify(design.value)))
      design.value = past.value.pop()!
    } finally { muted = Math.max(0, muted - 1) }
    dirty.value = true
  }
  const redo = () => {
    if (!future.value.length || !design.value) return
    muted++
    try {
      past.value.push(JSON.parse(JSON.stringify(design.value)))
      design.value = future.value.pop()!
    } finally { muted = Math.max(0, muted - 1) }
    dirty.value = true
  }
  const canUndo = computed(() => past.value.length > 0)
  const canRedo = computed(() => future.value.length > 0)
  const clearHistory = () => { past.value = []; future.value = [] }

  const resolveDomainId = (domainId?: number | null): number | null => {
    if (domainId) return domainId
    try {
      return useDomainStore().domain?.domain_id ?? null
    } catch {
      return null
    }
  }

  const currentThemeIndex = (): number => {
    try {
      return Number(useDomainStore().settings?.theme ?? 0)
    } catch {
      return 0
    }
  }

  const seedFromTheme = (domainId: number | null): SiteDesign =>
    defaultDesign(domainId, currentThemeIndex())

  // 1) Server-injected design (production, zero-flash).
  const hydrateFromServer = (): boolean => {
    if (import.meta.client && typeof window !== 'undefined' && (window as any).__NUXT_DESIGN__) {
      muted++
      design.value = normalize((window as any).__NUXT_DESIGN__, null)
      delete (window as any).__NUXT_DESIGN__
      dirty.value = false
      muted = Math.max(0, muted - 1)
      return true
    }
    return false
  }

  // Public path: no auth, no /admin/design call (visitors aren't logged in).
  // Reads the design shipped inside GET /site/config (captured by the domain
  // store). Falls back to seed only when no design exists yet.
  const loadPublicDesign = async (domainId?: number | null) => {
    if (design.value) return // already loaded (e.g. via hydrateFromServer)
    const id = resolveDomainId(domainId)
    muted++
    try {
      if (hydrateFromServer()) return
      let cfgDesign: any = null
      try { cfgDesign = (useDomainStore() as any).siteDesign } catch { /* store not ready */ }
      if (cfgDesign) {
        design.value = normalize(cfgDesign, id)
        dirty.value = false
        return
      }
      design.value = seedFromTheme(id)
      dirty.value = false
    } finally {
      muted = Math.max(0, muted - 1)
    }
  }

  // Admin path: prefer the real API, fall back to localStorage dev shim.
  const loadDesign = async (domainId?: number | null) => {
    if (design.value) return
    const id = resolveDomainId(domainId)
    muted++
    try {
      if (hydrateFromServer()) return
      loading.value = true
      try {
        const endpoint = id ? `/admin/design?domain_id=${id}` : '/admin/design'
        const res = await api.get<SiteDesign>(endpoint)
        if (res.success && res.data) {
          design.value = normalize(res.data, id)
          dirty.value = false
          loading.value = false
          return
        }
      } catch {
        // backend not ready — fall through to dev fallback
      }
      const ls = readLs(id)
      design.value = ls ? normalize(ls, id) : seedFromTheme(id)
      dirty.value = false
      loading.value = false
    } finally {
      muted = Math.max(0, muted - 1)
    }
  }

  const saveDesign = async (domainId?: number | null): Promise<boolean> => {
    if (!design.value) return false
    const id = resolveDomainId(domainId)
    design.value.domain_id = id
    saving.value = true
    let saved = false
    try {
      const endpoint = id ? `/admin/design?domain_id=${id}` : '/admin/design'
      const res = await api.put<SiteDesign>(endpoint, design.value)
      saved = !!(res && res.success)
    } catch {
      saved = false
    }
    if (!saved) writeLs(design.value) // dev shim fallback keeps changes across reloads
    saving.value = false
    dirty.value = false
    clearHistory() // saved state becomes the undo baseline
    return saved
  }

  const ensureDesign = (): SiteDesign => {
    if (!design.value) design.value = seedFromTheme(resolveDomainId())
    return design.value
  }

  const updateStyle = (partial: Partial<DesignStyle>) => {
    const d = ensureDesign()
    const base = d.style ?? defaultStyle(currentThemeIndex())
    design.value = { ...d, style: { ...base, ...partial } }
    dirty.value = true
  }

  const setColor = (key: keyof DesignColors, value: string) => {
    const d = ensureDesign()
    const base = d.style ?? defaultStyle(currentThemeIndex())
    design.value = { ...d, style: { ...base, colors: { ...base.colors, [key]: value } } }
    dirty.value = true
  }

  const applyPreset = (themeIndex: number) => {
    const d = ensureDesign()
    const base = d.style ?? defaultStyle(currentThemeIndex())
    design.value = { ...d, style: { ...base, colors: { ...defaultStyle(themeIndex).colors } } }
    dirty.value = true
  }

  /** Apply a curated design preset (colors + fonts + radius). */
  const applyDesignPreset = (preset: DesignPreset) => {
    const d = ensureDesign()
    design.value = {
      ...d,
      style: {
        colors: { ...preset.colors },
        fonts: {
          heading: preset.fonts.heading,
          body: preset.fonts.body,
          baseSize: preset.fonts.baseSize,
        },
        radius: preset.radius,
        spacing: d.style?.spacing ?? 16,
      },
    }
    dirty.value = true
  }

  const resetStyle = () => {
    const d = ensureDesign()
    design.value = { ...d, style: defaultStyle(currentThemeIndex()) }
    dirty.value = true
  }

  // ---- Phase 2: page section composition (homepage) ------------------------

  const homeSections = computed<SectionSlot[]>(() => design.value?.pages?.home?.sections ?? [])

  const addSection = (slot: SectionSlot) => {
    const d = ensureDesign()
    const home = d.pages?.home ?? { sections: [] as SectionSlot[] }
    design.value = {
      ...d,
      pages: { ...d.pages, home: { sections: [...home.sections, slot] } },
    }
    dirty.value = true
  }

  const updateSection = (index: number, slot: SectionSlot) => {
    const d = design.value
    if (!d?.pages?.home) return
    const sections = [...d.pages.home.sections]
    if (index < 0 || index >= sections.length) return
    sections[index] = slot
    design.value = { ...d, pages: { ...d.pages, home: { sections } } }
    dirty.value = true
  }

  const removeSection = (index: number) => {
    const d = design.value
    if (!d?.pages?.home) return
    const sections = d.pages.home.sections.filter((_, i) => i !== index)
    design.value = { ...d, pages: { ...d.pages, home: { sections } } }
    dirty.value = true
  }

  const moveSection = (from: number, to: number) => {
    const d = design.value
    if (!d?.pages?.home) return
    const sections = [...d.pages.home.sections]
    if (from < 0 || from >= sections.length || to < 0 || to >= sections.length) return
    const [moved] = sections.splice(from, 1)
    sections.splice(to, 0, moved)
    design.value = { ...d, pages: { ...d.pages, home: { sections } } }
    dirty.value = true
  }

  const duplicateSection = (index: number) => {
    const d = design.value
    if (!d?.pages?.home) return
    const sections = [...d.pages.home.sections]
    const orig = sections[index]
    if (!orig) return
    const copy = JSON.parse(JSON.stringify(orig)) as SectionSlot
    sections.splice(index + 1, 0, copy)
    design.value = { ...d, pages: { ...d.pages, home: { sections } } }
    dirty.value = true
  }

  // ---- Phase 3: header / footer composition --------------------------------

  const homeHeader = computed<HeaderDesign | null>(() => design.value?.header ?? null)
  const homeFooter = computed<FooterDesign | null>(() => design.value?.footer ?? null)

  /** Immutably patch the header design via a mutating draft callback. */
  const patchHeader = (updater: (h: HeaderDesign) => void) => {
    const d = ensureDesign()
    const draft = JSON.parse(JSON.stringify(d.header ?? defaultHeader())) as HeaderDesign
    updater(draft)
    design.value = { ...d, header: draft }
    dirty.value = true
  }

  /** Immutably patch the footer design via a mutating draft callback. */
  const patchFooter = (updater: (f: FooterDesign) => void) => {
    const d = ensureDesign()
    const draft = JSON.parse(JSON.stringify(d.footer ?? defaultFooter())) as FooterDesign
    updater(draft)
    design.value = { ...d, footer: draft }
    dirty.value = true
  }

  return {
    design: readonly(design),
    style: readonly(style),
    homeSections: readonly(homeSections),
    homeHeader: readonly(homeHeader),
    homeFooter: readonly(homeFooter),
    loading: readonly(loading),
    saving: readonly(saving),
    dirty: readonly(dirty),
    canUndo: readonly(canUndo),
    canRedo: readonly(canRedo),
    loadDesign,
    loadPublicDesign,
    saveDesign,
    hydrateFromServer,
    undo,
    redo,
    updateStyle,
    setColor,
    applyPreset,
    applyDesignPreset,
    resetStyle,
    addSection,
    updateSection,
    removeSection,
    moveSection,
    duplicateSection,
    patchHeader,
    patchFooter,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDesignStore, import.meta.hot))
}
