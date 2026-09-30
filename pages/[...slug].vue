<script setup lang="ts">
// Global catch-all route.
// Any URL without a matching page lands here, which means Vue Router actually
// *matches* it — silencing the "[Vue Router warn]: No match found for location
// with path ..." spam that bot/scanner requests cause in SSR server logs.
// Covers probes like /mcp, /sse, /news/7/20/412, etc.
throw createError({
  statusCode: 404,
  statusMessage: 'Page Not Found',
})
</script>

<template>
  <!-- Never rendered: setup() throws a 404 error above and Nuxt shows the error page. -->
  <div />
</template>