<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1 class="dashboard-title">{{ $t('dashboard.title') }}</h1>
      <p class="dashboard-subtitle">{{ $t('dashboard.subtitle') }}</p>
    </div>

    <div class="stats-grid">
      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon users">
              <i class="pi pi-users"></i>
            </div>
            <div class="stat-info">
              <h3 class="stat-value">{{ stats.totalUsers }}</h3>
              <p class="stat-label">{{ $t('dashboard.totalUsers') }}</p>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon content">
              <i class="pi pi-file-edit"></i>
            </div>
            <div class="stat-info">
              <h3 class="stat-value">{{ stats.totalContent }}</h3>
              <p class="stat-label">{{ $t('dashboard.totalContent') }}</p>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon media">
              <i class="pi pi-image"></i>
            </div>
            <div class="stat-info">
              <h3 class="stat-value">{{ stats.totalMedia }}</h3>
              <p class="stat-label">{{ $t('dashboard.totalMedia') }}</p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div class="quick-actions">
      <h2 class="section-title">{{ $t('dashboard.quickActions') }}</h2>
      <div class="actions-grid">
        <Button
          :label="$t('dashboard.manageContent')"
          icon="pi pi-file-edit"
          @click="$router.push('/admin/content')"
        />
        <Button
          :label="$t('dashboard.uploadMedia')"
          icon="pi pi-upload"
          severity="secondary"
          @click="$router.push('/admin/media')"
        />
        <Button
          :label="$t('dashboard.userManagement')"
          icon="pi pi-users"
          severity="help"
          @click="$router.push('/admin/users')"
        />
        <Button
          :label="$t('dashboard.settings')"
          icon="pi pi-cog"
          severity="contrast"
          @click="$router.push('/admin/settings')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = ref({
  totalUsers: 0,
  totalContent: 0,
  totalMedia: 0,
})

onMounted(() => {
  // Fetch stats from API
  // For now, using dummy values
  stats.value = {
    totalUsers: 150,
    totalContent: 42,
    totalMedia: 289,
  }
})
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.dashboard-subtitle {
  color: #718096;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-icon.users {
  background-color: #ebf8ff;
  color: #4299e1;
}

.stat-icon.content {
  background-color: #faf5ff;
  color: #805ad5;
}

.stat-icon.media {
  background-color: #fff5f5;
  color: #f56565;
}

.stat-info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
}

.stat-info p {
  color: #718096;
  margin: 0;
  font-size: 0.875rem;
}

.quick-actions {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 1rem 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
