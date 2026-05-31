<template>
  <div class="content-items-page">
    <div class="page-header">
      <div class="header-left">
        <Button icon="pi pi-arrow-left" text @click="navigateTo(`/admin/content/${contentId}`)" />
        <h1 class="page-title">
          {{ $t('contentManager.title') }}: {{ contentStore.currentContent?.title }}
        </h1>
      </div>
    </div>
    <div class="split-layout">
      <!-- Left: Add/Edit Form (hidden until edit or add) -->
      <Card v-if="showForm" class="form-card">
        <template #title>
          {{ editingItem ? $t('contentManager.edit') : $t('contentManager.addNew') }}
        </template>
        <template #content>
          <form @submit.prevent="handleSaveItem" class="item-form">
            <div class="form-group">
              <label for="itemTitle">{{ $t('contentManager.contentTitle') }} *</label>
              <InputText
                id="itemTitle"
                v-model="itemForm.title"
                :placeholder="$t('contentManager.contentTitle')"
                :class="{ 'p-invalid': itemErrors.title }"
              />
              <small v-if="itemErrors.title" class="p-error">{{ itemErrors.title }}</small>
            </div>

            <div class="form-group" v-if="isNewsContent">
              <label for="shortDescription">{{ $t('contentManager.shortDescription') }}</label>
              <Textarea
                id="shortDescription"
                v-model="itemForm.short_description"
                rows="3"
                :placeholder="$t('contentManager.shortDescription')"
              />
            </div>

            <div class="form-group">
              <label for="itemDescription">{{ $t('contentManager.description') }}</label>
              <ClientOnly>
                <TinyMCEEditor
                  v-if="isNewsContent"
                  v-model="itemForm.description"
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                  :init="{
                    height: 300,
                    menubar: 'tools',
                    plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste',
                    toolbar: 'undo redo | bold italic underline | forecolor backcolor | fontselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | fullscreen',
                    branding: false,
                    promotion: false,
                  }"
                />
              </ClientOnly>
              <textarea v-if="!isNewsContent" v-model="itemForm.description" class="form-control" rows="4" :placeholder="$t('contentManager.description')"></textarea>
            </div>

            <div class="form-group" v-if="contentType !== ContentType.VIDEO">
              <label>{{ $t('contentManager.primaryImage') }}</label>
              <div class="image-input-tabs">
                <Button
                  :label="'Upload'"
                  :outlined="imageInputMode !== 'upload'"
                  size="small"
                  @click="imageInputMode = 'upload'"
                />
                <Button
                  :label="'URL'"
                  :outlined="imageInputMode !== 'url'"
                  size="small"
                  @click="imageInputMode = 'url'"
                />
              </div>
              <div v-if="imageInputMode === 'upload'">
                <FileUpload
                  mode="basic"
                  :customUpload="true"
                  @select="handlePhotoSelect"
                  :auto="false"
                  accept="image/*"
                  chooseLabel="Choose Image"
                />
              </div>
              <div v-else>
                <InputText
                  v-model="itemForm.photoUrl"
                  placeholder="https://example.com/image.jpg"
                  class="w-full"
                />
              </div>
              <div v-if="itemForm.photoPreview" class="photo-preview">
                <img :src="itemForm.photoPreview" alt="Preview" />
                <Button
                  icon="pi pi-times"
                  rounded
                  text
                  severity="danger"
                  @click="clearPhoto"
                  class="remove-photo"
                />
              </div>
            </div>

            <div class="form-group" v-if="contentType === ContentType.VIDEO">
              <label for="videoUrl">{{ $t('contentManager.videoLink') }}</label>
              <InputText
                id="videoUrl"
                v-model="itemForm.video_url"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div class="form-row" v-if="isNewsContent">
              <div class="form-group">
                <label for="priority">{{ $t('contentManager.priority') }}</label>
                <Checkbox id="priority" v-model="itemForm.priority" :binary="true" :trueValue="1" :falseValue="0" />
              </div>
              <div class="form-group">
                <label for="isFeature">{{ $t('contentManager.featureItem') }}</label>
                <ToggleSwitch id="isFeature" v-model="itemForm.is_feature" />
              </div>
            </div>

            <div class="form-row" v-if="isNewsContent">
              <div class="form-group">
                <label for="publishDate">{{ $t('contentManager.publishDate') }}</label>
                <Calendar
                  id="publishDate"
                  v-model="itemForm.publish_date"
                  showTime
                  hourFormat="12"
                  dateFormat="yy-mm-dd"
                />
              </div>
              <div class="form-group">
                <label for="newsStatus">{{ $t('contentManager.status') || 'Status' }}</label>
                <div class="status-toggle">
                  <InputSwitch
                    id="newsStatus"
                    v-model="itemForm.status"
                  />
                  <span class="status-label">{{ itemForm.status ? $t('contentManager.show') || 'Show' : $t('contentManager.notShow') || 'Not Show' }}</span>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <Button
                type="button"
                :label="$t('common.cancel')"
                outlined
                @click="cancelEdit"
              />
              <Button
                type="submit"
                :label="editingItem ? $t('common.update') : $t('common.add')"
                :loading="saving"
              />
            </div>
          </form>
        </template>
      </Card>

      <!-- Right: Items Table -->
      <Card class="table-card">
        <template #header>
          <div style="display:flex;justify-content:flex-end;padding:0.5rem 1rem;">
            <Button :label="$t('contentManager.addNew')" icon="pi pi-plus" size="small" @click="addNewItem" />
          </div>
        </template>
        <template #content>
          <DataTable
            :value="displayItems"
            :loading="loading"
            :paginator="displayItems.length > 20"
            :rows="20"
            :rowsPerPageOptions="[10, 20, 50]"
            stripedRows
          >
            <Column :field="isNewsContent ? 'news_id' : 'item_id'" header="ID" :style="{ width: '60px' }" />
            <Column :header="$t('contentManager.primaryImage')" :style="{ width: '100px' }">
              <template #body="{ data }">
                <img
                  v-if="data.photo || data.url"
                  :src="`${photoUrl}${data.photo || data.url}`"
                  :alt="data.title"
                  class="item-thumb"
                />
                <span v-else>-</span>
              </template>
            </Column>
            <Column field="title" :header="$t('contentManager.contentTitle')" />
            <Column v-if="isNewsContent" :header="$t('contentManager.priority')" :style="{ width: '80px' }" field="priority" />
            <Column :header="$t('contentManager.actions')" :style="{ width: '120px' }">
              <template #body="{ data }">
                <div class="action-buttons">
                  <Button
                    icon="pi pi-pencil"
                    rounded
                    text
                    size="small"
                    @click="editItem(data)"
                    v-tooltip.top="$t('contentManager.edit')"
                  />
                  <Button
                    icon="pi pi-trash"
                    rounded
                    text
                    severity="danger"
                    size="small"
                    @click="confirmDelete(data)"
                    v-tooltip.top="$t('contentManager.delete')"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>

    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

import { ContentType } from '~/types'
import { useConfirm } from 'primevue/useconfirm'
import TinyMCEEditor from '@tinymce/tinymce-vue'

const contentStore = useContentStore()
const confirm = useConfirm()
const { t } = useI18n()
const route = useRoute()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const loading = ref(false)
const editingItem = ref<any>(null)
const saving = ref(false)
const showForm = ref(false)
const imageInputMode = ref<'upload' | 'url'>('upload')
const contentType = ref<ContentType>(ContentType.ARTICLE)

const itemForm = ref({
  title: '',
  short_description: '',
  description: '',
  photo: null as File | null,
  photoUrl: '',
  photoPreview: '',
  video_url: '',
  priority: 0,
  is_feature: false,
  publish_date: new Date() as Date | null,
  status: true,
})

const itemErrors = ref<Record<string, string>>({})
const contentId = computed(() => Number(route.params.contentId))

const validateItemForm = (): boolean => {
  itemErrors.value = {}
  if (!itemForm.value.title) {
    itemErrors.value.title = t('validation.required')
  }
  return Object.keys(itemErrors.value).length === 0
}

const handlePhotoSelect = (event: any) => {
  const file = event.files[0]
  if (file) {
    itemForm.value.photo = file
    itemForm.value.photoPreview = URL.createObjectURL(file)
  }
}

const clearPhoto = () => {
  itemForm.value.photo = null
  itemForm.value.photoUrl = ''
  itemForm.value.photoPreview = ''
}

const addNewItem = () => {
  editingItem.value = null
  itemForm.value = {
    title: '',
    short_description: '',
    description: '',
    photo: null,
    photoUrl: '',
    photoPreview: '',
    video_url: '',
    priority: 0,
    is_feature: false,
    publish_date: new Date(),
    status: true,
  }
  itemErrors.value = {}
  imageInputMode.value = 'upload'
  showForm.value = true
}

const editItem = (item: any) => {
  editingItem.value = item
  const existingPhoto = item.photo ? `${photoUrl}${item.photo}` : ''
  itemForm.value = {
    title: item.title || '',
    short_description: item.short_description || '',
    description: item.description || item.longdes || '',
    photo: null,
    photoUrl: item.photo && !item.photo.startsWith('/') ? item.photo : '',
    photoPreview: existingPhoto,
    video_url: item.video_url || '',
    priority: item.priority || 0,
    is_feature: item.is_feature || false,
    publish_date: item.publish_date ? new Date(item.publish_date) : new Date(),
    status: item.status !== 1,
  }
  itemErrors.value = {}
  imageInputMode.value = existingPhoto ? 'url' : 'upload'
  showForm.value = true
}

const cancelEdit = () => {
  editingItem.value = null
  itemForm.value = {
    title: '',
    short_description: '',
    description: '',
    photo: null,
    photoUrl: '',
    photoPreview: '',
    video_url: '',
    priority: 0,
    is_feature: false,
    publish_date: new Date(),
    status: true,
  }
  itemErrors.value = {}
  showForm.value = false
}

const handleSaveItem = async () => {
  if (!validateItemForm()) return

  saving.value = true

  try {
    let result: boolean | { success: boolean; id?: number }

    if (isNewsContent.value) {
      // News uses /news endpoint with different field names
      const publishDate = itemForm.value.publish_date
        ? itemForm.value.publish_date.toISOString().slice(0, 19).replace('T', ' ')
        : undefined

      const newsData: any = {
        title: itemForm.value.title,
        shortdes: itemForm.value.short_description || '',
        longdes: itemForm.value.description || '',
        priority: itemForm.value.priority ? 1 : 0,
        publish: publishDate,
        status: itemForm.value.status ? 0 : 1,
      }
      if (itemForm.value.photo) {
        newsData.photo = itemForm.value.photo
      }
      if (itemForm.value.photoUrl) {
        newsData.photo = itemForm.value.photoUrl
      }

      if (editingItem.value) {
        result = await contentStore.updateNews(contentId.value, editingItem.value.news_id || editingItem.value.id, newsData)
      } else {
        result = await contentStore.saveNews(contentId.value, newsData)
      }
    } else {
      // Other types use /items endpoint
      const data: any = {
        title: itemForm.value.title,
        description: itemForm.value.description,
        item_type: contentType.value === ContentType.PHOTO ? 1
          : contentType.value === ContentType.VIDEO ? 2
          : contentType.value === ContentType.DOCUMENT ? 3
          : contentType.value,
        video_url: itemForm.value.video_url,
        photoUrl: itemForm.value.photoUrl,
      }

      if (itemForm.value.photo) {
        data.photo = itemForm.value.photo
      }

      if (editingItem.value) {
        result = await contentStore.updateItem(contentId.value, editingItem.value.item_id, data)
      } else {
        result = await contentStore.saveItem(contentId.value, data)
      }
    }

    if (result === true || (typeof result === 'object' && result.success)) {
      if (isNewsContent.value) {
        await contentStore.fetchNews(contentId.value)
      } else {
        await contentStore.fetchItems(contentId.value)
      }
      cancelEdit()
    }
  } finally {
    saving.value = false
  }
}

const confirmDelete = (item: any) => {
  confirm.require({
    message: t('common.confirm'),
    header: t('common.warning'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => deleteItem(item.item_id),
    acceptClass: 'p-button-danger',
  })
}

const deleteItem = async (id: number) => {
  if (isNewsContent.value) {
    await contentStore.deleteNews(contentId.value, id)
  } else {
    await contentStore.deleteItem(contentId.value, id)
  }
}

const isNewsContent = computed(() => contentType.value === ContentType.NEWS)
const displayItems = computed(() => isNewsContent.value ? contentStore.newsList : contentStore.contentItems)

onMounted(async () => {
  await contentStore.fetchContent(contentId.value)
  if (contentStore.currentContent) {
    contentType.value = contentStore.currentContent.content_type
  }
  loading.value = true
  if (isNewsContent.value) {
    await contentStore.fetchNews(contentId.value)
  } else {
    await contentStore.fetchItems(contentId.value)
  }
  loading.value = false
})
</script>

<style scoped>
.image-input-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.content-items-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.form-card,
.table-card {
  border: 1px solid #e2e8f0;
}

.item-thumb {
  width: 60px;
  height: 45px;
  object-fit: cover;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 0.25rem;
}

.item-form {
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

.status-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-label {
  font-size: 0.875rem;
  color: #4a5568;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.photo-preview {
  position: relative;
  margin-top: 0.5rem;
}

.photo-preview img {
  max-width: 100%;
  max-height: 150px;
  border-radius: 4px;
}

.remove-photo {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .split-layout {
    grid-template-columns: 1fr;
  }
}
</style>
