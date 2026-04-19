<template>
  <div class="banner-settings-page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('settings.slideshowSetting') }}</h1>
      <div class="page-actions">
        <Button
          :label="$t('settings.addImage')"
          icon="pi pi-plus"
          @click="showAddDialog = true"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <DataTable
          :value="settingStore.banners"
          :loading="loading"
          stripedRows
          class="banners-table"
          :reorderableRows="true"
          @rowReorder="onRowReorder"
        >
          <Column :rowReorder="true" headerStyle="width: 3rem" :reorderableColumn="false" />
          <Column header="Image" :style="{ width: '200px' }">
            <template #body="{ data }">
              <img
                :src="`${photoUrl}${data.photo}`"
                :alt="data.title"
                class="banner-thumb"
              />
            </template>
          </Column>
          <Column field="title" :header="$t('settings.imageTitle')" />
          <Column field="link" :header="$t('settings.imageLink')" />
          <Column
            field="banner_order"
            :header="$t('settings.imageOrder')"
            :style="{ width: '100px' }"
          />
          <Column
            field="status"
            :header="$t('contentManager.status')"
            :style="{ width: '100px' }"
          >
            <template #body="{ data }">
              <Tag
                :value="data.status ? 'Active' : 'Inactive'"
                :severity="data.status ? 'success' : 'secondary'"
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
                  @click="editBanner(data)"
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

    <!-- Add/Edit Banner Dialog -->
    <Dialog
      v-model:visible="showAddDialog"
      :header="editingBanner ? $t('contentManager.edit') : $t('settings.addImage')"
      :style="{ width: '500px' }"
      :modal="true"
    >
      <form @submit.prevent="handleSaveBanner" class="banner-form">
        <div class="form-group">
          <label for="bannerTitle">{{ $t('settings.imageTitle') }}</label>
          <InputText
            id="bannerTitle"
            v-model="bannerForm.title"
            :placeholder="$t('settings.imageTitle')"
          />
        </div>

        <div class="form-group">
          <label for="bannerLink">{{ $t('settings.imageLink') }}</label>
          <InputText
            id="bannerLink"
            v-model="bannerForm.link"
            placeholder="https://..."
          />
        </div>

        <div class="form-group">
          <label for="bannerOrder">{{ $t('settings.imageOrder') }}</label>
          <InputNumber
            id="bannerOrder"
            v-model="bannerForm.banner_order"
            :min="0"
          />
        </div>

        <div class="form-group">
          <label for="bannerImage">{{ $t('settings.imageSize') }}</label>
          <FileUpload
            mode="basic"
            :customUpload="true"
            @select="handleImageSelect"
            :auto="false"
            accept="image/*"
            chooseLabel="Choose Image"
          />
          <div v-if="bannerForm.photoPreview" class="photo-preview">
            <img :src="bannerForm.photoPreview" alt="Preview" />
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

        <div class="form-group">
          <label for="bannerStatus">{{ $t('contentManager.status') }}</label>
          <div class="status-toggle">
            <ToggleSwitch
              id="bannerStatus"
              v-model="bannerForm.status"
            />
            <span>{{ bannerForm.status ? 'Active' : 'Inactive' }}</span>
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
import { useSettingStore } from '~/stores'
import { useConfirm } from 'primevue/useconfirm'

definePageMeta({
  middleware: 'auth',
})

const settingStore = useSettingStore()
const confirm = useConfirm()
const { t } = useI18n()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const loading = ref(false)
const showAddDialog = ref(false)
const editingBanner = ref<any>(null)
const saving = ref(false)

const bannerForm = ref({
  title: '',
  link: '',
  banner_order: 0,
  photo: null as File | null,
  photoPreview: '',
  status: true,
})

const handleImageSelect = (event: any) => {
  const file = event.files[0]
  if (file) {
    bannerForm.value.photo = file
    bannerForm.value.photoPreview = URL.createObjectURL(file)
  }
}

const clearPhoto = () => {
  bannerForm.value.photo = null
  bannerForm.value.photoPreview = ''
}

const editBanner = (banner: any) => {
  editingBanner.value = banner
  bannerForm.value = {
    title: banner.title || '',
    link: banner.link || '',
    banner_order: banner.banner_order || 0,
    photo: null,
    photoPreview: banner.photo ? `${photoUrl}${banner.photo}` : '',
    status: banner.status === 1,
  }
  showAddDialog.value = true
}

const closeDialog = () => {
  showAddDialog.value = false
  editingBanner.value = null
  bannerForm.value = {
    title: '',
    link: '',
    banner_order: 0,
    photo: null,
    photoPreview: '',
    status: true,
  }
}

const handleSaveBanner = async () => {
  saving.value = true

  try {
    const data = {
      title: bannerForm.value.title,
      link: bannerForm.value.link,
      banner_order: bannerForm.value.banner_order,
      photo: bannerForm.value.photo,
      status: bannerForm.value.status ? 1 : 0,
    }

    let result
    if (editingBanner.value) {
      result = await settingStore.updateBanner(editingBanner.value.banner_id, data)
    } else {
      result = await settingStore.addBanner(data)
    }

    if (result.success) {
      await settingStore.fetchBanners()
      closeDialog()
    }
  } finally {
    saving.value = false
  }
}

const confirmDelete = (banner: any) => {
  confirm.require({
    message: t('common.confirm'),
    header: t('common.warning'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => deleteBanner(banner.banner_id),
    acceptClass: 'p-button-danger',
  })
}

const deleteBanner = async (id: number) => {
  await settingStore.deleteBanner(id)
}

const onRowReorder = (event: any) => {
  // Update banner_order based on new positions
  settingStore.banners.forEach((banner, index) => {
    banner.banner_order = index
  })
}

onMounted(async () => {
  await settingStore.fetchBanners()
})
</script>

<style scoped>
.banner-settings-page {
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

.banner-thumb {
  width: 150px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.banner-form {
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

.status-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-toggle span {
  font-size: 0.875rem;
  color: #4a5568;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}
</style>
