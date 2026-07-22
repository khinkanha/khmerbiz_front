<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :header="dialogHeader"
    :modal="true"
    :style="{ width: '640px', maxWidth: '95vw' }"
    :dismissableMask="false"
    class="kb-dialog"
  >
    <div v-if="type" class="kb-dialog-body">
      <!-- CARD -->
      <template v-if="type === 'card'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.title') }}</label>
          <InputText v-model="local.title" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.text') }}</label>
          <Textarea v-model="local.text" rows="3" autoResize />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.imageUrl') }}</label>
          <InputText v-model="local.imageUrl" :placeholder="$t('blockEditor.imageUrl')" />
          <MediaPicker v-model="cardImageModel" :multiple="false" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.altText') }}</label>
          <InputText v-model="local.imageAlt" />
        </div>
        <div class="kb-row">
          <div class="kb-field">
            <label>{{ $t('blockEditor.linkUrl') }}</label>
            <InputText v-model="local.linkUrl" />
          </div>
          <div class="kb-field">
            <label>{{ $t('blockEditor.linkLabel') }}</label>
            <InputText v-model="local.linkLabel" />
          </div>
        </div>
      </template>

      <!-- CHECKBOX / CHECKLIST -->
      <template v-else-if="type === 'checkbox'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.title') }}</label>
          <InputText v-model="local.title" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.style') }}</label>
          <Dropdown v-model="local.style" :options="checklistStyleOptions" optionLabel="label" optionValue="value" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.items') }}</label>
          <div class="kb-items">
            <div v-for="(it, i) in local.items" :key="i" class="kb-item">
              <Checkbox v-model="it.checked" :binary="true" />
              <InputText v-model="it.label" :placeholder="$t('blockEditor.label')" />
              <Button icon="pi pi-times" text severity="danger" @click="removeItem(i)" />
            </div>
          </div>
          <Button :label="$t('blockEditor.addItem')" icon="pi pi-plus" size="small" outlined @click="addItem" />
        </div>
      </template>

      <!-- BUTTON -->
      <template v-else-if="type === 'button'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.linkLabel') }}</label>
          <InputText v-model="local.label" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.linkUrl') }}</label>
          <InputText v-model="local.url" />
        </div>
        <div class="kb-row">
          <div class="kb-field">
            <label>{{ $t('blockEditor.variant') }}</label>
            <Dropdown v-model="local.variant" :options="variantOptions" optionLabel="label" optionValue="value" />
          </div>
          <div class="kb-field">
            <label>{{ $t('blockEditor.align') }}</label>
            <Dropdown v-model="local.align" :options="alignOptions" optionLabel="label" optionValue="value" />
          </div>
        </div>
      </template>

      <!-- IMAGE -->
      <template v-else-if="type === 'image'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.imageUrl') }}</label>
          <InputText v-model="local.url" :placeholder="$t('blockEditor.imageUrl')" />
          <MediaPicker v-model="imageBlockModel" :multiple="false" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.altText') }}</label>
          <InputText v-model="local.alt" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.caption') }}</label>
          <InputText v-model="local.caption" />
        </div>
        <div class="kb-row">
          <div class="kb-field">
            <label>{{ $t('blockEditor.width') }}</label>
            <InputText v-model="local.width" placeholder="100% / 320px" />
          </div>
          <div class="kb-field">
            <label>{{ $t('blockEditor.align') }}</label>
            <Dropdown v-model="local.align" :options="alignOptions" optionLabel="label" optionValue="value" />
          </div>
        </div>
      </template>

      <!-- DIVIDER -->
      <template v-else-if="type === 'divider'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.style') }}</label>
          <Dropdown v-model="local.style" :options="dividerStyleOptions" optionLabel="label" optionValue="value" />
        </div>
      </template>

      <!-- COLUMNS -->
      <template v-else-if="type === 'columns'">
        <div class="kb-row">
          <div class="kb-field">
            <label>{{ $t('blockEditor.leftCol') }}</label>
            <Textarea v-model="local.leftHtml" rows="5" autoResize />
          </div>
          <div class="kb-field">
            <label>{{ $t('blockEditor.rightCol') }}</label>
            <Textarea v-model="local.rightHtml" rows="5" autoResize />
          </div>
        </div>
        <small class="kb-note">{{ $t('blockEditor.columnsHint') }}</small>
      </template>

      <!-- SPACER -->
      <template v-else-if="type === 'spacer'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.height') }}</label>
          <InputText v-model="local.height" placeholder="32" />
        </div>
      </template>

      <!-- ICON -->
      <template v-else-if="type === 'icon'">
        <div class="kb-row">
          <div class="kb-field">
            <label>{{ $t('blockEditor.glyph') }}</label>
            <InputText v-model="local.glyph" placeholder="⭐" />
          </div>
          <div class="kb-field">
            <label>{{ $t('blockEditor.size') }}</label>
            <InputText v-model="local.size" placeholder="24" />
          </div>
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.label') }}</label>
          <InputText v-model="local.label" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.align') }}</label>
          <Dropdown v-model="local.align" :options="alignOptions" optionLabel="label" optionValue="value" />
        </div>
      </template>

      <!-- STATS -->
      <template v-else-if="type === 'stats'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.columns') }}</label>
          <Dropdown v-model="local.columns" :options="columnsOptions" optionLabel="label" optionValue="value" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.items') }}</label>
          <div class="kb-items">
            <div v-for="(it, i) in (local.items || [])" :key="i" class="kb-item">
              <InputText v-model="it.number" :placeholder="$t('blockEditor.number')" />
              <InputText v-model="it.label" :placeholder="$t('blockEditor.label')" />
              <Button icon="pi pi-times" text severity="danger" @click="removeStat(i)" />
            </div>
          </div>
          <Button :label="$t('blockEditor.addItem')" icon="pi pi-plus" size="small" outlined @click="addStat" />
        </div>
      </template>

      <!-- CALLOUT -->
      <template v-else-if="type === 'callout'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.variant') }}</label>
          <Dropdown v-model="local.variant" :options="calloutVariantOptions" optionLabel="label" optionValue="value" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.title') }}</label>
          <InputText v-model="local.title" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.text') }}</label>
          <Textarea v-model="local.text" rows="3" autoResize />
        </div>
      </template>

      <!-- CONTACT -->
      <template v-else-if="type === 'contact'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.title') }}</label>
          <InputText v-model="local.title" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.items') }}</label>
          <div class="kb-items">
            <div v-for="(it, i) in (local.items || [])" :key="i" class="kb-item">
              <Dropdown v-model="it.type" :options="contactTypeOptions" optionLabel="label" optionValue="value" />
              <InputText v-model="it.value" :placeholder="$t('blockEditor.' + it.type)" />
              <Button icon="pi pi-times" text severity="danger" @click="removeContact(i)" />
            </div>
          </div>
          <Button :label="$t('blockEditor.addItem')" icon="pi pi-plus" size="small" outlined @click="addContact" />
        </div>
      </template>

      <!-- GALLERY -->
      <template v-else-if="type === 'gallery'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.imageUrl') }}</label>
          <MediaPicker v-model="galleryModel" :multiple="true" />
        </div>
        <div v-if="local.images && local.images.length" class="kb-field">
          <label>{{ $t('blockEditor.altText') }}</label>
          <div class="kb-items">
            <div v-for="(im, i) in local.images" :key="i" class="kb-item">
              <img v-if="im.url" :src="im.url" class="kb-thumb" alt="" />
              <InputText v-model="im.alt" :placeholder="$t('blockEditor.altText')" />
              <Button icon="pi pi-times" text severity="danger" @click="removeGalleryImage(i)" />
            </div>
          </div>
        </div>
        <div class="kb-row">
          <div class="kb-field">
            <label>{{ $t('blockEditor.columns') }}</label>
            <Dropdown v-model="local.columns" :options="columnsOptions" optionLabel="label" optionValue="value" />
          </div>
          <div class="kb-field">
            <label>{{ $t('blockEditor.caption') }}</label>
            <InputText v-model="local.caption" />
          </div>
        </div>
      </template>

      <!-- QUOTE -->
      <template v-else-if="type === 'quote'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.quoteText') }}</label>
          <Textarea v-model="local.quote" rows="3" autoResize />
        </div>
        <div class="kb-row">
          <div class="kb-field">
            <label>{{ $t('blockEditor.author') }}</label>
            <InputText v-model="local.author" />
          </div>
          <div class="kb-field">
            <label>{{ $t('blockEditor.role') }}</label>
            <InputText v-model="local.role" />
          </div>
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.imageUrl') }}</label>
          <InputText v-model="local.avatarUrl" :placeholder="$t('blockEditor.imageUrl')" />
          <MediaPicker v-model="quoteAvatarModel" :multiple="false" />
        </div>
      </template>

      <!-- ACCORDION -->
      <template v-else-if="type === 'accordion'">
        <div class="kb-field">
          <label class="kb-checkline">
            <Checkbox v-model="local.firstOpen" :binary="true" />
            <span>{{ $t('blockEditor.firstItemOpen') }}</span>
          </label>
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.items') }}</label>
          <div class="kb-items">
            <div v-for="(it, i) in (local.items || [])" :key="i" class="kb-accordionrow">
              <InputText v-model="it.q" :placeholder="$t('blockEditor.question')" />
              <Textarea v-model="it.a" rows="2" autoResize :placeholder="$t('blockEditor.answer')" />
              <Button icon="pi pi-times" text severity="danger" @click="removeAccordion(i)" />
            </div>
          </div>
          <Button :label="$t('blockEditor.addItem')" icon="pi pi-plus" size="small" outlined @click="addAccordion" />
        </div>
      </template>

      <!-- VIDEO -->
      <template v-else-if="type === 'video'">
        <div class="kb-field">
          <label>{{ $t('blockEditor.videoUrl') }}</label>
          <InputText v-model="local.url" placeholder="https://youtube.com/watch?v=…" />
        </div>
        <div class="kb-field">
          <label>{{ $t('blockEditor.caption') }}</label>
          <InputText v-model="local.caption" />
        </div>
        <small class="kb-note">{{ $t('blockEditor.videoHint') }}</small>
      </template>
    </div>

    <template #footer>
      <Button :label="$t('blockEditor.duplicate')" icon="pi pi-clone" severity="secondary" outlined @click="$emit('duplicate')" />
      <Button :label="$t('blockEditor.delete')" icon="pi pi-trash" severity="danger" outlined @click="$emit('delete')" />
      <Button :label="$t('common.cancel')" icon="pi pi-times" outlined @click="$emit('update:visible', false)" />
      <Button :label="$t('common.save')" icon="pi pi-check" @click="save" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import type { KbWidgetType } from '~/utils/blockWidgets'

const props = defineProps<{
  visible: boolean
  type: KbWidgetType | null
  data: any
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  save: [data: any]
  delete: []
  duplicate: []
}>()

const { t } = useI18n()
const photoUrl = (useRuntimeConfig().public.photoUrl as string) || ''

// Editable copy of the widget data; reset from the prop whenever the dialog opens.
const local = ref<any>({})
watch(
  () => props.visible,
  (open) => {
    if (open && props.data) {
      local.value = JSON.parse(JSON.stringify(props.data))
    }
  },
)

const dialogHeader = computed(() =>
  props.type ? `${t('blockEditor.editWidget')} — ${t('blockEditor.' + props.type)}` : t('blockEditor.editWidget'),
)

// Dropdown option sets (reactive to locale changes).
const alignOptions = computed(() => [
  { label: t('blockEditor.left'), value: 'left' },
  { label: t('blockEditor.center'), value: 'center' },
  { label: t('blockEditor.right'), value: 'right' },
])
const variantOptions = computed(() => [
  { label: t('blockEditor.primary'), value: 'primary' },
  { label: t('blockEditor.outline'), value: 'outline' },
])
const checklistStyleOptions = computed(() => [
  { label: t('blockEditor.checkMark'), value: 'check' },
  { label: t('blockEditor.crossMark'), value: 'cross' },
])
const dividerStyleOptions = computed(() => [
  { label: t('blockEditor.solid'), value: 'solid' },
  { label: t('blockEditor.dashed'), value: 'dashed' },
  { label: t('blockEditor.dotted'), value: 'dotted' },
])
const columnsOptions = computed(() => [
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
])
const calloutVariantOptions = computed(() => [
  { label: t('blockEditor.info'), value: 'info' },
  { label: t('blockEditor.success'), value: 'success' },
  { label: t('blockEditor.warning'), value: 'warning' },
  { label: t('blockEditor.danger'), value: 'danger' },
])
const contactTypeOptions = computed(() => [
  { label: t('blockEditor.phone'), value: 'phone' },
  { label: t('blockEditor.email'), value: 'email' },
  { label: t('blockEditor.address'), value: 'address' },
  { label: t('blockEditor.hours'), value: 'hours' },
])

// Checkbox items editor.
const addItem = () => local.value.items.push({ label: '', checked: false })
const removeItem = (i: number) => local.value.items.splice(i, 1)

// Stats items editor.
const addStat = () => local.value.items.push({ number: '', label: '' })
const removeStat = (i: number) => local.value.items.splice(i, 1)
// Contact items editor.
const addContact = () => local.value.items.push({ type: 'phone', value: '' })
const removeContact = (i: number) => local.value.items.splice(i, 1)
// Accordion items editor.
const addAccordion = () => local.value.items.push({ q: '', a: '' })
const removeAccordion = (i: number) => local.value.items.splice(i, 1)

// Bridge MediaPicker (string[] of relative file names, single-select) to an
// absolute image URL field.
const toFileList = (url: string): string[] => {
  if (!url) return []
  if (photoUrl && url.startsWith(photoUrl)) return [url.slice(photoUrl.length)]
  return []
}
const fromFileList = (files: string[]): string => (files && files[0] ? photoUrl + files[0] : '')

const cardImageModel = computed<string[]>({
  get: () => toFileList(local.value.imageUrl),
  set: (v) => {
    local.value.imageUrl = fromFileList(v)
  },
})
const imageBlockModel = computed<string[]>({
  get: () => toFileList(local.value.url),
  set: (v) => {
    local.value.url = fromFileList(v)
  },
})

// Quote avatar (single image).
const quoteAvatarModel = computed<string[]>({
  get: () => toFileList(local.value.avatarUrl),
  set: (v) => {
    local.value.avatarUrl = fromFileList(v)
  },
})

// Gallery (multiple images). MediaPicker gives relative file names; we keep
// existing alt text when the same image is re-selected.
const galleryModel = computed<string[]>({
  get: () =>
    (local.value.images || []).map((im: any) => {
      const u = im.url || ''
      return photoUrl && u.startsWith(photoUrl) ? u.slice(photoUrl.length) : u
    }),
  set: (files: string[]) => {
    const prev = new Map<string, string>(
      (local.value.images || []).map((im: any) => [im.url, im.alt]),
    )
    local.value.images = (files || []).map((f: string) => {
      const url = photoUrl + f
      return { url, alt: prev.has(url) ? prev.get(url) : '' }
    })
  },
})
const removeGalleryImage = (i: number) => local.value.images.splice(i, 1)

const save = () => emit('save', JSON.parse(JSON.stringify(local.value)))
</script>

<style scoped>
.kb-dialog-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.25rem;
}
.kb-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.kb-field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
}
.kb-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.kb-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.kb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.kb-item .p-inputtext {
  flex: 1;
}
.kb-note {
  color: #94a3b8;
  font-size: 0.75rem;
}
.kb-thumb {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 6px;
  flex: none;
}
.kb-accordionrow {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.kb-checkline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #475569;
  font-size: 0.8rem;
}
</style>
