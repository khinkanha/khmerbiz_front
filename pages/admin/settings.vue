<template>
  <div class="settings-layout">
    <div class="settings-sidebar-col">
      <SettingsSidebar />
    </div>
    <div class="settings-content-col">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
</script>

<style scoped>
.settings-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 1.5rem;
  align-items: start;
}

.settings-sidebar-col {
  position: sticky;
  top: 66px;
}

@media (max-width: 768px) {
  .settings-layout {
    grid-template-columns: 1fr;
  }

  .settings-sidebar-col {
    position: static;
  }
}
</style>
