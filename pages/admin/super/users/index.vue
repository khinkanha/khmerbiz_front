<template>
  <div>
    <div id="btnnew">
      <a href="#" class="btn btn-info pull-right" @click.prevent="showAddForm = true"><i class="fa fa-plus"></i> Add User</a>
      <br/><br/>
    </div>

    <!-- Add User Form -->
    <div v-if="showAddForm" class="panel panel-warning">
      <div class="panel-heading">Add User</div>
      <div class="panel-body">
        <form @submit.prevent="handleAdd">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Username</label>
                <input type="text" v-model="addForm.username" class="form-control" placeholder="Username" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" v-model="addForm.full_name" class="form-control" placeholder="Full Name" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Phone</label>
                <input type="text" v-model="addForm.phone" class="form-control" placeholder="Phone" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="addForm.email" class="form-control" placeholder="Email" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="addForm.password" class="form-control" placeholder="Password" />
              </div>
            </div>
          </div>
          <div v-if="addErrorMessage" class="alert alert-danger">{{ addErrorMessage }}</div>
          <button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> Save</button>
          <button type="button" class="btn btn-default" @click="showAddForm = false; addErrorMessage = ''">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Edit User Form -->
    <div v-if="showEditForm && editUser" class="panel panel-info">
      <div class="panel-heading">Edit User: {{ editUser.username }}</div>
      <div class="panel-body">
        <form @submit.prevent="handleEdit">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Username</label>
                <input type="text" :value="editUser.username" class="form-control" disabled />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" v-model="editForm.full_name" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Phone</label>
                <input type="text" v-model="editForm.phone" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="editForm.email" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Domain ID</label>
                <input type="number" v-model="editForm.domain_id" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>User Level</label>
                <select v-model="editForm.user_level" class="form-control">
                  <option value="-1">Super Admin</option>
                  <option value="1">Web Admin</option>
                  <option value="2">Normal User</option>
                </select>
              </div>
            </div>
          </div>
          <div v-if="editErrorMessage" class="alert alert-danger">{{ editErrorMessage }}</div>
          <button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> Save</button>
          <button type="button" class="btn btn-default" @click="showEditForm = false; editErrorMessage = ''">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Set Password Dialog -->
    <div v-if="showPasswordDialog" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center">
      <div class="panel panel-default" style="width:400px;margin:0">
        <div class="panel-heading">Set Password: {{ passwordUser?.username }}</div>
        <div class="panel-body">
          <form @submit.prevent="handleSetPassword">
            <div class="form-group">
              <label>New Password</label>
              <input type="password" v-model="passwordForm.new_password" class="form-control" />
            </div>
            <button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> Save</button>
            <button type="button" class="btn btn-default" @click="showPasswordDialog = false">Cancel</button>
          </form>
        </div>
      </div>
    </div>

    <!-- User List -->
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Domain</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in users" :key="user.userid">
            <td>{{ (page - 1) * 10 + i + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.full_name }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.domain_id }}</td>
            <td>
              <a href="#" @click.prevent="openEdit(user)" title="Edit"><i class="fa fa-pencil"></i></a>&nbsp;
              <a href="#" @click.prevent="openSetPassword(user)" title="Set Password"><i class="fa fa-key"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
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
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useApi } from '~/composables/useApi'

const api = useApi()
const users = ref<any[]>([])
const page = ref(1)
const pagination = ref({ page: 1, limit: 10, total: 0, totalPages: 1 })

// Add user
const showAddForm = ref(false)
const addErrorMessage = ref('')
const addForm = ref({ username: '', full_name: '', phone: '', email: '', password: '' })

// Edit user
const showEditForm = ref(false)
const editErrorMessage = ref('')
const editUser = ref<any>(null)
const editForm = ref({ full_name: '', phone: '', email: '', domain_id: 0, user_level: 2 })

// Set password
const showPasswordDialog = ref(false)
const passwordUser = ref<any>(null)
const passwordForm = ref({ new_password: '' })

const loadUsers = async () => {
  try {
    const res = await api.get(`/users?page=${page.value}&limit=10`)
    if (res.success) {
      users.value = res.data?.items || []
      pagination.value = res.data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 }
    }
  } catch (e) {
    console.error(e)
  }
}

const goPage = (p: number) => {
  if (p < 1 || p > pagination.value.totalPages) return
  page.value = p
  loadUsers()
}

const handleAdd = async () => {
  addErrorMessage.value = ''
  if (!addForm.value.username || addForm.value.username.length < 3) {
    addErrorMessage.value = 'Username must be at least 3 characters'
    return
  }
  if (!addForm.value.password || addForm.value.password.length < 6) {
    addErrorMessage.value = 'Password must be at least 6 characters'
    return
  }
  try {
    const res = await api.post('/users', addForm.value)
    if (res.success) {
      showAddForm.value = false
      addForm.value = { username: '', full_name: '', phone: '', email: '', password: '' }
      await loadUsers()
    } else {
      addErrorMessage.value = res.message || 'Failed to create user'
    }
  } catch (e: any) {
    addErrorMessage.value = e.message || 'Error'
  }
}

const openEdit = (user: any) => {
  editUser.value = user
  editForm.value = {
    full_name: user.full_name || '',
    phone: user.phone || '',
    email: user.email || '',
    domain_id: user.domain_id || 0,
    user_level: user.user_level || 2,
  }
  showEditForm.value = true
  showAddForm.value = false
  editErrorMessage.value = ''
}

const handleEdit = async () => {
  editErrorMessage.value = ''
  if (!editUser.value) return
  try {
    const res = await api.put(`/users/${editUser.value.userid}`, editForm.value)
    if (res.success) {
      showEditForm.value = false
      await loadUsers()
    } else {
      editErrorMessage.value = res.message || 'Failed to update user'
    }
  } catch (e: any) {
    editErrorMessage.value = e.message || 'Error'
  }
}

const openSetPassword = (user: any) => {
  passwordUser.value = user
  passwordForm.value = { new_password: '' }
  showPasswordDialog.value = true
}

const handleSetPassword = async () => {
  if (!passwordUser.value || !passwordForm.value.new_password) return
  try {
    const res = await api.put(`/users/${passwordUser.value.userid}/password`, { password: passwordForm.value.new_password })
    if (res.success) {
      showPasswordDialog.value = false
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  await loadUsers()
})
</script>
