import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-DlwdfiwN.mjs';
import { defineComponent, resolveComponent, mergeProps, computed, ref, unref, withCtx, createTextVNode, toDisplayString, createVNode, provide, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-Ca917lIc.mjs';
import { u as useSetup } from './useSetup-DyrI_Dqo.mjs';
import { _ as _export_sfc, u as useRouter, l as useRoute, k as useI18n } from './server.mjs';
import { u as useDomainStore } from './domain-D7lCra9Q.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './useApi-C5-eJazW.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AdminNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const { setupStatus } = useSetup();
    const needsSetup = computed(
      () => authStore.isWebAdmin && setupStatus.value && (!setupStatus.value.hasLanguage || !setupStatus.value.hasMenus || !setupStatus.value.hasContent)
    );
    const router = useRouter();
    const route = useRoute();
    const adminDrop = ref(false);
    const userDrop = ref(false);
    const mobileOpen = ref(false);
    const userName = computed(() => {
      const u = authStore.user;
      return u ? (u.username || "").charAt(0).toUpperCase() + (u.username || "").slice(1) : "";
    });
    const hasDomain = computed(() => {
      var _a2;
      var _a;
      return ((_a2 = (_a = authStore.user) == null ? void 0 : _a.domain_id) != null ? _a2 : 0) > 0;
    });
    const isSitebuilder = computed(() => {
      var _a2;
      var _a;
      return ((_a2 = (_a = authStore.user) == null ? void 0 : _a.sitebuilder) != null ? _a2 : 0) !== 0;
    });
    const currentTab = computed(() => {
      const path = route.path;
      if (path === "/admin") return "home";
      if (path.startsWith("/admin/setup")) return "setup";
      if (path.startsWith("/admin/settings")) return "websetting";
      if (path.startsWith("/admin/menu")) return "menu";
      if (path.startsWith("/admin/content")) return "content";
      if (path.startsWith("/admin/media")) return "media";
      if (path.startsWith("/admin/users")) return "member";
      if (path.startsWith("/admin/super")) return "admin";
      if (path === "/admin/profile" || path === "/admin/password") return "home";
      return "";
    });
    const closeMenus = () => {
      adminDrop.value = false;
      userDrop.value = false;
      mobileOpen.value = false;
    };
    router.afterEach(() => closeMenus());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar navbar-inverse title" }, _attrs))} data-v-f0aba6e7><div class="container" data-v-f0aba6e7><div class="navbar-header" data-v-f0aba6e7><button type="button" class="navbar-toggle" data-v-f0aba6e7><span class="icon-bar" data-v-f0aba6e7></span><span class="icon-bar" data-v-f0aba6e7></span><span class="icon-bar" data-v-f0aba6e7></span></button><a class="navbar-brand hidden-lg hidden-md" href="#" data-v-f0aba6e7>Cambodia Webhosting</a></div><div class="${ssrRenderClass([{ in: unref(mobileOpen) }, "navbar-collapse"])}" id="mybar" data-v-f0aba6e7>`);
      if (unref(authStore).user) {
        _push(`<ul class="nav navbar-nav" data-v-f0aba6e7><li class="${ssrRenderClass({ active: unref(currentTab) === "home" })}" data-v-f0aba6e7>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("sidebar.home"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("sidebar.home")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
        if (unref(needsSetup)) {
          _push(`<li class="${ssrRenderClass({ active: unref(currentTab) === "setup" })}" data-v-f0aba6e7>`);
          _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/setup" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="fa fa-bolt" style="${ssrRenderStyle({ "margin-right": "4px" })}" data-v-f0aba6e7${_scopeId}></i> Quick Setup`);
              } else {
                return [
                  createVNode("i", {
                    class: "fa fa-bolt",
                    style: { "margin-right": "4px" }
                  }),
                  createTextVNode(" Quick Setup")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</li>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(authStore).isSuperAdmin) {
          _push(`<li class="${ssrRenderClass({ active: unref(currentTab) === "admin", dropdown: true })}" data-v-f0aba6e7><a class="dropdown-toggle" data-v-f0aba6e7>${ssrInterpolate(_ctx.$t("sidebar.admin"))} <b class="caret" data-v-f0aba6e7></b></a>`);
          if (unref(adminDrop)) {
            _push(`<ul class="dropdown-menu" data-v-f0aba6e7><li data-v-f0aba6e7>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/super/users",
              onClick: closeMenus
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<i class="fa fa-users" data-v-f0aba6e7${_scopeId}></i> ${ssrInterpolate(_ctx.$t("sidebar.users"))}`);
                } else {
                  return [
                    createVNode("i", { class: "fa fa-users" }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("sidebar.users")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</li><li data-v-f0aba6e7>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/super/domains",
              onClick: closeMenus
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<i class="fa fa-globe" data-v-f0aba6e7${_scopeId}></i> ${ssrInterpolate(_ctx.$t("userManager.domain"))}`);
                } else {
                  return [
                    createVNode("i", { class: "fa fa-globe" }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("userManager.domain")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</li><li data-v-f0aba6e7>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/super/announcing",
              onClick: closeMenus
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<i class="fa fa-bullhorn" data-v-f0aba6e7${_scopeId}></i> ${ssrInterpolate(_ctx.$t("sidebar.announce"))}`);
                } else {
                  return [
                    createVNode("i", { class: "fa fa-bullhorn" }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("sidebar.announce")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</li></ul>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(authStore).isWebAdmin || !unref(authStore).isSuperAdmin && unref(hasDomain) && !unref(isSitebuilder)) {
          _push(`<!--[--><li class="${ssrRenderClass({ active: unref(currentTab) === "websetting" })}" data-v-f0aba6e7>`);
          _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/settings" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("sidebar.settings"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("sidebar.settings")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</li><li class="${ssrRenderClass({ active: unref(currentTab) === "menu" })}" data-v-f0aba6e7>`);
          _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/menu" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("sidebar.menu"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("sidebar.menu")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</li><li class="${ssrRenderClass({ active: unref(currentTab) === "content" })}" data-v-f0aba6e7>`);
          _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/content" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("sidebar.content"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("sidebar.content")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</li><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (unref(authStore).isWebAdmin || unref(hasDomain)) {
          _push(`<li class="${ssrRenderClass({ active: unref(currentTab) === "media" })}" data-v-f0aba6e7>`);
          _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/media" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("sidebar.media"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("sidebar.media")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</li>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(authStore).isNormalUser) {
          _push(`<li class="${ssrRenderClass({ active: unref(currentTab) === "member" })}" data-v-f0aba6e7>`);
          _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/users" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("sidebar.users"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("sidebar.users")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="nav navbar-nav navbar-right" data-v-f0aba6e7>`);
      if (!unref(authStore).isAuthenticated) {
        _push(`<li data-v-f0aba6e7>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/login" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("sidebar.login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("sidebar.login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<li class="dropdown user-dropdown" data-v-f0aba6e7><a class="dropdown-toggle" data-v-f0aba6e7><i class="fa fa-user" data-v-f0aba6e7></i> ${ssrInterpolate(unref(userName))} <b class="caret" data-v-f0aba6e7></b></a>`);
        if (unref(userDrop)) {
          _push(`<ul class="dropdown-menu" data-v-f0aba6e7><li data-v-f0aba6e7>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/profile",
            onClick: closeMenus
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="fa fa-user" data-v-f0aba6e7${_scopeId}></i> ${ssrInterpolate(_ctx.$t("userManager.profileSetting"))}`);
              } else {
                return [
                  createVNode("i", { class: "fa fa-user" }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("userManager.profileSetting")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</li><li data-v-f0aba6e7>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/password",
            onClick: closeMenus
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="fa fa-gear" data-v-f0aba6e7${_scopeId}></i> ${ssrInterpolate(_ctx.$t("userManager.passwordSetting"))}`);
              } else {
                return [
                  createVNode("i", { class: "fa fa-gear" }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("userManager.passwordSetting")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</li><li class="divider" data-v-f0aba6e7></li><li data-v-f0aba6e7><a href="#" data-v-f0aba6e7><i class="fa fa-power-off" data-v-f0aba6e7></i> ${ssrInterpolate(_ctx.$t("sidebar.logout"))}</a></li></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      }
      _push(`</ul></div></div></nav>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/layout/AdminNavbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-f0aba6e7"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AdminBreadcrumb",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const domainStore = useDomainStore();
    const { locale, setLocaleCookie } = useI18n();
    const route = useRoute();
    const alertSuccess = ref("");
    const alertError = ref("");
    const hasDomain = computed(() => {
      var _a2;
      var _a;
      return ((_a2 = (_a = authStore.user) == null ? void 0 : _a.domain_id) != null ? _a2 : 0) > 0;
    });
    const domainName = computed(() => {
      var _a;
      return ((_a = domainStore.domain) == null ? void 0 : _a.domain_name) || "";
    });
    const currentLangText = computed(() => locale.value === "en" ? "EN" : "\u1781\u17D2\u1798\u17C2\u179A");
    const breadcrumbs = computed(() => {
      const path = route.path;
      const crumbs = [];
      if (path.startsWith("/admin/settings")) {
        crumbs.push({ label: "Settings", to: "/admin/settings" });
        if (path.includes("/logo")) crumbs.push({ label: "Logo" });
        else if (path.includes("/menu")) crumbs.push({ label: "Menu" });
        else if (path.includes("/banner")) crumbs.push({ label: "Slideshow" });
        else if (path.includes("/language")) crumbs.push({ label: "Language" });
        else if (path.includes("/social")) crumbs.push({ label: "Social" });
        else crumbs.push({ label: "Other" });
      } else if (path.startsWith("/admin/menu")) {
        crumbs.push({ label: "Menu", to: "/admin/menu" });
        if (route.params.id) crumbs.push({ label: "Edit" });
      } else if (path.startsWith("/admin/content")) {
        crumbs.push({ label: "Content", to: "/admin/content" });
        if (route.params.contentId) crumbs.push({ label: "Items" });
        if (route.params.id && !route.params.contentId) crumbs.push({ label: "Edit" });
      } else if (path.startsWith("/admin/media")) {
        crumbs.push({ label: "Media" });
      } else if (path.startsWith("/admin/ai-chat")) {
        crumbs.push({ label: "AI Chat" });
      } else if (path.startsWith("/admin/users")) {
        crumbs.push({ label: "Users" });
      } else if (path.startsWith("/admin/super/domains")) {
        crumbs.push({ label: "Domains", to: "/admin/super/domains" });
        if (route.params.id) crumbs.push({ label: "Dashboard" });
        if (path.includes("/add")) crumbs.push({ label: "New" });
      } else if (path.startsWith("/admin/super/announcing")) {
        crumbs.push({ label: "Announce" });
      } else if (path.startsWith("/admin/super/users")) {
        crumbs.push({ label: "Members" });
      } else if (path === "/admin/profile") {
        crumbs.push({ label: "Profile" });
      } else if (path === "/admin/password") {
        crumbs.push({ label: "Password" });
      }
      return crumbs;
    });
    provide("setAlertSuccess", (msg) => {
      alertSuccess.value = msg;
    });
    provide("setAlertError", (msg) => {
      alertError.value = msg;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (unref(authStore).isAuthenticated) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-f03315c2>`);
        if (unref(breadcrumbs).length) {
          _push(`<ol class="breadcrumb" data-v-f03315c2><!--[-->`);
          ssrRenderList(unref(breadcrumbs), (crumb, i) => {
            _push(`<li class="${ssrRenderClass({ active: i === unref(breadcrumbs).length - 1 })}" data-v-f03315c2>`);
            if (crumb.to) {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: crumb.to
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(crumb.label)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(crumb.label), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(`<span data-v-f03315c2>${ssrInterpolate(crumb.label)}</span>`);
            }
            _push(`</li>`);
          });
          _push(`<!--]--></ol>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(route).path === "/admin") {
          _push(`<div class="container" data-v-f03315c2><br data-v-f03315c2></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<br data-v-f03315c2>`);
        if (unref(hasDomain)) {
          _push(`<p class="pull-right breadcrumb-actions" data-v-f03315c2><button class="btn btn-default" style="${ssrRenderStyle({ "font-weight": "bold" })}" data-v-f03315c2>${ssrInterpolate(unref(currentLangText))}</button><a class="btn btn-default"${ssrRenderAttr("href", "http://" + unref(domainName))} target="_blank" title="Click here to see your website" data-v-f03315c2><i class="fa fa-globe" data-v-f03315c2></i> <strong data-v-f03315c2>${ssrInterpolate(unref(domainName))}</strong></a></p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="clearfix" data-v-f03315c2></div>`);
        if (unref(alertSuccess)) {
          _push(`<div class="alert alert-success alert-dismissable" data-v-f03315c2><a href="#" class="close" data-v-f03315c2>\xD7</a> ${ssrInterpolate(unref(alertSuccess))}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(alertError)) {
          _push(`<div class="alert alert-danger alert-dismissable" data-v-f03315c2><a href="#" class="close" data-v-f03315c2>\xD7</a> ${ssrInterpolate(unref(alertError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/layout/AdminBreadcrumb.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-f03315c2"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-footer" }, _attrs))} data-v-2edc6a75><div class="container text-center" data-v-2edc6a75><p data-v-2edc6a75> KHMER.BIZ | <a href="/docs/USER_GUIDE.html" target="_blank" data-v-2edc6a75><i class="fa fa-book-open-reader fa-lg" data-v-2edc6a75></i> User Guide </a> | <a href="https://t.me/cambodiawebhosting" target="_blank" data-v-2edc6a75><i class="fa-brands fa-telegram fa-lg" data-v-2edc6a75></i> cambodiawebhosting </a> | <a href="https://www.youtube.com/watch?v=01OhUFUhQM8&amp;list=PLFNGjBqsHQG0odXrXZeBUEaqJghiocvyX&amp;index=6" target="_blank" data-v-2edc6a75><i class="fa-brands fa-youtube text-danger fa-lg" data-v-2edc6a75></i> Cambodia Web Hosting </a></p></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/layout/AdminFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-2edc6a75"]]);
const _imports_0 = "" + buildAssetsURL("2logo.qEzYLUZn.gif");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Toast = resolveComponent("Toast");
      const _component_AdminNavbar = __nuxt_component_0;
      const _component_AdminBreadcrumb = __nuxt_component_1;
      const _component_AdminFooter = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-56d056aa>`);
      _push(ssrRenderComponent(_component_Toast, null, null, _parent));
      _push(`<div class="container text-right admin-logo-bar" data-v-56d056aa><img${ssrRenderAttr("src", _imports_0)} alt="Logo" data-v-56d056aa></div>`);
      _push(ssrRenderComponent(_component_AdminNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_AdminBreadcrumb, null, null, _parent));
      _push(`<main class="main-content container" data-v-56d056aa>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_AdminFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-56d056aa"]]);

export { admin as default };
//# sourceMappingURL=admin-Ba_19b_K.mjs.map
