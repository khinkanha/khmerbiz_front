<template>
  <div class="style-panel">
    <!-- Curated looks -->
    <section class="group">
      <h4>Start from a look</h4>
      <div class="looks">
        <button
          v-for="p in DESIGN_PRESETS"
          :key="p.name"
          type="button"
          class="look"
          @click="applyDesignPreset(p)"
        >
          <span class="look-swatches">
            <span class="ls" :style="{ background: p.colors.primary }"></span>
            <span class="ls" :style="{ background: p.colors.navBackground }"></span>
            <span class="ls" :style="{ background: p.colors.footerBackground }"></span>
          </span>
          <span class="look-name">{{ p.name }}</span>
        </button>
      </div>
      <p class="hint">Applies coordinated colors, fonts and corner radius.</p>
    </section>

    <!-- Color presets (mirror the 6 existing themes) -->
    <section class="group">
      <h4>Color theme</h4>
      <div class="presets">
        <button
          v-for="p in presets"
          :key="p.index"
          type="button"
          class="preset"
          :class="{ sel: selectedPreset === p.index }"
          :style="{ background: p.colors.primary }"
          :title="p.name"
          @click="applyPreset(p.index)"
        />
      </div>
      <p class="hint">Start from a preset, then fine-tune individual colors below.</p>
    </section>

    <!-- Individual color tokens -->
    <section class="group">
      <h4>Colors</h4>
      <div v-for="f in colorFields" :key="f.key" class="color-field">
        <label>{{ f.label }}</label>
        <div class="color-row">
          <input
            type="color"
            class="swatch"
            :value="colorValue(f.key)"
            @input="setColor(f.key, ($event.target as HTMLInputElement).value)"
          />
          <input
            type="text"
            class="hex"
            :value="colorValue(f.key)"
            @change="setColor(f.key, ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>
    </section>

    <!-- Typography -->
    <section class="group">
      <h4>Typography</h4>
      <div class="field">
        <label>Heading font</label>
        <Dropdown
          :modelValue="style?.fonts?.heading"
          :options="FONT_OPTIONS"
          optionLabel="label"
          optionValue="value"
          @update:modelValue="onFont('heading', $event)"
        />
      </div>
      <div class="field">
        <label>Body font</label>
        <Dropdown
          :modelValue="style?.fonts?.body"
          :options="FONT_OPTIONS"
          optionLabel="label"
          optionValue="value"
          @update:modelValue="onFont('body', $event)"
        />
      </div>
      <div class="field">
        <label>Base size <span class="pill">{{ style?.fonts?.baseSize ?? 16 }}px</span></label>
        <Slider :modelValue="style?.fonts?.baseSize ?? 16" :min="13" :max="20" :step="1" @update:modelValue="onNumber('baseSize', $event)" />
      </div>
    </section>

    <!-- Shape -->
    <section class="group">
      <h4>Shape</h4>
      <div class="field">
        <label>Corner radius <span class="pill">{{ style?.radius ?? 10 }}px</span></label>
        <Slider :modelValue="style?.radius ?? 10" :min="0" :max="24" :step="1" @update:modelValue="onNumber('radius', $event)" />
      </div>
      <div class="field">
        <label>Section spacing <span class="pill">{{ style?.spacing ?? 16 }}px</span></label>
        <Slider :modelValue="style?.spacing ?? 16" :min="8" :max="48" :step="2" @update:modelValue="onNumber('spacing', $event)" />
      </div>
    </section>

    <div class="actions">
      <Button label="Reset to theme" severity="secondary" size="small" outlined @click="resetStyle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteDesigner } from '~/composables/useSiteDesigner'
import { DESIGN_PRESETS, FONT_OPTIONS, PRESET_NAMES, THEME_PRESETS } from '~/types/design'
import type { DesignColors } from '~/types'

const { style, setColor, updateStyle, applyPreset, applyDesignPreset, resetStyle } = useSiteDesigner()

const presets = [0, 1, 2, 3, 4, 5].map((i) => ({ index: i, name: PRESET_NAMES[i], colors: THEME_PRESETS[i] }))

const colorFields: { key: keyof DesignColors; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'primaryDark', label: 'Primary dark' },
  { key: 'background', label: 'Background' },
  { key: 'text', label: 'Text' },
  { key: 'navBackground', label: 'Header background' },
  { key: 'footerBackground', label: 'Footer background' },
  { key: 'cardBackground', label: 'Card background' },
]

const colorValue = (key: keyof DesignColors): string => style.value?.colors?.[key] ?? '#3b82f6'

// Which preset currently matches (by primary color), or -1 if custom.
const selectedPreset = computed(() => {
  const primary = style.value?.colors?.primary
  if (!primary) return 0
  const found = presets.find((p) => p.colors.primary.toLowerCase() === primary.toLowerCase())
  return found ? found.index : -1
})

const onFont = (which: 'heading' | 'body', value: string) => {
  const fonts = { ...(style.value?.fonts ?? { heading: '', body: '', baseSize: 16 }) }
  fonts[which] = value
  updateStyle({ fonts })
}

const onNumber = (key: 'baseSize' | 'radius' | 'spacing', value: any) => {
  const n = Number(Array.isArray(value) ? value[0] : value)
  if (key === 'baseSize') {
    const fonts = { ...(style.value?.fonts ?? { heading: '', body: '', baseSize: 16 }), baseSize: n }
    updateStyle({ fonts })
  } else if (key === 'radius') {
    updateStyle({ radius: n })
  } else {
    updateStyle({ spacing: n })
  }
}
</script>

<style scoped>
.style-panel {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.looks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.look {
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  background: #fff;
  padding: 9px 6px 7px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: .12s;
}
.look:hover {
  border-color: #3b82f6;
  background: #eff6ff;
  transform: translateY(-1px);
}
.look-swatches {
  display: flex;
  gap: 3px;
}
.look-swatches .ls {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, .08);
}
.look-name {
  font-size: 11.5px;
  font-weight: 600;
  color: #334155;
}
.group h4 {
  margin: 0 0 10px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}
.presets {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.preset {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  padding: 0;
}
.preset:hover {
  transform: translateY(-1px);
}
.preset.sel {
  border-color: #0f172a;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
}
.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #64748b;
}
.color-field {
  margin-bottom: 12px;
}
.color-field label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
}
.color-row {
  display: flex;
  align-items: center;
  gap: 9px;
}
.swatch {
  width: 38px;
  height: 34px;
  padding: 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  flex-shrink: 0;
}
.hex {
  flex: 1;
  padding: 7px 9px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 12px;
  color: #475569;
}
.field {
  margin-bottom: 14px;
}
.field label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
}
.field :deep(.p-dropdown) {
  width: 100%;
}
.pill {
  display: inline-block;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 5px;
  margin-left: 4px;
}
.actions {
  margin-top: 4px;
}
</style>
