import type { Domain, Setting, Language, Banner, SocialMedia, MenuItem } from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'


export const useDomainStore = defineStore('domain', () => {
  const api = useApi()

  const domain = ref<Domain | null>(null)
  const settings = ref<Setting | null>(null)
  const languages = ref<Language[]>([])
  const currentLanguage = ref<Language | null>(null)
  const banners = ref<Banner[]>([])
  const socialMedia = ref<SocialMedia[]>([])
  const menuTree = ref<MenuItem[]>([])
  const menuCache = ref<Record<number, MenuItem[]>>({})
  // Flips to true once resolveDomain has finished (config + menu attempted).
  // The public layout keeps its loader visible until this is true, so the real
  // theme/menu are ready before the page is allowed to mount and render.
  const resolved = ref(false)

  // Hydrate from server-injected config if available (avoids re-fetching on client)
  const hydrateFromServer = (): boolean => {
    if (import.meta.client && typeof window !== 'undefined' && (window as any).__NUXT_SITE_CONFIG__) {
      const data = (window as any).__NUXT_SITE_CONFIG__
      domain.value = data.domain
      settings.value = data.settings
      languages.value = data.languages
      banners.value = data.banners
      socialMedia.value = data.socialMedia
      delete (window as any).__NUXT_SITE_CONFIG__
      return true
    }
    return false
  }

  const getSavedLangId = (): number | null => {
    if (import.meta.client) {
      const saved = localStorage.getItem('language')
      if (saved) return parseInt(saved)
    }
    return null
  }

  const resolveDomain = async (domainId?: number) => {
    // If data was already hydrated from server, only fetch menu tree
    if (domain.value && !domainId) {
      if (languages.value.length > 0) {
        const savedLangId = getSavedLangId()
        const langToUse = savedLangId && languages.value.find(l => l.lang_id === savedLangId)
          ? savedLangId
          : languages.value[0].lang_id
        await setLanguage(langToUse)
      }
      resolved.value = true
      return
    }

    try {
      let endpoint: string
      if (domainId) {
        endpoint = `/site/config?domain_id=${domainId}`
      } else if (import.meta.client && typeof window !== 'undefined') {
        // Pass hostname so API can resolve the correct domain.
        // Strip a leading "www." so it matches the bare domain in the database
        // (the server middleware already does this for the SSR path).
        const hostname = window.location.hostname.toLowerCase().replace(/^www\./, '')
        endpoint = `/site/config?domain_name=${encodeURIComponent(hostname)}`
      } else {
        endpoint = '/site/config'
      }

      let response = await api.get<{
        domain: Domain
        settings: Setting
        languages: Language[]
        banners: Banner[]
        socialMedia: SocialMedia[]
      }>(endpoint)

      if (response.success && response.data) {
        domain.value = response.data.domain
        settings.value = response.data.settings
        languages.value = response.data.languages
        banners.value = response.data.banners
        socialMedia.value = response.data.socialMedia

        if (languages.value.length > 0) {
          const savedLangId = getSavedLangId()
          const langToUse = savedLangId && languages.value.find(l => l.lang_id === savedLangId)
            ? savedLangId
            : languages.value[0].lang_id
          await setLanguage(langToUse)
        }
      }
    } catch (error) {
      console.error('Failed to resolve domain:', error)
    } finally {
      resolved.value = true
    }
  }

  const setLanguage = async (langId: number) => {
    const lang = languages.value.find(l => l.lang_id === langId)
    if (lang) {
      currentLanguage.value = lang
      if (import.meta.client) {
        localStorage.setItem('language', String(langId))
      }
      await fetchMenuTree()
    }
  }

  const fetchMenuTree = async () => {
    if (!currentLanguage.value) return

    const langId = currentLanguage.value.lang_id
    const domainId = domain.value?.domain_id

    if (menuCache.value[langId]) {
      menuTree.value = menuCache.value[langId]
      return
    }

    try {
      const endpoint = domainId ? `/site/menu?domain_id=${domainId}&lang_id=${langId}` : `/site/menu?lang_id=${langId}`
      const response = await api.get<MenuItem[]>(endpoint)
      if (response.success && response.data) {
        const data = response.data
        const tree = Array.isArray(data) ? buildMenuTree(data) : data
        menuTree.value = tree
        menuCache.value[langId] = tree
      }
    } catch (error) {
      console.error('Failed to fetch menu tree:', error)
    }
  }

  const buildMenuTree = (items: MenuItem[]): MenuItem[] => {
    const map = new Map<number, MenuItem>()
    const roots: MenuItem[] = []

    items.forEach(item => {
      map.set(item.item_id, { ...item, children: [] })
    })

    items.forEach(item => {
      const node = map.get(item.item_id)
      if (!node) return

      if (item.parent_id === 0) {
        roots.push(node)
      } else {
        const parent = map.get(item.parent_id)
        if (parent) {
          if (!parent.children) parent.children = []
          parent.children.push(node)
        }
      }
    })

    return roots
  }

  const clearCache = () => {
    menuCache.value = {}
  }

  const getThemeName = (style: number): string => {
    const themes: Record<number, string> = {
      0: 'default',
      1: 'inverse',
      2: 'red',
      3: 'green',
      4: 'purple',
      5: 'yellow',
    }
    return themes[style] || 'default'
  }

  const getTemplateName = (style: number): string => {
    const templates: Record<number, string> = {
      0: 'ClassicMultiPage',
      1: 'ScrollingSinglePage',
      2: 'MagazineGrid',
      3: 'FullscreenHero',
    }
    return templates[style] || 'ClassicMultiPage'
  }

  return {
    domain: readonly(domain),
    settings: readonly(settings),
    languages: readonly(languages),
    currentLanguage: readonly(currentLanguage),
    banners: readonly(banners),
    socialMedia: readonly(socialMedia),
    menuTree: readonly(menuTree),
    resolved: readonly(resolved),
    resolveDomain,
    hydrateFromServer,
    setLanguage,
    fetchMenuTree,
    clearCache,
    getThemeName,
    getTemplateName,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDomainStore, import.meta.hot))
}
