<template>
  <div class="admin-layout">
    <Toast />

    <!-- Logo -->
    <div class="container text-right admin-logo-bar">
      <img src="/assets/images/logo/2logo.gif" alt="Logo" />
    </div>

    <AdminNavbar />
    <AdminBreadcrumb />

    <main class="main-content container">
      <slot />
    </main>

    <AdminFooter />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useDomainStore } from '~/stores/domain'
import { useSeo } from '~/composables/useSeo'

const authStore = useAuthStore()
const domainStore = useDomainStore()
const { setFromSetting } = useSeo()

const settings = computed(() => domainStore.settings)

// Set admin page title and favicon
useHead({
  title: 'Cambodia Web Hosting',
  link: [
    { rel: 'icon', type: 'image/gif', href: '/assets/images/logo/2logo.gif' },
  ],
})

watch(settings, (val) => {
  if (val) {
    setFromSetting(val)
  }
}, { immediate: true })

if (import.meta.client) {
  authStore.initialize()
}

onMounted(async () => {
  await authStore.checkAuth()
})
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

.admin-logo-bar {
  padding: 10px 15px;
}

.admin-logo-bar img {
  max-height: 50px;
}

.main-content {
  flex: 1;
  padding: 0 15px 20px;
  max-width: 1170px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
