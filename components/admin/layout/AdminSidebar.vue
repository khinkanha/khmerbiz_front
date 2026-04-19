<template>
  <aside class="admin-sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-title">{{ $t('sidebar.admin') }}</h2>
    </div>

    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <NuxtLink to="/admin" class="nav-link">
            <i class="pi pi-home"></i>
            <span>{{ $t('sidebar.dashboard') }}</span>
          </NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink to="/admin/content" class="nav-link">
            <i class="pi pi-file-edit"></i>
            <span>{{ $t('sidebar.content') }}</span>
          </NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink to="/admin/menu" class="nav-link">
            <i class="pi pi-bars"></i>
            <span>{{ $t('sidebar.menu') }}</span>
          </NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink to="/admin/media" class="nav-link">
            <i class="pi pi-image"></i>
            <span>{{ $t('sidebar.media') }}</span>
          </NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink to="/admin/users" class="nav-link">
            <i class="pi pi-users"></i>
            <span>{{ $t('sidebar.users') }}</span>
          </NuxtLink>
        </li>

        <li class="nav-section">
          <span class="nav-section-title">{{ $t('sidebar.settings') }}</span>
        </li>

        <li class="nav-item">
          <NuxtLink to="/admin/settings/logo" class="nav-link">
            <span>{{ $t('sidebar.logoSetting') }}</span>
          </NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink to="/admin/settings/menu" class="nav-link">
            <span>{{ $t('sidebar.menuSetting') }}</span>
          </NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink to="/admin/settings/banner" class="nav-link">
            <span>{{ $t('sidebar.slideshowSetting') }}</span>
          </NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink to="/admin/settings/language" class="nav-link">
            <span>{{ $t('sidebar.languageSetting') }}</span>
          </NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink to="/admin/settings/social" class="nav-link">
            <span>{{ $t('sidebar.socialSetting') }}</span>
          </NuxtLink>
        </li>

        <li class="nav-item">
          <NuxtLink to="/admin/settings" class="nav-link">
            <span>{{ $t('sidebar.otherSetting') }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

const isActiveLink = (path: string) => {
  return route.path.startsWith(path)
}
</script>

<style scoped>
.admin-sidebar {
  width: 250px;
  background-color: #1a202c;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: white;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  padding: 0 1rem;
}

.nav-section {
  padding: 1rem 1rem 0.5rem;
}

.nav-section-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.router-link-active {
  background-color: rgba(102, 126, 234, 0.2);
  color: #667eea;
}

.nav-link i {
  font-size: 1rem;
}

.nav-link span {
  font-size: 0.875rem;
}
</style>
