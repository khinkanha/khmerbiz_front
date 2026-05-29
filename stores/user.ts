import type { User, PaginatedResponse } from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

export const useUserStore = defineStore('user', () => {
  const api = useApi()

  const users = ref<User[]>([])
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  })

  const fetchUsers = async (page: number = 1) => {
    try {
      const response = await api.get<PaginatedResponse<User>>(`/users?page=${page}&limit=${pagination.value.limit}`)
      if (response.success && response.data) {
        users.value = response.data.items || []
        const pag = response.data.pagination
        if (pag) {
          pagination.value = {
            page: pag.page,
            limit: pag.limit,
            total: pag.total,
            totalPages: pag.totalPages,
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  const addUser = async (data: {
    username: string
    full_name: string
    email: string
    phone?: string
    password?: string
  }): Promise<{ success: boolean; id?: number; message?: string }> => {
    try {
      const response = await api.post<{ userid: number }>('/users', data)
      if (response.success && response.data) {
        await fetchUsers()
        return { success: true, id: response.data.userid }
      }
      return { success: false, message: response.message }
    } catch (error) {
      console.error('Failed to add user:', error)
      return { success: false, message: 'Network error' }
    }
  }

  const updateUser = async (id: number, data: Partial<User>): Promise<boolean> => {
    // TODO: Backend has no generic PUT /users/:id — only specific sub-routes
    console.warn('updateUser: no backend endpoint for generic user update')
    return false
  }

  const deleteUser = async (id: number): Promise<boolean> => {
    // TODO: Backend has no DELETE /users/:id endpoint — needs to be added
    console.warn('deleteUser: no backend endpoint for user deletion')
    return false
  }

  const setUserPassword = async (id: number, password: string): Promise<boolean> => {
    try {
      const response = await api.put(`/users/${id}/password`, { password })
      return response.success
    } catch (error) {
      console.error('Failed to set user password:', error)
      return false
    }
  }

  return {
    users: readonly(users),
    pagination: readonly(pagination),
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    setUserPassword,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
