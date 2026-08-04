<template>
  <!-- Full-screen loader until the domain has fully resolved on the client
       (config + menu). Holding the loader until `resolved` is true avoids flashing
       the default theme and prevents the page from mounting before its menu is ready. -->
  <div v-if="!isReady" class="app-loading">
    <ProgressSpinner />
  </div>

  <div v-else class="public-layout" :class="themeClass" :style="designStyleVars">
    <DesignerHeader v-if="isDesignerMode" />
    <PublicHeader v-else />
    <BannerSlideshow v-if="showBanner" :banners="domainStore.banners" :class="bannerPosClass" />
    <main class="main-content">
      <slot />
    </main>
    <DesignerFooter v-if="isDesignerMode" />
    <PublicFooter v-else />
    <!-- Custom chat/script injection (chat_script + plugin_mode) -->
    <div v-if="showPlugin && settings?.chat_script" v-html="settings.chat_script"></div>
  </div>
</template>

<script setup lang="ts">
import { designTokensToCssVars } from '~/types/design'

const domainStore = useDomainStore()
const designStore = useDesignStore()
const { getThemeClass } = useTheme()
const route = useRoute()

const settings = computed(() => domainStore.settings)

// Site Designer style tokens -> CSS custom properties on .public-layout.
// Overrides the theme tokens reactively once a design is loaded.
const designStyleVars = computed(() => designTokensToCssVars(designStore.design?.style))

// The themed shell renders only after the domain has fully resolved on the client
// (config + menu). Gating on `resolved` (not just `settings`) ensures the menu tree
// is loaded before the page mounts, so the homepage doesn't misread an empty
// (still-loading) menu as "under construction".
const isReady = computed(() => domainStore.resolved)

const themeClass = computed(() => {
  if (domainStore.settings) {
    return getThemeClass(domainStore.settings.theme)
  }
  return 'theme-default'
})
const { setFromSetting } = useSeo()

// Browser-tab title for the public site — always the website title from Settings.
// Uses titleTemplate (not title) so it overrides any page-level title set by
// individual pages (Home, article, news, products). Scoped to this public layout
// only — the admin/member layouts are unaffected.
useHead({
  titleTemplate: () => domainStore.settings?.title || '',
})

// Banner display logic — only for ClassicMultiPage style (page_style === 0):
// banner_mode: 0=off, 1=on
// banner_display: 0=homepage only, 1=all pages
// On homepage, the theme component handles banner rendering
// On other pages, show banner only when banner_display=1 AND ClassicMultiPage
const isHomePage = computed(() => route.path === '/')
const isClassicPage = computed(() => Number(settings.value?.page_style) === 0)

// Site Designer mode (page_style === 4): use the composed header/footer.
const isDesignerMode = computed(() => Number(settings.value?.page_style) === 4)

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

  domainStore.hydrateFromServer()
  designStore.hydrateFromServer()       // zero-flash once the backend ships design
  await domainStore.resolveDomain()
  await designStore.loadPublicDesign()  // dev fallback / lazy seed from current theme
  setFromSetting(domainStore.settings)
})
</script>

<style scoped>
.app-loading {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

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

<style>
/* Site Designer token consumers (global, scoped to the public-layout subtree).
   Color vars (--primary-color, --nav-bg, …) are consumed by the existing theme
   CSS in assets/css/themes/*. The --kb-* vars are new and consumed here. */
.public-layout {
  font-family: var(--kb-body-font, inherit);
}

.public-layout h1,
.public-layout h2,
.public-layout h3,
.public-layout h4 {
  font-family: var(--kb-heading-font, inherit);
}

.public-layout .card,
.public-layout .kb-card,
.public-layout .kb-image,
.public-layout .kb-button,
.public-layout .kb-video,
.public-layout .kb-gallery img {
  border-radius: var(--kb-radius, 10px);
}
</style>
