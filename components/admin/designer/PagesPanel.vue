<template>
  <div class="pages-panel">
    <p class="intro">
      Each menu page can either use the default theme or a custom layout you design here.
      Switch the <strong>Build page</strong> tab to edit a page's sections. Designed pages take
      over only when the Designer template is active (page_style 4).
    </p>

    <ul class="page-list">
      <!-- Home -->
      <li class="page-row">
        <div class="page-icon"><i class="pi pi-home" /></div>
        <div class="page-info">
          <strong>Home</strong>
          <span class="page-url">The site homepage</span>
        </div>
        <span class="badge" :class="isDesigned(HOME_PAGE_KEY) ? 'on' : ''">
          {{ isDesigned(HOME_PAGE_KEY) ? 'Designed' : 'Default' }}
        </span>
        <div class="page-tools">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            @click="goEdit(HOME_PAGE_KEY)"
          />
          <Button
            v-if="isDesigned(HOME_PAGE_KEY)"
            label="Clear"
            icon="pi pi-times"
            size="small"
            severity="danger"
            text
            @click="onClear(HOME_PAGE_KEY)"
          />
        </div>
      </li>

      <!-- Menu pages -->
      <li v-for="p in menuPages" :key="p.key" class="page-row">
        <div class="page-icon"><i class="pi pi-file" /></div>
        <div class="page-info">
          <strong>{{ p.label }}</strong>
          <span class="page-url">{{ p.url }}</span>
        </div>
        <span class="badge" :class="isDesigned(p.key) ? 'on' : ''">
          {{ isDesigned(p.key) ? 'Designed' : 'Default' }}
        </span>
        <div class="page-tools">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            @click="goEdit(p.key)"
          />
          <Button
            v-if="isDesigned(p.key)"
            label="Clear"
            icon="pi pi-times"
            size="small"
            severity="danger"
            text
            @click="onClear(p.key)"
          />
        </div>
      </li>
    </ul>

    <p v-if="!menuPages.length" class="empty">No menu pages found. Create menu items first.</p>
  </div>
</template>

<script setup lang="ts">
import { useSiteDesigner } from '~/composables/useSiteDesigner'
import { useMenuStore } from '~/stores/menu'
import { menuIdToPageKey, HOME_PAGE_KEY } from '~/utils/designerSections'
import type { MenuItem } from '~/types'

const emit = defineEmits<{ navigate: [tab: string] }>()

const { designedPageKeys, setCurrentPage, clearPage } = useSiteDesigner()
const menuStore = useMenuStore()

const flattenLeaves = (items: readonly MenuItem[], acc: MenuItem[] = []): MenuItem[] => {
  for (const it of items) {
    if (it.children && it.children.length > 0) flattenLeaves(it.children, acc)
    else acc.push(it)
  }
  return acc
}

// Build the page list from the menu tree, keyed by menu item_id (the canonical
// page identifier — every menu link is /pages/{domainId}/{itemId}).
const domainId = computed(() => menuStore.menuTree?.[0]?.domain_id ?? 1)
const menuPages = computed(() => {
  const leaves = flattenLeaves(menuStore.menuTree as MenuItem[] ?? [])
  const seen = new Set<string>()
  const out: { key: string; label: string; url: string }[] = []
  for (const m of leaves) {
    const key = menuIdToPageKey(m.item_id)
    if (key === HOME_PAGE_KEY || seen.has(key)) continue
    seen.add(key)
    out.push({ key, label: m.item_name || `Menu #${m.item_id}`, url: `/pages/${domainId.value}/${m.item_id}` })
  }
  return out
})

const isDesigned = (key: string): boolean => designedPageKeys.value.includes(key)

const goEdit = (key: string) => {
  setCurrentPage(key)
  emit('navigate', 'build')
}

const onClear = (key: string) => {
  // Find the page label for a friendlier confirm message.
  const page = menuPages.value.find((p) => p.key === key)
  const name = page ? page.label : `page ${key}`
  if (window.confirm(`Clear the custom design for "${name}"? This page will fall back to the default theme.`)) {
    clearPage(key)
  }
}

onMounted(async () => {
  if (!menuStore.menuTree.length) {
    try { await menuStore.fetchAllMenuTree() } catch { /* ignore */ }
  }
})
</script>

<style scoped>
.pages-panel { display: flex; flex-direction: column; gap: 14px; max-width: 720px; }
.intro { margin: 0; font-size: 13px; color: #64748b; line-height: 1.6; }
.page-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.page-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  background: #fff;
}
.page-icon {
  width: 32px; height: 32px;
  display: grid; place-items: center;
  border-radius: 7px;
  background: #eff6ff;
  color: #1d4ed8;
}
.page-info { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.page-info strong { font-size: 13.5px; color: #0f172a; }
.page-url { font-size: 12px; color: #94a3b8; font-family: monospace; }
.badge {
  font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
  padding: 3px 9px; border-radius: 20px;
  background: #f1f5f9; color: #64748b;
}
.badge.on { background: #dcfce7; color: #166534; }
.page-tools { display: flex; gap: 6px; align-items: center; }
.empty { margin: 8px 0 0; font-size: 13px; color: #94a3b8; font-style: italic; }
</style>
