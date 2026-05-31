import type {
  Content,
  ContentItem,
  News,
  ContentSection,
  ContentForm,
  ItemForm,
  NewsForm,
  PaginatedResponse,
} from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
export const useContentStore = defineStore('content', () => {
  const api = useApi()

  const contents = ref<Content[]>([])
  const currentContent = ref<Content | null>(null)
  const contentItems = ref<ContentItem[]>([])
  const newsList = ref<News[]>([])
  const currentNews = ref<News | null>(null)
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })

  const fetchContents = async (page: number = 1, search?: string) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pagination.value.limit),
      })

      if (search) {
        params.append('search', search)
      }

      const response = await api.get<PaginatedResponse<any>>(`/content?${params}`)

      if (response.success && response.data) {
        const d = response.data
        let rawItems: any[] = []
        if (d.items) {
          rawItems = d.items
          const pag = d.pagination
          if (pag) {
            pagination.value = {
              page: pag.page,
              limit: pag.limit,
              total: pag.total,
              totalPages: pag.totalPages,
            }
          }
        } else if (Array.isArray(d)) {
          rawItems = d
        }
        contents.value = rawItems.map(parseContent)
      }
    } catch (error) {
      console.error('Failed to fetch contents:', error)
    }
  }

  const parseContent = (raw: any) => {
    let parsed: any = {}
    if (raw.description && typeof raw.description === 'string') {
      try {
        parsed = JSON.parse(raw.description)
      } catch {}
    }
    return {
      ...raw,
      title: parsed.title || raw.title || '',
    }
  }

  const fetchContent = async (id: number) => {
    try {
      const response = await api.get<any>(`/content/${id}`)

      if (response.success && response.data) {
        const raw = response.data
        currentContent.value = parseContent(raw)

        // Extract embedded news/items from content response
        const newsData = raw.newsItems || raw.news || []
        const itemsData = raw.items || []

        if (Array.isArray(newsData)) {
          newsList.value = newsData.map(parseNewsItem)
        }
        if (Array.isArray(itemsData)) {
          contentItems.value = itemsData.map(parseItem)
        }
      }
    } catch (error) {
      console.error('Failed to fetch content:', error)
    }
  }

  const saveContent = async (data: ContentForm): Promise<{ success: boolean; id?: number }> => {
    try {
      const response = await api.post<{ content_id: number }>('/content', data)

      if (response.success && response.data) {
        return { success: true, id: response.data.content_id }
      }

      return { success: false }
    } catch (error) {
      console.error('Failed to save content:', error)
      return { success: false }
    }
  }

  const updateContent = async (
    id: number,
    data: Partial<ContentForm>
  ): Promise<boolean> => {
    try {
      const response = await api.put(`/content/${id}`, data)
      return response.success
    } catch (error) {
      console.error('Failed to update content:', error)
      return false
    }
  }

  const deleteContent = async (id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/content/${id}`)
      if (response.success) {
        contents.value = contents.value.filter(c => c.content_id !== id)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to delete content:', error)
      return false
    }
  }

  const parseItem = (raw: any) => {
    let parsed: any = null
    if (raw.description && typeof raw.description === 'string') {
      try {
        const test = JSON.parse(raw.description)
        if (test && typeof test === 'object' && !Array.isArray(test)) {
          parsed = test
        }
      } catch {}
    }
    return {
      ...raw,
      ...(parsed ? {
        title: parsed.title || raw.title || '',
        description: parsed.longdes || parsed.description || raw.description || '',
        photo: parsed.photo || raw.photo || '',
      } : {}),
    }
  }

  const fetchItems = async (contentId: number) => {
    try {
      const response = await api.get<any>(`/content/${contentId}/items`)

      if (response.success && response.data) {
        const d = response.data
        let rawItems: any[] = []
        if (d.items) {
          rawItems = d.items
        } else if (Array.isArray(d)) {
          rawItems = d
        } else if (d.data && Array.isArray(d.data)) {
          rawItems = d.data
        }
        contentItems.value = rawItems.map(parseItem)
      }
    } catch (error) {
      console.error('Failed to fetch items:', error)
    }
  }

  const saveItem = async (contentId: number, data: any): Promise<{ success: boolean; id?: number }> => {
    try {
      if (data.photo && data.photo instanceof File) {
        const formData = new FormData()
        formData.append('title', data.title || '')
        formData.append('description', data.description || '')
        formData.append('item_type', String(data.item_type ?? 0))
        formData.append('image', data.photo)
        if (data.video_url) formData.append('url', data.video_url)
        if (data.photoUrl) formData.append('url', data.photoUrl)
        if (data.priority !== undefined) formData.append('priority', String(data.priority))
        if (data.is_feature !== undefined) formData.append('is_feature', String(data.is_feature ? 1 : 0))

        const response = await api.post<{ item_id: number }>(`/content/${contentId}/items`, formData)
        if (response.success && response.data) {
          return { success: true, id: response.data.item_id }
        }
        return { success: false }
      }

      const payload: any = {
        title: data.title,
        description: data.description || '',
        item_type: data.item_type,
      }
      if (data.video_url) payload.url = data.video_url
      if (data.photoUrl) payload.url = data.photoUrl
      if (data.priority !== undefined) payload.priority = data.priority
      if (data.is_feature !== undefined) payload.is_feature = data.is_feature ? 1 : 0

      const response = await api.post<{ item_id: number }>(`/content/${contentId}/items`, payload)

      if (response.success && response.data) {
        return { success: true, id: response.data.item_id }
      }

      return { success: false }
    } catch (error) {
      console.error('Failed to save item:', error)
      return { success: false }
    }
  }

  const updateItem = async (contentId: number, id: number, data: any): Promise<boolean> => {
    try {
      if (data.photo && data.photo instanceof File) {
        const formData = new FormData()
        formData.append('title', data.title || '')
        formData.append('description', data.description || '')
        formData.append('item_type', String(data.item_type ?? 0))
        formData.append('image', data.photo)
        if (data.video_url) formData.append('url', data.video_url)
        if (data.photoUrl) formData.append('url', data.photoUrl)
        if (data.priority !== undefined) formData.append('priority', String(data.priority))
        if (data.is_feature !== undefined) formData.append('is_feature', String(data.is_feature ? 1 : 0))

        const response = await api.put(`/content/${contentId}/items/${id}`, formData)
        return response.success
      }

      const payload: any = {
        title: data.title,
        description: data.description || '',
        item_type: data.item_type,
      }
      if (data.video_url) payload.url = data.video_url
      if (data.photoUrl) payload.url = data.photoUrl
      if (data.priority !== undefined) payload.priority = data.priority
      if (data.is_feature !== undefined) payload.is_feature = data.is_feature ? 1 : 0

      const response = await api.put(`/content/${contentId}/items/${id}`, payload)
      return response.success
    } catch (error) {
      console.error('Failed to update item:', error)
      return false
    }
  }

  const deleteItem = async (contentId: number, id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/content/${contentId}/items/${id}`)
      if (response.success) {
        contentItems.value = contentItems.value.filter(i => i.item_id !== id)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to delete item:', error)
      return false
    }
  }

  const parseNewsItem = (raw: any) => {
    let parsed: any = null
    if (raw.description && typeof raw.description === 'string') {
      try {
        const test = JSON.parse(raw.description)
        if (test && typeof test === 'object' && !Array.isArray(test)) {
          parsed = test
        }
      } catch {}
    }
    return {
      ...raw,
      news_id: raw.id || raw.news_id,
      ...(parsed ? {
        title: parsed.title || raw.title || '',
        short_description: parsed.shortdes || raw.short_description || '',
        description: parsed.longdes || raw.description || '',
        photo: parsed.photo || raw.photo || '',
      } : {
        title: raw.title || '',
        short_description: raw.short_description || '',
        description: raw.description || '',
        photo: raw.photo || '',
      }),
    }
  }

  const fetchNews = async (contentId: number, page: number = 1) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pagination.value.limit),
      })

      const response = await api.get<any>(`/content/${contentId}/news?${params}`)
      console.log('fetchNews raw response:', response)
      console.log('fetchNews response.success:', response.success, 'response.data type:', typeof response.data, Array.isArray(response.data))

      if (response.success && response.data) {
        const d = response.data
        let rawItems: any[] = []
        console.log('fetchNews d keys:', Object.keys(d))
        if (Array.isArray(d)) {
          rawItems = d
        } else if (d.items) {
          rawItems = d.items
          const pag = d.pagination
          if (pag) {
            pagination.value = {
              page: pag.page,
              limit: pag.limit,
              total: pag.total,
              totalPages: pag.totalPages,
            }
          }
        } else if (d.news) {
          rawItems = d.news
        } else if (d.data && Array.isArray(d.data)) {
          rawItems = d.data
        }
        console.log('fetchNews rawItems count:', rawItems.length, rawItems)
        newsList.value = rawItems.map(parseNewsItem)
        console.log('fetchNews newsList after parse:', newsList.value.length, newsList.value.map(n => ({ id: n.news_id, title: n.title })))
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
    }
  }

  const fetchNewsDetail = async (contentId: number, newsId: number) => {
    try {
      const response = await api.get<News>(`/content/${contentId}/news/${newsId}`)

      if (response.success && response.data) {
        currentNews.value = response.data
      }
    } catch (error) {
      console.error('Failed to fetch news detail:', error)
    }
  }

  const saveNews = async (contentId: number, data: any): Promise<{ success: boolean; id?: number }> => {
    try {
      const payload: any = {
        title: data.title,
        shortdes: data.short_description || data.shortdes || '',
        longdes: data.description || data.longdes || '',
      }
      if (data.photo) {
        if (data.photo instanceof File) {
          const formData = new FormData()
          formData.append('title', payload.title)
          formData.append('shortdes', payload.shortdes)
          formData.append('longdes', payload.longdes)
          formData.append('photo', data.photo)
          if (data.publish_date) formData.append('publish', data.publish_date)
          if (data.priority !== undefined) formData.append('priority', String(data.priority))
          if (data.status !== undefined) formData.append('status', String(data.status))
          const response = await api.post<{ news_id: number }>(`/content/${contentId}/news`, formData)
          if (response.success && response.data) {
            return { success: true, id: response.data.news_id || response.data.id }
          }
          return { success: false }
        }
        payload.photo = data.photo
      }
      if (data.publish_date) payload.publish = data.publish_date
      if (data.priority !== undefined) payload.priority = data.priority
      if (data.status !== undefined) payload.status = data.status

      const response = await api.post<{ news_id: number }>(`/content/${contentId}/news`, payload)

      if (response.success && response.data) {
        return { success: true, id: response.data.news_id || response.data.id }
      }

      return { success: false }
    } catch (error) {
      console.error('Failed to save news:', error)
      return { success: false }
    }
  }

  const updateNews = async (contentId: number, id: number, data: any): Promise<boolean> => {
    try {
      const payload: any = {
        title: data.title,
        shortdes: data.short_description || data.shortdes || '',
        longdes: data.description || data.longdes || '',
      }
      if (data.photo) {
        if (data.photo instanceof File) {
          const formData = new FormData()
          formData.append('title', payload.title)
          formData.append('shortdes', payload.shortdes)
          formData.append('longdes', payload.longdes)
          formData.append('photo', data.photo)
          if (data.publish_date) formData.append('publish', data.publish_date)
          if (data.priority !== undefined) formData.append('priority', String(data.priority))
          if (data.status !== undefined) formData.append('status', String(data.status))
          const response = await api.put(`/content/${contentId}/news/${id}`, formData)
          return response.success
        }
        payload.photo = data.photo
      }
      if (data.publish_date) payload.publish = data.publish_date
      if (data.priority !== undefined) payload.priority = data.priority
      if (data.status !== undefined) payload.status = data.status

      const response = await api.put(`/content/${contentId}/news/${id}`, payload)
      return response.success
    } catch (error) {
      console.error('Failed to update news:', error)
      return false
    }
  }

  const deleteNews = async (contentId: number, id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/content/${contentId}/news/${id}`)
      if (response.success) {
        newsList.value = newsList.value.filter(n => n.news_id !== id)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to delete news:', error)
      return false
    }
  }

  const saveMapLocation = async (contentId: number, location: {
    lat: number
    lng: number
    zoom: number
    marker?: string
  }): Promise<boolean> => {
    try {
      const response = await api.put(`/content/${contentId}/map`, location)
      return response.success
    } catch (error) {
      console.error('Failed to save map location:', error)
      return false
    }
  }

  return {
    contents: readonly(contents),
    currentContent: readonly(currentContent),
    contentItems: readonly(contentItems),
    newsList: readonly(newsList),
    currentNews: readonly(currentNews),
    pagination: readonly(pagination),
    fetchContents,
    fetchContent,
    saveContent,
    updateContent,
    deleteContent,
    fetchItems,
    saveItem,
    updateItem,
    deleteItem,
    fetchNews,
    fetchNewsDetail,
    saveNews,
    updateNews,
    deleteNews,
    saveMapLocation,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContentStore, import.meta.hot))
}
