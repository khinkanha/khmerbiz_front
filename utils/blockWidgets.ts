// Low-code widget helpers.
//
// Structured components (card, checklist, button, image, divider, columns) are
// inserted into the TinyMCE description editor as a single locked, non-editable
// element:
//
//   <div class="kb-widget kb-card mceNonEditable" contenteditable="false"
//        data-kb-type="card" data-kb-payload="<base64-utf8-json>">…preview…</div>
//
// The widget's structured data lives in `data-kb-payload` (UTF-8-safe base64 of
// JSON) and is the source of truth. The visible preview HTML is regenerated
// from the payload on every edit, so TinyMCE can never corrupt the data. The
// public site renders the same HTML via v-html, so it needs no special code.

export type KbWidgetType =
  | 'card'
  | 'checkbox'
  | 'button'
  | 'image'
  | 'divider'
  | 'columns'
  | 'spacer'
  | 'icon'
  | 'stats'
  | 'callout'
  | 'contact'
  | 'gallery'
  | 'quote'
  | 'accordion'
  | 'video'

export const KB_WIDGET_TYPES: KbWidgetType[] = [
  'card',
  'checkbox',
  'button',
  'image',
  'divider',
  'columns',
  'spacer',
  'icon',
  'stats',
  'callout',
  'contact',
  'gallery',
  'quote',
  'accordion',
  'video',
]

export const isKbWidgetType = (v: unknown): v is KbWidgetType =>
  typeof v === 'string' && (KB_WIDGET_TYPES as string[]).includes(v)

// ---- Data shapes ----------------------------------------------------------

export interface CardData {
  title: string
  text: string
  imageUrl: string // absolute URL (matches TinyMCE's remove_script_host:false behaviour)
  imageAlt: string
  linkUrl: string
  linkLabel: string
}
export interface CheckboxItem {
  label: string
  checked: boolean
}
export interface CheckboxData {
  title: string
  items: CheckboxItem[]
  style: 'check' | 'cross'
}
export interface ButtonData {
  label: string
  url: string
  variant: 'primary' | 'outline'
  align: 'left' | 'center' | 'right'
}
export interface ImageData {
  url: string // absolute URL
  alt: string
  caption: string
  width: string
  align: 'left' | 'center' | 'right'
}
export interface DividerData {
  style: 'solid' | 'dashed' | 'dotted'
}
export interface ColumnsData {
  leftHtml: string
  rightHtml: string
}
export interface SpacerData {
  height: string // px, e.g. '32'
}
export interface IconData {
  glyph: string // emoji/unicode character
  label: string
  size: string // px, e.g. '24'
  align: 'left' | 'center' | 'right'
}
export interface StatsItem {
  number: string
  label: string
}
export interface StatsData {
  items: StatsItem[]
  columns: number // 2 | 3 | 4
}
export interface CalloutData {
  variant: 'info' | 'success' | 'warning' | 'danger'
  title: string
  text: string
}
export interface ContactItem {
  type: 'phone' | 'email' | 'address' | 'hours'
  value: string
}
export interface ContactData {
  title: string
  items: ContactItem[]
}
export interface GalleryImage {
  url: string
  alt: string
}
export interface GalleryData {
  images: GalleryImage[]
  columns: number // 2 | 3 | 4
  caption: string
}
export interface QuoteData {
  quote: string
  author: string
  role: string
  avatarUrl: string
}
export interface AccordionItem {
  q: string
  a: string
}
export interface AccordionData {
  items: AccordionItem[]
  firstOpen: boolean
}
export interface VideoData {
  url: string
  caption: string
}

export const defaultData: Record<KbWidgetType, any> = {
  card: {
    title: 'Card title',
    text: 'Add a short description for this card.',
    imageUrl: '',
    imageAlt: '',
    linkUrl: '',
    linkLabel: 'Learn more',
  },
  checkbox: {
    title: 'Checklist',
    items: [
      { label: 'First item', checked: true },
      { label: 'Second item', checked: false },
    ],
    style: 'check',
  },
  button: { label: 'Click here', url: '#', variant: 'primary', align: 'left' },
  image: { url: '', alt: '', caption: '', width: '100%', align: 'center' },
  divider: { style: 'solid' },
  columns: { leftHtml: '<p>Left column</p>', rightHtml: '<p>Right column</p>' },
  spacer: { height: '32' },
  icon: { glyph: '⭐', label: '', size: '24', align: 'center' },
  stats: {
    items: [
      { number: '500+', label: 'Clients' },
      { number: '10', label: 'Years' },
      { number: '24/7', label: 'Support' },
    ],
    columns: 3,
  },
  callout: { variant: 'info', title: '', text: '' },
  contact: {
    title: '',
    items: [
      { type: 'phone', value: '' },
      { type: 'email', value: '' },
    ],
  },
  gallery: { images: [], columns: 3, caption: '' },
  quote: { quote: '', author: '', role: '', avatarUrl: '' },
  accordion: {
    items: [
      { q: 'First question?', a: 'Answer here.' },
      { q: 'Second question?', a: 'Answer here.' },
    ],
    firstOpen: true,
  },
  video: { url: '', caption: '' },
}

// ---- Payload encode/decode (UTF-8-safe base64; Khmer/Chinese safe) --------

export function encodePayload(data: unknown): string {
  const json = JSON.stringify(data)
  if (typeof btoa !== 'undefined') {
    return btoa(unescape(encodeURIComponent(json)))
  }
  // Node fallback (shouldn't normally be hit — admin pages are client-only)
  return Buffer.from(json, 'utf-8').toString('base64')
}

export function decodePayload(payload: string): any {
  if (!payload) return null
  try {
    const json =
      typeof atob !== 'undefined'
        ? decodeURIComponent(escape(atob(payload)))
        : Buffer.from(payload, 'base64').toString('utf-8')
    return JSON.parse(json)
  } catch {
    return null
  }
}

// ---- HTML helpers ---------------------------------------------------------

/** Escape a user-supplied string so it cannot break the widget markup. */
function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function cardHtml(d: CardData): string {
  const img = d.imageUrl
    ? `<img class="kb-card__img" src="${esc(d.imageUrl)}" alt="${esc(d.imageAlt)}" />`
    : ''
  const title = d.title ? `<h3 class="kb-card__title">${esc(d.title)}</h3>` : ''
  const text = d.text
    ? `<div class="kb-card__text">${esc(d.text).replace(/\n/g, '<br/>')}</div>`
    : ''
  const link =
    d.linkUrl && d.linkLabel
      ? `<a class="kb-card__link" href="${esc(d.linkUrl)}">${esc(d.linkLabel)}</a>`
      : ''
  return `${img}<div class="kb-card__body">${title}${text}${link}</div>`
}

function checkboxHtml(d: CheckboxData): string {
  const title = d.title
    ? `<h4 class="kb-checklist__title">${esc(d.title)}</h4>`
    : ''
  const markClass =
    d.style === 'cross' ? 'kb-checklist__mark--cross' : 'kb-checklist__mark--check'
  const items = (d.items || [])
    .map((it) => {
      const on = it.checked ? ' kb-checklist__item--on' : ''
      return `<li class="kb-checklist__item${on}"><span class="kb-checklist__mark ${markClass}"></span><span class="kb-checklist__label">${esc(
        it.label,
      )}</span></li>`
    })
    .join('')
  return `${title}<ul class="kb-checklist">${items}</ul>`
}

function buttonHtml(d: ButtonData): string {
  return `<div class="kb-button-wrap" style="text-align:${esc(
    d.align,
  )}"><a class="kb-button kb-button--${esc(d.variant)}" href="${esc(
    d.url || '#',
  )}">${esc(d.label)}</a></div>`
}

function imageHtml(d: ImageData): string {
  if (!d.url) return `<div class="kb-image kb-image--empty">No image selected</div>`
  const cap = d.caption
    ? `<figcaption class="kb-image__caption">${esc(d.caption)}</figcaption>`
    : ''
  return `<figure class="kb-image" style="max-width:${esc(
    d.width,
  )};text-align:${esc(d.align)}"><img src="${esc(d.url)}" alt="${esc(
    d.alt,
  )}" />${cap}</figure>`
}

function dividerHtml(d: DividerData): string {
  return `<hr class="kb-divider kb-divider--${esc(d.style)}" />`
}

function columnsHtml(d: ColumnsData): string {
  // leftHtml/rightHtml are HTML entered in the dialog; they live inside a locked
  // widget so TinyMCE will not rewrite them.
  return `<div class="kb-columns"><div class="kb-col">${
    d.leftHtml || ''
  }</div><div class="kb-col">${d.rightHtml || ''}</div></div>`
}

function spacerHtml(d: SpacerData): string {
  const h = parseInt(String(d.height), 10)
  const px = Number.isFinite(h) && h > 0 ? h : 32
  return `<div class="kb-spacer" style="height:${px}px"></div>`
}

function iconHtml(d: IconData): string {
  const s = parseInt(String(d.size), 10)
  const px = Number.isFinite(s) && s > 0 ? s : 24
  const glyph = `<span class="kb-icon__glyph" style="font-size:${px}px">${esc(d.glyph)}</span>`
  const label = d.label ? `<span class="kb-icon__label">${esc(d.label)}</span>` : ''
  return `<div class="kb-icon" style="text-align:${esc(d.align)}">${glyph}${label}</div>`
}

function statsHtml(d: StatsData): string {
  const c = Number(d.columns)
  const cols = [2, 3, 4].includes(c) ? c : 3
  const items = (d.items || [])
    .filter((it) => it.number || it.label)
    .map(
      (it) =>
        `<div class="kb-stats__item"><span class="kb-stats__num">${esc(
          it.number,
        )}</span><span class="kb-stats__label">${esc(it.label)}</span></div>`,
    )
    .join('')
  return `<div class="kb-stats" style="--kb-cols:${cols}">${items}</div>`
}

function calloutHtml(d: CalloutData): string {
  const variant = ['info', 'success', 'warning', 'danger'].includes(d.variant)
    ? d.variant
    : 'info'
  const title = d.title ? `<h4 class="kb-callout__title">${esc(d.title)}</h4>` : ''
  const text = d.text
    ? `<div class="kb-callout__text">${esc(d.text).replace(/\n/g, '<br/>')}</div>`
    : ''
  return `<div class="kb-callout kb-callout--${variant}">${title}${text}</div>`
}

const contactIcon: Record<ContactItem['type'], string> = {
  phone: '📞',
  email: '📧',
  address: '📍',
  hours: '🕒',
}
function contactHtml(d: ContactData): string {
  const title = d.title ? `<h4 class="kb-contact__title">${esc(d.title)}</h4>` : ''
  const items = (d.items || [])
    .filter((it) => it.value)
    .map((it) => {
      const ic = contactIcon[it.type] || '•'
      const value =
        it.type === 'phone'
          ? `<a class="kb-contact__value" href="tel:${esc(it.value)}">${esc(it.value)}</a>`
          : it.type === 'email'
            ? `<a class="kb-contact__value" href="mailto:${esc(it.value)}">${esc(it.value)}</a>`
            : `<span class="kb-contact__value">${esc(it.value)}</span>`
      return `<li class="kb-contact__item"><span class="kb-contact__icon">${ic}</span>${value}</li>`
    })
    .join('')
  if (!items) return title
  return `${title}<ul class="kb-contact">${items}</ul>`
}

function galleryHtml(d: GalleryData): string {
  const c = Number(d.columns)
  const cols = [2, 3, 4].includes(c) ? c : 3
  const imgs = (d.images || [])
    .filter((im) => im.url)
    .map(
      (im) =>
        `<div class="kb-gallery__cell"><img src="${esc(im.url)}" alt="${esc(
          im.alt,
        )}" /></div>`,
    )
    .join('')
  if (!imgs) return `<div class="kb-gallery kb-gallery--empty">No images selected</div>`
  const cap = d.caption
    ? `<figcaption class="kb-gallery__caption">${esc(d.caption)}</figcaption>`
    : ''
  return `<figure class="kb-gallery"><div class="kb-gallery__grid" style="--kb-cols:${cols}">${imgs}</div>${cap}</figure>`
}

function quoteHtml(d: QuoteData): string {
  const quote = d.quote
    ? `<blockquote class="kb-quote__text">${esc(d.quote).replace(/\n/g, '<br/>')}</blockquote>`
    : ''
  const avatar = d.avatarUrl
    ? `<img class="kb-quote__avatar" src="${esc(d.avatarUrl)}" alt="${esc(d.author)}" />`
    : ''
  const author = d.author ? `<span class="kb-quote__author">${esc(d.author)}</span>` : ''
  const role = d.role ? `<span class="kb-quote__role">${esc(d.role)}</span>` : ''
  const meta =
    avatar || author || role
      ? `<figcaption class="kb-quote__meta">${avatar}${author}${role}</figcaption>`
      : ''
  return `<figure class="kb-quote">${quote}${meta}</figure>`
}

function accordionHtml(d: AccordionData): string {
  // Native <details>/<summary> — expand/collapse needs no JavaScript.
  const items = (d.items || [])
    .filter((it) => it.q || it.a)
    .map((it, i) => {
      const open = d.firstOpen && i === 0 ? ' open' : ''
      return `<details class="kb-accordion__item"${open}><summary class="kb-accordion__q">${esc(
        it.q,
      )}</summary><div class="kb-accordion__a">${esc(it.a).replace(/\n/g, '<br/>')}</div></details>`
    })
    .join('')
  return `<div class="kb-accordion">${items}</div>`
}

/** Convert a YouTube/Vimeo page URL to an embeddable URL. File/unknown URLs pass through. */
export function toEmbedUrl(url: string): string {
  const u = String(url || '').trim()
  if (!u) return ''
  const yt = u.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/,
  )
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`
  return u
}
function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(String(url || ''))
}
function videoHtml(d: VideoData): string {
  const url = String(d.url || '').trim()
  if (!url) return `<div class="kb-video kb-video--empty">No video URL</div>`
  const cap = d.caption
    ? `<figcaption class="kb-video__caption">${esc(d.caption)}</figcaption>`
    : ''
  const media = isVideoFile(url)
    ? `<div class="kb-video__frame"><video src="${esc(url)}" controls preload="metadata"></video></div>`
    : `<div class="kb-video__frame"><iframe src="${esc(
        toEmbedUrl(url),
      )}" title="${esc(d.caption || 'Video')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
  return `<figure class="kb-video">${media}${cap}</figure>`
}

/** Public-facing inner HTML of a widget (also shown inside TinyMCE). */
export function previewHtml(type: KbWidgetType, data: any): string {
  switch (type) {
    case 'card':
      return cardHtml(data)
    case 'checkbox':
      return checkboxHtml(data)
    case 'button':
      return buttonHtml(data)
    case 'image':
      return imageHtml(data)
    case 'divider':
      return dividerHtml(data)
    case 'columns':
      return columnsHtml(data)
    case 'spacer':
      return spacerHtml(data)
    case 'icon':
      return iconHtml(data)
    case 'stats':
      return statsHtml(data)
    case 'callout':
      return calloutHtml(data)
    case 'contact':
      return contactHtml(data)
    case 'gallery':
      return galleryHtml(data)
    case 'quote':
      return quoteHtml(data)
    case 'accordion':
      return accordionHtml(data)
    case 'video':
      return videoHtml(data)
    default:
      return ''
  }
}

/** Full locked widget markup to insert into TinyMCE. */
export function createWidgetHtml(type: KbWidgetType, data?: any): string {
  const payload = encodePayload(data ?? defaultData[type])
  const inner = previewHtml(type, data ?? defaultData[type])
  return `<div class="kb-widget kb-${type} mceNonEditable" contenteditable="false" data-kb-type="${type}" data-kb-payload="${payload}">${inner}</div>`
}

/**
 * Read a widget from a DOM node (the clicked/dropped target inside TinyMCE).
 * Walks up to the nearest `.kb-widget` ancestor. Returns null if not a widget.
 */
export function readWidget(node: any): { type: KbWidgetType; data: any } | null {
  if (!node) return null
  let el: any = null
  if (node.closest && typeof node.closest === 'function') {
    el = node.closest('.kb-widget')
  } else if (node.nodeType === 1) {
    el = node.classList && node.classList.contains('kb-widget') ? node : null
  }
  if (!el) return null
  const type = el.getAttribute('data-kb-type')
  if (!isKbWidgetType(type)) return null
  const data = decodePayload(el.getAttribute('data-kb-payload') || '') || {
    ...defaultData[type],
  }
  return { type, data }
}

/** Drag marker put on the DataTransfer by the palette ("kb:<type>"). */
export const KB_DRAG_PREFIX = 'kb:'

export function parseDragMarker(value: unknown): KbWidgetType | null {
  if (typeof value !== 'string' || !value.startsWith(KB_DRAG_PREFIX)) return null
  const type = value.slice(KB_DRAG_PREFIX.length)
  return isKbWidgetType(type) ? type : null
}

// Bridge for palette-drag → TinyMCE-drop. The palette sets this on dragstart;
// the TinyMCE `drop` handler (in pages/admin/content/[id].vue) reads it as a
// fallback to the DataTransfer marker, which can be unreliable across the
// editor's iframe. Module-level state is shared because both files import this
// module.
let __dragType: KbWidgetType | null = null
export const setKbDrag = (type: KbWidgetType | null) => {
  __dragType = type
}
export const getKbDrag = (): KbWidgetType | null => __dragType
