<template>
  <div class="map-picker">
    <div class="map-wrapper">
      <ClientOnly>
        <LMap
          :zoom="modelValue.zoom"
          :center="[modelValue.lat, modelValue.lng]"
          :useGlobalLeaflet="false"
          @click="handleMapClick"
          class="leaflet-map"
        >
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap"
          />
          <LMarker
            v-if="hasMarker"
            :lat-lng="[modelValue.lat, modelValue.lng]"
            :draggable="true"
            @dragend="handleMarkerDrag"
          >
            <LPopup>{{ modelValue.title || 'Location' }}</LPopup>
          </LMarker>
        </LMap>
        <!-- Fallback shown until Leaflet hydrates / during SSR. -->
        <template #fallback>
          <div class="map-fallback">Loading map…</div>
        </template>
      </ClientOnly>
    </div>

    <div class="map-controls">
      <div class="form-row">
        <div class="form-group">
          <label>Latitude</label>
          <InputNumber
            :modelValue="modelValue.lat"
            :min="-90"
            :max="90"
            :maxFractionDigits="6"
            @update:modelValue="(v: number) => patch({ lat: v })"
          />
        </div>
        <div class="form-group">
          <label>Longitude</label>
          <InputNumber
            :modelValue="modelValue.lng"
            :min="-180"
            :max="180"
            :maxFractionDigits="6"
            @update:modelValue="(v: number) => patch({ lng: v })"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Zoom Level</label>
        <div class="zoom-row">
          <Slider
            :modelValue="modelValue.zoom"
            :min="1"
            :max="18"
            :step="1"
            @update:modelValue="(v: number) => patch({ zoom: v })"
          />
          <span class="zoom-value">{{ modelValue.zoom }}</span>
        </div>
      </div>

      <div class="visibility-toggle">
        <ToggleSwitch
          :modelValue="modelValue.visible"
          @update:modelValue="(v: any) => patch({ visible: Number(v) })"
          :trueValue="1"
          :falseValue="0"
        />
        <span>{{ modelValue.visible === 1 ? labelVisible : labelHidden }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

/**
 * Reusable Leaflet pin picker used by both the content create/edit form
 * (`pages/admin/content/[id].vue`) and the dedicated map editor page
 * (`pages/admin/content/[contentId]/map.vue`). Two-way binds a single
 * MapPickerValue object via v-model so the parent owns the state.
 *
 * `visible` is the on/off switch surfaced to the admin: 1 = show the map on
 * the public site, 0 = hide it. `marker` is the popup label (maps to the
 * `title` field stored in tblcontent.description).
 */

export interface MapPickerValue {
  lat: number
  lng: number
  zoom: number
  /** Popup label — parent passes the content's Title here. Read-only in picker. */
  title?: string
  visible: number
}

interface Props {
  modelValue: MapPickerValue
  labelVisible?: string
  labelHidden?: string
}

const props = withDefaults(defineProps<Props>(), {
  labelVisible: 'Show map on site',
  labelHidden: 'Map hidden',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: MapPickerValue): void
}>()

const hasMarker = computed(() => isFinite(props.modelValue.lat) && isFinite(props.modelValue.lng))

const patch = (changes: Partial<MapPickerValue>) => {
  emit('update:modelValue', { ...props.modelValue, ...changes })
}

const handleMapClick = (event: any) => {
  if (event?.latlng) {
    patch({ lat: event.latlng.lat, lng: event.latlng.lng })
  }
}

const handleMarkerDrag = (event: any) => {
  const ll = event?.target?.getLatLng?.() ?? event?.latlng
  if (ll) {
    patch({ lat: ll.lat, lng: ll.lng })
  }
}

// Keep `L` referenced for tree-shaking safety / type alignment of the marker
// drag helper above; vue-leaflet leans on the leaflet core singleton.
void L
</script>

<style scoped>
.map-picker {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.map-wrapper {
  height: 360px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.leaflet-map {
  height: 100%;
  width: 100%;
}

.map-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #718096;
  font-size: 0.875rem;
}

.map-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-weight: 500;
  color: #4a5568;
  font-size: 0.875rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.zoom-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.zoom-row :deep(.p-slider) {
  flex: 1;
}

.zoom-value {
  min-width: 2rem;
  text-align: center;
  font-size: 0.85rem;
  color: #4a5568;
}

.visibility-toggle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0;
}

.visibility-toggle span {
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
}
</style>
