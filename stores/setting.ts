import type {
  Setting,
  Banner,
  SocialMedia,
  BannerForm,
  SocialMediaForm,
} from '~/types'

export const useSettingStore = defineStore('setting', () => {
  const api = useApi()

  const settings = ref<Setting | null>(null)
  const banners = ref<Banner[]>([])
  const socialMedia = ref<SocialMedia[]>([])

  const fetchSettings = async (domainId?: number) => {
    try {
      const url = domainId ? `/settings/domain/${domainId}` : '/settings'
      const response = await api.get<Setting>(url)

      if (response.success && response.data) {
        settings.value = response.data
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  const updateSettings = async (data: Partial<Setting>): Promise<boolean> => {
    try {
      const response = await api.put('/settings', data)

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

  const fetchBanners = async (domainId?: number) => {
    try {
      const url = domainId ? `/settings/banners/domain/${domainId}` : '/settings/banners'
      const response = await api.get<Banner[]>(url)

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
      formData.append('link', data.link)
      formData.append('banner_order', String(data.banner_order))
      formData.append('status', String(data.status))

      if (typeof data.photo === 'string') {
        formData.append('existing_photo', data.photo)
      } else if (data.photo) {
        formData.append('photo', data.photo)
      }

      const response = await api.post<{ banner_id: number }>('/settings/banners', formData)

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

  const updateBanner = async (id: number, data: Partial<BannerForm>): Promise<boolean> => {
    try {
      const formData = new FormData()

      if (data.title !== undefined) {
        formData.append('title', data.title)
      }
      if (data.link !== undefined) {
        formData.append('link', data.link)
      }
      if (data.banner_order !== undefined) {
        formData.append('banner_order', String(data.banner_order))
      }
      if (data.status !== undefined) {
        formData.append('status', String(data.status))
      }

      if (typeof data.photo === 'string') {
        formData.append('existing_photo', data.photo)
      } else if (data.photo) {
        formData.append('photo', data.photo)
      }

      const response = await api.put(`/settings/banners/${id}`, formData)

      if (response.success) {
        await fetchBanners()
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to update banner:', error)
      return false
    }
  }

  const deleteBanner = async (id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/settings/banners/${id}`)

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

  const fetchSocialMedia = async (domainId?: number) => {
    try {
      const url = domainId ? `/settings/social/domain/${domainId}` : '/settings/social'
      const response = await api.get<SocialMedia[]>(url)

      if (response.success && response.data) {
        socialMedia.value = response.data
      }
    } catch (error) {
      console.error('Failed to fetch social media:', error)
    }
  }

  const addSocialMedia = async (data: SocialMediaForm): Promise<{ success: boolean; id?: number }> => {
    try {
      const response = await api.post<{ social_id: number }>('/settings/social', data)

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
    try {
      const response = await api.put(`/settings/social/${id}`, data)

      if (response.success) {
        await fetchSocialMedia()
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to update social media:', error)
      return false
    }
  }

  const deleteSocialMedia = async (id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/settings/social/${id}`)

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

  const updateLogoSettings = async (data: {
    logo?: File | string
    mobileLogo?: File | string
  }): Promise<boolean> => {
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

      const response = await api.post('/settings/logo', formData)

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

  return {
    settings: readonly(settings),
    banners: readonly(banners),
    socialMedia: readonly(socialMedia),
    fetchSettings,
    updateSettings,
    fetchBanners,
    addBanner,
    updateBanner,
    deleteBanner,
    fetchSocialMedia,
    addSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
    updateLogoSettings,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingStore, import.meta.hot))
}
