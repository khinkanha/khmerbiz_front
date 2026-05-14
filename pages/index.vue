<template>
  <component
    v-if="themeComponent"
    :is="themeComponent"
    :menu-tree="homeMenuTree.length ? homeMenuTree : domainStore.menuTree"
    :content-sections="contentSections"
    :banners="domainStore.banners"
    :settings="domainStore.settings"
    :domain="domainStore.domain"
    :social-media="domainStore.socialMedia"
    :language="domainStore.currentLanguage"
  />
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
        .map((s: any) => ({
          content: {
            ...s.content,
            news: s.content.newsItems || s.content.news || [],
            items: s.content.items || [],
          },
          items: s.content.items || [],
          news: s.content.newsItems || s.content.news || [],
        }))
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
