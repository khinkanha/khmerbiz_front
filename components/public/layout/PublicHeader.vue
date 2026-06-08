<template>
  <header class="public-header" :class="headerClass">
    <!-- Language flag -->
    <div class="flag">
      <LanguageSelector />
    </div>
    <!-- Top Bar (hidden when logo_position=bottom) -->
    <div v-if="logoPos !== 3" class="top-bar">
      <div class="container top-bar-inner">
        <div class="brand" @click="goHome">
          <!-- Desktop logo -->
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
        <img v-if="settings?.mobile_logo" :src="config.photoUrl + settings.mobile_logo"
          :alt="settings?.title || 'Logo'" class="mobile-logo-img" />
        <div v-else-if="settings?.title" class="mobile-logo-title">
          <h1>{{ settings.title }}</h1>
        </div>
      </div>
    </div>

    <!-- Navigation Bar -->
    <nav class="nav-bar">
      <div class="container nav-inner">
        <!-- Mobile brand: title only in nav bar -->
        <div class="mobile-brand" @click="goHome">
          <div v-if="settings?.title" class="brand-title">
            <h1>{{ settings.title }}</h1>
          </div>
        </div>

        <ul class="nav-list" :class="navListClass">
          <li v-for="item in filteredMenuTree" :key="item.item_id" class="nav-item"
            :class="{ 'has-dropdown': item.children && item.children.length > 0, 'accordion-open': expandedMenuId === item.item_id }">

            <!-- Items WITH children: clickable toggle (mobile accordion) / hoverable (desktop) -->
            <template v-if="item.children && item.children.length > 0">
              <a v-if="isSinglePage" :href="`#section-${item.item_id}`" class="nav-link"
                :class="{ active: activeMenuId === item.item_id }" @click.prevent="scrollToSection(item.item_id)">
                {{ item.item_name }}
              </a>
              <div v-else class="nav-link nav-link-parent" :class="{ active: isMenuActive(item) }"
                @click="toggleAccordion(item.item_id)">
                <span>{{ item.item_name }}</span>
                <i class="pi accordion-icon" :class="expandedMenuId === item.item_id ? 'pi-chevron-up' : 'pi-chevron-down'" />
              </div>
            </template>

            <!-- Items WITHOUT children: normal links -->
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

            <div v-if="item.children && item.children.length > 0" class="dropdown-menu">
              <div class="dropdown-inner">
                <template v-if="isSinglePage">
                  <a v-for="child in item.children" :key="child.item_id" :href="`#section-${child.item_id}`"
                    class="dropdown-link" @click.prevent="scrollToSection(child.item_id)">
                    {{ child.item_name }}
                  </a>
                </template>
                <template v-else>
                  <NuxtLink v-for="child in item.children" :key="child.item_id"
                    :to="`/pages/${domain?.domain_id}/${child.item_id}`" class="dropdown-link"
                    :class="{ active: isChildActive(child.item_id) }">
                    {{ child.item_name }}
                  </NuxtLink>
                </template>
              </div>
            </div>
          </li>
        </ul>

        <NuxtLink v-if="!isAuthenticated" to="/member/login" class="login-btn">
          {{ $t('auth.login') }}
        </NuxtLink>
        <button class="mobile-toggle" @click="toggleMobileMenu">
          <i :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
        </button>


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

  // logo_align: 1=Left, 2=Center, 3=Right
  const logoAlign = Number(settings.value?.logo_align) || 2
  if (logoAlign === 1) classes.push('logo-align-left')
  else if (logoAlign === 3) classes.push('logo-align-right')
  else classes.push('logo-align-center')

  // menu_pos: 1=Top (sticky), 2=Middle (sticky), 3=Bottom (relative)
  const menuPos = Number(settings.value?.menu_pos) || 1
  if (menuPos === 3) classes.push('menu-pos-bottom')

  // screen_mode: 1=full screen, 2=boxed
  const screenMode = Number(settings.value?.screen_mode) || 1
  if (screenMode === 2) classes.push('screen-boxed')

  return classes.join(' ')
})

// logo_position: 1=Top (above nav), 2=Middle (inside nav), 3=Bottom (below nav)
const logoPos = computed(() => Number(settings.value?.logo_position) || 1)

// menu_align: 1=Left, 2=Center, 3=Right
const navListClass = computed(() => {
  const classes: string[] = []
  if (mobileMenuOpen.value) classes.push('mobile-open')

  const menuAlign = Number(settings.value?.menu_align) || 2
  if (menuAlign === 1) classes.push('menu-align-left')
  else if (menuAlign === 3) classes.push('menu-align-right')
  else classes.push('menu-align-center')

  return classes.join(' ')
})

const mobileMenuOpen = ref(false)
const expandedMenuId = ref<number | null>(null)

const toggleAccordion = (itemId: number) => {
  // Exclusive accordion: only one parent open at a time
  expandedMenuId.value = expandedMenuId.value === itemId ? null : itemId
}

// Auto-close mobile menu and accordion on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
  expandedMenuId.value = null
})

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const goHome = () => {
  navigateTo('/')
}

const isMenuActive = (item: any) => {
  const path = `/pages/${domain.value?.domain_id}/${item.item_id}`
  if (route.path === path) return true
  // If viewing a child page, highlight the parent
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

.flag {
  position: fixed;
  z-index: 1100;
  top: 0;
  right: 0;
  margin-right: 20px;
  margin-top: 5px;
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

/* Logo alignment */
.logo-align-left .top-bar-inner {
  justify-content: flex-start;
}

.logo-align-center .top-bar-inner {
  justify-content: center;
}

.logo-align-right .top-bar-inner {
  justify-content: flex-end;
}

.logo-align-right .top-actions {
  position: static;
  margin-right: auto;
}

.logo-align-left .top-actions {
  margin-left: auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.top-actions {
  position: absolute;
  right: 1rem;
}

.brand-logo {
  max-height: 97px;
  width: auto;
  max-width: 95%;
  object-fit: contain;
}

/* Mobile logo: hidden on desktop, shown on mobile */
.mobile-logo {
  display: none;
}

.desktop-logo {
  display: inline-block;
}

.brand-logo-small {
  max-height: 36px;
}

.brand-inline {
  cursor: pointer;
  margin-right: 1rem;
  flex-shrink: 0;
}

/* Bottom bar (logo_position=3) */
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

/* Menu alignment */
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

/* Screen mode: boxed */
.screen-boxed .container {
  max-width: 960px;
}

/* Menu position bottom: nav not sticky */
.menu-pos-bottom .nav-bar {
  position: relative;
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
  font-family: var(--font-moul, 'Moul', serif);
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;
  height: 100%;
}

.nav-link:hover {
  background-color: var(--nav-hover, rgba(255, 255, 255, 0.1));
  color: white;
}

.nav-link.active {
  background-color: var(--nav-active, rgba(0, 0, 0, 0.2));
  color: white;
  font-weight: 600;
}

/* Dropdown */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 220px;
  background-color: var(--nav-dropdown-bg, white);
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
  color: var(--nav-dropdown-text, #4a5568);
  text-decoration: none;
  font-size: 0.85rem;
  transition: background-color 0.15s, color 0.15s;
  white-space: nowrap;
}

.dropdown-link:hover {
  background-color: var(--nav-dropdown-hover, var(--primary-color));
  color: white;
}

.dropdown-link.active {
  background-color: var(--nav-active, var(--primary-color));
  color: white;
  font-weight: 600;
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

/* Mobile Brand (title only, hidden on desktop) */
.mobile-brand {
  display: none;
  align-items: center;
  cursor: pointer;
}

/* Mobile logo bar (hidden on desktop) */
.mobile-logo-bar {
  display: none;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.mobile-logo-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
}

.mobile-logo-img {
  max-height: 48px;
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

/* ---- Responsive ---- */
@media (max-width: 768px) {
  /* Flag: static above nav on mobile instead of fixed overlay */
  .flag {
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: flex-end;
    padding: 0.4rem 1rem 0;
    background-color: white;
  }

  /* Hide desktop top bar on mobile */
  .top-bar {
    display: none !important;
  }

  /* Show mobile logo bar */
  .mobile-logo-bar {
    display: block;
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: auto;
    min-height: 46px;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
  }

  .mobile-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
  }

  .mobile-brand .brand-title h1 {
    font-size: 0.95rem;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .brand-inline {
    display: none;
  }

  .nav-list {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: var(--nav-bg, #1e3a5f);
    order: 3;
  }

  .nav-list.mobile-open {
    display: flex;
  }

  .nav-item {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-link {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* Parent link with accordion toggle */
  .nav-link-parent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .accordion-icon {
    font-size: 0.75rem;
    opacity: 0.7;
    transition: transform 0.2s;
  }

  /* Accordion dropdown: hidden by default, shown when parent is open */
  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: none;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .accordion-open .dropdown-menu {
    display: block;
    max-height: 500px;
  }

  /* Disable hover-based dropdown on mobile */
  .has-dropdown:hover .dropdown-menu {
    display: none;
  }

  .accordion-open.has-dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown-link {
    color: rgba(255, 255, 255, 0.8);
    padding: 0.7rem 1rem 0.7rem 2rem;
    font-size: 0.825rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .dropdown-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  .login-btn {
    display: none;
  }

  button.mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .nav-bar {
    position: relative;
  }
}
</style>
