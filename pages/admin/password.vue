<template>
  <div>
    <p class="h3">{{ $t('userManager.passwordSetting') }}</p>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <form @submit.prevent="handleChangePassword">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="cpassword">{{ $t('userManager.currentPassword') }}</label>
            <input type="password" id="cpassword" v-model="form.current_password" class="form-control" :placeholder="$t('userManager.currentPassword')" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="npassword">{{ $t('userManager.newPassword') }}</label>
            <input type="password" id="npassword" v-model="form.new_password" class="form-control" :placeholder="$t('userManager.newPassword')" />
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-danger" :disabled="loading">
        <i class="fa fa-floppy-o"></i> {{ $t('userManager.save') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const { t } = useI18n()

const form = ref({ current_password: '', new_password: '', confirm_password: '' })
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleChangePassword = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  if (!form.value.current_password || !form.value.new_password) {
    errorMessage.value = t('validation.required')
    return
  }
  loading.value = true
  try {
    const result = await authStore.changePassword({
      current_password: form.value.current_password,
      new_password: form.value.new_password,
      confirm_password: form.value.new_password,
    })
    if (result.success) {
      successMessage.value = result.message || t('common.success')
      form.value = { current_password: '', new_password: '', confirm_password: '' }
      setTimeout(() => { successMessage.value = '' }, 3000)
    } else {
      errorMessage.value = result.message || t('common.error')
    }
  } catch (error: any) {
    errorMessage.value = error.message || t('common.error')
  } finally {
    loading.value = false
  }
}
</script>
