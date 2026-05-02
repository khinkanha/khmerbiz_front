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
        contents.value = response.data.items
        const pag = response.data.pagination
        pagination.value = {
          page: pag.page,
          limit: pag.limit,
          total: pag.total,
          totalPages: pag.totalPages,
        }
      }
    } catch (error) {
      console.error('Failed to fetch contents:', error)
    }
  }

  const fetchContent = async (id: number) => {
    try {
      const response = await api.get<any>(`/content/${id}`)

      if (response.success && response.data) {
        currentContent.value = response.data
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

  const fetchItems = async (contentId: number) => {
    try {
      const response = await api.get<any>(`/content/${contentId}/items`)

      if (response.success && response.data) {
        contentItems.value = response.data.items || response.data
      }
    } catch (error) {
      console.error('Failed to fetch items:', error)
    }
  }

  const saveItem = async (contentId: number, data: ItemForm): Promise<{ success: boolean; id?: number }> => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      if (data.description) {
        formData.append('description', data.description)
      }
      if (data.video_url) {
        formData.append('video_url', data.video_url)
      }
      if (data.photo) {
        formData.append('photo', data.photo)
      }
      if (data.document_url) {
        formData.append('document_url', data.document_url)
      }
      if (data.priority !== undefined) {
        formData.append('priority', String(data.priority))
      }
      if (data.is_feature !== undefined) {
        formData.append('is_feature', String(data.is_feature ? 1 : 0))
      }

      const response = await api.post<{ item_id: number }>(`/content/${contentId}/items`, formData)

      if (response.success && response.data) {
        return { success: true, id: response.data.item_id }
      }

      return { success: false }
    } catch (error) {
      console.error('Failed to save item:', error)
      return { success: false }
    }
  }

  const updateItem = async (contentId: number, id: number, data: Partial<ItemForm>): Promise<boolean> => {
    try {
      const formData = new FormData()
      if (data.title) {
        formData.append('title', data.title)
      }
      if (data.description !== undefined) {
        formData.append('description', data.description)
      }
      if (data.video_url !== undefined) {
        formData.append('video_url', data.video_url)
      }
      if (data.photo) {
        formData.append('photo', data.photo)
      }
      if (data.document_url) {
        formData.append('document_url', data.document_url)
      }
      if (data.priority !== undefined) {
        formData.append('priority', String(data.priority))
      }
      if (data.is_feature !== undefined) {
        formData.append('is_feature', String(data.is_feature ? 1 : 0))
      }

      const response = await api.put(`/content/${contentId}/items/${id}`, formData)
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

  const fetchNews = async (contentId: number, page: number = 1) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pagination.value.limit),
      })

      const response = await api.get<PaginatedResponse<News>>(`/content/${contentId}/news?${params}`)

      if (response.success && response.data) {
        newsList.value = response.data.items
        const pag = response.data.pagination
        pagination.value = {
          page: pag.page,
          limit: pag.limit,
          total: pag.total,
          totalPages: pag.totalPages,
        }
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

  const saveNews = async (contentId: number, data: NewsForm): Promise<{ success: boolean; id?: number }> => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('short_description', data.short_description)
      formData.append('description', data.description)
      if (data.photo) {
        formData.append('photo', data.photo)
      }
      if (data.publish_date) {
        formData.append('publish_date', data.publish_date)
      }

      const response = await api.post<{ news_id: number }>(`/content/${contentId}/news`, formData)

      if (response.success && response.data) {
        return { success: true, id: response.data.news_id }
      }

      return { success: false }
    } catch (error) {
      console.error('Failed to save news:', error)
      return { success: false }
    }
  }

  const updateNews = async (contentId: number, id: number, data: Partial<NewsForm>): Promise<boolean> => {
    try {
      const formData = new FormData()
      if (data.title) {
        formData.append('title', data.title)
      }
      if (data.short_description !== undefined) {
        formData.append('short_description', data.short_description)
      }
      if (data.description !== undefined) {
        formData.append('description', data.description)
      }
      if (data.photo) {
        formData.append('photo', data.photo)
      }
      if (data.publish_date !== undefined) {
        formData.append('publish_date', data.publish_date)
      }

      const response = await api.put(`/content/${contentId}/news/${id}`, formData)
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
