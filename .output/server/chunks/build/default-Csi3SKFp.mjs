import { defineComponent, computed, mergeProps, unref, ref, withCtx, createTextVNode, toDisplayString, resolveComponent, openBlock, createBlock, createCommentVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { u as useDomainStore } from './domain-D7lCra9Q.mjs';
import { _ as _export_sfc, b as useRuntimeConfig, l as useRoute, k as useI18n } from './server.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-DlwdfiwN.mjs';
import { u as useAuthStore } from './auth-Ca917lIc.mjs';
import { C as ContentType } from './content-BKhKEcUD.mjs';
import { g as getSocialIcon } from './setting-B0D_vWRg.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LanguageSelector",
  __ssrInlineRender: true,
  props: {
    dark: { type: Boolean }
  },
  setup(__props) {
    const domainStore = useDomainStore();
    const { locale, setLocaleCookie } = useI18n();
    const menuRef = ref();
    const currentLanguage = computed(() => domainStore.currentLanguage);
    const flagMap = (flag) => {
      const flags = {
        0: "kh.svg",
        1: "en.svg",
        2: "ch.svg",
        3: "th.svg",
        4: "vn.svg",
        5: "fr.svg"
      };
      return flags[flag] || "kh.svg";
    };
    const languageMenuItems = computed(() => {
      return domainStore.languages.map((lang) => ({
        label: lang.lang_name,
        command: () => setLanguage(lang.lang_id)
      }));
    });
    const toggleMenu = (event) => {
      var _a;
      (_a = menuRef.value) == null ? void 0 : _a.toggle(event);
    };
    const flagToLocale = {
      0: "kh",
      1: "en",
      2: "ch",
      3: "th",
      4: "vn",
      5: "fr"
    };
    const setLanguage = async (langId) => {
      const lang = domainStore.languages.find((l) => l.lang_id === langId);
      if (lang) {
        const code = lang.lang_code || flagToLocale[lang.flag];
        if (code) {
          locale.value = code;
          setLocaleCookie(code);
        }
      }
      await domainStore.setLanguage(langId);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      const _component_Menu = resolveComponent("Menu");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["language-selector", { dark: __props.dark }]
      }, _attrs))} data-v-de7bceca>`);
      _push(ssrRenderComponent(_component_Button, {
        onClick: toggleMenu,
        class: "language-button",
        text: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (unref(currentLanguage)) {
              _push2(`<img${ssrRenderAttr("src", `/flag/${flagMap(unref(currentLanguage).flag)}`)}${ssrRenderAttr("alt", unref(currentLanguage).lang_name)} class="flag-icon" data-v-de7bceca${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentLanguage)) {
              _push2(`<span data-v-de7bceca${_scopeId}>${ssrInterpolate((_a = unref(currentLanguage).lang_code) == null ? void 0 : _a.toUpperCase())}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<i class="pi pi-chevron-down" data-v-de7bceca${_scopeId}></i>`);
          } else {
            return [
              unref(currentLanguage) ? (openBlock(), createBlock("img", {
                key: 0,
                src: `/flag/${flagMap(unref(currentLanguage).flag)}`,
                alt: unref(currentLanguage).lang_name,
                class: "flag-icon"
              }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
              unref(currentLanguage) ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString((_b = unref(currentLanguage).lang_code) == null ? void 0 : _b.toUpperCase()), 1)) : createCommentVNode("", true),
              createVNode("i", { class: "pi pi-chevron-down" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Menu, {
        ref_key: "menuRef",
        ref: menuRef,
        model: unref(languageMenuItems),
        popup: true
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/layout/LanguageSelector.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-de7bceca"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PublicHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const domainStore = useDomainStore();
    const authStore = useAuthStore();
    const config = useRuntimeConfig().public;
    const route = useRoute();
    const settings = computed(() => domainStore.settings);
    const domain = computed(() => domainStore.domain);
    const menuTree = computed(() => domainStore.menuTree);
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    computed(() => {
      var _a2;
      var _a;
      return ((_a2 = (_a = authStore.user) == null ? void 0 : _a.sitebuilder) != null ? _a2 : 0) !== 0;
    });
    const isSinglePage = computed(() => {
      var _a;
      return ((_a = settings.value) == null ? void 0 : _a.page_style) !== 0;
    });
    const isClassicTemplate = computed(() => {
      var _a;
      return ((_a = settings.value) == null ? void 0 : _a.page_style) === 0;
    });
    const filteredMenuTree = computed(() => {
      if (isClassicTemplate.value) return menuTree.value;
      return menuTree.value.filter((item) => item.content_type !== ContentType.NEWS).map((item) => {
        var _a;
        return {
          ...item,
          children: ((_a = item.children) == null ? void 0 : _a.filter((child) => child.content_type !== ContentType.NEWS)) || []
        };
      });
    });
    const activeMenuId = ref(null);
    const headerClass = computed(() => {
      var _a2;
      var _a;
      const style = (_a2 = (_a = settings.value) == null ? void 0 : _a.theme) != null ? _a2 : 0;
      return `theme-${style}`;
    });
    const mobileMenuOpen = ref(false);
    const isMenuActive = (item) => {
      var _a, _b;
      const path = `/pages/${(_a = domain.value) == null ? void 0 : _a.domain_id}/${item.item_id}`;
      if (route.path === path) return true;
      if ((_b = item.children) == null ? void 0 : _b.length) {
        return item.children.some((child) => isChildActive(child.item_id));
      }
      return false;
    };
    const isChildActive = (childId) => {
      var _a;
      const path = `/pages/${(_a = domain.value) == null ? void 0 : _a.domain_id}/${childId}`;
      return route.path === path;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_LanguageSelector = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["public-header", unref(headerClass)]
      }, _attrs))} data-v-e3552f4a><div class="top-bar" data-v-e3552f4a><div class="container top-bar-inner" data-v-e3552f4a><div class="brand" data-v-e3552f4a>`);
      if ((_a = unref(settings)) == null ? void 0 : _a.logo) {
        _push(`<img${ssrRenderAttr("src", unref(config).photoUrl + unref(settings).logo)}${ssrRenderAttr("alt", ((_b = unref(settings)) == null ? void 0 : _b.title) || "Logo")} class="brand-logo" data-v-e3552f4a>`);
      } else {
        _push(`<!---->`);
      }
      if ((_c = unref(settings)) == null ? void 0 : _c.title) {
        _push(`<div class="brand-title" data-v-e3552f4a><h1 data-v-e3552f4a>${ssrInterpolate(unref(settings).title)}</h1></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="top-actions" data-v-e3552f4a>`);
      _push(ssrRenderComponent(_component_LanguageSelector, null, null, _parent));
      _push(`</div></div></div><nav class="nav-bar" data-v-e3552f4a><div class="container nav-inner" data-v-e3552f4a><ul class="${ssrRenderClass([{ "mobile-open": unref(mobileMenuOpen) }, "nav-list"])}" data-v-e3552f4a><!--[-->`);
      ssrRenderList(unref(filteredMenuTree), (item) => {
        var _a2;
        _push(`<li class="${ssrRenderClass([{ "has-dropdown": item.children && item.children.length > 0 }, "nav-item"])}" data-v-e3552f4a>`);
        if (unref(isSinglePage)) {
          _push(`<a${ssrRenderAttr("href", `#section-${item.item_id}`)} class="${ssrRenderClass([{ active: unref(activeMenuId) === item.item_id }, "nav-link"])}" data-v-e3552f4a>${ssrInterpolate(item.item_name)}</a>`);
        } else {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/pages/${(_a2 = unref(domain)) == null ? void 0 : _a2.domain_id}/${item.item_id}`,
            class: ["nav-link", { active: isMenuActive(item) }]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.item_name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.item_name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        if (item.children && item.children.length > 0) {
          _push(`<div class="dropdown-menu" data-v-e3552f4a><div class="dropdown-inner" data-v-e3552f4a>`);
          if (unref(isSinglePage)) {
            _push(`<!--[-->`);
            ssrRenderList(item.children, (child) => {
              _push(`<a${ssrRenderAttr("href", `#section-${child.item_id}`)} class="dropdown-link" data-v-e3552f4a>${ssrInterpolate(child.item_name)}</a>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!--[-->`);
            ssrRenderList(item.children, (child) => {
              var _a3;
              _push(ssrRenderComponent(_component_NuxtLink, {
                key: child.item_id,
                to: `/pages/${(_a3 = unref(domain)) == null ? void 0 : _a3.domain_id}/${child.item_id}`,
                class: ["dropdown-link", { active: isChildActive(child.item_id) }]
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(child.item_name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(child.item_name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]-->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
      if (!unref(isAuthenticated)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/login",
          class: "login-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("auth.login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("auth.login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="mobile-toggle" data-v-e3552f4a><i class="${ssrRenderClass(unref(mobileMenuOpen) ? "pi pi-times" : "pi pi-bars")}" data-v-e3552f4a></i></button></div></nav></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/layout/PublicHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e3552f4a"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PublicFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const domainStore = useDomainStore();
    const settings = computed(() => domainStore.settings);
    const socialMedia = computed(() => domainStore.socialMedia);
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b, _c, _d, _e;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "public-footer" }, _attrs))} data-v-c26eb71f><div class="footer-main" data-v-c26eb71f><div class="container" data-v-c26eb71f><div class="footer-grid" data-v-c26eb71f><div class="footer-section footer-about" data-v-c26eb71f><div class="footer-brand" data-v-c26eb71f>`);
      if ((_a = unref(settings)) == null ? void 0 : _a.logo) {
        _push(`<img${ssrRenderAttr("src", unref(settings).logo)}${ssrRenderAttr("alt", ((_b = unref(settings)) == null ? void 0 : _b.title) || "Logo")} class="footer-logo" data-v-c26eb71f>`);
      } else {
        _push(`<!---->`);
      }
      if ((_c = unref(settings)) == null ? void 0 : _c.title) {
        _push(`<h3 data-v-c26eb71f>${ssrInterpolate(unref(settings).title)}</h3>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if ((_d = unref(settings)) == null ? void 0 : _d.footer) {
        _push(`<div class="footer-text" data-v-c26eb71f>${(_a2 = unref(settings).footer) != null ? _a2 : ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="footer-section" data-v-c26eb71f><h4 class="footer-heading" data-v-c26eb71f>${ssrInterpolate(_ctx.$t("settings.socialMedia"))}</h4><div class="social-links" data-v-c26eb71f><!--[-->`);
      ssrRenderList(unref(socialMedia), (social) => {
        _push(`<a${ssrRenderAttr("href", social.link)} target="_blank" rel="noopener noreferrer" class="social-link" data-v-c26eb71f><i class="${ssrRenderClass(unref(getSocialIcon)(social.stype))}" data-v-c26eb71f></i></a>`);
      });
      _push(`<!--]--></div></div></div></div></div><div class="footer-bottom" data-v-c26eb71f><div class="container" data-v-c26eb71f><p data-v-c26eb71f>\xA9 ${ssrInterpolate(unref(currentYear))} ${ssrInterpolate(((_e = unref(settings)) == null ? void 0 : _e.title) || "Company")}. All rights reserved.</p></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/layout/PublicFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c26eb71f"]]);
const useTheme = () => {
  const THEME_COMPONENTS = {
    0: "ClassicMultiPage",
    1: "ScrollingSinglePage",
    2: "MagazineGrid",
    3: "FullscreenHero"
  };
  const resolveThemeComponent = (pageStyle) => {
    return THEME_COMPONENTS[pageStyle] || "ClassicMultiPage";
  };
  const getThemeClass = (theme) => {
    const classes = {
      0: "theme-default",
      1: "theme-inverse",
      2: "theme-red",
      3: "theme-green",
      4: "theme-purple",
      5: "theme-yellow"
    };
    return classes[theme] || "theme-default";
  };
  return {
    resolveThemeComponent,
    getThemeClass
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const domainStore = useDomainStore();
    const { getThemeClass } = useTheme();
    const themeClass = computed(() => {
      if (domainStore.settings) {
        return getThemeClass(domainStore.settings.theme);
      }
      return "theme-default";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PublicHeader = __nuxt_component_0;
      const _component_PublicFooter = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["public-layout", unref(themeClass)]
      }, _attrs))} data-v-edc60d87>`);
      _push(ssrRenderComponent(_component_PublicHeader, null, null, _parent));
      _push(`<main class="main-content" data-v-edc60d87>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_PublicFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-edc60d87"]]);

export { _default as default };
//# sourceMappingURL=default-Csi3SKFp.mjs.map
