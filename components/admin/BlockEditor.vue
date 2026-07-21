<template>
  <div class="block-editor" :class="{ 'is-focused': isFocused }">
    <!-- Top toolbar (Medium-style) -->
    <div v-if="editor" class="block-toolbar" role="toolbar" aria-label="Block editor toolbar">
      <div class="toolbar-group toolbar-block-insert">
        <span class="toolbar-label">{{ $t('blockEditor.insert') || 'Insert' }}:</span>
        <button
          v-for="block in insertableBlocks"
          :key="block.type"
          type="button"
          class="toolbar-btn toolbar-btn-block"
          :title="block.label"
          @click="insertBlock(block.type)"
        >
          <span class="block-icon" v-html="block.icon"></span>
          <span class="block-label">{{ block.label }}</span>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group toolbar-format" v-show="editor.isFocused">
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: editor.isActive('heading', { level: 1 }) }"
          title="Heading 1"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <strong>H1</strong>
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: editor.isActive('heading', { level: 2 }) }"
          title="Heading 2"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <strong>H2</strong>
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: editor.isActive('heading', { level: 3 }) }"
          title="Heading 3"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <strong>H3</strong>
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: editor.isActive('paragraph') }"
          title="Paragraph"
          @click="editor.chain().focus().setParagraph().run()"
        >
          ¶
        </button>
      </div>

      <div class="toolbar-divider" v-show="editor.isFocused"></div>

      <div class="toolbar-group toolbar-inline" v-show="editor.isFocused">
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: editor.isActive('bold') }"
          title="Bold"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: editor.isActive('italic') }"
          title="Italic"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: editor.isActive('strike') }"
          title="Strikethrough"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <s>S</s>
        </button>
      </div>

      <div class="toolbar-divider" v-show="editor.isFocused"></div>

      <div class="toolbar-group toolbar-list" v-show="editor.isFocused">
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: editor.isActive('bulletList') }"
          title="Bullet list"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          •
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: editor.isActive('orderedList') }"
          title="Numbered list"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          1.
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: editor.isActive('blockquote') }"
          title="Quote"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          &ldquo;
        </button>
      </div>

      <div class="toolbar-divider" v-show="editor.isFocused"></div>

      <div class="toolbar-group toolbar-history">
        <button
          type="button"
          class="toolbar-btn"
          :disabled="!editor.can().undo()"
          title="Undo"
          @click="editor.chain().focus().undo().run()"
        >
          ↶
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :disabled="!editor.can().redo()"
          title="Redo"
          @click="editor.chain().focus().redo().run()"
        >
          ↷
        </button>
      </div>

      <div class="toolbar-spacer"></div>

      <div class="toolbar-group toolbar-status">
        <span v-if="isSaving" class="status-saving">
          <span class="status-dot status-dot-saving"></span>
          {{ $t('blockEditor.saving') || 'Saving…' }}
        </span>
        <span v-else-if="lastSavedAt" class="status-saved">
          <span class="status-dot status-dot-saved"></span>
          {{ $t('blockEditor.saved') || 'Saved' }} {{ savedAgo }}
        </span>
        <span v-else class="status-draft">
          <span class="status-dot status-dot-draft"></span>
          {{ $t('blockEditor.draft') || 'Draft' }}
        </span>
      </div>
    </div>

    <!-- Editor area -->
    <div class="block-editor-content">
      <!-- Legacy content warning banner -->
      <div v-if="isLegacyContent" class="legacy-warning">
        <strong>⚠ Legacy content</strong> — This content was created with the old editor.
        It will be saved as a single "Legacy HTML" block. <button type="button" class="legacy-edit-btn" @click="enterLegacyEditMode">Edit in legacy mode</button>
        <button type="button" class="legacy-discard-btn" @click="discardLegacy">Start fresh</button>
      </div>

      <ClientOnly>
        <EditorContent :editor="editor" class="block-editor-surface" />
        <template #fallback>
          <div class="block-editor-loading">Loading editor…</div>
        </template>
      </ClientOnly>
    </div>

    <!-- Media picker modal for image insert -->
    <MediaPicker
      v-if="showMediaPicker"
      :multiple="false"
      @select="onMediaSelected"
      @close="showMediaPicker = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, onMounted } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { generateHTML, generateJSON } from '@tiptap/html'
import { CardBlock, LegacyHtml } from './blocks/index'

interface Props {
  modelValue: string | null
  /** Auto-save debounce in ms (default 1500) */
  autoSaveMs?: number
  /** Disable editor (read-only) */
  readonly?: boolean
  /** Show auto-save status indicator */
  showSaveStatus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoSaveMs: 1500,
  readonly: false,
  showSaveStatus: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  save: [value: string]
  change: [value: string]
}>()

// ----- format detection -----
/**
 * Detect whether a string is a Tiptap JSON document.
 * Tiptap docs have `{"type":"doc"` at the start.
 * Legacy (TinyMCE) content is wrapped as `{"title":"...","description":"..."}`.
 */
function isTiptapJson(value: string | null | undefined): boolean {
  if (!value || typeof value !== 'string') return false
  const trimmed = value.trim()
  return trimmed.startsWith('{"type":"doc"') || trimmed.startsWith('{"type": "doc"')
}

/** Convert legacy `{title, description}` JSON to a Tiptap doc containing a legacyHtml block. */
function legacyJsonToTiptapDoc(legacy: string): string {
  let parsed: any = {}
  try {
    parsed = JSON.parse(legacy)
  } catch {
    parsed = { description: legacy }
  }
  return JSON.stringify({
    type: 'doc',
    content: [
      {
        type: 'legacyHtml',
        attrs: {
          html: parsed.description || parsed.longdes || parsed.shortdes || JSON.stringify(parsed),
          title: parsed.title || '',
        },
      },
    ],
  })
}

const isLegacyContent = computed(() => {
  return !!props.modelValue && !isTiptapJson(props.modelValue) && props.modelValue.trim() !== ''
})

// ----- editor instance -----
const editor = useEditor({
  content: getInitialContent(),
  editable: !props.readonly,
  extensions: [
    StarterKit.configure({
      // Heading, Bold, Italic, Strike, Code, Blockquote, BulletList, OrderedList, ListItem, HardBreak, HorizontalRule, History
    }),
    Image.configure({
      inline: false,
      allowBase64: true,
      HTMLAttributes: { class: 'block-image' },
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: { class: 'block-link', rel: 'noopener noreferrer' },
    }),
    CardBlock,
    LegacyHtml,
  ],
  editorProps: {
    attributes: {
      class: 'block-editor-prose',
    },
  },
  onUpdate({ editor }) {
    const json = JSON.stringify(editor.getJSON())
    // Auto-save with debounce
    scheduleAutoSave(json)
    emit('update:modelValue', json)
    emit('change', json)
  },
  onFocus() {
    isFocused.value = true
  },
  onBlur() {
    isFocused.value = false
  },
})

function getInitialContent(): any {
  if (!props.modelValue || props.modelValue.trim() === '') {
    // Empty doc with a starter paragraph
    return {
      type: 'doc',
      content: [{ type: 'paragraph' }],
    }
  }
  if (isTiptapJson(props.modelValue)) {
    try {
      return JSON.parse(props.modelValue!)
    } catch {
      return { type: 'doc', content: [{ type: 'paragraph' }] }
    }
  }
  // Legacy content: convert to Tiptap doc with a single legacyHtml block
  return JSON.parse(legacyJsonToTiptapDoc(props.modelValue!))
}

// ----- block insert (top toolbar) -----
interface BlockDescriptor {
  type: 'heading' | 'paragraph' | 'image' | 'card' | 'divider' | 'quote'
  label: string
  icon: string
}

const insertableBlocks: BlockDescriptor[] = [
  { type: 'heading',  label: 'Heading',  icon: '𝐇' },
  { type: 'paragraph', label: 'Text',     icon: '¶' },
  { type: 'image',    label: 'Image',    icon: '🖼' },
  { type: 'card',     label: 'Card',     icon: '▭' },
  { type: 'divider',  label: 'Divider',  icon: '─' },
  { type: 'quote',    label: 'Quote',    icon: '❝' },
]

function insertBlock(type: BlockDescriptor['type']) {
  if (!editor.value) return
  const ed = editor.value
  const chain = ed.chain().focus()

  switch (type) {
    case 'heading':
      chain.insertContent({ type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Heading' }] }).run()
      break
    case 'paragraph':
      chain.insertContent({ type: 'paragraph', content: [{ type: 'text', text: '' }] }).run()
      break
    case 'image':
      showMediaPicker.value = true
      break
    case 'card':
      // Card = a structured block group: heading + paragraph + (image via separate block)
      chain.insertContent({
        type: 'cardBlock',
        content: [
          { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'Card title' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Card description goes here.' }] },
        ],
      } as any).run()
      break
    case 'divider':
      chain.insertContent({ type: 'horizontalRule' }).run()
      break
    case 'quote':
      chain.insertContent({ type: 'blockquote', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Quote text' }] }] }).run()
      break
  }
}

// ----- image insert (media picker) -----
const showMediaPicker = ref(false)

function onMediaSelected(media: any) {
  if (!editor.value || !media) return
  const url = typeof media === 'string' ? media : (media.url || media.file_url || media.path)
  if (!url) return
  editor.value.chain().focus().setImage({ src: url, alt: media.alt || media.name || '' }).run()
  showMediaPicker.value = false
}

// ----- legacy content mode -----
function enterLegacyEditMode() {
  // Allow direct edit of the underlying HTML by switching to a textarea
  // (Used as a safety hatch — user can copy their old HTML out)
  if (props.modelValue) {
    const legacy = props.modelValue
    if (editor.value) {
      editor.value.commands.setContent(legacyJsonToTiptapDoc(legacy), { emitUpdate: false })
    }
  }
}

function discardLegacy() {
  if (editor.value) {
    editor.value.commands.setContent({ type: 'doc', content: [{ type: 'paragraph' }] }, { emitUpdate: true })
  }
}

// ----- auto-save with debounce -----
const isSaving = ref(false)
const lastSavedAt = ref<Date | null>(null)
let autoSaveTimer: ReturnType<typeof setTimeout> | null = null
let savedAtTimer: ReturnType<typeof setInterval> | null = null

function scheduleAutoSave(json: string) {
  if (!props.showSaveStatus) return
  if (autoSaveTimer) clearTimeout(autoSaveTimer)
  isSaving.value = true
  autoSaveTimer = setTimeout(() => {
    isSaving.value = false
    lastSavedAt.value = new Date()
    emit('save', json)
  }, props.autoSaveMs)
}

const savedAgo = ref('')

onMounted(() => {
  savedAtTimer = setInterval(() => {
    if (lastSavedAt.value) {
      const seconds = Math.round((Date.now() - lastSavedAt.value.getTime()) / 1000)
      if (seconds < 5) savedAgo.value = ''
      else if (seconds < 60) savedAgo.value = `${seconds}s ago`
      else savedAgo.value = `${Math.round(seconds / 60)}m ago`
    }
  }, 5000)
})

onBeforeUnmount(() => {
  if (autoSaveTimer) clearTimeout(autoSaveTimer)
  if (savedAtTimer) clearInterval(savedAtTimer)
  editor.value?.destroy()
})

const isFocused = ref(false)

// ----- external value sync (when parent resets the model) -----
watch(
  () => props.modelValue,
  (newVal) => {
    if (!editor.value) return
    const currentJson = JSON.stringify(editor.value.getJSON())
    if (newVal === currentJson) return
    if (!newVal || newVal.trim() === '') {
      editor.value.commands.setContent({ type: 'doc', content: [{ type: 'paragraph' }] }, { emitUpdate: false })
      return
    }
    if (isTiptapJson(newVal)) {
      try {
        editor.value.commands.setContent(JSON.parse(newVal), { emitUpdate: false })
      } catch {
        // ignore
      }
    } else {
      // Legacy content
      editor.value.commands.setContent(legacyJsonToTiptapDoc(newVal), { emitUpdate: false })
    }
  }
)
</script>

<style scoped>
.block-editor {
  border: 1px solid var(--p-content-border-color, #e5e7eb);
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  min-height: 320px;
}

.block-editor.is-focused {
  border-color: var(--p-primary-color, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.block-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--p-content-border-color, #e5e7eb);
  background: #f9fafb;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: sticky;
  top: 0;
  z-index: 5;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.toolbar-divider {
  width: 1px;
  height: 22px;
  background: #d1d5db;
  margin: 0 6px;
}

.toolbar-spacer {
  flex: 1;
}

.toolbar-label {
  font-size: 11px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-right: 4px;
  font-weight: 600;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  padding: 0 8px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
  transition: background 0.12s, border-color 0.12s;
}

.toolbar-btn:hover:not(:disabled) {
  background: #e5e7eb;
}

.toolbar-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.toolbar-btn.active {
  background: #dbeafe;
  color: #1d4ed8;
  border-color: #93c5fd;
}

.toolbar-btn-block {
  min-width: auto;
  padding: 0 10px;
  gap: 4px;
}

.block-icon {
  font-size: 14px;
}

.block-label {
  font-size: 12px;
}

.toolbar-status {
  font-size: 11px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot-saving {
  background: #f59e0b;
  animation: pulse 1s infinite;
}

.status-dot-saved {
  background: #10b981;
}

.status-dot-draft {
  background: #9ca3af;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.block-editor-content {
  padding: 16px 20px;
  flex: 1;
  min-height: 240px;
  position: relative;
}

.block-editor-surface {
  min-height: 200px;
}

.block-editor-loading {
  padding: 40px;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
}

.legacy-warning {
  background: #fef3c7;
  border: 1px solid #fbbf24;
  color: #78350f;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 13px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.legacy-edit-btn,
.legacy-discard-btn {
  background: #fff;
  border: 1px solid #d97706;
  color: #78350f;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.legacy-edit-btn:hover,
.legacy-discard-btn:hover {
  background: #fde68a;
}

:deep(.ProseMirror) {
  outline: none;
  min-height: 200px;
  line-height: 1.6;
  color: #1f2937;
}

:deep(.ProseMirror h1) {
  font-size: 2rem;
  font-weight: 700;
  margin: 1.2em 0 0.4em;
}

:deep(.ProseMirror h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1em 0 0.4em;
}

:deep(.ProseMirror h3) {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0.8em 0 0.3em;
}

:deep(.ProseMirror p) {
  margin: 0.5em 0;
}

:deep(.ProseMirror ul),
:deep(.ProseMirror ol) {
  padding-left: 1.5em;
  margin: 0.5em 0;
}

:deep(.ProseMirror blockquote) {
  border-left: 3px solid #9ca3af;
  padding-left: 1em;
  color: #4b5563;
  font-style: italic;
  margin: 0.8em 0;
}

:deep(.ProseMirror hr) {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 1.5em 0;
}

:deep(.ProseMirror img) {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 0.8em 0;
}

:deep(.ProseMirror a) {
  color: #2563eb;
  text-decoration: underline;
}
</style>
