<template>
  <section class="article-section">
    <div v-if="content" class="article-container">
      <!-- New Tiptap format (direct or wrapped by backend): render blocks as Vue components -->
      <div v-if="(smart?.format === 'tiptap' || smart?.format === 'wrapped-tiptap') && smart.tiptapDoc" class="article-content">
        <BlockRenderer :doc="smart.tiptapDoc" />
      </div>
      <!-- Legacy TinyMCE format: keep using v-html for backward compat -->
      <div v-else class="article-content" v-html="decodedDescription"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Content } from '~/types'
import { parseSmartDescription } from '~/utils/tiptapFormat'

interface Props {
  content: Content
  showTitle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
})

const smart = computed(() => parseSmartDescription(props.content.description))

const decodeContentDescription = (content: Content) => {
  if (!content.description || typeof content.description !== 'string') {
    return { title: content.title, description: content.description || '' }
  }
  try {
    const parsed = JSON.parse(content.description)
    return {
      title: parsed.title || content.title,
      description: parsed.description || parsed.longdes || parsed.longdescription || content.description,
    }
  } catch {
    return { title: content.title, description: content.description }
  }
}

const decoded = computed(() => decodeContentDescription(props.content))
const decodedDescription = computed(() => decoded.value.description)
</script>

<style scoped></style>
