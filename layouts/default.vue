<template>
  <div class="public-layout" :class="themeClass">
    <PublicHeader />
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

const settings = computed(() => domainStore.settings)

const themeClass = computed(() => {
  if (domainStore.settings) {
    return getThemeClass(domainStore.settings.theme)
  }
  return 'theme-default'
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
</style>
