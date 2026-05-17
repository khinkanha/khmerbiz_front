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

// Parse news item: description may be JSON {title, shortdes, longdes, photo, publish}
const parseNewsItem = (item: any) => {
  if (!item.description || typeof item.description !== 'string') return item
  try {
    const parsed = JSON.parse(item.description)
    return {
      ...item,
      title: parsed.title || item.title || '',
      short_description: parsed.shortdes || item.short_description || '',
      description: parsed.longdes || parsed.longdescription || item.description,
      photo: parsed.photo || item.photo || null,
      publish_date: parsed.publish || parsed.publish_date || item.publish_date || null,
    }
  } catch {
    return item
  }
}

const parseNews = (news: any[]) => news.map(parseNewsItem)

const mapSection = (s: any): ContentSection => ({
  content: {
    ...s.content,
    news: parseNews(s.content.newsItems || s.content.news || []),
    items: s.content.items || [],
  },
  items: s.content.items || [],
  news: parseNews(s.content.newsItems || s.content.news || []),
})

// Find the first leaf menu item (prefer childless root, else first child)
const getFirstMenuId = (): number | null => {
  const tree = domainStore.menuTree
  if (!tree.length) return null
  const first = tree[0]
  if (first.children?.length) return first.children[0].item_id
  return first.item_id
}

onMounted(async () => {
  if (!domainStore.domain) {
    await domainStore.resolveDomain()
  }

  // For non-ClassicMultiPage themes, fetch home content
  if (domainStore.settings && domainStore.settings.page_style !== 0) {
    const response = await api.get<any[]>(`/site/home?domain_id=${domainStore.domain.domain_id}`)
    if (response.success && response.data) {
      const items = Array.isArray(response.data) ? response.data : [response.data]
      // Extract menus as menuTree
      homeMenuTree.value = items.map((s: any) => s.menu)
      // Map API { menu, content } to ContentSection { content, items, news }
      contentSections.value = items
        .filter((s: any) => s.content)
        .map(mapSection)
    }
  } else if (domainStore.settings) {
    const domainId = domainStore.domain?.domain_id
    if (domainId) {
      // Collect all menu item IDs (including children) for ClassicMultiPage
      const allMenuIds: number[] = []
      const collectIds = (items: readonly any[]) => {
        for (const item of items) {
          allMenuIds.push(item.item_id)
          if (item.children?.length) collectIds(item.children)
        }
      }
      collectIds(domainStore.menuTree)

      // Fetch content for each menu item in parallel
      const results = await Promise.all(
        allMenuIds.map(menuId =>
          api.get<any[]>(`/site/pages/${domainId}/${menuId}`)
            .then(res => res.success && res.data ? res.data : null)
            .catch(() => null)
        )
      )

      const sections: ContentSection[] = []
      for (const data of results) {
        if (!data) continue
        const items = Array.isArray(data) ? data : [data]
        for (const s of items) {
          if (!s.content) continue
          sections.push(mapSection(s))
        }
      }
      contentSections.value = sections
    }
  }

  // Fallback: if no content loaded, fetch the first menu item's content
  if (contentSections.value.length === 0) {
    const domainId = domainStore.domain?.domain_id
    const firstMenuId = getFirstMenuId()
    if (domainId && firstMenuId) {
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
