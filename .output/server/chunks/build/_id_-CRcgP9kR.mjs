import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { _ as __nuxt_component_1 } from './BlockWidgetDialog-JIMrR0ha.mjs';
import { defineComponent, computed, ref, watch, shallowRef, reactive, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { C as ContentType } from './content-KJHlnLiT.mjs';
import TinyMCEEditor from '@tinymce/tinymce-vue';
import { r as readWidget, p as parseDragMarker, g as getKbDrag, c as createWidgetHtml, e as encodePayload, a as previewHtml, s as setKbDrag } from './blockWidgets-C4vo-aO5.mjs';
import { b as blocksCss } from './blocks-CbboZorx.mjs';
import { u as useContentStore } from './content-C-PHntlj.mjs';
import { u as useDomainStore } from './domain-CF4nfyOM.mjs';
import { a as useAuthStore, u as useApi } from './auth-CZZkTxj2.mjs';
import { _ as _export_sfc, g as useI18n, u as useRouter, k as useRoute, b as useRuntimeConfig } from './server.mjs';
import './MediaPicker-kILQE-jC.mjs';
import './useUpload-Bx0YYvez.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@primeuix/themes/aura/accordion';
import '@primeuix/themes/aura/autocomplete';
import '@primeuix/themes/aura/avatar';
import '@primeuix/themes/aura/badge';
import '@primeuix/themes/aura/base';
import '@primeuix/themes/aura/blockui';
import '@primeuix/themes/aura/breadcrumb';
import '@primeuix/themes/aura/button';
import '@primeuix/themes/aura/card';
import '@primeuix/themes/aura/carousel';
import '@primeuix/themes/aura/cascadeselect';
import '@primeuix/themes/aura/checkbox';
import '@primeuix/themes/aura/chip';
import '@primeuix/themes/aura/colorpicker';
import '@primeuix/themes/aura/confirmdialog';
import '@primeuix/themes/aura/confirmpopup';
import '@primeuix/themes/aura/contextmenu';
import '@primeuix/themes/aura/datatable';
import '@primeuix/themes/aura/dataview';
import '@primeuix/themes/aura/datepicker';
import '@primeuix/themes/aura/dialog';
import '@primeuix/themes/aura/divider';
import '@primeuix/themes/aura/dock';
import '@primeuix/themes/aura/drawer';
import '@primeuix/themes/aura/editor';
import '@primeuix/themes/aura/fieldset';
import '@primeuix/themes/aura/fileupload';
import '@primeuix/themes/aura/floatlabel';
import '@primeuix/themes/aura/galleria';
import '@primeuix/themes/aura/iconfield';
import '@primeuix/themes/aura/iftalabel';
import '@primeuix/themes/aura/image';
import '@primeuix/themes/aura/imagecompare';
import '@primeuix/themes/aura/inlinemessage';
import '@primeuix/themes/aura/inplace';
import '@primeuix/themes/aura/inputchips';
import '@primeuix/themes/aura/inputgroup';
import '@primeuix/themes/aura/inputnumber';
import '@primeuix/themes/aura/inputotp';
import '@primeuix/themes/aura/inputtext';
import '@primeuix/themes/aura/knob';
import '@primeuix/themes/aura/listbox';
import '@primeuix/themes/aura/megamenu';
import '@primeuix/themes/aura/menu';
import '@primeuix/themes/aura/menubar';
import '@primeuix/themes/aura/message';
import '@primeuix/themes/aura/metergroup';
import '@primeuix/themes/aura/multiselect';
import '@primeuix/themes/aura/orderlist';
import '@primeuix/themes/aura/organizationchart';
import '@primeuix/themes/aura/overlaybadge';
import '@primeuix/themes/aura/paginator';
import '@primeuix/themes/aura/panel';
import '@primeuix/themes/aura/panelmenu';
import '@primeuix/themes/aura/password';
import '@primeuix/themes/aura/picklist';
import '@primeuix/themes/aura/popover';
import '@primeuix/themes/aura/progressbar';
import '@primeuix/themes/aura/progressspinner';
import '@primeuix/themes/aura/radiobutton';
import '@primeuix/themes/aura/rating';
import '@primeuix/themes/aura/ripple';
import '@primeuix/themes/aura/scrollpanel';
import '@primeuix/themes/aura/select';
import '@primeuix/themes/aura/selectbutton';
import '@primeuix/themes/aura/skeleton';
import '@primeuix/themes/aura/slider';
import '@primeuix/themes/aura/speeddial';
import '@primeuix/themes/aura/splitbutton';
import '@primeuix/themes/aura/splitter';
import '@primeuix/themes/aura/stepper';
import '@primeuix/themes/aura/steps';
import '@primeuix/themes/aura/tabmenu';
import '@primeuix/themes/aura/tabs';
import '@primeuix/themes/aura/tabview';
import '@primeuix/themes/aura/tag';
import '@primeuix/themes/aura/terminal';
import '@primeuix/themes/aura/textarea';
import '@primeuix/themes/aura/tieredmenu';
import '@primeuix/themes/aura/timeline';
import '@primeuix/themes/aura/toast';
import '@primeuix/themes/aura/togglebutton';
import '@primeuix/themes/aura/toggleswitch';
import '@primeuix/themes/aura/toolbar';
import '@primeuix/themes/aura/tooltip';
import '@primeuix/themes/aura/tree';
import '@primeuix/themes/aura/treeselect';
import '@primeuix/themes/aura/treetable';
import '@primeuix/themes/aura/virtualscroller';
import '@primeuix/utils/eventbus';
import '@primeuix/utils';
import '@primeuix/utils/object';
import '@primeuix/styled';
import '@primeuix/utils/dom';
import '@primeuix/styles/base';
import '@primeuix/styles/badge';
import '@primeuix/utils/uuid';
import '@primeuix/styles/ripple';
import '@primeuix/styles/button';
import '@primeuix/utils/zindex';
import '@primeuix/styles/inputtext';
import '@primeuix/styles/datepicker';
import '@primeuix/styles/card';
import '@primeuix/styles/carousel';
import '@primeuix/styles/checkbox';
import '@primeuix/styles/dialog';
import '@primeuix/styles/confirmdialog';
import '@primeuix/styles/paginator';
import '@primeuix/styles/iconfield';
import '@primeuix/styles/virtualscroller';
import '@primeuix/styles/select';
import '@primeuix/styles/inputnumber';
import '@primeuix/styles/datatable';
import '@primeuix/styles/radiobutton';
import '@primeuix/styles/editor';
import '@primeuix/styles/message';
import '@primeuix/styles/progressbar';
import '@primeuix/styles/fileupload';
import '@primeuix/styles/menu';
import '@primeuix/styles/password';
import '@primeuix/styles/progressspinner';
import '@primeuix/styles/slider';
import '@primeuix/styles/tag';
import '@primeuix/styles/textarea';
import '@primeuix/styles/toast';
import '@primeuix/styles/toggleswitch';

const KB_EDITOR_CHROME = `
.kb-widget.mceNonEditable { position: relative; display: block; margin: 12px 0; padding: 10px; border: 1px dashed #93c5fd; border-radius: 8px; background: #f8fbff; cursor: pointer; user-select: none; }
.kb-widget.mceNonEditable:hover { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
.kb-widget.mceNonEditable::after { content: "click to edit"; position: absolute; top: -9px; right: 10px; font-size: 10px; line-height: 1; padding: 2px 6px; background: #3b82f6; color: #fff; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.04em; }
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const contentStore = useContentStore();
    const domainStore = useDomainStore();
    useAuthStore();
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl;
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const contentId = computed(() => {
      const id = route.params.id;
      return id === "new" ? null : Number(id);
    });
    const isNewContent = computed(() => contentId.value === null);
    const form = ref({
      title: "",
      description: "",
      content_type: ContentType.ARTICLE,
      lang_id: null,
      menu_id: null,
      status: 0
    });
    const errors = ref({});
    const saving = ref(false);
    const errorMessage = ref("");
    const contentTypeOptions = [
      { label: t("contentManager.article"), value: ContentType.ARTICLE },
      { label: t("contentManager.photo"), value: ContentType.PHOTO },
      { label: t("contentManager.video"), value: ContentType.VIDEO },
      { label: t("contentManager.document"), value: ContentType.DOCUMENT },
      { label: t("contentManager.blogNews"), value: ContentType.NEWS },
      { label: "Map", value: ContentType.MAP },
      { label: "Product / Service", value: ContentType.PRODUCT }
    ];
    useApi();
    const allMenus = ref([]);
    const languageOptions = computed(() => domainStore.languages);
    const menuOptions = computed(() => {
      const seen = /* @__PURE__ */ new Set();
      return allMenus.value.filter((m) => form.value.lang_id != null && m.lang_id === form.value.lang_id).filter((m) => {
        if (seen.has(m.item_id)) return false;
        seen.add(m.item_id);
        return true;
      }).map((m) => ({ item_id: m.item_id, item_name: m.item_name }));
    });
    watch(() => form.value.lang_id, () => {
      if (form.value.menu_id != null && !menuOptions.value.some((m) => m.item_id === form.value.menu_id)) {
        form.value.menu_id = null;
      }
    });
    const editorRef = shallowRef(null);
    const dialog = reactive({
      visible: false,
      type: null,
      data: {},
      node: null
    });
    const insertWidget = (type) => {
      const editor = editorRef.value;
      if (!editor) return;
      editor.focus();
      const html = createWidgetHtml(type);
      if (typeof editor.insertContent === "function") {
        editor.insertContent(html);
      } else {
        editor.execCommand("mceInsertContent", false, html);
      }
      editor.undoManager.add();
    };
    const openWidgetForNode = (type, data, node) => {
      dialog.type = type;
      dialog.data = data;
      dialog.node = node;
      dialog.visible = true;
    };
    const saveWidget = (data) => {
      const editor = editorRef.value;
      const node = dialog.node;
      if (!editor || !node || !dialog.type) {
        dialog.visible = false;
        return;
      }
      node.setAttribute("data-kb-payload", encodePayload(data));
      editor.dom.setHTML(node, previewHtml(dialog.type, data));
      editor.undoManager.add();
      editor.nodeChanged();
      dialog.visible = false;
    };
    const deleteWidget = () => {
      const editor = editorRef.value;
      const node = dialog.node;
      if (editor && node) {
        node.remove();
        editor.undoManager.add();
        editor.nodeChanged();
      }
      dialog.visible = false;
    };
    const duplicateWidget = () => {
      const editor = editorRef.value;
      const node = dialog.node;
      if (editor && node && node.parentNode) {
        node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling);
        editor.undoManager.add();
        editor.nodeChanged();
      }
      dialog.visible = false;
    };
    const editorInit = computed(() => ({
      height: 360,
      menubar: "tools",
      plugins: "noneditable advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste",
      toolbar: "undo redo | bold italic underline | forecolor backcolor | fontselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | kbinsert | fullscreen",
      branding: false,
      promotion: false,
      relative_urls: false,
      remove_script_host: false,
      document_base_url: photoUrl,
      content_style: blocksCss + KB_EDITOR_CHROME,
      extended_valid_elements: "div[class|style|contenteditable|data-kb-type|data-kb-payload],img[src|alt|class|style|width|height],figure[class|style],figcaption[class|style],hr[class|style],a[href|class|target|rel|style],h3[class|style],h4[class|style],p[class|style],span[class|style],ul[class|style],li[class|style],blockquote[class|style],details[class|style|open],summary[class|style],iframe[src|class|style|allow|allowfullscreen|loading|width|height|title],video[src|class|style|controls|preload|width|height]",
      setup(editor) {
        editorRef.value = editor;
        editor.addButton("kbinsert", {
          type: "menubutton",
          text: t("blockEditor.components"),
          tooltip: t("blockEditor.insert"),
          menu: [
            { text: t("blockEditor.card"), onclick: () => insertWidget("card") },
            { text: t("blockEditor.checklist"), onclick: () => insertWidget("checkbox") },
            { text: t("blockEditor.button"), onclick: () => insertWidget("button") },
            { text: t("blockEditor.image"), onclick: () => insertWidget("image") },
            { text: t("blockEditor.divider"), onclick: () => insertWidget("divider") },
            { text: t("blockEditor.columns"), onclick: () => insertWidget("columns") },
            { text: t("blockEditor.spacer"), onclick: () => insertWidget("spacer") },
            { text: t("blockEditor.icon"), onclick: () => insertWidget("icon") },
            { text: t("blockEditor.stats"), onclick: () => insertWidget("stats") },
            { text: t("blockEditor.callout"), onclick: () => insertWidget("callout") },
            { text: t("blockEditor.contact"), onclick: () => insertWidget("contact") },
            { text: t("blockEditor.gallery"), onclick: () => insertWidget("gallery") },
            { text: t("blockEditor.quote"), onclick: () => insertWidget("quote") },
            { text: t("blockEditor.accordion"), onclick: () => insertWidget("accordion") },
            { text: t("blockEditor.video"), onclick: () => insertWidget("video") }
          ]
        });
        editor.on("click", (e) => {
          const target = e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target;
          const info = readWidget(target);
          if (!info) return;
          const el = target.closest ? target.closest(".kb-widget") : null;
          openWidgetForNode(info.type, info.data, el);
        });
        editor.on("drop", (e) => {
          const marker = e.dataTransfer && (e.dataTransfer.getData("application/x-kb-block") || e.dataTransfer.getData("text/plain"));
          const type = parseDragMarker(marker) || getKbDrag();
          setKbDrag(null);
          if (!type) return;
          e.preventDefault();
          try {
            const doc = editor.getDoc();
            const area = editor.getContentAreaContainer && editor.getContentAreaContainer();
            const rect = area && area.getBoundingClientRect ? area.getBoundingClientRect() : { left: 0, top: 0 };
            const x = (e.clientX || 0) - rect.left;
            const y = (e.clientY || 0) - rect.top;
            let rng = null;
            if (typeof doc.caretRangeFromPoint === "function") {
              rng = doc.caretRangeFromPoint(x, y);
            } else if (typeof doc.caretPositionFromPoint === "function") {
              const pos = doc.caretPositionFromPoint(x, y);
              if (pos) {
                rng = doc.createRange();
                rng.setStart(pos.offsetNode, pos.offset);
                rng.collapse(true);
              }
            }
            if (rng && editor.selection && editor.selection.setRng) {
              editor.selection.setRng(rng);
            }
          } catch {
          }
          insertWidget(type);
        });
      }
    }));
    const validateForm = () => {
      errors.value = {};
      if (!form.value.title) {
        errors.value.title = t("validation.required");
      }
      if (form.value.content_type === null) {
        errors.value.content_type = t("validation.required");
      }
      if (form.value.lang_id === null) {
        errors.value.lang_id = t("validation.required");
      }
      if (form.value.menu_id === null) {
        errors.value.menu_id = t("validation.required");
      }
      return Object.keys(errors.value).length === 0;
    };
    const handleSave = async () => {
      errorMessage.value = "";
      if (!validateForm()) {
        return;
      }
      saving.value = true;
      try {
        let result;
        if (isNewContent.value) {
          result = await contentStore.saveContent({
            title: form.value.title,
            description: form.value.description,
            content_type: form.value.content_type,
            lang_id: form.value.lang_id,
            menu_id: form.value.menu_id,
            status: form.value.status ? 0 : 1
          });
        } else {
          result = await contentStore.updateContent(contentId.value, {
            title: form.value.title,
            description: form.value.description,
            content_type: form.value.content_type,
            lang_id: form.value.lang_id,
            menu_id: form.value.menu_id,
            status: form.value.status ? 0 : 1
          });
        }
        if (result === true || typeof result === "object" && result.success) {
          router.push("/admin/content");
        } else {
          errorMessage.value = t("common.error");
        }
      } catch (error) {
        errorMessage.value = error.message || t("common.error");
      } finally {
        saving.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _component_InputText = resolveComponent("InputText");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_ClientOnly = __nuxt_component_0;
      const _component_BlockWidgetDialog = __nuxt_component_1;
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      const _component_Message = resolveComponent("Message");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-feddfed1><div class="content-form-page" data-v-feddfed1><div class="page-header" data-v-feddfed1><h1 class="page-title" data-v-feddfed1>${ssrInterpolate(unref(isNewContent) ? _ctx.$t("contentManager.addNew") : _ctx.$t("contentManager.edit"))}</h1><div class="page-actions" data-v-feddfed1>`);
      _push(ssrRenderComponent(_component_Button, {
        label: _ctx.$t("common.back"),
        icon: "pi pi-arrow-left",
        outlined: "",
        onClick: ($event) => _ctx.$router.back()
      }, null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        label: _ctx.$t("common.save"),
        icon: "pi pi-check",
        onClick: handleSave,
        loading: unref(saving)
      }, null, _parent));
      _push(`</div></div><div class="form-grid" data-v-feddfed1>`);
      _push(ssrRenderComponent(_component_Card, { class: "form-card" }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("contentManager.contentTitle"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("contentManager.contentTitle")), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="content-form" data-v-feddfed1${_scopeId}><div class="form-group" data-v-feddfed1${_scopeId}><label for="title" data-v-feddfed1${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.contentTitle"))} *</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "title",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              placeholder: _ctx.$t("contentManager.contentTitle"),
              class: { "p-invalid": unref(errors).title }
            }, null, _parent2, _scopeId));
            if (unref(errors).title) {
              _push2(`<small class="p-error" data-v-feddfed1${_scopeId}>${ssrInterpolate(unref(errors).title)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-feddfed1${_scopeId}><label for="contentType" data-v-feddfed1${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.contentType"))} *</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "contentType",
              modelValue: unref(form).content_type,
              "onUpdate:modelValue": ($event) => unref(form).content_type = $event,
              options: contentTypeOptions,
              optionLabel: "label",
              optionValue: "value",
              placeholder: _ctx.$t("contentManager.contentType"),
              class: { "p-invalid": unref(errors).content_type }
            }, null, _parent2, _scopeId));
            if (unref(errors).content_type) {
              _push2(`<small class="p-error" data-v-feddfed1${_scopeId}>${ssrInterpolate(unref(errors).content_type)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-feddfed1${_scopeId}><label for="description" data-v-feddfed1${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.description"))}</label><div class="description-editor" style="${ssrRenderStyle({ "display": "block" })}" data-v-feddfed1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_BlockWidgetDialog, {
              visible: unref(dialog).visible,
              "onUpdate:visible": ($event) => unref(dialog).visible = $event,
              type: unref(dialog).type,
              data: unref(dialog).data,
              onSave: saveWidget,
              onDelete: deleteWidget,
              onDuplicate: duplicateWidget
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="row" data-v-feddfed1${_scopeId}><div class="col-md-6" data-v-feddfed1${_scopeId}><div class="form-group" data-v-feddfed1${_scopeId}><label for="lang" data-v-feddfed1${_scopeId}>${ssrInterpolate(_ctx.$t("menuManager.language"))} *</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "lang",
              modelValue: unref(form).lang_id,
              "onUpdate:modelValue": ($event) => unref(form).lang_id = $event,
              options: unref(languageOptions),
              optionLabel: "lang_name",
              optionValue: "lang_id",
              placeholder: "Select language",
              class: { "p-invalid": unref(errors).lang_id }
            }, null, _parent2, _scopeId));
            if (unref(errors).lang_id) {
              _push2(`<small class="p-error" data-v-feddfed1${_scopeId}>${ssrInterpolate(unref(errors).lang_id)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="col-md-6" data-v-feddfed1${_scopeId}><div class="form-group" data-v-feddfed1${_scopeId}><label for="menu" data-v-feddfed1${_scopeId}>${ssrInterpolate(_ctx.$t("menuManager.menuName"))} *</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "menu",
              modelValue: unref(form).menu_id,
              "onUpdate:modelValue": ($event) => unref(form).menu_id = $event,
              options: unref(menuOptions),
              optionLabel: "item_name",
              optionValue: "item_id",
              disabled: unref(form).lang_id == null,
              placeholder: unref(form).lang_id == null ? "Select language first" : _ctx.$t("menuManager.selectMenu"),
              class: { "p-invalid": unref(errors).menu_id },
              showClear: ""
            }, null, _parent2, _scopeId));
            if (unref(errors).menu_id) {
              _push2(`<small class="p-error" data-v-feddfed1${_scopeId}>${ssrInterpolate(unref(errors).menu_id)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="form-group" data-v-feddfed1${_scopeId}><label for="status" data-v-feddfed1${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.status"))}</label><div class="status-toggle" data-v-feddfed1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ToggleSwitch, {
              id: "status",
              modelValue: unref(form).status,
              "onUpdate:modelValue": (v) => unref(form).status = v,
              trueValue: 1,
              falseValue: 0
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-feddfed1${_scopeId}>${ssrInterpolate(unref(form).status ? _ctx.$t("contentManager.published") : _ctx.$t("contentManager.draft"))}</span></div></div>`);
            if (unref(errorMessage)) {
              _push2(ssrRenderComponent(_component_Message, {
                severity: "error",
                closable: false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(errorMessage))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(errorMessage)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(handleSave, ["prevent"]),
                class: "content-form"
              }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "title" }, toDisplayString(_ctx.$t("contentManager.contentTitle")) + " *", 1),
                  createVNode(_component_InputText, {
                    id: "title",
                    modelValue: unref(form).title,
                    "onUpdate:modelValue": ($event) => unref(form).title = $event,
                    placeholder: _ctx.$t("contentManager.contentTitle"),
                    class: { "p-invalid": unref(errors).title }
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "class"]),
                  unref(errors).title ? (openBlock(), createBlock("small", {
                    key: 0,
                    class: "p-error"
                  }, toDisplayString(unref(errors).title), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "contentType" }, toDisplayString(_ctx.$t("contentManager.contentType")) + " *", 1),
                  createVNode(_component_Dropdown, {
                    id: "contentType",
                    modelValue: unref(form).content_type,
                    "onUpdate:modelValue": ($event) => unref(form).content_type = $event,
                    options: contentTypeOptions,
                    optionLabel: "label",
                    optionValue: "value",
                    placeholder: _ctx.$t("contentManager.contentType"),
                    class: { "p-invalid": unref(errors).content_type }
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "class"]),
                  unref(errors).content_type ? (openBlock(), createBlock("small", {
                    key: 0,
                    class: "p-error"
                  }, toDisplayString(unref(errors).content_type), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "description" }, toDisplayString(_ctx.$t("contentManager.description")), 1),
                  createVNode("div", {
                    class: "description-editor",
                    style: { "display": "block" }
                  }, [
                    createVNode(_component_ClientOnly, null, {
                      default: withCtx(() => [
                        createVNode(unref(TinyMCEEditor), {
                          modelValue: unref(form).description,
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          tinymceScriptSrc: "/tinymce/tinymce.min.js",
                          init: unref(editorInit),
                          class: "description-editor__field"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "init"])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_BlockWidgetDialog, {
                    visible: unref(dialog).visible,
                    "onUpdate:visible": ($event) => unref(dialog).visible = $event,
                    type: unref(dialog).type,
                    data: unref(dialog).data,
                    onSave: saveWidget,
                    onDelete: deleteWidget,
                    onDuplicate: duplicateWidget
                  }, null, 8, ["visible", "onUpdate:visible", "type", "data"])
                ]),
                createVNode("div", { class: "row" }, [
                  createVNode("div", { class: "col-md-6" }, [
                    createVNode("div", { class: "form-group" }, [
                      createVNode("label", { for: "lang" }, toDisplayString(_ctx.$t("menuManager.language")) + " *", 1),
                      createVNode(_component_Dropdown, {
                        id: "lang",
                        modelValue: unref(form).lang_id,
                        "onUpdate:modelValue": ($event) => unref(form).lang_id = $event,
                        options: unref(languageOptions),
                        optionLabel: "lang_name",
                        optionValue: "lang_id",
                        placeholder: "Select language",
                        class: { "p-invalid": unref(errors).lang_id }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "class"]),
                      unref(errors).lang_id ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "p-error"
                      }, toDisplayString(unref(errors).lang_id), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "col-md-6" }, [
                    createVNode("div", { class: "form-group" }, [
                      createVNode("label", { for: "menu" }, toDisplayString(_ctx.$t("menuManager.menuName")) + " *", 1),
                      createVNode(_component_Dropdown, {
                        id: "menu",
                        modelValue: unref(form).menu_id,
                        "onUpdate:modelValue": ($event) => unref(form).menu_id = $event,
                        options: unref(menuOptions),
                        optionLabel: "item_name",
                        optionValue: "item_id",
                        disabled: unref(form).lang_id == null,
                        placeholder: unref(form).lang_id == null ? "Select language first" : _ctx.$t("menuManager.selectMenu"),
                        class: { "p-invalid": unref(errors).menu_id },
                        showClear: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled", "placeholder", "class"]),
                      unref(errors).menu_id ? (openBlock(), createBlock("small", {
                        key: 0,
                        class: "p-error"
                      }, toDisplayString(unref(errors).menu_id), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "status" }, toDisplayString(_ctx.$t("contentManager.status")), 1),
                  createVNode("div", { class: "status-toggle" }, [
                    createVNode(_component_ToggleSwitch, {
                      id: "status",
                      modelValue: unref(form).status,
                      "onUpdate:modelValue": (v) => unref(form).status = v,
                      trueValue: 1,
                      falseValue: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("span", null, toDisplayString(unref(form).status ? _ctx.$t("contentManager.published") : _ctx.$t("contentManager.draft")), 1)
                  ])
                ]),
                unref(errorMessage) ? (openBlock(), createBlock(_component_Message, {
                  key: 0,
                  severity: "error",
                  closable: false
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(errorMessage)), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!unref(isNewContent)) {
        _push(ssrRenderComponent(_component_Card, { class: "preview-card" }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("contentManager.actions"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("contentManager.actions")), 1)
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
            if (_push2) {
              _push2(`<div class="action-links" data-v-feddfed1${_scopeId}>`);
              if (((_a = unref(contentStore).currentContent) == null ? void 0 : _a.content_type) !== unref(ContentType).ARTICLE && ((_b = unref(contentStore).currentContent) == null ? void 0 : _b.content_type) !== unref(ContentType).PRODUCT) {
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("contentManager.list"),
                  icon: "pi pi-list",
                  outlined: "",
                  onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/items`),
                  class: "w-full mb-3"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (((_c = unref(contentStore).currentContent) == null ? void 0 : _c.content_type) === unref(ContentType).NEWS) {
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("contentManager.blogNews"),
                  icon: "pi pi-news",
                  outlined: "",
                  onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/news`),
                  class: "w-full mb-3"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (((_d = unref(contentStore).currentContent) == null ? void 0 : _d.content_type) === unref(ContentType).MAP) {
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("contentManager.showMap"),
                  icon: "pi pi-map",
                  outlined: "",
                  onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/map`),
                  class: "w-full mb-3"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (((_e = unref(contentStore).currentContent) == null ? void 0 : _e.content_type) === unref(ContentType).PRODUCT) {
                _push2(ssrRenderComponent(_component_Button, {
                  label: "Manage Products",
                  icon: "pi pi-shopping-bag",
                  outlined: "",
                  onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/products`),
                  class: "w-full"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "action-links" }, [
                  ((_f = unref(contentStore).currentContent) == null ? void 0 : _f.content_type) !== unref(ContentType).ARTICLE && ((_g = unref(contentStore).currentContent) == null ? void 0 : _g.content_type) !== unref(ContentType).PRODUCT ? (openBlock(), createBlock(_component_Button, {
                    key: 0,
                    label: _ctx.$t("contentManager.list"),
                    icon: "pi pi-list",
                    outlined: "",
                    onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/items`),
                    class: "w-full mb-3"
                  }, null, 8, ["label", "onClick"])) : createCommentVNode("", true),
                  ((_h = unref(contentStore).currentContent) == null ? void 0 : _h.content_type) === unref(ContentType).NEWS ? (openBlock(), createBlock(_component_Button, {
                    key: 1,
                    label: _ctx.$t("contentManager.blogNews"),
                    icon: "pi pi-news",
                    outlined: "",
                    onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/news`),
                    class: "w-full mb-3"
                  }, null, 8, ["label", "onClick"])) : createCommentVNode("", true),
                  ((_i = unref(contentStore).currentContent) == null ? void 0 : _i.content_type) === unref(ContentType).MAP ? (openBlock(), createBlock(_component_Button, {
                    key: 2,
                    label: _ctx.$t("contentManager.showMap"),
                    icon: "pi pi-map",
                    outlined: "",
                    onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/map`),
                    class: "w-full mb-3"
                  }, null, 8, ["label", "onClick"])) : createCommentVNode("", true),
                  ((_j = unref(contentStore).currentContent) == null ? void 0 : _j.content_type) === unref(ContentType).PRODUCT ? (openBlock(), createBlock(_component_Button, {
                    key: 3,
                    label: "Manage Products",
                    icon: "pi pi-shopping-bag",
                    outlined: "",
                    onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/products`),
                    class: "w-full"
                  }, null, 8, ["onClick"])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/content/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-feddfed1"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CRcgP9kR.mjs.map
