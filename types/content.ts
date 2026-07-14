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
  products?: Product[]
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
  url: string | null
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

// Product/service catalog item. Detail fields (name, price, currency,
// shortdes, longdes, features[], photos[]) are stored as JSON in the
// `description` column — same convention as News. Parsed into ProductDetail.
export interface Product {
  id: number
  content_id: number
  userid: number
  status: number
  priority: number
  create_date: string | null
  publish_date: string | null
  description: string | null
  // Parsed fields (populated by parseProduct):
  name: string
  price?: number
  currency?: string
  shortdes?: string
  longdes?: string
  features?: string[]
  photos?: string[]
}

export interface ProductForm {
  name: string
  price?: number
  currency?: string
  shortdes?: string
  longdes?: string
  features: string[]
  photos: string[]
  priority?: number
  status?: number
}

export interface ContentSection {
  content: Content
  items: ContentItem[]
  news?: News[]
  products?: Product[]
}

export enum ContentType {
  ARTICLE = 0,
  PHOTO = 1,
  VIDEO = 2,
  DOCUMENT = 3,
  NEWS = 4,
  MAP = 5,
  PRODUCT = 6,
}

export interface ContentForm {
  title: string
  description: string
  menu_id: number
  content_type: ContentType
  lang_id: number,
  status: number
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