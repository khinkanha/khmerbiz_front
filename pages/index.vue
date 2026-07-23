<template>
  <!-- Under Construction: domain has no menus/content -->
  <div v-if="showUnderConstruction" class="under-construction">
    <div class="uc-content">
      <div class="uc-icon">
        <i class="pi pi-building"></i>
      </div>
      <h1 class="uc-title">{{ domainStore.settings?.title || domainStore.domain?.domain_name || 'Our Website' }}</h1>
      <div class="uc-divider"></div>
      <p class="uc-text">Our website is currently under construction.</p>
      <p class="uc-subtext">We're working hard to bring you an amazing experience. Please check back soon!</p>
    </div>
  </div>

  <!-- Normal theme rendering -->
  <component v-else-if="themeComponent" :is="themeComponent"
    :menu-tree="homeMenuTree.length ? homeMenuTree : domainStore.menuTree" :content-sections="contentSections"
    :banners="domainStore.banners" :settings="domainStore.settings" :domain="domainStore.domain"
    :social-media="domainStore.socialMedia" :language="domainStore.currentLanguage" />
  <div v-else class="loading">
    <ProgressSpinner />
  </div>
</template>

<script setup lang="ts">
import { useDomainStore } from '~/stores/domain'
import type { ContentSection } from '~/types'
import ClassicMultiPage from '~/components/public/themes/ClassicMultiPage.vue'
import ScrollingSinglePage from '~/components/public/themes/ScrollingSinglePage.vue'
import MagazineGrid from '~/components/public/themes/MagazineGrid.vue'
import FullscreenHero from '~/components/public/themes/FullscreenHero.vue'

definePageMeta({
  layout: 'default',
})

const domainStore = useDomainStore()
const api = useApi()

const isLoading = ref(true)
const hasNoContent = ref(false)
const showUnderConstruction = computed(() => {
  if (isLoading.value) return false
  return hasNoContent.value
})

const themeMap: Record<string, any> = {
  ClassicMultiPage,
  ScrollingSinglePage,
  MagazineGrid,
  FullscreenHero,
}

const themeComponent = computed(() => {
  if (domainStore.settings) {
    const styles: Record<number, string> = {
      0: 'ClassicMultiPage',
      1: 'ScrollingSinglePage',
      2: 'MagazineGrid',
      3: 'FullscreenHero',
    }
    const name = styles[domainStore.settings.page_style] || 'ClassicMultiPage'
    return themeMap[name]
  }
  return null
})

const contentSections = ref<ContentSection[]>([])
const homeMenuTree = ref([])

const mapSection = (s: any): ContentSection => ({
  content: {
    ...s.content,
    items: s.content.items || [],
  },
  items: s.content.items || [],
})

// Find the first leaf menu item (prefer childless root, else first child)
const getFirstMenuId = (): number | null => {
  const tree = domainStore.menuTree
  if (!tree.length) return null
  const first = tree[0]
  if (first.children?.length) return first.children[0].item_id
  return first.item_id
}

const loadContent = async () => {
  const domainId = domainStore.domain?.domain_id
  if (!domainId) return

  // For non-ClassicMultiPage themes, fetch home content
  if (domainStore.settings && domainStore.settings.page_style !== 0) {
    const response = await api.get<any[]>(`/site/home?domain_id=${domainId}`)
    if (response.success && response.data) {
      const items = Array.isArray(response.data) ? response.data : [response.data]
      homeMenuTree.value = items.map((s: any) => s.menu)
      contentSections.value = items
        .filter((s: any) => s.content)
        .map(mapSection)
    }
  } else if (domainStore.settings) {
    // Collect all menu item IDs (including children) for ClassicMultiPage
    const allMenuIds: number[] = []
    const collectIds = (items: readonly any[]) => {
      for (const item of items) {
        allMenuIds.push(item.item_id)
        if (item.children?.length) collectIds(item.children)
      }
    }
    collectIds(domainStore.menuTree)

    // Fetch in batches of 4 to avoid overwhelming the browser/network
    const batchSize = 4
    const sections: ContentSection[] = []

    for (let i = 0; i < allMenuIds.length; i += batchSize) {
      const batch = allMenuIds.slice(i, i + batchSize)
      const results = await Promise.all(
        batch.map(menuId =>
          api.get<any[]>(`/site/pages/${domainId}/${menuId}`)
            .then(res => res.success && res.data ? res.data : null)
            .catch(() => null)
        )
      )
      for (const data of results) {
        if (!data) continue
        const items = Array.isArray(data) ? data : [data]
        for (const s of items) {
          // getSitePage returns raw content objects; getSiteHome returns { menu, content } sections
          const section = s.content !== undefined ? s : { content: s }
          if (!section.content) continue
          sections.push(mapSection(section))
        }
      }
    }
    contentSections.value = sections
  
  }

  // Fallback: if no content loaded, fetch the first menu item's content
  if (contentSections.value.length === 0) {
    const firstMenuId = getFirstMenuId()
    if (firstMenuId) {
      try {
        const response = await api.get<any>(`/site/pages/${domainId}/${firstMenuId}`)
        if (response.success && response.data) {
          const raw = response.data.content || response.data
          contentSections.value = [mapSection({ content: raw })]
        }
      } catch {
        // Silently fail
      }
    }
  }
}

onMounted(async () => {
  if (!domainStore.domain) {
    domainStore.hydrateFromServer()
    await domainStore.resolveDomain()
  }
  await loadContent()

  // Only show under construction if domain exists but has NO menus at all
  hasNoContent.value = domainStore.menuTree.length === 0
  isLoading.value = false
})

watch(() => domainStore.currentLanguage, async (newLang, oldLang) => {
  if (newLang?.lang_id !== oldLang?.lang_id) {
    await loadContent()
  }
})

useHead({
  title: 'Home',
})
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.under-construction {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
}

.uc-content {
  text-align: center;
  max-width: 500px;
}

.uc-icon {
  font-size: 4rem;
  color: #94a3b8;
  margin-bottom: 1.5rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.uc-title {
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 800;
  color: #1a202c;
  margin: 0 0 1rem;
  font-family: var(--font-battambang);
}

.uc-divider {
  width: 60px;
  height: 4px;
  background: var(--primary-color, #3b82f6);
  border-radius: 2px;
  margin: 0 auto 1.5rem;
}

.uc-text {
  font-size: 1.15rem;
  color: #4a5568;
  margin: 0 0 0.5rem;
}

.uc-subtext {
  font-size: 0.95rem;
  color: #94a3b8;
  margin: 0;
}
</style>
