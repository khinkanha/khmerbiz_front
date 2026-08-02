<template>
  <div class="lang2">
    <div v-for="lang in domainStore.languages" :key="lang.lang_id">

      <Button @click="() => setLanguage(lang.lang_id)" class="language-button" text
        :class="lang.lang_id === currentLanguage.lang_id ? 'active-language' : ''"> <img
          :src="`/flag/${flagMap(lang.flag)}`" :alt="lang.lang_name" class="flag-icon" /></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import { useDomainStore } from '~/stores/domain'

defineProps<{
  dark?: boolean
}>()

const domainStore = useDomainStore()
const { locale, setLocaleCookie } = useI18n()
const menuRef = ref()

const currentLanguage = computed(() => domainStore.currentLanguage)

const flagMap = (flag: number) => {
  const flags: Record<number, string> = {
    0: 'kh.svg',
    1: 'en.svg',
    2: 'ch.svg',
    3: 'th.svg',
    4: 'vn.svg',
    5: 'fr.svg',
  }
  return flags[flag] || 'kh.svg'
}

const languageMenuItems = computed((): MenuItem[] => {
  return domainStore.languages.map(lang => ({
    label: lang.lang_name,
    command: () => setLanguage(lang.lang_id),
  }))
})

const toggleMenu = (event: Event) => {
  menuRef.value?.toggle(event)
}

const flagToLocale: Record<number, string> = {
  0: 'kh',
  1: 'en',
  2: 'ch',
  3: 'th',
  4: 'vn',
  5: 'fr',
}

const setLanguage = async (langId: number) => {
  const lang = domainStore.languages.find(l => l.lang_id === langId)
  if (lang) {
    const code = lang.lang_code || flagToLocale[lang.flag]
    if (code) {
      locale.value = code
      setLocaleCookie(code)
    }
  }
  await domainStore.setLanguage(langId)
  navigateTo('/')
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

.active-language {
  .flag-icon {
    width: 22px;
    height: 17px;

  }

}

.lang2 {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

}
</style>
