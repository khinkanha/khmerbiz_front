export interface Setting {
  setting_id: number
  domain_id: number
  domain_name: string | null
  logo: string
  mobile_logo: string
  footer: string | null
  title: string | null
  menu_position: string | null
  banner_position: string | null
  banner_display: number
  logo_position: string | null
  logo_align: string | null
  menu_align: string | null
  menu_pos: number | null
  screen_mode: string | null
  s_mode: number | null
  banner_mode: string | null
  banner_pos: number | null
  plugin_mode: string | null
  background: string | null
  footer_align: number
  theme: number
  tracking_id: string | null
  chat_script: string | null
  page_style: number
  logo_pos: number | null
}

export enum ColorStyle {
  DEFAULT = 0,
  INVERSE = 1,
  RED = 2,
  GREEN = 3,
  PURPLE = 4,
  YELLOW = 5,
}

export enum TemplateStyle {
  CLASSIC = 0,
  SINGLE_PAGE = 1,
  MAGAZINE = 2,
  HERO = 3,
}

export interface Banner {
  banner_id: number
  domain_id: number
  title: string | null
  photo: string
  link: string | null
  banner_order: number
  status: number
  image: string | null
}

export interface BannerForm {
  title: string
  photo: File | string | null
  link: string
  banner_order: number
  status: number
  image: string | null
}

export interface SocialMedia {
  smid: number
  domain_id: number
  stype: number
  link: string
}

export const SOCIAL_ICONS: Record<number, string> = {
  1: 'pi pi-google',
  2: 'pi pi-facebook',
  3: 'pi pi-youtube',
  4: 'pi pi-linkedin',
  5: 'pi pi-twitter',
}

export const getSocialIcon = (stype: number): string => {
  return SOCIAL_ICONS[stype] || 'pi pi-globe'
}

export interface SocialMediaForm {
  stype: number
  link: string
}

export interface Language {
  lang_id: number
  domain_id: number
  lang_code: string
  lang_name: string
  flag: number
  status: number
  is_default: number
}
