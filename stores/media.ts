import type { Media, PaginatedResponse } from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useApi} from '~/composables/useApi'
import { useUpload } from '~/composables/useUpload'

export const useMediaStore = defineStore('media', () => {
  const api = useApi()
  const { uploadFile, uploads, isUploading } = useUpload()

  const mediaList = ref<Media[]>([])
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

  const getPresignedUrl = async (fileName: string, fileType: string, folder: string = 'uploads') => {
    try {
      const response = await api.post<{
        uploadUrl: string
        key: string
      }>('/media/presigned', {
        fileName,
        fileType,
        folder,
      })

      if (response.success && response.data) {
        return response.data
      }

      return null
    } catch (error) {
      console.error('Failed to get presigned URL:', error)
      return null
    }
  }

  const uploadMedia = async (
    file: File,
    folder: string = 'uploads',
    onProgress?: (progress: number) => void
  ): Promise<number | null> => {
    return uploadFile(file, folder, onProgress)
  }

  const confirmUpload = async (key: string, originalName: string): Promise<number | null> => {
    try {
      const response = await api.post<{ media_id: number }>('/media/confirm', {
        key,
        originalName,
      })

      if (response.success && response.data) {
        return response.data.media_id
      }

      return null
    } catch (error) {
      console.error('Failed to confirm upload:', error)
      return null
    }
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
    try {
      const response = await api.get<Media[]>(`/media/search?q=${encodeURIComponent(query)}`)

      if (response.success && response.data) {
        mediaList.value = response.data
      }
    } catch (error) {
      console.error('Failed to search media:', error)
    }
  }

  return {
    mediaList: readonly(mediaList),
    pagination: readonly(pagination),
    uploads,
    isUploading,
    fetchMedia,
    getPresignedUrl,
    uploadMedia,
    confirmUpload,
    deleteMedia,
    searchMedia,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMediaStore, import.meta.hot))
}
