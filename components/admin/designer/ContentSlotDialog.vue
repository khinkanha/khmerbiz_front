<template>
  <Dialog
    :visible="visible"
    modal
    :draggable="false"
    header="Content section"
    :style="{ width: '480px' }"
    @update:visible="$emit('update:visible', $event)"
  >
    <div class="csd-body">
      <div class="field">
        <label>Content type</label>
        <Dropdown
          v-model="local.contentType"
          :options="typeOptions"
          option-label="label"
          option-value="value"
          placeholder="Select a content type"
          class="w-full"
        />
      </div>

      <div class="field">
        <label>Source</label>
        <div class="seg">
          <button type="button" class="seg-btn" :class="{ on: local.mode === 'auto' }" @click="local.mode = 'auto'">
            Auto
          </button>
          <button type="button" class="seg-btn" :class="{ on: local.mode === 'menu' }" @click="local.mode = 'menu'">
            Specific menu
          </button>
        </div>
        <p class="hint">
          <template v-if="local.mode === 'auto'">
            Shows the first published content of this type — re-resolved per language.
          </template>
          <template v-else>
            Bind this section to one menu item's content (re-resolved per language).
          </template>
        </p>
        <Dropdown
          v-if="local.mode === 'menu'"
          v-model="local.menuId"
          :options="menuOptions"
          option-label="label"
          option-value="value"
          :placeholder="menuLoading ? 'Loading menus…' : 'Choose a menu item'"
          :loading="menuLoading"
          filter
          class="w-full"
        />
        <p v-else-if="local.mode === 'menu' && !menuOptions.length && !menuLoading" class="hint warn">
          No menu items found for this type yet.
        </p>
      </div>
    </div>

    <template #footer>
      <Button label="Delete" icon="pi pi-trash" severity="danger" text @click="$emit('delete')" />
      <Button label="Cancel" text @click="$emit('update:visible', false)" />
      <Button label="Save" icon="pi pi-check" :disabled="!canSave" @click="onSave" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/stores/menu'
import { CONTENT_TYPE_META } from '~/utils/designerSections'
import { ContentType } from '~/types'

const props = defineProps<{
  visible: boolean
  contentType: number
  menuId?: number
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  save: [payload: { contentType: number; menuId?: number }]
  delete: []
}>()

// The editable copy. `mode` is derived from whether a menuId is set.
const local = reactive<{ contentType: number; mode: 'auto' | 'menu'; menuId: number | null }>({
  contentType: props.contentType,
  mode: props.menuId !== undefined ? 'menu' : 'auto',
  menuId: props.menuId ?? null,
})

watch(
  () => props.visible,
  (open) => {
    if (open) {
      local.contentType = props.contentType
      local.mode = props.menuId !== undefined ? 'menu' : 'auto'
      local.menuId = props.menuId ?? null
    }
  },
)

// ---- Content-type options --------------------------------------------------
const typeOptions = computed(() =>
  Object.entries(CONTENT_TYPE_META).map(([k, v]) => ({ label: v.label, value: Number(k) as ContentType })),
)

// ---- Menu picker (admin menu store, which joins content_type/title) --------
const menuStore = useMenuStore()
const menuLoading = ref(false)

const flattenLeaves = (items: any[], acc: { item_id: number; item_name: string | null; content_type?: number }[] = [], depth = 0) => {
  for (const it of items) {
    const hasChildren = it.children && it.children.length > 0
    if (!hasChildren) {
      acc.push({ item_id: it.item_id, item_name: it.item_name, content_type: it.content_type })
    }
    if (hasChildren) flattenLeaves(it.children, acc, depth + 1)
  }
  return acc
}

// All menu items; filtered by the selected content type when a type is chosen.
const menuOptions = computed(() => {
  const leaves = flattenLeaves(menuStore.menuTree as any[] ?? [])
  const matching = leaves.filter((m) => m.content_type === local.contentType)
  const list = matching.length ? matching : leaves // fall back to all if none match the type
  return list.map((m) => ({
    label: `${m.item_name || 'Untitled'}${m.content_type !== undefined && CONTENT_TYPE_META[m.content_type] ? ` · ${CONTENT_TYPE_META[m.content_type].label}` : ''}`,
    value: m.item_id,
  }))
})

const canSave = computed(() => {
  if (local.mode === 'menu') return local.menuId !== null
  return true
})

const loadMenus = async () => {
  menuLoading.value = true
  try {
    await menuStore.fetchAllMenuTree()
  } finally {
    menuLoading.value = false
  }
}

watch(
  () => props.visible,
  (open) => {
    if (open && !menuStore.menuTree.length) loadMenus()
  },
)

const onSave = () => {
  const payload: { contentType: number; menuId?: number } = { contentType: local.contentType }
  if (local.mode === 'menu' && local.menuId !== null) payload.menuId = local.menuId
  emit('save', payload)
}
</script>

<style scoped>
.csd-body { display: flex; flex-direction: column; gap: 16px; padding-top: 4px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 12.5px; font-weight: 700; color: #334155; }
.seg { display: inline-flex; background: #f1f5f9; border-radius: 8px; padding: 3px; gap: 2px; align-self: flex-start; }
.seg-btn { border: 0; background: transparent; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 12.5px; color: #64748b; font-weight: 600; }
.seg-btn.on { background: #fff; color: #1d4ed8; box-shadow: 0 1px 2px rgba(0,0,0,.1); }
.hint { margin: 2px 0 0; font-size: 12px; color: #94a3b8; line-height: 1.5; }
.hint.warn { color: #b45309; }
.w-full { width: 100%; }
</style>
