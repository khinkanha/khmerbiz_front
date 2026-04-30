<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="handleSaveSettings">
          <div class="form-group">
            <label>{{ $t('settings.slidePosition') }}</label>
            <select v-model="settingsForm.banner_pos" class="form-control">
              <option value="1">Top</option>
              <option value="2">Middle</option>
              <option value="3">Bottom</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ $t('settings.slideMode') }}</label>
            <select v-model="settingsForm.banner_mode" class="form-control">
              <option value="1">On</option>
              <option value="0">Off</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ $t('settings.slideDisplay') }}</label>
            <div>
              <label style="font-weight:normal"><input type="radio" v-model="settingsForm.banner_display" value="0" /> Default Page</label>
              <label style="font-weight:normal;margin-left:15px"><input type="radio" v-model="settingsForm.banner_display" value="1" /> All Pages</label>
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
                <label>{{ $t('settings.imageLink') }}</label>
                <input type="text" v-model="bannerForm.link" class="form-control" placeholder="https://..." />
              </div>
              <div class="form-group">
                <label>{{ $t('settings.imageSize') }}</label>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(banner, i) in settingStore.banners" :key="banner.banner_id">
                <td>{{ i + 1 }}</td>
                <td><img v-if="banner.photo" :src="`${photoUrl}${banner.photo}`" style="height:50px;border-radius:4px" /></td>
                <td>{{ banner.title }}</td>
                <td>{{ banner.link }}</td>
                <td>
                  <a href="#" @click.prevent="confirmDelete(banner)" class="text-danger">
                    <i class="fa fa-trash-o fa-lg"></i>
                  </a>
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

const settingStore = useSettingStore()
const { t } = useI18n()
const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const showAdd = ref(false)
const savingSettings = ref(false)

const settingsForm = ref({ banner_pos: 1, banner_mode: '1', banner_display: 0 })

const bannerForm = ref({
  title: '',
  link: '',
  photo: null as File | null,
  photoPreview: '',
})

const handleImageSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    bannerForm.value.photo = file
    bannerForm.value.photoPreview = URL.createObjectURL(file)
  }
}

const handleSaveSettings = async () => {
  savingSettings.value = true
  try {
    await settingStore.updateSettings(settingsForm.value)
  } finally {
    savingSettings.value = false
  }
}

const handleSaveBanner = async () => {
  const data: any = {
    title: bannerForm.value.title,
    link: bannerForm.value.link,
    photo: bannerForm.value.photo,
    status: 1,
  }
  await settingStore.addBanner(data)
  await settingStore.fetchBanners()
  showAdd.value = false
  bannerForm.value = { title: '', link: '', photo: null, photoPreview: '' }
}

const confirmDelete = async (banner: any) => {
  if (confirm('Are you sure?')) {
    await settingStore.deleteBanner(banner.banner_id)
  }
}

onMounted(async () => {
  await settingStore.fetchBanners()
  await settingStore.fetchSettings()
  if (settingStore.settings) {
    settingsForm.value = {
      banner_pos: settingStore.settings.banner_pos || 1,
      banner_mode: String(settingStore.settings.banner_mode ?? '1'),
      banner_display: settingStore.settings.banner_display ?? 0,
    }
  }
})
</script>
