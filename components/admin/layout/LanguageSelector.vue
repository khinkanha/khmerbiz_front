<template>
  <div class="language-selector" :class="{ dark }">
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
      <span v-if="currentLanguage">{{ currentLanguage.lang_code?.toUpperCase() }}</span>
      <i class="pi pi-chevron-down"></i>
    </Button>

    <Menu ref="menuRef" :model="languageMenuItems" :popup="true" />
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import { useDomainStore } from '~/stores/domain'

defineProps<{
  dark?: boolean
}>()

const domainStore = useDomainStore()
const menuRef = ref()

const currentLanguage = computed(() => domainStore.currentLanguage)

const languageMenuItems = computed((): MenuItem[] => {
  return domainStore.languages.map(lang => ({
    label: lang.lang_name,
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
  gap: 0.35rem;
  color: #4a5568;
  font-size: 0.8rem;
}

.flag-icon {
  width: 18px;
  height: 13px;
  object-fit: cover;
  border-radius: 2px;
}

/* Dark mode for navbar */
.language-selector.dark .language-button {
  color: rgba(255, 255, 255, 0.75);
}

.language-selector.dark .language-button:hover {
  color: #fff;
}
</style>
