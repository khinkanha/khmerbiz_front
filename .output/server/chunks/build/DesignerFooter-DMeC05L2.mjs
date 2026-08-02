import { defineComponent, computed, ref, watch, unref, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { u as useDesignStore, d as defaultHeader, a as defaultFooter, g as getSocialIcon } from './setting-B7aDaTtz.mjs';
import { u as useDomainStore } from './domain-CF4nfyOM.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-DlwdfiwN.mjs';
import { _ as _export_sfc, b as useRuntimeConfig, k as useRoute, n as navigateTo } from './server.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DesignerHeaderItem",
  __ssrInlineRender: true,
  props: {
    item: {},
    mobile: { type: Boolean }
  },
  emits: ["navigate", "lang", "home"],
  setup(__props) {
    const domainStore = useDomainStore();
    const menuTree = computed(() => domainStore.menuTree);
    const socialMedia = computed(() => domainStore.socialMedia);
    const languages = computed(() => domainStore.languages);
    const settings = computed(() => domainStore.settings);
    const domainId = computed(() => {
      var _a;
      return (_a = domainStore.domain) == null ? void 0 : _a.domain_id;
    });
    const currentLangId = computed(() => {
      var _a;
      return (_a = domainStore.currentLanguage) == null ? void 0 : _a.lang_id;
    });
    const photoUrl = useRuntimeConfig().public.photoUrl || "";
    const logoSrc = computed(() => {
      var _a;
      const logo = (_a = settings.value) == null ? void 0 : _a.logo;
      if (!logo) return "";
      if (/^https?:|^\/\//.test(logo)) return logo;
      return photoUrl + logo;
    });
    const err = ref(false);
    watch(() => logoSrc.value, () => {
      err.value = false;
    });
    const titleText = computed(() => {
      var _a, _b;
      return ((_a = settings.value) == null ? void 0 : _a.title) || ((_b = domainStore.domain) == null ? void 0 : _b.domain_name) || "Home";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_NuxtLink = __nuxt_component_0$1;
      if (__props.item.type === "logo") {
        _push(`<a${ssrRenderAttrs(mergeProps({
          class: "dhi-logo",
          href: "/"
        }, _attrs))} data-v-2de0dd11>`);
        if (unref(logoSrc) && !unref(err)) {
          _push(`<img${ssrRenderAttr("src", unref(logoSrc))}${ssrRenderAttr("alt", unref(titleText))} data-v-2de0dd11>`);
        } else {
          _push(`<span class="dhi-logo-text" data-v-2de0dd11>${ssrInterpolate(unref(titleText))}</span>`);
        }
        _push(`</a>`);
      } else if (__props.item.type === "menu") {
        _push(`<nav${ssrRenderAttrs(mergeProps({
          class: ["dhi-menu", { mobile: __props.mobile }]
        }, _attrs))} data-v-2de0dd11><!--[-->`);
        ssrRenderList(unref(menuTree), (m) => {
          var _a2, _b2;
          _push(`<div class="dhi-menu-item" data-v-2de0dd11>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/pages/${unref(domainId)}/${m.item_id}`,
            class: "dhi-menu-link",
            onClick: ($event) => _ctx.$emit("navigate")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(m.item_name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(m.item_name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (__props.mobile && ((_a2 = m.children) == null ? void 0 : _a2.length)) {
            _push(`<!--[-->`);
            ssrRenderList(m.children, (c) => {
              _push(ssrRenderComponent(_component_NuxtLink, {
                key: c.item_id,
                to: `/pages/${unref(domainId)}/${c.item_id}`,
                class: "dhi-sublink",
                onClick: ($event) => _ctx.$emit("navigate")
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(c.item_name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(c.item_name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]-->`);
          } else if ((_b2 = m.children) == null ? void 0 : _b2.length) {
            _push(`<div class="dhi-dropdown" data-v-2de0dd11><!--[-->`);
            ssrRenderList(m.children, (c) => {
              _push(ssrRenderComponent(_component_NuxtLink, {
                key: c.item_id,
                to: `/pages/${unref(domainId)}/${c.item_id}`,
                class: "dhi-dropdown-link",
                onClick: ($event) => _ctx.$emit("navigate")
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(c.item_name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(c.item_name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></nav>`);
      } else if (__props.item.type === "social") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "dhi-social" }, _attrs))} data-v-2de0dd11><!--[-->`);
        ssrRenderList(unref(socialMedia), (s) => {
          _push(`<a${ssrRenderAttr("href", s.link)} target="_blank" rel="noopener" class="dhi-social-link" data-v-2de0dd11><i class="${ssrRenderClass(unref(getSocialIcon)(s.stype))}" data-v-2de0dd11></i></a>`);
        });
        _push(`<!--]--></div>`);
      } else if (__props.item.type === "language") {
        _push(`<select${ssrRenderAttrs(mergeProps({
          class: "dhi-lang",
          value: unref(currentLangId)
        }, _attrs))} data-v-2de0dd11><!--[-->`);
        ssrRenderList(unref(languages), (l) => {
          _push(`<option${ssrRenderAttr("value", l.lang_id)} data-v-2de0dd11>${ssrInterpolate(l.lang_name)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else if (__props.item.type === "text") {
        _push(`<span${ssrRenderAttrs(mergeProps({ class: "dhi-text" }, _attrs))} data-v-2de0dd11>${ssrInterpolate((_a = __props.item.payload) == null ? void 0 : _a.text)}</span>`);
      } else if (__props.item.type === "image" && ((_b = __props.item.payload) == null ? void 0 : _b.url)) {
        _push(`<img${ssrRenderAttrs(mergeProps({
          class: "dhi-image",
          src: __props.item.payload.url,
          alt: ((_c = __props.item.payload) == null ? void 0 : _c.alt) || ""
        }, _attrs))} data-v-2de0dd11>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/DesignerHeaderItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const DesignerHeaderItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-2de0dd11"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DesignerHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const designStore = useDesignStore();
    const domainStore = useDomainStore();
    const photoUrl = useRuntimeConfig().public.photoUrl || "";
    const settings = computed(() => domainStore.settings);
    const theme = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = settings.value) == null ? void 0 : _a.theme) != null ? _a2 : 0;
    });
    const header = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = designStore.design) == null ? void 0 : _a.header) != null ? _a2 : defaultHeader();
    });
    const REGION_IDS = ["left", "center", "right"];
    const items = (id) => {
      var _a2;
      var _a;
      return (_a2 = (_a = header.value.regions.find((r) => r.id === id)) == null ? void 0 : _a.items) != null ? _a2 : [];
    };
    const allItems = computed(() => REGION_IDS.flatMap((rid) => items(rid)));
    const logoItem = computed(() => allItems.value.find((i) => i.type === "logo"));
    const hasCollapsible = computed(() => allItems.value.some((i) => i.type !== "logo"));
    const logoSrc = computed(() => {
      var _a;
      const logo = (_a = settings.value) == null ? void 0 : _a.logo;
      if (!logo) return "";
      if (/^https?:|^\/\//.test(logo)) return logo;
      return photoUrl + logo;
    });
    const logoErr = ref(false);
    watch(() => logoSrc.value, () => {
      logoErr.value = false;
    });
    const titleText = computed(() => {
      var _a, _b;
      return ((_a = settings.value) == null ? void 0 : _a.title) || ((_b = domainStore.domain) == null ? void 0 : _b.domain_name) || "Home";
    });
    const mobileOpen = ref(false);
    const route = useRoute();
    watch(() => route.path, () => {
      mobileOpen.value = false;
    });
    const onLang = (id) => {
      if (id) domainStore.setLanguage(id);
    };
    const goHome = () => navigateTo("/");
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      if (unref(header)) {
        _push(`<header${ssrRenderAttrs(mergeProps({
          class: ["dh", [`theme-${unref(theme)}`, { open: unref(mobileOpen) }]]
        }, _attrs))} data-v-c53b9702><div class="dh-bar" data-v-c53b9702>`);
        if (unref(logoItem) || ((_a = unref(settings)) == null ? void 0 : _a.title)) {
          _push(`<a class="dh-brand" href="/" data-v-c53b9702>`);
          if (unref(logoSrc) && !unref(logoErr)) {
            _push(`<img${ssrRenderAttr("src", unref(logoSrc))}${ssrRenderAttr("alt", unref(titleText))} data-v-c53b9702>`);
          } else {
            _push(`<span class="dh-logo-text" data-v-c53b9702>${ssrInterpolate(unref(titleText))}</span>`);
          }
          _push(`</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="dh-desktop" data-v-c53b9702><!--[-->`);
        ssrRenderList(REGION_IDS, (rid) => {
          _push(`<div class="${ssrRenderClass([`region-${rid}`, "dh-region"])}" data-v-c53b9702><!--[-->`);
          ssrRenderList(items(rid), (item, i) => {
            _push(ssrRenderComponent(DesignerHeaderItem, {
              key: i,
              item,
              onNavigate: ($event) => mobileOpen.value = false,
              onLang,
              onHome: goHome
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div>`);
        if (unref(hasCollapsible)) {
          _push(`<button class="dh-toggle"${ssrRenderAttr("aria-label", unref(mobileOpen) ? "Close menu" : "Open menu")} data-v-c53b9702><i class="${ssrRenderClass([unref(mobileOpen) ? "pi-times" : "pi-bars", "pi"])}" data-v-c53b9702></i></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(mobileOpen)) {
          _push(`<div class="dh-drawer" data-v-c53b9702><!--[-->`);
          ssrRenderList(REGION_IDS, (rid) => {
            _push(`<!--[--><!--[-->`);
            ssrRenderList(items(rid).filter((x) => x.type !== "logo"), (item, i) => {
              _push(ssrRenderComponent(DesignerHeaderItem, {
                key: `${rid}-${i}`,
                item,
                mobile: "",
                onNavigate: ($event) => mobileOpen.value = false,
                onLang,
                onHome: goHome
              }, null, _parent));
            });
            _push(`<!--]--><!--]-->`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</header>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/DesignerHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c53b9702"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DesignerFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const designStore = useDesignStore();
    const domainStore = useDomainStore();
    const settings = computed(() => domainStore.settings);
    const domain = computed(() => domainStore.domain);
    const menuTree = computed(() => domainStore.menuTree);
    const socialMedia = computed(() => domainStore.socialMedia);
    const domainId = computed(() => {
      var _a;
      return (_a = domainStore.domain) == null ? void 0 : _a.domain_id;
    });
    const footer = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = designStore.design) == null ? void 0 : _a.footer) != null ? _a2 : defaultFooter();
    });
    const colCount = computed(() => footer.value.columns.length || 1);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b, _c;
      const _component_NuxtLink = __nuxt_component_0$1;
      if (unref(footer)) {
        _push(`<footer${ssrRenderAttrs(mergeProps({ class: "df" }, _attrs))} data-v-bf2c142f><div class="df-inner" style="${ssrRenderStyle({ gridTemplateColumns: "repeat(" + unref(colCount) + ", 1fr)" })}" data-v-bf2c142f><!--[-->`);
        ssrRenderList(unref(footer).columns, (col, ci) => {
          _push(`<div class="df-col" data-v-bf2c142f><!--[-->`);
          ssrRenderList(col.items, (item, i) => {
            var _a22, _b2, _c2, _d, _e, _f;
            _push(`<!--[-->`);
            if (item.type === "text") {
              _push(`<p class="df-text" data-v-bf2c142f>${ssrInterpolate((_a22 = item.payload) == null ? void 0 : _a22.text)}</p>`);
            } else if (item.type === "social") {
              _push(`<div class="df-social" data-v-bf2c142f><!--[-->`);
              ssrRenderList(unref(socialMedia), (s) => {
                _push(`<a${ssrRenderAttr("href", s.link)} target="_blank" rel="noopener" class="df-social-link" data-v-bf2c142f><i class="${ssrRenderClass(unref(getSocialIcon)(s.stype))}" data-v-bf2c142f></i></a>`);
              });
              _push(`<!--]--></div>`);
            } else if (item.type === "menu") {
              _push(`<ul class="df-links" data-v-bf2c142f><!--[-->`);
              ssrRenderList(unref(menuTree), (m) => {
                _push(`<li data-v-bf2c142f>`);
                _push(ssrRenderComponent(_component_NuxtLink, {
                  to: `/pages/${unref(domainId)}/${m.item_id}`
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`${ssrInterpolate(m.item_name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(m.item_name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</li>`);
              });
              _push(`<!--]--></ul>`);
            } else if (item.type === "contact") {
              _push(`<ul class="df-contact" data-v-bf2c142f>`);
              if ((_b2 = item.payload) == null ? void 0 : _b2.phone) {
                _push(`<li data-v-bf2c142f><i class="pi pi-phone" data-v-bf2c142f></i> ${ssrInterpolate(item.payload.phone)}</li>`);
              } else {
                _push(`<!---->`);
              }
              if ((_c2 = item.payload) == null ? void 0 : _c2.email) {
                _push(`<li data-v-bf2c142f><i class="pi pi-envelope" data-v-bf2c142f></i> ${ssrInterpolate(item.payload.email)}</li>`);
              } else {
                _push(`<!---->`);
              }
              if ((_d = item.payload) == null ? void 0 : _d.address) {
                _push(`<li data-v-bf2c142f><i class="pi pi-map-marker" data-v-bf2c142f></i> ${ssrInterpolate(item.payload.address)}</li>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</ul>`);
            } else if (item.type === "image" && ((_e = item.payload) == null ? void 0 : _e.url)) {
              _push(`<img class="df-image"${ssrRenderAttr("src", item.payload.url)}${ssrRenderAttr("alt", ((_f = item.payload) == null ? void 0 : _f.alt) || "")} data-v-bf2c142f>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div><div class="df-bottom" data-v-bf2c142f><span data-v-bf2c142f>${ssrInterpolate(((_a = unref(settings)) == null ? void 0 : _a.title) || ((_b = unref(domain)) == null ? void 0 : _b.domain_name) || "")}</span>`);
        if ((_c = unref(settings)) == null ? void 0 : _c.footer) {
          _push(`<span class="df-copy" data-v-bf2c142f>${(_a2 = unref(settings).footer) != null ? _a2 : ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></footer>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/DesignerFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bf2c142f"]]);

export { __nuxt_component_0 as _, __nuxt_component_3 as a };
//# sourceMappingURL=DesignerFooter-DMeC05L2.mjs.map
