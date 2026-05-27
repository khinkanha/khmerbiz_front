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

      <nav v-if="pagination.totalPages > 1" class="text-center">
        <ul class="pagination">
          <li :class="{ disabled: page <= 1 }">
            <a href="#" @click.prevent="goPage(page - 1)">&laquo;</a>
          </li>
          <li v-for="p in pagination.totalPages" :key="p" :class="{ active: p === page }">
            <a href="#" @click.prevent="goPage(p)">{{ p }}</a>
          </li>
          <li :class="{ disabled: page >= pagination.totalPages }">
            <a href="#" @click.prevent="goPage(page + 1)">&raquo;</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useApi } from '~/composables/useApi'

const api = useApi()
const domains = ref<any[]>([])
const page = ref(1)
const pagination = ref({ page: 1, limit: 10, total: 0, totalPages: 1 })

const assignPermission = (id: number) => {
  navigateTo(`/admin/super/domains/${id}`)
}

const loadDomains = async () => {
  try {
    const res = await api.get(`/domains?page=${page.value}&limit=10`)
    if (res.success) {
      domains.value = res.data?.items || []
      pagination.value = res.data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 }
    }
  } catch (e) {
    console.error(e)
  }
}

const goPage = (p: number) => {
  if (p < 1 || p > pagination.value.totalPages) return
  page.value = p
  loadDomains()
}

onMounted(async () => {
  await loadDomains()
})
</script>
