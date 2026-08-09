// Site Designer — page-section helpers.
//
// A page is an ordered list of SectionSlot (see types/design.ts). Three slot
// kinds are supported:
//   - 'widget'   — self-contained block from utils/blockWidgets.ts; carries its
//                  own payload and renders publicly via createWidgetHtml/blocks.css
//                  (the same pipeline used inside articles, so blocks look identical).
//   - 'content'  — binds to tenant content by menu item / content type and renders
//                  via the shared <ContentRenderer> (Phase 2b).
//   - 'banner'   — renders the tenant's banners via <BannerSlideshow> (Phase 2b).
//   - 'social'   — renders the tenant's social links (Phase 2b).

import {
  createWidgetHtml,
  defaultData,
  isKbWidgetType,
  type KbWidgetType,
} from './blockWidgets'
import type { SectionSlot, WidgetSlot, ContentSlot, BuiltInSlot, RegionItem, RegionItemType } from '~/types'
import { ContentType } from '~/types'

// ---- Palette types ---------------------------------------------------------

/** Widget palette tile. */
export interface WidgetPaletteItem {
  kind: 'widget'
  type: KbWidgetType
  label: string
  icon: string
}

/** Content-type palette tile (creates a `kind: 'content'` slot). */
export interface ContentPaletteItem {
  kind: 'content'
  contentType: number
  label: string
  icon: string
}

/** Built-in palette tile (banner / social — no payload). */
export interface BuiltInPaletteItem {
  kind: 'banner' | 'social'
  label: string
  icon: string
}

export type PaletteItem = WidgetPaletteItem | ContentPaletteItem | BuiltInPaletteItem

export interface PaletteGroup {
  group: string
  items: PaletteItem[]
}

// ---- Content-type metadata -------------------------------------------------

/** Human label + icon per ContentType (used in the palette + section list). */
export const CONTENT_TYPE_META: Record<number, { label: string; icon: string }> = {
  [ContentType.ARTICLE]: { label: 'Articles', icon: 'pi pi-file-edit' },
  [ContentType.PHOTO]: { label: 'Photo gallery', icon: 'pi pi-images' },
  [ContentType.VIDEO]: { label: 'Videos', icon: 'pi pi-video' },
  [ContentType.DOCUMENT]: { label: 'Documents', icon: 'pi pi-file-pdf' },
  [ContentType.NEWS]: { label: 'News', icon: 'pi pi-newspaper' },
  [ContentType.MAP]: { label: 'Map', icon: 'pi pi-map-marker' },
  [ContentType.PRODUCT]: { label: 'Products', icon: 'pi pi-shopping-bag' },
}

// ---- Palettes --------------------------------------------------------------

/** Blocks offered in the Build tab palette. */
export const DESIGNER_PALETTE: PaletteGroup[] = [
  {
    group: 'Layout',
    items: [
      { kind: 'widget', type: 'columns', label: 'Columns', icon: 'pi pi-table' },
      { kind: 'widget', type: 'divider', label: 'Divider', icon: 'pi pi-minus' },
      { kind: 'widget', type: 'spacer', label: 'Spacer', icon: 'pi pi-arrows-v' },
    ],
  },
  {
    group: 'Content blocks',
    items: [
      { kind: 'widget', type: 'card', label: 'Card', icon: 'pi pi-id-card' },
      { kind: 'widget', type: 'callout', label: 'Callout', icon: 'pi pi-info-circle' },
      { kind: 'widget', type: 'stats', label: 'Stats', icon: 'pi pi-chart-bar' },
      { kind: 'widget', type: 'quote', label: 'Quote', icon: 'pi pi-comment' },
      { kind: 'widget', type: 'accordion', label: 'FAQ', icon: 'pi pi-list' },
      { kind: 'widget', type: 'checkbox', label: 'Checklist', icon: 'pi pi-check-square' },
      { kind: 'widget', type: 'contact', label: 'Contact info', icon: 'pi pi-phone' },
    ],
  },
  {
    group: 'Media',
    items: [
      { kind: 'widget', type: 'image', label: 'Image', icon: 'pi pi-image' },
      { kind: 'widget', type: 'gallery', label: 'Gallery', icon: 'pi pi-images' },
      { kind: 'widget', type: 'video', label: 'Video', icon: 'pi pi-video' },
      { kind: 'widget', type: 'icon', label: 'Icon', icon: 'pi pi-star' },
    ],
  },
  {
    group: 'Action',
    items: [
      { kind: 'widget', type: 'button', label: 'Button', icon: 'pi pi-share' },
    ],
  },
  // Phase 2b — bind to live tenant content. Each tile pre-sets a contentType.
  {
    group: 'Site content',
    items: [
      { kind: 'content', contentType: ContentType.NEWS, label: 'News', icon: CONTENT_TYPE_META[ContentType.NEWS].icon },
      { kind: 'content', contentType: ContentType.PHOTO, label: 'Photos', icon: CONTENT_TYPE_META[ContentType.PHOTO].icon },
      { kind: 'content', contentType: ContentType.VIDEO, label: 'Videos', icon: CONTENT_TYPE_META[ContentType.VIDEO].icon },
      { kind: 'content', contentType: ContentType.PRODUCT, label: 'Products', icon: CONTENT_TYPE_META[ContentType.PRODUCT].icon },
      { kind: 'content', contentType: ContentType.ARTICLE, label: 'Articles', icon: CONTENT_TYPE_META[ContentType.ARTICLE].icon },
      { kind: 'content', contentType: ContentType.DOCUMENT, label: 'Documents', icon: CONTENT_TYPE_META[ContentType.DOCUMENT].icon },
      { kind: 'content', contentType: ContentType.MAP, label: 'Map', icon: CONTENT_TYPE_META[ContentType.MAP].icon },
    ],
  },
  // Phase 2b — built-in slots that pull from site config.
  {
    group: 'Built-in',
    items: [
      { kind: 'banner', label: 'Banners', icon: 'pi pi-image' },
      { kind: 'social', label: 'Social links', icon: 'pi pi-share-alt' },
    ],
  },
]

/** All palette widget tiles, flattened (for widget label/icon lookups). */
export const ALL_PALETTE_TYPES: WidgetPaletteItem[] = DESIGNER_PALETTE.flatMap((g) =>
  g.items.filter((i): i is WidgetPaletteItem => i.kind === 'widget'),
)

// ---- Slot factories --------------------------------------------------------

/** Create a new widget slot initialised with the block's default data. */
export const makeWidgetSlot = (type: KbWidgetType): WidgetSlot => ({
  kind: 'widget',
  type,
  payload: JSON.parse(JSON.stringify(defaultData[type] ?? {})),
})

/** Create a content slot bound to a content type (optionally a specific menu). */
export const makeContentSlot = (contentType: number, menuId?: number): ContentSlot => ({
  kind: 'content',
  contentType,
  ...(menuId !== undefined ? { menuId } : {}),
})

/** Create a built-in banner/social slot. */
export const makeBuiltInSlot = (kind: 'banner' | 'social'): BuiltInSlot => ({ kind })

/** Build a slot from a palette item. */
export const makeSlotFromPalette = (item: PaletteItem): SectionSlot => {
  if (item.kind === 'widget') return makeWidgetSlot(item.type)
  if (item.kind === 'content') return makeContentSlot(item.contentType)
  return makeBuiltInSlot(item.kind)
}

// ---- Slot presentation -----------------------------------------------------

/** Human label for a slot (used in the section list). */
export const slotLabel = (slot: SectionSlot): string => {
  if (slot.kind === 'widget') {
    return ALL_PALETTE_TYPES.find((i) => i.type === slot.type)?.label ?? slot.type
  }
  if (slot.kind === 'content') {
    return CONTENT_TYPE_META[slot.contentType]?.label ?? `Content #${slot.contentType}`
  }
  return slot.kind === 'banner' ? 'Banners' : 'Social links'
}

/** Icon (PrimeIcons class) for a slot. */
export const slotIcon = (slot: SectionSlot): string => {
  if (slot.kind === 'widget') {
    return ALL_PALETTE_TYPES.find((i) => i.type === slot.type)?.icon ?? 'pi pi-th-large'
  }
  if (slot.kind === 'content') {
    return CONTENT_TYPE_META[slot.contentType]?.icon ?? 'pi pi-file'
  }
  return slot.kind === 'banner' ? 'pi pi-image' : 'pi pi-share-alt'
}

// ---- Slot rendering (widgets only) -----------------------------------------

/** Render a WIDGET slot to HTML for public display (v-html). Widget slots use
 *  the same markup as inside articles. Content/banner/social slots are NOT
 *  rendered as HTML strings — they render as Vue components in DesignerPage. */
export const renderSlotHtml = (slot: SectionSlot): string => {
  if (slot.kind === 'widget' && isKbWidgetType(slot.type)) {
    return createWidgetHtml(slot.type, slot.payload)
  }
  return ''
}

// ---- Page keys (multi-page support) ----------------------------------------

/**
 * Reserved key for the homepage.
 *
 * IMPORTANT on keying: throughout this app a "page" is identified by its menu
 * `item_id` — every menu link is `/pages/{domainId}/{itemId}`, and content is
 * joined by `content.menu_id = item_id`. `item_url` is NOT reliable (it is
 * empty/null for most menu items), so we key designed pages by `item_id` as a
 * string. `home` is the only non-item_id key.
 */
export const HOME_PAGE_KEY = 'home'

/** Page key for a menu item. Menu items without an id (shouldn't happen) fall
 *  back to 'home'. */
export const menuIdToPageKey = (itemId: number | string | null | undefined): string => {
  if (itemId === null || itemId === undefined || itemId === '') return HOME_PAGE_KEY
  return String(itemId)
}

/** Human-readable label for the page-key dropdown (kept for back-compat). */
export const isHomeKey = (key: string): boolean => key === HOME_PAGE_KEY

// ---- Phase 3: header / footer region items ---------------------------------

export interface RegionPaletteItem {
  type: RegionItemType
  label: string
  icon: string
}

/** Items that can be dropped into header regions. */
export const HEADER_ITEM_PALETTE: RegionPaletteItem[] = [
  { type: 'logo', label: 'Logo', icon: 'pi pi-image' },
  { type: 'menu', label: 'Menu', icon: 'pi pi-bars' },
  { type: 'social', label: 'Social', icon: 'pi pi-share-alt' },
  { type: 'language', label: 'Language', icon: 'pi pi-globe' },
  { type: 'text', label: 'Text', icon: 'pi pi-pencil' },
  { type: 'image', label: 'Image', icon: 'pi pi-image' },
]

/** Items that can be dropped into footer columns. */
export const FOOTER_ITEM_PALETTE: RegionPaletteItem[] = [
  { type: 'text', label: 'Text', icon: 'pi pi-pencil' },
  { type: 'social', label: 'Social', icon: 'pi pi-share-alt' },
  { type: 'menu', label: 'Quick links', icon: 'pi pi-list' },
  { type: 'contact', label: 'Contact', icon: 'pi pi-phone' },
  { type: 'image', label: 'Image', icon: 'pi pi-image' },
]

/** Create a region item with sensible default payload. */
export const makeRegionItem = (type: RegionItemType): RegionItem => {
  const payload: Record<string, any> = {}
  if (type === 'text') payload.text = 'New text block'
  else if (type === 'image') {
    payload.url = ''
    payload.alt = ''
  } else if (type === 'contact') {
    payload.phone = ''
    payload.email = ''
    payload.address = ''
  }
  return { type, payload }
}

const ALL_REGION_ITEMS: RegionPaletteItem[] = [...HEADER_ITEM_PALETTE, ...FOOTER_ITEM_PALETTE]

export const regionItemLabel = (item: RegionItem): string =>
  ALL_REGION_ITEMS.find((i) => i.type === item.type)?.label ?? item.type

export const regionItemIcon = (item: RegionItem): string =>
  ALL_REGION_ITEMS.find((i) => i.type === item.type)?.icon ?? 'pi pi-th-large'
