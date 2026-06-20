<template>
  <section class="news-section">
    <h2 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h2>

    <div v-if="loading" class="loading-state">
      <ProgressSpinner />
    </div>

    <template v-else>
      <!-- Feature News -->
      <div v-if="featureNews.length > 0" class="feature-news">
        <NuxtLink v-for="news in featureNews" :key="'feat-' + news.id" :to="`/news/${news.news_id || news.id}`"
          class="feature-card">
          <div class="feature-badge">Featured</div>
          <div class="feature-card-image">
            <img v-if="news.photo" :src="`${photoUrl}${news.photo}`" :alt="news.title" />
            <div v-else class="news-placeholder">
              <i class="pi pi-image"></i>
            </div>
          </div>
          <div class="feature-card-body">
            <h4 class="feature-title">{{ news.title }}</h4>
            <p v-if="news.short_description" class="feature-excerpt">{{ news.short_description }}</p>
            <div v-if="news.publish_date" class="feature-date">
              <i class="pi pi-calendar"></i>
              {{ formatDate(news.publish_date) }}
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Regular News -->
      <div class="news-grid">
        <NuxtLink v-for="news in newsItems" :key="news.news_id || news.id" :to="`/news/${news.news_id || news.id}`"
          class="news-card">
          <div class="news-image">
            <img v-if="news.photo" :src="`${photoUrl}${news.photo}`" :alt="news.title" />
            <div v-else class="news-placeholder">
              <i class="pi pi-image"></i>
            </div>
          </div>
          <div class="news-content">
            <h4 class="news-title">{{ news.title }}</h4>
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

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="pagination-controls">
        <button class="pagination-btn" :disabled="currentPage === 1" @click="goToPage(1)" :title="$t('common.first')">
          <i class="pi pi-angle-double-left"></i>
        </button>
        <button class="pagination-btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)"
          :title="$t('common.previous')">
          <i class="pi pi-angle-left"></i>
        </button>
        <span class="pagination-info">{{ currentPage }} / {{ totalPages }}</span>
        <button class="pagination-btn" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)"
          :title="$t('common.next')">
          <i class="pi pi-angle-right"></i>
        </button>
        <button class="pagination-btn" :disabled="currentPage === totalPages" @click="goToPage(totalPages)"
          :title="$t('common.last')">
          <i class="pi pi-angle-double-right"></i>
        </button>
      </div>
    </template>

    <div v-if="showMoreLink" class="section-footer">
      <NuxtLink :to="moreLink" class="view-more-link">
        {{ $t('contentManager.view') }} {{ $t('common.more') }}
        <i class="pi pi-arrow-right"></i>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { parseNewsItem } from '~/composables/useNewsParser'

interface Props {
  domainId: number
  contentId: number
  sectionTitle?: string
  showMoreLink?: boolean
  moreLink?: string
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: '',
  showMoreLink: false,
  moreLink: '',
})

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl
const route = useRoute()
const router = useRouter()
const api = useApi()

const currentPage = ref(1)
const totalPages = ref(1)
const loading = ref(false)
const newsItems = ref<any[]>([])
const featureNews = ref<any[]>([])

const fetchNews = async (page: number = 1) => {
  if (!props.contentId) return
  loading.value = true
  try {
    const response = await api.get<any>(`/site/list-news/${props.contentId}?page=${page}`)
    if (response.success && response.data) {
      const data = response.data
      const items = data.items || data
      newsItems.value = (Array.isArray(items) ? items : []).map(parseNewsItem)
      if (data.pagination) {
        totalPages.value = data.pagination.totalPages || data.pagination.total_pages || 1
      } else {
        totalPages.value = 1
      }
    }
  } catch (e) {
    console.error('Failed to fetch news:', e)
  } finally {
    loading.value = false
  }
}

const fetchFeatureNews = async () => {
  if (!props.contentId) return
  try {
    const response = await api.get<any>(`/site/feature-news/${props.contentId}`)
    if (response.success && response.data) {
      const data = response.data
      const items = Array.isArray(data) ? data : data.items || []
      featureNews.value = items.map(parseNewsItem)
    }
  } catch (e) {
    console.error('Failed to fetch feature news:', e)
  }
}

const goToPage = async (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    router.push({ query: { ...route.query, page: String(page) } })
    await fetchNews(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const formatDate = (date: string | null) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

onMounted(async () => {
  const pageParam = route.query.page as string
  if (pageParam) {
    const page = parseInt(pageParam, 10)
    if (page > 0) currentPage.value = page
  }

  await Promise.all([
    fetchFeatureNews(),
    fetchNews(currentPage.value),
  ])
})

watch(() => route.query.page, async (newPage) => {
  if (newPage) {
    const page = parseInt(newPage as string, 10)
    if (page > 0 && page !== currentPage.value) {
      currentPage.value = page
      await fetchNews(page)
    }
  }
})
</script>

<style scoped>
.news-section {
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

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

/* ---- Feature News ---- */
.feature-news {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.feature-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.3s, transform 0.3s;
  border: 2px solid var(--primary-color, #3b82f6);
}

.feature-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

.feature-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
  background: var(--primary-color, #3b82f6);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.feature-card-image {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #f0f0f0;
}

.feature-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.feature-card:hover .feature-card-image img {
  transform: scale(1.05);
}

.feature-card-body {
  padding: 1.25rem;
}

.feature-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  font-family: var(--font-battambang);
  line-height: 1.5;
}

.feature-card:hover .feature-title {
  color: var(--primary-color, #3b82f6);
}

.feature-excerpt {
  font-size: 1.1rem;
  color: #555;
  margin: 0 0 0.75rem 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.feature-date {
  font-size: 0.8rem;
  color: #999;
  display: flex;
  align-items: center;
  gap: 0.3rem;
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
  font-size: 0.85rem;
  font-weight: normal;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  font-family: var(--font-battambang);
  line-height: 1.4;
}

.news-excerpt {
  font-size: 1.1rem;
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

/* Pagination Controls */
.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 0.5rem;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--primary-color, #667eea);
  color: white;
  border-color: var(--primary-color, #667eea);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.875rem;
  color: #4a5568;
  padding: 0 0.75rem;
  font-weight: 500;
  min-width: 60px;
  text-align: center;
}

@media (max-width: 768px) {
  .feature-news {
    grid-template-columns: 1fr;
  }

  .feature-title {
    font-size: 0.85rem;
  }
}
</style>
