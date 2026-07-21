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

/**
 * Returns true if the value is the legacy wrapper shape {title, description}
 * AND the inner `description` field is itself a Tiptap doc string.
 *
 * This happens when the server's updateContent service double-wraps the
 * Tiptap JSON in {title, description} on save. We need to unwrap it
 * for the public-site renderer.
 */
export function isWrappedTiptapDoc(value: string | null | undefined): boolean {
  if (!value || typeof value !== 'string') return false
  if (isTiptapDoc(value)) return false  // already unwrapped
  try {
    const parsed = JSON.parse(value)
    if (typeof parsed !== 'object' || parsed === null) return false
    if (typeof parsed.description !== 'string') return false
    return isTiptapDoc(parsed.description)
  } catch {
    return false
  }
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
 * Handles three shapes:
 *  - Tiptap doc directly ({"type":"doc",...})
 *  - Legacy wrapper with HTML in description ({"title":"X","description":"<p>...</p>"})
 *  - Legacy wrapper with Tiptap JSON escaped in description
 *    ({"title":"X","description":"{\"type\":\"doc\",...}"}) — server double-wraps on save
 */
export interface SmartDescription {
  /** 'tiptap' | 'wrapped-tiptap' | 'legacy' */
  format: 'tiptap' | 'wrapped-tiptap' | 'legacy'
  /** Parsed Tiptap doc (tiptap and wrapped-tiptap) */
  tiptapDoc?: TiptapDoc
  /** Title (legacy and wrapped-tiptap) */
  title: string
  /** Plain HTML / text (legacy only — empty for tiptap formats) */
  description: string
  /** All legacy fields (legacy and wrapped-tiptap) */
  legacy?: Record<string, any>
}

export function parseSmartDescription(value: string | null | undefined): SmartDescription | null {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return null
  }
  // 1) Direct Tiptap doc
  if (isTiptapDoc(value)) {
    const doc = parseTiptapDoc(value)
    if (doc) {
      return { format: 'tiptap', tiptapDoc: doc, title: '', description: '' }
    }
  }
  // 2) Legacy wrapper (might contain HTML or Tiptap in description field)
  const legacy = parseLegacyDescription(value)
  if (legacy) {
    if (isTiptapDoc(legacy.description)) {
      // The server wrapped a Tiptap doc — unwrap it
      const doc = parseTiptapDoc(legacy.description)
      if (doc) {
        return {
          format: 'wrapped-tiptap',
          tiptapDoc: doc,
          title: legacy.title,
          description: '',
          legacy: { ...legacy, _innerDescription: legacy.description },
        }
      }
    }
    return {
      format: 'legacy',
      title: legacy.title,
      description: legacy.description,
      legacy,
    }
  }
  return null
}
