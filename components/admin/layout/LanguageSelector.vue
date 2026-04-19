<template>
  <div class="language-selector">
    <Button
      @click="toggleMenu"
      class="language-button"
      text
    >
      <img
        v-if="currentLanguage"
        :src="`/flag/${currentLanguage.flag_icon}`"
        :alt="currentLanguage.lang_name"
        class="flag-icon"
      />
      <span v-if="currentLanguage">{{ currentLanguage.lang_name }}</span>
      <i class="pi pi-chevron-down"></i>
    </Button>

    <Menu ref="menuRef" :model="languageMenuItems" :popup="true" />
  </div>
</template>

<script setup lang="ts">
import { useDomainStore } from '~/stores'

const domainStore = useDomainStore()
const menuRef = ref()

const currentLanguage = computed(() => domainStore.currentLanguage)

const languageMenuItems = computed(() => {
  return domainStore.languages.map(lang => ({
    label: lang.lang_name,
    icon: () => h('img', {
      src: `/flag/${lang.flag_icon}`,
      alt: lang.lang_name,
      class: 'flag-icon',
    }),
    command: () => setLanguage(lang.lang_id),
  }))
})

const toggleMenu = (event: Event) => {
  menuRef.value?.toggle(event)
}

const setLanguage = async (langId: number) => {
  await domainStore.setLanguage(langId)
}
</script>

<style scoped>
.language-selector {
  display: flex;
  align-items: center;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.875rem;
}

.flag-icon {
  width: 20px;
  height: 14px;
  object-fit: cover;
  border-radius: 2px;
}
</style>
