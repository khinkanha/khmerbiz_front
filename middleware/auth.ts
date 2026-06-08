export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  const publicRoutes = ['/member/login', '/member/signup']

  if (!publicRoutes.includes(to.path) && !authStore.isAuthenticated) {
    return navigateTo('/member/login')
  }
})
