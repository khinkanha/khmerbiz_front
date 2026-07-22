<template>
  <div class="kb-palette">
    <div class="kb-palette__title">{{ $t('blockEditor.components') }}</div>
    <p class="kb-palette__hint">{{ $t('blockEditor.dragHint') }}</p>
    <div class="kb-palette__grid">
      <div
        v-for="b in blocks"
        :key="b.type"
        class="kb-palette__item"
        :title="$t('blockEditor.dragHint')"
        draggable="true"
        @dragstart="onDragStart($event, b.type)"
        @dragend="setKbDrag(null)"
        @click="$emit('insert', b.type)"
      >
        <i class="pi" :class="b.icon" />
        <span>{{ $t(b.label) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { KbWidgetType } from '~/utils/blockWidgets'
import { KB_DRAG_PREFIX, setKbDrag } from '~/utils/blockWidgets'

defineEmits<{ insert: [type: KbWidgetType] }>()

const blocks: { type: KbWidgetType; icon: string; label: string }[] = [
  { type: 'card', icon: 'pi-id-card', label: 'blockEditor.card' },
  { type: 'checkbox', icon: 'pi-check-square', label: 'blockEditor.checklist' },
  { type: 'button', icon: 'pi-link', label: 'blockEditor.button' },
  { type: 'image', icon: 'pi-image', label: 'blockEditor.image' },
  { type: 'divider', icon: 'pi-minus', label: 'blockEditor.divider' },
  { type: 'columns', icon: 'pi-table', label: 'blockEditor.columns' },
  { type: 'spacer', icon: 'pi-arrows-v', label: 'blockEditor.spacer' },
  { type: 'icon', icon: 'pi-star', label: 'blockEditor.icon' },
  { type: 'stats', icon: 'pi-chart-bar', label: 'blockEditor.stats' },
  { type: 'callout', icon: 'pi-info-circle', label: 'blockEditor.callout' },
  { type: 'contact', icon: 'pi-phone', label: 'blockEditor.contact' },
  { type: 'gallery', icon: 'pi-images', label: 'blockEditor.gallery' },
  { type: 'quote', icon: 'pi-quote', label: 'blockEditor.quote' },
  { type: 'accordion', icon: 'pi-list', label: 'blockEditor.accordion' },
  { type: 'video', icon: 'pi-video', label: 'blockEditor.video' },
]

const onDragStart = (e: DragEvent, type: KbWidgetType) => {
  // Module-level bridge (reliable fallback for the editor's drop handler).
  setKbDrag(type)
  if (!e.dataTransfer) return
  // A marker the TinyMCE `drop` handler recognises.
  const marker = KB_DRAG_PREFIX + type
  e.dataTransfer.setData('text/plain', marker)
  e.dataTransfer.setData('application/x-kb-block', marker)
  e.dataTransfer.effectAllowed = 'copy'
}
</script>

<style scoped>
.kb-palette {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.kb-palette__title {
  font-weight: 600;
  font-size: 0.875rem;
  color: #4a5568;
}
.kb-palette__hint {
  margin: 0;
  font-size: 0.75rem;
  color: #94a3b8;
}
.kb-palette__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}
.kb-palette__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.75rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  cursor: grab;
  font-size: 0.8rem;
  color: #334155;
  text-align: center;
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.05s;
  user-select: none;
}
.kb-palette__item:hover {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
  color: #1d4ed8;
}
.kb-palette__item:active {
  cursor: grabbing;
  transform: scale(0.97);
}
.kb-palette__item i {
  font-size: 1.1rem;
}
</style>
