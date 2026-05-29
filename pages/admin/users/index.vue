<template>
  <div>
    <div id="btnnew">
      <a href="#" class="btn btn-info pull-right" @click.prevent="showForm = !showForm"><i class="fa fa-plus"></i></a>
      <br/><br/>
    </div>

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

    <DataTable :value="userStore.users" :loading="loading" :paginator="true" :rows="pagination.limit"
      :totalRecords="pagination.total" :lazy="true" @page="onPageChange" :rowsPerPageOptions="[10, 20, 50]"
      stripedRows>
      <Column field="userid" header="#" :style="{ width: '80px' }" />
      <Column field="username" :header="$t('userManager.username')">
        <template #body="{ data }">
          <a href="#" @click.prevent="openSetPassword(data)">{{ data.username }}</a>
        </template>
      </Column>
      <Column field="full_name" :header="$t('userManager.fullName')" />
      <Column field="phone" :header="$t('userManager.phone')" />
      <Column field="email" :header="$t('userManager.email')" />
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
import { useToast } from 'primevue/usetoast'

const userStore = useUserStore()
const toast = useToast()

const showForm = ref(false)
const showPasswordDialog = ref(false)
const selectedUser = ref<any>(null)
const addForm = ref({ username: '', full_name: '', phone: '', email: '', password: '' })
const passwordForm = ref({ new_password: '' })
const loading = ref(false)

const pagination = computed(() => userStore.pagination)

const onPageChange = (event: any) => {
  loading.value = true
  userStore.fetchUsers(event.page + 1).finally(() => { loading.value = false })
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
