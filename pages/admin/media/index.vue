<template>
  <div class="media-page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('mediaManager.title') }}</h1>
    </div>

    <Card class="upload-card">
      <template #content>
        <FileUpload
          mode="basic"
          :customUpload="true"
          @uploader="handleUpload"
          :multiple="true"
          accept="image/*,video/*,.pdf,.doc,.docx"
          :maxFileSize="10000000"
          chooseLabel="Upload Files"
        />
        <div v-if="mediaStore.isUploading" class="upload-progress">
          <ProgressBar :value="uploadProgress" />
        </div>
      </template>
    </Card>

    <Card>
      <template #content>
        <div class="media-toolbar">
          <InputText
            v-model="searchQuery"
            :placeholder="$t('mediaManager.search')"
            class="search-input"
          />
          <Dropdown
            v-model="fileTypeFilter"
            :options="fileTypeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="All Files"
            class="filter-dropdown"
            showClear
          />
        </div>

        <div class="media-grid">
          <div
            v-for="media in filteredMedia"
            :key="media.media_id"
            class="media-item"
            @click="selectMedia(media)"
            :class="{ selected: selectedMedia?.media_id === media.media_id }"
          >
            <div class="media-preview">
              <img
                v-if="isImage(media.file_type)"
                :src="`${photoUrl}${media.file_url}`"
                :alt="media.file_name"
              />
              <div v-else class="file-icon">
                <i :class="getFileIcon(media.file_type)" />
              </div>
            </div>
            <div class="media-info">
              <p class="media-name">{{ media.original_name }}</p>
              <p class="media-meta">{{ formatFileSize(media.file_size) }}</p>
            </div>
            <Button
              icon="pi pi-trash"
              rounded
              text
              severity="danger"
              @click.stop="confirmDelete(media)"
              class="delete-btn"
            />
          </div>
        </div>

        <Paginator
          v-if="mediaStore.pagination.totalPages > 1"
          :rows="mediaStore.pagination.limit"
          :totalRecords="mediaStore.pagination.total"
          @page="onPageChange"
        />
      </template>
    </Card>

    <!-- Media Preview Dialog -->
    <Dialog
      v-model:visible="showPreviewDialog"
      :header="selectedMedia?.original_name"
      :style="{ width: '80vw' }"
      :modal="true"
    >
      <div class="media-preview-dialog">
        <img
          v-if="selectedMedia && isImage(selectedMedia.file_type)"
          :src="`${photoUrl}${selectedMedia.file_url}`"
          :alt="selectedMedia.original_name"
        />
        <div v-else class="file-details">
          <p><strong>File Name:</strong> {{ selectedMedia?.original_name }}</p>
          <p><strong>Type:</strong> {{ selectedMedia?.file_type }}</p>
          <p><strong>Size:</strong> {{ selectedMedia ? formatFileSize(selectedMedia.file_size) : '' }}</p>
          <p><strong>URL:</strong> {{ selectedMedia ? `${photoUrl}${selectedMedia.file_url}` : '' }}</p>
        </div>
      </div>
    </Dialog>

    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { useMediaStore } from '~/stores'
import { useConfirm } from 'primevue/useconfirm'

definePageMeta({
  middleware: 'auth',
})

const mediaStore = useMediaStore()
const confirm = useConfirm()
const { t } = useI18n()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const searchQuery = ref('')
const fileTypeFilter = ref<string>('')
const selectedMedia = ref<any>(null)
const showPreviewDialog = ref(false)
const uploadProgress = ref(0)

const fileTypeOptions = [
  { label: 'Images', value: 'image' },
  { label: 'Videos', value: 'video' },
  { label: 'Documents', value: 'application' },
]

const filteredMedia = computed(() => {
  let filtered = mediaStore.mediaList

  if (searchQuery.value) {
    filtered = filtered.filter((m) =>
      m.original_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (fileTypeFilter.value) {
    filtered = filtered.filter((m) => m.file_type.startsWith(fileTypeFilter.value))
  }

  return filtered
})

const isImage = (fileType: string) => fileType.startsWith('image/')

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('video/')) return 'pi pi-video'
  if (fileType.includes('pdf')) return 'pi pi-file-pdf'
  return 'pi pi-file'
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const handleUpload = async (event: any) => {
  const files = event.files

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    await mediaStore.uploadMedia(file, 'uploads', (progress) => {
      uploadProgress.value = progress
    })
  }

  await mediaStore.fetchMedia()
  uploadProgress.value = 0
}

const selectMedia = (media: any) => {
  selectedMedia.value = media
  showPreviewDialog.value = true
}

const confirmDelete = (media: any) => {
  confirm.require({
    message: t('common.confirm'),
    header: t('common.warning'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => deleteMedia(media.media_id),
    acceptClass: 'p-button-danger',
  })
}

const deleteMedia = async (id: number) => {
  await mediaStore.deleteMedia(id)
  if (selectedMedia.value?.media_id === id) {
    selectedMedia.value = null
    showPreviewDialog.value = false
  }
}

const onPageChange = (event: any) => {
  mediaStore.fetchMedia(event.page + 1)
}

onMounted(() => {
  mediaStore.fetchMedia()
})
</script>

<style scoped>
.media-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.upload-card {
  border: 1px solid #e2e8f0;
}

.upload-progress {
  margin-top: 1rem;
}

.media-toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-dropdown {
  min-width: 150px;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.media-item {
  position: relative;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;
}

.media-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.media-item.selected {
  border-color: #667eea;
  box-shadow: 0 0 0 2px #667eea;
}

.media-preview {
  aspect-ratio: 1;
  overflow: hidden;
  background-color: #f7fafc;
}

.media-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #a0aec0;
}

.media-info {
  padding: 0.75rem;
}

.media-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.media-meta {
  font-size: 0.75rem;
  color: #718096;
  margin: 0;
}

.delete-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.media-item:hover .delete-btn {
  opacity: 1;
}

.media-preview-dialog img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.file-details {
  padding: 1rem;
}

.file-details p {
  margin: 0.5rem 0;
}
</style>
