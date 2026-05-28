<template>
  <component v-if="themeComponent" :is="themeComponent"
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
</style>
