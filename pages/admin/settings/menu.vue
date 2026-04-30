<template>
  <div>
    <form @submit.prevent="handleSave">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.menuPosition') }}</label>
            <select v-model="form.menu_pos" class="form-control">
              <option value="1">Top</option>
              <option value="2">Middle</option>
              <option value="3">Bottom</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.menuAlignment') }}</label>
            <select v-model="form.menu_align" class="form-control">
              <option value="1">Left</option>
              <option value="2">Center</option>
              <option value="3">Right</option>
            </select>
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

const form = ref({ menu_pos: '1', menu_align: '1' })
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSave = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  saving.value = true
  try {
    const success = await settingStore.updateSettings(form.value)
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
      menu_pos: String(settingStore.settings.menu_pos || 1),
      menu_align: String(settingStore.settings.menu_align || 1),
    }
  }
})
</script>
