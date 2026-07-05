<template>
  <section class="photo-gallery-section">
    <h2 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h2>
    <div v-if="sectionDescription" class="section-description" v-html="sectionDescription"></div>   
    <div class="gallery-grid">
      <div v-for="item in items" :key="item.item_id" class="gallery-item" :class="{ featured: item.is_feature }">
        <img :src="`${photoUrl}${item.url}`" :alt="item.title" @click="openLightbox(item)" />
        <div v-if="item.title" class="item-caption">
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox Dialog -->
    <Dialog v-model:visible="showLightbox" :style="{ width: '90vw', maxWidth: '1200px' }" :modal="true" :showHeader="false"
      contentClass="lightbox-dialog">
      <div class="lightbox-content" @click="showLightbox = false">
        <Button icon="pi pi-times" rounded text severity="secondary" class="lightbox-close" @click.stop="showLightbox = false" />
        <img v-if="currentItem" :src="`${photoUrl}${currentItem.url || currentItem.photo}`" :alt="currentItem.title"
          class="lightbox-image" />
        <div v-if="currentItem?.title" class="lightbox-caption">
          {{ currentItem.title }}
        </div>
      </div>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import type { ContentItem } from '~/types'

interface Props {
  items: ContentItem[]
  sectionTitle?: string
  sectionDescription?: string
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: '',
  sectionDescription: '',
})

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl

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

.lightbox-content {
  position: relative;
  cursor: pointer;
}

.lightbox-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
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
