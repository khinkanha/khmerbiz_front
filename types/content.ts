export interface Content {
  content_id: number
  title: string
  description: string | null
  menu_id: number
  domain_id: number
  content_type: ContentType
  userid: number
  status: number
  lang_id: number
  items?: ContentItem[]
  news?: News[]
}

export interface ContentItem {
  item_id: number
  content_id: number
  title: string
  photo: string | null
  description: string | null
  video_url: string | null
  document_url: string | null
  priority: number
  is_feature: boolean
  status: number
}

export interface News {
  id: number
  content_id: number
  title: string
  short_description: string | null
  description: string | null
  photo: string | null
  publish_date: string | null
  status: number
  priority?: number
}

export interface ContentSection {
  content: Content
  items: ContentItem[]
  news?: News[]
}

export enum ContentType {
  ARTICLE = 0,
  PHOTO = 1,
  VIDEO = 2,
  DOCUMENT = 3,
  NEWS = 4,
  MAP = 5,
}

export interface ContentForm {
  title: string
  description: string
  menu_id: number
  content_type: ContentType
  lang_id: number
}

export interface ItemForm {
  title: string
  photo?: File | null
  description?: string
  video_url?: string
  document_url?: File | null
  priority?: number
  is_feature?: boolean
}

export interface NewsForm {
  title: string
  short_description: string
  description: string
  photo?: File | null
  publish_date?: string
}