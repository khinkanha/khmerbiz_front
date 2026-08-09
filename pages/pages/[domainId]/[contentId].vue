<template>
  <!--
    Handles every /pages/:domainId/:id URL. Two render modes, matching the
    admin Pages panel badges:
      • DESIGN   — page_style === 4 AND this page has designed sections → DesignerPage
      • DEFAULT  — otherwise → original content renderer (ContentRenderer)
    The route param (:id) is the menu item_id, which is also the key the design
    store uses under design.pages.
  -->
  <div class="page-content">
    <!-- DESIGN: composed in the Site Designer -->
    <DesignerPage
      v-if="useDesignerForThisPage"
      :sections="designedSections"
      :content-sections="contentSection ? [contentSection] : []"
    />

    <!-- DEFAULT: original content rendering -->
    <div v-else-if="loading" class="loading-state">
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
import { useDesignStore } from '~/stores/design'
import { menuIdToPageKey } from '~/utils/designerSections'
import DesignerPage from '~/components/public/DesignerPage.vue'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const domainStore = useDomainStore()
const designStore = useDesignStore()
const api = useApi()

const domainId = route.params.domainId as string
const contentId = route.params.contentId as string

const loading = ref(true)
const contentSection = ref<ContentSection | null>(null)

// ---- DESIGN vs DEFAULT resolution ------------------------------------------
// DESIGN badge in the Pages panel = page_style 4 AND this page (keyed by its
// menu item_id, which is what the route receives as contentId) has at least one
// designed section. Anything else falls back to the DEFAULT content renderer.
const pageKey = computed(() => menuIdToPageKey(contentId))
const designedSections = computed(() => designStore.design?.pages?.[pageKey.value]?.sections ?? [])
const isDesignerMode = computed(() => Number(domainStore.settings?.page_style) === 4)
const useDesignerForThisPage = computed(() => isDesignerMode.value && designedSections.value.length > 0)

// Fetch content section (used by the DEFAULT path; harmless when DESIGN renders).
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
  // Resolve the domain ourselves (child onMounted runs before the layout's) so
  // loadPublicDesign() finds siteDesign instead of seeding an empty design.
  if (!domainStore.domain) {
    domainStore.hydrateFromServer()
    try { await domainStore.resolveDomain(Number(domainId)) } catch { /* ignore */ }
  }
  if (!designStore.design) {
    try { await designStore.loadPublicDesign(Number(domainId)) } catch { /* ignore */ }
  }
  // Only the DEFAULT path needs content; but it's cheap to fetch and keeps the
  // DESIGN→DEFAULT switch seamless if a design is later cleared.
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
.page-content {
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
