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
        :domain-id="domainId"
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
import type { ContentSection } from '~/types'
import { useDesignStore } from '~/stores/design'
import { menuIdToPageKey } from '~/utils/designerSections'
import { toNumericId } from '~/utils/numericId'
import DesignerPage from '~/components/public/DesignerPage.vue'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const { public: { apiBaseUrl } } = useRuntimeConfig()
const domainStore = useDomainStore()
const designStore = useDesignStore()

const domainId = toNumericId(route.params.domainId)
const contentId = toNumericId(route.params.contentId)
// Non-numeric IDs (e.g. /pages/abc/1) → reject locally, never hit the API
if (domainId === null || contentId === null) {
  throw createError({ statusCode: 404, statusMessage: 'Content Not Found', fatal: true })
}

// ---- DESIGN vs DEFAULT resolution ------------------------------------------
// DESIGN badge in the Pages panel = page_style 4 AND this page (keyed by its
// menu item_id, which is what the route receives as contentId) has at least one
// designed section. Anything else falls back to the DEFAULT content renderer.
const pageKey = computed(() => menuIdToPageKey(contentId))
const designedSections = computed(() => designStore.design?.pages?.[pageKey.value]?.sections ?? [])
const isDesignerMode = computed(() => Number(domainStore.settings?.page_style) === 4)
const useDesignerForThisPage = computed(() => isDesignerMode.value && designedSections.value.length > 0)

// Resolve the domain up front (SSR-aware) so settings/page_style — and the 404
// decision below — are correct on the server too. Runs before the layout's
// onMounted; idempotent when the domain is already loaded (client navigation).
if (!domainStore.domain) {
  domainStore.hydrateFromServer()
  try { await domainStore.resolveDomain(domainId) } catch { /* ignore */ }
}

// Fetch content section (used by the DEFAULT path; harmless when DESIGN renders).
const { data: contentSection, pending: loading, error: fetchError } = await useAsyncData(
  `content-${domainId}-${contentId}`,
  async () => {
    try {
      const res = await $fetch<any>(`${apiBaseUrl}/site/pages/${domainId}/${contentId}`)
      if (res?.status !== false && res?.data) {
        // Handle both { content: ... } and raw content formats
        const raw = res.data.content || res.data
        return {
          content: raw,
          items: raw.items || [],
        } as ContentSection
      }
    } catch (e: any) {
      if (e?.statusCode === 404 || e?.status === 404) return null // no such content — 404 below
      throw e // real failure (API down, network, 5xx) — soft-fail via the error ref
    }
    return null // API responded but has no data — treat as not found
  }
)

// Real fetch failure: log it and keep the soft in-page state (fetchError set →
// skip the 404 throw) so a flaky API can't hard-404 real pages.
if (fetchError.value) console.error('Failed to fetch content:', fetchError.value)

// Definitive "does not exist" → real 404 for the visitor (SEO-correct). Designer
// sites (page_style 4) are exempt: a designed page renders from the design store
// and may legitimately have no content record.
if (!contentSection.value && !fetchError.value && !isDesignerMode.value) {
  throw createError({ statusCode: 404, statusMessage: 'Content Not Found', fatal: true })
}

onMounted(async () => {
  // loadPublicDesign() needs siteDesign from the resolved domain above (child
  // onMounted runs before the layout's) or it would seed an empty design.
  if (!designStore.design) {
    try { await designStore.loadPublicDesign(domainId) } catch { /* ignore */ }
  }
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
