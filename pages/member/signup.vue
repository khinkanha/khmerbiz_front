<template>
  <div class="container">
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
      <ul v-if="fieldErrors.length" style="margin-top:5px;margin-bottom:0">
        <li v-for="err in fieldErrors" :key="err">{{ err }}</li>
      </ul>
    </div>
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
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" class="form-control" placeholder="Min 6 characters" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="email">{{ $t('userManager.email') }}</label>
            <input type="email" id="email" v-model="form.email" class="form-control" :placeholder="$t('userManager.email')" />
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
            <label for="domain_name">Website Domain</label>
            <input type="text" id="domain_name" v-model="form.domain_name" class="form-control" placeholder="e.g. mycompany.khmerbiz-front.localhost" />
            <small class="text-muted">This will be your website address</small>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-danger" :disabled="loading">
        <i class="fa fa-floppy-o"></i> {{ $t('auth.signup') }}
      </button>
      &nbsp;
      <NuxtLink to="/member/login" class="btn btn-info">{{ $t('auth.login') }}</NuxtLink>
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
  domain_name: '',
})

const loading = ref(false)
const errorMessage = ref('')
const fieldErrors = ref<string[]>([])
const successMessage = ref('')

const handleSignup = async () => {
  errorMessage.value = ''
  fieldErrors.value = []
  successMessage.value = ''

  if (!form.value.username || !form.value.email || !form.value.full_name || !form.value.password) {
    errorMessage.value = t('validation.required')
    return
  }

  if (form.value.password.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters'
    return
  }

  loading.value = true

  try {
    const result = await authStore.signup({
      username: form.value.username,
      email: form.value.email,
      full_name: form.value.full_name,
      password: form.value.password,
      phone: form.value.phone,
      domain_name: form.value.domain_name || undefined,
    } as any)

    if (result) {
      if (form.value.domain_name) {
        successMessage.value = 'Account created! Redirecting to setup...'
        setTimeout(() => navigateTo('/admin/setup'), 1000)
      } else {
        successMessage.value = t('auth.signupSuccess')
        setTimeout(() => navigateTo('/member/login'), 1500)
      }
    } else {
      errorMessage.value = t('auth.signupError')
    }
  } catch (error: any) {
    errorMessage.value = error.message || t('auth.signupError')
    if (error.errors?.length) {
      fieldErrors.value = error.errors
    }
  } finally {
    loading.value = false
  }
}
</script>
