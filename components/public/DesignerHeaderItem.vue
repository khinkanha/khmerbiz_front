<template>
  <!-- LOGO -->
  <a v-if="item.type === 'logo'" class="dhi-logo" href="/" @click.prevent="$emit('home')">
    <img v-if="logoSrc && !err" :src="logoSrc" :alt="titleText" @error="err = true" />
    <span v-else class="dhi-logo-text">{{ titleText }}</span>
  </a>

  <!-- MENU -->
  <nav v-else-if="item.type === 'menu'" class="dhi-menu" :class="{ mobile }">
    <div v-for="m in menuTree" :key="m.item_id" class="dhi-menu-item">
      <NuxtLink :to="`/pages/${domainId}/${m.item_id}`" class="dhi-menu-link" @click="$emit('navigate')">{{ m.item_name }}</NuxtLink>
      <!-- mobile: expand children inline -->
      <template v-if="mobile && m.children?.length">
        <NuxtLink v-for="c in m.children" :key="c.item_id" :to="`/pages/${domainId}/${c.item_id}`" class="dhi-sublink" @click="$emit('navigate')">{{ c.item_name }}</NuxtLink>
      </template>
      <!-- desktop: hover dropdown -->
      <div v-else-if="m.children?.length" class="dhi-dropdown">
        <NuxtLink v-for="c in m.children" :key="c.item_id" :to="`/pages/${domainId}/${c.item_id}`" class="dhi-dropdown-link" @click="$emit('navigate')">{{ c.item_name }}</NuxtLink>
      </div>
    </div>
  </nav>

  <!-- SOCIAL -->
  <div v-else-if="item.type === 'social'" class="dhi-social">
    <a v-for="s in socialMedia" :key="s.smid" :href="s.link" target="_blank" rel="noopener" class="dhi-social-link">
      <i :class="getSocialIcon(s.stype)" />
    </a>
  </div>

  <!-- LANGUAGE -->
  <select v-else-if="item.type === 'language'" class="dhi-lang" :value="currentLangId" @change="$emit('lang', Number(($event.target as HTMLSelectElement).value))">
    <option v-for="l in languages" :key="l.lang_id" :value="l.lang_id">{{ l.lang_name }}</option>
  </select>

  <!-- TEXT -->
  <span v-else-if="item.type === 'text'" class="dhi-text">{{ item.payload?.text }}</span>

  <!-- IMAGE -->
  <img v-else-if="item.type === 'image' && item.payload?.url" class="dhi-image" :src="item.payload.url" :alt="item.payload?.alt || ''" />
</template>

<script setup lang="ts">
import { useDomainStore } from '~/stores/domain'
import { getSocialIcon } from '~/types'
import type { RegionItem } from '~/types'

const props = defineProps<{ item: RegionItem; mobile?: boolean }>()
defineEmits<{ navigate: []; lang: [number]; home: [] }>()

const domainStore = useDomainStore()
const menuTree = computed(() => domainStore.menuTree)
const socialMedia = computed(() => domainStore.socialMedia)
const languages = computed(() => domainStore.languages)
const settings = computed(() => domainStore.settings)
const domainId = computed(() => domainStore.domain?.domain_id)
const currentLangId = computed(() => domainStore.currentLanguage?.lang_id)
const photoUrl = (useRuntimeConfig().public.photoUrl as string) || ''

// Robust logo URL: absolute URLs as-is, relative paths prefixed with photoUrl.
const logoSrc = computed(() => {
  const logo = settings.value?.logo
  if (!logo) return ''
  if (/^https?:|^\/\//.test(logo)) return logo
  return photoUrl + logo
})
const err = ref(false)
watch(() => logoSrc.value, () => { err.value = false })
const titleText = computed(() => settings.value?.title || domainStore.domain?.domain_name || 'Home')
void props
</script>

<style scoped>
.dhi-logo { display: flex; align-items: center; }
.dhi-logo img { max-height: 46px; width: auto; object-fit: contain; }
.dhi-logo-text { color: var(--nav-text, #fff); font-weight: 800; font-size: 18px; font-family: var(--kb-heading-font, inherit); }
.dhi-menu { display: flex; align-items: center; gap: 4px; }
.dhi-menu.mobile { flex-direction: column; align-items: stretch; width: 100%; }
.dhi-menu-item { position: relative; }
.dhi-menu.mobile .dhi-menu-item { width: 100%; }
.dhi-menu-link {
  display: block; padding: 8px 12px;
  color: var(--nav-text, #fff) !important; text-decoration: none !important;
  font-size: 14px; font-weight: 600; border-radius: 6px; white-space: nowrap;
}
.dhi-menu.mobile .dhi-menu-link { width: 100%; }
.dhi-menu-link:hover { background: var(--nav-hover, rgba(255,255,255,.15)); }
.dhi-sublink {
  display: block; padding: 7px 12px 7px 28px;
  color: var(--nav-text, rgba(255,255,255,.85)) !important; text-decoration: none !important;
  font-size: 13px;
}
.dhi-sublink:hover { background: var(--nav-hover, rgba(255,255,255,.12)); }
.dhi-dropdown {
  position: absolute; top: 100%; left: 0; min-width: 200px;
  background: var(--nav-dropdown-bg, #fff); border-radius: 0 0 8px 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,.15); padding: 6px 0;
  opacity: 0; visibility: hidden; transform: translateY(-4px); transition: .18s; z-index: 200;
}
.dhi-menu-item:hover > .dhi-dropdown { opacity: 1; visibility: visible; transform: translateY(0); }
.dhi-dropdown-link {
  display: block; padding: 8px 14px;
  color: var(--nav-dropdown-text, #4a5568) !important; text-decoration: none !important; font-size: 13px;
}
.dhi-dropdown-link:hover { background: var(--nav-dropdown-hover, #eff6ff); color: var(--primary-dark) !important; }
.dhi-social { display: flex; align-items: center; gap: 8px; }
.dhi-menu.mobile .dhi-social { padding: 8px 4px; }
.dhi-social-link {
  width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%;
  background: rgba(255,255,255,.15); color: #fff !important; text-decoration: none !important;
}
.dhi-social-link:hover { background: rgba(255,255,255,.3); }
.dhi-lang {
  padding: 6px 8px; border-radius: 6px; border: 0;
  background: rgba(255,255,255,.15); color: #fff; font-size: 13px;
}
.dhi-lang option { color: #000; }
.dhi-text { color: var(--nav-text, #fff); font-size: 14px; }
.dhi-menu.mobile .dhi-text { display: block; padding: 6px 4px; }
.dhi-image { max-height: 40px; }
</style>
