<template>
  <header class="public-header stiky-header" :class="headerClass">
    <!-- Language flag -->
    <div class="flag">
      <LanguageSelector />
    </div>
    <!-- Top Bar (hidden when logo_position=bottom) -->
    <div v-if="logoPos !== 3" class="top-bar">
      <div class="container top-bar-inner">
        <div class="brand" @click="goHome">
          <template v-if="settings?.logo">
            <img :src="config.photoUrl + settings.logo" :alt="settings?.title || 'Logo'"
              class="brand-logo desktop-logo" />
            <img v-if="settings?.mobile_logo" :src="config.photoUrl + settings.mobile_logo"
              :alt="settings?.title || 'Logo'" class="brand-logo mobile-logo" />
          </template>
        </div>
      </div>
    </div>

    <!-- Mobile logo row (hidden on desktop, shown above nav on mobile) -->
    <div class="mobile-logo-bar">
      <div class="container mobile-logo-inner">
        <img v-if="settings?.mobile_logo" :src="config.photoUrl + settings.mobile_logo" :alt="settings?.title || 'Logo'"
          class="mobile-logo-img" />
        <div v-else-if="settings?.title" class="mobile-logo-title">
          <h1>{{ settings.title }}</h1>
        </div>
      </div>
    </div>

    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="container navbar-container">

        <!-- Brand group: mobile brand + login + hamburger -->
        <div class="navbar-brand-group">
          <div class="mobile-brand" @click="goHome">
            <div v-if="settings?.title" class="brand-title">
              <h1>{{ settings.title }}</h1>
            </div>
          </div>
          <NuxtLink v-if="!isAuthenticated" to="/member/login" class="login-btn">
            {{ $t('auth.login') }}
          </NuxtLink>
          <button class="navbar-toggler" type="button" @click="toggleMobileMenu" aria-label="Toggle navigation">
            <i :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
          </button>
        </div>

        <!-- Menu (no Bootstrap collapse class — manual toggle) -->
        <div class="navbar-menu" :class="navMenuClass">
          <ul class="navbar-nav" :class="menuAlignClass" @click="handleNavClick">
            <li v-for="item in filteredMenuTree" :key="item.item_id" class="nav-item"
              :class="{ dropdown: item.children && item.children.length > 0, 'show-dropdown': expandedMenuId === item.item_id }">

              <!-- Items WITH children -->
              <template v-if="item.children && item.children.length > 0">
                <a v-if="isSinglePage" :href="`#section-${item.item_id}`" class="nav-link"
                  :class="{ active: activeMenuId === item.item_id }" @click.prevent="scrollToSection(item.item_id)">
                  {{ item.item_name }}
                </a>
                <a v-else class="nav-link dropdown-toggle" href="#" :class="{ active: isMenuActive(item) }"
                  @click.prevent="toggleDropdown(item.item_id, $event)">
                  {{ item.item_name }}
                  <i class="pi toggle-icon"
                    :class="expandedMenuId === item.item_id ? 'pi-chevron-up' : 'pi-chevron-down'" />
                </a>

                <ul class="dropdown-menu">
                  <li v-for="child in item.children" :key="child.item_id">
                    <template v-if="isSinglePage">
                      <a class="dropdown-item" :href="`#section-${child.item_id}`"
                        @click.prevent="scrollToSection(child.item_id)">
                        {{ child.item_name }}
                      </a>
                    </template>
                    <template v-else>
                      <NuxtLink class="dropdown-item" :to="`/pages/${domain?.domain_id}/${child.item_id}`"
                        :class="{ active: isChildActive(child.item_id) }">
                        {{ child.item_name }}
                      </NuxtLink>
                    </template>
                  </li>
                </ul>
              </template>

              <!-- Items WITHOUT children -->
              <template v-else>
                <a v-if="isSinglePage" :href="`#section-${item.item_id}`" class="nav-link"
                  :class="{ active: activeMenuId === item.item_id }" @click.prevent="scrollToSection(item.item_id)">
                  {{ item.item_name }}
                </a>
                <NuxtLink v-else :to="`/pages/${domain?.domain_id}/${item.item_id}`" class="nav-link"
                  :class="{ active: isMenuActive(item) }">
                  {{ item.item_name }}
                </NuxtLink>
              </template>
            </li>
          </ul>
        </div>

      </div>
    </nav>

    <!-- Bottom bar for logo_position=bottom -->
    <div v-if="logoPos === 3" class="top-bar bottom-bar">
      <div class="container top-bar-inner">
        <div class="brand" @click="goHome">
          <img v-if="settings?.logo" :src="config.photoUrl + settings.logo" :alt="settings?.title || 'Logo'"
            class="brand-logo" />
        </div>
      </div>
    </div>

  </header>
</template>

<script setup lang="ts">
import { useDomainStore } from '~/stores/domain'
import { useAuthStore } from '~/stores/auth'
import { navigateTo } from 'nuxt/app'
import { ContentType } from '~/types'

const domainStore = useDomainStore()
const authStore = useAuthStore()
const config = useRuntimeConfig().public
const route = useRoute()

const settings = computed(() => domainStore.settings)
const domain = computed(() => domainStore.domain)
const menuTree = computed(() => domainStore.menuTree)
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isSinglePage = computed(() => settings.value?.page_style !== 0)
const isClassicTemplate = computed(() => settings.value?.page_style === 0)

const filteredMenuTree = computed(() => {
  if (isClassicTemplate.value) return menuTree.value
  return menuTree.value
    .filter(item => item.content_type !== ContentType.NEWS)
    .map(item => ({
      ...item,
      children: item.children?.filter(child => child.content_type !== ContentType.NEWS) || []
    }))
})

const activeMenuId = ref<number | null>(null)
const mobileMenuOpen = ref(false)
const expandedMenuId = ref<number | null>(null)

const toggleDropdown = (itemId: number, event: Event) => {
  // Toggle: if same item, close it; otherwise open the new one (exclusive)
  expandedMenuId.value = expandedMenuId.value === itemId ? null : itemId
}

const scrollToSection = (itemId: number) => {
  activeMenuId.value = itemId
  const el = document.getElementById(`section-${itemId}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    mobileMenuOpen.value = false
  }
}

const headerClass = computed(() => {
  const style = settings.value?.theme ?? 0
  const classes = [`theme-${style}`]

  const logoAlign = Number(settings.value?.logo_align) || 2
  if (logoAlign === 1) classes.push('logo-align-left')
  else if (logoAlign === 3) classes.push('logo-align-right')
  else classes.push('logo-align-center')

  const menuPos = Number(settings.value?.menu_pos) || 1
  if (menuPos === 3) classes.push('menu-pos-bottom')

  const screenMode = Number(settings.value?.screen_mode) || 1
  if (screenMode === 2) classes.push('screen-boxed')

  return classes.join(' ')
})

const logoPos = computed(() => Number(settings.value?.logo_position) || 1)

const menuAlignClass = computed(() => {
  const menuAlign = Number(settings.value?.menu_align) || 2
  if (menuAlign === 1) return 'menu-align-left'
  if (menuAlign === 3) return 'menu-align-right'
  return 'menu-align-center'
})

const navMenuClass = computed(() => {
  const classes: string[] = []
  if (mobileMenuOpen.value) classes.push('mobile-open')
  return classes.join(' ')
})

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Close mobile menu when clicking a nav-link (non-dropdown) or dropdown-item
const handleNavClick = (e: Event) => {
  const target = e.target as HTMLElement
  if (target.closest('.dropdown-item') || target.closest('.nav-link:not(.dropdown-toggle)')) {
    mobileMenuOpen.value = false
    expandedMenuId.value = null
  }
}

// Auto-close mobile menu and dropdowns on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
  expandedMenuId.value = null
})

const goHome = () => {
  navigateTo('/')
}

const isMenuActive = (item: any) => {
  const path = `/pages/${domain.value?.domain_id}/${item.item_id}`
  if (route.path === path) return true
  if (item.children?.length) {
    return item.children.some((child: any) => isChildActive(child.item_id))
  }
  return false
}

const isChildActive = (childId: number) => {
  const path = `/pages/${domain.value?.domain_id}/${childId}`
  return route.path === path
}
</script>

<style scoped>
.public-header {
  width: 100%;
  background: white;
}

.stiky-header {
  position: sticky;
  top: 0;
  display: space-between;
  z-index: 1000;
}

.flag {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1100;

}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* ---- Top Bar ---- */
.top-bar {
  background-color: var(--header-bg, white);
  border-bottom: 3px solid var(--top-bar-border, var(--primary-color));
  padding: 1rem 0;

}

.top-bar-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

}

.logo-align-left .top-bar-inner {
  justify-content: flex-start;
}

.logo-align-center .top-bar-inner {
  justify-content: center;
}

.logo-align-right .top-bar-inner {
  justify-content: flex-end;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.brand-logo {
  max-height: 97px;
  width: 100%;
  object-fit: contain;
}

.mobile-logo {
  display: none;
}

.desktop-logo {
  display: inline-block;
}

.bottom-bar {
  border-bottom: none;
  border-top: 3px solid var(--top-bar-border, var(--primary-color));
}

.brand-title h1 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--primary-color, #1a202c);
  margin: 0;
  line-height: 1.3;
  font-family: var(--font-battambang);
}

/* ---- Mobile logo bar ---- */
.mobile-logo-bar {
  display: none;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.mobile-logo-inner {
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0.75rem 1rem;
}

.mobile-logo-img {
  max-height: 97px;
  width: auto;
  object-fit: contain;
}

.mobile-logo-title h1 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-color, #1a202c);
  margin: 0;
  font-family: var(--font-battambang);
}

/* ---- Navbar ---- */
.navbar {
  background-color: var(--nav-bg, #1e3a5f);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0;
}

.navbar-container {
  display: flex;
  align-items: center;
  height: 46px;
}

.navbar-brand-group {
  display: none;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.mobile-brand {
  display: none;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
}

/* Login button */
.login-btn {
  padding: 0.4rem 1.15rem;
  background-color: var(--primary-color, #3b82f6);
  color: white !important;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.login-btn:hover {
  background-color: var(--primary-dark, #2563eb);
  color: white !important;
}

/* Hamburger toggler */
.navbar-toggler {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: white;
  font-size: 1.25rem;
  box-shadow: none !important;
  outline: none !important;
}

/* ---- Menu (always visible on desktop) ---- */
.navbar-menu {
  display: flex;
  align-items: stretch;
  flex: 1;
}

/* ---- Nav links ---- */
.navbar-nav {
  display: flex;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  gap: 0;
}

.menu-align-left {
  justify-content: flex-start;
}

.menu-align-center {
  justify-content: center;
  flex: 1;
}

.menu-align-right {
  justify-content: flex-end;
  flex: 1;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: stretch;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.4rem 1.15rem;
  margin: 0.35rem 0;
  border-radius: 6px;
  color: var(--nav-text, rgba(255, 255, 255, 0.9)) !important;
  text-decoration: none !important;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--font-moul, 'Moul', serif);
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;
  height: auto;
}

.nav-link:hover {
  background-color: var(--nav-hover, rgba(255, 255, 255, 0.1));
  color: white !important;
  border-radius: 6px;
}

.nav-link.active {
  background-color: var(--nav-active, rgba(0, 0, 0, 0.2));
  color: white !important;
  font-weight: 600;
  border-radius: 6px;
}

/* ---- Dropdown ---- */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 220px;
  background-color: var(--nav-dropdown-bg, white);
  border-radius: 0 0 6px 6px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  border: none;
  padding: 0.5rem 0;
  margin: 0;
  z-index: 200;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: all 0.2s;
  display: block;
}

/* Desktop: show on hover AND on manual .show-dropdown class */
@media (min-width: 769px) {

  .nav-item.dropdown:hover>.dropdown-menu,
  .nav-item.dropdown.show-dropdown>.dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

/* Hide Bootstrap's default caret */
.dropdown-toggle::after {
  display: none;
}

/* Toggle chevron icon */
.toggle-icon {
  margin-left: 0.35rem;
  font-size: 0.7rem;
  opacity: 0.7;
}

/* Dropdown items */
.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.65rem 1.25rem;
  clear: both;
  color: var(--nav-dropdown-text, #4a5568);
  text-decoration: none !important;
  font-size: 0.875rem;
  font-family: var(--font-moul, 'Moul', serif);
  transition: background-color 0.15s, color 0.15s;
  white-space: nowrap;
  background: none;
  border: none;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: var(--nav-dropdown-hover, var(--primary-color));
  color: white !important;
}

.dropdown-item.active {
  background-color: var(--nav-active, var(--primary-color));
  color: white !important;
  font-weight: 600;
}

/* Screen mode: boxed */
.screen-boxed .navbar-container {
  max-width: 960px;
}

/* Menu position bottom: nav not sticky */
.menu-pos-bottom .navbar {
  position: relative;
}

/* ---- Responsive (mobile < 769px) ---- */
@media (max-width: 768px) {
  .flag {
    position: fixed;
    right: 1.5rem;
    top: 1.5rem;
    background-color: white;
  }

  .top-bar {
    display: none !important;
  }

  .mobile-logo-bar {
    display: block;
  }

  .navbar-container {
    flex-wrap: wrap;
    height: auto;
    min-height: 46px;
    padding: 0;
  }

  .navbar-brand-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 1rem;
  }

  .mobile-brand {
    display: flex;
  }

  .mobile-brand .brand-title h1 {
    font-size: 0.95rem;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .navbar-toggler {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* Menu: hidden by default on mobile, shown when mobile-open */
  .navbar-menu {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: var(--nav-bg, #1e3a5f);
  }

  .navbar-menu.mobile-open {
    display: flex;
  }

  .navbar-nav {
    flex-direction: column;
    width: 100%;
    height: auto;
  }

  .nav-item {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-link {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    height: auto;
  }

  /* Mobile dropdown: inline accordion */
  .dropdown-menu {
    position: static !important;
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    background-color: rgba(0, 0, 0, 0.1) !important;
    padding: 0 !important;
    margin: 0 !important;
    top: auto !important;
    left: auto !important;
    display: none !important;
  }

  .nav-item.dropdown.show-dropdown>.dropdown-menu {
    display: block !important;
  }

  .dropdown-item {
    color: rgba(255, 255, 255, 0.8);
    padding: 0.7rem 1rem 0.7rem 2rem;
    font-size: 0.825rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .dropdown-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white !important;
  }

  .login-btn {
    display: none;
  }

  .navbar {
    position: relative;
  }
}
</style>
