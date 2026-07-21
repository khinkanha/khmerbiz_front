<template>
  <div class="page-content">
    <div class="container">
      <div v-if="loading" class="loading-state">
        <ProgressSpinner />
        <p>{{ $t('common.loading') }}</p>
      </div>
      <template v-else-if="contentSection">
        <section class="section">
          <NewsSection v-if="contentSection.content.content_type === ContentType.NEWS" :items="contentSection.news"
            :domain-id="Number(domainId)" :content-id="contentSection.content.content_id"
            :section-description="contentSection.content.description" />
          <PhotoGallery v-else-if="contentSection.content.content_type === ContentType.PHOTO"
            :items="contentSection.items"
            :section-description="contentSection.content.description" />
          <VideoSection v-else-if="contentSection.content.content_type === ContentType.VIDEO"
            :items="contentSection.items"
            :section-description="contentSection.content.description" />
          <MapDisplay v-else-if="contentSection.content.content_type === ContentType.MAP"
            :map-data="parseMapData(contentSection.content)"
            :section-description="contentSection.content.description" />
          <DocumentSection v-else-if="contentSection.content.content_type === ContentType.DOCUMENT"
            :items="contentSection.items"
            :section-description="contentSection.content.description" />
          <ProductCatalog v-else-if="contentSection.content.content_type === ContentType.PRODUCT"
            :content-id="contentSection.content.content_id" :section-title="contentSection.content.title"
            :section-description="contentSection.content.description" />
          <ArticleSection v-else :content="contentSection.content" :show-title="true" />
        </section>
      </template>

      <div v-else class="empty-state">
        <p>{{ $t('common.noContent') || 'No content available' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

import type { ContentSection } from '~/types'
import { ContentType } from '~/types'
import { useDomainStore } from '~/stores/domain'
import { useSeo } from '~/composables/useSeo'

const route = useRoute()
const { public: { apiBaseUrl } } = useRuntimeConfig()
const domainStore = useDomainStore()
const { setForContent } = useSeo()

const domainId = route.params.domainId as string
const menuId = route.params.menuId as string

// SSR-aware fetch; refetch when the site language changes.
const { data: contentSection, pending: loading } = await useAsyncData(
  `page-${domainId}-${menuId}`,
  async () => {
    try {
      const res = await $fetch<any>(`${apiBaseUrl}/site/pages/${domainId}/${menuId}`)
      if (res?.status === false || !res?.data) return null
      const raw = res.data.content || res.data
      return {
        content: {
          ...raw,
          items: raw.items || [],
        },
        items: raw.items || [],
      } as ContentSection
    } catch (e) {
      console.error('Failed to fetch page content:', e)
      return null
    }
  },
  { watch: [() => domainStore.currentLanguage] }
)

// Article-only SEO (no SEO for photo/video/document/map/news-listing — they
// fall back to the layout's site-wide title).
watchEffect(() => {
  const c = contentSection.value?.content
  if (c && c.content_type === ContentType.ARTICLE) {
    setForContent(domainStore.settings, c, contentSection.value?.items?.[0] ?? null)
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
  font-size: 0.85rem;
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
