import type { ApiResponse, ApiError } from '~/types/api'

let accessToken: string | null = null
let refreshToken: string | null = null

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl || 'http://localhost:8000/api/v1'

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

  const fetch = async <T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    getStoredTokens()

    const url = `${baseURL}${endpoint}`
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (response.status === 401 && refreshToken) {
        const refreshed = await refreshAccessToken()
        if (refreshed) {
          return fetch<T>(endpoint, options)
        }
      }

      if (!response.ok) {
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

  const get = <T = any>(endpoint: string) => fetch<T>(endpoint, { method: 'GET' })
  const post = <T = any>(endpoint: string, body: any) =>
    fetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  const put = <T = any>(endpoint: string, body: any) =>
    fetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  const del = <T = any>(endpoint: string) => fetch<T>(endpoint, { method: 'DELETE' })

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
