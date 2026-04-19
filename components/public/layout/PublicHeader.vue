<template>
  <header class="public-header" :class="headerClass">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <NuxtLink to="/">
            <img
              v-if="settings?.logo"
              :src="settings.logo"
              :alt="settings?.title || 'Logo'"
              class="logo-image"
            />
            <span v-else class="logo-text">{{ settings?.title || 'Logo' }}</span>
          </NuxtLink>
        </div>

        <nav class="main-nav">
          <ul class="nav-list">
            <li
              v-for="item in menuTree"
              :key="item.item_id"
              class="nav-item"
              :class="{ 'has-dropdown': item.children && item.children.length > 0 }"
            >
              <NuxtLink
                :to="item.item_url || '#'"
                class="nav-link"
              >
                {{ item.item_name }}
              </NuxtLink>

              <ul v-if="item.children && item.children.length > 0" class="dropdown">
                <li v-for="child in item.children" :key="child.item_id">
                  <NuxtLink :to="child.item_url || '#'" class="dropdown-link">
                    {{ child.item_name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div class="header-actions">
          <LanguageSelector />
          <NuxtLink v-if="!isAuthenticated" to="/admin/login" class="login-link">
            {{ $t('auth.login') }}
          </NuxtLink>
        </div>

        <button class="mobile-toggle" @click="toggleMobileMenu">
          <i class="pi pi-bars"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDomainStore, useAuthStore } from '~/stores'

const domainStore = useDomainStore()
const authStore = useAuthStore()

const settings = computed(() => domainStore.settings)
const menuTree = computed(() => domainStore.menuTree)
const isAuthenticated = computed(() => authStore.isAuthenticated)

const headerClass = computed(() => {
  const style = settings.value?.theme ?? 0
  return `theme-${style}`
})

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style scoped>
.public-header {
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  gap: 2rem;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-image {
  max-height: 48px;
  width: auto;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
}

.main-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: #4a5568;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;
  border-radius: 4px;
}

.nav-link:hover {
  color: #1a202c;
  background-color: #f7fafc;
}

.nav-link.router-link-active {
  color: #667eea;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.2s;
}

.has-dropdown:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown li {
  list-style: none;
}

.dropdown-link {
  display: block;
  padding: 0.75rem 1rem;
  color: #4a5568;
  text-decoration: none;
  font-size: 0.875rem;
  white-space: nowrap;
}

.dropdown-link:hover {
  background-color: #f7fafc;
  color: #1a202c;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-link {
  padding: 0.5rem 1rem;
  background-color: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.login-link:hover {
  background-color: #5a67d8;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #4a5568;
}

@media (max-width: 768px) {
  .main-nav {
    display: none;
  }

  .header-actions {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }
}
</style>
