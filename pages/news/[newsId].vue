<template>
  <div class="news-detail">
    <div class="container">
      <div v-if="loading" class="loading-state">
        <ProgressSpinner />
      </div>

      <div v-else-if="news" class="news-layout">
        <!-- Main Article -->
        <article class="news-main">
          <header class="article-header">
            <h1 class="article-title">{{ news.title }}</h1>
            <p class="article-date">
              <i class="fa fa-clock-o"></i>
              {{ formatDate(news.publish_date) }}
            </p>
          </header>

          <div v-if="news.photo" class="article-image">
            <img :src="`${photoUrl}${news.photo}`" :alt="news.title" />
          </div>

          <div v-if="news.short_description" class="article-excerpt">
            {{ news.short_description }}
          </div>

          <div class="article-body" v-html="news.description"></div>
        </article>

        <!-- Sidebar: Related News -->
        <aside v-if="relatedNews.length > 0" class="news-sidebar">
          <h3 class="sidebar-title">{{ $t('contentManager.latestNews') }}</h3>
          <div class="sidebar-list">
            <div v-for="(item, index) in relatedNews" :key="item.news_id || item.id" class="sidebar-item">
              <a href="#" class="sidebar-item-link" @click.prevent="goToNews(item)">
                <div class="sidebar-thumb">
                  <img v-if="item.photo" :src="`${photoUrl}${item.photo}`" :alt="item.title" />
                  <div v-else class="thumb-placeholder">
                    <i class="pi pi-image"></i>
                  </div>
                </div>
                <div class="sidebar-info">
                  <span class="sidebar-news-title">{{ item.title }}</span>
                  <span class="sidebar-news-date">
                    <i class="fa fa-clock-o"></i>
                    {{ formatDate(item.publish_date) }}
                  </span>
                </div>
              </a>
              <hr v-if="index < relatedNews.length - 1" class="sidebar-separator" />
            </div>
          </div>
        </aside>
      </div>

      <div v-else class="empty-state">
        <p>News not found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const api = useApi()
const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const newsId = route.params.newsId as string

const loading = ref(true)
const news = ref<any>(null)
const relatedNews = ref<any[]>([])

const parseNewsItem = (item: any) => {
  if (!item.description || typeof item.description !== 'string') return item
  try {
    const parsed = JSON.parse(item.description)
    return {
      ...item,
      title: parsed.title || item.title || '',
      short_description: parsed.shortdes || item.short_description || '',
      description: parsed.longdes || parsed.longdescription || item.description,
      photo: parsed.photo || item.photo || null,
      publish_date: parsed.publish || parsed.publish_date || item.publish_date || null,
    }
  } catch {
    return item
  }
}

const goToNews = (item: any) => {
  navigateTo(`/news/${item.news_id || item.id}`, {
    state: { news: item }
  })
}

onMounted(async () => {
  // Try to get news from router state first (no API call)
  const state = history.state as { news?: any }
  if (state.news) {
    news.value = state.news
    loading.value = false
  } else {
    // Fallback: fetch from API if opened directly via URL
    try {
      const response = await api.get<any>(`/site/news/${newsId}`)
      if (response.success && response.data) {
        news.value = parseNewsItem(response.data)
      }
    } catch (e) {
      console.error('Failed to fetch news:', e)
    } finally {
      loading.value = false
    }
  }

  // Fetch related news (latest news from the same domain)
  try {
    const domainStore = useDomainStore()
    const domainId = domainStore.domain?.domain_id
    if (domainId) {
      const response = await api.get<any>(`/site/news/${domainId}`)
      if (response.success && response.data) {
        const allNews = Array.isArray(response.data) ? response.data : [response.data]
        relatedNews.value = allNews
          .map(parseNewsItem)
          .filter((n: any) => String(n.news_id || n.id) !== String(newsId))
          .slice(0, 10)
      }
    }
  } catch {
    // Silently fail — sidebar is optional
  }
})

const formatDate = (date: string | null) => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
}

useHead({
  title: news.value?.title || 'News',
})
</script>

<style scoped>
.news-detail {
  min-height: 60vh;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.news-layout {
  display: flex;
  gap: 2rem;
  padding: 1.5rem 0;
}

/* ---- Main Article ---- */
.news-main {
  flex: 0 0 75%;
  max-width: 75%;
}

.article-header {
  padding: 1rem 0;
}

.article-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.75rem 0;
  font-family: var(--font-battambang);
  line-height: 1.4;
}

.article-date {
  font-size: 1rem;
  color: #777;
  margin: 0;
}

.article-date i {
  margin-right: 4px;
}

.article-image {
  margin: 1.5rem 0;
}

.article-image img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.article-excerpt {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.article-body {
  line-height: 1.8;
  color: #4a5568;
  padding-bottom: 3rem;
}

.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4) {
  font-family: var(--font-battambang);
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1a202c;
}

.article-body :deep(p) {
  margin-bottom: 1rem;
}

.article-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.article-body :deep(a) {
  color: var(--primary-color, #3b82f6);
  text-decoration: none;
}

.article-body :deep(a:hover) {
  text-decoration: underline;
}

/* ---- Sidebar ---- */
.news-sidebar {
  flex: 0 0 25%;
  max-width: 25%;
}

.sidebar-title {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 1rem 0;
  font-family: var(--font-battambang);
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color, #3b82f6);
}

.sidebar-list {
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  padding: 0.5rem 0;
}

.sidebar-item-link {
  display: flex;
  gap: 0.75rem;
  text-decoration: none;
  align-items: flex-start;
}

.sidebar-thumb {
  flex: 0 0 80px;
  max-width: 80px;
  overflow: hidden;
  border-radius: 6px;
}

.sidebar-thumb img {
  width: 100%;
  height: auto;
  display: block;
}

.thumb-placeholder {
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7fafc;
  color: #cbd5e0;
  font-size: 1.25rem;
  border-radius: 6px;
}

.sidebar-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-news-title {
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sidebar-item-link:hover .sidebar-news-title {
  color: var(--primary-color, #3b82f6);
}

.sidebar-news-date {
  font-size: 0.75rem;
  color: #999;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.sidebar-separator {
  border: none;
  border-top: 1px solid #eee;
  margin: 0.25rem 0;
  width: 100%;
}

/* ---- Loading / Empty ---- */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: #718096;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .news-layout {
    flex-direction: column;
  }

  .news-main,
  .news-sidebar {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .article-title {
    font-size: 1.35rem;
  }
}
</style>
