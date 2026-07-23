import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { _ as __nuxt_component_0$1 } from './MediaPicker-8UPlYHHf.mjs';
import { defineComponent, computed, ref, watch, shallowRef, reactive, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, openBlock, createBlock, createCommentVNode, mergeProps, isRef, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, k as useI18n, u as useRouter, l as useRoute, b as useRuntimeConfig } from './server.mjs';
import { C as ContentType } from './content-KJHlnLiT.mjs';
import TinyMCEEditor from '@tinymce/tinymce-vue';
import { u as useContentStore } from './content-CfTGS04A.mjs';
import { u as useDomainStore } from './domain-CCktQG6u.mjs';
import { a as useAuthStore } from './auth-CZZkTxj2.mjs';
import { u as useMenuStore } from './menu-BOTtrAoL.mjs';
import './useUpload-Dxcx6zHS.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BlockWidgetDialog",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    type: {},
    data: {}
  },
  emits: ["update:visible", "save", "delete", "duplicate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const photoUrl = useRuntimeConfig().public.photoUrl || "";
    const local = ref({});
    watch(
      () => props.visible,
      (open) => {
        if (open && props.data) {
          local.value = JSON.parse(JSON.stringify(props.data));
        }
      }
    );
    const dialogHeader = computed(
      () => props.type ? `${t("blockEditor.editWidget")} \u2014 ${t("blockEditor." + props.type)}` : t("blockEditor.editWidget")
    );
    const alignOptions = computed(() => [
      { label: t("blockEditor.left"), value: "left" },
      { label: t("blockEditor.center"), value: "center" },
      { label: t("blockEditor.right"), value: "right" }
    ]);
    const variantOptions = computed(() => [
      { label: t("blockEditor.primary"), value: "primary" },
      { label: t("blockEditor.outline"), value: "outline" }
    ]);
    const checklistStyleOptions = computed(() => [
      { label: t("blockEditor.checkMark"), value: "check" },
      { label: t("blockEditor.crossMark"), value: "cross" }
    ]);
    const dividerStyleOptions = computed(() => [
      { label: t("blockEditor.solid"), value: "solid" },
      { label: t("blockEditor.dashed"), value: "dashed" },
      { label: t("blockEditor.dotted"), value: "dotted" }
    ]);
    const columnsOptions = computed(() => [
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 }
    ]);
    const calloutVariantOptions = computed(() => [
      { label: t("blockEditor.info"), value: "info" },
      { label: t("blockEditor.success"), value: "success" },
      { label: t("blockEditor.warning"), value: "warning" },
      { label: t("blockEditor.danger"), value: "danger" }
    ]);
    const contactTypeOptions = computed(() => [
      { label: t("blockEditor.phone"), value: "phone" },
      { label: t("blockEditor.email"), value: "email" },
      { label: t("blockEditor.address"), value: "address" },
      { label: t("blockEditor.hours"), value: "hours" }
    ]);
    const addItem = () => local.value.items.push({ label: "", checked: false });
    const removeItem = (i) => local.value.items.splice(i, 1);
    const addStat = () => local.value.items.push({ number: "", label: "" });
    const removeStat = (i) => local.value.items.splice(i, 1);
    const addContact = () => local.value.items.push({ type: "phone", value: "" });
    const removeContact = (i) => local.value.items.splice(i, 1);
    const addAccordion = () => local.value.items.push({ q: "", a: "" });
    const removeAccordion = (i) => local.value.items.splice(i, 1);
    const toFileList = (url) => {
      if (!url) return [];
      if (photoUrl && url.startsWith(photoUrl)) return [url.slice(photoUrl.length)];
      return [];
    };
    const fromFileList = (files) => files && files[0] ? photoUrl + files[0] : "";
    const cardImageModel = computed({
      get: () => toFileList(local.value.imageUrl),
      set: (v) => {
        local.value.imageUrl = fromFileList(v);
      }
    });
    const imageBlockModel = computed({
      get: () => toFileList(local.value.url),
      set: (v) => {
        local.value.url = fromFileList(v);
      }
    });
    const quoteAvatarModel = computed({
      get: () => toFileList(local.value.avatarUrl),
      set: (v) => {
        local.value.avatarUrl = fromFileList(v);
      }
    });
    const galleryModel = computed({
      get: () => (local.value.images || []).map((im) => {
        const u = im.url || "";
        return photoUrl && u.startsWith(photoUrl) ? u.slice(photoUrl.length) : u;
      }),
      set: (files) => {
        const prev = new Map(
          (local.value.images || []).map((im) => [im.url, im.alt])
        );
        local.value.images = (files || []).map((f) => {
          const url = photoUrl + f;
          return { url, alt: prev.has(url) ? prev.get(url) : "" };
        });
      }
    });
    const removeGalleryImage = (i) => local.value.images.splice(i, 1);
    const save = () => emit("save", JSON.parse(JSON.stringify(local.value)));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = resolveComponent("Dialog");
      const _component_InputText = resolveComponent("InputText");
      const _component_Textarea = resolveComponent("Textarea");
      const _component_MediaPicker = __nuxt_component_0$1;
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Checkbox = resolveComponent("Checkbox");
      const _component_Button = resolveComponent("Button");
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: __props.visible,
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event),
        header: unref(dialogHeader),
        modal: true,
        style: { width: "640px", maxWidth: "95vw" },
        dismissableMask: false,
        class: "kb-dialog"
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              label: _ctx.$t("blockEditor.duplicate"),
              icon: "pi pi-clone",
              severity: "secondary",
              outlined: "",
              onClick: ($event) => _ctx.$emit("duplicate")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: _ctx.$t("blockEditor.delete"),
              icon: "pi pi-trash",
              severity: "danger",
              outlined: "",
              onClick: ($event) => _ctx.$emit("delete")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: _ctx.$t("common.cancel"),
              icon: "pi pi-times",
              outlined: "",
              onClick: ($event) => _ctx.$emit("update:visible", false)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: _ctx.$t("common.save"),
              icon: "pi pi-check",
              onClick: save
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                label: _ctx.$t("blockEditor.duplicate"),
                icon: "pi pi-clone",
                severity: "secondary",
                outlined: "",
                onClick: ($event) => _ctx.$emit("duplicate")
              }, null, 8, ["label", "onClick"]),
              createVNode(_component_Button, {
                label: _ctx.$t("blockEditor.delete"),
                icon: "pi pi-trash",
                severity: "danger",
                outlined: "",
                onClick: ($event) => _ctx.$emit("delete")
              }, null, 8, ["label", "onClick"]),
              createVNode(_component_Button, {
                label: _ctx.$t("common.cancel"),
                icon: "pi pi-times",
                outlined: "",
                onClick: ($event) => _ctx.$emit("update:visible", false)
              }, null, 8, ["label", "onClick"]),
              createVNode(_component_Button, {
                label: _ctx.$t("common.save"),
                icon: "pi pi-check",
                onClick: save
              }, null, 8, ["label"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.type) {
              _push2(`<div class="kb-dialog-body" data-v-9d63c647${_scopeId}>`);
              if (__props.type === "card") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.title"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).title,
                  "onUpdate:modelValue": ($event) => unref(local).title = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.text"))}</label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  modelValue: unref(local).text,
                  "onUpdate:modelValue": ($event) => unref(local).text = $event,
                  rows: "3",
                  autoResize: ""
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.imageUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).imageUrl,
                  "onUpdate:modelValue": ($event) => unref(local).imageUrl = $event,
                  placeholder: _ctx.$t("blockEditor.imageUrl")
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_MediaPicker, {
                  modelValue: unref(cardImageModel),
                  "onUpdate:modelValue": ($event) => isRef(cardImageModel) ? cardImageModel.value = $event : null,
                  multiple: false
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.altText"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).imageAlt,
                  "onUpdate:modelValue": ($event) => unref(local).imageAlt = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.linkUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).linkUrl,
                  "onUpdate:modelValue": ($event) => unref(local).linkUrl = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.linkLabel"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).linkLabel,
                  "onUpdate:modelValue": ($event) => unref(local).linkLabel = $event
                }, null, _parent2, _scopeId));
                _push2(`</div></div><!--]-->`);
              } else if (__props.type === "checkbox") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.title"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).title,
                  "onUpdate:modelValue": ($event) => unref(local).title = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.style"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).style,
                  "onUpdate:modelValue": ($event) => unref(local).style = $event,
                  options: unref(checklistStyleOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.items"))}</label><div class="kb-items" data-v-9d63c647${_scopeId}><!--[-->`);
                ssrRenderList(unref(local).items, (it, i) => {
                  _push2(`<div class="kb-item" data-v-9d63c647${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Checkbox, {
                    modelValue: it.checked,
                    "onUpdate:modelValue": ($event) => it.checked = $event,
                    binary: true
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_InputText, {
                    modelValue: it.label,
                    "onUpdate:modelValue": ($event) => it.label = $event,
                    placeholder: _ctx.$t("blockEditor.label")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_Button, {
                    icon: "pi pi-times",
                    text: "",
                    severity: "danger",
                    onClick: ($event) => removeItem(i)
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("blockEditor.addItem"),
                  icon: "pi pi-plus",
                  size: "small",
                  outlined: "",
                  onClick: addItem
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "button") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.linkLabel"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).label,
                  "onUpdate:modelValue": ($event) => unref(local).label = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.linkUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).url,
                  "onUpdate:modelValue": ($event) => unref(local).url = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.variant"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).variant,
                  "onUpdate:modelValue": ($event) => unref(local).variant = $event,
                  options: unref(variantOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.align"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).align,
                  "onUpdate:modelValue": ($event) => unref(local).align = $event,
                  options: unref(alignOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div></div><!--]-->`);
              } else if (__props.type === "image") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.imageUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).url,
                  "onUpdate:modelValue": ($event) => unref(local).url = $event,
                  placeholder: _ctx.$t("blockEditor.imageUrl")
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_MediaPicker, {
                  modelValue: unref(imageBlockModel),
                  "onUpdate:modelValue": ($event) => isRef(imageBlockModel) ? imageBlockModel.value = $event : null,
                  multiple: false
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.altText"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).alt,
                  "onUpdate:modelValue": ($event) => unref(local).alt = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.caption"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).caption,
                  "onUpdate:modelValue": ($event) => unref(local).caption = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.width"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).width,
                  "onUpdate:modelValue": ($event) => unref(local).width = $event,
                  placeholder: "100% / 320px"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.align"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).align,
                  "onUpdate:modelValue": ($event) => unref(local).align = $event,
                  options: unref(alignOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div></div><!--]-->`);
              } else if (__props.type === "divider") {
                _push2(`<div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.style"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).style,
                  "onUpdate:modelValue": ($event) => unref(local).style = $event,
                  options: unref(dividerStyleOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else if (__props.type === "columns") {
                _push2(`<!--[--><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.leftCol"))}</label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  modelValue: unref(local).leftHtml,
                  "onUpdate:modelValue": ($event) => unref(local).leftHtml = $event,
                  rows: "5",
                  autoResize: ""
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.rightCol"))}</label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  modelValue: unref(local).rightHtml,
                  "onUpdate:modelValue": ($event) => unref(local).rightHtml = $event,
                  rows: "5",
                  autoResize: ""
                }, null, _parent2, _scopeId));
                _push2(`</div></div><small class="kb-note" data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.columnsHint"))}</small><!--]-->`);
              } else if (__props.type === "spacer") {
                _push2(`<div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.height"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).height,
                  "onUpdate:modelValue": ($event) => unref(local).height = $event,
                  placeholder: "32"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else if (__props.type === "icon") {
                _push2(`<!--[--><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.glyph"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).glyph,
                  "onUpdate:modelValue": ($event) => unref(local).glyph = $event,
                  placeholder: "\u2B50"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.size"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).size,
                  "onUpdate:modelValue": ($event) => unref(local).size = $event,
                  placeholder: "24"
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.label"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).label,
                  "onUpdate:modelValue": ($event) => unref(local).label = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.align"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).align,
                  "onUpdate:modelValue": ($event) => unref(local).align = $event,
                  options: unref(alignOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "stats") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.columns"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).columns,
                  "onUpdate:modelValue": ($event) => unref(local).columns = $event,
                  options: unref(columnsOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.items"))}</label><div class="kb-items" data-v-9d63c647${_scopeId}><!--[-->`);
                ssrRenderList(unref(local).items || [], (it, i) => {
                  _push2(`<div class="kb-item" data-v-9d63c647${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_InputText, {
                    modelValue: it.number,
                    "onUpdate:modelValue": ($event) => it.number = $event,
                    placeholder: _ctx.$t("blockEditor.number")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_InputText, {
                    modelValue: it.label,
                    "onUpdate:modelValue": ($event) => it.label = $event,
                    placeholder: _ctx.$t("blockEditor.label")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_Button, {
                    icon: "pi pi-times",
                    text: "",
                    severity: "danger",
                    onClick: ($event) => removeStat(i)
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("blockEditor.addItem"),
                  icon: "pi pi-plus",
                  size: "small",
                  outlined: "",
                  onClick: addStat
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "callout") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.variant"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).variant,
                  "onUpdate:modelValue": ($event) => unref(local).variant = $event,
                  options: unref(calloutVariantOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.title"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).title,
                  "onUpdate:modelValue": ($event) => unref(local).title = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.text"))}</label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  modelValue: unref(local).text,
                  "onUpdate:modelValue": ($event) => unref(local).text = $event,
                  rows: "3",
                  autoResize: ""
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "contact") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.title"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).title,
                  "onUpdate:modelValue": ($event) => unref(local).title = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.items"))}</label><div class="kb-items" data-v-9d63c647${_scopeId}><!--[-->`);
                ssrRenderList(unref(local).items || [], (it, i) => {
                  _push2(`<div class="kb-item" data-v-9d63c647${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Dropdown, {
                    modelValue: it.type,
                    "onUpdate:modelValue": ($event) => it.type = $event,
                    options: unref(contactTypeOptions),
                    optionLabel: "label",
                    optionValue: "value"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_InputText, {
                    modelValue: it.value,
                    "onUpdate:modelValue": ($event) => it.value = $event,
                    placeholder: _ctx.$t("blockEditor." + it.type)
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_Button, {
                    icon: "pi pi-times",
                    text: "",
                    severity: "danger",
                    onClick: ($event) => removeContact(i)
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("blockEditor.addItem"),
                  icon: "pi pi-plus",
                  size: "small",
                  outlined: "",
                  onClick: addContact
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "gallery") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.imageUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_MediaPicker, {
                  modelValue: unref(galleryModel),
                  "onUpdate:modelValue": ($event) => isRef(galleryModel) ? galleryModel.value = $event : null,
                  multiple: true
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
                if (unref(local).images && unref(local).images.length) {
                  _push2(`<div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.altText"))}</label><div class="kb-items" data-v-9d63c647${_scopeId}><!--[-->`);
                  ssrRenderList(unref(local).images, (im, i) => {
                    _push2(`<div class="kb-item" data-v-9d63c647${_scopeId}>`);
                    if (im.url) {
                      _push2(`<img${ssrRenderAttr("src", im.url)} class="kb-thumb" alt="" data-v-9d63c647${_scopeId}>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(ssrRenderComponent(_component_InputText, {
                      modelValue: im.alt,
                      "onUpdate:modelValue": ($event) => im.alt = $event,
                      placeholder: _ctx.$t("blockEditor.altText")
                    }, null, _parent2, _scopeId));
                    _push2(ssrRenderComponent(_component_Button, {
                      icon: "pi pi-times",
                      text: "",
                      severity: "danger",
                      onClick: ($event) => removeGalleryImage(i)
                    }, null, _parent2, _scopeId));
                    _push2(`</div>`);
                  });
                  _push2(`<!--]--></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.columns"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).columns,
                  "onUpdate:modelValue": ($event) => unref(local).columns = $event,
                  options: unref(columnsOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.caption"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).caption,
                  "onUpdate:modelValue": ($event) => unref(local).caption = $event
                }, null, _parent2, _scopeId));
                _push2(`</div></div><!--]-->`);
              } else if (__props.type === "quote") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.quoteText"))}</label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  modelValue: unref(local).quote,
                  "onUpdate:modelValue": ($event) => unref(local).quote = $event,
                  rows: "3",
                  autoResize: ""
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.author"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).author,
                  "onUpdate:modelValue": ($event) => unref(local).author = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.role"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).role,
                  "onUpdate:modelValue": ($event) => unref(local).role = $event
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.imageUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).avatarUrl,
                  "onUpdate:modelValue": ($event) => unref(local).avatarUrl = $event,
                  placeholder: _ctx.$t("blockEditor.imageUrl")
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_MediaPicker, {
                  modelValue: unref(quoteAvatarModel),
                  "onUpdate:modelValue": ($event) => isRef(quoteAvatarModel) ? quoteAvatarModel.value = $event : null,
                  multiple: false
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "accordion") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label class="kb-checkline" data-v-9d63c647${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Checkbox, {
                  modelValue: unref(local).firstOpen,
                  "onUpdate:modelValue": ($event) => unref(local).firstOpen = $event,
                  binary: true
                }, null, _parent2, _scopeId));
                _push2(`<span data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.firstItemOpen"))}</span></label></div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.items"))}</label><div class="kb-items" data-v-9d63c647${_scopeId}><!--[-->`);
                ssrRenderList(unref(local).items || [], (it, i) => {
                  _push2(`<div class="kb-accordionrow" data-v-9d63c647${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_InputText, {
                    modelValue: it.q,
                    "onUpdate:modelValue": ($event) => it.q = $event,
                    placeholder: _ctx.$t("blockEditor.question")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_Textarea, {
                    modelValue: it.a,
                    "onUpdate:modelValue": ($event) => it.a = $event,
                    rows: "2",
                    autoResize: "",
                    placeholder: _ctx.$t("blockEditor.answer")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_Button, {
                    icon: "pi pi-times",
                    text: "",
                    severity: "danger",
                    onClick: ($event) => removeAccordion(i)
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("blockEditor.addItem"),
                  icon: "pi pi-plus",
                  size: "small",
                  outlined: "",
                  onClick: addAccordion
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "video") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.videoUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).url,
                  "onUpdate:modelValue": ($event) => unref(local).url = $event,
                  placeholder: "https://youtube.com/watch?v=\u2026"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.caption"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).caption,
                  "onUpdate:modelValue": ($event) => unref(local).caption = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><small class="kb-note" data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.videoHint"))}</small><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.type ? (openBlock(), createBlock("div", {
                key: 0,
                class: "kb-dialog-body"
              }, [
                __props.type === "card" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.title")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).title,
                      "onUpdate:modelValue": ($event) => unref(local).title = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.text")), 1),
                    createVNode(_component_Textarea, {
                      modelValue: unref(local).text,
                      "onUpdate:modelValue": ($event) => unref(local).text = $event,
                      rows: "3",
                      autoResize: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.imageUrl")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).imageUrl,
                      "onUpdate:modelValue": ($event) => unref(local).imageUrl = $event,
                      placeholder: _ctx.$t("blockEditor.imageUrl")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                    createVNode(_component_MediaPicker, {
                      modelValue: unref(cardImageModel),
                      "onUpdate:modelValue": ($event) => isRef(cardImageModel) ? cardImageModel.value = $event : null,
                      multiple: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.altText")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).imageAlt,
                      "onUpdate:modelValue": ($event) => unref(local).imageAlt = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.linkUrl")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).linkUrl,
                        "onUpdate:modelValue": ($event) => unref(local).linkUrl = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.linkLabel")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).linkLabel,
                        "onUpdate:modelValue": ($event) => unref(local).linkLabel = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ])
                ], 64)) : __props.type === "checkbox" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.title")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).title,
                      "onUpdate:modelValue": ($event) => unref(local).title = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.style")), 1),
                    createVNode(_component_Dropdown, {
                      modelValue: unref(local).style,
                      "onUpdate:modelValue": ($event) => unref(local).style = $event,
                      options: unref(checklistStyleOptions),
                      optionLabel: "label",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.items")), 1),
                    createVNode("div", { class: "kb-items" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(local).items, (it, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "kb-item"
                        }, [
                          createVNode(_component_Checkbox, {
                            modelValue: it.checked,
                            "onUpdate:modelValue": ($event) => it.checked = $event,
                            binary: true
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_InputText, {
                            modelValue: it.label,
                            "onUpdate:modelValue": ($event) => it.label = $event,
                            placeholder: _ctx.$t("blockEditor.label")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Button, {
                            icon: "pi pi-times",
                            text: "",
                            severity: "danger",
                            onClick: ($event) => removeItem(i)
                          }, null, 8, ["onClick"])
                        ]);
                      }), 128))
                    ]),
                    createVNode(_component_Button, {
                      label: _ctx.$t("blockEditor.addItem"),
                      icon: "pi pi-plus",
                      size: "small",
                      outlined: "",
                      onClick: addItem
                    }, null, 8, ["label"])
                  ])
                ], 64)) : __props.type === "button" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.linkLabel")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).label,
                      "onUpdate:modelValue": ($event) => unref(local).label = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.linkUrl")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).url,
                      "onUpdate:modelValue": ($event) => unref(local).url = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.variant")), 1),
                      createVNode(_component_Dropdown, {
                        modelValue: unref(local).variant,
                        "onUpdate:modelValue": ($event) => unref(local).variant = $event,
                        options: unref(variantOptions),
                        optionLabel: "label",
                        optionValue: "value"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.align")), 1),
                      createVNode(_component_Dropdown, {
                        modelValue: unref(local).align,
                        "onUpdate:modelValue": ($event) => unref(local).align = $event,
                        options: unref(alignOptions),
                        optionLabel: "label",
                        optionValue: "value"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ])
                  ])
                ], 64)) : __props.type === "image" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.imageUrl")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).url,
                      "onUpdate:modelValue": ($event) => unref(local).url = $event,
                      placeholder: _ctx.$t("blockEditor.imageUrl")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                    createVNode(_component_MediaPicker, {
                      modelValue: unref(imageBlockModel),
                      "onUpdate:modelValue": ($event) => isRef(imageBlockModel) ? imageBlockModel.value = $event : null,
                      multiple: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.altText")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).alt,
                      "onUpdate:modelValue": ($event) => unref(local).alt = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.caption")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).caption,
                      "onUpdate:modelValue": ($event) => unref(local).caption = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.width")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).width,
                        "onUpdate:modelValue": ($event) => unref(local).width = $event,
                        placeholder: "100% / 320px"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.align")), 1),
                      createVNode(_component_Dropdown, {
                        modelValue: unref(local).align,
                        "onUpdate:modelValue": ($event) => unref(local).align = $event,
                        options: unref(alignOptions),
                        optionLabel: "label",
                        optionValue: "value"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ])
                  ])
                ], 64)) : __props.type === "divider" ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "kb-field"
                }, [
                  createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.style")), 1),
                  createVNode(_component_Dropdown, {
                    modelValue: unref(local).style,
                    "onUpdate:modelValue": ($event) => unref(local).style = $event,
                    options: unref(dividerStyleOptions),
                    optionLabel: "label",
                    optionValue: "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ])) : __props.type === "columns" ? (openBlock(), createBlock(Fragment, { key: 5 }, [
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.leftCol")), 1),
                      createVNode(_component_Textarea, {
                        modelValue: unref(local).leftHtml,
                        "onUpdate:modelValue": ($event) => unref(local).leftHtml = $event,
                        rows: "5",
                        autoResize: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.rightCol")), 1),
                      createVNode(_component_Textarea, {
                        modelValue: unref(local).rightHtml,
                        "onUpdate:modelValue": ($event) => unref(local).rightHtml = $event,
                        rows: "5",
                        autoResize: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("small", { class: "kb-note" }, toDisplayString(_ctx.$t("blockEditor.columnsHint")), 1)
                ], 64)) : __props.type === "spacer" ? (openBlock(), createBlock("div", {
                  key: 6,
                  class: "kb-field"
                }, [
                  createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.height")), 1),
                  createVNode(_component_InputText, {
                    modelValue: unref(local).height,
                    "onUpdate:modelValue": ($event) => unref(local).height = $event,
                    placeholder: "32"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])) : __props.type === "icon" ? (openBlock(), createBlock(Fragment, { key: 7 }, [
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.glyph")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).glyph,
                        "onUpdate:modelValue": ($event) => unref(local).glyph = $event,
                        placeholder: "\u2B50"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.size")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).size,
                        "onUpdate:modelValue": ($event) => unref(local).size = $event,
                        placeholder: "24"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.label")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).label,
                      "onUpdate:modelValue": ($event) => unref(local).label = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.align")), 1),
                    createVNode(_component_Dropdown, {
                      modelValue: unref(local).align,
                      "onUpdate:modelValue": ($event) => unref(local).align = $event,
                      options: unref(alignOptions),
                      optionLabel: "label",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ])
                ], 64)) : __props.type === "stats" ? (openBlock(), createBlock(Fragment, { key: 8 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.columns")), 1),
                    createVNode(_component_Dropdown, {
                      modelValue: unref(local).columns,
                      "onUpdate:modelValue": ($event) => unref(local).columns = $event,
                      options: unref(columnsOptions),
                      optionLabel: "label",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.items")), 1),
                    createVNode("div", { class: "kb-items" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(local).items || [], (it, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "kb-item"
                        }, [
                          createVNode(_component_InputText, {
                            modelValue: it.number,
                            "onUpdate:modelValue": ($event) => it.number = $event,
                            placeholder: _ctx.$t("blockEditor.number")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_InputText, {
                            modelValue: it.label,
                            "onUpdate:modelValue": ($event) => it.label = $event,
                            placeholder: _ctx.$t("blockEditor.label")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Button, {
                            icon: "pi pi-times",
                            text: "",
                            severity: "danger",
                            onClick: ($event) => removeStat(i)
                          }, null, 8, ["onClick"])
                        ]);
                      }), 128))
                    ]),
                    createVNode(_component_Button, {
                      label: _ctx.$t("blockEditor.addItem"),
                      icon: "pi pi-plus",
                      size: "small",
                      outlined: "",
                      onClick: addStat
                    }, null, 8, ["label"])
                  ])
                ], 64)) : __props.type === "callout" ? (openBlock(), createBlock(Fragment, { key: 9 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.variant")), 1),
                    createVNode(_component_Dropdown, {
                      modelValue: unref(local).variant,
                      "onUpdate:modelValue": ($event) => unref(local).variant = $event,
                      options: unref(calloutVariantOptions),
                      optionLabel: "label",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.title")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).title,
                      "onUpdate:modelValue": ($event) => unref(local).title = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.text")), 1),
                    createVNode(_component_Textarea, {
                      modelValue: unref(local).text,
                      "onUpdate:modelValue": ($event) => unref(local).text = $event,
                      rows: "3",
                      autoResize: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ], 64)) : __props.type === "contact" ? (openBlock(), createBlock(Fragment, { key: 10 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.title")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).title,
                      "onUpdate:modelValue": ($event) => unref(local).title = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.items")), 1),
                    createVNode("div", { class: "kb-items" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(local).items || [], (it, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "kb-item"
                        }, [
                          createVNode(_component_Dropdown, {
                            modelValue: it.type,
                            "onUpdate:modelValue": ($event) => it.type = $event,
                            options: unref(contactTypeOptions),
                            optionLabel: "label",
                            optionValue: "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                          createVNode(_component_InputText, {
                            modelValue: it.value,
                            "onUpdate:modelValue": ($event) => it.value = $event,
                            placeholder: _ctx.$t("blockEditor." + it.type)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Button, {
                            icon: "pi pi-times",
                            text: "",
                            severity: "danger",
                            onClick: ($event) => removeContact(i)
                          }, null, 8, ["onClick"])
                        ]);
                      }), 128))
                    ]),
                    createVNode(_component_Button, {
                      label: _ctx.$t("blockEditor.addItem"),
                      icon: "pi pi-plus",
                      size: "small",
                      outlined: "",
                      onClick: addContact
                    }, null, 8, ["label"])
                  ])
                ], 64)) : __props.type === "gallery" ? (openBlock(), createBlock(Fragment, { key: 11 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.imageUrl")), 1),
                    createVNode(_component_MediaPicker, {
                      modelValue: unref(galleryModel),
                      "onUpdate:modelValue": ($event) => isRef(galleryModel) ? galleryModel.value = $event : null,
                      multiple: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  unref(local).images && unref(local).images.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "kb-field"
                  }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.altText")), 1),
                    createVNode("div", { class: "kb-items" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(local).images, (im, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "kb-item"
                        }, [
                          im.url ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: im.url,
                            class: "kb-thumb",
                            alt: ""
                          }, null, 8, ["src"])) : createCommentVNode("", true),
                          createVNode(_component_InputText, {
                            modelValue: im.alt,
                            "onUpdate:modelValue": ($event) => im.alt = $event,
                            placeholder: _ctx.$t("blockEditor.altText")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Button, {
                            icon: "pi pi-times",
                            text: "",
                            severity: "danger",
                            onClick: ($event) => removeGalleryImage(i)
                          }, null, 8, ["onClick"])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.columns")), 1),
                      createVNode(_component_Dropdown, {
                        modelValue: unref(local).columns,
                        "onUpdate:modelValue": ($event) => unref(local).columns = $event,
                        options: unref(columnsOptions),
                        optionLabel: "label",
                        optionValue: "value"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.caption")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).caption,
                        "onUpdate:modelValue": ($event) => unref(local).caption = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ])
                ], 64)) : __props.type === "quote" ? (openBlock(), createBlock(Fragment, { key: 12 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.quoteText")), 1),
                    createVNode(_component_Textarea, {
                      modelValue: unref(local).quote,
                      "onUpdate:modelValue": ($event) => unref(local).quote = $event,
                      rows: "3",
                      autoResize: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.author")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).author,
                        "onUpdate:modelValue": ($event) => unref(local).author = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.role")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).role,
                        "onUpdate:modelValue": ($event) => unref(local).role = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.imageUrl")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).avatarUrl,
                      "onUpdate:modelValue": ($event) => unref(local).avatarUrl = $event,
                      placeholder: _ctx.$t("blockEditor.imageUrl")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                    createVNode(_component_MediaPicker, {
                      modelValue: unref(quoteAvatarModel),
                      "onUpdate:modelValue": ($event) => isRef(quoteAvatarModel) ? quoteAvatarModel.value = $event : null,
                      multiple: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ], 64)) : __props.type === "accordion" ? (openBlock(), createBlock(Fragment, { key: 13 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", { class: "kb-checkline" }, [
                      createVNode(_component_Checkbox, {
                        modelValue: unref(local).firstOpen,
                        "onUpdate:modelValue": ($event) => unref(local).firstOpen = $event,
                        binary: true
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("span", null, toDisplayString(_ctx.$t("blockEditor.firstItemOpen")), 1)
                    ])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.items")), 1),
                    createVNode("div", { class: "kb-items" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(local).items || [], (it, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "kb-accordionrow"
                        }, [
                          createVNode(_component_InputText, {
                            modelValue: it.q,
                            "onUpdate:modelValue": ($event) => it.q = $event,
                            placeholder: _ctx.$t("blockEditor.question")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Textarea, {
                            modelValue: it.a,
                            "onUpdate:modelValue": ($event) => it.a = $event,
                            rows: "2",
                            autoResize: "",
                            placeholder: _ctx.$t("blockEditor.answer")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Button, {
                            icon: "pi pi-times",
                            text: "",
                            severity: "danger",
                            onClick: ($event) => removeAccordion(i)
                          }, null, 8, ["onClick"])
                        ]);
                      }), 128))
                    ]),
                    createVNode(_component_Button, {
                      label: _ctx.$t("blockEditor.addItem"),
                      icon: "pi pi-plus",
                      size: "small",
                      outlined: "",
                      onClick: addAccordion
                    }, null, 8, ["label"])
                  ])
                ], 64)) : __props.type === "video" ? (openBlock(), createBlock(Fragment, { key: 14 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.videoUrl")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).url,
                      "onUpdate:modelValue": ($event) => unref(local).url = $event,
                      placeholder: "https://youtube.com/watch?v=\u2026"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.caption")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).caption,
                      "onUpdate:modelValue": ($event) => unref(local).caption = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("small", { class: "kb-note" }, toDisplayString(_ctx.$t("blockEditor.videoHint")), 1)
                ], 64)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/blocks/BlockWidgetDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9d63c647"]]);
const KB_WIDGET_TYPES = [
  "card",
  "checkbox",
  "button",
  "image",
  "divider",
  "columns",
  "spacer",
  "icon",
  "stats",
  "callout",
  "contact",
  "gallery",
  "quote",
  "accordion",
  "video"
];
const isKbWidgetType = (v) => typeof v === "string" && KB_WIDGET_TYPES.includes(v);
const defaultData = {
  card: {
    title: "Card title",
    text: "Add a short description for this card.",
    imageUrl: "",
    imageAlt: "",
    linkUrl: "",
    linkLabel: "Learn more"
  },
  checkbox: {
    title: "Checklist",
    items: [
      { label: "First item", checked: true },
      { label: "Second item", checked: false }
    ],
    style: "check"
  },
  button: { label: "Click here", url: "#", variant: "primary", align: "left" },
  image: { url: "", alt: "", caption: "", width: "100%", align: "center" },
  divider: { style: "solid" },
  columns: { leftHtml: "<p>Left column</p>", rightHtml: "<p>Right column</p>" },
  spacer: { height: "32" },
  icon: { glyph: "\u2B50", label: "", size: "24", align: "center" },
  stats: {
    items: [
      { number: "500+", label: "Clients" },
      { number: "10", label: "Years" },
      { number: "24/7", label: "Support" }
    ],
    columns: 3
  },
  callout: { variant: "info", title: "", text: "" },
  contact: {
    title: "",
    items: [
      { type: "phone", value: "" },
      { type: "email", value: "" }
    ]
  },
  gallery: { images: [], columns: 3, caption: "" },
  quote: { quote: "", author: "", role: "", avatarUrl: "" },
  accordion: {
    items: [
      { q: "First question?", a: "Answer here." },
      { q: "Second question?", a: "Answer here." }
    ],
    firstOpen: true
  },
  video: { url: "", caption: "" }
};
function encodePayload(data) {
  const json = JSON.stringify(data);
  if (typeof btoa !== "undefined") {
    return btoa(unescape(encodeURIComponent(json)));
  }
  return Buffer.from(json, "utf-8").toString("base64");
}
function decodePayload(payload) {
  if (!payload) return null;
  try {
    const json = typeof atob !== "undefined" ? decodeURIComponent(escape(atob(payload))) : Buffer.from(payload, "base64").toString("utf-8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}
function esc(value) {
  return String(value != null ? value : "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function cardHtml(d) {
  const img = d.imageUrl ? `<img class="kb-card__img" src="${esc(d.imageUrl)}" alt="${esc(d.imageAlt)}" />` : "";
  const title = d.title ? `<h3 class="kb-card__title">${esc(d.title)}</h3>` : "";
  const text = d.text ? `<div class="kb-card__text">${esc(d.text).replace(/\n/g, "<br/>")}</div>` : "";
  const link = d.linkUrl && d.linkLabel ? `<a class="kb-card__link" href="${esc(d.linkUrl)}">${esc(d.linkLabel)}</a>` : "";
  return `${img}<div class="kb-card__body">${title}${text}${link}</div>`;
}
function checkboxHtml(d) {
  const title = d.title ? `<h4 class="kb-checklist__title">${esc(d.title)}</h4>` : "";
  const markClass = d.style === "cross" ? "kb-checklist__mark--cross" : "kb-checklist__mark--check";
  const items = (d.items || []).map((it) => {
    const on = it.checked ? " kb-checklist__item--on" : "";
    return `<li class="kb-checklist__item${on}"><span class="kb-checklist__mark ${markClass}"></span><span class="kb-checklist__label">${esc(
      it.label
    )}</span></li>`;
  }).join("");
  return `${title}<ul class="kb-checklist">${items}</ul>`;
}
function buttonHtml(d) {
  return `<div class="kb-button-wrap" style="text-align:${esc(
    d.align
  )}"><a class="kb-button kb-button--${esc(d.variant)}" href="${esc(
    d.url || "#"
  )}">${esc(d.label)}</a></div>`;
}
function imageHtml(d) {
  if (!d.url) return `<div class="kb-image kb-image--empty">No image selected</div>`;
  const cap = d.caption ? `<figcaption class="kb-image__caption">${esc(d.caption)}</figcaption>` : "";
  return `<figure class="kb-image" style="max-width:${esc(
    d.width
  )};text-align:${esc(d.align)}"><img src="${esc(d.url)}" alt="${esc(
    d.alt
  )}" />${cap}</figure>`;
}
function dividerHtml(d) {
  return `<hr class="kb-divider kb-divider--${esc(d.style)}" />`;
}
function columnsHtml(d) {
  return `<div class="kb-columns"><div class="kb-col">${d.leftHtml || ""}</div><div class="kb-col">${d.rightHtml || ""}</div></div>`;
}
function spacerHtml(d) {
  const h = parseInt(String(d.height), 10);
  const px = Number.isFinite(h) && h > 0 ? h : 32;
  return `<div class="kb-spacer" style="height:${px}px"></div>`;
}
function iconHtml(d) {
  const s = parseInt(String(d.size), 10);
  const px = Number.isFinite(s) && s > 0 ? s : 24;
  const glyph = `<span class="kb-icon__glyph" style="font-size:${px}px">${esc(d.glyph)}</span>`;
  const label = d.label ? `<span class="kb-icon__label">${esc(d.label)}</span>` : "";
  return `<div class="kb-icon" style="text-align:${esc(d.align)}">${glyph}${label}</div>`;
}
function statsHtml(d) {
  const c = Number(d.columns);
  const cols = [2, 3, 4].includes(c) ? c : 3;
  const items = (d.items || []).filter((it) => it.number || it.label).map(
    (it) => `<div class="kb-stats__item"><span class="kb-stats__num">${esc(
      it.number
    )}</span><span class="kb-stats__label">${esc(it.label)}</span></div>`
  ).join("");
  return `<div class="kb-stats" style="--kb-cols:${cols}">${items}</div>`;
}
function calloutHtml(d) {
  const variant = ["info", "success", "warning", "danger"].includes(d.variant) ? d.variant : "info";
  const title = d.title ? `<h4 class="kb-callout__title">${esc(d.title)}</h4>` : "";
  const text = d.text ? `<div class="kb-callout__text">${esc(d.text).replace(/\n/g, "<br/>")}</div>` : "";
  return `<div class="kb-callout kb-callout--${variant}">${title}${text}</div>`;
}
const contactIcon = {
  phone: "\u{1F4DE}",
  email: "\u{1F4E7}",
  address: "\u{1F4CD}",
  hours: "\u{1F552}"
};
function contactHtml(d) {
  const title = d.title ? `<h4 class="kb-contact__title">${esc(d.title)}</h4>` : "";
  const items = (d.items || []).filter((it) => it.value).map((it) => {
    const ic = contactIcon[it.type] || "\u2022";
    const value = it.type === "phone" ? `<a class="kb-contact__value" href="tel:${esc(it.value)}">${esc(it.value)}</a>` : it.type === "email" ? `<a class="kb-contact__value" href="mailto:${esc(it.value)}">${esc(it.value)}</a>` : `<span class="kb-contact__value">${esc(it.value)}</span>`;
    return `<li class="kb-contact__item"><span class="kb-contact__icon">${ic}</span>${value}</li>`;
  }).join("");
  if (!items) return title;
  return `${title}<ul class="kb-contact">${items}</ul>`;
}
function galleryHtml(d) {
  const c = Number(d.columns);
  const cols = [2, 3, 4].includes(c) ? c : 3;
  const imgs = (d.images || []).filter((im) => im.url).map(
    (im) => `<div class="kb-gallery__cell"><img src="${esc(im.url)}" alt="${esc(
      im.alt
    )}" /></div>`
  ).join("");
  if (!imgs) return `<div class="kb-gallery kb-gallery--empty">No images selected</div>`;
  const cap = d.caption ? `<figcaption class="kb-gallery__caption">${esc(d.caption)}</figcaption>` : "";
  return `<figure class="kb-gallery"><div class="kb-gallery__grid" style="--kb-cols:${cols}">${imgs}</div>${cap}</figure>`;
}
function quoteHtml(d) {
  const quote = d.quote ? `<blockquote class="kb-quote__text">${esc(d.quote).replace(/\n/g, "<br/>")}</blockquote>` : "";
  const avatar = d.avatarUrl ? `<img class="kb-quote__avatar" src="${esc(d.avatarUrl)}" alt="${esc(d.author)}" />` : "";
  const author = d.author ? `<span class="kb-quote__author">${esc(d.author)}</span>` : "";
  const role = d.role ? `<span class="kb-quote__role">${esc(d.role)}</span>` : "";
  const meta = avatar || author || role ? `<figcaption class="kb-quote__meta">${avatar}${author}${role}</figcaption>` : "";
  return `<figure class="kb-quote">${quote}${meta}</figure>`;
}
function accordionHtml(d) {
  const items = (d.items || []).filter((it) => it.q || it.a).map((it, i) => {
    const open = d.firstOpen && i === 0 ? " open" : "";
    return `<details class="kb-accordion__item"${open}><summary class="kb-accordion__q">${esc(
      it.q
    )}</summary><div class="kb-accordion__a">${esc(it.a).replace(/\n/g, "<br/>")}</div></details>`;
  }).join("");
  return `<div class="kb-accordion">${items}</div>`;
}
function toEmbedUrl(url) {
  const u = String(url || "").trim();
  if (!u) return "";
  const yt = u.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return u;
}
function isVideoFile(url) {
  return /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(String(url || ""));
}
function videoHtml(d) {
  const url = String(d.url || "").trim();
  if (!url) return `<div class="kb-video kb-video--empty">No video URL</div>`;
  const cap = d.caption ? `<figcaption class="kb-video__caption">${esc(d.caption)}</figcaption>` : "";
  const media = isVideoFile(url) ? `<div class="kb-video__frame"><video src="${esc(url)}" controls preload="metadata"></video></div>` : `<div class="kb-video__frame"><iframe src="${esc(
    toEmbedUrl(url)
  )}" title="${esc(d.caption || "Video")}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  return `<figure class="kb-video">${media}${cap}</figure>`;
}
function previewHtml(type, data) {
  switch (type) {
    case "card":
      return cardHtml(data);
    case "checkbox":
      return checkboxHtml(data);
    case "button":
      return buttonHtml(data);
    case "image":
      return imageHtml(data);
    case "divider":
      return dividerHtml(data);
    case "columns":
      return columnsHtml(data);
    case "spacer":
      return spacerHtml(data);
    case "icon":
      return iconHtml(data);
    case "stats":
      return statsHtml(data);
    case "callout":
      return calloutHtml(data);
    case "contact":
      return contactHtml(data);
    case "gallery":
      return galleryHtml(data);
    case "quote":
      return quoteHtml(data);
    case "accordion":
      return accordionHtml(data);
    case "video":
      return videoHtml(data);
    default:
      return "";
  }
}
function createWidgetHtml(type, data) {
  const payload = encodePayload(defaultData[type]);
  const inner = previewHtml(type, defaultData[type]);
  return `<div class="kb-widget kb-${type} mceNonEditable" contenteditable="false" data-kb-type="${type}" data-kb-payload="${payload}">${inner}</div>`;
}
function readWidget(node) {
  if (!node) return null;
  let el = null;
  if (node.closest && typeof node.closest === "function") {
    el = node.closest(".kb-widget");
  } else if (node.nodeType === 1) {
    el = node.classList && node.classList.contains("kb-widget") ? node : null;
  }
  if (!el) return null;
  const type = el.getAttribute("data-kb-type");
  if (!isKbWidgetType(type)) return null;
  const data = decodePayload(el.getAttribute("data-kb-payload") || "") || {
    ...defaultData[type]
  };
  return { type, data };
}
const KB_DRAG_PREFIX = "kb:";
function parseDragMarker(value) {
  if (typeof value !== "string" || !value.startsWith(KB_DRAG_PREFIX)) return null;
  const type = value.slice(KB_DRAG_PREFIX.length);
  return isKbWidgetType(type) ? type : null;
}
let __dragType = null;
const setKbDrag = (type) => {
  __dragType = type;
};
const getKbDrag = () => __dragType;
const blocksCss = '/* Global styles for low-code widgets (`.kb-*`).\n   Loaded globally so it applies to:\n   - the TinyMCE editor (admin)\n   - public `v-html` rendering of the article description\n*/\n\n/* Widgets have no special chrome here. The dashed "click to edit" chrome is\n   injected into the TinyMCE iframe only (via content_style in\n   pages/admin/content/[id].vue), so it never appears on the public site even\n   though the stored markup keeps the `mceNonEditable` class. */\n.kb-widget {\n  margin: 16px 0;\n}\n\n/* ---------- Card ---------- */\n.kb-card {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  background: #fff;\n}\n.kb-card__img {\n  width: 100%;\n  max-height: 260px;\n  object-fit: cover;\n  display: block;\n}\n.kb-card__body {\n  padding: 14px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.kb-card__title {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #111827;\n}\n.kb-card__text {\n  color: #374151;\n  font-size: 0.95rem;\n  line-height: 1.5;\n}\n.kb-card__link {\n  align-self: flex-start;\n  color: #2563eb;\n  font-weight: 600;\n  text-decoration: none;\n}\n.kb-card__link:hover {\n  text-decoration: underline;\n}\n\n/* ---------- Checklist ---------- */\n.kb-checklist {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.kb-checklist__title {\n  margin: 0 0 4px;\n  font-size: 1rem;\n  font-weight: 700;\n  color: #111827;\n}\n.kb-checklist__item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 0.95rem;\n  color: #374151;\n}\n.kb-checklist__mark {\n  flex: none;\n  width: 20px;\n  height: 20px;\n  border-radius: 5px;\n  border: 2px solid #d1d5db;\n  background: #fff;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  line-height: 1;\n  color: #fff;\n}\n.kb-checklist__item--on .kb-checklist__mark {\n  background: #16a34a;\n  border-color: #16a34a;\n}\n.kb-checklist__mark--cross.kb-checklist__mark,\n.kb-checklist__item--on .kb-checklist__mark--cross {\n  background: #dc2626;\n  border-color: #dc2626;\n}\n.kb-checklist__item--on .kb-checklist__mark--check::before {\n  content: "\u2713";\n}\n.kb-checklist__item--on .kb-checklist__mark--cross::before {\n  content: "\u2715";\n}\n\n/* ---------- Button ---------- */\n.kb-button-wrap {\n  margin: 4px 0;\n}\n.kb-button {\n  display: inline-block;\n  padding: 9px 18px;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.95rem;\n  text-decoration: none;\n  cursor: pointer;\n}\n.kb-button--primary {\n  background: #2563eb;\n  color: #fff;\n  border: 1px solid #2563eb;\n}\n.kb-button--primary:hover {\n  background: #1d4ed8;\n}\n.kb-button--outline {\n  background: transparent;\n  color: #2563eb;\n  border: 1px solid #2563eb;\n}\n.kb-button--outline:hover {\n  background: #eff6ff;\n}\n\n/* ---------- Image ---------- */\n.kb-image {\n  margin: 0;\n  display: block;\n}\n.kb-image img {\n  max-width: 100%;\n  height: auto;\n  display: block;\n  margin: 0 auto;\n}\n.kb-image__caption {\n  margin-top: 6px;\n  text-align: center;\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.kb-image--empty {\n  padding: 24px;\n  text-align: center;\n  color: #9ca3af;\n  border: 1px dashed #d1d5db;\n  border-radius: 8px;\n  background: #f9fafb;\n}\n\n/* ---------- Divider ---------- */\n.kb-divider {\n  border: 0;\n  height: 0;\n  margin: 18px 0;\n}\n.kb-divider--solid {\n  border-top: 2px solid #e5e7eb;\n}\n.kb-divider--dashed {\n  border-top: 2px dashed #e5e7eb;\n}\n.kb-divider--dotted {\n  border-top: 3px dotted #e5e7eb;\n}\n\n/* ---------- Columns ---------- */\n.kb-columns {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n.kb-columns .kb-col {\n  min-width: 0;\n}\n.kb-columns .kb-col > :last-child {\n  margin-bottom: 0;\n}\n@media (max-width: 640px) {\n  .kb-columns {\n    grid-template-columns: 1fr;\n  }\n}\n\n/* ---------- Spacer ---------- */\n.kb-spacer {\n  width: 100%;\n}\n\n/* ---------- Icon ---------- */\n.kb-icon {\n  margin: 8px 0;\n  line-height: 1;\n}\n.kb-icon__glyph {\n  display: inline-block;\n  vertical-align: middle;\n}\n.kb-icon__label {\n  margin-left: 8px;\n  vertical-align: middle;\n  font-size: 1rem;\n  color: #374151;\n}\n\n/* ---------- Stats ---------- */\n.kb-stats {\n  display: grid;\n  grid-template-columns: repeat(var(--kb-cols, 3), 1fr);\n  gap: 16px;\n  margin: 8px 0;\n}\n.kb-stats__item {\n  text-align: center;\n  padding: 12px 8px;\n}\n.kb-stats__num {\n  display: block;\n  font-size: 1.8rem;\n  font-weight: 800;\n  color: #111827;\n  line-height: 1.1;\n}\n.kb-stats__label {\n  display: block;\n  margin-top: 4px;\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n@media (max-width: 640px) {\n  .kb-stats {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n\n/* ---------- Callout ---------- */\n.kb-callout {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 12px 16px;\n  border-radius: 8px;\n  border-left: 4px solid;\n  margin: 8px 0;\n}\n.kb-callout__title {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 700;\n}\n.kb-callout__text {\n  font-size: 0.92rem;\n  line-height: 1.5;\n  margin: 0;\n}\n.kb-callout--info {\n  background: #eff6ff;\n  border-color: #3b82f6;\n  color: #1e3a8a;\n}\n.kb-callout--success {\n  background: #ecfdf5;\n  border-color: #16a34a;\n  color: #14532d;\n}\n.kb-callout--warning {\n  background: #fffbeb;\n  border-color: #f59e0b;\n  color: #78350f;\n}\n.kb-callout--danger {\n  background: #fef2f2;\n  border-color: #dc2626;\n  color: #7f1d1d;\n}\n\n/* ---------- Contact ---------- */\n.kb-contact__title {\n  margin: 0 0 8px;\n  font-size: 1rem;\n  font-weight: 700;\n  color: #111827;\n}\n.kb-contact {\n  list-style: none;\n  margin: 8px 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.kb-contact__item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 0.95rem;\n  color: #374151;\n}\n.kb-contact__icon {\n  flex: none;\n  width: 22px;\n  text-align: center;\n  font-size: 1rem;\n}\n.kb-contact__value {\n  color: #374151;\n  text-decoration: none;\n}\na.kb-contact__value:hover {\n  text-decoration: underline;\n}\n\n/* ---------- Gallery ---------- */\n.kb-gallery {\n  margin: 8px 0;\n}\n.kb-gallery__grid {\n  display: grid;\n  grid-template-columns: repeat(var(--kb-cols, 3), 1fr);\n  gap: 10px;\n}\n.kb-gallery__cell {\n  overflow: hidden;\n  border-radius: 8px;\n}\n.kb-gallery__cell img {\n  width: 100%;\n  height: 100%;\n  min-height: 120px;\n  object-fit: cover;\n  display: block;\n}\n.kb-gallery__caption {\n  margin-top: 6px;\n  text-align: center;\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.kb-gallery--empty {\n  padding: 24px;\n  text-align: center;\n  color: #9ca3af;\n  border: 1px dashed #d1d5db;\n  border-radius: 8px;\n  background: #f9fafb;\n}\n@media (max-width: 640px) {\n  .kb-gallery__grid {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n\n/* ---------- Quote ---------- */\n.kb-quote {\n  margin: 8px 0;\n  padding: 0;\n}\n.kb-quote__text {\n  margin: 0;\n  font-size: 1.1rem;\n  font-style: italic;\n  color: #374151;\n  line-height: 1.6;\n  border-left: 3px solid #cbd5e1;\n  padding-left: 14px;\n}\n.kb-quote__meta {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 12px;\n}\n.kb-quote__avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex: none;\n}\n.kb-quote__author {\n  font-weight: 700;\n  color: #111827;\n}\n.kb-quote__role {\n  color: #6b7280;\n  font-size: 0.85rem;\n}\n.kb-quote__author + .kb-quote__role::before {\n  content: "\xB7";\n  margin: 0 6px;\n  color: #9ca3af;\n}\n\n/* ---------- Accordion ---------- */\n.kb-accordion {\n  margin: 8px 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.kb-accordion__item {\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.kb-accordion__q {\n  cursor: pointer;\n  padding: 12px 14px;\n  font-weight: 600;\n  color: #111827;\n  list-style: none;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.kb-accordion__q::-webkit-details-marker {\n  display: none;\n}\n.kb-accordion__q::after {\n  content: "\u25BE";\n  color: #9ca3af;\n  transition: transform 0.2s;\n}\n.kb-accordion__item[open] .kb-accordion__q::after {\n  transform: rotate(180deg);\n}\n.kb-accordion__a {\n  padding: 0 14px 14px;\n  color: #374151;\n  font-size: 0.95rem;\n  line-height: 1.5;\n}\n\n/* ---------- Video ---------- */\n.kb-video {\n  margin: 8px 0;\n}\n.kb-video__frame {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.kb-video__frame iframe,\n.kb-video__frame video {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n.kb-video__caption {\n  margin-top: 6px;\n  text-align: center;\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.kb-video--empty {\n  padding: 24px;\n  text-align: center;\n  color: #9ca3af;\n  border: 1px dashed #d1d5db;\n  border-radius: 8px;\n  background: #f9fafb;\n}\n';
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
    useDomainStore();
    useAuthStore();
    const menuStore = useMenuStore();
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
    const menuOptions = computed(() => {
      const flatten = (items, prefix = "") => {
        var _a;
        const result = [];
        for (const item of items) {
          const label = prefix + (item.item_name || "");
          result.push({ item_id: item.item_id, item_name: label, lang_id: item.lang_id });
          if ((_a = item.children) == null ? void 0 : _a.length) {
            result.push(...flatten(item.children, label + " \u2192 "));
          }
        }
        return result;
      };
      return flatten([...menuStore.menuTree]);
    });
    watch(() => form.value.menu_id, (menuId) => {
      if (menuId == null) return;
      const selected = menuOptions.value.find((opt) => opt.item_id === menuId);
      if (selected == null ? void 0 : selected.lang_id) {
        form.value.lang_id = selected.lang_id;
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
      console.log("Saving content with form data:", form.value);
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-19b8794e><div class="content-form-page" data-v-19b8794e><div class="page-header" data-v-19b8794e><h1 class="page-title" data-v-19b8794e>${ssrInterpolate(unref(isNewContent) ? _ctx.$t("contentManager.addNew") : _ctx.$t("contentManager.edit"))}</h1><div class="page-actions" data-v-19b8794e>`);
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
      _push(`</div></div><div class="form-grid" data-v-19b8794e>`);
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
            _push2(`<form class="content-form" data-v-19b8794e${_scopeId}><div class="form-group" data-v-19b8794e${_scopeId}><label for="title" data-v-19b8794e${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.contentTitle"))} *</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "title",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              placeholder: _ctx.$t("contentManager.contentTitle"),
              class: { "p-invalid": unref(errors).title }
            }, null, _parent2, _scopeId));
            if (unref(errors).title) {
              _push2(`<small class="p-error" data-v-19b8794e${_scopeId}>${ssrInterpolate(unref(errors).title)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-19b8794e${_scopeId}><label for="contentType" data-v-19b8794e${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.contentType"))} *</label>`);
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
              _push2(`<small class="p-error" data-v-19b8794e${_scopeId}>${ssrInterpolate(unref(errors).content_type)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-19b8794e${_scopeId}><label for="description" data-v-19b8794e${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.description"))}</label><div class="description-editor" style="${ssrRenderStyle({ "display": "block" })}" data-v-19b8794e${_scopeId}>`);
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
            _push2(`</div><div class="form-group" data-v-19b8794e${_scopeId}><label for="menu" data-v-19b8794e${_scopeId}>${ssrInterpolate(_ctx.$t("menuManager.menuName"))} *</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              id: "menu",
              modelValue: unref(form).menu_id,
              "onUpdate:modelValue": ($event) => unref(form).menu_id = $event,
              options: unref(menuOptions),
              optionLabel: "item_name",
              optionValue: "item_id",
              placeholder: _ctx.$t("menuManager.selectMenu"),
              class: { "p-invalid": unref(errors).menu_id },
              showClear: ""
            }, null, _parent2, _scopeId));
            if (unref(errors).menu_id) {
              _push2(`<small class="p-error" data-v-19b8794e${_scopeId}>${ssrInterpolate(unref(errors).menu_id)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-19b8794e${_scopeId}><label for="status" data-v-19b8794e${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.status"))}</label><div class="status-toggle" data-v-19b8794e${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ToggleSwitch, {
              id: "status",
              modelValue: unref(form).status,
              "onUpdate:modelValue": (v) => unref(form).status = v,
              trueValue: 1,
              falseValue: 0
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-19b8794e${_scopeId}>${ssrInterpolate(unref(form).status ? _ctx.$t("contentManager.published") : _ctx.$t("contentManager.draft"))}</span></div></div>`);
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
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "menu" }, toDisplayString(_ctx.$t("menuManager.menuName")) + " *", 1),
                  createVNode(_component_Dropdown, {
                    id: "menu",
                    modelValue: unref(form).menu_id,
                    "onUpdate:modelValue": ($event) => unref(form).menu_id = $event,
                    options: unref(menuOptions),
                    optionLabel: "item_name",
                    optionValue: "item_id",
                    placeholder: _ctx.$t("menuManager.selectMenu"),
                    class: { "p-invalid": unref(errors).menu_id },
                    showClear: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder", "class"]),
                  unref(errors).menu_id ? (openBlock(), createBlock("small", {
                    key: 0,
                    class: "p-error"
                  }, toDisplayString(unref(errors).menu_id), 1)) : createCommentVNode("", true)
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
              _push2(`<div class="action-links" data-v-19b8794e${_scopeId}>`);
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-19b8794e"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-C13f4Spd.mjs.map
