export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  const publicRoutes = ['/admin/login', '/admin/signup']

  if (!publicRoutes.includes(to.path) && !authStore.isAuthenticated) {
    return navigateTo('/admin/login')
  }
})
