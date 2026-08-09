<template>
  <div class="build-panel">
    <!-- Palette (left) -->
    <div class="palette-col">
      <h4 class="col-title">Add a block</h4>
      <p class="col-hint">Click a block to add it, then edit its content.</p>
      <div v-for="g in DESIGNER_PALETTE" :key="g.group" class="palette-group">
        <div class="palette-group-title">{{ g.group }}</div>
        <div class="palette-grid">
          <button
            v-for="item in g.items"
            :key="paletteKey(item)"
            type="button"
            class="palette-tile"
            draggable="true"
            @dragstart="onPaletteDragStart($event, item)"
            @click="onAdd(item)"
          >
            <i :class="item.icon" />
            <span>{{ item.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Canvas / section list (right) -->
    <div class="canvas-col">
      <div class="canvas-head">
        <div class="page-picker">
          <span class="editing-label">Editing:</span>
          <Dropdown
            :model-value="currentPageKey"
            :options="pageOptions"
            option-label="label"
            option-value="value"
            class="page-select"
            @update:model-value="onSelectPage"
          />
        </div>
        <div class="canvas-actions">
          <Button
            label="Set as homepage"
            icon="pi pi-home"
            size="small"
            :loading="activating"
            @click="onActivate"
          />
        </div>
      </div>

      <div
        v-if="!sections.length"
        class="empty-canvas"
        @dragover.prevent
        @drop="onCanvasDrop($event, 0)"
      >
        <i class="pi pi-th-large" />
        <p>{{ currentPageKey === 'home' ? 'Your homepage is empty.' : 'This page is empty.' }}</p>
        <span>Click or drag a block from the left to start.</span>
      </div>

      <ul v-else class="section-list" @dragover.prevent>
        <li
          v-for="(slot, i) in sections"
          :key="i"
          class="section-row"
          :class="{ dragover: dragOverIndex === i, dragging: dragIndex === i }"
          draggable="true"
          @dragstart="onRowDragStart(i)"
          @dragend="onRowDragEnd"
          @dragover.prevent="dragOverIndex = i"
          @dragleave="dragOverIndex = null"
          @drop.stop="onRowDrop(i)"
        >
          <div class="row-grip"><i class="pi pi-bars" /></div>
          <div class="row-icon"><i :class="slotIcon(slot)" /></div>
          <div class="row-label">
            <strong>{{ slotLabel(slot) }}</strong>
            <span class="row-sub">{{ excerpt(slot) }}</span>
          </div>
          <div class="row-tools">
            <button class="tool" title="Move up" :disabled="i === 0" @click="moveSection(i, i - 1)"><i class="pi pi-arrow-up" /></button>
            <button class="tool" title="Move down" :disabled="i === sections.length - 1" @click="moveSection(i, i + 1)"><i class="pi pi-arrow-down" /></button>
            <button class="tool" :class="{ muted: !isEditable(slot) }" :title="isEditable(slot) ? 'Edit' : 'No settings'" :disabled="!isEditable(slot)" @click="openEdit(i)"><i class="pi pi-pencil" /></button>
            <button class="tool" title="Duplicate" @click="duplicateSection(i)"><i class="pi pi-clone" /></button>
            <button class="tool danger" title="Delete" @click="removeSection(i)"><i class="pi pi-trash" /></button>
          </div>
        </li>
      </ul>

      <p class="canvas-foot">
        Drag rows to reorder, or use the arrows. Banner and social blocks need no
        editing — they show the tenant's published banners / social links. Content blocks
        bind to a menu item. Click <strong>Set as homepage</strong> to make this layout live.
      </p>
    </div>

    <!-- Edit dialogs -->
    <BlockWidgetDialog
      v-model:visible="widgetDialog"
      :type="widgetType"
      :data="widgetData"
      @save="onWidgetSave"
      @delete="onWidgetDelete"
      @duplicate="onDialogDuplicate"
    />

    <ContentSlotDialog
      v-model:visible="contentDialog"
      :content-type="contentEdit.contentType"
      :menu-id="contentEdit.menuId"
      @save="onContentSave"
      @delete="onDialogDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { useSiteDesigner } from '~/composables/useSiteDesigner'
import { useMenuStore } from '~/stores/menu'
import BlockWidgetDialog from '~/components/admin/blocks/BlockWidgetDialog.vue'
import ContentSlotDialog from '~/components/admin/designer/ContentSlotDialog.vue'
import {
  DESIGNER_PALETTE,
  makeSlotFromPalette,
  slotIcon,
  slotLabel,
  menuIdToPageKey,
  HOME_PAGE_KEY,
  CONTENT_TYPE_META,
  type PaletteItem,
} from '~/utils/designerSections'
import type { KbWidgetType } from '~/utils/blockWidgets'
import type { SectionSlot, WidgetSlot, ContentSlot, MenuItem } from '~/types'

const {
  currentSections,
  currentPageKey,
  designedPageKeys,
  addSection,
  updateSection,
  removeSection,
  moveSection,
  duplicateSection,
  setCurrentPage,
  save,
  activateHomepage,
} = useSiteDesigner()

const menuStore = useMenuStore()

// currentSections is a readonly computed ref; alias for template brevity.
const sections = currentSections

// ---- page selector ---------------------------------------------------------

// Flatten the menu tree into leaf items (anything that can be a page).
const flattenLeaves = (items: readonly MenuItem[], acc: MenuItem[] = []): MenuItem[] => {
  for (const it of items) {
    if (it.children && it.children.length > 0) flattenLeaves(it.children, acc)
    else acc.push(it)
  }
  return acc
}

const pageOptions = computed(() => {
  const leaves = flattenLeaves(menuStore.menuTree as MenuItem[] ?? [])
  const opts: { label: string; value: string }[] = [
    { label: 'Home', value: HOME_PAGE_KEY },
  ]
  const seen = new Set<string>([HOME_PAGE_KEY])
  for (const m of leaves) {
    const key = menuIdToPageKey(m.item_id)
    if (seen.has(key)) continue
    seen.add(key)
    opts.push({ label: m.item_name || `Menu #${m.item_id}`, value: key })
  }
  return opts
})

const onSelectPage = (key: string) => setCurrentPage(key)

// Make sure the menu tree is loaded for the page selector.
onMounted(async () => {
  if (!menuStore.menuTree.length) {
    try { await menuStore.fetchAllMenuTree() } catch { /* ignore */ }
  }
  // If the current page key somehow isn't valid, fall back to home.
  if (currentPageKey.value !== HOME_PAGE_KEY && !pageOptions.value.some((p) => p.value === currentPageKey.value)) {
    setCurrentPage(HOME_PAGE_KEY)
  }
})

// ---- add from palette (now kind-aware) -------------------------------------
const onAdd = (item: PaletteItem) => {
  addSection(makeSlotFromPalette(item))
}

// palette drag -> drop
const paletteDragItem = ref<PaletteItem | null>(null)
const paletteKey = (item: PaletteItem): string =>
  item.kind === 'widget' ? `w-${item.type}` : item.kind === 'content' ? `c-${item.contentType}` : `b-${item.kind}`
const onPaletteDragStart = (e: DragEvent, item: PaletteItem) => {
  paletteDragItem.value = item
  e.dataTransfer?.setData('text/plain', paletteKey(item))
  if (e.dataTransfer) e.dataTransfer.effectAllowed = 'copy'
}
const onCanvasDrop = (e: DragEvent, _index: number) => {
  if (paletteDragItem.value) {
    addSection(makeSlotFromPalette(paletteDragItem.value))
  }
  paletteDragItem.value = null
}

// ---- reorder existing rows (native HTML5 DnD) ------------------------------
const dragIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)
const onRowDragStart = (i: number) => { dragIndex.value = i }
const onRowDragEnd = () => { dragIndex.value = null; dragOverIndex.value = null }
const onRowDrop = (i: number) => {
  if (dragIndex.value !== null && dragIndex.value !== i) {
    moveSection(dragIndex.value, i)
  } else if (paletteDragItem.value) {
    // dropped a palette item onto a row -> insert at that position
    addSection(makeSlotFromPalette(paletteDragItem.value))
    const last = sections.value.length - 1
    if (last >= 0) moveSection(last, i)
  }
  dragIndex.value = null
  dragOverIndex.value = null
  paletteDragItem.value = null
}

// ---- edit dialog dispatch (by slot kind) -----------------------------------
const isEditable = (slot: SectionSlot): boolean => slot.kind === 'widget' || slot.kind === 'content'

const widgetDialog = ref(false)
const widgetType = ref<KbWidgetType | null>(null)
const widgetData = ref<any>({})
const widgetEditIndex = ref<number | null>(null)

const contentDialog = ref(false)
const contentEdit = reactive<{ index: number | null; contentType: number; menuId?: number }>({
  index: null,
  contentType: 0,
  menuId: undefined,
})

const openEdit = (i: number) => {
  const slot = sections.value[i]
  if (!slot) return
  if (slot.kind === 'widget') {
    widgetEditIndex.value = i
    widgetType.value = slot.type
    widgetData.value = JSON.parse(JSON.stringify(slot.payload))
    widgetDialog.value = true
  } else if (slot.kind === 'content') {
    contentEdit.index = i
    contentEdit.contentType = slot.contentType
    contentEdit.menuId = slot.menuId
    contentDialog.value = true
  }
}

const onWidgetSave = (data: any) => {
  if (widgetEditIndex.value === null || !widgetType.value) return
  const slot: WidgetSlot = { kind: 'widget', type: widgetType.value, payload: data }
  updateSection(widgetEditIndex.value, slot)
  widgetDialog.value = false
  widgetEditIndex.value = null
}
const onContentSave = (payload: { contentType: number; menuId?: number }) => {
  if (contentEdit.index === null) return
  const slot: ContentSlot = { kind: 'content', contentType: payload.contentType }
  if (payload.menuId !== undefined) slot.menuId = payload.menuId
  updateSection(contentEdit.index, slot)
  contentDialog.value = false
  contentEdit.index = null
}

const onWidgetDelete = () => {
  if (widgetEditIndex.value !== null) removeSection(widgetEditIndex.value)
  widgetDialog.value = false
  widgetEditIndex.value = null
}
const onDialogDelete = () => {
  if (contentEdit.index !== null) removeSection(contentEdit.index)
  contentDialog.value = false
  contentEdit.index = null
}
const onDialogDuplicate = () => {
  if (widgetEditIndex.value !== null) duplicateSection(widgetEditIndex.value)
}

// ---- activate as homepage --------------------------------------------------
const activating = ref(false)
const onActivate = async () => {
  activating.value = true
  // persist current design first, then flip the template
  await save()
  await activateHomepage()
  activating.value = false
  activatedMsg.value = true
  setTimeout(() => (activatedMsg.value = false), 4000)
}
const activatedMsg = ref(false)

// ---- row excerpt -----------------------------------------------------------
const menuNameFor = (menuId: number): string | null => {
  const find = (items: readonly MenuItem[]): MenuItem | null => {
    for (const it of items) {
      if (it.item_id === menuId) return it
      if (it.children?.length) {
        const c = find(it.children)
        if (c) return c
      }
    }
    return null
  }
  const m = find(menuStore.menuTree as MenuItem[] ?? [])
  return m?.item_name ?? null
}

const excerpt = (slot: SectionSlot): string => {
  if (slot.kind === 'widget') {
    const p = slot.payload || {}
    if (typeof p.title === 'string' && p.title) return p.title
    if (Array.isArray(p.items) && p.items.length) return `${p.items.length} items`
    if (typeof p.text === 'string' && p.text) return p.text.slice(0, 60)
    if (typeof p.label === 'string' && p.label) return p.label
    return 'Empty — click to edit'
  }
  if (slot.kind === 'content') {
    const typeLabel = CONTENT_TYPE_META[slot.contentType]?.label ?? 'content'
    if (slot.menuId !== undefined) {
      const name = menuNameFor(slot.menuId)
      return name ? `${typeLabel} · ${name}` : `${typeLabel} · menu #${slot.menuId}`
    }
    return `${typeLabel} · auto`
  }
  return slot.kind === 'banner' ? 'Tenant banners' : 'Tenant social links'
}
</script>

<style scoped>
.build-panel {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  width: 100%;
  max-width: none;
}
.palette-col {
  width: 230px;
  flex-shrink: 0;
}
.canvas-col {
  flex: 1;
  min-width: 0;
}
.col-title {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 700;
}
.col-hint {
  margin: 0 0 14px;
  font-size: 12px;
  color: #64748b;
}
.palette-group {
  margin-bottom: 14px;
}
.palette-group-title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-bottom: 7px;
}
.palette-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px;
}
.palette-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px 6px;
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  background: #fff;
  cursor: grab;
  font-size: 11.5px;
  font-weight: 600;
  color: #334155;
  text-align: center;
}
.palette-tile:hover {
  border-color: #3b82f6;
  background: #eff6ff;
  color: #1d4ed8;
}
.palette-tile i {
  font-size: 16px;
  color: #3b82f6;
}
.canvas-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 12px;
  flex-wrap: wrap;
}
.page-picker {
  display: flex;
  align-items: center;
  gap: 8px;
}
.editing-label {
  font-size: 13px;
  font-weight: 700;
  color: #334155;
}
.page-select {
  min-width: 200px;
}
.canvas-actions {
  display: flex;
  gap: 8px;
}
.empty-canvas {
  border: 2px dashed #cbd5e1;
  border-radius: 11px;
  padding: 40px 20px;
  text-align: center;
  color: #94a3b8;
}
.empty-canvas i {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
}
.empty-canvas p {
  margin: 0 0 4px;
  font-weight: 600;
  color: #475569;
}
.section-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.section-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  background: #fff;
  cursor: grab;
}
.section-row.dragover {
  border-color: #3b82f6;
  border-style: dashed;
}
.section-row.dragging {
  opacity: 0.5;
}
.row-grip,
.row-icon {
  color: #94a3b8;
  display: grid;
  place-items: center;
}
.row-grip {
  cursor: grab;
}
.row-icon {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  background: #eff6ff;
  color: #1d4ed8;
}
.row-label {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.row-label strong {
  font-size: 13.5px;
  color: #0f172a;
}
.row-sub {
  font-size: 12px;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row-tools {
  display: flex;
  gap: 2px;
}
.tool {
  width: 30px;
  height: 30px;
  border: 0;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #64748b;
  display: grid;
  place-items: center;
}
.tool:hover {
  background: #f1f5f9;
  color: #0f172a;
}
.tool:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.tool.muted {
  opacity: 0.35;
}
.tool.danger:hover {
  background: #fef2f2;
  color: #dc2626;
}
.canvas-foot {
  margin: 12px 0 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
}
</style>
