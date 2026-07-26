<template>
  <div class="preview-panel">
    <div class="preview-bar">
      <b>Live preview</b>
      <div class="seg">
        <button :class="{ on: device === 'desktop' }" title="Desktop" @click="device = 'desktop'"><i class="pi pi-desktop" /></button>
        <button :class="{ on: device === 'tablet' }" title="Tablet" @click="device = 'tablet'"><i class="pi pi-tablet" /></button>
        <button :class="{ on: device === 'mobile' }" title="Mobile" @click="device = 'mobile'"><i class="pi pi-mobile" /></button>
      </div>
      <span class="hint">Updates live as you edit — Save to publish.</span>
    </div>

    <div class="preview-scroll">
      <!-- The stage mirrors the public layout: themed via the design tokens
           (inline) + the theme class, so it looks like the real site. -->
      <div class="dp-stage" :class="[deviceClass, themeClass]" :style="tokenStyle">
        <DesignerHeader />
        <main class="dp-main">
          <DesignerPage :sections="homeSections" />
        </main>
        <DesignerFooter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteDesigner } from '~/composables/useSiteDesigner'
import { useDomainStore } from '~/stores/domain'
import { designTokensToCssVars } from '~/types/design'
import DesignerHeader from '~/components/public/DesignerHeader.vue'
import DesignerFooter from '~/components/public/DesignerFooter.vue'
import DesignerPage from '~/components/public/DesignerPage.vue'

const { homeSections, style, domainId } = useSiteDesigner()
const domainStore = useDomainStore()

const device = ref<'desktop' | 'tablet' | 'mobile'>('desktop')
const deviceClass = computed(() => `dp-${device.value}`)
const themeClass = computed(() => `theme-${domainStore.settings?.theme ?? 0}`)
const tokenStyle = computed(() => designTokensToCssVars(style.value))

// The header/footer pull logo/menu/social from the domain store, so make sure
// it's populated for the preview (admin pages don't load it by default).
onMounted(async () => {
  if (!domainStore.domain && domainId.value) {
    try {
      await domainStore.resolveDomain(domainId.value)
    } catch {
      /* ignore — preview still shows page sections + colors */
    }
  }
})
</script>

<style scoped>
.preview-panel { display: flex; flex-direction: column; gap: 12px; }
.preview-bar { display: flex; align-items: center; gap: 12px; }
.preview-bar b { font-size: 14px; }
.seg { display: inline-flex; background: #f1f5f9; border-radius: 8px; padding: 3px; gap: 2px; }
.seg button { border: 0; background: transparent; width: 32px; height: 30px; border-radius: 6px; cursor: pointer; color: #64748b; display: grid; place-items: center; }
.seg button.on { background: #fff; color: #1d4ed8; box-shadow: 0 1px 2px rgba(0,0,0,.12); }
.hint { margin-left: auto; font-size: 12px; color: #94a3b8; }
.preview-scroll { max-height: 70vh; overflow: auto; background: #e9eef5; border-radius: 12px; padding: 18px; display: flex; justify-content: center; }
.dp-stage {
  width: 100%;
  background: var(--bg-color, #fff);
  color: var(--text-color, #1f2937);
  margin: 0 auto;
  box-shadow: 0 12px 40px rgba(15,23,42,.16);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 420px;
  transition: max-width .2s;
}
.dp-desktop { max-width: 100%; }
.dp-tablet { max-width: 768px; }
.dp-mobile { max-width: 390px; }
.dp-main { flex: 1; }
</style>

<style>
/* Token consumers scoped to the preview stage — mirrors layouts/default.vue
   so the preview matches the public render. */
.dp-stage { font-family: var(--kb-body-font, inherit); }
.dp-stage h1,
.dp-stage h2,
.dp-stage h3,
.dp-stage h4 { font-family: var(--kb-heading-font, inherit); }
.dp-stage .card,
.dp-stage .kb-card,
.dp-stage .kb-image,
.dp-stage .kb-button,
.dp-stage .kb-video,
.dp-stage .kb-gallery img { border-radius: var(--kb-radius, 10px); }
</style>
