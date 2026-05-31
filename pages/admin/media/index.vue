<template>
  <div>
    <form @submit.prevent="handleSearch" style="margin-bottom:10px">
      <input type="text" v-model="searchQuery" class="form-control" :placeholder="$t('contentManager.search')" />
    </form>

    <div class="text-right" style="margin-bottom:10px">
      <a href="#" class="btn btn-info" @click.prevent="showUpload = !showUpload"><i class="fa fa-plus"></i></a>
    </div>

    <div v-if="showUpload" class="panel panel-info" style="margin-bottom:15px">
      <div class="panel-heading">{{ $t('mediaManager.uploadFile') }}</div>
      <div class="panel-body">
        <form @submit.prevent="handleUpload">
          <div class="form-group">
            <label>{{ $t('contentManager.contentTitle') }}</label>
            <input type="text" v-model="uploadForm.title" class="form-control" />
          </div>
          <div class="form-group">
            <label>{{ $t('mediaManager.uploadFile') }}</label>
            <input type="file" @change="handleFileSelect" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> {{ $t('contentManager.save')
            }}</button>
        </form>
      </div>
    </div>

    <DataTable :value="mediaStore.mediaList" :loading="loading" :paginator="true" :rows="pagination.limit"
      :totalRecords="pagination.total" :lazy="true" @page="onPageChange" :rowsPerPageOptions="[10, 20, 50]"
      stripedRows>
      <Column field="photo_id" header="#" :style="{ width: '80px' }" />
      <Column header="" :style="{ width: '60px' }">
        <template #body="{ data }">
          <a href="#" @click.prevent="previewUrl = photoUrl + data.file_name; showPreview = true">
            <i class="fa fa-eye fa-lg"></i>
          </a>
        </template>
      </Column>
      <Column field="title" :header="$t('contentManager.contentTitle')" />
      <Column field="file_name" :header="$t('mediaManager.url')">
        <template #body="{ data }">
          <a :href="photoUrl + data.file_name" target="_blank">{{ data.file_name }}</a>
        </template>
      </Column>
    </DataTable>

    <div v-if="showPreview"
      style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.9);z-index:9999;display:flex;align-items:center;justify-content:center"
      @click="showPreview = false">
      <button
        style="position:absolute;top:20px;right:20px;color:#FFF600;font-size:30px;background:none;border:none;cursor:pointer">&times;</button>
      <iframe :src="previewUrl" style="width:80%;max-width:700px;height:80%;max-height:700px;border:none"></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useMediaStore } from '~/stores/media'

const mediaStore = useMediaStore()
const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const searchQuery = ref('')
const showUpload = ref(false)
const showPreview = ref(false)
const previewUrl = ref('')
const uploadForm = ref({ title: '', file: null as File | null })
const loading = ref(false)

const pagination = computed(() => mediaStore.pagination)

const onPageChange = (event: any) => {
  loading.value = true
  mediaStore.fetchMedia(event.page + 1).finally(() => { loading.value = false })
}

const handleFileSelect = (e: Event) => {
  uploadForm.value.file = (e.target as HTMLInputElement).files?.[0] || null
}

const handleUpload = async () => {
  if (!uploadForm.value.file) return
  await mediaStore.uploadMedia(uploadForm.value.file)
  showUpload.value = false
  uploadForm.value = { title: '', file: null }
}

const handleSearch = () => { }

onMounted(async () => {
  loading.value = true
  await mediaStore.fetchMedia()
  loading.value = false
})
</script>
