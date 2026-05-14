<template>
  <component :is="themeComponent" v-if="themeComponent" />
  <div v-else class="loading">
    <ProgressSpinner />
  </div>
</template>

<script setup lang="ts">
import { useDomainStore } from '~/stores/domain'

definePageMeta({
  layout: 'default',
})

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
  if (!domainStore.domain) {
    await domainStore.resolveDomain()
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
