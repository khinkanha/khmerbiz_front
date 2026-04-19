<template>
  <div class="content-items-page">
    <div class="page-header">
      <h1 class="page-title">
        {{ $t('contentManager.title') }}: {{ contentStore.currentContent?.title }}
      </h1>
      <div class="page-actions">
        <Button
          :label="$t('contentManager.addNew')"
          icon="pi pi-plus"
          @click="showAddDialog = true"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <DataTable
          :value="contentStore.contentItems"
          :loading="loading"
          :paginator="true"
          :rows="20"
          stripedRows
          class="items-table"
        >
          <Column field="item_id" header="ID" :style="{ width: '80px' }" />
          <Column field="title" :header="$t('contentManager.contentTitle')" />
          <Column
            field="photo"
            :header="$t('contentManager.primaryImage')"
            :style="{ width: '120px' }"
          >
            <template #body="{ data }">
              <img
                v-if="data.photo"
                :src="`${photoUrl}${data.photo}`"
                :alt="data.title"
                class="item-thumb"
              />
              <span v-else>-</span>
            </template>
          </Column>
          <Column
            field="priority"
            :header="$t('contentManager.priority')"
            :style="{ width: '100px' }"
          />
          <Column
            field="is_feature"
            :header="$t('contentManager.featureItem')"
            :style="{ width: '100px' }"
          >
            <template #body="{ data }">
              <Tag
                :value="data.is_feature ? 'Yes' : 'No'"
                :severity="data.is_feature ? 'success' : 'secondary'"
              />
            </template>
          </Column>
          <Column
            :header="$t('contentManager.actions')"
            :style="{ width: '150px' }"
          >
            <template #body="{ data }">
              <div class="action-buttons">
                <Button
                  icon="pi pi-pencil"
                  rounded
                  text
                  @click="editItem(data)"
                  v-tooltip.top="$t('contentManager.edit')"
                />
                <Button
                  icon="pi pi-trash"
                  rounded
                  text
                  severity="danger"
                  @click="confirmDelete(data)"
                  v-tooltip.top="$t('contentManager.delete')"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- Add/Edit Item Dialog -->
    <Dialog
      v-model:visible="showAddDialog"
      :header="editingItem ? $t('contentManager.edit') : $t('contentManager.addNew')"
      :style="{ width: '500px' }"
      :modal="true"
    >
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

        <div class="form-group">
          <label for="itemDescription">{{ $t('contentManager.description') }}</label>
          <Textarea
            id="itemDescription"
            v-model="itemForm.description"
            rows="3"
            :placeholder="$t('contentManager.description')"
          />
        </div>

        <div class="form-group">
          <label for="itemPhoto">{{ $t('contentManager.primaryImage') }}</label>
          <FileUpload
            mode="basic"
            :customUpload="true"
            @select="handlePhotoSelect"
            :auto="false"
            accept="image/*"
            chooseLabel="Choose Image"
          />
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
            :placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="priority">{{ $t('contentManager.priority') }}</label>
            <InputNumber
              id="priority"
              v-model="itemForm.priority"
              :min="0"
            />
          </div>

          <div class="form-group">
            <label for="isFeature">{{ $t('contentManager.featureItem') }}</label>
            <ToggleSwitch
              id="isFeature"
              v-model="itemForm.is_feature"
            />
          </div>
        </div>

        <div class="form-actions">
          <Button
            type="button"
            :label="$t('common.cancel')"
            outlined
            @click="closeDialog"
          />
          <Button
            type="submit"
            :label="$t('common.save')"
            :loading="saving"
          />
        </div>
      </form>
    </Dialog>

    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { useContentStore } from '~/stores'
import { ContentType } from '~/types'
import { useConfirm } from 'primevue/useconfirm'

definePageMeta({
  middleware: 'auth',
})

const contentStore = useContentStore()
const confirm = useConfirm()
const { t } = useI18n()
const route = useRouter()
const router = useRouter()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const loading = ref(false)
const showAddDialog = ref(false)
const editingItem = ref<any>(null)
const saving = ref(false)

const contentType = ref<ContentType>(ContentType.ARTICLE)

const itemForm = ref({
  title: '',
  description: '',
  photo: null as File | null,
  photoPreview: '',
  video_url: '',
  priority: 0,
  is_feature: false,
})

const itemErrors = ref<Record<string, string>>({})

const contentId = computed(() => Number(route.params.id))

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
  itemForm.value.photoPreview = ''
}

const editItem = (item: any) => {
  editingItem.value = item
  itemForm.value = {
    title: item.title,
    description: item.description || '',
    photo: null,
    photoPreview: item.photo ? `${photoUrl}${item.photo}` : '',
    video_url: item.video_url || '',
    priority: item.priority,
    is_feature: item.is_feature || false,
  }
  showAddDialog.value = true
}

const closeDialog = () => {
  showAddDialog.value = false
  editingItem.value = null
  itemForm.value = {
    title: '',
    description: '',
    photo: null,
    photoPreview: '',
    video_url: '',
    priority: 0,
    is_feature: false,
  }
  itemErrors.value = {}
}

const handleSaveItem = async () => {
  if (!validateItemForm()) {
    return
  }

  saving.value = true

  try {
    const data = {
      title: itemForm.value.title,
      description: itemForm.value.description,
      video_url: itemForm.value.video_url,
      photo: itemForm.value.photo,
      priority: itemForm.value.priority,
      is_feature: itemForm.value.is_feature,
    }

    let result
    if (editingItem.value) {
      result = await contentStore.updateItem(editingItem.value.item_id, data)
    } else {
      result = await contentStore.saveItem(data)
    }

    if (result.success) {
      await contentStore.fetchItems(contentId.value)
      closeDialog()
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
  await contentStore.deleteItem(id)
}

onMounted(async () => {
  await contentStore.fetchContent(contentId.value)

  if (contentStore.currentContent) {
    contentType.value = contentStore.currentContent.content_type
  }

  await contentStore.fetchItems(contentId.value)
})
</script>

<style scoped>
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

.item-thumb {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
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
  max-height: 200px;
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
</style>
