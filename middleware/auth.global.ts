import { useAuthStore } from '~/stores'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  // Initialize auth state on client side
  if (import.meta.client) {
    await authStore.checkAuth()
  }

  const publicRoutes = ['/admin/login', '/admin/signup']
  const isAdminRoute = to.path.startsWith('/admin')

  if (isAdminRoute && !publicRoutes.includes(to.path)) {
    if (!authStore.isAuthenticated) {
      return navigateTo('/admin/login')
    }
  }

  if (publicRoutes.includes(to.path) && authStore.isAuthenticated) {
    return navigateTo('/admin')
  }
})
