<template>
  <div class="password-page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('userManager.passwordSetting') }}</h1>
    </div>

    <Card class="password-card">
      <template #title>
        {{ $t('userManager.newPassword') }}
      </template>
      <template #content>
        <form @submit.prevent="handleChangePassword" class="password-form">
          <div class="form-group">
            <label for="currentPassword">{{ $t('userManager.currentPassword') }} *</label>
            <Password
              id="currentPassword"
              v-model="form.current_password"
              :placeholder="$t('userManager.currentPassword')"
              toggleMask
              :feedback="false"
              :class="{ 'p-invalid': errors.current_password }"
            />
            <small v-if="errors.current_password" class="p-error">{{ errors.current_password }}</small>
          </div>

          <div class="form-group">
            <label for="newPassword">{{ $t('userManager.newPassword') }} *</label>
            <Password
              id="newPassword"
              v-model="form.new_password"
              :placeholder="$t('userManager.newPassword')"
              toggleMask
              :class="{ 'p-invalid': errors.new_password }"
            />
            <small v-if="errors.new_password" class="p-error">{{ errors.new_password }}</small>
          </div>

          <div class="form-group">
            <label for="confirmPassword">{{ $t('auth.confirmPassword') }} *</label>
            <Password
              id="confirmPassword"
              v-model="form.confirm_password"
              :placeholder="$t('auth.confirmPassword')"
              toggleMask
              :feedback="false"
              :class="{ 'p-invalid': errors.confirm_password }"
            />
            <small v-if="errors.confirm_password" class="p-error">{{ errors.confirm_password }}</small>
          </div>

          <div class="form-actions">
            <Button
              type="submit"
              :loading="loading"
              :label="$t('userManager.save')"
            />
          </div>

          <Message v-if="successMessage" severity="success" :closable="false">
            {{ successMessage }}
          </Message>

          <Message v-if="errorMessage" severity="error" :closable="false">
            {{ errorMessage }}
          </Message>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores'

definePageMeta({
  middleware: 'auth',
})

const authStore = useAuthStore()
const { t } = useI18n()

const form = ref({
  current_password: '',
  new_password: '',
  confirm_password: '',
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const validateForm = (): boolean => {
  errors.value = {}

  if (!form.value.current_password) {
    errors.value.current_password = t('validation.required')
  }

  if (!form.value.new_password) {
    errors.value.new_password = t('validation.required')
  } else if (form.value.new_password.length < 6) {
    errors.value.new_password = t('validation.minLength', { min: 6 })
  }

  if (!form.value.confirm_password) {
    errors.value.confirm_password = t('validation.required')
  } else if (form.value.new_password !== form.value.confirm_password) {
    errors.value.confirm_password = t('validation.passwordMismatch')
  }

  return Object.keys(errors.value).length === 0
}

const handleChangePassword = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const result = await authStore.changePassword({
      current_password: form.value.current_password,
      new_password: form.value.new_password,
      confirm_password: form.value.confirm_password,
    })

    if (result.success) {
      successMessage.value = result.message || t('common.success')
      form.value = {
        current_password: '',
        new_password: '',
        confirm_password: '',
      }
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
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

<style scoped>
.password-page {
  max-width: 500px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.password-card {
  border: 1px solid #e2e8f0;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #4a5568;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
