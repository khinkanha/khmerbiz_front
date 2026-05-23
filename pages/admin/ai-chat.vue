<template>
  <div class="ai-chat-page">
    <div class="page-header">
      <h1>AI Assistant</h1>
      <p>Get help with website management, content creation, and more</p>
    </div>

    <div class="chat-layout">
      <div class="chat-main">
        <AIChat />
      </div>

      <div class="chat-sidebar">
        <div class="sidebar-section">
          <h3>What can AI do?</h3>
          <ul class="capability-list">
            <li>
              <i class="pi pi-palette"></i>
              <span>Change themes, layouts, and styling</span>
            </li>
            <li>
              <i class="pi pi-file-text"></i>
              <span>Create and edit articles, news, documents</span>
            </li>
            <li>
              <i class="pi pi-bars"></i>
              <span>Manage menus and navigation</span>
            </li>
            <li>
              <i class="pi pi-image"></i>
              <span>Handle banners and media</span>
            </li>
            <li>
              <i class="pi pi-search"></i>
              <span>Optimize SEO and metadata</span>
            </li>
            <li>
              <i class="pi pi-bolt"></i>
              <span>Quick setup website templates</span>
            </li>
          </ul>
        </div>

        <div class="sidebar-section">
          <h3>Usage</h3>
          <div class="usage-info">
            <div class="usage-stat">
              <span class="usage-label">Questions today:</span>
              <span class="usage-value">{{ usageInfo?.questions_count || 0 }}/10</span>
            </div>
            <div class="usage-stat">
              <span class="usage-label">Remaining:</span>
              <span class="usage-value">{{ usageInfo?.remaining_questions || 10 }}</span>
            </div>
            <div class="usage-stat">
              <span class="usage-label">Resets at:</span>
              <span class="usage-value">{{ resetTime }}</span>
            </div>
          </div>
          <div class="upgrade-notice" v-if="usageInfo && usageInfo.remaining_questions <= 2">
            <i class="pi pi-exclamation-triangle"></i>
            <span>Running low on questions! <a href="/pricing">Upgrade to Pro</a></span>
          </div>
        </div>

        <div class="sidebar-section">
          <h3>Tips</h3>
          <ul class="tips-list">
            <li>Be specific about what you want</li>
            <li>Use natural language - no technical terms needed</li>
            <li>AI will ask before making major changes</li>
            <li>All changes can be undone</li>
            <li>Daily limit resets at midnight</li>
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
  height: calc(100vh - 200px);
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
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: #374151;
}

.capability-list i {
  color: #6366f1;
  font-size: 1.125rem;
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
