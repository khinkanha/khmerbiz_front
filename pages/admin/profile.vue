<template>
  <div>
    <p class="h3">{{ $t('userManager.profileSetting') }}</p>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <form @submit.prevent="handleUpdateProfile">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="email">{{ $t('userManager.email') }}</label>
            <input type="email" id="email" v-model="form.email" class="form-control" :placeholder="$t('userManager.email')" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="fullname">{{ $t('userManager.fullName') }}</label>
            <input type="text" id="fullname" v-model="form.full_name" class="form-control" :placeholder="$t('userManager.fullName')" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="phone">{{ $t('userManager.phone') }}</label>
            <input type="text" id="phone" v-model="form.phone" class="form-control" placeholder="XXX-XXX-XXXX" />
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

const form = ref({ email: '', full_name: '', phone: '' })
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

onMounted(() => {
  if (authStore.user) {
    form.value = {
      email: authStore.user.email || '',
      full_name: authStore.user.full_name || '',
      phone: authStore.user.phone || '',
    }
  }
})

const handleUpdateProfile = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  if (!form.value.email || !form.value.full_name) {
    errorMessage.value = t('validation.required')
    return
  }
  loading.value = true
  try {
    const success = await authStore.updateProfile(form.value)
    if (success) {
      successMessage.value = t('common.success')
      setTimeout(() => { successMessage.value = '' }, 3000)
    } else {
      errorMessage.value = t('common.error')
    }
  } catch (error: any) {
    errorMessage.value = error.message || t('common.error')
  } finally {
    loading.value = false
  }
}
</script>
