export interface MenuItem {
  item_id: number
  item_name: string | null
  item_url: string | null
  parent_id: number
  item_order: number
  lang_id: number
  domain_id: number
  children?: MenuItem[]
  content_id?: number
  content_title?: string
  content_type?: number
}

export interface MenuForm {
  item_name: string
  item_url?: string
  parent_id: number
  item_order: number
  lang_id: number
  domain_id: number
}
