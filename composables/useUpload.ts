import type { MediaUpload } from '~/types'
import { useApi } from '~/composables/useApi'

export const useUpload = () => {
  const api = useApi()
  const uploads = useState<MediaUpload[]>('uploads', () => [])
  const isUploading = ref(false)

  const uploadFile = async (
    file: File,
    folder: string = 'uploads',
    onProgress?: (progress: number) => void
  ): Promise<number | null> => {
    const upload: MediaUpload = {
      file,
      progress: 0,
      status: 'pending',
    }

    uploads.value.push(upload)
    isUploading.value = true

    try {
      upload.status = 'uploading'

      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', file.name)

      const response = await api.post<{ photo_id: number; file_name: string }>('/media/upload', formData)

      if (response.success && response.data) {
        upload.status = 'success'
        upload.progress = 100
        onProgress?.(100)
        return response.data.photo_id
      }

      upload.status = 'error'
      upload.error = response.message || 'Failed to upload file'
      return null
    } catch (error: any) {
      upload.status = 'error'
      upload.error = error.message || 'Upload failed'
      return null
    } finally {
      isUploading.value = uploads.value.some(u => u.status === 'uploading')
    }
  }

  const clearUploads = () => {
    uploads.value = []
  }

  const removeUpload = (uploadId: string) => {
    const index = uploads.value.findIndex(u => u.file.name === uploadId)
    if (index !== -1) {
      uploads.value.splice(index, 1)
    }
  }

  return {
    uploads,
    isUploading,
    uploadFile,
    clearUploads,
    removeUpload,
  }
}
