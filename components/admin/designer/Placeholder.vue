<template>
  <div class="placeholder">
    <i :class="icon" />
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ icon: string; title: string; text: string }>()
</script>

<style scoped>
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 50px 24px;
  color: #64748b;
}
.placeholder i {
  font-size: 34px;
  color: #93c5fd;
  margin-bottom: 14px;
}
.placeholder h3 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #334155;
}
.placeholder p {
  margin: 0;
  font-size: 13px;
  max-width: 360px;
  line-height: 1.6;
}
</style>
