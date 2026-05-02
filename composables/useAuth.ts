import type { User, AuthResponse, LoginForm, SignupForm, ProfileForm, PasswordForm } from '~/types'

export const useAuth = () => {
  const api = useApi()
  const user = useState<User | null>('user', () => null)
  const isAuthenticated = useState<boolean>('isAuthenticated', () => false)

  const login = async (credentials: LoginForm): Promise<boolean> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials)

      if (response.success && response.data) {
        const { user: userData, accessToken, refreshToken } = response.data
        api.setTokens(accessToken, refreshToken)
        user.value = userData
        isAuthenticated.value = true
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
      const response = await api.post<AuthResponse>('/auth/signup', data)

      if (response.success && response.data) {
        const { user: userData, accessToken, refreshToken } = response.data
        api.setTokens(accessToken, refreshToken)
        user.value = userData
        isAuthenticated.value = true
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
      api.clearTokens()
      user.value = null
      isAuthenticated.value = false
      if (import.meta.client) {
        localStorage.removeItem('user')
      }
    }
  }

  const fetchProfile = async () => {
    try {
      const response = await api.get<User>('/users/me')

      if (response.success && response.data) {
        user.value = response.data
        isAuthenticated.value = true
        if (import.meta.client) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    }
  }

  const updateProfile = async (data: ProfileForm): Promise<boolean> => {
    try {
      const response = await api.put<User>('/users/me', data)

      if (response.success && response.data) {
        user.value = response.data
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to update profile:', error)
      return false
    }
  }

  const changePassword = async (data: PasswordForm): Promise<boolean> => {
    try {
      const response = await api.put('/users/me/password', data)
      return response.success
    } catch (error) {
      console.error('Failed to change password:', error)
      return false
    }
  }

  const checkAuth = async () => {
    api.getStoredTokens()

    if (import.meta.client) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
          isAuthenticated.value = true
        } catch (error) {
          console.error('Failed to parse stored user:', error)
        }
      }
    }

    if (user.value) {
      await fetchProfile()
    }
  }

  const isSuperAdmin = computed(() => user.value?.user_level === -1)
  const isWebAdmin = computed(() => user.value?.user_level === 1)
  const isNormalUser = computed(() => user.value?.user_level === 2)

  return {
    user,
    isAuthenticated,
    isSuperAdmin,
    isWebAdmin,
    isNormalUser,
    login,
    signup,
    logout,
    fetchProfile,
    updateProfile,
    changePassword,
    checkAuth,
  }
}
