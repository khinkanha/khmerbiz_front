<template>
  <div class="container">
    <h1>Make an announcement</h1>
    <form @submit.prevent="handleSend">
      <div class="form-group">
        <label>Subject</label>
        <input type="text" v-model="form.subject" class="form-control" placeholder="Subject" />
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>To Email Address</label>
            <input type="email" v-model="form.to_email" class="form-control" placeholder="recipient@example.com" :disabled="form.send_to_all" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group" style="margin-top:25px">
            <label>
              <input type="checkbox" v-model="form.send_to_all" /> Send to all
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Message</label>
        <textarea v-model="form.message" class="form-control" rows="10" placeholder="Write your announcement message..."></textarea>
      </div>
      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <button type="submit" class="btn btn-danger" :disabled="sending">Send Email</button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useApi } from '~/composables/useApi'

const api = useApi()
const { t } = useI18n()

const sending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const form = ref({
  subject: '',
  to_email: '',
  send_to_all: false,
  message: '',
})

const handleSend = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  if (!form.value.subject || !form.value.message) {
    errorMessage.value = 'Subject and message are required'
    return
  }
  if (!form.value.send_to_all && !form.value.to_email) {
    errorMessage.value = 'Please provide an email address or select "Send to all"'
    return
  }
  sending.value = true
  try {
    // TODO: Backend has no /domains/announce endpoint — needs to be added
    const response = await api.post('/domains/announce', form.value)
    if (response.success) {
      successMessage.value = t('common.success')
      form.value = { subject: '', to_email: '', send_to_all: false, message: '' }
      setTimeout(() => { successMessage.value = '' }, 3000)
    } else {
      errorMessage.value = response.message || t('common.error')
    }
  } catch (error: any) {
    errorMessage.value = error.message || t('common.error')
  } finally {
    sending.value = false
  }
}
</script>
