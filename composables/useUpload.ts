import type { MediaUpload, PresignedUrlResponse } from '~/types'
import { useApi } from '~/composables/useApi'

export const useUpload = () => {
  const api = useApi()
  const uploads = useState<MediaUpload[]>('uploads', () => [])
  const isUploading = ref(false)

  const getPresignedUrl = async (
    fileName: string,
    fileType: string,
    folder: string = 'uploads'
  ): Promise<PresignedUrlResponse | null> => {
    try {
      const response = await api.post<PresignedUrlResponse>('/media/presigned', {
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

  const uploadToS3 = async (
    presignedUrl: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = Math.round((e.loaded / e.total) * 100)
          onProgress(progress)
        }
      })

      xhr.addEventListener('load', () => {
        resolve(xhr.status === 200)
      })

      xhr.addEventListener('error', () => {
        resolve(false)
      })

      xhr.open('PUT', presignedUrl)
      xhr.setRequestHeader('Content-Type', file.type)
      xhr.send(file)
    })
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

  const uploadFile = async (
    file: File,
    folder: string = 'uploads',
    onProgress?: (progress: number) => void
  ): Promise<number | null> => {
    const uploadId = `${Date.now()}-${file.name}`
    const upload: MediaUpload = {
      file,
      progress: 0,
      status: 'pending',
    }

    uploads.value.push(upload)
    isUploading.value = true

    try {
      const presigned = await getPresignedUrl(file.name, file.type, folder)
      if (!presigned) {
        upload.status = 'error'
        upload.error = 'Failed to get presigned URL'
        return null
      }

      upload.status = 'uploading'

      const success = await uploadToS3(presigned.uploadUrl, file, (progress) => {
        upload.progress = progress
        onProgress?.(progress)
      })

      if (!success) {
        upload.status = 'error'
        upload.error = 'Failed to upload file'
        return null
      }

      const mediaId = await confirmUpload(presigned.key, file.name)

      if (mediaId) {
        upload.status = 'success'
        upload.progress = 100
        return mediaId
      } else {
        upload.status = 'error'
        upload.error = 'Failed to confirm upload'
        return null
      }
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
