<template>
  <div class="hf-panel">
    <!-- Palette -->
    <div class="palette">
      <span class="palette-label">Add to:</span>
      <div class="seg">
        <button v-for="r in REGION_IDS" :key="r" class="seg-btn" :class="{ on: targetRegion === r }" @click="targetRegion = r">{{ r }}</button>
      </div>
      <div class="palette-items">
        <button
          v-for="p in HEADER_ITEM_PALETTE"
          :key="p.type"
          type="button"
          class="palette-tile"
          draggable="true"
          @dragstart="onPaletteDragStart($event, p.type)"
          @click="addItem(targetRegion, p.type)"
        >
          <i :class="p.icon" /><span>{{ p.label }}</span>
        </button>
      </div>
      <p class="hint">Click to add to “{{ targetRegion }}”, or drag a tile onto a region below.</p>
    </div>

    <!-- Regions -->
    <div class="regions">
      <div
        v-for="rid in REGION_IDS"
        :key="rid"
        class="region"
        :class="{ over: overRegion === rid }"
        @dragover.prevent="overRegion = rid"
        @dragleave="overRegion = null"
        @drop="onRegionDrop(rid)"
      >
        <div class="region-head">{{ rid }}</div>
        <div v-if="!regionItems(rid).length" class="region-empty">Empty — drop items here</div>
        <div v-for="(item, idx) in regionItems(rid)" :key="idx" class="item">
          <div class="item-top">
            <i :class="regionItemIcon(item)" />
            <span class="item-label">{{ regionItemLabel(item) }}</span>
            <div class="item-tools">
              <button class="tool" :disabled="idx === 0" @click="moveItem(rid, idx, idx - 1)"><i class="pi pi-arrow-up" /></button>
              <button class="tool" :disabled="idx === regionItems(rid).length - 1" @click="moveItem(rid, idx, idx + 1)"><i class="pi pi-arrow-down" /></button>
              <button class="tool danger" @click="removeItem(rid, idx)"><i class="pi pi-times" /></button>
            </div>
          </div>
          <!-- inline editors for payload-bearing items -->
          <InputText v-if="item.type === 'text'" class="item-input" :value="item.payload?.text" placeholder="Text" @update:modelValue="setPayload(rid, idx, 'text', $event)" />
          <InputText v-else-if="item.type === 'image'" class="item-input" :value="item.payload?.url" placeholder="Image URL" @update:modelValue="setPayload(rid, idx, 'url', $event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteDesigner } from '~/composables/useSiteDesigner'
import { defaultHeader } from '~/types/design'
import { HEADER_ITEM_PALETTE, makeRegionItem, regionItemIcon, regionItemLabel } from '~/utils/designerSections'
import type { RegionItem, RegionItemType } from '~/types'

const { homeHeader, patchHeader } = useSiteDesigner()

const header = computed(() => homeHeader.value ?? defaultHeader())
const REGION_IDS = ['left', 'center', 'right'] as const
const targetRegion = ref<string>('left')

const regionItems = (id: string): RegionItem[] => header.value.regions.find((r) => r.id === id)?.items ?? []

const addItem = (regionId: string, type: RegionItemType) =>
  patchHeader((h) => {
    let r = h.regions.find((x) => x.id === regionId)
    if (!r) {
      r = { id: regionId, items: [] }
      h.regions.push(r)
    }
    r.items.push(makeRegionItem(type))
  })

const removeItem = (regionId: string, idx: number) =>
  patchHeader((h) => { h.regions.find((x) => x.id === regionId)?.items.splice(idx, 1) })

const moveItem = (regionId: string, from: number, to: number) =>
  patchHeader((h) => {
    const items = h.regions.find((x) => x.id === regionId)?.items
    if (!items) return
    const [m] = items.splice(from, 1)
    items.splice(to, 0, m)
  })

const setPayload = (regionId: string, idx: number, key: string, value: any) =>
  patchHeader((h) => {
    const it = h.regions.find((x) => x.id === regionId)?.items[idx]
    if (it) it.payload = { ...(it.payload || {}), [key]: value }
  })

// drag from palette onto a region
const dragType = ref<RegionItemType | null>(null)
const overRegion = ref<string | null>(null)
const onPaletteDragStart = (e: DragEvent, type: RegionItemType) => {
  dragType.value = type
  e.dataTransfer?.setData('text/plain', type)
}
const onRegionDrop = (regionId: string) => {
  if (dragType.value) addItem(regionId, dragType.value)
  dragType.value = null
  overRegion.value = null
}
</script>

<style scoped>
.hf-panel { display: flex; flex-direction: column; gap: 18px; }
.palette { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; }
.palette-label { font-size: 12px; font-weight: 600; color: #475569; margin-right: 8px; }
.seg { display: inline-flex; background: #fff; border: 1px solid #e2e8f0; border-radius: 7px; padding: 2px; gap: 2px; margin-left: 4px; }
.seg-btn { border: 0; background: transparent; padding: 4px 12px; border-radius: 5px; cursor: pointer; font-size: 12px; text-transform: capitalize; color: #64748b; }
.seg-btn.on { background: #3b82f6; color: #fff; font-weight: 600; }
.palette-items { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px; }
.palette-tile { display: inline-flex; align-items: center; gap: 6px; padding: 6px 11px; border: 1px solid #e2e8f0; border-radius: 7px; background: #fff; cursor: grab; font-size: 12px; font-weight: 600; color: #334155; }
.palette-tile:hover { border-color: #3b82f6; color: #1d4ed8; background: #eff6ff; }
.palette-tile i { color: #3b82f6; }
.hint { margin: 9px 0 0; font-size: 12px; color: #94a3b8; }
.regions { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
.region { border: 2px dashed #cbd5e1; border-radius: 10px; padding: 10px; min-height: 120px; display: flex; flex-direction: column; gap: 8px; }
.region.over { border-color: #3b82f6; background: #eff6ff; }
.region-head { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; font-weight: 700; text-transform: capitalize; }
.region-empty { font-size: 12px; color: #cbd5e1; font-style: italic; }
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
