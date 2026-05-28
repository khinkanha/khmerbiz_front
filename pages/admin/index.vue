<template>
  <div class="dashboard">
    <!-- Setup Banner -->
    <div v-if="needsSetup" class="setup-banner">
      <div class="setup-banner-content">
        <div class="setup-banner-text">
          <i class="pi pi-exclamation-circle"></i>
          <span>Your website isn't set up yet. Complete the Quick Setup to get started.</span>
        </div>
        <NuxtLink to="/admin/setup" class="setup-banner-btn">
          Quick Setup <i class="pi pi-arrow-right"></i>
        </NuxtLink>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">{{ $t('dashboard.quickActions') }}</div>
      <div class="panel-body">
        <NuxtLink to="/admin/ai-chat" class="qbtn-link">
          <div class="qbtn ai-chat-btn">
            <div class="qbtn-icon">🤖</div>
            <div class="qbtn-label">AI Assistant</div>
          </div>
        </NuxtLink>

        <template v-if="authStore.user">
          <NuxtLink v-if="!authStore.isSuperAdmin" to="/admin/settings" class="qbtn-link">
            <div class="qbtn">
              <div class="qbtn-icon">⚙️</div>
              <div class="qbtn-label">{{ $t('dashboard.settings') }}</div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="!authStore.isSuperAdmin" to="/admin/content" class="qbtn-link">
            <div class="qbtn">
              <div class="qbtn-icon">📝</div>
              <div class="qbtn-label">{{ $t('dashboard.manageContent') }}</div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="!authStore.isSuperAdmin" to="/admin/media" class="qbtn-link">
            <div class="qbtn">
              <div class="qbtn-icon">🖼️</div>
              <div class="qbtn-label">{{ $t('dashboard.uploadMedia') }}</div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="!authStore.isSuperAdmin" to="/admin/users" class="qbtn-link">
            <div class="qbtn">
              <div class="qbtn-icon">👥</div>
              <div class="qbtn-label">{{ $t('dashboard.userManagement') }}</div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="authStore.isSuperAdmin" to="/admin/super/users" class="qbtn-link">
            <div class="qbtn">
              <div class="qbtn-icon">👥</div>
              <div class="qbtn-label">{{ $t('dashboard.userManagement') }}</div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="authStore.isSuperAdmin" to="/admin/super/domains" class="qbtn-link">
            <div class="qbtn">
              <div class="qbtn-icon">🌐</div>
              <div class="qbtn-label">{{ $t('sidebar.domains') }}</div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="authStore.isSuperAdmin" to="/admin/super/announcing" class="qbtn-link">
            <div class="qbtn">
              <div class="qbtn-icon">📢</div>
              <div class="qbtn-label">{{ $t('sidebar.announce') }}</div>
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
import { useDomainStore } from '~/stores/domain'
import { useAuthStore } from '~/stores/auth'
import { useSetup } from '~/composables/useSetup'
const domainStore = useDomainStore()
const authStore = useAuthStore()
const { setupStatus, fetchStatus } = useSetup()

const needsSetup = computed(() =>
  authStore.isWebAdmin && setupStatus.value &&
  (!setupStatus.value.hasLanguage || !setupStatus.value.hasMenus || !setupStatus.value.hasContent)
)

onMounted(async () => {
  await domainStore.resolveDomain(authStore.user?.domain_id)
  if (authStore.isWebAdmin) await fetchStatus()
})
</script>

<style scoped>
.setup-banner {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  padding: 1rem 1.5rem;
}

.setup-banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.setup-banner-text {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-size: 0.95rem;
}

.setup-banner-text i {
  font-size: 1.25rem;
}

.setup-banner-btn {
  background: white;
  color: #6366f1;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  transition: background 0.15s;
}

.setup-banner-btn:hover {
  background: #f0f0ff;
}

.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.panel {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.panel-header {
  background-color: #f5f5f5;
  padding: 10px 15px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #ddd;
}

.panel-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
}

.qbtn-link {
  text-decoration: none;
}

.qbtn {
  color: black;
  border-radius: 10px;
  margin: 15px;
  padding: 15px;
  background-color: white;
  border: #999 solid 1px;
  outline: none;
  width: 25vh;
  min-width: 140px;
  max-width: 200px;
  box-shadow: 0px 7px #999;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: transform 0.15s, background-color 0.15s;
}

.ai-chat-btn {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-color: #6366f1;
  color: white;
  box-shadow: 0px 7px #6366f1;
}

.ai-chat-btn:hover {
  background: linear-gradient(135deg, #5558e8 0%, #7c4fe8 100%);
}

.qbtn:hover {
  transform: scale(1.1);
  background-color: whitesmoke;
}

.qbtn:active {
  transform: scale(1.0);
  box-shadow: 0px 2px #999;
}

.qbtn-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.qbtn-label {
  font-size: 0.9rem;
  font-weight: 500;
}
</style>
