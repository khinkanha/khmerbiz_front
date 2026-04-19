<template>
  <NuxtLayout name="blank">
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <h1 class="title">{{ $t('auth.login') }}</h1>
          <p class="subtitle">{{ $t('header.welcome') }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">{{ $t('auth.username') }}</label>
            <InputText
              id="username"
              v-model="form.username"
              :placeholder="$t('auth.username')"
              :class="{ 'p-invalid': errors.username }"
            />
            <small v-if="errors.username" class="p-error">{{ errors.username }}</small>
          </div>

          <div class="form-group">
            <label for="password">{{ $t('auth.password') }}</label>
            <Password
              id="password"
              v-model="form.password"
              :placeholder="$t('auth.password')"
              :feedback="false"
              toggleMask
              :class="{ 'p-invalid': errors.password }"
            />
            <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
          </div>

          <div class="form-actions">
            <Checkbox v-model="form.rememberMe" :binary="true" inputId="remember" />
            <label for="remember">{{ $t('auth.rememberMe') }}</label>
          </div>

          <Button
            type="submit"
            :loading="loading"
            :label="$t('auth.login')"
            class="w-full"
          />

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </form>

        <div class="login-footer">
          <p>{{ $t('auth.signup') }}? <NuxtLink to="/admin/signup">{{ $t('auth.signup') }}</NuxtLink></p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores'

definePageMeta({
  layout: 'blank',
  middleware: 'guest',
})

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  username: '',
  password: '',
  rememberMe: false,
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const errorMessage = ref('')

const validateForm = (): boolean => {
  errors.value = {}

  if (!form.value.username) {
    errors.value.username = $t('validation.required')
  }
  if (!form.value.password) {
    errors.value.password = $t('validation.required')
  }

  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const success = await authStore.login({
      username: form.value.username,
      password: form.value.password,
    })

    if (success) {
      router.push('/admin')
    } else {
      errorMessage.value = $t('auth.invalidCredentials')
    }
  } catch (error: any) {
    errorMessage.value = error.message || $t('auth.loginError')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  color: #718096;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #2d3748;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-actions label {
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;
}

.w-full {
  width: 100%;
}

.error-message {
  padding: 0.75rem;
  background-color: #fed7d7;
  color: #c53030;
  border-radius: 6px;
  font-size: 0.875rem;
  text-align: center;
}

.login-footer {
  margin-top: 1.5rem;
  text-align: center;
}

.login-footer p {
  color: #718096;
  font-size: 0.875rem;
}

.login-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>
