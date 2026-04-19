export interface Media {
  media_id: number
  domain_id: number
  file_name: string
  original_name: string
  file_type: string
  file_size: number
  file_url: string
  folder: string
  userid: number
  created_at: string
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
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}
