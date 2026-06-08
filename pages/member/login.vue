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
          <div class="form-group">
            <div id="recaptcha-login"></div>
          </div>
          <button type="submit" class="btn btn-danger" :disabled="loading">
            <i class="fa fa-sign-in-alt"></i> {{ $t('auth.login') }}
          </button>
          &nbsp;
          <NuxtLink to="/member/signup" class="btn btn-info">{{ $t('auth.signup') }}</NuxtLink>
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
import { useRecaptcha } from '~/composables/useRecaptcha'

const authStore = useAuthStore()
const { t } = useI18n()
const { render: renderRecaptcha, getResponse: getRecaptchaResponse, reset: resetRecaptcha } = useRecaptcha()

const form = ref({
  username: '',
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')

onMounted(() => {
  renderRecaptcha('recaptcha-login')
})

const handleLogin = async () => {
  errorMessage.value = ''

  if (!form.value.username || !form.value.password) {
    errorMessage.value = t('validation.required')
    return
  }

  const recaptchaToken = getRecaptchaResponse()
  if (!recaptchaToken) {
    errorMessage.value = 'Please complete the reCAPTCHA'
    return
  }

  loading.value = true

  try {
    const success = await authStore.login({
      username: form.value.username,
      password: form.value.password,
      recaptchaToken,
    } as any)

    if (success) {
      navigateTo('/admin')
    } else {
      errorMessage.value = t('auth.invalidCredentials')
      resetRecaptcha()
    }
  } catch (error: any) {
    errorMessage.value = error.message || t('auth.loginError')
    resetRecaptcha()
  } finally {
    loading.value = false
  }
}
</script>
