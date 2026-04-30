<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">{{ $t('auth.username') }}</label>
            <input type="text" id="username" v-model="form.username" class="form-control" :placeholder="$t('auth.username')" />
          </div>
          <div class="form-group">
            <label for="password">{{ $t('auth.password') }}</label>
            <input type="password" id="password" v-model="form.password" class="form-control" :placeholder="$t('auth.password')" />
          </div>
          <button type="submit" class="btn btn-danger" :disabled="loading">
            <i class="fa fa-sign-in-alt"></i> {{ $t('auth.login') }}
          </button>
          &nbsp;
          <NuxtLink to="/admin/signup" class="btn btn-info">{{ $t('auth.signup') }}</NuxtLink>
        </form>
      </div>
    </div>
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
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  if (!form.value.username || !form.value.password) {
    errorMessage.value = t('validation.required')
    return
  }

  loading.value = true

  try {
    const success = await authStore.login({
      username: form.value.username,
      password: form.value.password,
    })

    if (success) {
      navigateTo('/admin')
    } else {
      errorMessage.value = t('auth.invalidCredentials')
    }
  } catch (error: any) {
    errorMessage.value = error.message || t('auth.loginError')
  } finally {
    loading.value = false
  }
}
</script>
