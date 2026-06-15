export interface Media {
  photo_id: number
  file_name: string
  title: string | null
  server_id: number
  domain_id: number
  code: string
}

export interface PresignedUrlResponse {
  uploadUrl: string
  key: string
}

export interface UploadConfirmRequest {
  key: string
  originalName: string
  folder?: string
}

export interface MediaUpload {
  title?: string
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}
