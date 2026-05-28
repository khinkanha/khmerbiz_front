<template>
  <nav class="navbar navbar-inverse title">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" @click="mobileOpen = !mobileOpen">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand hidden-lg hidden-md" href="#">Cambodia Webhosting</a>
      </div>

      <div class="navbar-collapse" :class="{ in: mobileOpen }" id="mybar">
        <!-- Left nav -->
        <ul class="nav navbar-nav" v-if="authStore.user">
          <li :class="{ active: currentTab === 'home' }">
            <NuxtLink to="/admin">{{ $t('sidebar.home') }}</NuxtLink>
          </li>

          <li v-if="needsSetup" :class="{ active: currentTab === 'setup' }">
            <NuxtLink to="/admin/setup"><i class="fa fa-bolt" style="margin-right: 4px;"></i> Quick Setup</NuxtLink>
          </li>

          <!-- Super Admin -->
          <li v-if="authStore.isSuperAdmin" :class="{ active: currentTab === 'admin', dropdown: true }">
            <a class="dropdown-toggle" @click.prevent="adminDrop = !adminDrop">
              {{ $t('sidebar.admin') }} <b class="caret"></b>
            </a>
            <ul v-if="adminDrop" class="dropdown-menu">
              <li><NuxtLink to="/admin/super/users" @click="closeMenus"><i class="fa fa-users"></i> {{ $t('sidebar.users') }}</NuxtLink></li>
              <li><NuxtLink to="/admin/super/domains" @click="closeMenus"><i class="fa fa-globe"></i> {{ $t('userManager.domain') }}</NuxtLink></li>
              <li><NuxtLink to="/admin/super/announcing" @click="closeMenus"><i class="fa fa-bullhorn"></i> {{ $t('sidebar.announce') }}</NuxtLink></li>
            </ul>
          </li>

          <!-- Web Admin (always show) / Normal User (show if not sitebuilder) -->
          <template v-if="authStore.isWebAdmin || (!authStore.isSuperAdmin && hasDomain && !isSitebuilder)">
            <li :class="{ active: currentTab === 'websetting' }">
              <NuxtLink to="/admin/settings">{{ $t('sidebar.settings') }}</NuxtLink>
            </li>
            <li :class="{ active: currentTab === 'menu' }">
              <NuxtLink to="/admin/menu">{{ $t('sidebar.menu') }}</NuxtLink>
            </li>
            <li :class="{ active: currentTab === 'content' }">
              <NuxtLink to="/admin/content">{{ $t('sidebar.content') }}</NuxtLink>
            </li>
          </template>

          <li v-if="authStore.isWebAdmin || hasDomain" :class="{ active: currentTab === 'media' }">
            <NuxtLink to="/admin/media">{{ $t('sidebar.media') }}</NuxtLink>
          </li>

          <li v-if="authStore.isWebAdmin || (hasDomain && !isSitebuilder)" :class="{ active: currentTab === 'member' }">
            <NuxtLink to="/admin/users">{{ $t('sidebar.users') }}</NuxtLink>
          </li>
        </ul>

        <!-- Right nav -->
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!authStore.isAuthenticated">
            <NuxtLink to="/admin/login">{{ $t('sidebar.login') }}</NuxtLink>
          </li>
          <li v-else class="dropdown user-dropdown">
            <a class="dropdown-toggle" @click.prevent="userDrop = !userDrop">
              <i class="fa fa-user"></i> {{ userName }} <b class="caret"></b>
            </a>
            <ul v-if="userDrop" class="dropdown-menu">
              <li><NuxtLink to="/admin/profile" @click="closeMenus"><i class="fa fa-user"></i> {{ $t('userManager.profileSetting') }}</NuxtLink></li>
              <li><NuxtLink to="/admin/password" @click="closeMenus"><i class="fa fa-gear"></i> {{ $t('userManager.passwordSetting') }}</NuxtLink></li>
              <li class="divider"></li>
              <li><a href="#" @click.prevent="handleLogout"><i class="fa fa-power-off"></i> {{ $t('sidebar.logout') }}</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useSetup } from '~/composables/useSetup'

const authStore = useAuthStore()
const { setupStatus, fetchStatus } = useSetup()

const needsSetup = computed(() =>
  authStore.isWebAdmin && setupStatus.value &&
  (!setupStatus.value.hasLanguage || !setupStatus.value.hasMenus || !setupStatus.value.hasContent)
)

// Initialize from localStorage on client
if (import.meta.client) {
  authStore.initialize()
}

const router = useRouter()
const route = useRoute()

const adminDrop = ref(false)
const userDrop = ref(false)
const mobileOpen = ref(false)

const userName = computed(() => {
  const u = authStore.user
  return u ? (u.username || '').charAt(0).toUpperCase() + (u.username || '').slice(1) : ''
})

const hasDomain = computed(() => (authStore.user?.domain_id ?? 0) > 0)
const isSitebuilder = computed(() => (authStore.user?.sitebuilder ?? 0) !== 0)

const currentTab = computed(() => {
  const path = route.path
  if (path === '/admin') return 'home'
  if (path.startsWith('/admin/setup')) return 'setup'
  if (path.startsWith('/admin/settings')) return 'websetting'
  if (path.startsWith('/admin/menu')) return 'menu'
  if (path.startsWith('/admin/content')) return 'content'
  if (path.startsWith('/admin/media')) return 'media'
  if (path.startsWith('/admin/users')) return 'member'
  if (path.startsWith('/admin/super')) return 'admin'
  if (path === '/admin/profile' || path === '/admin/password') return 'home'
  return ''
})

const closeMenus = () => {
  adminDrop.value = false
  userDrop.value = false
  mobileOpen.value = false
}

const handleLogout = async () => {
  closeMenus()
  await authStore.logout()
  router.push('/admin/login')
}

router.afterEach(() => closeMenus())

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  if (authStore.isWebAdmin) await fetchStatus()
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (e: Event) => {
  const t = e.target as HTMLElement
  if (!t.closest('.dropdown') && !t.closest('.user-dropdown')) {
    adminDrop.value = false
    userDrop.value = false
  }
}
</script>

<style scoped>
/* Bootstrap 3 navbar-inverse */
.navbar {
  min-height: 50px;
  margin-bottom: 0;
  border: 1px solid transparent;
  position: relative;
}

.navbar-inverse {
  background-color: #222;
  border-color: #080808;
}

.navbar .container {
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.navbar-header {
  display: flex;
  align-items: center;
}

.navbar-brand {
  color: #9d9d9d;
  font-size: 18px;
  line-height: 20px;
  padding: 15px;
  text-decoration: none;
}

.navbar-toggle {
  background-color: #333;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
}

.icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
  background-color: #fff;
  margin: 4px 0;
}

.navbar-collapse {
  display: flex;
  align-items: center;
  flex: 1;
}

.navbar-collapse.in {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: stretch;
}

.navbar-nav {
  display: flex;
  align-items: stretch;
}

.navbar-nav > li > a {
  color: #9d9d9d;
  text-decoration: none;
  padding: 15px;
  display: block;
  font-size: 16px;
  cursor: pointer;
}

.navbar-inverse .navbar-nav > li > a:hover,
.navbar-inverse .navbar-nav > li > a:focus {
  color: #fff;
  background-color: #4C4C4C;
}

.navbar-inverse .navbar-nav > li.active > a,
.navbar-inverse .navbar-nav > li.active > a:hover {
  color: #fff;
  background-color: #4C4C4C;
}

.navbar-inverse .navbar-brand:hover {
  color: #fff;
}

/* Dropdown */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  background-color: #222;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
}

.dropdown-menu li a {
  color: #fff;
  padding: 8px 15px;
  display: block;
  text-decoration: none;
  font-size: 16px;
}

.dropdown-menu li a:hover {
  color: #fff;
  background-color: #4C4C4C;
}

.dropdown-menu .divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}

.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}

.navbar-right {
  margin-left: auto;
}

/* Mobile */
@media (max-width: 767px) {
  .navbar .container {
    flex-direction: column;
    align-items: stretch;
  }

  .navbar-collapse {
    flex-direction: column;
  }

  .navbar-nav {
    flex-direction: column;
  }

  .navbar-nav > li {
    float: none;
  }

  .navbar-nav > li > a {
    padding: 10px 15px;
  }

  .dropdown-menu {
    position: static;
    float: none;
    background-color: #222;
    border: none;
    box-shadow: none;
  }

  .hidden-lg, .hidden-md {
    display: block;
  }

  .navbar-brand {
    display: inline;
  }

  .navbar-header {
    justify-content: space-between;
  }

  .navbar-collapse:not(.in) {
    display: none;
  }
}

@media (min-width: 768px) {
  .hidden-lg.hidden-md {
    display: none;
  }

  .navbar-toggle {
    display: none;
  }
}
</style>
