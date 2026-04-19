<template>
  <div class="magazine-grid">
    <!-- Featured Section -->
    <section class="featured-section" v-if="featuredContent">
      <div class="featured-wrapper">
        <div class="featured-image">
          <img
            v-if="featuredItem && featuredItem.photo"
            :src="`${photoUrl}${featuredItem.photo}`"
            :alt="featuredContent.title"
          />
        </div>
        <div class="featured-content">
          <h1 class="featured-title">{{ featuredContent.title }}</h1>
          <p v-if="featuredContent.description" class="featured-description">
            {{ featuredContent.description }}
          </p>
          <ContentRenderer
            :content="featuredContent"
            :domain-id="domain.domain_id"
            :show-title="false"
          />
        </div>
      </div>
    </section>

    <!-- Navigation Dropdown -->
    <nav class="magazine-nav">
      <Dropdown
        v-model="selectedSection"
        :options="sectionOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Navigate to section"
        @change="navigateToSection"
        class="nav-dropdown"
      />
    </nav>

    <!-- Content Grid -->
    <main class="main-content">
      <div class="container">
        <div
          v-for="menuItem in menuTree"
          :key="menuItem.item_id"
          class="content-block"
        >
          <!-- Section Header -->
          <div class="block-header">
            <h2 class="block-title">{{ menuItem.item_name }}</h2>
            <a
              v-if="menuItem.children && menuItem.children.length > 1"
              :href="`#section-${menuItem.item_id}`"
              class="view-all-link"
            >
              {{ $t('common.viewAll') }}
              <i class="pi pi-arrow-right"></i>
            </a>
          </div>

          <!-- Submenu Items Grid -->
          <div
            v-if="menuItem.children && menuItem.children.length > 0"
            :id="`section-${menuItem.item_id}`"
            class="items-grid"
          >
            <div
              v-for="child in menuItem.children.slice(0, 6)"
              :key="child.item_id"
              class="item-card"
            >
              <ContentRenderer
                :content="getContentForMenuItem(child.item_id)"
                :domain-id="domain.domain_id"
                :compact="true"
              />
            </div>
          </div>

          <!-- Single Content -->
          <div v-else>
            <ContentRenderer
              :content="getContentForMenuItem(menuItem.item_id)"
              :domain-id="domain.domain_id"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-widget">
        <h3 class="widget-title">{{ $t('contentManager.latestNews') }}</h3>
        <div class="latest-news-list">
          <NuxtLink
            v-for="news in latestNews"
            :key="news.news_id"
            :to="`/news/${domain.domain_id}/${news.content_id}/${news.news_id}`"
            class="news-item"
          >
            <img
              v-if="news.photo"
              :src="`${photoUrl}${news.photo}`"
              :alt="news.title"
              class="news-thumb"
            />
            <div class="news-info">
              <h4>{{ news.title }}</h4>
              <p class="news-date">{{ formatDate(news.publish_date) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem, Domain, Setting, Banner, SocialMedia, ContentSection, Language, ContentItem } from '~/types'

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

const selectedSection = ref<number | null>(null)

const sectionOptions = computed(() => {
  return props.menuTree.map(menu => ({
    label: menu.item_name,
    value: menu.item_id,
  }))
})

// Find featured content (first item with is_feature)
const featuredContent = computed(() => {
  for (const section of props.contentSections) {
    const featuredItem = section.items.find(item => item.is_feature)
    if (featuredItem) {
      return section.content
    }
  }
  return props.contentSections[0]?.content || null
})

const featuredItem = computed(() => {
  for (const section of props.contentSections) {
    const featuredItem = section.items.find(item => item.is_feature)
    if (featuredItem) {
      return featuredItem
    }
  }
  return null
})

// Get latest news from all news content
const latestNews = computed(() => {
  const allNews: any[] = []
  props.contentSections.forEach(section => {
    section.news.forEach(news => {
      allNews.push(news)
    })
  })
  return allNews.slice(0, 5)
})

const navigateToSection = () => {
  if (selectedSection.value) {
    const element = document.getElementById(`section-${selectedSection.value}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const getContentForMenuItem = (menuItemId: number): ContentSection | null => {
  return props.contentSections.find(cs => cs.content.menu_id === menuItemId) || null
}

const formatDate = (date: string | null) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.magazine-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .magazine-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }
}

.featured-section {
  grid-column: 1 / -1;
  margin-bottom: 2rem;
}

.featured-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

@media (max-width: 768px) {
  .featured-wrapper {
    grid-template-columns: 1fr;
  }
}

.featured-image {
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 12px;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-content {
  padding: 1rem 0;
}

.featured-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1rem 0;
  font-family: var(--font-battambang);
}

.featured-description {
  font-size: 1rem;
  color: #718096;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.magazine-nav {
  grid-column: 1 / -1;
  margin-bottom: 1rem;
}

.nav-dropdown {
  width: 100%;
  max-width: 300px;
}

.main-content {
  grid-column: 1 / 2;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.content-block {
  padding: 1rem 0;
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
}

.block-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  font-family: var(--font-battambang);
}

.view-all-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.view-all-link:hover {
  text-decoration: underline;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.item-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.item-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.sidebar {
  grid-column: 2 / 3;
  grid-row: 2 / -1;
}

.sidebar-widget {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  position: sticky;
  top: 2rem;
}

.widget-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 1rem 0;
  font-family: var(--font-battambang);
}

.latest-news-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.news-item {
  display: flex;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
}

.news-item:hover {
  opacity: 0.8;
}

.news-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.news-info {
  flex: 1;
  min-width: 0;
}

.news-info h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.news-date {
  font-size: 0.75rem;
  color: #a0aec0;
  margin: 0;
}
</style>
