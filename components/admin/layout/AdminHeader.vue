<template>
  <header class="admin-header">
    <div class="header-left">
      <Button
        icon="pi pi-bars"
        class="menu-toggle"
        @click="toggleSidebar"
        text
        rounded
      />

      <AdminBreadcrumb />
    </div>

    <div class="header-right">
      <div class="language-selector">
        <LanguageSelector />
      </div>

      <div class="user-menu">
        <Menu ref="userMenuRef" :model="userMenuItems" :popup="true" />
        <Button
          @click="toggleUserMenu"
          class="user-button"
          text
        >
          <i class="pi pi-user"></i>
          <span v-if="authStore.user">{{ authStore.user.full_name || authStore.user.username }}</span>
          <i class="pi pi-chevron-down"></i>
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores'

const authStore = useAuthStore()
const router = useRouter()
const userMenuRef = ref()

const userMenuItems = computed(() => [
  {
    label: authStore.user?.full_name || authStore.user?.username,
    items: [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => router.push('/admin/profile'),
      },
      {
        label: 'Password',
        icon: 'pi pi-key',
        command: () => router.push('/admin/password'),
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: handleLogout,
      },
    ],
  },
])

const toggleSidebar = () => {
  // Sidebar toggle logic
  const sidebar = document.querySelector('.admin-sidebar')
  sidebar?.classList.toggle('collapsed')
}

const toggleUserMenu = (event: Event) => {
  userMenuRef.value?.toggle(event)
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-header {
  height: 64px;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  color: #4a5568;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
}

.user-button span {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
