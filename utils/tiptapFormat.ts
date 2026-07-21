/**
 * Tiptap format detection and migration utilities.
 *
 * Detects whether a description value is a Tiptap JSON document (new format)
 * or a legacy TinyMCE wrapper (old format: { title, description, ... }).
 *
 * Also provides a helper to render either format using BlockRenderer.
 */

export interface TiptapDoc {
  type: 'doc'
  content?: TiptapNode[]
}

export interface TiptapNode {
  type: string
  attrs?: Record<string, any>
  content?: TiptapNode[]
  marks?: Array<{ type: string; attrs?: Record<string, any> }>
  text?: string
}

/** Returns true if the value is a Tiptap JSON document. */
export function isTiptapDoc(value: string | null | undefined): boolean {
  if (!value || typeof value !== 'string') return false
  const trimmed = value.trim()
  return trimmed.startsWith('{"type":"doc"') || trimmed.startsWith('{"type": "doc"')
}

/** Parse a value as a Tiptap doc, returning null if it's not. */
export function parseTiptapDoc(value: string | null | undefined): TiptapDoc | null {
  if (!isTiptapDoc(value)) return null
  try {
    return JSON.parse(value!) as TiptapDoc
  } catch {
    return null
  }
}

/** Parse a legacy description wrapper (TinyMCE format). */
export function parseLegacyDescription(value: string | null | undefined): {
  title: string
  description: string
  [key: string]: any
} | null {
  if (!value || typeof value !== 'string') return null
  if (isTiptapDoc(value)) return null
  try {
    const parsed = JSON.parse(value)
    if (typeof parsed === 'object' && parsed !== null) {
      return {
        title: parsed.title || '',
        description: parsed.description || parsed.longdes || parsed.shortdes || '',
        ...parsed,
      }
    }
  } catch {
    // Not JSON — treat as plain text
  }
  return { title: '', description: value }
}

/**
 * The "smart description" — what most public-site components need.
 * Either:
 *  - a Tiptap doc (new), or
 *  - a legacy wrapper with title/description fields.
 */
export interface SmartDescription {
  /** 'tiptap' or 'legacy' */
  format: 'tiptap' | 'legacy'
  /** Parsed Tiptap doc, if format is 'tiptap' */
  tiptapDoc?: TiptapDoc
  /** Title (legacy only) */
  title: string
  /** Plain HTML / text (legacy only) */
  description: string
  /** All legacy fields (legacy only) */
  legacy?: Record<string, any>
}

export function parseSmartDescription(value: string | null | undefined): SmartDescription | null {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return null
  }
  if (isTiptapDoc(value)) {
    const doc = parseTiptapDoc(value)
    if (doc) {
      return { format: 'tiptap', tiptapDoc: doc, title: '', description: '' }
    }
  }
  const legacy = parseLegacyDescription(value)
  if (legacy) {
    return {
      format: 'legacy',
      title: legacy.title,
      description: legacy.description,
      legacy,
    }
  }
  return null
}
