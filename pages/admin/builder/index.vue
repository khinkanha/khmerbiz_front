<template>
  <div class="designer-page">
    <!-- Toolbar -->
    <div class="toolbar">
      <div class="title">
        <i class="pi pi-palette" />
        <h1>Site Designer</h1>
        <span v-if="domainName" class="domain">{{ domainName }}</span>
      </div>
      <div class="grow" />
      <button class="tool-btn" :disabled="!canUndo" title="Undo (Ctrl+Z)" @click="undo"><i class="pi pi-undo" /></button>
      <button class="tool-btn" :disabled="!canRedo" title="Redo (Ctrl+Shift+Z)" @click="redo"><i class="pi pi-refresh" /></button>
      <span v-if="dirty" class="badge dirty">Unsaved changes</span>
      <span v-else-if="lastSaved" class="badge ok">Saved ✓</span>
      <Button
        label="Save design"
        icon="pi pi-save"
        :loading="saving"
        :disabled="!dirty"
        @click="handleSave"
      />
    </div>

    <div class="designer-body">
      <!-- Left rail: tabs -->
      <nav class="tabs">
        <button
          v-for="t in tabs"
          :key="t.id"
          class="tab"
          :class="{ on: activeTab === t.id, soon: t.soon }"
          @click="activeTab = t.id"
        >
          <i :class="t.icon" />
          <span>{{ t.label }}</span>
          <small v-if="t.soon">soon</small>
        </button>
      </nav>

      <!-- Panel area -->
      <div class="panel-area">
        <div v-if="loading" class="state"><i class="pi pi-spin pi-spinner" /> Loading design…</div>

        <template v-else>
          <!-- STYLE (Phase 1) -->
          <div v-show="activeTab === 'style'" class="panel">
            <StylePanel />
            <aside class="live-note">
              <i class="pi pi-info-circle" />
              <span>Open the public site in another tab to see your colors live. In production this re-themes instantly with no flash.</span>
            </aside>
          </div>

          <!-- BUILD (Phase 2) -->
          <div v-show="activeTab === 'build'" class="panel wide">
            <BuildPanel />
          </div>

          <!-- HEADER (Phase 3) -->
          <div v-show="activeTab === 'header'" class="panel wide">
            <HeaderPanel />
          </div>

          <!-- FOOTER (Phase 3) -->
          <div v-show="activeTab === 'footer'" class="panel wide">
            <FooterPanel />
          </div>

          <!-- PAGES (Phase 2/4) -->
          <div v-show="activeTab === 'pages'" class="panel">
            <Placeholder
              icon="pi pi-file"
              title="Pages — Phase 2"
              text="Choose which page you are designing (Home, About…) and manage custom pages."
            />
          </div>

          <!-- PREVIEW (Phase 4) -->
          <div v-show="activeTab === 'preview'" class="panel wide">
            <PreviewPanel />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteDesigner } from '~/composables/useSiteDesigner'
import { useDomainStore } from '~/stores/domain'
import StylePanel from '~/components/admin/designer/StylePanel.vue'
import BuildPanel from '~/components/admin/designer/BuildPanel.vue'
import HeaderPanel from '~/components/admin/designer/HeaderPanel.vue'
import FooterPanel from '~/components/admin/designer/FooterPanel.vue'
import PreviewPanel from '~/components/admin/designer/PreviewPanel.vue'
import Placeholder from '~/components/admin/designer/Placeholder.vue'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { init, save, saving, dirty, canUndo, canRedo, undo, redo } = useSiteDesigner()
const domainStore = useDomainStore()

const activeTab = ref<'style' | 'build' | 'header' | 'footer' | 'pages' | 'preview'>('style')
const loading = ref(true)
const lastSaved = ref(false)

const tabs = [
  { id: 'style', label: 'Style & colors', icon: 'pi pi-palette', soon: false },
  { id: 'build', label: 'Build page', icon: 'pi pi-th-large', soon: false },
  { id: 'header', label: 'Header', icon: 'pi pi-bars', soon: false },
  { id: 'footer', label: 'Footer', icon: 'pi pi-directions', soon: false },
  { id: 'pages', label: 'Pages', icon: 'pi pi-file', soon: true },
  { id: 'preview', label: 'Preview', icon: 'pi pi-eye', soon: false },
] as const

const domainName = computed(() => domainStore.domain?.domain_name || domainStore.settings?.domain_name || '')

const handleSave = async () => {
  const ok = await save()
  if (ok) {
    lastSaved.value = true
    setTimeout(() => (lastSaved.value = false), 3000)
  }
}

const onKey = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
    e.preventDefault()
    if (e.shiftKey) redo()
    else undo()
  }
}
onMounted(async () => {
  window.addEventListener('keydown', onKey)
  await init()
  loading.value = false
})
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.designer-page {
  padding: 18px 22px 40px;
  max-width: 1100px;
  margin: 0 auto;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}
.title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.title h1 {
  font-size: 20px;
  margin: 0;
}
.title i {
  color: #3b82f6;
  font-size: 18px;
}
.domain {
  font-size: 12px;
  color: #64748b;
  background: #f1f5f9;
  padding: 3px 9px;
  border-radius: 20px;
}
.grow {
  flex: 1;
}
.tool-btn {
  width: 34px;
  height: 34px;
  border: 1px solid #e2e8f0;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  color: #475569;
  display: grid;
  place-items: center;
}
.tool-btn:hover:not(:disabled) {
  border-color: #3b82f6;
  color: #1d4ed8;
  background: #eff6ff;
}
.tool-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}
.badge.dirty {
  color: #b45309;
  background: #fef3c7;
}
.badge.ok {
  color: #166534;
  background: #dcfce7;
}
.designer-body {
  display: flex;
  gap: 18px;
  align-items: flex-start;
}
.tabs {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 190px;
  flex-shrink: 0;
}
.tab {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 12px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 9px;
  cursor: pointer;
  color: #475569;
  font-weight: 600;
  font-size: 13.5px;
  text-align: left;
  position: relative;
}
.tab i {
  font-size: 15px;
  width: 16px;
  text-align: center;
}
.tab:hover {
  background: #f8fafc;
}
.tab.on {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #dbeafe;
}
.tab small {
  margin-left: auto;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #94a3b8;
}
.panel-area {
  flex: 1;
  min-width: 0;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 22px;
  min-height: 420px;
}
.state {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  color: #64748b;
  padding: 60px 0;
}
.panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 520px;
}
.panel.wide {
  max-width: none;
}
.live-note {
  display: flex;
  gap: 9px;
  align-items: flex-start;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 9px;
  padding: 11px 13px;
  font-size: 12.5px;
  color: #475569;
  line-height: 1.5;
}
.live-note i {
  color: #3b82f6;
  margin-top: 1px;
}
</style>
