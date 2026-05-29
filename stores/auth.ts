import { acceptHMRUpdate, defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import type { User, LoginForm, SignupForm, ProfileForm, PasswordForm } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const api = useApi()
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const isAuthenticated = computed(() => !!user.value && !!accessToken.value)

  const initialize = () => {
    if (import.meta.client) {
      const storedToken = localStorage.getItem('accessToken')
      const storedRefresh = localStorage.getItem('refreshToken')
      const storedUser = localStorage.getItem('user')

      if (storedToken) accessToken.value = storedToken
      if (storedRefresh) refreshToken.value = storedRefresh
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
        } catch (error) {
          console.error('Failed to parse stored user:', error)
        }
      }
    }
  }

  const setTokens = (access: string, refresh: string) => {
    accessToken.value = access
    refreshToken.value = refresh
    if (import.meta.client) {
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
    }
  }

  const setUser = (userData: User) => {
    user.value = userData
    if (import.meta.client) {
      localStorage.setItem('user', JSON.stringify(userData))
    }
  }

  const login = async (credentials: LoginForm): Promise<boolean> => {
    try {
      const response = await api.post<{
        user: User
        accessToken: string
        refreshToken: string
      }>('/auth/login', credentials)

      if (response.success && response.data) {
        const { user: userData, accessToken: access, refreshToken: refresh } = response.data
        setTokens(access, refresh)
        setUser(userData)
        console.log('Login successful:', access, refresh, userData)
        return true
      }

      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const signup = async (data: SignupForm): Promise<boolean> => {
    try {
      const response = await api.post<{
        user: User
        accessToken: string
        refreshToken: string
      }>('/auth/signup', data)

      if (response.success && response.data) {
        const { user: userData, accessToken: access, refreshToken: refresh } = response.data
        setTokens(access, refresh)
        setUser(userData)
        return true
      }

      return false
    } catch (error) {
      console.error('Signup failed:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout', {})
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      user.value = null
      accessToken.value = null
      refreshToken.value = null
      if (import.meta.client) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      }
    }
  }

  const fetchProfile = async () => {
    try {
      const response = await api.get<User>('/users/me')

      if (response.success && response.data) {
        setUser(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    }
  }

  const checkAuth = async () => {
    initialize()
    if (user.value) {
      await fetchProfile()
    }
  }

  const updateProfile = async (data: ProfileForm): Promise<boolean> => {
    try {
      const response = await api.put<User>('/users/me', data)

      if (response.success && response.data) {
        setUser(response.data)
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to update profile:', error)
      return false
    }
  }

  const changePassword = async (data: PasswordForm): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.put('/users/me/password', data)
      return { success: response.success, message: response.message }
    } catch (error: any) {
      return { success: false, message: error.message || 'Password change failed' }
    }
  }

  const isSuperAdmin = computed(() => user.value?.user_level === -1)
  const isWebAdmin = computed(() => user.value?.user_level === 1)
  const isNormalUser = computed(() => user.value?.user_level === 2)

  return {
    user: readonly(user),
    isAuthenticated,
    isSuperAdmin,
    isWebAdmin,
    isNormalUser,
    initialize,
    login,
    signup,
    logout,
    fetchProfile,
    checkAuth,
    updateProfile,
    changePassword,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
