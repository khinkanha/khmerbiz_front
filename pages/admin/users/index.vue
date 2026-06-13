<template>
  <div>
    <div id="btnnew" style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
      <div class="input-group" style="flex:1 1 300px;max-width:500px">
        <span class="input-group-addon"><i class="fa fa-search"></i></span>
        <input type="text" v-model="search" class="form-control" placeholder="Search username, name, email..." />
        <span v-if="search" class="input-group-addon" style="cursor:pointer" @click="clearSearch"><i class="fa fa-times"></i></span>
      </div>
      <a href="#" class="btn btn-info" @click.prevent="showForm = !showForm"><i class="fa fa-plus"></i> {{ $t('userManager.addUser') }}</a>
    </div>
    <br/>

    <div v-if="showForm" class="panel panel-warning">
      <div class="panel-heading">{{ $t('userManager.addUser') }}</div>
      <div class="panel-body">
        <form @submit.prevent="handleAdd">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ $t('userManager.username') }}</label>
                <input type="text" v-model="addForm.username" class="form-control" minlength="5" :placeholder="$t('userManager.username')" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ $t('userManager.fullName') }}</label>
                <input type="text" v-model="addForm.full_name" class="form-control" :placeholder="$t('userManager.fullName')" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ $t('userManager.phone') }}</label>
                <input type="text" v-model="addForm.phone" class="form-control" :placeholder="$t('userManager.phone')" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ $t('userManager.email') }}</label>
                <input type="email" v-model="addForm.email" class="form-control" :placeholder="$t('userManager.email')" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ $t('userManager.password') }}</label>
                <input type="password" v-model="addForm.password" class="form-control" minlength="6" :placeholder="$t('userManager.password')" />
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> {{ $t('userManager.save') }}</button>
        </form>
      </div>
    </div>

    <DataTable :value="filteredUsers" :loading="loading" :paginator="true" :rows="10"
      :rowsPerPageOptions="[10, 20, 50]" stripedRows>
      <Column field="userid" header="#" :style="{ width: '80px' }" />
      <Column field="username" :header="$t('userManager.username')">
        <template #body="{ data }">
          <a href="#" @click.prevent="openSetPassword(data)">{{ data.username }}</a>
        </template>
      </Column>
      <Column field="full_name" :header="$t('userManager.fullName')" />
      <Column field="phone" :header="$t('userManager.phone')" />
      <Column field="email" :header="$t('userManager.email')" />
      <Column header="Status" :style="{ width: '100px' }">
        <template #body="{ data }">
          <span v-if="data.is_verified" class="label label-success">Verified</span>
          <span v-else class="label label-warning">Pending</span>
        </template>
      </Column>
      <Column header="Actions" :style="{ width: '120px' }">
        <template #body="{ data }">
          <button v-if="isSuperAdmin && !data.is_verified" class="btn btn-success btn-xs" @click="verifyUser(data)">
            <i class="fa fa-check"></i> Verify
          </button>
        </template>
      </Column>
    </DataTable>

    <div v-if="showPasswordDialog" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center">
      <div class="panel panel-default" style="width:400px;margin:0">
        <div class="panel-heading">{{ $t('userManager.SettingPasswordForUser') }}: {{ selectedUser?.username }}</div>
        <div class="panel-body">
          <form @submit.prevent="handleSetPassword">
            <div class="form-group">
              <label>{{ $t('userManager.newPassword') }}</label>
              <input type="password" v-model="passwordForm.new_password" class="form-control" />
            </div>
            <button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> {{ $t('userManager.save') }}</button>
            <button type="button" class="btn btn-default" @click="showPasswordDialog = false">{{ $t('common.cancel') }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useUserStore } from '~/stores/user'
import { useAuthStore } from '~/stores/auth'
import { useToast } from 'primevue/usetoast'

const userStore = useUserStore()
const authStore = useAuthStore()
const toast = useToast()
const isSuperAdmin = computed(() => authStore.isSuperAdmin)

const showForm = ref(false)
const showPasswordDialog = ref(false)
const selectedUser = ref<any>(null)
const addForm = ref({ username: '', full_name: '', phone: '', email: '', password: '' })
const passwordForm = ref({ new_password: '' })
const loading = ref(false)
const search = ref('')

// Client-side filter over the loaded users (username / full_name / email)
const filteredUsers = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return userStore.users
  return userStore.users.filter(u =>
    String(u.username || '').toLowerCase().includes(term) ||
    String(u.full_name || '').toLowerCase().includes(term) ||
    String(u.email || '').toLowerCase().includes(term)
  )
})

const clearSearch = () => {
  search.value = ''
}

const verifyUser = async (user: any) => {
  if (!confirm(`Verify user "${user.username}"? This will allow them to login.`)) return
  const result = await userStore.verifyUser(user.userid)
  if (result.success) {
    toast.add({ severity: 'success', summary: 'Verified', detail: `${user.username} can now login`, life: 3000 })
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: result.message || 'Failed to verify user', life: 5000 })
  }
}

const handleAdd = async () => {
  if (!addForm.value.username || addForm.value.username.length < 5) {
    toast.add({ severity: 'warn', summary: 'Validation', detail: 'Username must be at least 5 characters', life: 3000 })
    return
  }
  if (!addForm.value.password || addForm.value.password.length < 6) {
    toast.add({ severity: 'warn', summary: 'Validation', detail: 'Password must be at least 6 characters', life: 3000 })
    return
  }
  const result = await userStore.addUser(addForm.value)
  if (result.success) {
    toast.add({ severity: 'success', summary: 'Success', detail: 'User created successfully', life: 3000 })
    showForm.value = false
    addForm.value = { username: '', full_name: '', phone: '', email: '', password: '' }
    await userStore.fetchUsers()
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: result.message || 'Failed to create user', life: 5000 })
  }
}

const openSetPassword = (user: any) => {
  selectedUser.value = user
  passwordForm.value = { new_password: '' }
  showPasswordDialog.value = true
}

const handleSetPassword = async () => {
  if (!selectedUser.value || !passwordForm.value.new_password) return
  const success = await userStore.setUserPassword(selectedUser.value.userid, passwordForm.value.new_password)
  if (success) {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Password updated', life: 3000 })
    showPasswordDialog.value = false
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to set password', life: 3000 })
  }
}

onMounted(async () => {
  loading.value = true
  await userStore.fetchUsers()
  loading.value = false
})
</script>
