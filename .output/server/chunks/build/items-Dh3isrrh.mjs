import { _ as __nuxt_component_0 } from './MediaPicker-DTd9YafP.mjs';
import { _ as _export_sfc, k as useConfirm, l as useI18n, m as useRoute, n as navigateTo, b as useRuntimeConfig } from './server.mjs';
import { defineComponent, ref, computed, resolveComponent, resolveDirective, mergeProps, unref, withCtx, createVNode, withModifiers, toDisplayString, openBlock, createBlock, createCommentVNode, withDirectives, vModelText, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderStyle } from 'vue/server-renderer';
import { C as ContentType } from './content-KJHlnLiT.mjs';
import { H as HtmlBlockEditor } from './HtmlBlockEditor-OS-aBEWi.mjs';
import { u as useContentStore } from './content-CfTGS04A.mjs';
import './useUpload-BUN8k0ZN.mjs';
import './auth-CZZkTxj2.mjs';
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
import '@tiptap/vue-3';
import '@tiptap/starter-kit';
import '@tiptap/extension-image';
import '@tiptap/extension-link';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "items",
  __ssrInlineRender: true,
  setup(__props) {
    const contentStore = useContentStore();
    const confirm = useConfirm();
    const { t } = useI18n();
    const route = useRoute();
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl || "https://khmer.biz";
    const loading = ref(false);
    const editingItem = ref(null);
    const saving = ref(false);
    const showForm = ref(false);
    const imageInputMode = ref("upload");
    const contentType = ref(ContentType.ARTICLE);
    const itemForm = ref({
      title: "",
      short_description: "",
      description: "",
      photo: null,
      photoUrl: "",
      photoPreview: "",
      video_url: "",
      priority: 0,
      is_feature: false,
      publish_date: /* @__PURE__ */ new Date(),
      status: true
    });
    const itemErrors = ref({});
    const contentId = computed(() => Number(route.params.contentId));
    const validateItemForm = () => {
      itemErrors.value = {};
      if (!itemForm.value.title) {
        itemErrors.value.title = t("validation.required");
      }
      return Object.keys(itemErrors.value).length === 0;
    };
    const handlePhotoSelect = (event) => {
      const file = event.files[0];
      if (file) {
        itemForm.value.photo = file;
        itemForm.value.photoPreview = URL.createObjectURL(file);
      }
    };
    const clearPhoto = () => {
      itemForm.value.photo = null;
      itemForm.value.photoUrl = "";
      itemForm.value.photoPreview = "";
    };
    const addNewItem = () => {
      editingItem.value = null;
      itemForm.value = {
        title: "",
        short_description: "",
        description: "",
        photo: null,
        photoUrl: "",
        photoPreview: "",
        video_url: "",
        priority: 0,
        is_feature: false,
        publish_date: /* @__PURE__ */ new Date(),
        status: true
      };
      itemErrors.value = {};
      imageInputMode.value = "upload";
      showForm.value = true;
    };
    const editItem = (item) => {
      editingItem.value = item;
      const existingPhoto = item.photo ? `${photoUrl}${item.photo}` : "";
      itemForm.value = {
        title: item.title || "",
        short_description: item.short_description || "",
        description: item.description || item.longdes || "",
        photo: null,
        photoUrl: item.photo && !item.photo.startsWith("/") ? item.photo : "",
        photoPreview: existingPhoto,
        video_url: item.video_url || "",
        priority: item.priority || 0,
        is_feature: item.is_feature || false,
        publish_date: item.publish_date ? new Date(item.publish_date) : /* @__PURE__ */ new Date(),
        status: item.status !== 1
      };
      itemErrors.value = {};
      imageInputMode.value = existingPhoto ? "url" : "upload";
      showForm.value = true;
    };
    const cancelEdit = () => {
      editingItem.value = null;
      itemForm.value = {
        title: "",
        short_description: "",
        description: "",
        photo: null,
        photoUrl: "",
        photoPreview: "",
        video_url: "",
        priority: 0,
        is_feature: false,
        publish_date: /* @__PURE__ */ new Date(),
        status: true
      };
      itemErrors.value = {};
      showForm.value = false;
    };
    const handleSaveItem = async () => {
      if (!validateItemForm()) return;
      saving.value = true;
      try {
        let result;
        if (isNewsContent.value) {
          const publishDate = itemForm.value.publish_date ? itemForm.value.publish_date.toISOString().slice(0, 19).replace("T", " ") : void 0;
          const newsData = {
            title: itemForm.value.title,
            shortdes: itemForm.value.short_description || "",
            longdes: itemForm.value.description || "",
            priority: itemForm.value.priority ? 1 : 0,
            publish: publishDate,
            status: itemForm.value.status ? 0 : 1
          };
          if (itemForm.value.photo) {
            newsData.photo = itemForm.value.photo;
          }
          if (itemForm.value.photoUrl) {
            newsData.photo = itemForm.value.photoUrl;
          }
          if (editingItem.value) {
            result = await contentStore.updateNews(contentId.value, editingItem.value.news_id || editingItem.value.id, newsData);
          } else {
            result = await contentStore.saveNews(contentId.value, newsData);
          }
        } else {
          const data = {
            title: itemForm.value.title,
            description: itemForm.value.description,
            item_type: contentType.value === ContentType.PHOTO ? 1 : contentType.value === ContentType.VIDEO ? 2 : contentType.value === ContentType.DOCUMENT ? 3 : contentType.value,
            video_url: itemForm.value.video_url,
            photoUrl: itemForm.value.photoUrl
          };
          if (itemForm.value.photo) {
            data.photo = itemForm.value.photo;
          }
          if (editingItem.value) {
            result = await contentStore.updateItem(contentId.value, editingItem.value.item_id, data);
          } else {
            result = await contentStore.saveItem(contentId.value, data);
          }
        }
        if (result === true || typeof result === "object" && result.success) {
          if (isNewsContent.value) {
            await contentStore.fetchNews(contentId.value);
          } else {
            await contentStore.fetchItems(contentId.value);
          }
          cancelEdit();
        }
      } finally {
        saving.value = false;
      }
    };
    const confirmDelete = (item) => {
      confirm.require({
        message: t("common.confirm"),
        header: t("common.warning"),
        icon: "pi pi-exclamation-triangle",
        accept: () => deleteItem(item.item_id),
        acceptClass: "p-button-danger"
      });
    };
    const deleteItem = async (id) => {
      if (isNewsContent.value) {
        await contentStore.deleteNews(contentId.value, id);
      } else {
        await contentStore.deleteItem(contentId.value, id);
      }
    };
    const isNewsContent = computed(() => contentType.value === ContentType.NEWS);
    const displayItems = computed(() => isNewsContent.value ? contentStore.newsList : contentStore.contentItems);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _component_InputText = resolveComponent("InputText");
      const _component_Textarea = resolveComponent("Textarea");
      const _component_ClientOnly = __nuxt_component_0;
      const _component_FileUpload = resolveComponent("FileUpload");
      const _component_Checkbox = resolveComponent("Checkbox");
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      const _component_Calendar = resolveComponent("Calendar");
      const _component_DataTable = resolveComponent("DataTable");
      const _component_Column = resolveComponent("Column");
      const _component_ConfirmDialog = resolveComponent("ConfirmDialog");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-items-page" }, _attrs))} data-v-67abdc25><div class="page-header" data-v-67abdc25><div class="header-left" data-v-67abdc25>`);
      _push(ssrRenderComponent(_component_Button, {
        icon: "pi pi-arrow-left",
        text: "",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/admin/content/${unref(contentId)}`)
      }, null, _parent));
      _push(`<h1 class="page-title" data-v-67abdc25>${ssrInterpolate(_ctx.$t("contentManager.title"))}: ${ssrInterpolate((_a = unref(contentStore).currentContent) == null ? void 0 : _a.title)}</h1></div></div><div class="split-layout" data-v-67abdc25>`);
      if (unref(showForm)) {
        _push(ssrRenderComponent(_component_Card, { class: "form-card" }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(editingItem) ? _ctx.$t("contentManager.edit") : _ctx.$t("contentManager.addNew"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(editingItem) ? _ctx.$t("contentManager.edit") : _ctx.$t("contentManager.addNew")), 1)
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<form class="item-form" data-v-67abdc25${_scopeId}><div class="form-group" data-v-67abdc25${_scopeId}><label for="itemTitle" data-v-67abdc25${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.contentTitle"))} *</label>`);
              _push2(ssrRenderComponent(_component_InputText, {
                id: "itemTitle",
                modelValue: unref(itemForm).title,
                "onUpdate:modelValue": ($event) => unref(itemForm).title = $event,
                placeholder: _ctx.$t("contentManager.contentTitle"),
                class: { "p-invalid": unref(itemErrors).title }
              }, null, _parent2, _scopeId));
              if (unref(itemErrors).title) {
                _push2(`<small class="p-error" data-v-67abdc25${_scopeId}>${ssrInterpolate(unref(itemErrors).title)}</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(isNewsContent)) {
                _push2(`<div class="form-group" data-v-67abdc25${_scopeId}><label for="shortDescription" data-v-67abdc25${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.shortDescription"))}</label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  id: "shortDescription",
                  modelValue: unref(itemForm).short_description,
                  "onUpdate:modelValue": ($event) => unref(itemForm).short_description = $event,
                  rows: "3",
                  placeholder: _ctx.$t("contentManager.shortDescription")
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="form-group" data-v-67abdc25${_scopeId}><label for="itemDescription" data-v-67abdc25${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.description"))}</label>`);
              _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
              if (!unref(isNewsContent)) {
                _push2(`<textarea class="form-control" rows="4"${ssrRenderAttr("placeholder", _ctx.$t("contentManager.description"))} data-v-67abdc25${_scopeId}>${ssrInterpolate(unref(itemForm).description)}</textarea>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(contentType) !== unref(ContentType).VIDEO) {
                _push2(`<div class="form-group" data-v-67abdc25${_scopeId}><label data-v-67abdc25${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.primaryImage"))}</label><div class="image-input-tabs" data-v-67abdc25${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Button, {
                  label: "Upload",
                  outlined: unref(imageInputMode) !== "upload",
                  size: "small",
                  onClick: ($event) => imageInputMode.value = "upload"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_Button, {
                  label: "URL",
                  outlined: unref(imageInputMode) !== "url",
                  size: "small",
                  onClick: ($event) => imageInputMode.value = "url"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
                if (unref(imageInputMode) === "upload") {
                  _push2(`<div data-v-67abdc25${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_FileUpload, {
                    mode: "basic",
                    customUpload: true,
                    onSelect: handlePhotoSelect,
                    auto: false,
                    accept: "image/*",
                    chooseLabel: "Choose Image"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<div data-v-67abdc25${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_InputText, {
                    modelValue: unref(itemForm).photoUrl,
                    "onUpdate:modelValue": ($event) => unref(itemForm).photoUrl = $event,
                    placeholder: "https://example.com/image.jpg",
                    class: "w-full"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                if (unref(itemForm).photoPreview) {
                  _push2(`<div class="photo-preview" data-v-67abdc25${_scopeId}><img${ssrRenderAttr("src", unref(itemForm).photoPreview)} alt="Preview" data-v-67abdc25${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Button, {
                    icon: "pi pi-times",
                    rounded: "",
                    text: "",
                    severity: "danger",
                    onClick: clearPhoto,
                    class: "remove-photo"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(contentType) === unref(ContentType).VIDEO) {
                _push2(`<div class="form-group" data-v-67abdc25${_scopeId}><label for="videoUrl" data-v-67abdc25${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.videoLink"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  id: "videoUrl",
                  modelValue: unref(itemForm).video_url,
                  "onUpdate:modelValue": ($event) => unref(itemForm).video_url = $event,
                  placeholder: "https://www.youtube.com/watch?v=..."
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(isNewsContent)) {
                _push2(`<div class="form-row" data-v-67abdc25${_scopeId}><div class="form-group" data-v-67abdc25${_scopeId}><label for="priority" data-v-67abdc25${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.priority"))}</label>`);
                _push2(ssrRenderComponent(_component_Checkbox, {
                  id: "priority",
                  modelValue: unref(itemForm).priority,
                  "onUpdate:modelValue": ($event) => unref(itemForm).priority = $event,
                  binary: true,
                  trueValue: 1,
                  falseValue: 0
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="form-group" data-v-67abdc25${_scopeId}><label for="isFeature" data-v-67abdc25${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.featureItem"))}</label>`);
                _push2(ssrRenderComponent(_component_ToggleSwitch, {
                  id: "isFeature",
                  modelValue: unref(itemForm).is_feature,
                  "onUpdate:modelValue": ($event) => unref(itemForm).is_feature = $event
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(isNewsContent)) {
                _push2(`<div class="form-row" data-v-67abdc25${_scopeId}><div class="form-group" data-v-67abdc25${_scopeId}><label for="publishDate" data-v-67abdc25${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.publishDate"))}</label>`);
                _push2(ssrRenderComponent(_component_Calendar, {
                  id: "publishDate",
                  modelValue: unref(itemForm).publish_date,
                  "onUpdate:modelValue": ($event) => unref(itemForm).publish_date = $event,
                  showTime: "",
                  hourFormat: "12",
                  dateFormat: "yy-mm-dd"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="form-group" data-v-67abdc25${_scopeId}><label for="newsStatus" data-v-67abdc25${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.status") || "Status")}</label><div class="status-toggle" data-v-67abdc25${_scopeId}>`);
                _push2(ssrRenderComponent(_component_ToggleSwitch, {
                  id: "newsStatus",
                  modelValue: unref(itemForm).status,
                  "onUpdate:modelValue": ($event) => unref(itemForm).status = $event
                }, null, _parent2, _scopeId));
                _push2(`<span class="status-label" data-v-67abdc25${_scopeId}>${ssrInterpolate(unref(itemForm).status ? _ctx.$t("contentManager.show") || "Show" : _ctx.$t("contentManager.notShow") || "Not Show")}</span></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="form-actions" data-v-67abdc25${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, {
                type: "button",
                label: _ctx.$t("common.cancel"),
                outlined: "",
                onClick: cancelEdit
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Button, {
                type: "submit",
                label: unref(editingItem) ? _ctx.$t("common.update") : _ctx.$t("common.add"),
                loading: unref(saving)
              }, null, _parent2, _scopeId));
              _push2(`</div></form>`);
            } else {
              return [
                createVNode("form", {
                  onSubmit: withModifiers(handleSaveItem, ["prevent"]),
                  class: "item-form"
                }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "itemTitle" }, toDisplayString(_ctx.$t("contentManager.contentTitle")) + " *", 1),
                    createVNode(_component_InputText, {
                      id: "itemTitle",
                      modelValue: unref(itemForm).title,
                      "onUpdate:modelValue": ($event) => unref(itemForm).title = $event,
                      placeholder: _ctx.$t("contentManager.contentTitle"),
                      class: { "p-invalid": unref(itemErrors).title }
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "class"]),
                    unref(itemErrors).title ? (openBlock(), createBlock("small", {
                      key: 0,
                      class: "p-error"
                    }, toDisplayString(unref(itemErrors).title), 1)) : createCommentVNode("", true)
                  ]),
                  unref(isNewsContent) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "form-group"
                  }, [
                    createVNode("label", { for: "shortDescription" }, toDisplayString(_ctx.$t("contentManager.shortDescription")), 1),
                    createVNode(_component_Textarea, {
                      id: "shortDescription",
                      modelValue: unref(itemForm).short_description,
                      "onUpdate:modelValue": ($event) => unref(itemForm).short_description = $event,
                      rows: "3",
                      placeholder: _ctx.$t("contentManager.shortDescription")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "itemDescription" }, toDisplayString(_ctx.$t("contentManager.description")), 1),
                    createVNode(_component_ClientOnly, null, {
                      default: withCtx(() => [
                        unref(isNewsContent) ? (openBlock(), createBlock(HtmlBlockEditor, {
                          key: 0,
                          modelValue: unref(itemForm).description,
                          "onUpdate:modelValue": ($event) => unref(itemForm).description = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    !unref(isNewsContent) ? withDirectives((openBlock(), createBlock("textarea", {
                      key: 0,
                      "onUpdate:modelValue": ($event) => unref(itemForm).description = $event,
                      class: "form-control",
                      rows: "4",
                      placeholder: _ctx.$t("contentManager.description")
                    }, null, 8, ["onUpdate:modelValue", "placeholder"])), [
                      [vModelText, unref(itemForm).description]
                    ]) : createCommentVNode("", true)
                  ]),
                  unref(contentType) !== unref(ContentType).VIDEO ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "form-group"
                  }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("contentManager.primaryImage")), 1),
                    createVNode("div", { class: "image-input-tabs" }, [
                      createVNode(_component_Button, {
                        label: "Upload",
                        outlined: unref(imageInputMode) !== "upload",
                        size: "small",
                        onClick: ($event) => imageInputMode.value = "upload"
                      }, null, 8, ["outlined", "onClick"]),
                      createVNode(_component_Button, {
                        label: "URL",
                        outlined: unref(imageInputMode) !== "url",
                        size: "small",
                        onClick: ($event) => imageInputMode.value = "url"
                      }, null, 8, ["outlined", "onClick"])
                    ]),
                    unref(imageInputMode) === "upload" ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(_component_FileUpload, {
                        mode: "basic",
                        customUpload: true,
                        onSelect: handlePhotoSelect,
                        auto: false,
                        accept: "image/*",
                        chooseLabel: "Choose Image"
                      })
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode(_component_InputText, {
                        modelValue: unref(itemForm).photoUrl,
                        "onUpdate:modelValue": ($event) => unref(itemForm).photoUrl = $event,
                        placeholder: "https://example.com/image.jpg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])),
                    unref(itemForm).photoPreview ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "photo-preview"
                    }, [
                      createVNode("img", {
                        src: unref(itemForm).photoPreview,
                        alt: "Preview"
                      }, null, 8, ["src"]),
                      createVNode(_component_Button, {
                        icon: "pi pi-times",
                        rounded: "",
                        text: "",
                        severity: "danger",
                        onClick: clearPhoto,
                        class: "remove-photo"
                      })
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  unref(contentType) === unref(ContentType).VIDEO ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "form-group"
                  }, [
                    createVNode("label", { for: "videoUrl" }, toDisplayString(_ctx.$t("contentManager.videoLink")), 1),
                    createVNode(_component_InputText, {
                      id: "videoUrl",
                      modelValue: unref(itemForm).video_url,
                      "onUpdate:modelValue": ($event) => unref(itemForm).video_url = $event,
                      placeholder: "https://www.youtube.com/watch?v=..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : createCommentVNode("", true),
                  unref(isNewsContent) ? (openBlock(), createBlock("div", {
                    key: 3,
                    class: "form-row"
                  }, [
                    createVNode("div", { class: "form-group" }, [
                      createVNode("label", { for: "priority" }, toDisplayString(_ctx.$t("contentManager.priority")), 1),
                      createVNode(_component_Checkbox, {
                        id: "priority",
                        modelValue: unref(itemForm).priority,
                        "onUpdate:modelValue": ($event) => unref(itemForm).priority = $event,
                        binary: true,
                        trueValue: 1,
                        falseValue: 0
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "form-group" }, [
                      createVNode("label", { for: "isFeature" }, toDisplayString(_ctx.$t("contentManager.featureItem")), 1),
                      createVNode(_component_ToggleSwitch, {
                        id: "isFeature",
                        modelValue: unref(itemForm).is_feature,
                        "onUpdate:modelValue": ($event) => unref(itemForm).is_feature = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ])) : createCommentVNode("", true),
                  unref(isNewsContent) ? (openBlock(), createBlock("div", {
                    key: 4,
                    class: "form-row"
                  }, [
                    createVNode("div", { class: "form-group" }, [
                      createVNode("label", { for: "publishDate" }, toDisplayString(_ctx.$t("contentManager.publishDate")), 1),
                      createVNode(_component_Calendar, {
                        id: "publishDate",
                        modelValue: unref(itemForm).publish_date,
                        "onUpdate:modelValue": ($event) => unref(itemForm).publish_date = $event,
                        showTime: "",
                        hourFormat: "12",
                        dateFormat: "yy-mm-dd"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "form-group" }, [
                      createVNode("label", { for: "newsStatus" }, toDisplayString(_ctx.$t("contentManager.status") || "Status"), 1),
                      createVNode("div", { class: "status-toggle" }, [
                        createVNode(_component_ToggleSwitch, {
                          id: "newsStatus",
                          modelValue: unref(itemForm).status,
                          "onUpdate:modelValue": ($event) => unref(itemForm).status = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("span", { class: "status-label" }, toDisplayString(unref(itemForm).status ? _ctx.$t("contentManager.show") || "Show" : _ctx.$t("contentManager.notShow") || "Not Show"), 1)
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "form-actions" }, [
                    createVNode(_component_Button, {
                      type: "button",
                      label: _ctx.$t("common.cancel"),
                      outlined: "",
                      onClick: cancelEdit
                    }, null, 8, ["label"]),
                    createVNode(_component_Button, {
                      type: "submit",
                      label: unref(editingItem) ? _ctx.$t("common.update") : _ctx.$t("common.add"),
                      loading: unref(saving)
                    }, null, 8, ["label", "loading"])
                  ])
                ], 32)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Card, { class: "table-card" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-end", "padding": "0.5rem 1rem" })}" data-v-67abdc25${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: _ctx.$t("contentManager.addNew"),
              icon: "pi pi-plus",
              size: "small",
              onClick: addNewItem
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "justify-content": "flex-end", "padding": "0.5rem 1rem" } }, [
                createVNode(_component_Button, {
                  label: _ctx.$t("contentManager.addNew"),
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: addNewItem
                }, null, 8, ["label"])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DataTable, {
              value: unref(displayItems),
              loading: unref(loading),
              paginator: unref(displayItems).length > 20,
              rows: 20,
              rowsPerPageOptions: [10, 20, 50],
              stripedRows: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Column, {
                    field: unref(isNewsContent) ? "news_id" : "item_id",
                    header: "ID",
                    style: { width: "60px" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    header: _ctx.$t("contentManager.primaryImage"),
                    style: { width: "100px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (data.photo || data.url && unref(contentType) !== unref(ContentType).VIDEO) {
                          _push4(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${data.photo || data.url}`)}${ssrRenderAttr("alt", data.title)} class="item-thumb" data-v-67abdc25${_scopeId3}>`);
                        } else {
                          _push4(`<span data-v-67abdc25${_scopeId3}>-</span>`);
                        }
                      } else {
                        return [
                          data.photo || data.url && unref(contentType) !== unref(ContentType).VIDEO ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: `${unref(photoUrl)}${data.photo || data.url}`,
                            alt: data.title,
                            class: "item-thumb"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "title",
                    header: _ctx.$t("contentManager.contentTitle")
                  }, null, _parent3, _scopeId2));
                  if (unref(isNewsContent)) {
                    _push3(ssrRenderComponent(_component_Column, {
                      header: _ctx.$t("contentManager.priority"),
                      style: { width: "80px" },
                      field: "priority"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_Column, {
                    header: _ctx.$t("contentManager.actions"),
                    style: { width: "120px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="action-buttons" data-v-67abdc25${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Button, mergeProps({
                          icon: "pi pi-pencil",
                          rounded: "",
                          text: "",
                          size: "small",
                          onClick: ($event) => editItem(data)
                        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.$t("contentManager.edit"), void 0, { top: true })), null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Button, mergeProps({
                          icon: "pi pi-trash",
                          rounded: "",
                          text: "",
                          severity: "danger",
                          size: "small",
                          onClick: ($event) => confirmDelete(data)
                        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.$t("contentManager.delete"), void 0, { top: true })), null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "action-buttons" }, [
                            withDirectives(createVNode(_component_Button, {
                              icon: "pi pi-pencil",
                              rounded: "",
                              text: "",
                              size: "small",
                              onClick: ($event) => editItem(data)
                            }, null, 8, ["onClick"]), [
                              [
                                _directive_tooltip,
                                _ctx.$t("contentManager.edit"),
                                void 0,
                                { top: true }
                              ]
                            ]),
                            withDirectives(createVNode(_component_Button, {
                              icon: "pi pi-trash",
                              rounded: "",
                              text: "",
                              severity: "danger",
                              size: "small",
                              onClick: ($event) => confirmDelete(data)
                            }, null, 8, ["onClick"]), [
                              [
                                _directive_tooltip,
                                _ctx.$t("contentManager.delete"),
                                void 0,
                                { top: true }
                              ]
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Column, {
                      field: unref(isNewsContent) ? "news_id" : "item_id",
                      header: "ID",
                      style: { width: "60px" }
                    }, null, 8, ["field"]),
                    createVNode(_component_Column, {
                      header: _ctx.$t("contentManager.primaryImage"),
                      style: { width: "100px" }
                    }, {
                      body: withCtx(({ data }) => [
                        data.photo || data.url && unref(contentType) !== unref(ContentType).VIDEO ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `${unref(photoUrl)}${data.photo || data.url}`,
                          alt: data.title,
                          class: "item-thumb"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                      ]),
                      _: 1
                    }, 8, ["header"]),
                    createVNode(_component_Column, {
                      field: "title",
                      header: _ctx.$t("contentManager.contentTitle")
                    }, null, 8, ["header"]),
                    unref(isNewsContent) ? (openBlock(), createBlock(_component_Column, {
                      key: 0,
                      header: _ctx.$t("contentManager.priority"),
                      style: { width: "80px" },
                      field: "priority"
                    }, null, 8, ["header"])) : createCommentVNode("", true),
                    createVNode(_component_Column, {
                      header: _ctx.$t("contentManager.actions"),
                      style: { width: "120px" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("div", { class: "action-buttons" }, [
                          withDirectives(createVNode(_component_Button, {
                            icon: "pi pi-pencil",
                            rounded: "",
                            text: "",
                            size: "small",
                            onClick: ($event) => editItem(data)
                          }, null, 8, ["onClick"]), [
                            [
                              _directive_tooltip,
                              _ctx.$t("contentManager.edit"),
                              void 0,
                              { top: true }
                            ]
                          ]),
                          withDirectives(createVNode(_component_Button, {
                            icon: "pi pi-trash",
                            rounded: "",
                            text: "",
                            severity: "danger",
                            size: "small",
                            onClick: ($event) => confirmDelete(data)
                          }, null, 8, ["onClick"]), [
                            [
                              _directive_tooltip,
                              _ctx.$t("contentManager.delete"),
                              void 0,
                              { top: true }
                            ]
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["header"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DataTable, {
                value: unref(displayItems),
                loading: unref(loading),
                paginator: unref(displayItems).length > 20,
                rows: 20,
                rowsPerPageOptions: [10, 20, 50],
                stripedRows: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_Column, {
                    field: unref(isNewsContent) ? "news_id" : "item_id",
                    header: "ID",
                    style: { width: "60px" }
                  }, null, 8, ["field"]),
                  createVNode(_component_Column, {
                    header: _ctx.$t("contentManager.primaryImage"),
                    style: { width: "100px" }
                  }, {
                    body: withCtx(({ data }) => [
                      data.photo || data.url && unref(contentType) !== unref(ContentType).VIDEO ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `${unref(photoUrl)}${data.photo || data.url}`,
                        alt: data.title,
                        class: "item-thumb"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                    ]),
                    _: 1
                  }, 8, ["header"]),
                  createVNode(_component_Column, {
                    field: "title",
                    header: _ctx.$t("contentManager.contentTitle")
                  }, null, 8, ["header"]),
                  unref(isNewsContent) ? (openBlock(), createBlock(_component_Column, {
                    key: 0,
                    header: _ctx.$t("contentManager.priority"),
                    style: { width: "80px" },
                    field: "priority"
                  }, null, 8, ["header"])) : createCommentVNode("", true),
                  createVNode(_component_Column, {
                    header: _ctx.$t("contentManager.actions"),
                    style: { width: "120px" }
                  }, {
                    body: withCtx(({ data }) => [
                      createVNode("div", { class: "action-buttons" }, [
                        withDirectives(createVNode(_component_Button, {
                          icon: "pi pi-pencil",
                          rounded: "",
                          text: "",
                          size: "small",
                          onClick: ($event) => editItem(data)
                        }, null, 8, ["onClick"]), [
                          [
                            _directive_tooltip,
                            _ctx.$t("contentManager.edit"),
                            void 0,
                            { top: true }
                          ]
                        ]),
                        withDirectives(createVNode(_component_Button, {
                          icon: "pi pi-trash",
                          rounded: "",
                          text: "",
                          severity: "danger",
                          size: "small",
                          onClick: ($event) => confirmDelete(data)
                        }, null, 8, ["onClick"]), [
                          [
                            _directive_tooltip,
                            _ctx.$t("contentManager.delete"),
                            void 0,
                            { top: true }
                          ]
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["header"])
                ]),
                _: 1
              }, 8, ["value", "loading", "paginator"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ConfirmDialog, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/content/[contentId]/items.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const items = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-67abdc25"]]);

export { items as default };
//# sourceMappingURL=items-Dh3isrrh.mjs.map
