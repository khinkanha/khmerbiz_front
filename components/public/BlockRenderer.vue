<template>
  <div class="block-renderer">
    <!-- Headings -->
    <h1 v-if="block.type === 'heading' && block.attrs?.level === 1" :id="block.attrs.id">
      <BlockRendererContent :content="block.content" />
    </h1>
    <h2 v-else-if="block.type === 'heading' && block.attrs?.level === 2" :id="block.attrs.id">
      <BlockRendererContent :content="block.content" />
    </h2>
    <h3 v-else-if="block.type === 'heading' && block.attrs?.level === 3" :id="block.attrs.id">
      <BlockRendererContent :content="block.content" />
    </h3>
    <h4 v-else-if="block.type === 'heading' && block.attrs?.level === 4" :id="block.attrs.id">
      <BlockRendererContent :content="block.content" />
    </h4>

    <!-- Paragraph -->
    <p v-else-if="block.type === 'paragraph'">
      <BlockRendererContent :content="block.content" />
    </p>

    <!-- Lists -->
    <ul v-else-if="block.type === 'bulletList'">
      <li v-for="(item, i) in block.content" :key="i">
        <BlockRenderer :blocks="item.content" />
      </li>
    </ul>
    <ol v-else-if="block.type === 'orderedList'">
      <li v-for="(item, i) in block.content" :key="i">
        <BlockRenderer :blocks="item.content" />
      </li>
    </ol>

    <!-- Blockquote -->
    <blockquote v-else-if="block.type === 'blockquote'">
      <BlockRenderer :blocks="block.content" />
    </blockquote>

    <!-- Code block -->
    <pre v-else-if="block.type === 'codeBlock'"><code>{{ extractText(block.content) }}</code></pre>

    <!-- Horizontal rule -->
    <hr v-else-if="block.type === 'horizontalRule'" />

    <!-- Hard break -->
    <br v-else-if="block.type === 'hardBreak'" />

    <!-- Image -->
    <figure v-else-if="block.type === 'image'" class="block-renderer-figure">
      <img
        :src="resolveUrl(block.attrs?.src)"
        :alt="block.attrs?.alt || ''"
        :title="block.attrs?.title"
        :width="block.attrs?.width"
        :height="block.attrs?.height"
      />
      <figcaption v-if="block.attrs?.title">{{ block.attrs.title }}</figcaption>
    </figure>

    <!-- Card block (custom) -->
    <div v-else-if="block.type === 'cardBlock'" class="block-renderer-card" :data-image-position="block.attrs?.imagePosition || 'top'">
      <img
        v-if="block.attrs?.imageUrl"
        :src="resolveUrl(block.attrs.imageUrl)"
        :alt="''"
        class="block-renderer-card-image"
      />
      <div class="block-renderer-card-body">
        <BlockRenderer :blocks="block.content" />
      </div>
    </div>

    <!-- Legacy HTML (read-only) -->
    <div v-else-if="block.type === 'legacyHtml'" class="block-renderer-legacy" :data-title="block.attrs?.title || ''">
      <div class="block-renderer-legacy-badge">⚠ Legacy content</div>
      <div v-if="block.attrs?.title" class="block-renderer-legacy-title">{{ block.attrs.title }}</div>
      <div class="block-renderer-legacy-html" v-html="sanitizeHtml(block.attrs?.html || '')" />
    </div>

    <!-- Text (inline) — handled by BlockRendererContent -->
    <template v-else-if="block.type === 'text'"></template>

    <!-- Unknown block type fallback -->
    <div v-else class="block-renderer-unknown" :title="`Unknown block type: ${block.type}`"></div>
  </div>
</template>

<script setup lang="ts">
/**
 * BlockRenderer — public-site renderer for Tiptap JSON content.
 *
 * Usage:
 *   <BlockRenderer :blocks="articleDescription.tiptapDoc.content" />
 *
 * Or pass a whole doc:
 *   <BlockRenderer :doc="articleDescription.tiptapDoc" />
 */
import { computed } from 'vue'
import DOMPurify from 'dompurify'

interface TiptapMark {
  type: string
  attrs?: Record<string, any>
}
interface TiptapNode {
  type: string
  attrs?: Record<string, any>
  content?: TiptapNode[]
  marks?: TiptapMark[]
  text?: string
}

interface Props {
  blocks?: TiptapNode[]
  doc?: TiptapNode
}

const props = defineProps<Props>()

const effectiveBlocks = computed<TiptapNode[]>(() => {
  if (props.doc) return props.doc.content || []
  return props.blocks || []
})

function extractText(content?: TiptapNode[]): string {
  if (!content) return ''
  return content
    .map((node) => {
      if (node.type === 'text') return node.text || ''
      if (node.content) return extractText(node.content)
      return ''
    })
    .join('')
}

function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') return html // SSR fallback
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre', 'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'iframe', 'div', 'span'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'rel', 'target', 'width', 'height', 'style'],
  })
}

function resolveUrl(url?: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) return url
  if (url.startsWith('/')) return url
  return `/${url}`
}
</script>

<script lang="ts">
/**
 * BlockRendererContent — recursive inline-content renderer (text + marks).
 * Kept as a separate renderless component so it can be used inside <p>, <h1> etc.
 */
import { defineComponent, h } from 'vue'
import DOMPurify from 'dompurify'

export const BlockRendererContent = defineComponent({
  name: 'BlockRendererContent',
  props: {
    content: { type: Array, default: () => [] },
  },
  setup(props) {
    return () => {
      return (props.content || []).map((node: any, i: number) => {
        if (node.type === 'text') {
          let el: any = node.text || ''
          const marks: any[] = node.marks || []
          // Apply marks inside-out so they nest correctly
          for (const mark of marks) {
            if (mark.type === 'bold') el = h('strong', null, el)
            else if (mark.type === 'italic') el = h('em', null, el)
            else if (mark.type === 'strike') el = h('s', null, el)
            else if (mark.type === 'code') el = h('code', null, el)
            else if (mark.type === 'underline') el = h('u', null, el)
            else if (mark.type === 'link') {
              const href = mark.attrs?.href || '#'
              el = h('a', { href, rel: 'noopener noreferrer', target: mark.attrs?.target || '_self' }, el)
            }
          }
          return h('span', { key: i }, el)
        }
        if (node.type === 'hardBreak') return h('br', { key: i })
        // Unknown inline node — skip
        return null
      })
    }
  },
})
</script>

<style scoped>
.block-renderer {
  line-height: 1.6;
  color: #1f2937;
}

.block-renderer h1 { font-size: 2.25rem; font-weight: 700; margin: 1.2em 0 0.5em; line-height: 1.2; }
.block-renderer h2 { font-size: 1.75rem; font-weight: 700; margin: 1.1em 0 0.4em; line-height: 1.3; }
.block-renderer h3 { font-size: 1.35rem; font-weight: 600; margin: 1em 0 0.3em; line-height: 1.4; }
.block-renderer h4 { font-size: 1.1rem; font-weight: 600; margin: 0.8em 0 0.3em; }

.block-renderer p { margin: 0.6em 0; }

.block-renderer ul,
.block-renderer ol { padding-left: 1.5em; margin: 0.5em 0; }
.block-renderer li { margin: 0.2em 0; }

.block-renderer blockquote {
  border-left: 4px solid #cbd5e1;
  padding: 0.5em 0 0.5em 1em;
  color: #475569;
  font-style: italic;
  margin: 1em 0;
  background: #f8fafc;
}

.block-renderer pre {
  background: #1e293b;
  color: #f1f5f9;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.9em;
  margin: 1em 0;
}
.block-renderer code {
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 0.9em;
  background: #f1f5f9;
  padding: 0.1em 0.3em;
  border-radius: 3px;
}
.block-renderer pre code { background: transparent; padding: 0; color: inherit; }

.block-renderer hr {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 1.5em 0;
}

.block-renderer-figure { margin: 1em 0; }
.block-renderer-figure img { max-width: 100%; height: auto; border-radius: 6px; }
.block-renderer-figure figcaption { font-size: 0.875rem; color: #64748b; text-align: center; margin-top: 0.5em; }

.block-renderer-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  margin: 1em 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.block-renderer-card-image {
  width: 100%;
  height: auto;
  display: block;
}
.block-renderer-card-body { padding: 1.2em 1.4em; }
.block-renderer-card[data-image-position="left"] { display: flex; flex-wrap: wrap; }
.block-renderer-card[data-image-position="left"] .block-renderer-card-image { width: 40%; }
.block-renderer-card[data-image-position="left"] .block-renderer-card-body { flex: 1; min-width: 60%; }
.block-renderer-card[data-image-position="right"] { display: flex; flex-wrap: wrap; flex-direction: row-reverse; }
.block-renderer-card[data-image-position="right"] .block-renderer-card-image { width: 40%; }
.block-renderer-card[data-image-position="right"] .block-renderer-card-body { flex: 1; min-width: 60%; }
@media (max-width: 640px) {
  .block-renderer-card[data-image-position="left"] .block-renderer-card-image,
  .block-renderer-card[data-image-position="right"] .block-renderer-card-image { width: 100%; }
}

.block-renderer-legacy {
  border: 1px dashed #fbbf24;
  background: #fffbeb;
  padding: 1em;
  border-radius: 6px;
  margin: 1em 0;
}
.block-renderer-legacy-badge {
  display: inline-block;
  background: #f59e0b;
  color: #fff;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 3px;
  margin-bottom: 0.5em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.block-renderer-legacy-title { font-weight: 600; margin-bottom: 0.5em; }
.block-renderer-legacy-html { font-size: 0.95em; }

.block-renderer-unknown { display: none; }
</style>
