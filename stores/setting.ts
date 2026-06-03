import type {
  Setting,
  Banner,
  SocialMedia,
  BannerForm,
  SocialMediaForm,
  Language,
} from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
export const useSettingStore = defineStore('setting', () => {
  const api = useApi()

  const settings = ref<Setting | null>(null)
  const banners = ref<Banner[]>([])
  const socialMedia = ref<SocialMedia[]>([])

  const fetchSettings = async () => {
    try {
      const response = await api.get<Setting>('/settings')

      if (response.success && response.data) {
        settings.value = response.data
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  const updateSettings = async (data: Partial<Setting>): Promise<boolean> => {
    try {
      const response = await api.put('/settings/general', data)
      if (response.success) {
        if (settings.value) {
          settings.value = { ...settings.value, ...data }
        }
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to update settings:', error)
      return false
    }
  }

  const fetchBanners = async () => {
    try {
      const response = await api.get<Banner[]>('/banners')

      if (response.success && response.data) {
        banners.value = response.data
      }
    } catch (error) {
      console.error('Failed to fetch banners:', error)
    }
  }

  const addBanner = async (data: BannerForm): Promise<{ success: boolean; id?: number }> => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description || '')
      formData.append('link', data.link)
      formData.append('banner_order', String(data.banner_order))
      formData.append('status', String(data.status))
      formData.append('lang_id', String(data.lang_id))

      if (typeof data.photo === 'string') {
        formData.append('image', data.photo)
      } else if (data.photo) {
        formData.append('image', data.photo)
      }

      const response = await api.post<{ banner_id: number }>('/banners', formData)

      if (response.success && response.data) {
        await fetchBanners()
        return { success: true, id: response.data.banner_id }
      }

      return { success: false }
    } catch (error) {
      console.error('Failed to add banner:', error)
      return { success: false }
    }
  }

  const updateBanner = async (data: Partial<Setting>): Promise<boolean> => {
    const response = await api.put('/settings/banner', data)
    console.log('Update settings response:', response)
    if (response.success) {
      if (settings.value) {
        settings.value = { ...settings.value, ...data }
      }
      return true
    }
    return false
  }

  const deleteBanner = async (id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/banners/${id}`)

      if (response.success) {
        banners.value = banners.value.filter(b => b.banner_id !== id)
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to delete banner:', error)
      return false
    }
  }

  const fetchSocialMedia = async () => {
    try {
      const response = await api.get<SocialMedia[]>('/settings/social-media')

      if (response.success && response.data) {
        socialMedia.value = response.data
      }
    } catch (error) {
      console.error('Failed to fetch social media:', error)
    }
  }

  const addSocialMedia = async (data: SocialMediaForm): Promise<{ success: boolean; id?: number }> => {
    try {
      const response = await api.post<{ social_id: number }>('/settings/social-media', data)

      if (response.success && response.data) {
        await fetchSocialMedia()
        return { success: true, id: response.data.social_id }
      }

      return { success: false }
    } catch (error) {
      console.error('Failed to add social media:', error)
      return { success: false }
    }
  }

  const updateSocialMedia = async (id: number, data: Partial<SocialMediaForm>): Promise<boolean> => {
    // TODO: Backend has no PUT /settings/social-media/:id endpoint — needs to be added
    console.warn('updateSocialMedia: no backend endpoint for social media update')
    return false
  }

  const deleteSocialMedia = async (id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/settings/social-media/${id}`)

      if (response.success) {
        socialMedia.value = socialMedia.value.filter(s => s.social_id !== id)
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to delete social media:', error)
      return false
    }
  }

  const updateLogoSettings = async (data: any): Promise<boolean> => {
    try {
      const formData = new FormData()

      if (typeof data.logo === 'string') {
        formData.append('existing_logo', data.logo)
      } else if (data.logo) {
        formData.append('logo', data.logo)
      }

      if (typeof data.mobileLogo === 'string') {
        formData.append('existing_mobile_logo', data.mobileLogo)
      } else if (data.mobileLogo) {
        formData.append('mobile_logo', data.mobileLogo)
      }

      // Send logo position and alignment settings (map to DB column names)
      if (data.logo_pos !== undefined) formData.append('logo_position', data.logo_pos)
      if (data.logo_align !== undefined) formData.append('logo_align', data.logo_align)

      const response = await api.put('/settings/logo', formData)

      if (response.success) {
        await fetchSettings()
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to update logo settings:', error)
      return false
    }
  }

  const languages = ref<Language[]>([])

  const fetchLanguages = async () => {
    try {
      const response = await api.get<Language[]>('/settings/languages')
      if (response.success && response.data) {
        languages.value = response.data
      }
    } catch (error) {
      console.error('Failed to fetch languages:', error)
    }
  }

  const addLanguage = async (data: { lang_name: string; lang_code: string; flag_icon: string }): Promise<{ success: boolean; id?: number }> => {
    try {
      const response = await api.post<{ lang_id: number }>('/settings/languages', data)
      if (response.success && response.data) {
        await fetchLanguages()
        return { success: true, id: response.data.lang_id }
      }
      return { success: false }
    } catch (error) {
      console.error('Failed to add language:', error)
      return { success: false }
    }
  }

  const deleteLanguage = async (id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/settings/languages/${id}`)
      if (response.success) {
        languages.value = languages.value.filter(l => l.lang_id !== id)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to delete language:', error)
      return false
    }
  }

  const setDefaultLanguage = async (id: number): Promise<boolean> => {
    try {
      const response = await api.put(`/settings/languages/${id}/default`, {})
      if (response.success) {
        await fetchLanguages()
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to set default language:', error)
      return false
    }
  }

  const reorderBanners = (reordered: Banner[]) => {
    banners.value = reordered.map((banner, index) => ({ ...banner, banner_order: index }))
  }

  return {
    settings: readonly(settings),
    banners: readonly(banners),
    socialMedia: readonly(socialMedia),
    languages: readonly(languages),
    fetchSettings,
    updateSettings,
    fetchBanners,
    addBanner,
    updateBanner,
    deleteBanner,
    reorderBanners,
    fetchSocialMedia,
    addSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
    updateLogoSettings,
    fetchLanguages,
    addLanguage,
    deleteLanguage,
    setDefaultLanguage,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingStore, import.meta.hot))
}
