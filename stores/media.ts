import type { Media, PaginatedResponse } from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { useUpload } from '~/composables/useUpload'

export const useMediaStore = defineStore('media', () => {
  const api = useApi()
  const { uploadFile, uploads, isUploading } = useUpload()

  const mediaList = ref<Media[]>([])
  const search = ref('')
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })

  const fetchMedia = async (page: number = 1) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pagination.value.limit),
      })
      const term = search.value.trim()
      if (term) params.set('search', term)

      const response = await api.get<PaginatedResponse<Media>>(`/media?${params}`)

      if (response.success && response.data) {
        mediaList.value = response.data.items
        const pag = response.data.pagination
        pagination.value = {
          page: pag.page,
          limit: pag.limit,
          total: pag.total,
          totalPages: pag.totalPages,
        }
      }
    } catch (error) {
      console.error('Failed to fetch media:', error)
    }
  }

  const uploadMedia = async (
    title:string,
    file: File,
    folder: string = 'uploads',
    onProgress?: (progress: number) => void
  ): Promise<number | null> => {
    const mediaId = await uploadFile(title,file, folder, onProgress)
    if (mediaId) {
      await fetchMedia()
    }
    return mediaId
  }

  const deleteMedia = async (id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/media/${id}`)

      if (response.success) {
        mediaList.value = mediaList.value.filter(m => m.photo_id !== id)
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to delete media:', error)
      return false
    }
  }

  const searchMedia = async (query: string) => {
    search.value = query
    await fetchMedia(1)
  }

  return {
    mediaList: readonly(mediaList),
    search,
    pagination: readonly(pagination),
    uploads,
    isUploading,
    fetchMedia,
    uploadMedia,
    deleteMedia,
    searchMedia,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMediaStore, import.meta.hot))
}
