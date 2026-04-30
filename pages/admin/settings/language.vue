<template>
  <div>
    <form @submit.prevent="handleAddLanguage">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.languageTitle') }}</label>
            <input type="text" v-model="langForm.lang_name" class="form-control" :placeholder="$t('settings.languageTitle')" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.flagType') }}</label>
            <select v-model="langForm.flag_icon" class="form-control">
              <option value="">-- Select --</option>
              <option v-for="f in flagOptions" :key="f.value" :value="f.value">{{ f.label }}</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-danger" :disabled="adding">
        <i class="fa fa-floppy-o"></i> {{ $t('settings.save') }}
      </button>
    </form>

    <div class="table-responsive" style="margin-top:15px">
      <table class="table">
        <thead>
          <tr><th></th><th></th><th></th><th></th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="(lang, i) in settingStore.languages" :key="lang.lang_id">
            <td>{{ i + 1 }}</td>
            <td>{{ lang.lang_name }}</td>
            <td><img :src="`/flag/${lang.flag_icon}`" style="width:20px;height:14px;border-radius:2px" /></td>
            <td>
              <i v-if="lang.is_default" class="fa fa-star" style="color:#f0ad4e"></i>
              <a v-else href="#" @click.prevent="handleSetDefault(lang.lang_id)"><i class="fa fa-star" style="color:#ccc"></i></a>
            </td>
            <td><a href="#" @click.prevent="handleDelete(lang.lang_id)" class="text-danger">{{ $t('settings.removeImage') }}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useSettingStore } from '~/stores/setting'

const settingStore = useSettingStore()
const adding = ref(false)

const langForm = ref({ lang_name: '', flag_icon: '' })

const flagOptions = [
  { label: 'ខ្មែរ (KH)', value: 'kh.png' },
  { label: 'English (EN)', value: 'en.png' },
  { label: '中文 (CH)', value: 'ch.png' },
  { label: 'ไทย (TH)', value: 'th.png' },
  { label: 'Tiếng Việt (VN)', value: 'vn.png' },
]

const handleAddLanguage = async () => {
  if (!langForm.value.lang_name || !langForm.value.flag_icon) return
  adding.value = true
  try {
    const selectedFlag = flagOptions.find(f => f.value === langForm.value.flag_icon)
    await settingStore.addLanguage({
      lang_name: langForm.value.lang_name,
      lang_code: selectedFlag?.value?.replace('.png', '') || 'kh',
      flag_icon: langForm.value.flag_icon,
    })
    langForm.value = { lang_name: '', flag_icon: '' }
  } finally {
    adding.value = false
  }
}

const handleSetDefault = async (langId: number) => {
  await settingStore.setDefaultLanguage(langId)
}

const handleDelete = async (langId: number) => {
  if (confirm('Are you sure?')) {
    await settingStore.deleteLanguage(langId)
  }
}

onMounted(async () => {
  await settingStore.fetchLanguages()
})
</script>
