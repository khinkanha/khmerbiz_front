<template>
  <div class="products-page">
    <div class="page-header">
      <h1 class="page-title">
        Products / Services: {{ contentStore.currentContent?.title }}
      </h1>
      <div class="page-actions">
        <Button
          label="Add New"
          icon="pi pi-plus"
          @click="openAddDialog"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <DataTable
          :value="contentStore.productList"
          :loading="loading"
          :paginator="true"
          :rows="20"
          stripedRows
          class="products-table"
        >
          <Column field="id" header="ID" :style="{ width: '70px' }" />
          <Column field="name" header="Name">
            <template #body="{ data }">
              <strong>{{ data.name }}</strong>
            </template>
          </Column>
          <Column header="Price" :style="{ width: '130px' }">
            <template #body="{ data }">
              <span v-if="data.price !== undefined && data.price !== null">
                {{ formatPrice(data.price) }}<small v-if="data.currency"> {{ data.currency }}</small>
              </span>
              <span v-else>-</span>
            </template>
          </Column>
          <Column header="Photo" :style="{ width: '90px' }">
            <template #body="{ data }">
              <img
                v-if="data.photos && data.photos.length"
                :src="`${photoUrl}${data.photos[0]}`"
                :alt="data.name"
                class="product-thumb"
              />
              <span v-else>-</span>
            </template>
          </Column>
          <Column header="Features" :style="{ width: '100px' }">
            <template #body="{ data }">
              <Badge v-if="data.features && data.features.length" :value="data.features.length" />
              <span v-else>-</span>
            </template>
          </Column>
          <Column field="priority" header="Priority" :style="{ width: '90px' }" />
          <Column header="Status" :style="{ width: '100px' }">
            <template #body="{ data }">
              <Tag
                :value="data.status === 1 ? 'Hidden' : 'Visible'"
                :severity="data.status === 1 ? 'secondary' : 'success'"
              />
            </template>
          </Column>
          <Column header="Actions" :style="{ width: '120px' }">
            <template #body="{ data }">
              <div class="action-buttons">
                <Button
                  icon="pi pi-pencil"
                  rounded
                  text
                  v-tooltip.top="'Edit'"
                  @click="editProduct(data)"
                />
                <Button
                  icon="pi pi-trash"
                  rounded
                  text
                  severity="danger"
                  v-tooltip.top="'Delete'"
                  @click="confirmDelete(data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- Add/Edit Dialog -->
    <Dialog
      v-model:visible="showDialog"
      :header="editing ? 'Edit Product' : 'Add Product'"
      :style="{ width: '720px' }"
      :modal="true"
    >
      <form @submit.prevent="handleSave" class="product-form">
        <div class="form-group">
          <label>Name *</label>
          <InputText v-model="form.name" placeholder="Product or service name" :class="{ 'p-invalid': errors.name }" />
          <small v-if="errors.name" class="p-error">{{ errors.name }}</small>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Price</label>
            <InputNumber v-model="form.price" mode="decimal" :minFractionDigits="0" :maxFractionDigits="2" placeholder="0.00" />
          </div>
          <div class="form-group">
            <label>Currency</label>
            <Dropdown v-model="form.currency" :options="currencies" placeholder="USD" showClear />
          </div>
          <div class="form-group">
            <label>Priority</label>
            <InputNumber v-model="form.priority" :min="0" :max="4" />
          </div>
        </div>

        <div class="form-group">
          <label>Short Description</label>
          <Textarea v-model="form.shortdes" rows="2" placeholder="One-line summary" />
        </div>

        <div class="form-group">
          <label>Full Description</label>
          <ClientOnly>
            <HtmlBlockEditor v-model="form.longdes" />
          </ClientOnly>
        </div>

        <div class="form-group">
          <label>Features</label>
          <div class="feature-list">
            <div v-for="(feat, idx) in form.features" :key="idx" class="feature-row">
              <InputText v-model="form.features[idx]" placeholder="e.g. 100% organic" />
              <Button icon="pi pi-times" rounded text severity="danger" @click="removeFeature(idx)" />
            </div>
          </div>
          <Button label="Add Feature" icon="pi pi-plus" outlined size="small" @click="addFeature" />
        </div>

        <div class="form-group">
          <label>Photos</label>
          <ClientOnly>
            <MediaPicker v-model="form.photos" />
            <template #fallback>
              <div class="media-picker-loading">
                <ProgressSpinner style="width: 30px; height: 30px" />
                <span>Loading media picker...</span>
              </div>
            </template>
          </ClientOnly>
        </div>

        <div class="form-group">
          <label>Status</label>
          <div class="status-toggle">
            <InputSwitch v-model="form.visible" />
            <span>{{ form.visible ? 'Visible' : 'Hidden' }}</span>
          </div>
        </div>

        <div class="form-actions">
          <Button type="button" label="Cancel" outlined @click="closeDialog" />
          <Button type="submit" label="Save" :loading="saving" />
        </div>
      </form>
    </Dialog>

    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { ContentType } from '~/types'
import HtmlBlockEditor from '~/components/admin/HtmlBlockEditor.vue'
import MediaPicker from '~/components/admin/MediaPicker.vue'

const contentStore = useContentStore()
const confirm = useConfirm()
const toast = useToast()
const route = useRoute()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const loading = ref(false)
const showDialog = ref(false)
const editing = ref<any>(null)
const saving = ref(false)
const uploading = ref(false)

const currencies = ['USD', 'KHR', 'THB', 'CNY', 'EUR']

const form = ref({
  name: '',
  price: null as number | null,
  currency: 'USD',
  shortdes: '',
  longdes: '',
  features: [] as string[],
  photos: [] as string[],
  priority: 0,
  visible: true,
})

const errors = ref<Record<string, string>>({})

const contentId = computed(() => Number(route.params.contentId))

const formatPrice = (price: number) => {
  return Number(price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

const resetForm = () => {
  form.value = {
    name: '',
    price: null,
    currency: 'USD',
    shortdes: '',
    longdes: '',
    features: [],
    photos: [],
    priority: 0,
    visible: true,
  }
  errors.value = {}
}

const openAddDialog = () => {
  editing.value = null
  resetForm()
  showDialog.value = true
}

const editProduct = (product: any) => {
  editing.value = product
  form.value = {
    name: product.name || '',
    price: product.price ?? null,
    currency: product.currency || 'USD',
    shortdes: product.shortdes || '',
    longdes: product.longdes || '',
    features: Array.isArray(product.features) ? [...product.features] : [],
    photos: Array.isArray(product.photos) ? [...product.photos] : [],
    priority: product.priority ?? 0,
    visible: product.status !== 1,
  }
  showDialog.value = true
}

const closeDialog = () => {
  showDialog.value = false
  editing.value = null
  resetForm()
}

const addFeature = () => {
  form.value.features.push('')
}

const removeFeature = (idx: number) => {
  form.value.features.splice(idx, 1)
}

const validateForm = (): boolean => {
  errors.value = {}
  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
  }
  // strip empty feature strings before save
  form.value.features = form.value.features.filter(f => f.trim() !== '')
  return Object.keys(errors.value).length === 0
}

const handleSave = async () => {
  if (!validateForm()) return
  saving.value = true
  try {
    const payload = {
      name: form.value.name,
      price: form.value.price ?? undefined,
      currency: form.value.currency,
      shortdes: form.value.shortdes || undefined,
      longdes: form.value.longdes || undefined,
      features: form.value.features,
      photos: form.value.photos,
      priority: form.value.priority,
      status: form.value.visible ? 0 : 1,
    }

    let result: boolean | { success: boolean; id?: number }
    if (editing.value) {
      result = await contentStore.updateProduct(contentId.value, editing.value.id, payload)
    } else {
      result = await contentStore.saveProduct(contentId.value, payload)
    }

    if (result === true || (typeof result === 'object' && result.success)) {
      await contentStore.fetchProducts(contentId.value)
      toast.add({ severity: 'success', summary: 'Saved', life: 2000 })
      closeDialog()
    } else {
      toast.add({ severity: 'error', summary: 'Save failed', detail: 'Please check console for details', life: 5000 })
    }
  } catch (error: any) {
    console.error('Save error:', error)
    toast.add({ severity: 'error', summary: 'Save failed', detail: error.message, life: 5000 })
  } finally {
    saving.value = false
  }
}

const confirmDelete = (product: any) => {
  confirm.require({
    message: `Delete "${product.name}"?`,
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      const ok = await contentStore.deleteProduct(contentId.value, product.id)
      if (ok) {
        toast.add({ severity: 'success', summary: 'Deleted', life: 2000 })
      } else {
        toast.add({ severity: 'error', summary: 'Delete failed', life: 3000 })
      }
    },
    acceptClass: 'p-button-danger',
  })
}

onMounted(async () => {
  await contentStore.fetchContent(contentId.value)
  if (contentStore.currentContent?.content_type === ContentType.PRODUCT) {
    loading.value = true
    await contentStore.fetchProducts(contentId.value)
    loading.value = false
  }
})
</script>

<style scoped>
.products-page {
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

.product-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.product-form {
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.feature-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.photo-item {
  position: relative;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 1;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-remove {
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(255, 255, 255, 0.9);
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.media-picker-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  color: #6c757d;
  font-size: 0.875rem;
}
</style>
