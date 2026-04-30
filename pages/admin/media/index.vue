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
    
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>{{ $t('contentManager.contentTitle') }}</th>
            <th>{{ $t('mediaManager.url') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(media, i) in mediaStore.mediaList" :key="media.photo_id">
            <td>{{ i + 1 }}</td>
            <td>
              <a href="#" @click.prevent="previewUrl = photoUrl + media.file_name; showPreview = true">
                <i class="fa fa-eye fa-lg"></i>
              </a>
            </td>
            <td>{{ media.title }}</td>
            <td><a :href="photoUrl + media.file_name" target="_blank">{{ media.file_name }}</a></td>
          </tr>
        </tbody>
      </table>
    </div>

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

const handleFileSelect = (e: Event) => {
  uploadForm.value.file = (e.target as HTMLInputElement).files?.[0] || null
}

const handleUpload = async () => {
  if (!uploadForm.value.file) return
  await mediaStore.uploadMedia({ title: uploadForm.value.title, file: uploadForm.value.file })
  showUpload.value = false
  uploadForm.value = { title: '', file: null }
}

const handleSearch = () => { }

onMounted(async () => {
  await mediaStore.fetchMedia()
})
</script>
