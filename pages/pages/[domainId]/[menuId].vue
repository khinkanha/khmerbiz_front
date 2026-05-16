<template>
  <div class="page-content">
    <div class="container">
      <div v-if="loading" class="loading-state">
        <ProgressSpinner />
        <p>{{ $t('common.loading') }}</p>
      </div>

      <template v-else-if="contentSection">
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">{{ menuItemName }}</h2>
          </div>

          <NewsSection
            v-if="contentSection.content.content_type === ContentType.NEWS"
            :items="contentSection.news"
            :domain-id="Number(domainId)"
            :content-id="contentSection.content.content_id"
          />
          <PhotoGallery
            v-else-if="contentSection.content.content_type === ContentType.PHOTO"
            :items="contentSection.items"
          />
          <VideoSection
            v-else-if="contentSection.content.content_type === ContentType.VIDEO"
            :items="contentSection.items"
          />
          <MapDisplay
            v-else-if="contentSection.content.content_type === ContentType.MAP"
            :map-data="parseMapData(contentSection.content)"
          />
          <DocumentSection
            v-else-if="contentSection.content.content_type === ContentType.DOCUMENT"
            :items="contentSection.items"
          />
          <ArticleSection
            v-else
            :content="contentSection.content"
            :show-title="true"
          />
        </section>
      </template>

      <div v-else class="empty-state">
        <p>{{ $t('common.noContent') || 'No content available' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentSection } from '~/types'
import { ContentType } from '~/types'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const api = useApi()
const domainStore = useDomainStore()

const domainId = route.params.domainId as string
const menuId = route.params.menuId as string

const loading = ref(true)
const contentSection = ref<ContentSection | null>(null)
const menuItemName = ref('')

// Parse news item: description may be JSON {title, shortdes, longdes, photo, publish}
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

onMounted(async () => {
  if (!domainStore.domain) {
    await domainStore.resolveDomain()
  }

  // Find menu item name from the menu tree
  const findMenuItem = (items: readonly any[]): any => {
    for (const item of items) {
      if (String(item.item_id) === menuId) return item
      if (item.children?.length) {
        const found = findMenuItem(item.children)
        if (found) return found
      }
    }
    return null
  }
  const menuItem = findMenuItem(domainStore.menuTree)
  menuItemName.value = menuItem?.item_name || ''

  // Fetch content from API
  try {
    const response = await api.get<any>(`/site/pages/${domainId}/${menuId}`)
    if (response.success && response.data) {
      const data = response.data
      const raw = data.content || data
      const news = (raw.newsItems || raw.news || []).map(parseNewsItem)
      contentSection.value = {
        content: {
          ...raw,
          news,
          items: raw.items || [],
        },
        items: raw.items || [],
        news,
      }
    }
  } catch (e) {
    console.error('Failed to fetch page content:', e)
  } finally {
    loading.value = false
  }
})

interface MapData {
  lat?: number
  lng?: number
  zoom?: number
  marker?: string
}

const parseMapData = (content: any): MapData => {
  try {
    return JSON.parse(content.description || '{}')
  } catch {
    return {}
  }
}

useHead({
  title: menuItemName.value || 'Page',
})
</script>

<style scoped>
.page-content {
  min-height: 60vh;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

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

.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: #718096;
}
</style>
