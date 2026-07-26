<template>
  <div class="designer-page">
    <div v-if="!sections.length" class="designer-empty">
      <i class="pi pi-palette" />
      <p>This page uses the Site Designer but has no sections yet.</p>
      <span>Add blocks in <strong>Admin → Designer → Build page</strong>.</span>
    </div>

    <!-- Each widget section renders through the same createWidgetHtml + blocks.css
         pipeline used inside articles, so blocks look identical here. -->
    <div
      v-for="(slot, i) in sections"
      :key="i"
      class="designer-section"
      v-html="renderSlotHtml(slot)"
    />
  </div>
</template>

<script setup lang="ts">
import { renderSlotHtml } from '~/utils/designerSections'
import type { ContentSection, SectionSlot } from '~/types'

const props = defineProps<{
  sections: readonly SectionSlot[]
  // reserved for Phase 2b (kind:'content' slots bound to tenant content)
  contentSections?: ContentSection[]
}>()

// keep props referenced so Vue doesn't warn about unused contentSections
void props
</script>

<style scoped>
.designer-page {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 8px 16px 40px;
}
.designer-section {
  width: 100%;
}
.designer-empty {
  text-align: center;
  padding: 90px 20px;
  color: #94a3b8;
}
.designer-empty i {
  font-size: 34px;
  display: block;
  margin-bottom: 12px;
}
.designer-empty p {
  margin: 0 0 4px;
  font-weight: 600;
  color: #475569;
}
.designer-empty span {
  font-size: 13px;
}
</style>
