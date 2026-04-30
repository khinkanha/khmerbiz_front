<template>
  <div>
    <form @submit.prevent="handleAddSocial">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.socialMedia') }}</label>
            <select v-model="socialForm.platform" class="form-control">
              <option value="">-- Select --</option>
              <option value="facebook">Facebook</option>
              <option value="youtube">Youtube</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
              <option value="google">Google+</option>
              <option value="telegram">Telegram</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.link') }}</label>
            <input type="text" v-model="socialForm.url" class="form-control" placeholder="https://..." />
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
          <tr><th></th><th></th><th></th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="(social, i) in settingStore.socialMedia" :key="social.social_id">
            <td>{{ i + 1 }}</td>
            <td>{{ social.platform }}</td>
            <td>{{ social.url }}</td>
            <td><a href="#" @click.prevent="handleDelete(social.social_id)" class="text-danger">{{ $t('settings.removeImage') }}</a></td>
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

const socialForm = ref({ platform: '', url: '' })

const handleAddSocial = async () => {
  if (!socialForm.value.platform || !socialForm.value.url) return
  adding.value = true
  try {
    await settingStore.addSocialMedia({
      platform: socialForm.value.platform,
      url: socialForm.value.url,
      icon_class: socialForm.value.platform,
      status: 1,
    })
    socialForm.value = { platform: '', url: '' }
  } finally {
    adding.value = false
  }
}

const handleDelete = async (id: number) => {
  if (confirm('Are you sure?')) {
    await settingStore.deleteSocialMedia(id)
  }
}

onMounted(async () => {
  await settingStore.fetchSocialMedia()
})
</script>
