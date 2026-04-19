<template>
  <div class="logo-settings-page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('settings.logoSetting') }}</h1>
    </div>

    <div class="logo-grid">
      <Card class="logo-card">
        <template #title>Desktop Logo</template>
        <template #content>
          <div class="logo-uploader">
            <div v-if="desktopLogoPreview" class="logo-preview">
              <img :src="desktopLogoPreview" alt="Desktop Logo" />
              <Button
                icon="pi pi-times"
                rounded
                text
                severity="danger"
                @click="clearDesktopLogo"
                class="remove-btn"
              />
            </div>
            <FileUpload
              v-else
              mode="basic"
              :customUpload="true"
              @select="handleDesktopLogoSelect"
              :auto="false"
              accept="image/*"
              chooseLabel="Upload Desktop Logo"
            />
          </div>
        </template>
      </Card>

      <Card class="logo-card">
        <template #title>Mobile Logo</template>
        <template #content>
          <div class="logo-uploader">
            <div v-if="mobileLogoPreview" class="logo-preview">
              <img :src="mobileLogoPreview" alt="Mobile Logo" />
              <Button
                icon="pi pi-times"
                rounded
                text
                severity="danger"
                @click="clearMobileLogo"
                class="remove-btn"
              />
            </div>
            <FileUpload
              v-else
              mode="basic"
              :customUpload="true"
              @select="handleMobileLogoSelect"
              :auto="false"
              accept="image/*"
              chooseLabel="Upload Mobile Logo"
            />
          </div>
        </template>
      </Card>
    </div>

    <div class="form-actions">
      <Button
        :label="$t('settings.save')"
        @click="handleSave"
        :loading="saving"
      />
    </div>

    <Message v-if="successMessage" severity="success" :closable="false">
      {{ successMessage }}
    </Message>

    <Message v-if="errorMessage" severity="error" :closable="false">
      {{ errorMessage }}
    </Message>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from '~/stores'

definePageMeta({
  middleware: 'auth',
})

const settingStore = useSettingStore()
const { t } = useI18n()
const config = useRuntimeConfig()

const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const desktopLogoFile = ref<File | null>(null)
const mobileLogoFile = ref<File | null>(null)
const desktopLogoPreview = ref('')
const mobileLogoPreview = ref('')

const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleDesktopLogoSelect = (event: any) => {
  const file = event.files[0]
  if (file) {
    desktopLogoFile.value = file
    desktopLogoPreview.value = URL.createObjectURL(file)
  }
}

const clearDesktopLogo = () => {
  desktopLogoFile.value = null
  desktopLogoPreview.value = ''
}

const handleMobileLogoSelect = (event: any) => {
  const file = event.files[0]
  if (file) {
    mobileLogoFile.value = file
    mobileLogoPreview.value = URL.createObjectURL(file)
  }
}

const clearMobileLogo = () => {
  mobileLogoFile.value = null
  mobileLogoPreview.value = ''
}

const handleSave = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  saving.value = true

  try {
    const data: {
      logo?: File | string
      mobileLogo?: File | string
    } = {}

    if (desktopLogoFile.value) {
      data.logo = desktopLogoFile.value
    } else if (desktopLogoPreview.value) {
      data.logo = desktopLogoPreview.value
    }

    if (mobileLogoFile.value) {
      data.mobileLogo = mobileLogoFile.value
    } else if (mobileLogoPreview.value) {
      data.mobileLogo = mobileLogoPreview.value
    }

    const success = await settingStore.updateLogoSettings(data)

    if (success) {
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
  await settingStore.fetchSettings()

  if (settingStore.settings) {
    if (settingStore.settings.logo) {
      desktopLogoPreview.value = `${photoUrl}${settingStore.settings.logo}`
    }
    if (settingStore.settings.mobile_logo) {
      mobileLogoPreview.value = `${photoUrl}${settingStore.settings.mobile_logo}`
    }
  }
})
</script>

<style scoped>
.logo-settings-page {
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

.logo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.logo-card {
  border: 1px solid #e2e8f0;
}

.logo-uploader {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.logo-preview {
  position: relative;
  padding: 1rem;
  border: 1px dashed #e2e8f0;
  border-radius: 8px;
  background-color: #f7fafc;
}

.logo-preview img {
  max-width: 100%;
  max-height: 150px;
  display: block;
  margin: 0 auto;
}

.remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}
</style>
