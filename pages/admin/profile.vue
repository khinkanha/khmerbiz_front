<template>
  <div class="profile-page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('userManager.profileSetting') }}</h1>
    </div>

    <Card class="profile-card">
      <template #title>
        {{ $t('userManager.fullName') }}
      </template>
      <template #content>
        <form @submit.prevent="handleUpdateProfile" class="profile-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="username">{{ $t('userManager.username') }}</label>
              <InputText
                id="username"
                :value="authStore.user?.username"
                disabled
              />
            </div>

            <div class="form-group">
              <label for="email">{{ $t('userManager.email') }}</label>
              <InputText
                id="email"
                v-model="form.email"
                :class="{ 'p-invalid': errors.email }"
              />
              <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
            </div>

            <div class="form-group">
              <label for="fullName">{{ $t('userManager.fullName') }}</label>
              <InputText
                id="fullName"
                v-model="form.full_name"
                :class="{ 'p-invalid': errors.full_name }"
              />
              <small v-if="errors.full_name" class="p-error">{{ errors.full_name }}</small>
            </div>

            <div class="form-group">
              <label for="phone">{{ $t('userManager.phone') }}</label>
              <InputText
                id="phone"
                v-model="form.phone"
                :class="{ 'p-invalid': errors.phone }"
              />
              <small v-if="errors.phone" class="p-error">{{ errors.phone }}</small>
            </div>

            <div class="form-group">
              <label>{{ $t('userManager.role') }}</label>
              <InputText
                :value="getRoleName(authStore.user?.user_level)"
                disabled
              />
            </div>

            <div class="form-group">
              <label>{{ $t('userManager.domain') }}</label>
              <InputText
                :value="authStore.user?.domain_id ? `#${authStore.user.domain_id}` : '-'"
                disabled
              />
            </div>
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
import { UserLevel } from '~/types'

definePageMeta({
  middleware: 'auth',
})

const authStore = useAuthStore()
const { t } = useI18n()

const form = ref({
  email: '',
  full_name: '',
  phone: '',
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const getRoleName = (level?: number): string => {
  if (level === UserLevel.SUPPER_ADMIN) return 'Super Admin'
  if (level === UserLevel.WEB_ADMIN) return 'Web Admin'
  if (level === UserLevel.NORMAL) return t('userManager.subscriber')
  return '-'
}

onMounted(() => {
  if (authStore.user) {
    form.value = {
      email: authStore.user.email || '',
      full_name: authStore.user.full_name || '',
      phone: authStore.user.phone || '',
    }
  }
})

const validateForm = (): boolean => {
  errors.value = {}

  if (!form.value.email) {
    errors.value.email = t('validation.required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = t('validation.email')
  }

  if (!form.value.full_name) {
    errors.value.full_name = t('validation.required')
  }

  return Object.keys(errors.value).length === 0
}

const handleUpdateProfile = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const success = await authStore.updateProfile(form.value)

    if (success) {
      successMessage.value = t('common.success')
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
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

<style scoped>
.profile-page {
  max-width: 800px;
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

.profile-card {
  border: 1px solid #e2e8f0;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
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
