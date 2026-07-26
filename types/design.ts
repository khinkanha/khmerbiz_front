// ============================================================================
// Site Designer data model — single source of truth for a tenant's site look.
// Persisted as JSON (see stores/design.ts + backend `site_designs` table).
// Phase 1 uses `style` only; header/footer/pages are defined now so later
// phases reuse the same shape with no migration.
// ============================================================================

/** Global color tokens. Each maps to an existing CSS variable on .public-layout. */
export interface DesignColors {
  primary: string          // -> --primary-color
  primaryDark: string      // -> --primary-dark
  background: string       // -> --bg-color
  text: string             // -> --text-color
  navBackground: string    // -> --nav-bg
  footerBackground: string // -> --footer-bg
  cardBackground: string   // -> --card-bg
}

export interface DesignFonts {
  heading: string
  body: string
  baseSize: number // px
}

export interface DesignStyle {
  colors: DesignColors
  fonts: DesignFonts
  radius: number  // px  (-> --kb-radius)
  spacing: number // px
}

// ---- Phase 3: header / footer region composition ---------------------------

export type RegionItemType = 'logo' | 'menu' | 'social' | 'search' | 'language' | 'text' | 'image' | 'contact'

export interface RegionItem {
  type: RegionItemType
  payload?: Record<string, any>
}

export interface HeaderRegion {
  id: string
  items: RegionItem[]
}

export interface HeaderDesign {
  layout: string
  regions: HeaderRegion[]
}

export interface FooterColumn {
  items: RegionItem[]
}

export interface FooterDesign {
  columns: FooterColumn[]
}

// ---- Phase 2: page section composition -------------------------------------

export interface WidgetSlot {
  kind: 'widget'
  type: string
  payload: Record<string, any>
}

export interface ContentSlot {
  kind: 'content'
  menuId?: number
  contentType: number
}

export interface BuiltInSlot {
  kind: 'banner' | 'social'
}

export type SectionSlot = WidgetSlot | ContentSlot | BuiltInSlot

export interface PageDesign {
  sections: SectionSlot[]
}

// ---- The whole document ----------------------------------------------------

export interface SiteDesign {
  version: number
  domain_id: number | null
  style: DesignStyle | null
  header: HeaderDesign | null
  footer: FooterDesign | null
  pages: Record<string, PageDesign>
}

// ---- Helpers / constants ---------------------------------------------------

/**
 * Map a DesignStyle to CSS custom properties for `:style` binding on the
 * layout root. Color vars override the existing theme tokens; --kb-* vars are
 * consumed by the (non-scoped) token-consumer styles in layouts/default.vue.
 */
export const designTokensToCssVars = (
  style: DesignStyle | null | undefined
): Record<string, string> => {
  const c = style?.colors
  const vars: Record<string, string> = {}
  if (c) {
    vars['--primary-color'] = c.primary
    vars['--primary-dark'] = c.primaryDark
    vars['--bg-color'] = c.background
    vars['--text-color'] = c.text
    vars['--nav-bg'] = c.navBackground
    vars['--footer-bg'] = c.footerBackground
    vars['--card-bg'] = c.cardBackground
  }
  if (style?.fonts?.body) vars['--kb-body-font'] = style.fonts.body
  if (style?.fonts?.heading) vars['--kb-heading-font'] = style.fonts.heading
  if (typeof style?.radius === 'number') vars['--kb-radius'] = `${style.radius}px`
  return vars
}

/** Six color presets matching settings.theme (ColorStyle 0-5). */
export const THEME_PRESETS: Record<number, DesignColors> = {
  0: { primary: '#3b82f6', primaryDark: '#1d4ed8', background: '#ffffff', text: '#1f2937', navBackground: '#3b82f6', footerBackground: '#1f2937', cardBackground: '#ffffff' },
  1: { primary: '#0ea5e9', primaryDark: '#0369a1', background: '#0f172a', text: '#e2e8f0', navBackground: '#1e293b', footerBackground: '#020617', cardBackground: '#1e293b' },
  2: { primary: '#dc2626', primaryDark: '#991b1b', background: '#ffffff', text: '#1f2937', navBackground: '#dc2626', footerBackground: '#1f2937', cardBackground: '#ffffff' },
  3: { primary: '#16a34a', primaryDark: '#166534', background: '#ffffff', text: '#1f2937', navBackground: '#16a34a', footerBackground: '#1f2937', cardBackground: '#ffffff' },
  4: { primary: '#7c3aed', primaryDark: '#5b21b6', background: '#ffffff', text: '#1f2937', navBackground: '#7c3aed', footerBackground: '#1f2937', cardBackground: '#ffffff' },
  5: { primary: '#eab308', primaryDark: '#a16207', background: '#ffffff', text: '#1f2937', navBackground: '#eab308', footerBackground: '#1f2937', cardBackground: '#ffffff' },
}

export const PRESET_NAMES: Record<number, string> = {
  0: 'Blue (default)',
  1: 'Dark',
  2: 'Red',
  3: 'Green',
  4: 'Purple',
  5: 'Yellow',
}

export const FONT_OPTIONS = [
  { label: 'Inter', value: 'Inter, system-ui, sans-serif' },
  { label: 'Poppins', value: 'Poppins, system-ui, sans-serif' },
  { label: 'Roboto', value: 'Roboto, system-ui, sans-serif' },
  { label: 'Open Sans', value: '"Open Sans", system-ui, sans-serif' },
  { label: 'Battambang (ខ្មែរ)', value: "'Battambang', system-ui, sans-serif" },
  { label: 'Moul (ខ្មែរ)', value: "'Moul', system-ui, sans-serif" },
  { label: 'System default', value: 'system-ui, sans-serif' },
]

export const defaultStyle = (themeIndex = 0): DesignStyle => ({
  colors: { ...(THEME_PRESETS[themeIndex] ?? THEME_PRESETS[0]) },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    baseSize: 16,
  },
  radius: 10,
  spacing: 16,
})

/** A curated "start from a look" preset: coordinated colors + fonts + radius. */
export interface DesignPreset {
  name: string
  colors: DesignColors
  fonts: Pick<DesignFonts, 'heading' | 'body' | 'baseSize'>
  radius: number
}

/** Curated design presets offered as quick-starts in the Style tab. */
export const DESIGN_PRESETS: DesignPreset[] = [
  {
    name: 'Ocean',
    colors: { primary: '#0ea5e9', primaryDark: '#0369a1', background: '#f8fafc', text: '#0f172a', navBackground: '#0ea5e9', footerBackground: '#0f172a', cardBackground: '#ffffff' },
    fonts: { heading: 'Poppins, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif', baseSize: 16 },
    radius: 12,
  },
  {
    name: 'Forest',
    colors: { primary: '#16a34a', primaryDark: '#166534', background: '#ffffff', text: '#1f2937', navBackground: '#16a34a', footerBackground: '#14532d', cardBackground: '#ffffff' },
    fonts: { heading: 'Roboto, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif', baseSize: 16 },
    radius: 8,
  },
  {
    name: 'Sunset',
    colors: { primary: '#f97316', primaryDark: '#c2410c', background: '#fffbeb', text: '#1f2937', navBackground: '#f97316', footerBackground: '#7c2d12', cardBackground: '#ffffff' },
    fonts: { heading: 'Poppins, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif', baseSize: 17 },
    radius: 16,
  },
  {
    name: 'Royal',
    colors: { primary: '#7c3aed', primaryDark: '#5b21b6', background: '#faf5ff', text: '#1f2937', navBackground: '#7c3aed', footerBackground: '#2e1065', cardBackground: '#ffffff' },
    fonts: { heading: 'Poppins, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif', baseSize: 16 },
    radius: 10,
  },
  {
    name: 'Coral',
    colors: { primary: '#ef4444', primaryDark: '#b91c1c', background: '#ffffff', text: '#1f2937', navBackground: '#ef4444', footerBackground: '#1f2937', cardBackground: '#ffffff' },
    fonts: { heading: 'Inter, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif', baseSize: 16 },
    radius: 6,
  },
  {
    name: 'Slate',
    colors: { primary: '#475569', primaryDark: '#1e293b', background: '#ffffff', text: '#0f172a', navBackground: '#1e293b', footerBackground: '#020617', cardBackground: '#f8fafc' },
    fonts: { heading: 'Inter, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif', baseSize: 15 },
    radius: 4,
  },
]

export const defaultDesign = (domainId: number | null = null, themeIndex = 0): SiteDesign => ({
  version: 1,
  domain_id: domainId,
  style: defaultStyle(themeIndex),
  header: null,
  footer: null,
  pages: {},
})

/** Default header: logo + menu on the left, social on the right (center empty). */
export const defaultHeader = (): HeaderDesign => ({
  layout: 'logo-left',
  regions: [
    { id: 'left', items: [{ type: 'logo' }, { type: 'menu' }] },
    { id: 'center', items: [] },
    { id: 'right', items: [{ type: 'social' }] },
  ],
})

/** Default footer: 3 columns (about text / quick links / social). */
export const defaultFooter = (): FooterDesign => ({
  columns: [
    { items: [{ type: 'text', payload: { text: 'About your company.' } }] },
    { items: [{ type: 'menu' }] },
    { items: [{ type: 'social' }] },
  ],
})
