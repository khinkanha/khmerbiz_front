<template>
  <section class="map-section">
    <h2 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h2>

    <div class="map-container">
      <LMap
        :zoom="mapData.zoom || 13"
        :center="[mapData.lat || 11.5564, mapData.lng || 104.9282]"
        :useGlobalLeaflet="false"
        class="map-display"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        <LMarker
          v-if="mapData.lat && mapData.lng"
          :lat-lng="[mapData.lat, mapData.lng]"
        >
          <LPopup>{{ mapData.marker || 'Location' }}</LPopup>
        </LMarker>
      </LMap>
    </div>
  </section>
</template>

<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

interface MapData {
  lat?: number
  lng?: number
  zoom?: number
  marker?: string
}

interface Props {
  mapData: MapData
  sectionTitle?: string
}

withDefaults(defineProps<Props>(), {
  sectionTitle: '',
})
</script>

<style scoped>
.map-section {
  padding: 2rem 0;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
  text-align: center;
  font-family: var(--font-battambang);
}

.map-container {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.map-display {
  height: 400px;
  width: 100%;
}
</style>
