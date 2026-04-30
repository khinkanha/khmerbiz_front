import type { Domain, Setting, Language, Banner, SocialMedia, MenuItem } from '~/types'

export const useDomain = () => {
  const api = useApi()
  const domain = useState<Domain | null>('domain', () => null)
  const settings = useState<Setting | null>('settings', () => null)
  const languages = useState<Language[]>('languages', () => [])
  const currentLanguage = useState<Language | null>('currentLanguage', () => null)
  const banners = useState<Banner[]>('banners', () => [])
  const socialMedia = useState<SocialMedia[]>('socialMedia', () => [])
  const menuTree = useState<MenuItem[]>('menuTree', () => [])

  const resolveDomain = async () => {
    try {
      const response = await api.get<{
        domain: Domain
        settings: Setting
        languages: Language[]
        banners: Banner[]
        socialMedia: SocialMedia[]
      }>('/site/config')

      if (response.success && response.data) {
        domain.value = response.data.domain
        settings.value = response.data.settings
        languages.value = response.data.languages
        banners.value = response.data.banners
        socialMedia.value = response.data.socialMedia

        if (languages.value.length > 0) {
          currentLanguage.value = languages.value[0]
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

    try {
      const response = await api.get<MenuItem[]>(`/menu/tree/${currentLanguage.value.lang_id}`)
      if (response.success && response.data) {
        menuTree.value = buildMenuTree(response.data)
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
    domain,
    settings,
    languages,
    currentLanguage,
    banners,
    socialMedia,
    menuTree,
    resolveDomain,
    setLanguage,
    fetchMenuTree,
    getThemeName,
    getTemplateName,
  }
}
