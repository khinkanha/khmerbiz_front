<template>
  <div class="content-page">
    <div v-if="loading" class="loading-state">
      <ProgressSpinner />
    </div>

    <div v-else-if="contentSection" class="content-container">
      <!-- Render content based on type -->
      <ContentRenderer
        :content="contentSection.content"
        :domain-id="parseInt(domainId)"
        :show-title="true"
      />
    </div>

    <div v-else class="empty-state">
      <i class="pi pi-exclamation-circle"></i>
      <p>Content not found</p>
      <NuxtLink to="/" class="back-link">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ContentType } from '~/types'
import type { ContentSection } from '~/types'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const domainStore = useDomainStore()
const api = useApi()

const domainId = route.params.domainId as string
const contentId = route.params.contentId as string

const loading = ref(true)
const contentSection = ref<ContentSection | null>(null)

// Fetch content section
const fetchContent = async () => {
  loading.value = true
  try {
    const response = await api.get<any>(`/site/pages/${domainId}/${contentId}`)
    if (response.success && response.data) {
      const data = response.data
      // Handle both { content: ... } and raw content formats
      const raw = data.content || data
      contentSection.value = {
        content: raw,
        items: raw.items || [],
      }
    }
  } catch (e) {
    console.error('Failed to fetch content:', e)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (!domainStore.domain) {
    domainStore.hydrateFromServer()
    await domainStore.resolveDomain()
  }
  await fetchContent()
})

// SEO
useHead(() => ({
  title: contentSection.value?.content?.title || 'Content',
  meta: contentSection.value?.content?.description
    ? [{ name: 'description', content: contentSection.value.content.description }]
    : [],
}))
</script>

<style scoped>
.content-page {
  min-height: 60vh;
  background-color: #fff;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 4rem 0;
  color: #718096;
}

.empty-state i {
  font-size: 2.5rem;
}

.back-link {
  color: var(--primary-color, #3b82f6);
  text-decoration: none;
  margin-top: 1rem;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
