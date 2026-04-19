<template>
  <div class="settings-page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('sidebar.otherSetting') }}</h1>
    </div>

    <Card class="settings-card">
      <template #content>
        <form @submit.prevent="handleSave" class="settings-form">
          <div class="form-section">
            <h3>General Settings</h3>

            <div class="form-group">
              <label for="websiteTitle">{{ $t('settings.websiteTitle') }} *</label>
              <InputText
                id="websiteTitle"
                v-model="form.title"
                :placeholder="$t('settings.websiteTitle')"
                :class="{ 'p-invalid': errors.title }"
              />
              <small v-if="errors.title" class="p-error">{{ errors.title }}</small>
            </div>

            <div class="form-group">
              <label for="pageStyle">{{ $t('settings.pageStyle') }}</label>
              <Dropdown
                id="pageStyle"
                v-model="form.page_style"
                :options="pageStyleOptions"
                optionLabel="label"
                optionValue="value"
                :placeholder="$t('settings.pageStyle')"
              />
            </div>

            <div class="form-group">
              <label for="themeStyle">{{ $t('settings.themeStyle') }}</label>
              <Dropdown
                id="themeStyle"
                v-model="form.theme"
                :options="themeStyleOptions"
                optionLabel="label"
                optionValue="value"
                :placeholder="$t('settings.themeStyle')"
              />
            </div>

            <div class="form-group">
              <label for="trackingId">{{ $t('settings.googleAnalytics') }}</label>
              <InputText
                id="trackingId"
                v-model="form.tracking_id"
                placeholder="UA-XXXXXXXXX-X"
              />
            </div>

            <div class="form-group">
              <label for="chatScript">{{ $t('settings.widgetChat') }}</label>
              <Textarea
                id="chatScript"
                v-model="form.chat_script"
                rows="4"
                placeholder="Paste your chat widget script here"
              />
            </div>

            <div class="form-group">
              <label for="footerText">Footer Text</label>
              <Textarea
                id="footerText"
                v-model="form.footer"
                rows="4"
                placeholder="Footer content"
              />
            </div>

            <div class="form-group">
              <label for="backgroundImage">{{ $t('settings.backgroundImage') }}</label>
              <InputText
                id="backgroundImage"
                v-model="form.background"
                placeholder="Image URL"
              />
            </div>
          </div>

          <div class="form-actions">
            <Button
              type="submit"
              :label="$t('settings.save')"
              :loading="saving"
            />
          </div>

          <Message v-if="successMessage" severity="success" :closable="false">
            {{ successMessage }}
          </Message>

          <Message v-if="errorMessage" severity="error" :closable="false">
            {{ errorMessage }}
          </Message>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from '~/stores'

definePageMeta({
  middleware: 'auth',
})

const settingStore = useSettingStore()
const { t } = useI18n()

const form = ref({
  title: '',
  page_style: 0,
  theme: 0,
  tracking_id: '',
  chat_script: '',
  footer: '',
  background: '',
})

const errors = ref<Record<string, string>>({})
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const pageStyleOptions = [
  { label: 'Classic Multi-Page', value: 0 },
  { label: 'Scrolling Single-Page', value: 1 },
  { label: 'Magazine/News Grid', value: 2 },
  { label: 'Fullscreen Hero', value: 3 },
]

const themeStyleOptions = [
  { label: 'Default', value: 0 },
  { label: 'Inverse', value: 1 },
  { label: 'Red', value: 2 },
  { label: 'Green', value: 3 },
  { label: 'Purple', value: 4 },
  { label: 'Yellow', value: 5 },
]

const validateForm = (): boolean => {
  errors.value = {}

  if (!form.value.title) {
    errors.value.title = t('validation.required')
  }

  return Object.keys(errors.value).length === 0
}

const handleSave = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  saving.value = true

  try {
    const success = await settingStore.updateSettings(form.value)

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
    form.value = {
      title: settingStore.settings.title || '',
      page_style: settingStore.settings.page_style || 0,
      theme: settingStore.settings.theme || 0,
      tracking_id: settingStore.settings.tracking_id || '',
      chat_script: settingStore.settings.chat_script || '',
      footer: settingStore.settings.footer || '',
      background: settingStore.settings.background || '',
    }
  }
})
</script>

<style scoped>
.settings-page {
  max-width: 800px;
  margin: 0 auto;
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

.settings-card {
  border: 1px solid #e2e8f0;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}
</style>
