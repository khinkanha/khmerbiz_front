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

    <Card class="map-card">
      <template #content>
        <div class="map-form">
          <div class="form-group">
            <label for="mapDesc">{{ $t('contentManager.description') }}</label>
            <Textarea
              id="mapDesc"
              v-model="mapDescription"
              :placeholder="$t('contentManager.description')"
              rows="3"
              autoResize
            />
          </div>
          <MapPicker
            v-model="mapValue"
            :label-visible="$t('contentManager.show')"
            :label-hidden="$t('contentManager.notShow')"
          />
        </div>
      </template>
    </Card>

    <Message v-if="successMessage" severity="success" :closable="false">
      {{ successMessage }}
    </Message>

    <Message v-if="errorMessage" severity="error" :closable="false">
      {{ errorMessage }}
    </Message>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

import type { MapPickerValue } from '~/components/admin/MapPicker.vue'

const contentStore = useContentStore()
const { t } = useI18n()
const route = useRoute()

const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const mapValue = ref<MapPickerValue>({
  lat: 11.5564,
  lng: 104.9282,
  zoom: 13,
  visible: 1,
})
const mapDescription = ref('')

const contentId = computed(() => Number(route.params.contentId))

const handleSave = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!isFinite(mapValue.value.lat) || !isFinite(mapValue.value.lng)) {
    errorMessage.value = t('contentManager.searchLocation')
    return
  }

  saving.value = true
  try {
    const result = await contentStore.saveMapLocation(contentId.value, {
      title: contentStore.currentContent?.title || '',
      description: mapDescription.value,
      lat: mapValue.value.lat,
      lng: mapValue.value.lng,
      zoom: mapValue.value.zoom,
      visible: mapValue.value.visible,
    })

    if (result) {
      successMessage.value = t('common.success')
      setTimeout(() => { successMessage.value = '' }, 3000)
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

  // Load the saved pinned location out of the content's description JSON
  // (shape: { title, description?, lat, lng, zoom?, visible }). Falls back to
  // the Phnom Penh defaults when the content has no saved map yet. The popup
  // label (`title`) is the content's own title — not editable here.
  const raw = contentStore.currentContent as any
  if (raw) {
    mapValue.value.title = raw.title || ''
  }
  if (raw?.description) {
    try {
      const p = JSON.parse(raw.description)
      mapValue.value = {
        lat: Number(p.lat) || 11.5564,
        lng: Number(p.lng) || 104.9282,
        zoom: Number(p.zoom) || 13,
        title: raw.title || '',
        visible: Number(p.visible) === 0 ? 0 : 1,
      }
      mapDescription.value = p.description || ''
    } catch {
      /* keep defaults */
    }
  }
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

.map-card {
  border: 1px solid #e2e8f0;
  height: fit-content;
}

.map-form {
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
</style>
