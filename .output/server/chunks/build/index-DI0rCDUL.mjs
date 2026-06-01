import { _ as __nuxt_component_0 } from './nuxt-link-DlwdfiwN.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useDomainStore } from './domain-D7lCra9Q.mjs';
import { u as useAuthStore } from './auth-Bg8VnjAZ.mjs';
import { u as useSetup } from './useSetup-DyrI_Dqo.mjs';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useDomainStore();
    const authStore = useAuthStore();
    const { setupStatus } = useSetup();
    const needsSetup = computed(
      () => authStore.isWebAdmin && setupStatus.value && (!setupStatus.value.hasLanguage || !setupStatus.value.hasMenus || !setupStatus.value.hasContent)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard" }, _attrs))} data-v-aac5b0fc>`);
      if (unref(needsSetup)) {
        _push(`<div class="setup-banner" data-v-aac5b0fc><div class="setup-banner-content" data-v-aac5b0fc><div class="setup-banner-text" data-v-aac5b0fc><i class="pi pi-exclamation-circle" data-v-aac5b0fc></i><span data-v-aac5b0fc>Your website isn&#39;t set up yet. Complete the Quick Setup to get started.</span></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/setup",
          class: "setup-banner-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Quick Setup <i class="pi pi-arrow-right" data-v-aac5b0fc${_scopeId}></i>`);
            } else {
              return [
                createTextVNode(" Quick Setup "),
                createVNode("i", { class: "pi pi-arrow-right" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="panel" data-v-aac5b0fc><div class="panel-header" data-v-aac5b0fc>${ssrInterpolate(_ctx.$t("dashboard.quickActions"))}</div><div class="panel-body" data-v-aac5b0fc>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/ai-chat",
        class: "qbtn-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="qbtn ai-chat-btn" data-v-aac5b0fc${_scopeId}><div class="qbtn-icon" data-v-aac5b0fc${_scopeId}>\u{1F916}</div><div class="qbtn-label" data-v-aac5b0fc${_scopeId}>AI Assistant</div></div>`);
          } else {
            return [
              createVNode("div", { class: "qbtn ai-chat-btn" }, [
                createVNode("div", { class: "qbtn-icon" }, "\u{1F916}"),
                createVNode("div", { class: "qbtn-label" }, "AI Assistant")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(authStore).user) {
        _push(`<!--[-->`);
        if (!unref(authStore).isSuperAdmin) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/settings",
            class: "qbtn-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="qbtn" data-v-aac5b0fc${_scopeId}><div class="qbtn-icon" data-v-aac5b0fc${_scopeId}>\u2699\uFE0F</div><div class="qbtn-label" data-v-aac5b0fc${_scopeId}>${ssrInterpolate(_ctx.$t("dashboard.settings"))}</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "qbtn" }, [
                    createVNode("div", { class: "qbtn-icon" }, "\u2699\uFE0F"),
                    createVNode("div", { class: "qbtn-label" }, toDisplayString(_ctx.$t("dashboard.settings")), 1)
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (!unref(authStore).isSuperAdmin) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/content",
            class: "qbtn-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="qbtn" data-v-aac5b0fc${_scopeId}><div class="qbtn-icon" data-v-aac5b0fc${_scopeId}>\u{1F4DD}</div><div class="qbtn-label" data-v-aac5b0fc${_scopeId}>${ssrInterpolate(_ctx.$t("dashboard.manageContent"))}</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "qbtn" }, [
                    createVNode("div", { class: "qbtn-icon" }, "\u{1F4DD}"),
                    createVNode("div", { class: "qbtn-label" }, toDisplayString(_ctx.$t("dashboard.manageContent")), 1)
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (!unref(authStore).isSuperAdmin) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/media",
            class: "qbtn-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="qbtn" data-v-aac5b0fc${_scopeId}><div class="qbtn-icon" data-v-aac5b0fc${_scopeId}>\u{1F5BC}\uFE0F</div><div class="qbtn-label" data-v-aac5b0fc${_scopeId}>${ssrInterpolate(_ctx.$t("dashboard.uploadMedia"))}</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "qbtn" }, [
                    createVNode("div", { class: "qbtn-icon" }, "\u{1F5BC}\uFE0F"),
                    createVNode("div", { class: "qbtn-label" }, toDisplayString(_ctx.$t("dashboard.uploadMedia")), 1)
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (!unref(authStore).isSuperAdmin && !unref(authStore).isNormalUser) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/users",
            class: "qbtn-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="qbtn" data-v-aac5b0fc${_scopeId}><div class="qbtn-icon" data-v-aac5b0fc${_scopeId}>\u{1F465}</div><div class="qbtn-label" data-v-aac5b0fc${_scopeId}>${ssrInterpolate(_ctx.$t("dashboard.userManagement"))}</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "qbtn" }, [
                    createVNode("div", { class: "qbtn-icon" }, "\u{1F465}"),
                    createVNode("div", { class: "qbtn-label" }, toDisplayString(_ctx.$t("dashboard.userManagement")), 1)
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(authStore).isSuperAdmin) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/super/users",
            class: "qbtn-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="qbtn" data-v-aac5b0fc${_scopeId}><div class="qbtn-icon" data-v-aac5b0fc${_scopeId}>\u{1F465}</div><div class="qbtn-label" data-v-aac5b0fc${_scopeId}>${ssrInterpolate(_ctx.$t("dashboard.userManagement"))}</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "qbtn" }, [
                    createVNode("div", { class: "qbtn-icon" }, "\u{1F465}"),
                    createVNode("div", { class: "qbtn-label" }, toDisplayString(_ctx.$t("dashboard.userManagement")), 1)
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(authStore).isSuperAdmin) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/super/domains",
            class: "qbtn-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="qbtn" data-v-aac5b0fc${_scopeId}><div class="qbtn-icon" data-v-aac5b0fc${_scopeId}>\u{1F310}</div><div class="qbtn-label" data-v-aac5b0fc${_scopeId}>${ssrInterpolate(_ctx.$t("sidebar.domains"))}</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "qbtn" }, [
                    createVNode("div", { class: "qbtn-icon" }, "\u{1F310}"),
                    createVNode("div", { class: "qbtn-label" }, toDisplayString(_ctx.$t("sidebar.domains")), 1)
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(authStore).isSuperAdmin) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/super/announcing",
            class: "qbtn-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="qbtn" data-v-aac5b0fc${_scopeId}><div class="qbtn-icon" data-v-aac5b0fc${_scopeId}>\u{1F4E2}</div><div class="qbtn-label" data-v-aac5b0fc${_scopeId}>${ssrInterpolate(_ctx.$t("sidebar.announce"))}</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "qbtn" }, [
                    createVNode("div", { class: "qbtn-icon" }, "\u{1F4E2}"),
                    createVNode("div", { class: "qbtn-label" }, toDisplayString(_ctx.$t("sidebar.announce")), 1)
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aac5b0fc"]]);

export { index as default };
//# sourceMappingURL=index-DI0rCDUL.mjs.map
