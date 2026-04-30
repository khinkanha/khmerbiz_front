<template>
  <div class="menu-edit-page">
    <div class="page-header">
      <div class="header-left">
        <Button
          icon="pi pi-arrow-left"
          text
          @click="navigateTo('/admin/menu')"
        />
        <h1 class="page-title">{{ $t('menuManager.edit') }}</h1>
      </div>
    </div>

    <Card v-if="menuItem" class="settings-card">
      <template #content>
        <form @submit.prevent="handleSave" class="menu-form">
          <div class="form-group">
            <label for="menuName">{{ $t('menuManager.menuName') }}</label>
            <InputText
              id="menuName"
              v-model="form.item_name"
              :placeholder="$t('menuManager.menuName')"
              class="full-width"
            />
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="menuLanguage">{{ $t('menuManager.language') }}</label>
              <Dropdown
                id="menuLanguage"
                v-model="form.lang_id"
                :options="languageOptions"
                optionLabel="lang_name"
                optionValue="lang_id"
                :placeholder="$t('menuManager.language')"
                class="full-width"
              >
                <template #option="{ option }">
                  <div class="lang-option">
                    <img :src="`/flag/${option.flag_icon}`" class="flag-icon-sm" />
                    <span>{{ option.lang_name }}</span>
                  </div>
                </template>
              </Dropdown>
            </div>

            <div class="form-group flex-1">
              <label for="menuParent">{{ $t('menuManager.parentMenu') }}</label>
              <Dropdown
                id="menuParent"
                v-model="form.parent_id"
                :options="parentOptions"
                optionLabel="label"
                optionValue="value"
                :placeholder="$t('menuManager.parentMenu')"
                class="full-width"
              />
            </div>
          </div>

          <div class="form-actions">
            <Button
              type="submit"
              :label="$t('common.save')"
              :loading="saving"
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

    <div v-else-if="loading" class="loading-state">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

import { useMenuStore } from '~/stores/menu'
import { useDomainStore } from '~/stores/domain'
import type { Language } from '~/types'

const route = useRoute()
const menuStore = useMenuStore()
const domainStore = useDomainStore()
const { t } = useI18n()

const menuItem = ref<any>(null)
const loading = ref(true)
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const form = ref({
  item_name: '',
  lang_id: 0,
  parent_id: 0,
  item_order: 0,
})

const languageOptions = computed(() => domainStore.languages as Language[])

const parentOptions = computed(() => {
  const options = [{ label: 'Root', value: 0 }]
  const currentId = Number(route.params.id)

  const flatten = (items: any[], depth = 0) => {
    for (const item of items) {
      if (item.item_id !== currentId && item.item_name) {
        const prefix = '  '.repeat(depth)
        options.push({ label: `${prefix}↳ ${item.item_name}`, value: item.item_id })
      }
      if (item.children?.length) {
        flatten(item.children, depth + 1)
      }
    }
  }
  flatten([...menuStore.menuTree])
  return options
})

const handleSave = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!form.value.item_name) return

  saving.value = true

  try {
    const success = await menuStore.updateMenuItem(Number(route.params.id), {
      item_name: form.value.item_name,
      lang_id: form.value.lang_id,
      parent_id: form.value.parent_id,
      item_order: form.value.item_order,
    })

    if (success) {
      successMessage.value = t('common.success')
      setTimeout(() => { successMessage.value = '' }, 3000)
    } else {
      errorMessage.value = t('common.error')
    }
  } catch (error: any) {
    errorMessage.value = error.message || t('common.error')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  const id = Number(route.params.id)
  const item = await menuStore.fetchMenuItem(id)

  if (item) {
    menuItem.value = item
    form.value = {
      item_name: item.item_name || '',
      lang_id: item.lang_id,
      parent_id: item.parent_id,
      item_order: item.item_order,
    }

    if (item.lang_id) {
      await menuStore.fetchMenuTree(item.lang_id)
    }
  }

  loading.value = false
})
</script>

<style scoped>
.menu-edit-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.settings-card {
  border: 1px solid #e2e8f0;
}

.menu-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.flex-1 { flex: 1; }

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

.full-width {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.flag-icon-sm {
  width: 20px;
  height: 14px;
  object-fit: cover;
  border-radius: 2px;
}

.loading-state {
  display: flex;
  justify-content: center;
  padding: 3rem;
}

@media (max-width: 576px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
