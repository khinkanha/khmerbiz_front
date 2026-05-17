<template>
  <section class="news-section">
    <h2 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h2>
    <div class="news-grid">
      <NuxtLink v-for="news in paginatedItems" :key="news.id" :to="`/news/${news.id}`"
        class="news-card">
        <div class="news-image">
          <img v-if="news.photo" :src="`${photoUrl}${news.photo}`" :alt="news.title" />
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

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="pagination-controls">
      <button
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="goToPage(1)"
        :title="$t('common.first')"
      >
        <i class="pi pi-angle-double-left"></i>
      </button>
      <button
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        :title="$t('common.previous')"
      >
        <i class="pi pi-angle-left"></i>
      </button>
      <span class="pagination-info">{{ currentPage }} / {{ totalPages }}</span>
      <button
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        :title="$t('common.next')"
      >
        <i class="pi pi-angle-right"></i>
      </button>
      <button
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(totalPages)"
        :title="$t('common.last')"
      >
        <i class="pi pi-angle-double-right"></i>
      </button>
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

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: '',
  showMoreLink: false,
  moreLink: '',
})

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl
const route = useRoute()
const router = useRouter()

const itemsPerPage = 9
const currentPage = ref(1)

// Sort items by publish_date DESC (newest first)
const sortedItems = computed(() => {
  return [...props.items].sort((a, b) => {
    const dateA = a.publish_date ? new Date(a.publish_date).getTime() : 0
    const dateB = b.publish_date ? new Date(b.publish_date).getTime() : 0
    return dateB - dateA // Descending order
  })
})

// Calculate total pages
const totalPages = computed(() => Math.ceil(sortedItems.value.length / itemsPerPage))

// Get items for current page
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedItems.value.slice(start, end)
})

// Navigate to specific page
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Update URL query param
    router.push({ query: { ...route.query, page: String(page) } })
    // Scroll to top of news section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const formatDate = (date: string | null) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

// Initialize page from URL query param
onMounted(() => {
  const pageParam = route.query.page as string
  if (pageParam) {
    const page = parseInt(pageParam, 10)
    if (page > 0) {
      currentPage.value = page
    }
  }
})

// Watch for query param changes (browser back/forward)
watch(() => route.query.page, (newPage) => {
  if (newPage) {
    const page = parseInt(newPage as string, 10)
    if (page > 0 && page <= totalPages.value) {
      currentPage.value = page
    }
  }
})
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
</style>
