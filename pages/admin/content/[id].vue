<template>
  <div>
    <div class="content-form-page">
      <div class="page-header">
        <h1 class="page-title">
          {{ isNewContent ? $t('contentManager.addNew') : $t('contentManager.edit') }}
        </h1>
        <div class="page-actions">
          <Button :label="$t('common.back')" icon="pi pi-arrow-left" outlined @click="$router.back()" />
          <Button :label="$t('common.save')" icon="pi pi-check" @click="handleSave" :loading="saving" />
        </div>
      </div>

      <div class="form-grid">
        <Card class="form-card">
          <template #title>{{ $t('contentManager.contentTitle') }}</template>
          <template #content>
            <form @submit.prevent="handleSave" class="content-form">
              <div class="form-group">
                <label for="title">{{ $t('contentManager.contentTitle') }} *</label>
                <InputText id="title" v-model="form.title" :placeholder="$t('contentManager.contentTitle')"
                  :class="{ 'p-invalid': errors.title }" />
                <small v-if="errors.title" class="p-error">{{ errors.title }}</small>
              </div>

              <div class="form-group">
                <label for="contentType">{{ $t('contentManager.contentType') }} *</label>
                <Dropdown id="contentType" v-model="form.content_type" :options="contentTypeOptions" optionLabel="label"
                  optionValue="value" :placeholder="$t('contentManager.contentType')"
                  :class="{ 'p-invalid': errors.content_type }" />
                <small v-if="errors.content_type" class="p-error">{{ errors.content_type }}</small>
              </div>

              <div class="form-group">
                <label for="description">{{ $t('contentManager.description') }}</label>
                <div class="description-editor" style="display:block">
                  <ClientOnly>
                    <!--<BlockPalette class="description-editor__palette" @insert="insertWidget" />-->
                    <Editor v-model="form.description" tinymceScriptSrc="/tinymce/tinymce.min.js" :init="editorInit"
                      class="description-editor__field" />

                  </ClientOnly>
                </div>
                <BlockWidgetDialog v-model:visible="dialog.visible" :type="dialog.type" :data="dialog.data"
                  @save="saveWidget" @delete="deleteWidget" @duplicate="duplicateWidget" />
              </div>
              <div class="form-group">
                <label for="menu">{{ $t('menuManager.menuName') }} *</label>
                <Dropdown id="menu" v-model="form.menu_id" :options="menuOptions" optionLabel="item_name"
                  optionValue="item_id" :placeholder="$t('menuManager.selectMenu')"
                  :class="{ 'p-invalid': errors.menu_id }" showClear />
                <small v-if="errors.menu_id" class="p-error">{{ errors.menu_id }}</small>
              </div>

              <div class="form-group">
                <label for="status">{{ $t('contentManager.status') }}</label>
                <div class="status-toggle">
                  <ToggleSwitch id="status" :modelValue="form.status as any"
                    @update:modelValue="(v: any) => form.status = v" :trueValue="1" :falseValue="0" />
                  <span>{{ form.status ? $t('contentManager.published') : $t('contentManager.draft') }}</span>
                </div>
              </div>

              <Message v-if="errorMessage" severity="error" :closable="false">
                {{ errorMessage }}
              </Message>
            </form>
          </template>
        </Card>

        <Card class="preview-card" v-if="!isNewContent">
          <template #title>{{ $t('contentManager.actions') }}</template>
          <template #content>
            <div class="action-links">
              <Button
                v-if="contentStore.currentContent?.content_type !== ContentType.ARTICLE && contentStore.currentContent?.content_type !== ContentType.PRODUCT"
                :label="$t('contentManager.list')" icon="pi pi-list" outlined
                @click="$router.push(`/admin/content/${contentId}/items`)" class="w-full mb-3" />
              <Button v-if="contentStore.currentContent?.content_type === ContentType.NEWS"
                :label="$t('contentManager.blogNews')" icon="pi pi-news" outlined
                @click="$router.push(`/admin/content/${contentId}/news`)" class="w-full mb-3" />
              <Button v-if="contentStore.currentContent?.content_type === ContentType.MAP"
                :label="$t('contentManager.showMap')" icon="pi pi-map" outlined
                @click="$router.push(`/admin/content/${contentId}/map`)" class="w-full mb-3" />
              <Button v-if="contentStore.currentContent?.content_type === ContentType.PRODUCT" label="Manage Products"
                icon="pi pi-shopping-bag" outlined @click="$router.push(`/admin/content/${contentId}/products`)"
                class="w-full" />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

import { ContentType } from '~/types'
import Editor from '@tinymce/tinymce-vue'
import {
  createWidgetHtml,
  previewHtml,
  encodePayload,
  readWidget,
  parseDragMarker,
  getKbDrag,
  setKbDrag,
} from '~/utils/blockWidgets'
import type { KbWidgetType } from '~/utils/blockWidgets'
// TinyMCE renders inside an isolated iframe, so the page's global blocks.css
// never reaches the editor content. Import it raw and inject via content_style.
import blocksCss from '~/assets/css/blocks.css?raw'
import { useContentStore } from '~/stores/content'
import { useDomainStore } from '~/stores/domain'
import { useAuthStore } from '~/stores/auth'
import { useMenuStore } from '~/stores/menu'

const contentStore = useContentStore()
const domainStore = useDomainStore()
const authStore = useAuthStore()
const menuStore = useMenuStore()
const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const contentId = computed(() => {
  const id = route.params.id
  return id === 'new' ? null : Number(id)
})

const isNewContent = computed(() => contentId.value === null)

const form = ref({
  title: '',
  description: '',
  content_type: ContentType.ARTICLE,
  lang_id: null as number | null,
  menu_id: null as number | null,
  status: 0 as number,
})

const errors = ref<Record<string, string>>({})
const saving = ref(false)
const errorMessage = ref('')

const contentTypeOptions = [
  { label: t('contentManager.article'), value: ContentType.ARTICLE },
  { label: t('contentManager.photo'), value: ContentType.PHOTO },
  { label: t('contentManager.video'), value: ContentType.VIDEO },
  { label: t('contentManager.document'), value: ContentType.DOCUMENT },
  { label: t('contentManager.blogNews'), value: ContentType.NEWS },
  { label: 'Map', value: ContentType.MAP },
  { label: 'Product / Service', value: ContentType.PRODUCT },
]

const menuOptions = computed(() => {
  const flatten = (items: any[], prefix = ''): any[] => {
    const result: any[] = []
    for (const item of items) {
      const label = prefix + (item.item_name || '')
      result.push({ item_id: item.item_id, item_name: label, lang_id: item.lang_id })
      if (item.children?.length) {
        result.push(...flatten(item.children, label + ' → '))
      }
    }
    return result
  }
  return flatten([...menuStore.menuTree])
})

watch(() => form.value.menu_id, (menuId) => {
  if (menuId == null) return
  const selected = menuOptions.value.find((opt: any) => opt.item_id === menuId)
  if (selected?.lang_id) {
    form.value.lang_id = selected.lang_id
  }
})

// ---- Low-code widget editor (drag/drop components inside TinyMCE) ----
const editorRef = shallowRef<any>(null)

const dialog = reactive({
  visible: false,
  type: null as KbWidgetType | null,
  data: {} as any,
  node: null as any,
})

const insertWidget = (type: KbWidgetType) => {
  const editor = editorRef.value
  if (!editor) return
  editor.focus()
  const html = createWidgetHtml(type)
  // editor.insertContent exists in TinyMCE 4+; execCommand is the universal fallback.
  if (typeof editor.insertContent === 'function') {
    editor.insertContent(html)
  } else {
    editor.execCommand('mceInsertContent', false, html)
  }
  editor.undoManager.add()
}

const openWidgetForNode = (type: KbWidgetType, data: any, node: any) => {
  dialog.type = type
  dialog.data = data
  dialog.node = node
  dialog.visible = true
}

const saveWidget = (data: any) => {
  const editor = editorRef.value
  const node = dialog.node
  if (!editor || !node || !dialog.type) {
    dialog.visible = false
    return
  }
  node.setAttribute('data-kb-payload', encodePayload(data))
  editor.dom.setHTML(node, previewHtml(dialog.type, data))
  editor.undoManager.add()
  editor.nodeChanged()
  dialog.visible = false
}

const deleteWidget = () => {
  const editor = editorRef.value
  const node = dialog.node
  if (editor && node) {
    node.remove()
    editor.undoManager.add()
    editor.nodeChanged()
  }
  dialog.visible = false
}

const duplicateWidget = () => {
  const editor = editorRef.value
  const node = dialog.node
  if (editor && node && node.parentNode) {
    node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling)
    editor.undoManager.add()
    editor.nodeChanged()
  }
  dialog.visible = false
}

// Editor-only "click to edit" chrome. Kept out of blocks.css so it never shows
// on the public site (stored widgets keep the mceNonEditable class).
const KB_EDITOR_CHROME = `
.kb-widget.mceNonEditable { position: relative; display: block; margin: 12px 0; padding: 10px; border: 1px dashed #93c5fd; border-radius: 8px; background: #f8fbff; cursor: pointer; user-select: none; }
.kb-widget.mceNonEditable:hover { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
.kb-widget.mceNonEditable::after { content: "click to edit"; position: absolute; top: -9px; right: 10px; font-size: 10px; line-height: 1; padding: 2px 6px; background: #3b82f6; color: #fff; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.04em; }
`

// TinyMCE init: existing config + `noneditable` plugin, a whitelist so widget
// markup survives serialization, and a `setup` callback wiring the toolbar
// menu button, click-to-edit, and drag-into-editor.
const editorInit = computed(() => ({
  height: 360,
  menubar: 'tools',
  plugins:
    'noneditable advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste',
  toolbar:
    'undo redo | bold italic underline | forecolor backcolor | fontselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | kbinsert | fullscreen',
  branding: false,
  promotion: false,
  relative_urls: false,
  remove_script_host: false,
  document_base_url: photoUrl,
  content_style: blocksCss + KB_EDITOR_CHROME,
  extended_valid_elements:
    'div[class|style|contenteditable|data-kb-type|data-kb-payload],img[src|alt|class|style|width|height],figure[class|style],figcaption[class|style],hr[class|style],a[href|class|target|rel|style],h3[class|style],h4[class|style],p[class|style],span[class|style],ul[class|style],li[class|style],blockquote[class|style],details[class|style|open],summary[class|style],iframe[src|class|style|allow|allowfullscreen|loading|width|height|title],video[src|class|style|controls|preload|width|height]',
  setup(editor: any) {
    editorRef.value = editor

    // One toolbar menu button listing all insertable components.
    // Uses the TinyMCE 4 API (the app self-hosts TinyMCE 4.8 from /tinymce/):
    // addButton with type 'menubutton' + `onclick` menu items — NOT the v5+
    // editor.ui.registry.addMenuButton / `onAction` API.
    editor.addButton('kbinsert', {
      type: 'menubutton',
      text: t('blockEditor.components'),
      tooltip: t('blockEditor.insert'),
      menu: [
        { text: t('blockEditor.card'), onclick: () => insertWidget('card') },
        { text: t('blockEditor.checklist'), onclick: () => insertWidget('checkbox') },
        { text: t('blockEditor.button'), onclick: () => insertWidget('button') },
        { text: t('blockEditor.image'), onclick: () => insertWidget('image') },
        { text: t('blockEditor.divider'), onclick: () => insertWidget('divider') },
        { text: t('blockEditor.columns'), onclick: () => insertWidget('columns') },
        { text: t('blockEditor.spacer'), onclick: () => insertWidget('spacer') },
        { text: t('blockEditor.icon'), onclick: () => insertWidget('icon') },
        { text: t('blockEditor.stats'), onclick: () => insertWidget('stats') },
        { text: t('blockEditor.callout'), onclick: () => insertWidget('callout') },
        { text: t('blockEditor.contact'), onclick: () => insertWidget('contact') },
        { text: t('blockEditor.gallery'), onclick: () => insertWidget('gallery') },
        { text: t('blockEditor.quote'), onclick: () => insertWidget('quote') },
        { text: t('blockEditor.accordion'), onclick: () => insertWidget('accordion') },
        { text: t('blockEditor.video'), onclick: () => insertWidget('video') },
      ],
    })

    // Click a widget → open its edit dialog.
    editor.on('click', (e: any) => {
      const target = e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target
      const info = readWidget(target)
      if (!info) return
      const el = target.closest ? target.closest('.kb-widget') : null
      openWidgetForNode(info.type, info.data, el)
    })

    // Drop a component dragged from the palette → insert at the drop position.
    // TinyMCE 4 doesn't expose a drop range like v5+; compute the caret from the
    // pointer coordinates (relative to the editor iframe) and fall back to the
    // current caret on any failure.
    editor.on('drop', (e: any) => {
      const marker =
        e.dataTransfer &&
        (e.dataTransfer.getData('application/x-kb-block') || e.dataTransfer.getData('text/plain'))
      const type = parseDragMarker(marker) || getKbDrag()
      setKbDrag(null)
      if (!type) return // not one of ours — let TinyMCE handle it
      e.preventDefault()
      try {
        const doc = editor.getDoc()
        const area = editor.getContentAreaContainer && editor.getContentAreaContainer()
        const rect =
          area && area.getBoundingClientRect ? area.getBoundingClientRect() : { left: 0, top: 0 }
        const x = (e.clientX || 0) - (rect as any).left
        const y = (e.clientY || 0) - (rect as any).top
        let rng: any = null
        if (typeof doc.caretRangeFromPoint === 'function') {
          rng = doc.caretRangeFromPoint(x, y)
        } else if (typeof doc.caretPositionFromPoint === 'function') {
          const pos = doc.caretPositionFromPoint(x, y)
          if (pos) {
            rng = doc.createRange()
            rng.setStart(pos.offsetNode, pos.offset)
            rng.collapse(true)
          }
        }
        if (rng && editor.selection && editor.selection.setRng) {
          editor.selection.setRng(rng)
        }
      } catch {
        /* fall back to current caret */
      }
      insertWidget(type)
    })
  },
}))

const validateForm = (): boolean => {
  errors.value = {}

  if (!form.value.title) {
    errors.value.title = t('validation.required')
  }

  if (form.value.content_type === null) {
    errors.value.content_type = t('validation.required')
  }

  if (form.value.lang_id === null) {
    errors.value.lang_id = t('validation.required')
  }

  if (form.value.menu_id === null) {
    errors.value.menu_id = t('validation.required')
  }

  return Object.keys(errors.value).length === 0
}

const handleSave = async () => {
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  saving.value = true
  console.log('Saving content with form data:', form.value)
  try {
    let result: boolean | { success: boolean; id?: number }

    if (isNewContent.value) {
      result = await contentStore.saveContent({
        title: form.value.title,
        description: form.value.description,
        content_type: form.value.content_type,
        lang_id: form.value.lang_id!,
        menu_id: form.value.menu_id!,
        status: form.value.status ? 0 : 1,
      })
    } else {
      result = await contentStore.updateContent(contentId.value!, {
        title: form.value.title,
        description: form.value.description,
        content_type: form.value.content_type,
        lang_id: form.value.lang_id!,
        menu_id: form.value.menu_id!,
        status: form.value.status ? 0 : 1,
      })
    }

    if (result === true || (typeof result === 'object' && result.success)) {
      router.push('/admin/content')
    } else {
      errorMessage.value = t('common.error')
    }
  } catch (error: any) {
    errorMessage.value = error.message || t('common.error')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await domainStore.resolveDomain(authStore.user?.domain_id)
  await menuStore.fetchAllMenuTree()


  await contentStore.fetchContent(contentId.value!)
  if (contentStore.currentContent) {
    const raw = contentStore.currentContent as any
    const desc1 = JSON.parse(raw.description)
    form.value = {
      title: desc1.title,
      description: desc1.description,
      content_type: raw.content_type,
      lang_id: raw.lang_id,
      menu_id: raw.menu_id ?? null,
      status: raw.status ? 0 : 1,
    }
  }

})
</script>

<style scoped>
.content-form-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.page-actions {
  display: flex;
  gap: 0.75rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-card,
.preview-card {
  border: 1px solid #e2e8f0;
}

.content-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #4a5568;
  font-size: 0.875rem;
}

.status-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-toggle span {
  font-size: 0.875rem;
  color: #4a5568;
}

.description-editor {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.description-editor__field {
  flex: 1;
  min-width: 0;
}

.description-editor__palette {
  flex: none;
  width: 220px;
}

@media (max-width: 900px) {
  .description-editor {
    flex-direction: column;
  }

  .description-editor__palette {
    width: 100%;
  }
}

.action-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.w-full {
  width: 100%;
}

.mb-3 {
  margin-bottom: 0.75rem;
}
</style>
