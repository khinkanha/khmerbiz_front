<template>
  <div>
    <form @submit.prevent="handleAddSocial">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.socialMedia') }}</label>
            <select v-model="socialForm.stype" class="form-control">
              <option value="">-- Select --</option>
              <option value="2">Facebook</option>
              <option value="3">YouTube</option>
              <option value="5">Twitter</option>
              <option value="4">LinkedIn</option>
              <option value="1">Google</option>
              <option value="6">Telegram</option>
              <option value="7">Instagram</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.link') }}</label>
            <input type="text" v-model="socialForm.link" class="form-control" placeholder="https://..." />
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
          <tr v-for="(social, i) in settingStore.socialMedia" :key="social.smid">
            <td>{{ i + 1 }}</td>
            <td>{{ socialLabels[social.stype] || 'Unknown' }}</td>
            <td>{{ social.link }}</td>
            <td><a href="#" @click.prevent="handleDelete(social.smid)" class="text-danger">{{ $t('settings.removeImage') }}</a></td>
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

const socialLabels: Record<number, string> = {
  1: 'Google',
  2: 'Facebook',
  3: 'YouTube',
  4: 'LinkedIn',
  5: 'Twitter',
  6: 'Telegram',
  7: 'Instagram',
}

const socialForm = ref({ stype: '', link: '' })

const handleAddSocial = async () => {
  if (!socialForm.value.stype || !socialForm.value.link) return
  adding.value = true
  try {
    await settingStore.addSocialMedia({
      stype: Number(socialForm.value.stype),
      link: socialForm.value.link,
    })
    socialForm.value = { stype: '', link: '' }
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
