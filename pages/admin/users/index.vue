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
                <input type="text" v-model="addForm.username" class="form-control" :placeholder="$t('userManager.username')" />
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
          <button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> {{ $t('userManager.save') }}</button>
        </form>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('userManager.username') }}</th>
            <th>{{ $t('userManager.fullName') }}</th>
            <th>{{ $t('userManager.phone') }}</th>
            <th>{{ $t('userManager.email') }}</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in userStore.users" :key="user.userid">
            <td>{{ i + 1 }}</td>
            <td><a href="#" @click.prevent="openSetPassword(user)">{{ user.username }}</a></td>
            <td>{{ user.full_name }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.email }}</td>
            
          </tr>
        </tbody>
      </table>
    </div>

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

const userStore = useUserStore()

const showForm = ref(false)
const showPasswordDialog = ref(false)
const selectedUser = ref<any>(null)
const addForm = ref({ username: '', full_name: '', phone: '', email: '' })
const passwordForm = ref({ new_password: '' })

const handleAdd = async () => {
  if (!addForm.value.username) return
  await userStore.addUser(addForm.value)
  showForm.value = false
  addForm.value = { username: '', full_name: '', phone: '', email: '' }
  await userStore.fetchUsers()
}

const openSetPassword = (user: any) => {
  selectedUser.value = user
  passwordForm.value = { new_password: '' }
  showPasswordDialog.value = true
}

const handleSetPassword = async () => {
  if (!selectedUser.value || !passwordForm.value.new_password) return
  await userStore.setUserPassword(selectedUser.value.userid, passwordForm.value.new_password)
  showPasswordDialog.value = false
}

onMounted(async () => {
  await userStore.fetchUsers()
  
})
</script>
