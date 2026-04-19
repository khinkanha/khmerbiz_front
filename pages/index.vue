<template>
  <div class="home-page">
    <PublicHeader />
    <main class="main-content">
      <component :is="themeComponent" v-if="themeComponent" />
      <div v-else class="loading">
        <ProgressSpinner />
      </div>
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import { useDomainStore } from '~/stores'
import { useTheme } from '~/composables'

const domainStore = useDomainStore()
const { resolveThemeComponent } = useTheme()

const themeComponent = computed(() => {
  if (domainStore.settings) {
    const componentName = resolveThemeComponent(domainStore.settings.page_style)
    return resolveComponent(componentName)
  }
  return null
})

onMounted(async () => {
  await domainStore.resolveDomain()
})

useHead({
  title: 'Home',
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}
</style>
