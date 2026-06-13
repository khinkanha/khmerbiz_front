<template>
  <div class="content-list-page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('contentManager.title') }}</h1>
      <div class="page-actions">
        <Button :label="$t('contentManager.addNew')" icon="pi pi-plus" @click="$router.push('/admin/content/new')" />
        <!-- <Button
          label="Test"
          icon="pi pi-plus"
          @click="$router.push('/test')"
        />
        <NuxtLink to="/test">Go to Test</NuxtLink>
        -->
      </div>
    </div>

    <Card class="filter-card">
      <template #content>
        <div class="filter-row">
          <InputText v-model="searchQuery" :placeholder="$t('contentManager.search')" class="search-input" />
          <Dropdown v-model="contentTypeFilter" :options="contentTypeOptions" optionLabel="label" optionValue="value"
            :placeholder="$t('contentManager.contentType')" class="filter-dropdown" showClear />
          <!--<Dropdown v-model="statusFilter" :options="statusOptions" optionLabel="label" optionValue="value"
            :placeholder="$t('contentManager.status')" class="filter-dropdown" showClear />-->
          <Button :label="$t('contentManager.btnsearch')" icon="pi pi-search" @click="handleSearch" />
        </div>
      </template>
    </Card>

    <Card class="content-list-card">
      <template #content>
        <DataTable :value="contentStore.contents" :loading="loading" :paginator="true" :rows="pagination.limit"
          :totalRecords="pagination.total" :lazy="true" @page="onPageChange" :rowsPerPageOptions="[10, 20, 50]"
          stripedRows class="content-table">
          <Column field="content_id" header="ID" :style="{ width: '80px' }" />
          <Column field="title" :header="$t('contentManager.contentTitle')" />
          <Column field="content_type" :header="$t('contentManager.contentType')" :style="{ width: '150px' }">
            <template #body="{ data }">
              <Tag :value="getContentTypeLabel(data.content_type)" />
            </template>
          </Column>
          <!--<Column field="status" :header="$t('contentManager.status')" :style="{ width: '120px' }">
            <template #body="{ data }">
              <Tag :value="data.status === 1 ? $t('contentManager.published') : $t('contentManager.draft')"
                :severity="data.status === 1 ? 'success' : 'warning'" />
            </template>
          </Column>-->
          <Column :header="$t('contentManager.actions')" :style="{ width: '200px' }">
            <template #body="{ data }">
              <div class="action-buttons">
                <Button icon="pi pi-pencil" rounded text @click="$router.push(`/admin/content/${data.content_id}`)"
                  v-tooltip.top="$t('contentManager.edit')" />
                <Button v-if="data.content_type !== ContentType.ARTICLE" icon="pi pi-list" rounded text @click="$router.push(`/admin/content/${data.content_id}/items`)"
                  v-tooltip.top="$t('contentManager.list')" />
                <Button icon="pi pi-trash" rounded text severity="danger" @click="confirmDelete(data)"
                  v-tooltip.top="$t('contentManager.delete')" />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

import { ContentType } from '~/types'
import { useConfirm } from 'primevue/useconfirm'

const contentStore = useContentStore()
const confirm = useConfirm()
const { t } = useI18n()
const router = useRouter()

const loading = ref(false)
const searchQuery = ref('')
const contentTypeFilter = ref<number | null>(null)
const statusFilter = ref<number | null>(null)

const pagination = computed(() => contentStore.pagination)

const contentTypeOptions = [
  { label: t('contentManager.article'), value: ContentType.ARTICLE },
  { label: t('contentManager.photo'), value: ContentType.PHOTO },
  { label: t('contentManager.video'), value: ContentType.VIDEO },
  { label: t('contentManager.document'), value: ContentType.DOCUMENT },
  { label: t('contentManager.blogNews'), value: ContentType.NEWS },
  { label: 'Map', value: ContentType.MAP },
]

const statusOptions = [
  { label: t('contentManager.published'), value: 1 },
  { label: t('contentManager.draft'), value: 0 },
]

const getContentTypeLabel = (type: ContentType): string => {
  const option = contentTypeOptions.find(opt => opt.value === type)
  return option?.label || '-'
}

const onPageChange = (event: any) => {
  contentStore.fetchContents(event.page + 1, searchQuery.value, contentTypeFilter.value)
}

const handleSearch = () => {
  contentStore.fetchContents(1, searchQuery.value, contentTypeFilter.value)
}

const confirmDelete = (content: any) => {
  confirm.require({
    message: t('common.confirm'),
    header: t('common.warning'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => deleteContent(content.content_id),
    acceptClass: 'p-button-danger',
  })
}

const deleteContent = async (id: number) => {
  await contentStore.deleteContent(id)
}

onMounted(() => {
  contentStore.fetchContents()
})
</script>

<style scoped>
.content-list-page {
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

.filter-card {
  border: 1px solid #e2e8f0;
}

.filter-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-dropdown {
  min-width: 150px;
}

.content-list-card {
  border: 1px solid #e2e8f0;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

:deep(.content-table) {
  border: none;
}

:deep(.content-table .p-datatable-header) {
  background-color: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
}

:deep(.content-table .p-datatable-thead > tr > th) {
  background-color: #f7fafc;
  color: #4a5568;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
}

:deep(.content-table .p-datatable-tbody > tr > td) {
  border-bottom: 1px solid #e2e8f0;
}
</style>
