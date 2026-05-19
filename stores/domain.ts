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

  const resolveDomain = async (domainId?: number) => {
    try {
      let endpoint = domainId ? `/site/config?domain_id=${domainId}` : '/site/config'
      let response = await api.get<{
        domain: Domain
        settings: Setting
        languages: Language[]
        banners: Banner[]
        socialMedia: SocialMedia[]
      }>(endpoint)

      // Fallback to /site/default when domain not found
      if (!response.success && !domainId) {
        const host = import.meta.client ? window.location.hostname : ''
        const fallbackEndpoint = host ? `/site/default?domain_name=${host}` : '/site/default'
        response = await api.get<typeof response.data>(fallbackEndpoint)
      }

      if (response.success && response.data) {
        domain.value = response.data.domain
        settings.value = response.data.settings
        languages.value = response.data.languages
        banners.value = response.data.banners
        socialMedia.value = response.data.socialMedia

        if (languages.value.length > 0) {
          await setLanguage(languages.value[0].lang_id)
        }
      }
    } catch (error) {
      console.error('Failed to resolve domain:', error)
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
    resolveDomain,
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
