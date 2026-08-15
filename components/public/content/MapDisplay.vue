<template>
  <section class="map-section">
    <h3 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h3>
    <div v-if="sectionDescription" class="section-description" v-html="sectionDescription"></div>
    <div class="map-container">
      <LMap :zoom="mapData.zoom || 13" :center="[mapData.lat || 11.5564, mapData.lng || 104.9282]"
        :useGlobalLeaflet="false" class="map-display">
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
        <LMarker
          v-if="mapData.lat && mapData.lng"
          :lat-lng="[mapData.lat, mapData.lng]"
          @click="openMaps"
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
  sectionDescription?: string
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: '',
  sectionDescription: '',
})

// Try a native maps app; if it hasn't taken over the tab within a short delay,
// fall back to the web map. We detect a successful handoff via visibility —
// launching an app hides the page.
const launchAppOrWeb = (appUrl: string, webUrl: string) => {
  let launched = false
  const onVisibility = () => {
    if (document.hidden) launched = true
  }
  document.addEventListener('visibilitychange', onVisibility)

  window.setTimeout(() => {
    document.removeEventListener('visibilitychange', onVisibility)
    if (!launched) window.location.href = webUrl
  }, 2000)

  window.location.href = appUrl
}

// Open the pinned location in the device's native maps app where possible:
//  - iOS  → Apple Maps (`maps://` scheme), web fallback if unavailable
//  - Android → Google Maps (`geo:` intent), web fallback if unavailable
//  - desktop/other → Google Maps on the web (new tab)
const openMaps = () => {
  const lat = props.mapData.lat
  const lng = props.mapData.lng
  const webUrl = `https://www.google.com/maps?q=${lat},${lng}`
  const ua = navigator.userAgent || ''
  // iPadOS 13+ reports as Mac desktop; detect it via touch support.
  const isIOS = /iPhone|iPod|iPad/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isAndroid = /Android/i.test(ua)

  if (isIOS) {
    launchAppOrWeb(`maps://?q=${lat},${lng}`, webUrl)
  } else if (isAndroid) {
    launchAppOrWeb(`geo:${lat},${lng}?q=${lat},${lng}`, webUrl)
  } else {
    window.open(webUrl, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
.map-section {
  padding: 2rem 0;
}

.section-title {
  font-size: var(--fs-section-title);
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
  text-align: center;
  font-family: var(--font-battambang);
}

.map-container {
  max-width: 800px;
  height: 400px;
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
