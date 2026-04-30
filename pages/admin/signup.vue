<template>
  <div class="container">
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

    <form @submit.prevent="handleSignup">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="username">{{ $t('userManager.username') }}</label>
            <input type="text" id="username" v-model="form.username" class="form-control" :placeholder="$t('userManager.username')" />
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
            <input type="text" id="phone" v-model="form.phone" class="form-control" :placeholder="$t('userManager.phone')" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="email">{{ $t('userManager.email') }}</label>
            <input type="email" id="email" v-model="form.email" class="form-control" :placeholder="$t('userManager.email')" />
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-danger" :disabled="loading">
        <i class="fa fa-floppy-o"></i> {{ $t('auth.signup') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'guest',
})

import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const { t } = useI18n()

const form = ref({
  username: '',
  full_name: '',
  phone: '',
  email: '',
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleSignup = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.value.username || !form.value.email || !form.value.full_name) {
    errorMessage.value = t('validation.required')
    return
  }

  loading.value = true

  try {
    const success = await authStore.signup({
      username: form.value.username,
      email: form.value.email,
      full_name: form.value.full_name,
      password: form.value.username + '123',
      phone: form.value.phone,
    })

    if (success) {
      successMessage.value = t('auth.signupSuccess')
      setTimeout(() => navigateTo('/admin/login'), 1500)
    } else {
      errorMessage.value = t('auth.signupError')
    }
  } catch (error: any) {
    errorMessage.value = error.message || t('auth.signupError')
  } finally {
    loading.value = false
  }
}
</script>
