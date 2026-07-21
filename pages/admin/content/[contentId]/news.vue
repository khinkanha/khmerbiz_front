<template>
  <div class="news-page">
    <div class="page-header">
      <h1 class="page-title">
        {{ $t('contentManager.blogNews') }}: {{ contentStore.currentContent?.title }}
      </h1>
      <div class="page-actions">
        <Button
          :label="$t('contentManager.addNew')"
          icon="pi pi-plus"
          @click="showAddDialog = true"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <DataTable
          :value="contentStore.newsList"
          :loading="loading"
          :paginator="true"
          :rows="20"
          stripedRows
          class="news-table"
        >
          <Column field="news_id" header="ID" :style="{ width: '80px' }" />
          <Column field="title" :header="$t('contentManager.contentTitle')" />
          <Column
            field="photo"
            :header="$t('contentManager.primaryImage')"
            :style="{ width: '120px' }"
          >
            <template #body="{ data }">
              <img
                v-if="data.photo"
                :src="`${photoUrl}${data.photo}`"
                :alt="data.title"
                class="news-thumb"
              />
              <span v-else>-</span>
            </template>
          </Column>
          <Column
            field="publish_date"
            :header="$t('contentManager.publishDate')"
            :style="{ width: '150px' }"
          >
            <template #body="{ data }">
              {{ formatDate(data.publish_date) }}
            </template>
          </Column>
          <Column
            field="status"
            :header="$t('contentManager.status') || 'Status'"
            :style="{ width: '100px' }"
          >
            <template #body="{ data }">
              <Tag
                :value="data.status === 1 ? ($t('contentManager.notShow') || 'Not Show') : ($t('contentManager.show') || 'Show')"
                :severity="data.status === 1 ? 'secondary' : 'success'"
              />
            </template>
          </Column>
          <Column
            :header="$t('contentManager.actions')"
            :style="{ width: '150px' }"
          >
            <template #body="{ data }">
              <div class="action-buttons">
                <Button
                  icon="pi pi-pencil"
                  rounded
                  text
                  @click="editNews(data)"
                  v-tooltip.top="$t('contentManager.edit')"
                />
                <Button
                  icon="pi pi-trash"
                  rounded
                  text
                  severity="danger"
                  @click="confirmDelete(data)"
                  v-tooltip.top="$t('contentManager.delete')"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- Add/Edit News Dialog -->
    <Dialog
      v-model:visible="showAddDialog"
      :header="editingNews ? $t('contentManager.edit') : $t('contentManager.addNew')"
      :style="{ width: '600px' }"
      :modal="true"
    >
      <form @submit.prevent="handleSaveNews" class="news-form">
        <div class="form-group">
          <label for="newsTitle">{{ $t('contentManager.contentTitle') }} *</label>
          <InputText
            id="newsTitle"
            v-model="newsForm.title"
            :placeholder="$t('contentManager.contentTitle')"
            :class="{ 'p-invalid': newsErrors.title }"
          />
          <small v-if="newsErrors.title" class="p-error">{{ newsErrors.title }}</small>
        </div>

        <div class="form-group">
          <label for="shortDescription">{{ $t('contentManager.shortDescription') }} *</label>
          <Textarea
            id="shortDescription"
            v-model="newsForm.short_description"
            rows="3"
            :placeholder="$t('contentManager.shortDescription')"
            :class="{ 'p-invalid': newsErrors.short_description }"
          />
          <small v-if="newsErrors.short_description" class="p-error">{{ newsErrors.short_description }}</small>
        </div>

        <div class="form-group">
          <label for="description">{{ $t('contentManager.description') }} *</label>
          <ClientOnly>
            <HtmlBlockEditor v-model="newsForm.description" />
          </ClientOnly>
          <small v-if="newsErrors.description" class="p-error">{{ newsErrors.description }}</small>
        </div>

        <div class="form-group">
          <label for="newsPhoto">{{ $t('contentManager.primaryImage') }}</label>
          <FileUpload
            mode="basic"
            :customUpload="true"
            @select="handlePhotoSelect"
            :auto="false"
            accept="image/*"
            chooseLabel="Choose Image"
          />
          <div v-if="newsForm.photoPreview" class="photo-preview">
            <img :src="newsForm.photoPreview" alt="Preview" />
            <Button
              icon="pi pi-times"
              rounded
              text
              severity="danger"
              @click="clearPhoto"
              class="remove-photo"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="publishDate">{{ $t('contentManager.publishDate') }}</label>
          <Calendar
            id="publishDate"
            v-model="newsForm.publish_date"
            showTime
            hourFormat="12"
            dateFormat="yy-mm-dd"
          />
        </div>

        <div class="form-group">
          <label for="newsStatus">{{ $t('contentManager.status') || 'Status' }}</label>
          <div class="status-toggle">
            <InputSwitch
              id="newsStatus"
              v-model="newsForm.status"
            />
            <span class="status-label">{{ newsForm.status ? $t('contentManager.show') || 'Show' : $t('contentManager.notShow') || 'Not Show' }}</span>
          </div>
        </div>

        <div class="form-actions">
          <Button
            type="button"
            :label="$t('common.cancel')"
            outlined
            @click="closeDialog"
          />
          <Button
            type="submit"
            :label="$t('common.save')"
            :loading="saving"
          />
        </div>
      </form>
    </Dialog>

    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

import { useConfirm } from 'primevue/useconfirm'
import { ContentType } from '~/types'
import HtmlBlockEditor from '~/components/admin/HtmlBlockEditor.vue'

const contentStore = useContentStore()
const confirm = useConfirm()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const loading = ref(false)
const showAddDialog = ref(false)
const editingNews = ref<any>(null)
const saving = ref(false)

const newsForm = ref({
  title: '',
  short_description: '',
  description: '',
  photo: null as File | null,
  photoPreview: '',
  publish_date: new Date(),
  status: true,
})

const newsErrors = ref<Record<string, string>>({})

const contentId = computed(() => Number(route.params.contentId))

const formatDate = (date: string | null) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString()
}

const validateNewsForm = (): boolean => {
  newsErrors.value = {}

  if (!newsForm.value.title) {
    newsErrors.value.title = t('validation.required')
  }

  if (!newsForm.value.short_description) {
    newsErrors.value.short_description = t('validation.required')
  }

  if (!newsForm.value.description) {
    newsErrors.value.description = t('validation.required')
  }

  return Object.keys(newsErrors.value).length === 0
}

const handlePhotoSelect = (event: any) => {
  const file = event.files[0]
  if (file) {
    newsForm.value.photo = file
    newsForm.value.photoPreview = URL.createObjectURL(file)
  }
}

const clearPhoto = () => {
  newsForm.value.photo = null
  newsForm.value.photoPreview = ''
}

const editNews = (news: any) => {
  editingNews.value = news
  newsForm.value = {
    title: news.title,
    short_description: news.short_description || '',
    description: news.description || '',
    photo: null,
    photoPreview: news.photo ? `${photoUrl}${news.photo}` : '',
    publish_date: news.publish_date ? new Date(news.publish_date) : new Date(),
    status: news.status !== 1,
  }
  showAddDialog.value = true
}

const closeDialog = () => {
  showAddDialog.value = false
  editingNews.value = null
  newsForm.value = {
    title: '',
    short_description: '',
    description: '',
    photo: null,
    photoPreview: '',
    publish_date: new Date(),
    status: true,
  }
  newsErrors.value = {}
}

const handleSaveNews = async () => {
  if (!validateNewsForm()) {
    return
  }

  saving.value = true

  try {
    const publishDate = newsForm.value.publish_date
      ? newsForm.value.publish_date.toISOString().slice(0, 19).replace('T', ' ')
      : undefined

    const data = {
      title: newsForm.value.title,
      short_description: newsForm.value.short_description,
      description: newsForm.value.description,
      photo: newsForm.value.photo,
      publish_date: publishDate,
      status: newsForm.value.status ? 0 : 1,
    }

    let result: boolean | { success: boolean; id?: number }
    if (editingNews.value) {
      result = await contentStore.updateNews(contentId.value, editingNews.value.news_id, data)
    } else {
      result = await contentStore.saveNews(contentId.value, data)
    }

    if (result === true || (typeof result === 'object' && result.success)) {
      await contentStore.fetchNews(contentId.value)
      closeDialog()
    }
  } finally {
    saving.value = false
  }
}

const confirmDelete = (news: any) => {
  confirm.require({
    message: t('common.confirm'),
    header: t('common.warning'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => deleteNews(news.news_id),
    acceptClass: 'p-button-danger',
  })
}

const deleteNews = async (id: number) => {
  await contentStore.deleteNews(contentId.value, id)
}

onMounted(async () => {
  await contentStore.fetchContent(contentId.value)
  if (contentStore.currentContent?.content_type === ContentType.NEWS) {
    await contentStore.fetchNews(contentId.value)
  }
})
</script>

<style scoped>
.news-page {
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

.news-thumb {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.news-form {
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

.status-label {
  font-size: 0.875rem;
  color: #4a5568;
}

.photo-preview {
  position: relative;
  margin-top: 0.5rem;
}

.photo-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
}

.remove-photo {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}
</style>
