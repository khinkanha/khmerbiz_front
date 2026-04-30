<template>
  <div class="classic-multi-page">
    <!-- Banner Slideshow -->
    <BannerSlideshow v-if="banners.length > 0" :banners="banners" />

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <ProgressSpinner />
          <p>{{ $t('common.loading') }}</p>
        </div>

        <template v-else>
          <!-- Featured News / Important Events Section -->
          <section v-if="allNews.length > 0" class="section featured-section">
            <div class="section-header">
              <h2 class="section-title">
                <span class="title-bar"></span>
                {{ $t('contentManager.latestNews') }}
              </h2>
            </div>
            <div class="featured-layout">
              <!-- Large Featured Card -->
              <NuxtLink
                v-if="allNews[0]"
                :to="`/news/${domain.domain_id}/${allNews[0].content_id}/${allNews[0].news_id}`"
                class="featured-main-card"
              >
                <div class="featured-img-wrap">
                  <img
                    v-if="allNews[0].photo"
                    :src="`${photoUrl}${allNews[0].photo}`"
                    :alt="allNews[0].title"
                  />
                  <div v-else class="img-placeholder">
                    <i class="pi pi-image"></i>
                  </div>
                </div>
                <div class="featured-info">
                  <h3>{{ allNews[0].title }}</h3>
                  <p v-if="allNews[0].short_description">{{ allNews[0].short_description }}</p>
                  <span v-if="allNews[0].publish_date" class="news-date">
                    <i class="pi pi-calendar"></i>
                    {{ formatDate(allNews[0].publish_date) }}
                  </span>
                </div>
              </NuxtLink>

              <!-- Side News List -->
              <div class="featured-side-list">
                <NuxtLink
                  v-for="news in allNews.slice(1, 5)"
                  :key="news.news_id"
                  :to="`/news/${domain.domain_id}/${news.content_id}/${news.news_id}`"
                  class="side-news-item"
                >
                  <div class="side-thumb">
                    <img
                      v-if="news.photo"
                      :src="`${photoUrl}${news.photo}`"
                      :alt="news.title"
                    />
                    <div v-else class="img-placeholder small">
                      <i class="pi pi-image"></i>
                    </div>
                  </div>
                  <div class="side-info">
                    <h4>{{ news.title }}</h4>
                    <span v-if="news.publish_date" class="news-date">
                      <i class="pi pi-calendar"></i>
                      {{ formatDate(news.publish_date) }}
                    </span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </section>

          <!-- Photo Gallery Strip -->
          <section v-if="allPhotos.length > 0" class="section gallery-strip-section">
            <div class="section-header">
              <h2 class="section-title">
                <span class="title-bar"></span>
                {{ $t('contentManager.photo') }}
              </h2>
            </div>
            <div class="gallery-strip">
              <div
                v-for="item in allPhotos.slice(0, 8)"
                :key="item.item_id"
                class="gallery-thumb"
                @click="openLightbox(item)"
              >
                <img :src="`${photoUrl}${item.photo}`" :alt="item.title || ''" />
              </div>
            </div>

            <!-- Lightbox -->
            <Dialog
              v-model:visible="showLightbox"
              :style="{ width: '90vw' }"
              :modal="true"
              :showHeader="false"
              :closable="true"
              contentClass="lightbox-content"
            >
              <img
                v-if="lightboxItem"
                :src="`${photoUrl}${lightboxItem.photo}`"
                :alt="lightboxItem.title || ''"
                class="lightbox-img"
              />
              <div v-if="lightboxItem?.title" class="lightbox-caption">
                {{ lightboxItem.title }}
              </div>
            </Dialog>
          </section>

          <!-- Content Layout: Main + Sidebar -->
          <div class="content-layout">
            <!-- Main Column -->
            <div class="content-main">
              <template v-for="menuItem in menuTree" :key="menuItem.item_id">
                <!-- Menu items with children -->
                <section
                  v-if="menuItem.children && menuItem.children.length > 0"
                  class="section"
                  :id="`section-${menuItem.item_id}`"
                >
                  <div class="section-header">
                    <h2 class="section-title">
                      <span class="title-bar"></span>
                      {{ menuItem.item_name }}
                    </h2>
                  </div>

                  <!-- Render each child's content -->
                  <div
                    v-for="child in menuItem.children"
                    :key="child.item_id"
                    :id="`section-${child.item_id}`"
                    class="sub-section"
                  >
                    <template v-if="getContentForMenuItem(child.item_id)">
                      <!-- NEWS type -->
                      <NewsSection
                        v-if="getContentType(child.item_id) === ContentType.NEWS"
                        :items="getContentForMenuItem(child.item_id)!.news"
                        :domain-id="domain.domain_id"
                        :content-id="getContentForMenuItem(child.item_id)!.content.content_id"
                        :section-title="child.item_name || ''"
                      />
                      <!-- PHOTO type -->
                      <PhotoGallery
                        v-else-if="getContentType(child.item_id) === ContentType.PHOTO"
                        :items="getContentForMenuItem(child.item_id)!.items"
                        :section-title="child.item_name || ''"
                      />
                      <!-- VIDEO type -->
                      <VideoSection
                        v-else-if="getContentType(child.item_id) === ContentType.VIDEO"
                        :items="getContentForMenuItem(child.item_id)!.items"
                        :section-title="child.item_name || ''"
                      />
                      <!-- MAP type -->
                      <MapDisplay
                        v-else-if="getContentType(child.item_id) === ContentType.MAP"
                        :map-data="parseMapData(getContentForMenuItem(child.item_id)!.content)"
                        :section-title="child.item_name || ''"
                      />
                      <!-- DOCUMENT type -->
                      <DocumentSection
                        v-else-if="getContentType(child.item_id) === ContentType.DOCUMENT"
                        :items="getContentForMenuItem(child.item_id)!.items"
                        :section-title="child.item_name || ''"
                      />
                      <!-- ARTICLE type (default) -->
                      <ArticleSection
                        v-else
                        :content="getContentForMenuItem(child.item_id)!.content"
                        :show-title="true"
                      />
                    </template>
                  </div>
                </section>

                <!-- Menu items without children -->
                <section
                  v-else
                  class="section"
                  :id="`section-${menuItem.item_id}`"
                >
                  <div class="section-header">
                    <h2 class="section-title">
                      <span class="title-bar"></span>
                      {{ menuItem.item_name }}
                    </h2>
                  </div>

                  <template v-if="getContentForMenuItem(menuItem.item_id)">
                    <NewsSection
                      v-if="getContentType(menuItem.item_id) === ContentType.NEWS"
                      :items="getContentForMenuItem(menuItem.item_id)!.news"
                      :domain-id="domain.domain_id"
                      :content-id="getContentForMenuItem(menuItem.item_id)!.content.content_id"
                    />
                    <PhotoGallery
                      v-else-if="getContentType(menuItem.item_id) === ContentType.PHOTO"
                      :items="getContentForMenuItem(menuItem.item_id)!.items"
                    />
                    <VideoSection
                      v-else-if="getContentType(menuItem.item_id) === ContentType.VIDEO"
                      :items="getContentForMenuItem(menuItem.item_id)!.items"
                    />
                    <MapDisplay
                      v-else-if="getContentType(menuItem.item_id) === ContentType.MAP"
                      :map-data="parseMapData(getContentForMenuItem(menuItem.item_id)!.content)"
                    />
                    <DocumentSection
                      v-else-if="getContentType(menuItem.item_id) === ContentType.DOCUMENT"
                      :items="getContentForMenuItem(menuItem.item_id)!.items"
                    />
                    <ArticleSection
                      v-else
                      :content="getContentForMenuItem(menuItem.item_id)!.content"
                    />
                  </template>
                </section>
              </template>
            </div>

            <!-- Sidebar -->
            <aside class="content-sidebar">
              <!-- Latest News Widget -->
              <div v-if="allNews.length > 0" class="sidebar-widget">
                <h3 class="widget-title">
                  <span class="title-bar"></span>
                  {{ $t('contentManager.latestNews') }}
                </h3>
                <div class="sidebar-news-list">
                  <NuxtLink
                    v-for="news in allNews.slice(0, 6)"
                    :key="news.news_id"
                    :to="`/news/${domain.domain_id}/${news.content_id}/${news.news_id}`"
                    class="sidebar-news-item"
                  >
                    <img
                      v-if="news.photo"
                      :src="`${photoUrl}${news.photo}`"
                      :alt="news.title"
                      class="sidebar-news-thumb"
                    />
                    <div class="sidebar-news-info">
                      <h4>{{ news.title }}</h4>
                      <span v-if="news.publish_date" class="news-date">
                        {{ formatDate(news.publish_date) }}
                      </span>
                    </div>
                  </NuxtLink>
                </div>
              </div>

              <!-- Social Media Widget -->
              <div v-if="socialMedia.length > 0" class="sidebar-widget">
                <h3 class="widget-title">
                  <span class="title-bar"></span>
                  {{ $t('settings.socialMedia') }}
                </h3>
                <div class="sidebar-social-links">
                  <a
                    v-for="social in socialMedia"
                    :key="social.social_id"
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="sidebar-social-link"
                  >
                    <i :class="social.icon_class"></i>
                    <span>{{ social.platform }}</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem, Domain, Setting, Banner, SocialMedia, ContentSection, Language, ContentItem, Content } from '~/types'
import { ContentType } from '~/types'

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
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const loading = ref(false)
const showLightbox = ref(false)
const lightboxItem = ref<ContentItem | null>(null)

// Collect all news from all content sections
const allNews = computed(() => {
  const news: any[] = []
  props.contentSections.forEach(section => {
    section.news.forEach(n => news.push(n))
  })
  return news
})

// Collect all photo items from all content sections
const allPhotos = computed(() => {
  const items: ContentItem[] = []
  props.contentSections.forEach(section => {
    if (section.content.content_type === ContentType.PHOTO) {
      section.items.forEach(item => {
        if (item.photo) items.push(item)
      })
    }
  })
  return items
})

const getContentForMenuItem = (menuItemId: number): ContentSection | undefined => {
  return props.contentSections.find(cs => cs.content.menu_id === menuItemId)
}

const getContentType = (menuItemId: number): ContentType | undefined => {
  const section = getContentForMenuItem(menuItemId)
  return section?.content.content_type
}

const openLightbox = (item: ContentItem) => {
  lightboxItem.value = item
  showLightbox.value = true
}

const formatDate = (date: string | null) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
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
  background-color: #f5f5f5;
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
  padding: 2rem 0;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-color, #1a202c);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-battambang);
}

.title-bar {
  display: inline-block;
  width: 5px;
  height: 24px;
  background-color: var(--primary-color, #3b82f6);
  border-radius: 2px;
  flex-shrink: 0;
}

/* ---- Featured News Section ---- */
.featured-section {
  padding-top: 2.5rem;
}

.featured-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.featured-main-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s, transform 0.2s;
}

.featured-main-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.featured-img-wrap {
  aspect-ratio: 16/10;
  overflow: hidden;
  background: #e2e8f0;
}

.featured-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.featured-main-card:hover .featured-img-wrap img {
  transform: scale(1.03);
}

.img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e0;
  font-size: 3rem;
  background: #f7fafc;
}

.img-placeholder.small {
  font-size: 1.5rem;
}

.featured-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.featured-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  line-height: 1.5;
  font-family: var(--font-battambang);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured-info p {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-date {
  font-size: 0.75rem;
  color: #a0aec0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* Side News List */
.featured-side-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.side-news-item {
  display: flex;
  gap: 1rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s;
  flex: 1;
}

.side-news-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.side-thumb {
  width: 140px;
  min-height: 100px;
  flex-shrink: 0;
  overflow: hidden;
  background: #e2e8f0;
}

.side-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.side-info {
  padding: 0.75rem 0.75rem 0.75rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  min-width: 0;
}

.side-info h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  line-height: 1.4;
  font-family: var(--font-battambang);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ---- Photo Gallery Strip ---- */
.gallery-strip-section {
  padding: 1.5rem 0;
}

.gallery-strip {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 0.75rem;
}

.gallery-thumb {
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.gallery-thumb:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:deep(.lightbox-content) {
  background: rgba(0, 0, 0, 0.9);
  padding: 0;
  border-radius: 8px;
}

.lightbox-img {
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

/* ---- Content Layout (Main + Sidebar) ---- */
.content-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  padding-bottom: 2rem;
}

.content-main {
  min-width: 0;
}

.content-main .section {
  padding: 1.5rem 0;
}

.sub-section {
  margin-bottom: 1.5rem;
}

.sub-section:last-child {
  margin-bottom: 0;
}

/* ---- Sidebar ---- */
.content-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-widget {
  background: white;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.widget-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-color, #1a202c);
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-battambang);
}

.widget-title .title-bar {
  height: 18px;
}

.sidebar-news-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-news-item {
  display: flex;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
  transition: opacity 0.2s;
}

.sidebar-news-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.sidebar-news-item:hover {
  opacity: 0.8;
}

.sidebar-news-thumb {
  width: 70px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.sidebar-news-info {
  flex: 1;
  min-width: 0;
}

.sidebar-news-info h4 {
  font-size: 0.8rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
  line-height: 1.4;
  font-family: var(--font-battambong);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sidebar-news-info .news-date {
  font-size: 0.7rem;
}

.sidebar-social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  color: var(--text-color, #4a5568);
  border-radius: 6px;
  transition: background-color 0.2s;
  font-size: 0.875rem;
}

.sidebar-social-link:hover {
  background-color: #f7fafc;
}

.sidebar-social-link i {
  font-size: 1.1rem;
  color: var(--primary-color, #3b82f6);
}

/* ---- Responsive ---- */
@media (max-width: 1024px) {
  .content-layout {
    grid-template-columns: 1fr;
  }

  .content-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .featured-layout {
    grid-template-columns: 1fr;
  }

  .featured-side-list {
    flex-direction: row;
    overflow-x: auto;
    gap: 0.75rem;
    padding-bottom: 0.5rem;
  }

  .side-news-item {
    min-width: 260px;
    flex-shrink: 0;
  }

  .gallery-strip {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .section-title {
    font-size: 1.15rem;
  }
}
</style>
