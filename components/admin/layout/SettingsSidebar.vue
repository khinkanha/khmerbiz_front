<template>
  <div class="settings-sidebar">
    <h3 class="sidebar-heading">{{ $t('sidebar.settings') }}</h3>
    <ul class="sidebar-nav">
      <li>
        <NuxtLink to="/admin/settings/logo" class="sidebar-link" active-class="active">
          {{ $t('sidebar.logoSetting') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin/settings/menu" class="sidebar-link" active-class="active">
          {{ $t('sidebar.menuSetting') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin/settings/banner" class="sidebar-link" active-class="active">
          {{ $t('sidebar.slideshowSetting') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin/settings/language" class="sidebar-link" active-class="active">
          {{ $t('sidebar.languageSetting') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin/settings/social" class="sidebar-link" active-class="active">
          {{ $t('sidebar.socialSetting') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin/settings" class="sidebar-link" exact-active-class="active">
          {{ $t('sidebar.otherSetting') }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.settings-sidebar {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.sidebar-heading {
  font-size: 1rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
  font-family: var(--font-battambang);
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.sidebar-link {
  display: block;
  padding: 0.55rem 0.75rem;
  color: #4a5568;
  text-decoration: none;
  font-size: 0.85rem;
  border-radius: 4px;
  transition: background-color 0.15s, color 0.15s;
}

.sidebar-link:hover {
  background-color: #f7fafc;
  color: #1a202c;
}

.sidebar-link.active {
  background-color: #3b82f6;
  color: white;
}
</style>
