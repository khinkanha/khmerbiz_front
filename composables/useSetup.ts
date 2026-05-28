import { useApi } from './useApi'

export interface SetupStatus {
  hasLanguage: boolean
  language: { lang_id: number; lang_name: string; flag: number } | null
  hasMenus: boolean
  menuCount: number
  menus: { item_id: number; item_name: string }[]
  hasContent: boolean
  contentCount: number
  hasBasicSettings: boolean
  settings: { title: string | null; logo: string | null } | null
}

export const useSetup = () => {
  const api = useApi()
  const setupStatus = ref<SetupStatus | null>(null)
  const loading = ref(false)

  const fetchStatus = async () => {
    loading.value = true
    try {
      const response = await api.get<SetupStatus>('/setup/status')
      if (response.success && response.data) {
        setupStatus.value = response.data
      }
    } catch (error) {
      console.error('Failed to fetch setup status:', error)
    } finally {
      loading.value = false
    }
    return setupStatus.value
  }

  const createLanguage = async (data: { lang_name: string; flag: number }) => {
    const response = await api.post<{ lang_id: number }>('/settings/languages', {
      ...data,
      is_default: 1,
    })
    return response.success
  }

  const createMenus = async (items: { item_name: string; lang_id: number }[]) => {
    const results = []
    for (const item of items) {
      const response = await api.post<{ item_id: number }>('/menus', {
        item_name: item.item_name,
        item_url: '',
        lang_id: item.lang_id,
        parent_id: 0,
      })
      if (response.success && response.data) {
        results.push({ item_id: response.data.item_id, item_name: item.item_name })
      }
    }
    return results
  }

  const updateSiteTitle = async (title: string) => {
    const response = await api.put('/settings/general', { title })
    return response.success
  }

  const createContent = async (data: {
    title: string
    description: string
    content_type: number
    lang_id: number
    menu_id: number
  }) => {
    const response = await api.post<{ content_id: number }>('/content', data)
    return response.success
  }

  return {
    setupStatus: readonly(setupStatus),
    loading,
    fetchStatus,
    createLanguage,
    createMenus,
    updateSiteTitle,
    createContent,
  }
}
