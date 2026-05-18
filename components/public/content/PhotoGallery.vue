<template>
  <section class="photo-gallery-section">
    <h2 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h2>

    <div class="gallery-grid">
      <div v-for="item in items" :key="item.item_id" class="gallery-item" :class="{ featured: item.is_feature }">
        <img :src="`${photoUrl}${item.photo}`" :alt="item.title" @click="openLightbox(item)" />
        <div v-if="item.title" class="item-caption">
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox Dialog -->
    <Dialog v-model:visible="showLightbox" :style="{ width: '90vw' }" :modal="true" :showHeader="false" :closable="true"
      contentClass="lightbox-dialog">
      <img v-if="currentItem" :src="`${photoUrl}${currentItem.photo}`" :alt="currentItem.title"
        class="lightbox-image" />
      <div v-if="currentItem?.title" class="lightbox-caption">
        {{ currentItem.title }}
      </div>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import type { ContentItem } from '~/types'

interface Props {
  items: ContentItem[]
  sectionTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: '',
})

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const showLightbox = ref(false)
const currentItem = ref<ContentItem | null>(null)

const openLightbox = (item: ContentItem) => {
  currentItem.value = item
  showLightbox.value = true
}
</script>

<style scoped>
.photo-gallery-section {
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

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.gallery-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.gallery-item.featured {
  grid-column: span 2;
  grid-row: span 2;
}

@media (max-width: 768px) {
  .gallery-item.featured {
    grid-column: span 1;
    grid-row: span 1;
  }
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
}

.item-caption p {
  margin: 0;
  font-size: 0.875rem;
}

:deep(.lightbox-dialog) {
  background: transparent;
  padding: 0;
}

.lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.lightbox-caption {
  text-align: center;
  padding: 1rem;
  color: white;
  font-size: 1rem;
}
</style>
