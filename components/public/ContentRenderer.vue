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
      v-else-if="content && content.content_type === ContentType.NEWS"
      :domain-id="domainId"
      :content-id="content.content_id"
      :section-title="showTitle ? content.title : ''"
      :show-more-link="true"
    />
    <MapDisplay
      v-else-if="content && content.content_type === ContentType.MAP"
      :map-data="mapData || {}"
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

const mapData = ref<{ lat: number; lng: number; zoom: number; marker?: string } | null>(null)

onMounted(async () => {
  if (content.value?.content_type === ContentType.MAP) {
    mapData.value = {
      lat: 11.5564,
      lng: 104.9282,
      zoom: 13,
      marker: content.value.title,
    }
  }
})
</script>

<style scoped>
.content-renderer {
  width: 100%;
}
</style>
