<template>
  <div>
    <div class="content-form-page">
      <div class="page-header">
        <h1 class="page-title">
          {{ isNewContent ? $t('contentManager.addNew') : $t('contentManager.edit') }}
        </h1>
        <div class="page-actions">
          <Button
            :label="$t('common.back')"
            icon="pi pi-arrow-left"
            outlined
            @click="$router.back()"
          />
          <Button
            :label="$t('common.save')"
            icon="pi pi-check"
            @click="handleSave"
            :loading="saving"
          />
        </div>
      </div>

      <div class="form-grid">
        <Card class="form-card">
          <template #title>{{ $t('contentManager.contentTitle') }}</template>
          <template #content>
            <form @submit.prevent="handleSave" class="content-form">
              <div class="form-group">
                <label for="title">{{ $t('contentManager.contentTitle') }} *</label>
                <InputText
                  id="title"
                  v-model="form.title"
                  :placeholder="$t('contentManager.contentTitle')"
                  :class="{ 'p-invalid': errors.title }"
                />
                <small v-if="errors.title" class="p-error">{{ errors.title }}</small>
              </div>

              <div class="form-group">
                <label for="contentType">{{ $t('contentManager.contentType') }} *</label>
                <Dropdown
                  id="contentType"
                  v-model="form.content_type"
                  :options="contentTypeOptions"
                  optionLabel="label"
                  optionValue="value"
                  :placeholder="$t('contentManager.contentType')"
                  :class="{ 'p-invalid': errors.content_type }"
                />
                <small v-if="errors.content_type" class="p-error">{{ errors.content_type }}</small>
              </div>

              <div class="form-group">
                <label for="description">{{ $t('contentManager.description') }}</label>
                <ClientOnly>
                  <Editor
                    v-model="form.description"
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                    :init="{
                      height: 300,
                      menubar: 'tools',
                      plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste',
                      toolbar: 'undo redo | bold italic underline | forecolor backcolor | fontselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | fullscreen',
                      branding: false,
                      promotion: false,
                    }"
                  />
                </ClientOnly>
              </div>

              <div class="form-group">
                <label for="language">{{ $t('settings.language') }} *</label>
                <Dropdown
                  id="language"
                  v-model="form.lang_id"
                  :options="[...domainStore.languages]"
                  optionLabel="lang_name"
                  optionValue="lang_id"
                  :placeholder="$t('settings.language')"
                  :class="{ 'p-invalid': errors.lang_id }"
                />
                <small v-if="errors.lang_id" class="p-error">{{ errors.lang_id }}</small>
              </div>

              <div class="form-group">
                <label for="status">{{ $t('contentManager.status') }}</label>
                <div class="status-toggle">
                  <ToggleSwitch
                    id="status"
                    :modelValue="form.status as any"
                    @update:modelValue="(v: any) => form.status = v"
                    :trueValue="1"
                    :falseValue="0"
                  />
                  <span>{{ form.status ? $t('contentManager.published') : $t('contentManager.draft') }}</span>
                </div>
              </div>

              <Message v-if="errorMessage" severity="error" :closable="false">
                {{ errorMessage }}
              </Message>
            </form>
          </template>
        </Card>

        <Card class="preview-card" v-if="!isNewContent">
          <template #title>{{ $t('contentManager.actions') }}</template>
          <template #content>
            <div class="action-links">
              <Button
                :label="$t('contentManager.list')"
                icon="pi pi-list"
                outlined
                @click="$router.push(`/admin/content/${contentId}/items`)"
                class="w-full mb-3"
              />
              <Button
                v-if="contentStore.currentContent?.content_type === ContentType.NEWS"
                :label="$t('contentManager.blogNews')"
                icon="pi pi-news"
                outlined
                @click="$router.push(`/admin/content/${contentId}/news`)"
                class="w-full mb-3"
              />
              <Button
                v-if="contentStore.currentContent?.content_type === ContentType.MAP"
                :label="$t('contentManager.showMap')"
                icon="pi pi-map"
                outlined
                @click="$router.push(`/admin/content/${contentId}/map`)"
                class="w-full"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ContentType } from '~/types'
import Editor from '@tinymce/tinymce-vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

import { useContentStore } from '~/stores/content'
import { useDomainStore } from '~/stores/domain'
import { useAuthStore } from '~/stores/auth'

const contentStore = useContentStore()
const domainStore = useDomainStore()
const authStore = useAuthStore()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const contentId = computed(() => {
  const id = route.params.id
  return id === 'new' ? null : Number(id)
})

const isNewContent = computed(() => contentId.value === null)

const form = ref({
  title: '',
  description: '',
  content_type: ContentType.ARTICLE,
  lang_id: null as number | null,
  status: 0 as boolean | string | number | undefined,
})

const errors = ref<Record<string, string>>({})
const saving = ref(false)
const errorMessage = ref('')

const contentTypeOptions = [
  { label: t('contentManager.article'), value: ContentType.ARTICLE },
  { label: t('contentManager.photo'), value: ContentType.PHOTO },
  { label: t('contentManager.video'), value: ContentType.VIDEO },
  { label: t('contentManager.document'), value: ContentType.DOCUMENT },
  { label: t('contentManager.blogNews'), value: ContentType.NEWS },
  { label: 'Map', value: ContentType.MAP },
]

const validateForm = (): boolean => {
  errors.value = {}

  if (!form.value.title) {
    errors.value.title = t('validation.required')
  }

  if (form.value.content_type === null) {
    errors.value.content_type = t('validation.required')
  }

  if (form.value.lang_id === null) {
    errors.value.lang_id = t('validation.required')
  }

  return Object.keys(errors.value).length === 0
}

const handleSave = async () => {
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  saving.value = true

  try {
    let result: boolean | { success: boolean; id?: number }

    if (isNewContent.value) {
      result = await contentStore.saveContent({
        title: form.value.title,
        description: form.value.description,
        content_type: form.value.content_type,
        lang_id: form.value.lang_id!,
        menu_id: 0,
      })
    } else {
      result = await contentStore.updateContent(contentId.value!, {
        title: form.value.title,
        description: form.value.description,
      })
    }

    if (result === true || (typeof result === 'object' && result.success)) {
      router.push('/admin/content')
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
  await domainStore.resolveDomain(authStore.user?.domain_id)

  if (domainStore.languages.length > 0) {
    form.value.lang_id = domainStore.languages[0].lang_id
  }

  if (!isNewContent.value) {
    await contentStore.fetchContent(contentId.value!)

    if (contentStore.currentContent) {
      const raw = contentStore.currentContent as any
      let desc = raw.description || ''
      try {
        const parsed = JSON.parse(desc)
        desc = parsed.description || parsed.longdes || desc
      } catch {}
      form.value = {
        title: raw.title,
        description: desc,
        content_type: raw.content_type,
        lang_id: raw.lang_id,
        status: raw.status,
      }
    }
  }
})
</script>

<style scoped>
.content-form-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.page-actions {
  display: flex;
  gap: 0.75rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-card, .preview-card {
  border: 1px solid #e2e8f0;
}

.content-form {
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
  color: #4a5568;
  font-size: 0.875rem;
}

.status-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-toggle span {
  font-size: 0.875rem;
  color: #4a5568;
}

.action-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.w-full {
  width: 100%;
}

.mb-3 {
  margin-bottom: 0.75rem;
}
</style>
