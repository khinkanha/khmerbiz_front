<template>
  <div class="media-picker">
    <div class="media-picker-header">
      <Button
        label="Browse Media Library"
        icon="pi pi-images"
        outlined
        @click="showLibrary = true"
      />
      <span class="or-divider">or</span>
      <FileUpload
        mode="basic"
        :customUpload="true"
        @select="handleNewUpload"
        :auto="true"
        accept="image/*"
        chooseLabel="Upload New Photo"
      />
    </div>

    <!-- Selected photos display -->
    <div v-if="selectedPhotos.length" class="selected-photos">
      <div
        v-for="(photo, idx) in selectedPhotos"
        :key="idx"
        class="photo-item"
        :draggable="true"
        @dragstart="handleDragStart(idx, $event)"
        @dragover="handleDragOver($event)"
        @drop="handleDrop(idx, $event)"
        @dragend="handleDragEnd"
      >
        <img
          :src="`${photoUrl}${photo}`"
          :alt="`Photo ${idx + 1}`"
          @click="openLightbox(idx)"
          class="photo-clickable"
        />
        <div class="photo-overlay">
          <Button
            icon="pi pi-arrows-alt"
            rounded
            text
            severity="secondary"
            class="photo-drag"
            v-tooltip.top="'Drag to reorder'"
          />
          <Button
            icon="pi pi-search"
            rounded
            text
            severity="info"
            class="photo-view"
            @click="openLightbox(idx)"
            v-tooltip.top="'Click to view'"
          />
          <Button
            icon="pi pi-times"
            rounded
            text
            severity="danger"
            class="photo-remove"
            @click="removePhoto(idx)"
            v-tooltip.top="'Remove photo'"
          />
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Dialog
      v-model:visible="showLightbox"
      :show-header="false"
      :style="{ width: '90vw', maxWidth: '800px' }"
      :modal="true"
      :dismissableMask="true"
      class="lightbox-dialog"
    >
      <div class="lightbox-content">
        <Button
          icon="pi pi-arrow-left"
          rounded
          text
          severity="secondary"
          class="lightbox-nav lightbox-prev"
          @click="prevPhoto"
          :disabled="currentPhotoIndex === 0"
          v-tooltip.left="'Previous photo'"
        />
        <div class="lightbox-image-wrapper">
          <img
            :src="`${photoUrl}${selectedPhotos[currentPhotoIndex]}`"
            :alt="`Photo ${currentPhotoIndex + 1}`"
            class="lightbox-image"
          />
          <div class="lightbox-info">
            <span class="lightbox-counter">{{ currentPhotoIndex + 1 }} / {{ selectedPhotos.length }}</span>
          </div>
        </div>
        <Button
          icon="pi pi-arrow-right"
          rounded
          text
          severity="secondary"
          class="lightbox-nav lightbox-next"
          @click="nextPhoto"
          :disabled="currentPhotoIndex === selectedPhotos.length - 1"
          v-tooltip.right="'Next photo'"
        />
      </div>
      <template #footer>
        <Button
          icon="pi pi-times"
          rounded
          text
          severity="danger"
          label="Close"
          @click="showLightbox = false"
        />
      </template>
    </Dialog>

    <!-- Media Library Dialog -->
    <Dialog
      v-model:visible="showLibrary"
      header="Media Library"
      :style="{ width: '90vw', maxWidth: '800px' }"
      :modal="true"
    >
      <div class="media-library">
        <!-- Search -->
        <div class="media-search">
          <InputText
            v-model="searchQuery"
            placeholder="Search media..."
            class="search-input"
          />
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="media-loading">
          <ProgressSpinner />
          <p>Loading media...</p>
        </div>

        <!-- Media grid -->
        <div v-else-if="mediaList.length" class="media-grid">
          <div
            v-for="media in mediaList"
            :key="media.photo_id"
            class="media-item"
            :class="{ 'media-item-selected': isSelected(media.file_name) }"
            @click="togglePhoto(media.file_name)"
          >
            <img
              :src="`${photoUrl}${media.file_name}`"
              :alt="media.title || media.file_name"
              class="media-thumb"
            />
            <div class="media-info">
              <small class="media-title">{{ media.title || 'Untitled' }}</small>
            </div>
            <div v-if="isSelected(media.file_name)" class="media-check">
              <i class="pi pi-check"></i>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="media-empty">
          <i class="pi pi-images" style="font-size: 3rem; color: #ccc;"></i>
          <p>No media found</p>
        </div>

        <!-- Pagination -->
        <div v-if="hasMorePages" class="media-pagination">
          <Button
            label="Load More"
            outlined
            @click="loadMore"
            :loading="loadingMore"
          />
        </div>
      </div>

      <template #footer>
        <Button label="Cancel" outlined @click="showLibrary = false" />
        <Button
          label="Add Selected"
          @click="confirmSelection"
          :disabled="!hasSelection"
        />
      </template>
    </Dialog>

    <!-- Upload Progress -->
    <div v-if="uploading" class="upload-progress">
      <ProgressSpinner />
      <p>Uploading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUpload } from '~/composables/useUpload'

interface Props {
  modelValue: string[]
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  multiple: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const { uploadFile } = useUpload()
const config = useRuntimeConfig()

const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const showLibrary = ref(false)
const loading = ref(false)
const loadingMore = ref(false)
const uploading = ref(false)
const searchQuery = ref('')
const mediaList = ref<any[]>([])
const currentPage = ref(1)
const totalPages = ref(0)
const pendingSelection = ref<string[]>([])

// Lightbox state
const showLightbox = ref(false)
const currentPhotoIndex = ref(0)

// Drag and drop state
const draggedIndex = ref<number | null>(null)

const selectedPhotos = computed(() => props.modelValue)
const hasSelection = computed(() => pendingSelection.value.length > 0)
const hasMorePages = computed(() => currentPage.value < totalPages.value)

const isSelected = (fileName: string) => {
  return pendingSelection.value.includes(fileName) || selectedPhotos.value.includes(fileName)
}

const togglePhoto = (fileName: string) => {
  const index = pendingSelection.value.indexOf(fileName)
  if (index > -1) {
    pendingSelection.value.splice(index, 1)
  } else {
    if (props.multiple) {
      pendingSelection.value.push(fileName)
    } else {
      pendingSelection.value = [fileName]
    }
  }
}

const removePhoto = (idx: number) => {
  const updated = [...selectedPhotos.value]
  updated.splice(idx, 1)
  emit('update:modelValue', updated)
}

const loadMedia = async (page: number = 1) => {
  loading.value = true
  try {
    const api = useApi()
    const params = new URLSearchParams({
      page: String(page),
      limit: '20',
    })
    if (searchQuery.value.trim()) {
      params.set('search', searchQuery.value.trim())
    }

    const response = await api.get<any>(`/media?${params}`)
    if (response.success && response.data) {
      if (page === 1) {
        mediaList.value = response.data.items || []
      } else {
        mediaList.value = [...mediaList.value, ...(response.data.items || [])]
      }
      const pag = response.data.pagination
      if (pag) {
        totalPages.value = pag.totalPages
        currentPage.value = pag.page
      }
    }
  } catch (error) {
    console.error('Failed to load media:', error)
  } finally {
    loading.value = false
  }
}

const loadMore = async () => {
  loadingMore.value = true
  await loadMedia(currentPage.value + 1)
  loadingMore.value = false
}

const handleNewUpload = async (event: any) => {
  const file = event.files[0]
  if (!file) return

  uploading.value = true
  try {
    const title = file.name
    const mediaId = await uploadFile(title, file, 'uploads')
    if (mediaId) {
      // Get the uploaded file info
      const api = useApi()
      const response = await api.get<any>(`/media?limit=1`)
      if (response.success && response.data?.items?.[0]) {
        const newPhoto = response.data.items[0].file_name
        const updated = [...selectedPhotos.value, newPhoto]
        emit('update:modelValue', updated)
      }
    }
  } catch (error) {
    console.error('Upload failed:', error)
  } finally {
    uploading.value = false
  }
}

const confirmSelection = () => {
  const updated = props.multiple
    ? [...selectedPhotos.value, ...pendingSelection.value]
    : [...pendingSelection.value]

  emit('update:modelValue', updated)
  pendingSelection.value = []
  showLibrary.value = false
}

// Lightbox functions
const openLightbox = (index: number) => {
  currentPhotoIndex.value = index
  showLightbox.value = true
}

const nextPhoto = () => {
  if (currentPhotoIndex.value < selectedPhotos.value.length - 1) {
    currentPhotoIndex.value++
  }
}

const prevPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  }
}

// Handle keyboard navigation in lightbox
watch(showLightbox, (isOpen) => {
  if (isOpen) {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextPhoto()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevPhoto()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        showLightbox.value = false
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    // Cleanup on unmount or close
    return () => window.removeEventListener('keydown', handleKeyPress)
  }
})

// Drag and drop functions
const handleDragStart = (index: number, event: DragEvent) => {
  draggedIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const handleDrop = (targetIndex: number, event: DragEvent) => {
  event.preventDefault()
  if (draggedIndex.value === null || draggedIndex.value === targetIndex) return

  const updated = [...selectedPhotos.value]
  const [movedPhoto] = updated.splice(draggedIndex.value, 1)
  updated.splice(targetIndex, 0, movedPhoto)

  emit('update:modelValue', updated)
  draggedIndex.value = null
}

const handleDragEnd = () => {
  draggedIndex.value = null
}

// Debounced search
let searchTimer: any = null
watch(searchQuery, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    currentPage.value = 1
    loadMedia(1)
  }, 400)
})

watch(showLibrary, (isOpen) => {
  if (isOpen) {
    pendingSelection.value = []
    loadMedia(1)
  }
})
</script>

<style scoped>
.media-picker {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.media-picker-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.or-divider {
  color: #6c757d;
  font-size: 0.875rem;
}

.selected-photos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.photo-item {
  position: relative;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 1;
  cursor: move;
  transition: all 0.2s;
}

.photo-item.dragging {
  opacity: 0.5;
  border-color: #3b82f6;
}

.photo-item:hover {
  border-color: #cbd5e0;
}

.photo-item.drag-over {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-clickable {
  cursor: pointer !important;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.photo-item:hover .photo-overlay {
  opacity: 1;
}

.photo-drag,
.photo-view,
.photo-remove {
  background: rgba(255, 255, 255, 0.9);
}

.photo-drag:hover,
.photo-view:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

/* Lightbox styles */
:deep(.lightbox-dialog) {
  background: transparent;
  box-shadow: none;
}

:deep(.lightbox-dialog .p-dialog-content) {
  background: transparent;
  border: none;
  padding: 0;
}

.lightbox-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  min-height: 60vh;
}

.lightbox-image-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.lightbox-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.lightbox-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}

.lightbox-counter {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.lightbox-prev {
  left: 1rem;
}

.lightbox-next {
  right: 1rem;
}

.lightbox-nav:hover:not(:disabled) {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.media-library {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 70vh;
}

.media-search {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
}

.media-loading,
.media-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  overflow-y: auto;
  padding: 0.5rem;
}

.media-item {
  position: relative;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.media-item:hover {
  border-color: #3b82f6;
  transform: scale(1.05);
}

.media-item-selected {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.media-thumb {
  width: 100%;
  height: 100px;
  object-fit: cover;
  display: block;
}

.media-info {
  padding: 0.5rem;
  background: #f8fafc;
}

.media-title {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #4a5568;
}

.media-check {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-pagination {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.upload-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  color: #6c757d;
}
</style>
