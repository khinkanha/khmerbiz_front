import { _ as _export_sfc, l as useRoute, k as useI18n, n as navigateTo } from './server.mjs';
import { defineComponent, ref, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, withModifiers, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useMenuStore } from './menu-BITRnhvF.mjs';
import { u as useDomainStore } from './domain-Czi-n-j4.mjs';
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
import './useApi-C5-eJazW.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const menuStore = useMenuStore();
    const domainStore = useDomainStore();
    const { t } = useI18n();
    const menuItem = ref(null);
    const loading = ref(true);
    const saving = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    const form = ref({
      item_name: "",
      lang_id: 0,
      parent_id: 0,
      item_order: 0
    });
    const languageOptions = computed(() => domainStore.languages);
    const parentOptions = computed(() => {
      const options = [{ label: "Root", value: 0 }];
      const currentId = Number(route.params.id);
      const flatten = (items, depth = 0) => {
        var _a;
        for (const item of items) {
          if (item.item_id !== currentId && item.item_name) {
            const prefix = "\xA0\xA0".repeat(depth);
            options.push({ label: `${prefix}\u21B3 ${item.item_name}`, value: item.item_id });
          }
          if ((_a = item.children) == null ? void 0 : _a.length) {
            flatten(item.children, depth + 1);
          }
        }
      };
      flatten([...menuStore.menuTree]);
      return options;
    });
    const handleSave = async () => {
      successMessage.value = "";
      errorMessage.value = "";
      if (!form.value.item_name) return;
      saving.value = true;
      try {
        const success = await menuStore.updateMenuItem(Number(route.params.id), {
          item_name: form.value.item_name,
          lang_id: form.value.lang_id,
          parent_id: form.value.parent_id,
          item_order: form.value.item_order
        });
        if (success) {
          successMessage.value = t("common.success");
          setTimeout(() => {
            successMessage.value = "";
          }, 3e3);
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
      const _component_Message = resolveComponent("Message");
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "menu-edit-page" }, _attrs))} data-v-452129e9><div class="page-header" data-v-452129e9><div class="header-left" data-v-452129e9>`);
      _push(ssrRenderComponent(_component_Button, {
        icon: "pi pi-arrow-left",
        text: "",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/admin/menu")
      }, null, _parent));
      _push(`<h1 class="page-title" data-v-452129e9>${ssrInterpolate(_ctx.$t("menuManager.edit"))}</h1></div></div>`);
      if (unref(menuItem)) {
        _push(ssrRenderComponent(_component_Card, { class: "settings-card" }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<form class="menu-form" data-v-452129e9${_scopeId}><div class="form-group" data-v-452129e9${_scopeId}><label for="menuName" data-v-452129e9${_scopeId}>${ssrInterpolate(_ctx.$t("menuManager.menuName"))}</label>`);
              _push2(ssrRenderComponent(_component_InputText, {
                id: "menuName",
                modelValue: unref(form).item_name,
                "onUpdate:modelValue": ($event) => unref(form).item_name = $event,
                placeholder: _ctx.$t("menuManager.menuName"),
                class: "full-width"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="form-row" data-v-452129e9${_scopeId}><div class="form-group flex-1" data-v-452129e9${_scopeId}><label for="menuLanguage" data-v-452129e9${_scopeId}>${ssrInterpolate(_ctx.$t("menuManager.language"))}</label>`);
              _push2(ssrRenderComponent(_component_Dropdown, {
                id: "menuLanguage",
                modelValue: unref(form).lang_id,
                "onUpdate:modelValue": ($event) => unref(form).lang_id = $event,
                options: unref(languageOptions),
                optionLabel: "lang_name",
                optionValue: "lang_id",
                placeholder: _ctx.$t("menuManager.language"),
                class: "full-width"
              }, {
                option: withCtx(({ option }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="lang-option" data-v-452129e9${_scopeId2}><img${ssrRenderAttr("src", `/flag/${option.flag_icon}`)} class="flag-icon-sm" data-v-452129e9${_scopeId2}><span data-v-452129e9${_scopeId2}>${ssrInterpolate(option.lang_name)}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "lang-option" }, [
                        createVNode("img", {
                          src: `/flag/${option.flag_icon}`,
                          class: "flag-icon-sm"
                        }, null, 8, ["src"]),
                        createVNode("span", null, toDisplayString(option.lang_name), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="form-group flex-1" data-v-452129e9${_scopeId}><label for="menuParent" data-v-452129e9${_scopeId}>${ssrInterpolate(_ctx.$t("menuManager.parentMenu"))}</label>`);
              _push2(ssrRenderComponent(_component_Dropdown, {
                id: "menuParent",
                modelValue: unref(form).parent_id,
                "onUpdate:modelValue": ($event) => unref(form).parent_id = $event,
                options: unref(parentOptions),
                optionLabel: "label",
                optionValue: "value",
                placeholder: _ctx.$t("menuManager.parentMenu"),
                class: "full-width"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="form-actions" data-v-452129e9${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, {
                type: "submit",
                label: _ctx.$t("common.save"),
                loading: unref(saving)
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (unref(successMessage)) {
                _push2(ssrRenderComponent(_component_Message, {
                  severity: "success",
                  closable: false
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(successMessage))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(successMessage)), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
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
                  class: "menu-form"
                }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "menuName" }, toDisplayString(_ctx.$t("menuManager.menuName")), 1),
                    createVNode(_component_InputText, {
                      id: "menuName",
                      modelValue: unref(form).item_name,
                      "onUpdate:modelValue": ($event) => unref(form).item_name = $event,
                      placeholder: _ctx.$t("menuManager.menuName"),
                      class: "full-width"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  createVNode("div", { class: "form-row" }, [
                    createVNode("div", { class: "form-group flex-1" }, [
                      createVNode("label", { for: "menuLanguage" }, toDisplayString(_ctx.$t("menuManager.language")), 1),
                      createVNode(_component_Dropdown, {
                        id: "menuLanguage",
                        modelValue: unref(form).lang_id,
                        "onUpdate:modelValue": ($event) => unref(form).lang_id = $event,
                        options: unref(languageOptions),
                        optionLabel: "lang_name",
                        optionValue: "lang_id",
                        placeholder: _ctx.$t("menuManager.language"),
                        class: "full-width"
                      }, {
                        option: withCtx(({ option }) => [
                          createVNode("div", { class: "lang-option" }, [
                            createVNode("img", {
                              src: `/flag/${option.flag_icon}`,
                              class: "flag-icon-sm"
                            }, null, 8, ["src"]),
                            createVNode("span", null, toDisplayString(option.lang_name), 1)
                          ])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"])
                    ]),
                    createVNode("div", { class: "form-group flex-1" }, [
                      createVNode("label", { for: "menuParent" }, toDisplayString(_ctx.$t("menuManager.parentMenu")), 1),
                      createVNode(_component_Dropdown, {
                        id: "menuParent",
                        modelValue: unref(form).parent_id,
                        "onUpdate:modelValue": ($event) => unref(form).parent_id = $event,
                        options: unref(parentOptions),
                        optionLabel: "label",
                        optionValue: "value",
                        placeholder: _ctx.$t("menuManager.parentMenu"),
                        class: "full-width"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"])
                    ])
                  ]),
                  createVNode("div", { class: "form-actions" }, [
                    createVNode(_component_Button, {
                      type: "submit",
                      label: _ctx.$t("common.save"),
                      loading: unref(saving)
                    }, null, 8, ["label", "loading"])
                  ]),
                  unref(successMessage) ? (openBlock(), createBlock(_component_Message, {
                    key: 0,
                    severity: "success",
                    closable: false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(successMessage)), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(errorMessage) ? (openBlock(), createBlock(_component_Message, {
                    key: 1,
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
      } else if (unref(loading)) {
        _push(`<div class="loading-state" data-v-452129e9>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/menu/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-452129e9"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BUl17xeD.mjs.map
