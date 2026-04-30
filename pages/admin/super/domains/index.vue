<template>
  <div class="row">
    <div class="col-md-3">
      <ul class="nav nav-pills nav-stacked">
        <li :class="{ active: true }"><NuxtLink to="/admin/super/domains">Domain List</NuxtLink></li>
        <li><NuxtLink to="/admin/super/domains/add">New Domain</NuxtLink></li>
      </ul>
    </div>
    <div class="col-md-9">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr><th>No</th><th>Domain</th><th>Company</th><th>Phone</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="(domain, i) in domains" :key="domain.domain_id">
              <td>{{ i + 1 }}</td>
              <td><NuxtLink :to="`/admin/super/domains/${domain.domain_id}`">{{ domain.domain_name }}</NuxtLink></td>
              <td>{{ domain.company_name }}</td>
              <td>{{ domain.phone_number }}</td>
              <td><a href="#" @click.prevent="assignPermission(domain.domain_id)">Permission</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useApi } from '~/composables/useApi'

const api = useApi()
const domains = ref<any[]>([])

const assignPermission = (id: number) => {
  navigateTo(`/admin/super/domains/${id}`)
}

onMounted(async () => {
  try {
    const res = await api.get('/super/domains')
    domains.value = res.data || []
  } catch (e) {
    console.error(e)
  }
})
</script>
