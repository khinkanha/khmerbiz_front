import type { ApiResponse } from '~/types/api'
import { useAuthStore } from '~/stores/auth'

let accessToken: string | null = null
let refreshToken: string | null = null
let handlingAuthFailure = false

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  const setTokens = (access: string, refresh: string) => {
    accessToken = access
    refreshToken = refresh
    if (import.meta.client) {
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
    }
  }

  const getStoredTokens = () => {
    if (import.meta.client) {
      accessToken = localStorage.getItem('accessToken')
      refreshToken = localStorage.getItem('refreshToken')
    }
  }

  const clearTokens = () => {
    accessToken = null
    refreshToken = null
    if (import.meta.client) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }

  // Session is unrecoverable (refresh failed or no refresh token available).
  // Clear local state and force a full reload to the login page. Deduped so a
  // burst of parallel 401s only triggers one redirect.
  const handleAuthFailure = () => {
    if (handlingAuthFailure) return
    handlingAuthFailure = true
    clearTokens()
    try {
      useAuthStore().forceLogout()
    } catch (error) {
      console.error('Failed to force logout after auth failure:', error)
    }
  }

  const refreshAccessToken = async (): Promise<boolean> => {
    if (!refreshToken) return false

    try {
      const response = await $fetch<{ accessToken: string; refreshToken: string }>(
        `${baseURL}/auth/refresh`,
        {
          method: 'POST',
          body: { refreshToken },
        }
      )

      if (response) {
        setTokens(response.accessToken, response.refreshToken || refreshToken)
        return true
      }
      return false
    } catch (error) {
      clearTokens()
      return false
    }
  }

  const apiFetch = async <T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    getStoredTokens()

    const url = `${baseURL}${endpoint}`
    const isFormData = options.body instanceof FormData
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    }

    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    try {
      const response = await globalThis.fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (response.status === 401) {
        // Never auto-logout on auth endpoints (e.g. wrong-password 401 on login).
        const isAuthEndpoint = endpoint.startsWith('/auth/')
        if (!isAuthEndpoint) {
          if (refreshToken) {
            const refreshed = await refreshAccessToken()
            if (refreshed) {
              return apiFetch<T>(endpoint, options)
            }
          }
          // Refresh failed or no refresh token — the session is dead.
          handleAuthFailure()
          return {
            success: false,
            message: data.message || 'Session expired. Please log in again.',
          }
        }
      }

      if (!response.ok || data.status === false) {
        return {
          success: false,
          message: data.message || 'An error occurred',
          errors: data.errors,
        }
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Network error',
      }
    }
  }

  const get = <T = any>(endpoint: string) => apiFetch<T>(endpoint, { method: 'GET' })
  const post = <T = any>(endpoint: string, body: any) =>
    apiFetch<T>(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    })
  const put = <T = any>(endpoint: string, body: any) =>
    apiFetch<T>(endpoint, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    })
  const del = <T = any>(endpoint: string) => apiFetch<T>(endpoint, { method: 'DELETE' })

  return {
    get,
    post,
    put,
    delete: del,
    setTokens,
    clearTokens,
    getStoredTokens,
  }
}
