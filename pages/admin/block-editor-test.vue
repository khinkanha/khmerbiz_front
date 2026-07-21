<template>
  <div class="block-editor-test">
    <h1>BlockEditor Test Page</h1>
    <p>This page is a developer tool to manually verify the new Tiptap-based BlockEditor works end-to-end.</p>

    <section class="test-section">
      <h2>Test 1: Empty input</h2>
      <BlockEditor v-model="empty" :auto-save-ms="0" @save="onSave('empty', $event)" />
      <pre>value: {{ JSON.stringify(empty, null, 2) }}</pre>
    </section>

    <section class="test-section">
      <h2>Test 2: Tiptap doc input (already in new format)</h2>
      <BlockEditor v-model="tiptapSample" :auto-save-ms="0" @save="onSave('tiptap', $event)" />
      <pre>value: {{ JSON.stringify(tiptapSample, null, 2) }}</pre>
    </section>

    <section class="test-section">
      <h2>Test 3: Legacy TinyMCE input (should show warning + convert on save)</h2>
      <BlockEditor v-model="legacySample" :auto-save-ms="0" @save="onSave('legacy', $event)" />
      <pre>value: {{ JSON.stringify(legacySample, null, 2) }}</pre>
    </section>

    <section class="test-section">
      <h2>Test 4: Public site render — Tiptap</h2>
      <div class="render-box">
        <BlockRenderer v-if="tiptapDoc" :doc="tiptapDoc" />
      </div>
    </section>

    <section class="test-section">
      <h2>Test 5: Public site render — Legacy</h2>
      <div class="render-box">
        <div v-if="legacySmart?.format === 'tiptap'" class="legacy-warning">
          (format detection says this is Tiptap, not legacy)
        </div>
        <div v-else class="article-content" v-html="legacySmart?.description || ''" />
      </div>
    </section>

    <section class="test-section">
      <h2>Save log</h2>
      <ul>
        <li v-for="(entry, i) in saveLog" :key="i">{{ entry }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { parseSmartDescription } from '~/utils/tiptapFormat'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const empty = ref<string>('')
const tiptapSample = ref<string>(JSON.stringify({
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Welcome to the block editor' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: 'This is a ' },
      { type: 'text', marks: [{ type: 'bold' }], text: 'bold' },
      { type: 'text', text: ' and ' },
      { type: 'text', marks: [{ type: 'italic' }], text: 'italic' },
      { type: 'text', text: ' paragraph.' },
    ] },
    { type: 'image', attrs: { src: 'https://picsum.photos/600/300', alt: 'Sample image' } },
    { type: 'blockquote', content: [
      { type: 'paragraph', content: [{ type: 'text', text: 'A famous quote goes here.' }] }
    ] },
    { type: 'bulletList', content: [
      { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'First item' }] }] },
      { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Second item' }] }] },
      { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Third item' }] }] },
    ] },
  ],
}, null, 2))

const legacySample = ref<string>(JSON.stringify({
  title: 'Old Article Title',
  description: '<p>This is <strong>legacy</strong> HTML content from <em>TinyMCE</em>.</p><p>It has multiple paragraphs.</p>',
}))

const saveLog = ref<string[]>([])

function onSave(label: string, value: string) {
  saveLog.value.unshift(`[${new Date().toLocaleTimeString()}] ${label}: ${value.length} chars`)
}

const tiptapDoc = computed(() => {
  const smart = parseSmartDescription(tiptapSample.value)
  return smart?.format === 'tiptap' || smart?.format === 'wrapped-tiptap' ? smart.tiptapDoc : null
})

const legacySmart = computed(() => parseSmartDescription(legacySample.value))
</script>

<style scoped>
.block-editor-test {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}
.test-section {
  margin: 24px 0;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.test-section h2 { font-size: 1.1rem; margin-bottom: 12px; }
.render-box {
  background: #fff;
  padding: 16px;
  border: 1px dashed #cbd5e1;
  border-radius: 6px;
  min-height: 100px;
}
.legacy-warning {
  background: #fef3c7;
  border: 1px solid #fbbf24;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #78350f;
}
pre {
  background: #1e293b;
  color: #f1f5f9;
  padding: 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  overflow-x: auto;
  margin-top: 8px;
}
ul { font-size: 0.85rem; color: #475569; }
</style>
