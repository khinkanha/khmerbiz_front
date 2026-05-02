<template>
  <div class="row">
    <div class="col-md-3">
      <ul class="nav nav-pills nav-stacked">
        <li><NuxtLink to="/admin/super/domains">Domain List</NuxtLink></li>
        <li :class="{ active: true }"><NuxtLink to="/admin/super/domains/add">New Domain</NuxtLink></li>
      </ul>
    </div>
    <div class="col-md-9">
      <form @submit.prevent="handleSave">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Domain Name</label>
              <input type="text" v-model="form.domain_name" class="form-control" placeholder="domain.com" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Company Name</label>
              <input type="text" v-model="form.company_name" class="form-control" placeholder="Company Name" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Address</label>
              <input type="text" v-model="form.address" class="form-control" placeholder="Company Address" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Company Description</label>
              <input type="text" v-model="form.company_desc" class="form-control" placeholder="Company Description" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="form.email" class="form-control" placeholder="you@yourdomain.com" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Phone</label>
              <input type="text" v-model="form.phone" class="form-control" placeholder="XXX-XXX-XXX" />
            </div>
          </div>
        </div>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> Save</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useApi } from '~/composables/useApi'

const api = useApi()
const errorMessage = ref('')

const form = ref({
  domain_name: '',
  company_name: '',
  company_desc: '',
  address: '',
  email: '',
  phone: '',
})

const handleSave = async () => {
  errorMessage.value = ''
  try {
    const res = await api.post('/domains', form.value)
    if (res.success) {
      navigateTo('/admin/super/domains')
    } else {
      errorMessage.value = res.message || 'Error saving domain'
    }
  } catch (e: any) {
    errorMessage.value = e.message || 'Error'
  }
}
</script>
