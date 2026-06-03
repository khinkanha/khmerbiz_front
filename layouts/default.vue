<template>
  <div class="public-layout" :class="themeClass">
    <PublicHeader />
    <BannerSlideshow v-if="showBanner" :banners="domainStore.banners" :class="bannerPosClass" />
    <main class="main-content">
      <slot />
    </main>
    <PublicFooter />
    <!-- Custom chat/script injection (chat_script + plugin_mode) -->
    <div v-if="showPlugin && settings?.chat_script" v-html="settings.chat_script"></div>
  </div>
</template>

<script setup lang="ts">

const domainStore = useDomainStore()
const { getThemeClass } = useTheme()
const route = useRoute()

const settings = computed(() => domainStore.settings)

const themeClass = computed(() => {
  if (domainStore.settings) {
    return getThemeClass(domainStore.settings.theme)
  }
  return 'theme-default'
})

// Banner display logic — only for ClassicMultiPage style (page_style === 0):
// banner_mode: 0=off, 1=on
// banner_display: 0=homepage only, 1=all pages
// On homepage, the theme component handles banner rendering
// On other pages, show banner only when banner_display=1 AND ClassicMultiPage
const isHomePage = computed(() => route.path === '/')
const isClassicPage = computed(() => Number(settings.value?.page_style) === 0)

const showBanner = computed(() => {
  if (!isClassicPage.value) return false // only ClassicMultiPage has banner
  if (isHomePage.value) return false // homepage theme handles its own banners
  const bannerMode = Number(settings.value?.banner_mode) !== 0
  const bannerDisplayAll = Number(settings.value?.banner_display) === 1
  if (!bannerMode) return false
  if (!bannerDisplayAll) return false
  if (domainStore.banners.length === 0) return false
  return true
})

// banner_position: 1=Top, 2=Middle, 3=Bottom
const bannerPosClass = computed(() => {
  const pos = Number(settings.value?.banner_pos) || 1
  if (pos === 2) return 'banner-pos-middle'
  if (pos === 3) return 'banner-pos-bottom'
  return ''
})

// plugin_mode: 0=off, 1=on
const showPlugin = computed(() => Number(settings.value?.plugin_mode) === 1)

onMounted(async () => {
  if (!domainStore.domain) {
    domainStore.hydrateFromServer()
    await domainStore.resolveDomain()
  }
})
</script>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.banner-pos-middle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.banner-pos-bottom {
  order: 999;
}
</style>
