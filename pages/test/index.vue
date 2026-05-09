<template>
  <div class="test-page">
    <h1>Test Page</h1>
    <p>This is a test page to verify the layout and components. And It protected by authentication.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  title: 'Test Page',
})

</script>

<style scoped>
.test-page {
  padding: 20px;
}
</style>