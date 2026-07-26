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
            :key="item.type"
            type="button"
            class="palette-tile"
            draggable="true"
            @dragstart="onPaletteDragStart($event, item.type)"
            @click="onAdd(item.type)"
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
        <h4 class="col-title">Homepage layout</h4>
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
        <p>Your homepage is empty.</p>
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
            <button class="tool" title="Edit" @click="openEdit(i)"><i class="pi pi-pencil" /></button>
            <button class="tool" title="Duplicate" @click="duplicateSection(i)"><i class="pi pi-clone" /></button>
            <button class="tool danger" title="Delete" @click="removeSection(i)"><i class="pi pi-trash" /></button>
          </div>
        </li>
      </ul>

      <p class="canvas-foot">
        Drag rows to reorder, or use the arrows. Click <strong>Set as homepage</strong> to make this layout live
        (switches the template to the Designer).
      </p>
    </div>

    <!-- Edit dialog (reused from the article widget editor) -->
    <BlockWidgetDialog
      v-model:visible="dialogVisible"
      :type="editType"
      :data="editData"
      @save="onDialogSave"
      @delete="onDialogDelete"
      @duplicate="onDialogDuplicate"
    />
  </div>
</template>

<script setup lang="ts">
import { useSiteDesigner } from '~/composables/useSiteDesigner'
import BlockWidgetDialog from '~/components/admin/blocks/BlockWidgetDialog.vue'
import {
  DESIGNER_PALETTE,
  makeWidgetSlot,
  slotIcon,
  slotLabel,
} from '~/utils/designerSections'
import type { KbWidgetType } from '~/utils/blockWidgets'
import type { SectionSlot, WidgetSlot } from '~/types'

const {
  homeSections,
  addSection,
  updateSection,
  removeSection,
  moveSection,
  duplicateSection,
  save,
  activateHomepage,
} = useSiteDesigner()

// homeSections is a readonly computed ref; alias for template brevity.
const sections = homeSections

// ---- add from palette ----
const onAdd = (type: KbWidgetType) => {
  addSection(makeWidgetSlot(type))
}

// palette drag -> drop onto canvas end / empty area appends
const paletteDragType = ref<KbWidgetType | null>(null)
const onPaletteDragStart = (e: DragEvent, type: KbWidgetType) => {
  paletteDragType.value = type
  e.dataTransfer?.setData('text/plain', type)
  if (e.dataTransfer) e.dataTransfer.effectAllowed = 'copy'
}
const onCanvasDrop = (e: DragEvent, _index: number) => {
  if (paletteDragType.value) {
    addSection(makeWidgetSlot(paletteDragType.value))
  }
  paletteDragType.value = null
}

// ---- reorder existing rows (native HTML5 DnD) ----
const dragIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)
const onRowDragStart = (i: number) => { dragIndex.value = i }
const onRowDragEnd = () => { dragIndex.value = null; dragOverIndex.value = null }
const onRowDrop = (i: number) => {
  if (dragIndex.value !== null && dragIndex.value !== i) {
    moveSection(dragIndex.value, i)
  } else if (paletteDragType.value) {
    // dropped a palette item onto a row -> insert at that position
    const slot = makeWidgetSlot(paletteDragType.value)
    addSection(slot)
    const last = sections.value.length - 1
    if (last >= 0) moveSection(last, i)
  }
  dragIndex.value = null
  dragOverIndex.value = null
  paletteDragType.value = null
}

// ---- edit dialog ----
const dialogVisible = ref(false)
const editIndex = ref<number | null>(null)
const editType = ref<KbWidgetType | null>(null)
const editData = ref<any>({})

const openEdit = (i: number) => {
  const slot = sections.value[i]
  if (!slot || slot.kind !== 'widget') return
  editIndex.value = i
  editType.value = slot.type
  editData.value = JSON.parse(JSON.stringify(slot.payload))
  dialogVisible.value = true
}
const onDialogSave = (data: any) => {
  if (editIndex.value === null || !editType.value) return
  const slot: WidgetSlot = { kind: 'widget', type: editType.value, payload: data }
  updateSection(editIndex.value, slot)
  dialogVisible.value = false
}
const onDialogDelete = () => {
  if (editIndex.value !== null) removeSection(editIndex.value)
  dialogVisible.value = false
}
const onDialogDuplicate = () => {
  if (editIndex.value !== null) duplicateSection(editIndex.value)
}

// ---- activate as homepage ----
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

// ---- row excerpt ----
const excerpt = (slot: SectionSlot): string => {
  if (slot.kind !== 'widget') return ''
  const p = slot.payload || {}
  if (typeof p.title === 'string' && p.title) return p.title
  if (Array.isArray(p.items) && p.items.length) return `${p.items.length} items`
  if (typeof p.text === 'string' && p.text) return p.text.slice(0, 60)
  if (typeof p.label === 'string' && p.label) return p.label
  return 'Empty — click to edit'
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
