<template>
  <section class="document-section">
    <h2 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h2>
    <div class="document-list">
      <a v-for="item in items" :key="item.item_id" :href="`${photoUrl}${item.url}`" :download="item.title"
        class="document-item" target="_blank">
        <div class="document-icon">
          <i class="pi pi-file-pdf" />
        </div>
        <div class="document-info">
          <h3 v-if="item.title">{{ item.title }}</h3>
          <p v-if="item.description" class="document-description">{{ item.description }}</p>
        </div>
        <div class="document-action">
          <i class="pi pi-download" />
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ContentItem } from '~/types'

interface Props {
  items: ContentItem[]
  sectionTitle?: string
}

withDefaults(defineProps<Props>(), {
  sectionTitle: '',
})

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl
</script>

<style scoped>
.document-section {
  padding: 2rem 0;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
  text-align: center;
  font-family: var(--font-battambang);
}

.document-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 800px;
  margin: 0 auto;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
}

.document-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.document-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fed7d7;
  color: #c53030;
  border-radius: 8px;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.document-info {
  flex: 1;
  min-width: 0;
}

.document-info h3 {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
  font-family: var(--font-battambang);
}

.document-description {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.document-action {
  color: #667eea;
  font-size: 1.25rem;
}
</style>
