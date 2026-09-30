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
            :domain-id="domainId" :content-id="contentSection.content.content_id"
            :section-description="JSON.parse(contentSection.content.description).description" />
          <PhotoGallery v-else-if="contentSection.content.content_type === ContentType.PHOTO"
            :items="contentSection.items"
            :section-description="JSON.parse(contentSection.content.description).description" />
          <VideoSection v-else-if="contentSection.content.content_type === ContentType.VIDEO"
            :items="contentSection.items"
            :section-description="JSON.parse(contentSection.content.description).description" />
          <template v-else-if="contentSection.content.content_type === ContentType.MAP">
            <h2 v-if="contentSection.content.title" class="map-page-title">{{ contentSection.content.title }}</h2>
            <div v-if="parseMapDescription(contentSection.content)" class="map-page-desc"
              v-html="parseMapDescription(contentSection.content)"></div>
            <MapDisplay
              v-if="mapVisible(contentSection.content)"
              :map-data="parseMapData(contentSection.content)"
              :section-title="''"
              :section-description="''"
            />
          </template>
          <DocumentSection v-else-if="contentSection.content.content_type === ContentType.DOCUMENT"
            :items="contentSection.items"
            :section-description="JSON.parse(contentSection.content.description).description" />
          <ProductCatalog v-else-if="contentSection.content.content_type === ContentType.PRODUCT"
            :content-id="contentSection.content.content_id" :section-title="contentSection.content.title"
            :section-description="JSON.parse(contentSection.content.description).description" />
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
import { toNumericId } from '~/utils/numericId'

const route = useRoute()
const { public: { apiBaseUrl } } = useRuntimeConfig()
const domainStore = useDomainStore()
const { setForContent } = useSeo()

const domainId = toNumericId(route.params.domainId)
const menuId = toNumericId(route.params.menuId)
// Non-numeric IDs (e.g. /pages/abc/1) → reject locally, never hit the API
if (domainId === null || menuId === null) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}

// SSR-aware fetch; refetch when the site language changes.
const { data: contentSection, pending: loading, error: fetchError } = await useAsyncData(
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
    } catch (e: any) {
      if (e?.statusCode === 404 || e?.status === 404) return null // no such page — 404 below
      throw e // real failure (API down, network, 5xx) — soft-fail via the error ref
    }
  },
  { watch: [() => domainStore.currentLanguage] }
)

// Real fetch failure: log it and keep the soft in-page state (fetchError set →
// skip the 404 throw) so a flaky API can't hard-404 real pages.
if (fetchError.value) console.error('Failed to fetch page content:', fetchError.value)

// Definitive "does not exist" → real 404 for the visitor (SEO-correct). Only
// guards the initial load — language-change refetches keep the soft empty state.
if (!contentSection.value && !fetchError.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}

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

// Description shown above the map (plain HTML from the rich editor). The map
// JSON shape is { title, description?, lat, lng, zoom?, visible }.
const parseMapDescription = (content: any): string => {
  try {
    return JSON.parse(content.description || '{}').description || ''
  } catch {
    return ''
  }
}

// Respect the admin on/off toggle: when `visible === 0` the map is hidden.
const mapVisible = (content: any): boolean => {
  try {
    return JSON.parse(content.description || '{}').visible !== 0
  } catch {
    return true
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

.map-page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color, #1a202c);
  margin: 0 0 1rem 0;
  text-align: center;
  font-family: var(--font-battambang);
}

.map-page-desc {
  max-width: 800px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
  color: #4a5568;
}

.map-page-desc :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
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
