import type { User } from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

export const useUserStore = defineStore('user', () => {
  const api = useApi()

  const users = ref<User[]>([])

  const fetchUsers = async () => {
    try {
      const response = await api.get<any>('/users')
      if (response.success && response.data) {
        users.value = response.data.items || response.data
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
  }): Promise<{ success: boolean; id?: number }> => {
    try {
      const response = await api.post<{ userid: number }>('/users', data)
      if (response.success && response.data) {
        await fetchUsers()
        return { success: true, id: response.data.userid }
      }
      return { success: false }
    } catch (error) {
      console.error('Failed to add user:', error)
      return { success: false }
    }
  }

  const updateUser = async (id: number, data: Partial<User>): Promise<boolean> => {
    try {
      const response = await api.put(`/users/${id}`, data)
      if (response.success) {
        await fetchUsers()
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to update user:', error)
      return false
    }
  }

  const deleteUser = async (id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/users/${id}`)
      if (response.success) {
        users.value = users.value.filter(u => u.userid !== id)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to delete user:', error)
      return false
    }
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
