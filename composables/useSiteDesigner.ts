import { useDesignStore } from '~/stores/design'
import { useAuthStore } from '~/stores/auth'
import { useApi } from '~/composables/useApi'
import type { DesignColors, DesignStyle, DesignPreset, SectionSlot } from '~/types'

/**
 * Builder-facing wrapper around the design store. Used by the admin designer
 * (pages/admin/builder). Binds the design to the logged-in user's domain and
 * exposes editing actions for all phases.
 *
 * IMPORTANT (reactivity): state is exposed as explicit `computed(() => store.x)`
 * refs. Do NOT return `store.x` directly (captures a snapshot → breaks) and do
 * NOT use `storeToRefs` here (it does not reliably track this store's
 * `readonly(computed)` state, which left the Style panel showing stale defaults
 * and the Save button disabled). Computeds are always reactive.
 */
export const useSiteDesigner = () => {
  const store = useDesignStore()
  const authStore = useAuthStore()
  const api = useApi()

  const design = computed(() => store.design)
  const style = computed(() => store.style)
  const homeSections = computed(() => store.homeSections)
  const homeHeader = computed(() => store.homeHeader)
  const homeFooter = computed(() => store.homeFooter)
  const loading = computed(() => store.loading)
  const saving = computed(() => store.saving)
  const dirty = computed(() => store.dirty)
  const canUndo = computed(() => store.canUndo)
  const canRedo = computed(() => store.canRedo)

  const domainId = computed(() => authStore.user?.domain_id ?? null)

  const init = async () => {
    await store.loadDesign(domainId.value)
  }

  const save = async (): Promise<boolean> => {
    return store.saveDesign(domainId.value)
  }

  /** Make the composed page the live homepage (sets page_style = 4). */
  const activateHomepage = async (): Promise<boolean> => {
    const res = await api.put('/settings/general', { page_style: 4 })
    return !!(res && res.success)
  }

  return {
    // reactive state (computeds = always reactive)
    design,
    style,
    homeSections,
    homeHeader,
    homeFooter,
    loading,
    saving,
    dirty,
    canUndo,
    canRedo,
    domainId,
    // lifecycle
    init,
    save,
    activateHomepage,
    undo: store.undo,
    redo: store.redo,
    // style tokens (Phase 1)
    updateStyle: (partial: Partial<DesignStyle>) => store.updateStyle(partial),
    setColor: (key: keyof DesignColors, value: string) => store.setColor(key, value),
    applyPreset: (themeIndex: number) => store.applyPreset(themeIndex),
    applyDesignPreset: (preset: DesignPreset) => store.applyDesignPreset(preset),
    resetStyle: () => store.resetStyle(),
    // page sections (Phase 2)
    addSection: (slot: SectionSlot) => store.addSection(slot),
    updateSection: (index: number, slot: SectionSlot) => store.updateSection(index, slot),
    removeSection: (index: number) => store.removeSection(index),
    moveSection: (from: number, to: number) => store.moveSection(from, to),
    duplicateSection: (index: number) => store.duplicateSection(index),
    // header / footer (Phase 3)
    patchHeader: store.patchHeader,
    patchFooter: store.patchFooter,
  }
}
