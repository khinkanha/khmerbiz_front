<template>
  <header class="public-header" :class="headerClass">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="container top-bar-inner">
        <div class="brand" @click="goHome">
          <img
            v-if="settings?.logo"
            :src="settings.logo"
            :alt="settings?.title || 'Logo'"
            class="brand-logo"
          />
          <div v-if="settings?.title" class="brand-title">
            <h1>{{ settings.title }}</h1>
          </div>
        </div>

        <div class="top-actions">
          <LanguageSelector />
        </div>
      </div>
    </div>

    <!-- Navigation Bar -->
    <nav v-if="!isSitebuilder" class="nav-bar">
      <div class="container nav-inner">
        <ul class="nav-list" :class="{ 'mobile-open': mobileMenuOpen }">
          <li
            v-for="item in menuTree"
            :key="item.item_id"
            class="nav-item"
            :class="{ 'has-dropdown': item.children && item.children.length > 0 }"
          >
            <NuxtLink :to="item.item_url || '#'" class="nav-link">
              {{ item.item_name }}
            </NuxtLink>

            <div v-if="item.children && item.children.length > 0" class="dropdown-menu">
              <div class="dropdown-inner">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.item_id"
                  :to="child.item_url || '#'"
                  class="dropdown-link"
                >
                  {{ child.item_name }}
                </NuxtLink>
              </div>
            </div>
          </li>
        </ul>

        <NuxtLink v-if="!isAuthenticated" to="/admin/login" class="login-btn">
          {{ $t('auth.login') }}
        </NuxtLink>

        <button class="mobile-toggle" @click="toggleMobileMenu">
          <i :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useDomainStore } from '~/stores/domain'
import { useAuthStore } from '~/stores/auth'
import { navigateTo } from 'nuxt/app'

const domainStore = useDomainStore()
const authStore = useAuthStore()

const settings = computed(() => domainStore.settings)
const menuTree = computed(() => domainStore.menuTree)
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isSitebuilder = computed(() => (authStore.user?.sitebuilder ?? 0) !== 0)

const headerClass = computed(() => {
  const style = settings.value?.theme ?? 0
  return `theme-${style}`
})

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const goHome = () => {
  navigateTo('/')
}
</script>

<style scoped>
.public-header {
  width: 100%;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* ---- Top Bar ---- */
.top-bar {
  background-color: white;
  border-bottom: 3px solid var(--primary-color, #3b82f6);
  padding: 1rem 0;
}

.top-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.brand-logo {
  max-height: 64px;
  width: auto;
  object-fit: contain;
}

.brand-title h1 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--primary-color, #1a202c);
  margin: 0;
  line-height: 1.3;
  font-family: var(--font-battambang);
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* ---- Navigation Bar ---- */
.nav-bar {
  background-color: var(--nav-bg, #1e3a5f);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
}

.nav-list {
  display: flex;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  gap: 0;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: stretch;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0 1.15rem;
  color: var(--nav-text, rgba(255, 255, 255, 0.9));
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;
  height: 100%;
}

.nav-link:hover {
  background-color: var(--nav-hover, rgba(255, 255, 255, 0.1));
  color: white;
}

.nav-link.router-link-active {
  background-color: var(--primary-color, #3b82f6);
  color: white;
}

/* Dropdown */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 220px;
  background-color: white;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: all 0.2s;
  z-index: 200;
}

.has-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-inner {
  padding: 0.5rem 0;
}

.dropdown-link {
  display: block;
  padding: 0.65rem 1.25rem;
  color: #4a5568;
  text-decoration: none;
  font-size: 0.85rem;
  transition: background-color 0.15s, color 0.15s;
  white-space: nowrap;
}

.dropdown-link:hover {
  background-color: var(--primary-color, #3b82f6);
  color: white;
}

/* Login Button */
.login-btn {
  padding: 0.4rem 1.15rem;
  background-color: var(--primary-color, #3b82f6);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.login-btn:hover {
  background-color: var(--primary-dark, #2563eb);
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: white;
  font-size: 1.25rem;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .brand-title h1 {
    font-size: 1.1rem;
  }

  .brand-logo {
    max-height: 48px;
  }

  .nav-inner {
    flex-wrap: wrap;
    height: auto;
    padding: 0;
  }

  .nav-list {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: var(--nav-bg, #1e3a5f);
  }

  .nav-list.mobile-open {
    display: flex;
  }

  .nav-link {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0.08);
    display: none;
  }

  .has-dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown-link {
    color: rgba(255, 255, 255, 0.8);
    padding-left: 2rem;
  }

  .dropdown-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  .login-btn {
    display: none;
  }

  .mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .nav-bar {
    position: relative;
  }
}
</style>
