<template>
  <div class="classic-multi-page" :class="containerClass">
    <!-- Banner Slideshow -->
    <BannerSlideshow v-if="showBanners" :banners="banners" :class="bannerPosClass" />

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <ProgressSpinner />
          <p>{{ $t('common.loading') }}</p>
        </div>

        <template v-else>
          <!-- News Section -->
          <section v-if="featuredNews.length > 0" class="section news-section">
            <!-- Featured News: First 2 as large cards -->
            <div v-if="paginatedNews.length > 0" class="featured-grid">
              <a v-for="news in paginatedNews.slice(0, 2)" :key="news.news_id" href="#" class="featured-card"
                @click.prevent="goToNews(news)">
                <div class="featured-card-img">
                  <img v-if="news.photo" :src="`${photoUrl}${news.photo}`" :alt="news.title" />
                  <div v-else class="img-placeholder">
                    <i class="pi pi-image"></i>
                  </div>
                </div>
                <div class="featured-card-body">
                  <h4 class="media-heading">
                    <a href="#" @click.prevent="goToNews(news)">
                      {{ news.title }}
                    </a>
                  </h4>
                  <p v-if="news.short_description" class="featured-excerpt">
                    {{ news.short_description }}
                  </p>
                  <p class="date">
                    <i class="fa fa-clock-o"></i>
                    {{ formatDate(news.publish_date) }}
                  </p>
                </div>
              </a>
            </div>

            <!-- Media List: Remaining news -->
            <div v-if="paginatedNews.length > 2" class="news-media-list">
              <template v-for="(news, index) in paginatedNews.slice(2)" :key="news.news_id">
                <div class="news-media-item">
                  <div class="media-left">
                    <a href="#" @click.prevent="goToNews(news)">
                      <img v-if="news.photo" :src="`${photoUrl}${news.photo}`" :alt="news.title" />
                      <div v-else class="img-placeholder small">
                        <i class="pi pi-image"></i>
                      </div>
                    </a>
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">
                      <a href="#" @click.prevent="goToNews(news)">
                        {{ news.title }}
                      </a>
                    </h4>
                    <p v-if="news.short_description" class="media-excerpt">
                      {{ news.short_description }}
                    </p>
                    <p class="date">
                      <i class="fa fa-clock-o"></i>
                      {{ formatDate(news.publish_date) }}
                    </p>
                  </div>
                </div>
                <hr v-if="index < paginatedNews.slice(2).length - 1" class="news-separator" />
              </template>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pagination-wrap">
              <ul class="pagination-list">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link" :disabled="currentPage === 1" @click="currentPage = 1">
                    &laquo;
                  </button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link" :disabled="currentPage === 1" @click="currentPage--">
                    &lsaquo;
                  </button>
                </li>
                <li v-for="page in visiblePages" :key="page" class="page-item"
                  :class="{ active: page === currentPage }">
                  <button class="page-link" @click="currentPage = page">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <button class="page-link" :disabled="currentPage === totalPages" @click="currentPage++">
                    &rsaquo;
                  </button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <button class="page-link" :disabled="currentPage === totalPages" @click="currentPage = totalPages">
                    &raquo;
                  </button>
                </li>
              </ul>
            </div>
          </section>

          <!-- Content Sections from Menu Tree -->
          <template v-for="menuItem in menuTree" :key="menuItem.item_id">

            <!-- Menu items with children -->
            <section
              v-if="menuItem.children && menuItem.children.length > 0 && menuItem.children.some(child => getContentForMenuItem(child.item_id))"
              class="section" :id="`section-${menuItem.item_id}`">
              <div v-for="child in menuItem.children" :key="child.item_id" :id="`section-${child.item_id}`"
                class="sub-section">
                {{ "Content Type:" + getContentType(child.item_id) }}
                <template v-if="getContentForMenuItem(child.item_id)">
                  <NewsSection v-if="getContentType(child.item_id) === ContentType.NEWS" :domain-id="domain.domain_id"
                    :content-id="getContentForMenuItem(child.item_id)!.content.content_id"
                    :section-title="child.item_name || ''" />
                  <PhotoGallery v-else-if="getContentType(child.item_id) === ContentType.PHOTO"
                    :items="getContentForMenuItem(child.item_id)!.items" :section-title="child.item_name || ''" />
                  <VideoSection v-else-if="getContentType(child.item_id) === ContentType.VIDEO"
                    :items="getContentForMenuItem(child.item_id)!.items" :section-title="child.item_name || ''" />
                  <MapDisplay v-else-if="getContentType(child.item_id) === ContentType.MAP"
                    :map-data="parseMapData(getContentForMenuItem(child.item_id)!.content)"
                    :section-title="child.item_name || ''" />
                  <DocumentSection v-else-if="getContentType(child.item_id) === ContentType.DOCUMENT"
                    :items="getContentForMenuItem(child.item_id)!.items" :section-title="child.item_name || ''" />
                  <ProductCatalog v-else-if="getContentType(child.item_id) === ContentType.PRODUCT"
                    :content-id="getContentForMenuItem(child.item_id)!.content.content_id"
                    :section-title="child.item_name || ''"
                    :section-description="getContentForMenuItem(child.item_id)!.content.title || ''" />
                  <ArticleSection v-else :content="getContentForMenuItem(child.item_id)!.content" :show-title="true" />
                </template>
              </div>
            </section>

            <!-- Menu items without children -->
            <section v-else-if="getContentForMenuItem(menuItem.item_id)" class="section"
              :id="`section-${menuItem.item_id}`">
              <template v-if="getContentForMenuItem(menuItem.item_id)">
                <NewsSection v-if="getContentType(menuItem.item_id) === ContentType.NEWS" :domain-id="domain.domain_id"
                  :content-id="getContentForMenuItem(menuItem.item_id)!.content.content_id" />
                <PhotoGallery v-else-if="getContentType(menuItem.item_id) === ContentType.PHOTO"
                  :items="getContentForMenuItem(menuItem.item_id)!.items" />
                <VideoSection v-else-if="getContentType(menuItem.item_id) === ContentType.VIDEO"
                  :items="getContentForMenuItem(menuItem.item_id)!.items" />
                <MapDisplay v-else-if="getContentType(menuItem.item_id) === ContentType.MAP"
                  :map-data="parseMapData(getContentForMenuItem(menuItem.item_id)!.content)" />
                <DocumentSection v-else-if="getContentType(menuItem.item_id) === ContentType.DOCUMENT"
                  :items="getContentForMenuItem(menuItem.item_id)!.items" />
                <ProductCatalog v-else-if="getContentType(menuItem.item_id) === ContentType.PRODUCT"
                  :content-id="getContentForMenuItem(menuItem.item_id)!.content.content_id"
                  :section-title="menuItem.item_name || ''"
                  :section-description="getContentForMenuItem(menuItem.item_id)!.content.title || ''" />
                <ArticleSection v-else :content="getContentForMenuItem(menuItem.item_id)!.content" />
              </template>
            </section>
          </template>

          <!-- Social Media Links -->
          <section v-if="socialMedia.length > 0" class="section social-section">
            <div class="social-links-center">
              <a v-for="social in socialMedia" :key="social.smid" :href="social.link" target="_blank"
                rel="noopener noreferrer" class="social-icon-link">
                <i :class="getSocialIcon(social.stype)"></i>
              </a>
            </div>
          </section>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem, Domain, Setting, Banner, SocialMedia, ContentSection, Language, ContentItem, Content } from '~/types'
import { ContentType, getSocialIcon } from '~/types'
import { parseNewsItem } from '~/composables/useNewsParser'

interface Props {
  menuTree: MenuItem[]
  contentSections: ContentSection[]
  banners: Banner[]
  settings: Setting
  domain: Domain
  socialMedia: SocialMedia[]
  language: Language
}

const props = defineProps<Props>()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl
const api = useApi()
const route = useRoute()

const isHomePage = computed(() => route.path === '/')

// banner_mode: 0=off, 1=on
const bannerMode = computed(() => Number(props.settings?.banner_mode) !== 0)

// banner_display: 0=homepage only, 1=all pages
const bannerDisplayAll = computed(() => Number(props.settings?.banner_display) === 1)

const showBanners = computed(() => {
  if (!bannerMode.value) return false
  if (props.banners.length === 0) return false
  return bannerDisplayAll.value || isHomePage.value
})

// banner_position: 1=Top, 2=Middle, 3=Bottom
const bannerPosClass = computed(() => {
  const pos = Number(props.settings?.banner_pos) || 1
  if (pos === 2) return 'banner-pos-middle'
  if (pos === 3) return 'banner-pos-bottom'
  return ''
})

// screen_mode: 1=full screen, 2=boxed
const containerClass = computed(() => {
  return Number(props.settings?.screen_mode) === 2 ? 'screen-boxed' : ''
})

const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

const goToNews = (news: any) => {
  navigateTo(`/news/${news.news_id || news.id}`, {
    state: { news }
  })
}

// Featured news fetched from /site/feature-news/:contentId for all NEWS sections
const featuredNews = ref<any[]>([])

const newsContentIds = computed(() =>
  props.contentSections
    .filter(cs => cs.content.content_type === ContentType.NEWS)
    .map(cs => cs.content.content_id)
)

const fetchFeaturedNews = async () => {
  if (newsContentIds.value.length === 0) return
  try {
    const results = await Promise.all(
      newsContentIds.value.map(contentId =>
        api.get<any>(`/site/feature-news/${contentId}`)
          .then(res => res.success && res.data ? (Array.isArray(res.data) ? res.data : res.data.items || []) : [])
          .catch(() => [])
      )
    )
    featuredNews.value = results.flat().map(parseNewsItem)
  } catch (e) {
    console.error('Failed to fetch featured news:', e)
  }
}

// Paginated news (client-side pagination over merged featured news)
const totalPages = computed(() => Math.ceil(featuredNews.value.length / itemsPerPage))

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return featuredNews.value.slice(start, start + itemsPerPage)
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const total = totalPages.value
  const current = currentPage.value
  let start = Math.max(1, current - 2)
  const end = Math.min(total, start + 4)
  start = Math.max(1, end - 4)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

watch(totalPages, (val) => {
  if (currentPage.value > val) currentPage.value = Math.max(1, val)
})

onMounted(() => {
  console.log('ClassicMultiPage - contentSections:', props.contentSections)
  console.log('ClassicMultiPage - menuTree:', props.menuTree)
  fetchFeaturedNews()
})

const getContentForMenuItem = (menuItemId: number): ContentSection | undefined => {
  const section = props.contentSections.find(cs => cs.content.menu_id === menuItemId)
  console.log(`Looking for menu item ${menuItemId}:`, section ? `Found content type ${section.content.content_type}` : 'Not found')
  return section
}

const getContentType = (menuItemId: number): ContentType | undefined => {
  const section = getContentForMenuItem(menuItemId)
  return section?.content.content_type
}

const formatDate = (date: string | null) => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
}

interface MapData {
  lat?: number
  lng?: number
  zoom?: number
  marker?: string
}

const parseMapData = (content: Content): MapData => {
  try {
    return JSON.parse(content.description || '{}')
  } catch {
    return {}
  }
}
</script>

<style scoped>
.classic-multi-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  gap: 1rem;
}

.loading-state p {
  color: #718096;
  margin: 0;
}

/* ---- Sections ---- */
.section {
  padding: 1.5rem 0;
}

.section-header {
  margin-bottom: 1.25rem;
}

.section-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-color, #1a202c);
  margin: 0;
  font-family: var(--font-battambang);
}

.title-bar {
  display: none;
}

/* ---- News Section ---- */
.news-section {
  padding-top: 2rem;
}

/* ---- Featured Grid (first 2 news) ---- */
.featured-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.featured-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.featured-card:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.18);
}

.featured-card-img {
  overflow: hidden;
}

.featured-card-img img {
  width: 100%;
  height: auto;
  display: block;
}

.img-placeholder {
  width: 100%;
  aspect-ratio: 16/10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e0;
  font-size: 3rem;
  background: #f7fafc;
}

.img-placeholder.small {
  font-size: 1.5rem;
  aspect-ratio: auto;
  width: 100%;
  height: 100%;
  min-height: 80px;
}

.featured-card-body {
  padding: 20px;
}

.media-heading {
  line-height: 1.6;
  margin: 0 0 0.5rem 0;
  font-family: var(--font-battambang);
}

.featured-card-body .media-heading {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.featured-card-body .media-heading a {
  color: #333;
  text-decoration: none;
}

.featured-card-body .media-heading a:hover {
  color: var(--primary-color, #3b82f6);
}

.featured-excerpt {
  font-size: 0.9rem;
  color: #555;
  margin: 0 0 0.5rem 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.date {
  font-size: 1rem;
  color: #777;
  margin: 0;
  margin-top: 10px;
}

.date i {
  margin-right: 4px;
}

/* ---- Media List (remaining news) ---- */
.news-media-list {
  margin-bottom: 1rem;
}

.news-media-item {
  display: flex;
  gap: 1rem;
  padding: 0;
}

.media-left {
  flex: 0 0 16.667%;
  max-width: 16.667%;
}

.media-left a {
  display: block;
}

.media-left img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.media-body {
  flex: 1;
  min-width: 0;
}

.media-body .media-heading {
  font-size: 0.95rem;
  font-weight: 600;
}

.media-body .media-heading a {
  color: #333;
  text-decoration: none;
}

.media-body .media-heading a:hover {
  color: var(--primary-color, #3b82f6);
}

.media-excerpt {
  font-size: 0.875rem;
  color: #555;
  margin: 0.25rem 0 0 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-separator {
  border: none;
  border-top: 3px dotted #eee;
  margin: 9px;
  width: 100%;
}

/* ---- Pagination ---- */
.pagination-wrap {
  text-align: center;
  padding: 1rem 0;
}

.pagination-list {
  display: inline-flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 4px;
}

.page-item .page-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  color: #333;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.15s;
}

.page-item .page-link:hover:not(:disabled) {
  background-color: #f5f5f5;
}

.page-item.active .page-link {
  background-color: var(--primary-color, #3b82f6);
  border-color: var(--primary-color, #3b82f6);
  color: #fff;
}

.page-item.disabled .page-link {
  color: #aaa;
  cursor: not-allowed;
  opacity: 0.6;
}

/* ---- Content Sections ---- */
.sub-section {
  margin-bottom: 1.5rem;
}

.sub-section:last-child {
  margin-bottom: 0;
}

.content-main .section {
  padding: 1.5rem 0;
}

/* ---- Social Media Section ---- */
.social-section {
  text-align: center;
  padding: 1.5rem 0;
}

.social-links-center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.social-icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #555;
  font-size: 1.25rem;
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
}

.social-icon-link:hover {
  color: var(--primary-color, #3b82f6);
  transform: scale(1.15);
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }

  .media-left {
    flex: 0 0 100px;
    max-width: 100px;
    margin-bottom: 10px;
  }

  .section-title {
    font-size: 1.15rem;
  }

  .featured-card-body .media-heading {
    font-size: 0.9rem;
  }
}

/* Screen mode: boxed */
.screen-boxed .container {
  max-width: 960px;
}

/* Banner positions */
.banner-pos-middle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.banner-pos-bottom {
  order: 999;
}
</style>
