<template>
  <div class="content-renderer">
    <ArticleSection
      v-if="content && content.content_type === ContentType.ARTICLE"
      :content="content"
      :show-title="showTitle"
    />
    <PhotoGallery
      v-else-if="content && content.content_type === ContentType.PHOTO"
      :items="content.items || []"
      :section-title="showTitle ? content.title : ''"
    />
    <VideoSection
      v-else-if="content && content.content_type === ContentType.VIDEO"
      :items="content.items || []"
      :section-title="showTitle ? content.title : ''"
    />
    <DocumentSection
      v-else-if="content && content.content_type === ContentType.DOCUMENT"
      :items="content.items || []"
      :section-title="showTitle ? content.title : ''"
    />
    <NewsSection
      v-else-if="content && content.content_type === ContentType.NEWS"
      :items="content.news || []"
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
import type { Content, ContentSection } from '~/types'
import { ContentType } from '~/types'

interface Props {
  content: Content | ContentSection
  domainId: number
  showTitle?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
  compact: false,
})

const contentData = computed(() => {
  if ('content' in props.content) {
    return props.content.content
  }
  return props.content
})

const content = computed(() => contentData.value)

const mapData = ref<{ lat: number; lng: number; zoom: number; marker?: string } | null>(null)

// Load map data if content type is MAP
onMounted(async () => {
  if (content.value?.content_type === ContentType.MAP) {
    // TODO: Fetch map data from API
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
