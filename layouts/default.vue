<template>
  <div class="public-layout" :class="themeClass">
    <PublicHeader />
    <main class="main-content">
      <slot />
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">

const domainStore = useDomainStore()
const { getThemeClass } = useTheme()

const themeClass = computed(() => {
  if (domainStore.settings) {
    return getThemeClass(domainStore.settings.theme)
  }
  return 'theme-default'
})

onMounted(async () => {
  if (!domainStore.domain) {
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
