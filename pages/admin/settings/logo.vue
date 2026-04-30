<template>
  <div>
    <form @submit.prevent="handleSave">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.logoPosition') }}</label>
            <select v-model="form.logo_pos" class="form-control">
              <option value="1">Top</option>
              <option value="2">Middle</option>
              <option value="3">Bottom</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.logoAlign') }}</label>
            <select v-model="form.logo_align" class="form-control">
              <option value="1">Left</option>
              <option value="2">Center</option>
              <option value="3">Right</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.uploadLogo') }} <span class="text-danger">(Height:97 pixels)</span></label>
            <input type="file" accept="image/*" @change="handleDesktopSelect" class="form-control" />
            <div v-if="desktopLogoPreview" style="margin-top:8px">
              <img :src="desktopLogoPreview" style="max-height:80px" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.mobileLogo') }} <span class="text-danger">(97 x 97 pixels)</span></label>
            <input type="file" accept="image/*" @change="handleMobileSelect" class="form-control" />
            <div v-if="mobileLogoPreview" style="margin-top:8px">
              <img :src="mobileLogoPreview" style="max-height:80px" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <button type="submit" class="btn btn-danger" :disabled="saving">
        <i class="fa fa-floppy-o"></i> {{ $t('settings.save') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useSettingStore } from '~/stores/setting'

const settingStore = useSettingStore()
const { t } = useI18n()
const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const form = ref({ logo_pos: '1', logo_align: '1' })
const desktopLogoFile = ref<File | null>(null)
const mobileLogoFile = ref<File | null>(null)
const desktopLogoPreview = ref('')
const mobileLogoPreview = ref('')
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleDesktopSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    desktopLogoFile.value = file
    desktopLogoPreview.value = URL.createObjectURL(file)
  }
}

const handleMobileSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    mobileLogoFile.value = file
    mobileLogoPreview.value = URL.createObjectURL(file)
  }
}

const handleSave = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  saving.value = true
  try {
    const data: any = { ...form.value }
    if (desktopLogoFile.value) data.logo = desktopLogoFile.value
    if (mobileLogoFile.value) data.mobileLogo = mobileLogoFile.value
    const success = await settingStore.updateLogoSettings(data)
    if (success) {
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
  await settingStore.fetchSettings()
  if (settingStore.settings) {
    form.value = {
      logo_pos: String(settingStore.settings.logo_pos || 1),
      logo_align: String(settingStore.settings.logo_align || 1),
    }
    if (settingStore.settings.logo) desktopLogoPreview.value = `${photoUrl}${settingStore.settings.logo}`
    if (settingStore.settings.mobile_logo) mobileLogoPreview.value = `${photoUrl}${settingStore.settings.mobile_logo}`
  }
})
</script>
