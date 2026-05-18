<template>
  <section class="video-section">
    <h2 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h2>

    <div class="video-grid">
      <div v-for="item in items" :key="item.item_id" class="video-item">
        <div class="video-wrapper">
          <iframe v-if="item.video_url && getEmbedUrl(item.video_url)" :src="getEmbedUrl(item.video_url!) ?? undefined"
            :title="item.title" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen />
          <div v-else class="video-placeholder">
            <i class="pi pi-video"></i>
            <p>Invalid video URL</p>
          </div>
        </div>
        <div v-if="item.title" class="video-caption">
          <h3>{{ item.title }}</h3>
          <p v-if="item.description" class="video-description">{{ item.description }}</p>
        </div>
      </div>
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

const getEmbedUrl = (url: string): string | null => {
  if (!url) return null

  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  return null
}
</script>

<style scoped>
.video-section {
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

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}

.video-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.video-wrapper {
  position: relative;
  aspect-ratio: 16/9;
  background-color: #1a202c;
  border-radius: 8px;
  overflow: hidden;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #718096;
}

.video-placeholder i {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.video-caption {
  text-align: center;
}

.video-caption h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
  font-family: var(--font-battambang);
}

.video-description {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
}
</style>
