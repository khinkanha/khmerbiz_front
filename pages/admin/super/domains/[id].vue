<template>
  <div>
    <div class="h2">{{ domain?.domain_name }}</div>

    <!-- Edit Form -->
    <div v-if="editing" class="panel panel-warning">
      <div class="panel-heading">Edit Domain</div>
      <div class="panel-body">
        <form @submit.prevent="handleSave">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Domain Name</label>
                <input type="text" v-model="editForm.domain_name" class="form-control" disabled />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Company Name</label>
                <input type="text" v-model="editForm.company_name" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Address</label>
                <input type="text" v-model="editForm.company_address" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Company Description</label>
                <input type="text" v-model="editForm.company_desc" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="editForm.email" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Phone</label>
                <input type="text" v-model="editForm.phone_number" class="form-control" />
              </div>
            </div>
          </div>
          <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
          <button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> Save</button>
          <button type="button" class="btn btn-default" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Overview -->
    <div v-if="!editing" class="panel panel-info">
      <div class="panel-heading">
        Overview
        <a href="#" @click.prevent="startEdit"><i class="fa fa-pencil fa-lg"></i></a>
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

    <!-- Assign Domain Admin -->
    <div class="panel panel-default" style="margin-top:15px">
      <div class="panel-heading">Assign Domain Admin</div>
      <div class="panel-body">
        <form @submit.prevent="handleAssign" class="form-inline">
          <div class="form-group" style="margin-right:10px">
            <label style="margin-right:5px">User:</label>
            <select v-model="assignForm.userId" class="form-control" style="min-width:200px">
              <option value="">-- Select User --</option>
              <option v-for="u in allUsers" :key="u.userid" :value="u.userid">
                {{ u.username }} ({{ u.full_name }}) - Domain: {{ u.domain_id || 'None' }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="!assignForm.userId">Assign as Domain Admin</button>
          <span v-if="assignMessage" :class="assignSuccess ? 'text-success' : 'text-danger'" style="margin-left:10px">{{ assignMessage }}</span>
        </form>
        <p v-if="currentAdmin" style="margin-top:10px" class="text-info">
          Current domain admin: <strong>{{ currentAdmin.username }}</strong> ({{ currentAdmin.full_name }})
        </p>
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
const editing = ref(false)
const errorMessage = ref('')
const allUsers = ref<any[]>([])
const currentAdmin = ref<any>(null)
const assignForm = ref({ userId: '' })
const assignMessage = ref('')
const assignSuccess = ref(false)

const editForm = ref({
  domain_name: '',
  company_name: '',
  company_address: '',
  company_desc: '',
  email: '',
  phone_number: '',
})

const statusText = computed(() => {
  const s = domain.value?.status
  if (s === 1) return 'Active'
  if (s === 2) return 'Suspended'
  if (s === 3) return 'Expired'
  return 'Unknown'
})

const loadDomain = async () => {
  try {
    const res = await api.get(`/domains/${domainId.value}`)
    domain.value = res.data
  } catch (e) {
    console.error(e)
  }
}

const loadUsers = async () => {
  try {
    const res = await api.get('/users?limit=100')
    if (res.success) {
      allUsers.value = res.data?.items || []
      currentAdmin.value = allUsers.value.find((u: any) => u.domain_id === domainId.value && u.user_level === 1) || null
    }
  } catch (e) {
    console.error(e)
  }
}

const handleAssign = async () => {
  if (!assignForm.value.userId) return
  assignMessage.value = ''
  try {
    const res = await api.put(`/users/${assignForm.value.userId}/domain`, {
      domain_id: domainId.value,
      user_level: 1,
    })
    if (res.success) {
      assignSuccess.value = true
      assignMessage.value = 'Domain admin assigned successfully'
      assignForm.value.userId = ''
      await loadUsers()
    } else {
      assignSuccess.value = false
      assignMessage.value = res.message || 'Failed to assign'
    }
  } catch (e: any) {
    assignSuccess.value = false
    assignMessage.value = e.message || 'Error'
  }
}

const startEdit = () => {
  editForm.value = {
    domain_name: domain.value?.domain_name || '',
    company_name: domain.value?.company_name || '',
    company_address: domain.value?.company_address || '',
    company_desc: domain.value?.company_desc || '',
    email: domain.value?.email || '',
    phone_number: domain.value?.phone_number || '',
  }
  editing.value = true
  errorMessage.value = ''
}

const cancelEdit = () => {
  editing.value = false
  errorMessage.value = ''
}

const handleSave = async () => {
  errorMessage.value = ''
  try {
    const res = await api.put(`/domains/${domainId.value}`, editForm.value)
    if (res.success) {
      editing.value = false
      await loadDomain()
    } else {
      errorMessage.value = res.message || 'Error updating domain'
    }
  } catch (e: any) {
    errorMessage.value = e.message || 'Error'
  }
}

const handleAction = async (action: string) => {
  if (!confirm(`Are you sure to ${action}?`)) return
  try {
    await api.put(`/domains/${domainId.value}/status`, { status: action === 'activate' ? 1 : action === 'suspend' ? 2 : 3 })
    await loadDomain()
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  await Promise.all([loadDomain(), loadUsers()])
})
</script>
