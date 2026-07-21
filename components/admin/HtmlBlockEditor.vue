<template>
  <div class="block-editor" :class="{ 'is-focused': isFocused }">
    <div v-if="editor" class="block-toolbar" role="toolbar" aria-label="Block editor toolbar">
      <div class="toolbar-group toolbar-block-insert">
        <span class="toolbar-label">{{ $t('blockEditor.insert') || 'Insert' }}:</span>
        <button type="button" class="toolbar-btn toolbar-btn-block" title="Heading" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
          <strong>𝐇</strong><span class="block-label">Heading</span>
        </button>
        <button type="button" class="toolbar-btn toolbar-btn-block" title="Text" @click="editor.chain().focus().setParagraph().run()">
          ¶<span class="block-label">Text</span>
        </button>
        <button type="button" class="toolbar-btn toolbar-btn-block" title="Image" @click="showMediaPicker = true">
          🖼<span class="block-label">Image</span>
        </button>
        <button type="button" class="toolbar-btn toolbar-btn-block" title="Divider" @click="editor.chain().focus().setHorizontalRule().run()">
          ─<span class="block-label">Divider</span>
        </button>
        <button type="button" class="toolbar-btn toolbar-btn-block" title="Quote" @click="editor.chain().focus().toggleBlockquote().run()">
          ❝<span class="block-label">Quote</span>
        </button>
      </div>

      <div class="toolbar-divider" v-show="editor.isFocused"></div>

      <div class="toolbar-group toolbar-format" v-show="editor.isFocused">
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive('bold') }" title="Bold" @click="editor.chain().focus().toggleBold().run()"><strong>B</strong></button>
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive('italic') }" title="Italic" @click="editor.chain().focus().toggleItalic().run()"><em>I</em></button>
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive('strike') }" title="Strikethrough" @click="editor.chain().focus().toggleStrike().run()"><s>S</s></button>
      </div>

      <div class="toolbar-divider" v-show="editor.isFocused"></div>

      <div class="toolbar-group toolbar-list" v-show="editor.isFocused">
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive('bulletList') }" title="Bullet list" @click="editor.chain().focus().toggleBulletList().run()">•</button>
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive('orderedList') }" title="Numbered list" @click="editor.chain().focus().toggleOrderedList().run()">1.</button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group toolbar-history">
        <button type="button" class="toolbar-btn" :disabled="!editor.can().undo()" title="Undo" @click="editor.chain().focus().undo().run()">↶</button>
        <button type="button" class="toolbar-btn" :disabled="!editor.can().redo()" title="Redo" @click="editor.chain().focus().redo().run()">↷</button>
      </div>
    </div>

    <div class="block-editor-content">
      <ClientOnly>
        <EditorContent :editor="editor" class="block-editor-surface" />
        <template #fallback>
          <div class="block-editor-loading">Loading editor…</div>
        </template>
      </ClientOnly>
    </div>

    <MediaPicker
      v-if="showMediaPicker"
      :multiple="false"
      @select="onMediaSelected"
      @close="showMediaPicker = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

/**
 * HtmlBlockEditor — a Tiptap-based replacement for TinyMCE on per-row fields
 * (news description, product longdes, item description) that still need to
 * store plain HTML in the database for backward compatibility.
 *
 * Use BlockEditor.vue for fields that should store Tiptap JSON
 * (e.g. the main tblcontent.description column).
 */
interface Props {
  modelValue: string | null
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), { readonly: false })
const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const isFocused = ref(false)
const showMediaPicker = ref(false)

const editor = useEditor({
  content: getInitialContent(),
  editable: !props.readonly,
  extensions: [
    StarterKit,
    Image.configure({ inline: false, allowBase64: true, HTMLAttributes: { class: 'block-image' } }),
    Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { class: 'block-link', rel: 'noopener noreferrer' } }),
  ],
  editorProps: {
    attributes: { class: 'block-editor-prose' },
  },
  onUpdate({ editor }) {
    const html = editor.getHTML()
    emit('update:modelValue', html)
    emit('change', html)
  },
  onFocus() { isFocused.value = true },
  onBlur() { isFocused.value = false },
})

function getInitialContent(): any {
  if (!props.modelValue || props.modelValue.trim() === '') {
    return { type: 'doc', content: [{ type: 'paragraph' }] }
  }
  // The field already contains HTML (legacy TinyMCE), so set as HTML directly
  return props.modelValue
}

function onMediaSelected(media: any) {
  if (!editor.value || !media) return
  const url = typeof media === 'string' ? media : (media.url || media.file_url || media.path)
  if (!url) return
  editor.value.chain().focus().setImage({ src: url, alt: media.alt || media.name || '' }).run()
  showMediaPicker.value = false
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (!editor.value) return
    const currentHtml = editor.value.getHTML()
    if (newVal === currentHtml) return
    if (!newVal || newVal.trim() === '') {
      editor.value.commands.setContent({ type: 'doc', content: [{ type: 'paragraph' }] }, { emitUpdate: false })
      return
    }
    editor.value.commands.setContent(newVal, { emitUpdate: false })
  }
)
</script>

<style scoped>
/* Same styles as BlockEditor.vue — minimal inline version */
.block-editor {
  border: 1px solid var(--p-content-border-color, #e5e7eb);
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  min-height: 240px;
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
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 8px 8px 0 0;
  position: sticky;
  top: 0;
  z-index: 5;
}
.toolbar-group { display: flex; align-items: center; gap: 2px; }
.toolbar-divider { width: 1px; height: 22px; background: #d1d5db; margin: 0 6px; }
.toolbar-label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.04em; margin-right: 4px; font-weight: 600; }
.toolbar-btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 30px; height: 30px; padding: 0 8px;
  border: 1px solid transparent; background: transparent;
  border-radius: 4px; cursor: pointer; font-size: 13px; color: #374151;
  transition: background 0.12s, border-color 0.12s;
}
.toolbar-btn:hover:not(:disabled) { background: #e5e7eb; }
.toolbar-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.toolbar-btn.active { background: #dbeafe; color: #1d4ed8; border-color: #93c5fd; }
.toolbar-btn-block { min-width: auto; padding: 0 10px; gap: 4px; }
.block-label { font-size: 12px; }
.block-editor-content { padding: 12px 16px; flex: 1; min-height: 180px; }
.block-editor-surface { min-height: 160px; }
.block-editor-loading { padding: 30px; text-align: center; color: #9ca3af; font-size: 14px; }
:deep(.ProseMirror) { outline: none; min-height: 160px; line-height: 1.6; color: #1f2937; }
:deep(.ProseMirror h2) { font-size: 1.4rem; font-weight: 700; margin: 0.8em 0 0.3em; }
:deep(.ProseMirror h3) { font-size: 1.15rem; font-weight: 600; margin: 0.6em 0 0.3em; }
:deep(.ProseMirror p) { margin: 0.4em 0; }
:deep(.ProseMirror ul), :deep(.ProseMirror ol) { padding-left: 1.5em; margin: 0.4em 0; }
:deep(.ProseMirror blockquote) { border-left: 3px solid #9ca3af; padding-left: 1em; color: #4b5563; font-style: italic; margin: 0.6em 0; }
:deep(.ProseMirror hr) { border: none; border-top: 1px solid #e5e7eb; margin: 1.2em 0; }
:deep(.ProseMirror img) { max-width: 100%; height: auto; border-radius: 4px; margin: 0.6em 0; }
:deep(.ProseMirror a) { color: #2563eb; text-decoration: underline; }
</style>
