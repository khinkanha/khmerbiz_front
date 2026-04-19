<template>
  <NuxtLayout name="blank">
    <div class="signup-container">
      <div class="signup-box">
        <div class="signup-header">
          <h1 class="title">{{ $t('auth.signup') }}</h1>
          <p class="subtitle">{{ $t('userManager.subtitle') }}</p>
        </div>

        <form @submit.prevent="handleSignup" class="signup-form">
          <div class="form-group">
            <label for="username">{{ $t('userManager.username') }} *</label>
            <InputText
              id="username"
              v-model="form.username"
              :placeholder="$t('userManager.username')"
              :class="{ 'p-invalid': errors.username }"
            />
            <small v-if="errors.username" class="p-error">{{ errors.username }}</small>
          </div>

          <div class="form-group">
            <label for="email">{{ $t('userManager.email') }} *</label>
            <InputText
              id="email"
              v-model="form.email"
              type="email"
              :placeholder="$t('userManager.email')"
              :class="{ 'p-invalid': errors.email }"
            />
            <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
          </div>

          <div class="form-group">
            <label for="fullName">{{ $t('userManager.fullName') }} *</label>
            <InputText
              id="fullName"
              v-model="form.full_name"
              :placeholder="$t('userManager.fullName')"
              :class="{ 'p-invalid': errors.full_name }"
            />
            <small v-if="errors.full_name" class="p-error">{{ errors.full_name }}</small>
          </div>

          <div class="form-group">
            <label for="phone">{{ $t('userManager.phone') }}</label>
            <InputText
              id="phone"
              v-model="form.phone"
              :placeholder="$t('userManager.phone')"
            />
          </div>

          <div class="form-group">
            <label for="password">{{ $t('userManager.password') }} *</label>
            <Password
              id="password"
              v-model="form.password"
              :placeholder="$t('userManager.password')"
              toggleMask
              :class="{ 'p-invalid': errors.password }"
            />
            <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
          </div>

          <div class="form-group">
            <label for="confirmPassword">{{ $t('auth.confirmPassword') }} *</label>
            <Password
              id="confirmPassword"
              v-model="form.confirmPassword"
              :placeholder="$t('auth.confirmPassword')"
              toggleMask
              :feedback="false"
              :class="{ 'p-invalid': errors.confirmPassword }"
            />
            <small v-if="errors.confirmPassword" class="p-error">{{ errors.confirmPassword }}</small>
          </div>

          <Button
            type="submit"
            :loading="loading"
            :label="$t('auth.signup')"
            class="w-full"
          />

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
        </form>

        <div class="signup-footer">
          <p>{{ $t('auth.login') }}? <NuxtLink to="/admin/login">{{ $t('auth.login') }}</NuxtLink></p>
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
  email: '',
  full_name: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const validateForm = (): boolean => {
  errors.value = {}

  if (!form.value.username) {
    errors.value.username = $t('validation.required')
  } else if (form.value.username.length < 3) {
    errors.value.username = $t('validation.minLength', { min: 3 })
  }

  if (!form.value.email) {
    errors.value.email = $t('validation.required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = $t('validation.email')
  }

  if (!form.value.full_name) {
    errors.value.full_name = $t('validation.required')
  }

  if (!form.value.password) {
    errors.value.password = $t('validation.required')
  } else if (form.value.password.length < 6) {
    errors.value.password = $t('validation.minLength', { min: 6 })
  }

  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = $t('validation.required')
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = $t('validation.passwordMismatch')
  }

  return Object.keys(errors.value).length === 0
}

const handleSignup = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const success = await authStore.signup({
      username: form.value.username,
      email: form.value.email,
      full_name: form.value.full_name,
      password: form.value.password,
      phone: form.value.phone,
    })

    if (success) {
      successMessage.value = $t('auth.signupSuccess')
      setTimeout(() => {
        router.push('/admin')
      }, 1500)
    } else {
      errorMessage.value = $t('auth.signupError')
    }
  } catch (error: any) {
    errorMessage.value = error.message || $t('auth.signupError')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.signup-box {
  width: 100%;
  max-width: 440px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-height: 90vh;
  overflow-y: auto;
}

.signup-header {
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

.signup-form {
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

.success-message {
  padding: 0.75rem;
  background-color: #c6f6d5;
  color: #276749;
  border-radius: 6px;
  font-size: 0.875rem;
  text-align: center;
}

.signup-footer {
  margin-top: 1.5rem;
  text-align: center;
}

.signup-footer p {
  color: #718096;
  font-size: 0.875rem;
}

.signup-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.signup-footer a:hover {
  text-decoration: underline;
}
</style>
