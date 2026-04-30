<template>
  <div>
    <div class="h2">{{ domain?.domain_name }}</div>
    <div class="panel panel-info">
      <div class="panel-heading">
        Overview
        <NuxtLink :to="`/admin/super/domains/${domainId}`"><i class="fa fa-pencil fa-lg"></i></NuxtLink>
      </div>
      <div class="panel-body">
        <table class="table">
          <tbody>
            <tr><td>Company Name</td><td>{{ domain?.company_name }}</td></tr>
            <tr><td>Phone Number</td><td>{{ domain?.phone_number }}</td></tr>
            <tr><td>Email Address</td><td>{{ domain?.email }}</td></tr>
            <tr><td>Company Address</td><td>{{ domain?.company_address }}</td></tr>
            <tr><td>Status</td><td>{{ statusText }}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="panel-footer">
        <button class="btn btn-danger" @click="handleAction('suspend')">Suspend</button>&nbsp;
        <button class="btn btn-warning" @click="handleAction('activate')">Activate</button>&nbsp;
        <button class="btn btn-success" @click="handleAction('renew')">Renew</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useApi } from '~/composables/useApi'

const api = useApi()
const route = useRoute()
const domainId = computed(() => Number(route.params.id))
const domain = ref<any>(null)

const statusText = computed(() => {
  const s = domain.value?.status
  if (s === 1) return 'Active'
  if (s === 2) return 'Suspended'
  if (s === 3) return 'Expired'
  return 'Unknown'
})

const handleAction = async (action: string) => {
  if (!confirm(`Are you sure to ${action}?`)) return
  try {
    await api.post(`/super/domains/${domainId.value}/${action}`, {})
    const res = await api.get(`/super/domains/${domainId.value}`)
    domain.value = res.data
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    const res = await api.get(`/super/domains/${domainId.value}`)
    domain.value = res.data
  } catch (e) {
    console.error(e)
  }
})
</script>
