/**
 * Tiptap custom block extensions for khmer.biz.
 *
 * Phase 0 ships 4 block types:
 *   - heading   (StarterKit has this built-in)
 *   - paragraph (StarterKit has this built-in)
 *   - image     (@tiptap/extension-image)
 *   - card      (custom Node — see CardBlock)
 *   - legacyHtml (read-only fallback for old TinyMCE content)
 */
import { Node, mergeAttributes } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

/**
 * CardBlock: a structured block containing a heading, paragraph, optional image, and optional button.
 * Renders as a card layout (image on top, text below on mobile; side-by-side on desktop).
 */
export const CardBlock = Node.create({
  name: 'cardBlock',
  group: 'block',
  content: 'block+',
  defining: true,
  isolating: true,

  addAttributes() {
    return {
      imageUrl: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).getAttribute('data-image-url'),
        renderHTML: (attrs) => attrs.imageUrl ? { 'data-image-url': attrs.imageUrl } : {},
      },
      imagePosition: {
        default: 'top',
        parseHTML: (el) => (el as HTMLElement).getAttribute('data-image-position') || 'top',
        renderHTML: (attrs) => ({ 'data-image-position': attrs.imagePosition }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="card-block"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'card-block',
        class: 'block-card',
      }),
      0,
    ]
  },

  addCommands() {
    return {
      insertCardBlock:
        () =>
        ({ commands }: any) => {
          return commands.insertContent({
            type: 'cardBlock',
            content: [
              { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'Card title' }] },
              { type: 'paragraph', content: [{ type: 'text', text: 'Card description goes here.' }] },
            ],
          })
        },
    }
  },
})

/**
 * LegacyHtml: a read-only node that holds the original HTML from a TinyMCE-saved content item.
 * Renders as a styled container with a "legacy" badge.
 */
export const LegacyHtml = Node.create({
  name: 'legacyHtml',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: false,

  addAttributes() {
    return {
      html: { default: '' },
      title: { default: '' },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="legacy-html"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    const title = HTMLAttributes.title || ''
    const html = HTMLAttributes.html || ''
    return [
      'div',
      {
        'data-type': 'legacy-html',
        class: 'block-legacy-html',
        'data-title': title,
      },
      // Note: HTML inside is rendered via the public-site BlockRenderer
      // (which sanitizes). The editor just shows a static preview card.
      ['div', { class: 'block-legacy-html-badge' }, '⚠ Legacy content'],
      ['div', { class: 'block-legacy-html-title' }, title],
      ['div', { class: 'block-legacy-html-preview' }, 'Original HTML preserved. Edit with care.'],
    ]
  },
})

export { Image, Link }
