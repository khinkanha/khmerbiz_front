<template>
  <div class="ai-chat-page">
    <div class="page-header">
      <h1>{{ $t('aiChat.page.title') }}</h1>
      <p>{{ $t('aiChat.page.subtitle') }}</p>
    </div>

    <div class="chat-layout">
      <div class="chat-main">
        <AIChat />
      </div>

      <div class="chat-sidebar">
        <div class="sidebar-section">
          <h3>{{ $t('aiChat.sidebar.capabilitiesTitle') }}</h3>
          <ul class="capability-list">
            <li>
              <i class="pi pi-bolt"></i>
              <div>
                <strong>{{ $t('aiChat.sidebar.capabilities.setup.title') }}</strong>
                <p>{{ $t('aiChat.sidebar.capabilities.setup.desc') }}</p>
              </div>
            </li>
            <li>
              <i class="pi pi-th-large"></i>
              <div>
                <strong>{{ $t('aiChat.sidebar.capabilities.templates.title') }}</strong>
                <p>{{ $t('aiChat.sidebar.capabilities.templates.desc') }}</p>
              </div>
            </li>
            <li>
              <i class="pi pi-palette"></i>
              <div>
                <strong>{{ $t('aiChat.sidebar.capabilities.theme.title') }}</strong>
                <p>{{ $t('aiChat.sidebar.capabilities.theme.desc') }}</p>
              </div>
            </li>
            <li>
              <i class="pi pi-file"></i>
              <div>
                <strong>{{ $t('aiChat.sidebar.capabilities.pages.title') }}</strong>
                <p>{{ $t('aiChat.sidebar.capabilities.pages.desc') }}</p>
              </div>
            </li>
            <li>
              <i class="pi pi-bars"></i>
              <div>
                <strong>{{ $t('aiChat.sidebar.capabilities.menu.title') }}</strong>
                <p>{{ $t('aiChat.sidebar.capabilities.menu.desc') }}</p>
              </div>
            </li>
            <li>
              <i class="pi pi-image"></i>
              <div>
                <strong>{{ $t('aiChat.sidebar.capabilities.banners.title') }}</strong>
                <p>{{ $t('aiChat.sidebar.capabilities.banners.desc') }}</p>
              </div>
            </li>
            <li>
              <i class="pi pi-search"></i>
              <div>
                <strong>{{ $t('aiChat.sidebar.capabilities.seo.title') }}</strong>
                <p>{{ $t('aiChat.sidebar.capabilities.seo.desc') }}</p>
              </div>
            </li>
          </ul>
        </div>
    <div class="sidebar-section">
          <h3>{{ $t('aiChat.sidebar.tipsTitle') }}</h3>
          <ul class="tips-list">
            <li>{{ $t('aiChat.sidebar.tips.specific') }}</li>
            <li>{{ $t('aiChat.sidebar.tips.natural') }}</li>
            <li>{{ $t('aiChat.sidebar.tips.confirm') }}</li>
            <li>{{ $t('aiChat.sidebar.tips.undo') }}</li>
            <li>{{ $t('aiChat.sidebar.tips.reset') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' });

import { computed, onMounted } from 'vue';
import { useAIChat } from '~/composables/useAIChat';

const { usageInfo, getUsage } = useAIChat();

onMounted(async () => {
  await getUsage();
});

const resetTime = computed(() => {
  if (!usageInfo.value?.reset_at) return '';
  const resetDate = new Date(usageInfo.value.reset_at);
  return resetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
});
</script>

<style scoped>
.ai-chat-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: #1f2937;
}

.page-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1.125rem;
}

.chat-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  flex: 1;
  min-height: 0;
}

.chat-main {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.chat-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
}

.sidebar-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  color: #1f2937;
}

.capability-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.capability-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.6rem 0;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.capability-list li:last-child {
  border-bottom: none;
}

.capability-list li strong {
  display: block;
  font-size: 0.85rem;
  color: #1f2937;
  margin-bottom: 0.15rem;
}

.capability-list li p {
  margin: 0;
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.3;
}

.capability-list i {
  color: #6366f1;
  font-size: 1rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.usage-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.usage-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.usage-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.usage-value {
  font-weight: 500;
  color: #1f2937;
}

.upgrade-notice {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #92400e;
}

.upgrade-notice a {
  color: #6366f1;
  font-weight: 500;
  text-decoration: none;
}

.upgrade-notice a:hover {
  text-decoration: underline;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  padding: 0.5rem 0;
  font-size: 0.875rem;
  color: #6b7280;
  border-bottom: 1px solid #f3f4f6;
}

.tips-list li:last-child {
  border-bottom: none;
}

@media (max-width: 1024px) {
  .chat-layout {
    grid-template-columns: 1fr;
    height: auto;
  }

  .chat-main {
    height: 600px;
  }
}
</style>
