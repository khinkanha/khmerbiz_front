import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware during SSR
  if (import.meta.server) return

  const authStore = useAuthStore()
  const publicRoutes = ['/admin/login', '/admin/signup']
  const isAdminRoute = to.path.startsWith('/admin')
  const isSuperAdminRoute = to.path.startsWith('/admin/super')

  // Initialize auth state from localStorage
  authStore.initialize()

  // Fetch fresh profile for protected admin routes when tokens exist
  if (isAdminRoute && !publicRoutes.includes(to.path) && authStore.isAuthenticated) {
    await authStore.fetchProfile()
  }

  if (isAdminRoute && !publicRoutes.includes(to.path)) {
    if (!authStore.isAuthenticated) {
      return navigateTo('/admin/login')
    }

    // Super admin routes require super admin role
    if (isSuperAdminRoute && !authStore.isSuperAdmin) {
      return navigateTo('/admin')
    }
  }

  if (publicRoutes.includes(to.path) && authStore.isAuthenticated) {
    return navigateTo('/admin')
  }
})
