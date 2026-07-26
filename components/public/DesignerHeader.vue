<template>
  <header v-if="header" class="dh" :class="[`theme-${theme}`, { open: mobileOpen }]">
    <div class="dh-bar">
      <!-- Mobile brand: logo (always visible on mobile) -->
      <a v-if="logoItem || settings?.title" class="dh-brand" href="/" @click.prevent="goHome">
        <img v-if="logoSrc && !logoErr" :src="logoSrc" :alt="titleText" @error="logoErr = true" />
        <span v-else class="dh-logo-text">{{ titleText }}</span>
      </a>

      <!-- Desktop: regions rendered inline (items in composed order) -->
      <div class="dh-desktop">
        <div v-for="rid in REGION_IDS" :key="rid" class="dh-region" :class="`region-${rid}`">
          <DesignerHeaderItem
            v-for="(item, i) in items(rid)"
            :key="i"
            :item="item"
            @navigate="mobileOpen = false"
            @lang="onLang"
            @home="goHome"
          />
        </div>
      </div>

      <!-- Mobile hamburger (only if there's something to collapse) -->
      <button v-if="hasCollapsible" class="dh-toggle" :aria-label="mobileOpen ? 'Close menu' : 'Open menu'" @click="mobileOpen = !mobileOpen">
        <i class="pi" :class="mobileOpen ? 'pi-times' : 'pi-bars'" />
      </button>
    </div>

    <!-- Mobile drawer: non-logo items, stacked vertically -->
    <div v-if="mobileOpen" class="dh-drawer">
      <template v-for="rid in REGION_IDS" :key="rid">
        <DesignerHeaderItem
          v-for="(item, i) in items(rid).filter((x) => x.type !== 'logo')"
          :key="`${rid}-${i}`"
          :item="item"
          mobile
          @navigate="mobileOpen = false"
          @lang="onLang"
          @home="goHome"
        />
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDesignStore } from '~/stores/design'
import { useDomainStore } from '~/stores/domain'
import { defaultHeader } from '~/types/design'
import DesignerHeaderItem from './DesignerHeaderItem.vue'
import { navigateTo } from 'nuxt/app'
import type { HeaderDesign, RegionItem } from '~/types'

const designStore = useDesignStore()
const domainStore = useDomainStore()
const photoUrl = (useRuntimeConfig().public.photoUrl as string) || ''

const settings = computed(() => domainStore.settings)
const theme = computed(() => settings.value?.theme ?? 0)

const header = computed<HeaderDesign>(() => designStore.design?.header ?? defaultHeader())
const REGION_IDS = ['left', 'center', 'right'] as const
const items = (id: string): RegionItem[] => header.value.regions.find((r) => r.id === id)?.items ?? []

const allItems = computed(() => REGION_IDS.flatMap((rid) => items(rid)))
const logoItem = computed(() => allItems.value.find((i) => i.type === 'logo'))
const hasCollapsible = computed(() => allItems.value.some((i) => i.type !== 'logo'))

// Robust logo URL for the mobile brand.
const logoSrc = computed(() => {
  const logo = settings.value?.logo
  if (!logo) return ''
  if (/^https?:|^\/\//.test(logo)) return logo
  return photoUrl + logo
})
const logoErr = ref(false)
watch(() => logoSrc.value, () => { logoErr.value = false })
const titleText = computed(() => settings.value?.title || domainStore.domain?.domain_name || 'Home')

const mobileOpen = ref(false)
const route = useRoute()
watch(() => route.path, () => { mobileOpen.value = false }) // close drawer on navigation

const onLang = (id: number) => { if (id) domainStore.setLanguage(id) }
const goHome = () => navigateTo('/')
</script>

<style scoped>
.dh {
  background-color: var(--nav-bg, #3b82f6);
  border-bottom: 3px solid var(--primary-dark, #1d4ed8);
  position: sticky;
  top: 0;
  z-index: 1000;
  container-type: inline-size;
}
.dh-bar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 60px;
}
/* Desktop regions */
.dh-desktop { display: flex; align-items: center; gap: 12px; flex: 1; flex-wrap: nowrap; min-width: 0; }
.dh-region { display: flex; align-items: center; gap: 14px; flex-wrap: nowrap; min-width: 0; }
.region-left { flex: 1; justify-content: flex-start; }
.region-center { flex: 0 1 auto; justify-content: center; }
.region-right { flex: 1; justify-content: flex-end; }
/* Mobile brand + toggle are hidden on desktop */
.dh-brand, .dh-toggle { display: none; }
.dh-brand { align-items: center; gap: 8px; flex: 1; min-width: 0; }
.dh-brand img { max-height: 40px; width: auto; object-fit: contain; }
.dh-logo-text { color: var(--nav-text, #fff); font-weight: 800; font-size: 16px; font-family: var(--kb-heading-font, inherit); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dh-toggle {
  background: rgba(255,255,255,.15); border: 0; color: #fff;
  width: 40px; height: 40px; border-radius: 8px; cursor: pointer; font-size: 18px;
  place-items: center;
}
.dh-toggle:hover { background: rgba(255,255,255,.3); }
/* Mobile drawer (stacked) */
.dh-drawer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid rgba(255,255,255,.12);
}

/* Mobile — container query so it also works inside the Preview's width toggle */
@container (max-width: 768px) {
  .dh-desktop { display: none; }
  .dh-brand { display: flex; }
  .dh-toggle { display: grid; }
}
</style>
