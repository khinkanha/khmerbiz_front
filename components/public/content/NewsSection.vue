<template>
  <section class="news-section">
    <h2 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h2>

    <div class="news-grid">
      <NuxtLink
        v-for="news in items"
        :key="news.news_id"
        :to="`/news/${domainId}/${contentId}/${news.news_id}`"
        class="news-card"
      >
        <div class="news-image">
          <img
            v-if="news.photo"
            :src="`${photoUrl}${news.photo}`"
            :alt="news.title"
          />
          <div v-else class="news-placeholder">
            <i class="pi pi-image"></i>
          </div>
        </div>
        <div class="news-content">
          <h3 class="news-title">{{ news.title }}</h3>
          <p v-if="news.short_description" class="news-excerpt">
            {{ news.short_description }}
          </p>
          <div v-if="news.publish_date" class="news-date">
            <i class="pi pi-calendar"></i>
            {{ formatDate(news.publish_date) }}
          </div>
        </div>
      </NuxtLink>
    </div>

    <div v-if="showMoreLink" class="section-footer">
      <NuxtLink :to="moreLink" class="view-more-link">
        {{ $t('contentManager.view') }} {{ $t('common.more') }}
        <i class="pi pi-arrow-right"></i>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { News } from '~/types'

interface Props {
  items: News[]
  domainId: number
  contentId: number
  sectionTitle?: string
  showMoreLink?: boolean
  moreLink?: string
}

withDefaults(defineProps<Props>(), {
  sectionTitle: '',
  showMoreLink: false,
  moreLink: '',
})

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const formatDate = (date: string | null) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.news-section {
  padding: 2rem 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
  text-align: center;
  font-family: var(--font-battambang);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.news-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s;
}

.news-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.news-image {
  aspect-ratio: 16/9;
  overflow: hidden;
  background-color: #f7fafc;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e0;
  font-size: 3rem;
}

.news-content {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  font-family: var(--font-battambang);
  line-height: 1.4;
}

.news-excerpt {
  font-size: 0.875rem;
  color: #718096;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.news-date {
  font-size: 0.75rem;
  color: #a0aec0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: auto;
}

.section-footer {
  text-align: center;
  margin-top: 1.5rem;
}

.view-more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background-color: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.view-more-link:hover {
  background-color: #5a67d8;
}
</style>
