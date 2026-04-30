<template>
  <div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('userManager.username') }}</th>
            <th>{{ $t('userManager.fullName') }}</th>
            <th>{{ $t('userManager.phone') }}</th>
            <th>{{ $t('userManager.email') }}</th>
            <th>{{ $t('userManager.domain') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in users" :key="user.userid">
            <td>{{ i + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.full_name }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.domain_name || user.domain_id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useApi } from '~/composables/useApi'

const api = useApi()
const users = ref<any[]>([])

onMounted(async () => {
  try {
    const res = await api.get('/super/members')
    if (res.success) {
      users.value = res.data || []
    }
  } catch (e) {
    console.error(e)
  }
})
</script>
