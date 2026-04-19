import { useAuthStore } from '~/stores'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated) {
    return navigateTo('/admin')
  }
})
