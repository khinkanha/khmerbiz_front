<template>
  <div class="hf-panel">
    <!-- Palette + column count -->
    <div class="palette">
      <div class="palette-row">
        <span class="palette-label">Columns:</span>
        <div class="seg">
          <button v-for="n in 4" :key="n" class="seg-btn" :class="{ on: colCount === n }" @click="setColumnCount(n)">{{ n }}</button>
        </div>
        <span class="palette-label" style="margin-left:14px">Add to col:</span>
        <div class="seg">
          <button v-for="n in colCount" :key="n" class="seg-btn" :class="{ on: targetCol === n - 1 }" @click="targetCol = n - 1">{{ n }}</button>
        </div>
      </div>
      <div class="palette-items">
        <button
          v-for="p in FOOTER_ITEM_PALETTE"
          :key="p.type"
          type="button"
          class="palette-tile"
          draggable="true"
          @dragstart="onPaletteDragStart($event, p.type)"
          @click="addItem(targetCol, p.type)"
        >
          <i :class="p.icon" /><span>{{ p.label }}</span>
        </button>
      </div>
      <p class="hint">Click to add to column {{ targetCol + 1 }}, or drag a tile onto a column.</p>
    </div>

    <!-- Columns -->
    <div class="columns" :style="{ gridTemplateColumns: 'repeat(' + colCount + ', 1fr)' }">
      <div
        v-for="(col, ci) in footer.columns"
        :key="ci"
        class="column"
        :class="{ over: overCol === ci }"
        @dragover.prevent="overCol = ci"
        @dragleave="overCol = null"
        @drop="onColDrop(ci)"
      >
        <div class="column-head">Column {{ ci + 1 }}</div>
        <div v-if="!col.items.length" class="column-empty">Empty — drop items here</div>
        <div v-for="(item, idx) in col.items" :key="idx" class="item">
          <div class="item-top">
            <i :class="regionItemIcon(item)" />
            <span class="item-label">{{ regionItemLabel(item) }}</span>
            <div class="item-tools">
              <button class="tool" :disabled="idx === 0" @click="moveItem(ci, idx, idx - 1)"><i class="pi pi-arrow-up" /></button>
              <button class="tool" :disabled="idx === col.items.length - 1" @click="moveItem(ci, idx, idx + 1)"><i class="pi pi-arrow-down" /></button>
              <button class="tool danger" @click="removeItem(ci, idx)"><i class="pi pi-times" /></button>
            </div>
          </div>
          <InputText v-if="item.type === 'text'" class="item-input" :value="item.payload?.text" placeholder="Text" @update:modelValue="setPayload(ci, idx, 'text', $event)" />
          <InputText v-else-if="item.type === 'image'" class="item-input" :value="item.payload?.url" placeholder="Image URL" @update:modelValue="setPayload(ci, idx, 'url', $event)" />
          <template v-else-if="item.type === 'contact'">
            <InputText class="item-input" :value="item.payload?.phone" placeholder="Phone" @update:modelValue="setPayload(ci, idx, 'phone', $event)" />
            <InputText class="item-input" :value="item.payload?.email" placeholder="Email" @update:modelValue="setPayload(ci, idx, 'email', $event)" />
            <InputText class="item-input" :value="item.payload?.address" placeholder="Address" @update:modelValue="setPayload(ci, idx, 'address', $event)" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteDesigner } from '~/composables/useSiteDesigner'
import { defaultFooter } from '~/types/design'
import { FOOTER_ITEM_PALETTE, makeRegionItem, regionItemIcon, regionItemLabel } from '~/utils/designerSections'
import type { RegionItemType } from '~/types'

const { homeFooter, patchFooter } = useSiteDesigner()

const footer = computed(() => homeFooter.value ?? defaultFooter())
const colCount = computed(() => footer.value.columns.length || 1)
const targetCol = ref(0)

const setColumnCount = (n: number) =>
  patchFooter((f) => {
    while (f.columns.length < n) f.columns.push({ items: [] })
    while (f.columns.length > n) f.columns.pop()
  })

const addItem = (ci: number, type: RegionItemType) =>
  patchFooter((f) => { f.columns[ci]?.items.push(makeRegionItem(type)) })

const removeItem = (ci: number, idx: number) =>
  patchFooter((f) => { f.columns[ci]?.items.splice(idx, 1) })

const moveItem = (ci: number, from: number, to: number) =>
  patchFooter((f) => {
    const items = f.columns[ci]?.items
    if (!items) return
    const [m] = items.splice(from, 1)
    items.splice(to, 0, m)
  })

const setPayload = (ci: number, idx: number, key: string, value: any) =>
  patchFooter((f) => {
    const it = f.columns[ci]?.items[idx]
    if (it) it.payload = { ...(it.payload || {}), [key]: value }
  })

const dragType = ref<RegionItemType | null>(null)
const overCol = ref<number | null>(null)
const onPaletteDragStart = (e: DragEvent, type: RegionItemType) => {
  dragType.value = type
  e.dataTransfer?.setData('text/plain', type)
}
const onColDrop = (ci: number) => {
  if (dragType.value) addItem(ci, dragType.value)
  dragType.value = null
  overCol.value = null
}
</script>

<style scoped>
.hf-panel { display: flex; flex-direction: column; gap: 18px; }
.palette { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; }
.palette-row { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; }
.palette-label { font-size: 12px; font-weight: 600; color: #475569; }
.seg { display: inline-flex; background: #fff; border: 1px solid #e2e8f0; border-radius: 7px; padding: 2px; gap: 2px; }
.seg-btn { border: 0; background: transparent; padding: 4px 11px; border-radius: 5px; cursor: pointer; font-size: 12px; color: #64748b; }
.seg-btn.on { background: #3b82f6; color: #fff; font-weight: 600; }
.palette-items { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px; }
.palette-tile { display: inline-flex; align-items: center; gap: 6px; padding: 6px 11px; border: 1px solid #e2e8f0; border-radius: 7px; background: #fff; cursor: grab; font-size: 12px; font-weight: 600; color: #334155; }
.palette-tile:hover { border-color: #3b82f6; color: #1d4ed8; background: #eff6ff; }
.palette-tile i { color: #3b82f6; }
.hint { margin: 9px 0 0; font-size: 12px; color: #94a3b8; }
.columns { display: grid; gap: 12px; }
.column { border: 2px dashed #cbd5e1; border-radius: 10px; padding: 10px; min-height: 120px; display: flex; flex-direction: column; gap: 8px; }
.column.over { border-color: #3b82f6; background: #eff6ff; }
.column-head { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; font-weight: 700; }
.column-empty { font-size: 12px; color: #cbd5e1; font-style: italic; }
.item { border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; padding: 7px 9px; display: flex; flex-direction: column; gap: 6px; }
.item-top { display: flex; align-items: center; gap: 7px; }
.item-top > i { color: #3b82f6; font-size: 13px; }
.item-label { font-size: 12.5px; font-weight: 600; color: #334155; flex: 1; }
.item-tools { display: flex; gap: 1px; }
.tool { width: 24px; height: 24px; border: 0; background: transparent; border-radius: 5px; cursor: pointer; color: #64748b; display: grid; place-items: center; }
.tool:hover { background: #f1f5f9; color: #0f172a; }
.tool:disabled { opacity: 0.3; cursor: not-allowed; }
.tool.danger:hover { background: #fef2f2; color: #dc2626; }
.item-input { width: 100%; font-size: 12px; }
</style>
