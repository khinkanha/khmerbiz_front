<template>
  <div class="content-renderer">
    <ArticleSection
      v-if="content && content.content_type === ContentType.ARTICLE"
      :content="content"
      :show-title="showTitle"
    />
    <PhotoGallery
      v-else-if="content && content.content_type === ContentType.PHOTO"
      :items="items"
      :section-title="showTitle ? content.title : ''"
    />
    <VideoSection
      v-else-if="content && content.content_type === ContentType.VIDEO"
      :items="items"
      :section-title="showTitle ? content.title : ''"
    />
    <DocumentSection
      v-else-if="content && content.content_type === ContentType.DOCUMENT"
      :items="items"
      :section-title="showTitle ? content.title : ''"
    />
    <NewsSection
      v-else-if="content && content.content_type === ContentType.NEWS && isClassicTemplate"
      :domain-id="domainId"
      :content-id="content.content_id"
      :section-title="showTitle ? content.title : ''"
      :show-more-link="true"
    />
    <!-- MAP content: always render title + description (so the page is never
         blank); render the map widget itself only when the toggle is ON and a
         valid pin exists. -->
    <section v-else-if="content && content.content_type === ContentType.MAP" class="map-section-render">
      <h2 v-if="showTitle" class="map-section-title">{{ content.title }}</h2>
      <div v-if="mapDescriptionHtml" class="map-section-desc" v-html="mapDescriptionHtml"></div>
      <MapDisplay
        v-if="mapData"
        :map-data="mapData"
        :section-title="''"
        :section-description="''"
      />
    </section>
    <ProductCatalog
      v-else-if="content && content.content_type === ContentType.PRODUCT"
      :content-id="content.content_id"
      :section-title="showTitle ? content.title : ''"
    />
  </div>
</template>

<script setup lang="ts">
import type { Content, ContentSection, ContentItem } from '~/types'
import { ContentType } from '~/types'

interface Props {
  content: Content | ContentSection | null
  domainId: number
  showTitle?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
  compact: false,
})

const domainStore = useDomainStore()
// Inline NewsSection is allowed on the Classic template AND in Designer mode
// (page_style 4), where each section renders independently on the page.
const isClassicTemplate = computed(() =>
  domainStore.settings?.page_style === 0 || domainStore.settings?.page_style === 4
)

const isContentSection = (val: any): val is ContentSection => {
  return val != null && 'content' in val && 'items' in val
}

const content = computed(() => {
  if (isContentSection(props.content)) {
    return props.content.content
  }
  return props.content as Content | null
})

const items = computed<ContentItem[]>(() => {
  if (isContentSection(props.content)) {
    return props.content.items || []
  }
  return (props.content as Content)?.items || []
})

// Map content: read the pinned location out of the content's JSON description
// (shape: { title, description?, lat, lng, zoom?, visible }). `title` is the
// marker popup label. The title + description always render (so a page is
// never blank); the map widget renders only when the admin toggle is ON
// (visible !== 0) AND a valid pin exists.
const mapRaw = computed<any | null>(() => {
  const c = content.value
  if (!c || c.content_type !== ContentType.MAP) return null
  try {
    return JSON.parse(c.description || '{}')
  } catch {
    return null
  }
})

// Description HTML shown above the map (rendered even when the map is toggled off).
const mapDescriptionHtml = computed(() => {
  const p = mapRaw.value
  return p && typeof p.description === 'string' ? p.description : ''
})

// Map widget data — null when toggled off (visible === 0) or no valid pin.
const mapData = computed<{ lat: number; lng: number; zoom: number; marker?: string } | null>(() => {
  const c = content.value
  const p = mapRaw.value
  if (!c || !p || p.visible === 0) return null // turned off by admin
  const lat = Number(p.lat)
  const lng = Number(p.lng)
  if (!isFinite(lat) || !isFinite(lng)) return null
  return {
    lat,
    lng,
    zoom: Number(p.zoom) || 13,
    marker: p.title || c.title,
  }
})
</script>

<style scoped>
.content-renderer {
  width: 100%;
}

.map-section-render {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 0;
}

.map-section-title {
  font-size: var(--fs-section-title);
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1rem 0;
  text-align: center;
  font-family: var(--font-battambang);
}

.map-section-desc {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #4a5568;
}

.map-section-desc :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
