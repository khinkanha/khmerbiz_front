<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="handleSaveSettings">
          <div class="form-group">
            <label>{{ $t('settings.slidePosition') }}</label>
            <select v-model="settingsForm.banner_pos" class="form-control">
              <option :value="1">Top</option>
              <option :value="2">Middle</option>
              <option :value="3">Bottom</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ $t('settings.slideMode') }}</label>
            <select v-model="settingsForm.banner_mode" class="form-control">
              <option :value="1">On</option>
              <option :value="0">Off</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ $t('settings.slideDisplay') }}</label>
            <div>
              <label style="font-weight:normal"><input type="radio" v-model="settingsForm.banner_display" :value="0" /> Default Page</label>
              <label style="font-weight:normal;margin-left:15px"><input type="radio" v-model="settingsForm.banner_display" :value="1" /> All Pages</label>
            </div>
          </div>
          <button type="submit" class="btn btn-danger" :disabled="savingSettings">
            <i class="fa fa-floppy-o"></i> {{ $t('settings.save') }}
          </button>
        </form>
      </div>
      <div class="col-md-8">
        <div class="text-right" style="margin-bottom:10px">
          <a href="#" class="btn btn-success" @click.prevent="showAdd = !showAdd">
            <i class="fa fa-plus"></i>
          </a>
        </div>

        <div v-if="showAdd" class="panel panel-info" style="margin-bottom:15px">
          <div class="panel-heading">{{ $t('settings.addImage') }}</div>
          <div class="panel-body">
            <form @submit.prevent="handleSaveBanner">
              <div class="form-group">
                <label>{{ $t('settings.imageTitle') }}</label>
                <input type="text" v-model="bannerForm.title" class="form-control" />
              </div>
              <div class="form-group">
                <label>Description</label>
                <input type="text" v-model="bannerForm.description" class="form-control" />
              </div>
              <div class="form-group">
                <label>Language</label>
                <select v-model="bannerForm.lang_id" class="form-control">
                  <option v-for="lang in domainStore.languages" :key="lang.lang_id" :value="lang.lang_id">
                    {{ lang.lang_name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Image URL</label>
                <input type="text" v-model="bannerForm.imageUrl" class="form-control" placeholder="banner/1s1.jpg" />
              </div>
              <div class="form-group">
                <label>Or Upload Image</label>
                <input type="file" accept="image/*" @change="handleImageSelect" class="form-control" />
                <div v-if="bannerForm.photoPreview" style="margin-top:5px">
                  <img :src="bannerForm.photoPreview" style="max-height:100px" />
                </div>
              </div>
              <button type="submit" class="btn btn-danger">
                <i class="fa fa-floppy-o"></i> {{ $t('contentManager.save') }}
              </button>
            </form>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>{{ $t('settings.imageTitle') }}</th>
                <th>{{ $t('settings.imageLink') }}</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(banner, i) in settingStore.banners" :key="banner.banner_id">
                <td>{{ i + 1 }}</td>
                <td><img v-if="banner.image" :src="`${photoUrl}${banner.image}`" style="height:50px;border-radius:4px" /></td>
                <td>{{ banner.title }}</td>
                <td>{{ banner.link }}</td>
                <td>
                  <button class="btn btn-sm btn-danger" @click="confirmDelete(banner)">
                    <i class="pi pi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useSettingStore } from '~/stores/setting'
import { useDomainStore } from '~/stores/domain'
import type { BannerForm } from '~/types'
import { useToast } from 'primevue/usetoast'

const settingStore = useSettingStore()
const domainStore = useDomainStore()
const toast = useToast()
const { t } = useI18n()
const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const showAdd = ref(false)
const savingSettings = ref(false)

const settingsForm = ref({ banner_pos: 1, banner_mode: 1, banner_display: 0 })

const defaultLangId = computed(() => {
  const langs = domainStore.languages
  const defaultLang = langs.find((l: any) => l.is_default === 1)
  return defaultLang?.lang_id ?? langs[0]?.lang_id ?? 1
})

const bannerForm = ref({
  title: '',
  description: '',
  link: '',
  photo: null as File | null,
  photoPreview: '',
  imageUrl: '',
  lang_id: defaultLangId.value,
})

const handleImageSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    bannerForm.value.photo = file
    bannerForm.value.imageUrl = ''
    bannerForm.value.photoPreview = URL.createObjectURL(file)
  }
}

import { useToast } from 'primevue/usetoast'

const handleSaveSettings = async () => {
  savingSettings.value = true
  try {
    const success = await settingStore.updateBanner(settingsForm.value)
    if (success) {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Banner settings updated', life: 3000 })
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update banner settings', life: 3000 })
    }
  } catch {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update banner settings', life: 3000 })
  } finally {
    savingSettings.value = false
  }
}

const handleSaveBanner = async () => {
  // Use imageUrl string if provided, otherwise use file upload
  const photo = bannerForm.value.photo || (bannerForm.value.imageUrl || null)
  const data: BannerForm = {
    title: bannerForm.value.title,
    description: bannerForm.value.description,
    link: bannerForm.value.link,
    photo,
    banner_order: 0,
    status: 1,
    image: null,
    lang_id: bannerForm.value.lang_id,
  }
  const result = await settingStore.addBanner(data)
  if (result.success) {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Banner added', life: 3000 })
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to add banner', life: 3000 })
  }
  await settingStore.fetchBanners()
  showAdd.value = false
  bannerForm.value = { title: '', description: '', link: '', photo: null, photoPreview: '', imageUrl: '', lang_id: defaultLangId.value }
}

const confirmDelete = async (banner: any) => {
  if (confirm('Are you sure you want to delete this banner?')) {
    const success = await settingStore.deleteBanner(banner.banner_id)
    if (success) {
      toast.add({ severity: 'success', summary: 'Deleted', detail: 'Banner deleted', life: 3000 })
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete banner', life: 3000 })
    }
  }
}

onMounted(async () => {
  await settingStore.fetchBanners()
  await settingStore.fetchSettings()
  if (settingStore.settings) {
    settingsForm.value = {
      banner_pos: settingStore.settings.banner_pos || 1,
      banner_mode: settingStore.settings.banner_mode ?? 1,
      banner_display: settingStore.settings.banner_display ?? 0,
    }
  }
})
</script>
