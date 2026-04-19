<template>
  <div class="map-editor-page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('contentManager.showMap') }}: {{ contentStore.currentContent?.title }}</h1>
      <div class="page-actions">
        <Button
          :label="$t('common.back')"
          icon="pi pi-arrow-left"
          outlined
          @click="$router.back()"
        />
        <Button
          :label="$t('common.save')"
          icon="pi pi-check"
          @click="handleSave"
          :loading="saving"
        />
      </div>
    </div>

    <div class="map-container">
      <Card class="map-card">
        <template #content>
          <div class="map-wrapper">
            <LMap
              ref="mapRef"
              :zoom="mapZoom"
              :center="mapCenter"
              :useGlobalLeaflet="false"
              @click="handleMapClick"
              class="leaflet-map"
            >
              <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap"
              />
              <LMarker
                v-if="markerPosition"
                :lat-lng="markerPosition"
                :draggable="true"
                @dragend="handleMarkerDrag"
              >
                <LPopup>{{ markerTitle }}</LPopup>
              </LMarker>
            </LMap>
          </div>
        </template>
      </Card>

      <Card class="settings-card">
        <template #title>{{ $t('settings.otherSetting') }}</template>
        <template #content>
          <div class="settings-form">
            <div class="form-group">
              <label for="markerTitle">{{ $t('contentManager.contentTitle') }}</label>
              <InputText
                id="markerTitle"
                v-model="markerTitle"
                :placeholder="$t('contentManager.contentTitle')"
              />
            </div>

            <div class="form-group">
              <label>Latitude</label>
              <InputNumber
                v-model="mapCenter.lat"
                :min="-90"
                :max="90"
                :decimalPlaces="6"
                @update:modelValue="updateMarkerFromInput"
              />
            </div>

            <div class="form-group">
              <label>Longitude</label>
              <InputNumber
                v-model="mapCenter.lng"
                :min="-180"
                :max="180"
                :decimalPlaces="6"
                @update:modelValue="updateMarkerFromInput"
              />
            </div>

            <div class="form-group">
              <label>Zoom Level</label>
              <Slider
                v-model="mapZoom"
                :min="1"
                :max="18"
                :step="1"
              />
              <span class="zoom-value">{{ mapZoom }}</span>
            </div>

            <Button
              :label="$t('contentManager.delete')"
              icon="pi pi-trash"
              outlined
              severity="danger"
              @click="clearMarker"
              :disabled="!markerPosition"
              class="w-full"
            />

            <Message v-if="successMessage" severity="success" :closable="false">
              {{ successMessage }}
            </Message>

            <Message v-if="errorMessage" severity="error" :closable="false">
              {{ errorMessage }}
            </Message>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContentStore } from '~/stores'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

definePageMeta({
  middleware: 'auth',
})

const contentStore = useContentStore()
const { t } = useI18n()
const route = useRoute()

const mapRef = ref()
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const mapCenter = ref({ lat: 11.5564, lng: 104.9282 }) // Default Cambodia
const mapZoom = ref(13)
const markerPosition = ref<L.LatLngExpression | null>(null)
const markerTitle = ref('')

const contentId = computed(() => Number(route.params.id))

const handleMapClick = (event: any) => {
  markerPosition.value = event.latlng
}

const handleMarkerDrag = (event: any) => {
  markerPosition.value = event.latlng
}

const updateMarkerFromInput = () => {
  if (markerPosition.value) {
    markerPosition.value = L.latLng(mapCenter.value.lat, mapCenter.value.lng)
  }
}

const clearMarker = () => {
  markerPosition.value = null
}

const handleSave = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!markerPosition.value) {
    errorMessage.value = 'Please click on the map to set a location'
    return
  }

  saving.value = true

  try {
    const result = await contentStore.saveMapLocation(contentId.value, {
      lat: mapCenter.value.lat,
      lng: mapCenter.value.lng,
      zoom: mapZoom.value,
      marker: markerTitle.value,
    })

    if (result) {
      successMessage.value = t('common.success')
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    } else {
      errorMessage.value = t('common.error')
    }
  } catch (error: any) {
    errorMessage.value = error.message || t('common.error')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await contentStore.fetchContent(contentId.value)

  // TODO: Load existing map location from content
  // For now, using default Cambodia coordinates
})
</script>

<style scoped>
.map-editor-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.page-actions {
  display: flex;
  gap: 0.75rem;
}

.map-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .map-container {
    grid-template-columns: 1fr;
  }
}

.map-card, .settings-card {
  border: 1px solid #e2e8f0;
  height: fit-content;
}

.map-wrapper {
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
}

.leaflet-map {
  height: 100%;
  width: 100%;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #4a5568;
  font-size: 0.875rem;
}

.zoom-value {
  font-size: 0.875rem;
  color: #718096;
  text-align: center;
  display: block;
  margin-top: 0.25rem;
}

.w-full {
  width: 100%;
}
</style>
