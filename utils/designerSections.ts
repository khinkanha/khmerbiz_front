// Site Designer — page-section helpers.
//
// A homepage is an ordered list of SectionSlot (see types/design.ts). Phase 2
// supports `kind: 'widget'` slots, which map 1:1 to the existing low-code widget
// types in utils/blockWidgets.ts. Each widget slot carries its own structured
// payload (data) and renders publicly via the same createWidgetHtml/blocks.css
// pipeline used inside articles — so a block looks identical on the public site.

import {
  createWidgetHtml,
  defaultData,
  isKbWidgetType,
  type KbWidgetType,
} from './blockWidgets'
import type { SectionSlot, WidgetSlot, RegionItem, RegionItemType } from '~/types'

export interface PaletteItem {
  type: KbWidgetType
  label: string
  icon: string
}

export interface PaletteGroup {
  group: string
  items: PaletteItem[]
}

/** Blocks offered in the Build tab palette (all are self-contained widget types). */
export const DESIGNER_PALETTE: PaletteGroup[] = [
  {
    group: 'Layout',
    items: [
      { type: 'columns', label: 'Columns', icon: 'pi pi-table' },
      { type: 'divider', label: 'Divider', icon: 'pi pi-minus' },
      { type: 'spacer', label: 'Spacer', icon: 'pi pi-arrows-v' },
    ],
  },
  {
    group: 'Content blocks',
    items: [
      { type: 'card', label: 'Card', icon: 'pi pi-id-card' },
      { type: 'callout', label: 'Callout', icon: 'pi pi-info-circle' },
      { type: 'stats', label: 'Stats', icon: 'pi pi-chart-bar' },
      { type: 'quote', label: 'Quote', icon: 'pi pi-comment' },
      { type: 'accordion', label: 'FAQ', icon: 'pi pi-list' },
      { type: 'checkbox', label: 'Checklist', icon: 'pi pi-check-square' },
      { type: 'contact', label: 'Contact info', icon: 'pi pi-phone' },
    ],
  },
  {
    group: 'Media',
    items: [
      { type: 'image', label: 'Image', icon: 'pi pi-image' },
      { type: 'gallery', label: 'Gallery', icon: 'pi pi-images' },
      { type: 'video', label: 'Video', icon: 'pi pi-video' },
      { type: 'icon', label: 'Icon', icon: 'pi pi-star' },
    ],
  },
  {
    group: 'Action',
    items: [
      { type: 'button', label: 'Button', icon: 'pi pi-share' },
    ],
  },
]

/** All palette block types, flattened. */
export const ALL_PALETTE_TYPES: PaletteItem[] = DESIGNER_PALETTE.flatMap((g) => g.items)

/** Create a new widget slot initialised with the block's default data. */
export const makeWidgetSlot = (type: KbWidgetType): WidgetSlot => ({
  kind: 'widget',
  type,
  payload: JSON.parse(JSON.stringify(defaultData[type] ?? {})),
})

/** Human label for a slot (used in the section list). */
export const slotLabel = (slot: SectionSlot): string => {
  if (slot.kind === 'widget') {
    const found = ALL_PALETTE_TYPES.find((i) => i.type === slot.type)
    return found?.label ?? slot.type
  }
  if (slot.kind === 'content') return 'Content section'
  return slot.kind
}

/** Icon (PrimeIcons class) for a slot. */
export const slotIcon = (slot: SectionSlot): string => {
  if (slot.kind === 'widget') {
    return ALL_PALETTE_TYPES.find((i) => i.type === slot.type)?.icon ?? 'pi pi-th-large'
  }
  return 'pi pi-file'
}

/** Render a slot to HTML for public display (v-html). Widget slots use the
 *  same markup as inside articles. Content/built-in slots return '' (Phase 2b). */
export const renderSlotHtml = (slot: SectionSlot): string => {
  if (slot.kind === 'widget' && isKbWidgetType(slot.type)) {
    return createWidgetHtml(slot.type, slot.payload)
  }
  return ''
}

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
