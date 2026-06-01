import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { defineComponent, computed, ref, watch, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { C as ContentType } from './content-BKhKEcUD.mjs';
import TinyMCEEditor from '@tinymce/tinymce-vue';
import { u as useContentStore } from './content-DjYBUrus.mjs';
import { u as useDomainStore } from './domain-D7lCra9Q.mjs';
import { u as useAuthStore } from './auth-uqyeD0UG.mjs';
import { u as useMenuStore } from './menu-BITRnhvF.mjs';
import { _ as _export_sfc, k as useI18n, u as useRouter, l as useRoute } from './server.mjs';
import './useApi-C5-eJazW.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const contentStore = useContentStore();
    useDomainStore();
    useAuthStore();
    const menuStore = useMenuStore();
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
      { label: "Map", value: ContentType.MAP }
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
            menu_id: form.value.menu_id
          });
        } else {
          result = await contentStore.updateContent(contentId.value, {
            title: form.value.title,
            description: form.value.description,
            content_type: form.value.content_type,
            lang_id: form.value.lang_id,
            menu_id: form.value.menu_id,
            status: form.value.status
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
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      const _component_Message = resolveComponent("Message");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-81c02979><div class="content-form-page" data-v-81c02979><div class="page-header" data-v-81c02979><h1 class="page-title" data-v-81c02979>${ssrInterpolate(unref(isNewContent) ? _ctx.$t("contentManager.addNew") : _ctx.$t("contentManager.edit"))}</h1><div class="page-actions" data-v-81c02979>`);
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
      _push(`</div></div><div class="form-grid" data-v-81c02979>`);
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
            _push2(`<form class="content-form" data-v-81c02979${_scopeId}><div class="form-group" data-v-81c02979${_scopeId}><label for="title" data-v-81c02979${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.contentTitle"))} *</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "title",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              placeholder: _ctx.$t("contentManager.contentTitle"),
              class: { "p-invalid": unref(errors).title }
            }, null, _parent2, _scopeId));
            if (unref(errors).title) {
              _push2(`<small class="p-error" data-v-81c02979${_scopeId}>${ssrInterpolate(unref(errors).title)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-81c02979${_scopeId}><label for="contentType" data-v-81c02979${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.contentType"))} *</label>`);
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
              _push2(`<small class="p-error" data-v-81c02979${_scopeId}>${ssrInterpolate(unref(errors).content_type)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-81c02979${_scopeId}><label for="description" data-v-81c02979${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.description"))}</label>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-81c02979${_scopeId}><label for="menu" data-v-81c02979${_scopeId}>${ssrInterpolate(_ctx.$t("menuManager.menuName"))} *</label>`);
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
              _push2(`<small class="p-error" data-v-81c02979${_scopeId}>${ssrInterpolate(unref(errors).menu_id)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-81c02979${_scopeId}><label for="status" data-v-81c02979${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.status"))}</label><div class="status-toggle" data-v-81c02979${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ToggleSwitch, {
              id: "status",
              modelValue: unref(form).status,
              "onUpdate:modelValue": (v) => unref(form).status = v,
              trueValue: 1,
              falseValue: 0
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-81c02979${_scopeId}>${ssrInterpolate(unref(form).status ? _ctx.$t("contentManager.published") : _ctx.$t("contentManager.draft"))}</span></div></div>`);
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
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(unref(TinyMCEEditor), {
                        modelValue: unref(form).description,
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        tinymceScriptSrc: "/tinymce/tinymce.min.js",
                        init: {
                          height: 300,
                          menubar: "tools",
                          plugins: "advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste",
                          toolbar: "undo redo | bold italic underline | forecolor backcolor | fontselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | fullscreen",
                          branding: false,
                          promotion: false
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
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
            var _a, _b, _c, _d, _e, _f;
            if (_push2) {
              _push2(`<div class="action-links" data-v-81c02979${_scopeId}>`);
              if (((_a = unref(contentStore).currentContent) == null ? void 0 : _a.content_type) !== unref(ContentType).ARTICLE) {
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
              if (((_b = unref(contentStore).currentContent) == null ? void 0 : _b.content_type) === unref(ContentType).NEWS) {
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
              if (((_c = unref(contentStore).currentContent) == null ? void 0 : _c.content_type) === unref(ContentType).MAP) {
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("contentManager.showMap"),
                  icon: "pi pi-map",
                  outlined: "",
                  onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/map`),
                  class: "w-full"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "action-links" }, [
                  ((_d = unref(contentStore).currentContent) == null ? void 0 : _d.content_type) !== unref(ContentType).ARTICLE ? (openBlock(), createBlock(_component_Button, {
                    key: 0,
                    label: _ctx.$t("contentManager.list"),
                    icon: "pi pi-list",
                    outlined: "",
                    onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/items`),
                    class: "w-full mb-3"
                  }, null, 8, ["label", "onClick"])) : createCommentVNode("", true),
                  ((_e = unref(contentStore).currentContent) == null ? void 0 : _e.content_type) === unref(ContentType).NEWS ? (openBlock(), createBlock(_component_Button, {
                    key: 1,
                    label: _ctx.$t("contentManager.blogNews"),
                    icon: "pi pi-news",
                    outlined: "",
                    onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/news`),
                    class: "w-full mb-3"
                  }, null, 8, ["label", "onClick"])) : createCommentVNode("", true),
                  ((_f = unref(contentStore).currentContent) == null ? void 0 : _f.content_type) === unref(ContentType).MAP ? (openBlock(), createBlock(_component_Button, {
                    key: 2,
                    label: _ctx.$t("contentManager.showMap"),
                    icon: "pi pi-map",
                    outlined: "",
                    onClick: ($event) => _ctx.$router.push(`/admin/content/${unref(contentId)}/map`),
                    class: "w-full"
                  }, null, 8, ["label", "onClick"])) : createCommentVNode("", true)
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-81c02979"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Cx5KgZuJ.mjs.map
