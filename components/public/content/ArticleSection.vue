<template>
  <section class="article-section">
    <div v-if="content" class="article-container">
      <h2 v-if="showTitle" class="article-title">{{ decodedTitle }}</h2>
      <div class="article-content" v-html="decodedDescription"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Content } from '~/types'

interface Props {
  content: Content
  showTitle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
})

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
const decodedTitle = computed(() => decoded.value.title)
const decodedDescription = computed(() => decoded.value.description)
</script>

<style scoped>
.article-section {
  padding: 2rem 0;
}

.article-container {
  max-width: 800px;
  margin: 0 auto;
}

.article-title {
  font-size: 1.60rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1rem 0;
  font-family: var(--font-battambang);
}

.article-content {
  line-height: 1.8;
  color: #4a5568;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4),
.article-content :deep(h5),
.article-content :deep(h6) {
  font-family: var(--font-battambang);
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1a202c;
}

.article-content :deep(p) {
  margin-bottom: 1rem;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.article-content :deep(a) {
  color: #667eea;
  text-decoration: none;
}

.article-content :deep(a:hover) {
  text-decoration: underline;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
}
</style>
