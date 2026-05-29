<template>
  <div class="container" v-if="authStore.isAuthenticated">
    <ol class="breadcrumb" v-if="breadcrumbs.length">
      <li v-for="(crumb, i) in breadcrumbs" :key="i" :class="{ active: i === breadcrumbs.length - 1 }">
        <NuxtLink v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</NuxtLink>
        <span v-else>{{ crumb.label }}</span>
      </li>
    </ol>
    <div v-if="route.path === '/admin'" class="container"><br /></div>
    <br />
    <p class="pull-right breadcrumb-actions" v-if="hasDomain">
      <button class="btn btn-default" @click="toggleLang" style="font-weight: bold">
        {{ currentLangText }}
      </button>
      <a class="btn btn-default" :href="'http://' + domainName" target="_blank" title="Click here to see your website">
        <i class="fa fa-globe"></i> <strong>{{ domainName }}</strong>
      </a>
    </p>
    <div class="clearfix"></div>

    <!-- Alert messages -->
    <div v-if="alertSuccess" class="alert alert-success alert-dismissable">
      <a href="#" class="close" @click.prevent="alertSuccess = ''">&times;</a>
      {{ alertSuccess }}
    </div>
    <div v-if="alertError" class="alert alert-danger alert-dismissable">
      <a href="#" class="close" @click.prevent="alertError = ''">&times;</a>
      {{ alertError }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useDomainStore } from '~/stores/domain'
import { useI18n } from '#imports'

const authStore = useAuthStore()
const domainStore = useDomainStore()
const { locale, setLocaleCookie } = useI18n()
const route = useRoute()

const alertSuccess = ref('')
const alertError = ref('')

const hasDomain = computed(() => (authStore.user?.domain_id ?? 0) > 0)
const domainName = computed(() => domainStore.domain?.domain_name || '')

const currentLangText = computed(() => locale.value === 'en' ? 'EN' : 'ខ្មែរ')

const toggleLang = () => {
  const newLocale = locale.value === 'en' ? 'kh' : 'en'
  locale.value = newLocale
  setLocaleCookie(newLocale)
}

const breadcrumbs = computed(() => {
  const path = route.path
  const crumbs: { label: string; to?: string }[] = []

  if (path.startsWith('/admin/settings')) {
    crumbs.push({ label: 'Settings', to: '/admin/settings' })
    if (path.includes('/logo')) crumbs.push({ label: 'Logo' })
    else if (path.includes('/menu')) crumbs.push({ label: 'Menu' })
    else if (path.includes('/banner')) crumbs.push({ label: 'Slideshow' })
    else if (path.includes('/language')) crumbs.push({ label: 'Language' })
    else if (path.includes('/social')) crumbs.push({ label: 'Social' })
    else crumbs.push({ label: 'Other' })
  } else if (path.startsWith('/admin/menu')) {
    crumbs.push({ label: 'Menu', to: '/admin/menu' })
    if (route.params.id) crumbs.push({ label: 'Edit' })
  } else if (path.startsWith('/admin/content')) {
    crumbs.push({ label: 'Content', to: '/admin/content' })
    if (route.params.contentId) crumbs.push({ label: 'Items' })
    if (route.params.id && !route.params.contentId) crumbs.push({ label: 'Edit' })
  } else if (path.startsWith('/admin/media')) {
    crumbs.push({ label: 'Media' })
  } else if (path.startsWith('/admin/ai-chat')) {
    crumbs.push({ label: 'AI Chat' })
  } else if (path.startsWith('/admin/users')) {
    crumbs.push({ label: 'Users' })
  } else if (path.startsWith('/admin/super/domains')) {
    crumbs.push({ label: 'Domains', to: '/admin/super/domains' })
    if (route.params.id) crumbs.push({ label: 'Dashboard' })
    if (path.includes('/add')) crumbs.push({ label: 'New' })
  } else if (path.startsWith('/admin/super/announcing')) {
    crumbs.push({ label: 'Announce' })
  } else if (path.startsWith('/admin/super/users')) {
    crumbs.push({ label: 'Members' })
  } else if (path === '/admin/profile') {
    crumbs.push({ label: 'Profile' })
  } else if (path === '/admin/password') {
    crumbs.push({ label: 'Password' })
  }

  return crumbs
})

provide('setAlertSuccess', (msg: string) => { alertSuccess.value = msg })
provide('setAlertError', (msg: string) => { alertError.value = msg })
</script>

<style scoped>
.container {
  margin-top: 5px;
}

.breadcrumb-actions {
  margin-top: -38px;
  margin-bottom: 10px;
}

.breadcrumb-actions .btn {
  margin-left: 5px;
}

.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

.close {
  float: right;
  font-size: 21px;
  font-weight: bold;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.2;
  text-decoration: none;
}

.close:hover {
  opacity: 0.5;
}
</style>
