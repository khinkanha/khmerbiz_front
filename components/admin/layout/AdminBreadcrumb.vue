<template>
  <nav class="breadcrumb">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <NuxtLink to="/admin">
          <i class="pi pi-home"></i>
        </NuxtLink>
      </li>

      <li
        v-for="(item, index) in breadcrumbItems"
        :key="index"
        class="breadcrumb-item"
      >
        <i class="pi pi-chevron-right breadcrumb-separator"></i>
        <NuxtLink v-if="item.to" :to="item.to">
          {{ item.label }}
        </NuxtLink>
        <span v-else>{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

const route = useRoute()
const { t } = useI18n()

const breadcrumbMap: Record<string, string> = {
  content: t('sidebar.content'),
  menu: t('sidebar.menu'),
  media: t('sidebar.media'),
  users: t('sidebar.users'),
  settings: t('sidebar.settings'),
  profile: t('header.profile'),
  password: t('userManager.passwordSetting'),
}

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const pathSegments = route.path.split('/').filter(Boolean)

  if (pathSegments.length === 1 && pathSegments[0] === 'admin') {
    return []
  }

  const items: BreadcrumbItem[] = []
  let currentPath = ''

  for (let i = 1; i < pathSegments.length; i++) {
    const segment = pathSegments[i]
    currentPath += `/${segment}`

    if (segment === 'admin') continue

    const label = breadcrumbMap[segment] || segment
    const isLast = i === pathSegments.length - 1

    items.push({
      label,
      to: isLast ? undefined : currentPath,
    })
  }

  return items
})
</script>

<style scoped>
.breadcrumb {
  padding: 0;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.breadcrumb-item a {
  color: #4a5568;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-item a:hover {
  color: #667eea;
}

.breadcrumb-item span {
  color: #1a202c;
  font-weight: 500;
}

.breadcrumb-separator {
  font-size: 0.625rem;
  color: #a0aec0;
}
</style>
