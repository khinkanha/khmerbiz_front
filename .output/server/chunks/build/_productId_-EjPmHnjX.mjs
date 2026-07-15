import { _ as __nuxt_component_0 } from './nuxt-link-DlwdfiwN.mjs';
import { defineComponent, withAsyncContext, ref, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createTextVNode, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc, l as useRoute, b as useRuntimeConfig } from './server.mjs';
import { u as useAsyncData } from './asyncData-DQv3Qsdd.mjs';
import { u as useHead } from './index-CrXeyONu.mjs';
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
  __name: "[productId]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const config = useRuntimeConfig();
    const { public: { apiBaseUrl } } = config;
    const photoUrl = config.public.photoUrl || "https://khmer.biz";
    const productId = route.params.productId;
    const parseProduct = (raw) => {
      let parsed = {};
      if ((raw == null ? void 0 : raw.description) && typeof raw.description === "string") {
        try {
          parsed = JSON.parse(raw.description);
        } catch {
        }
      }
      return {
        ...raw,
        name: parsed.name || (raw == null ? void 0 : raw.name) || "",
        price: parsed.price,
        currency: parsed.currency,
        shortdes: parsed.shortdes || "",
        longdes: parsed.longdes || "",
        features: Array.isArray(parsed.features) ? parsed.features : [],
        photos: Array.isArray(parsed.photos) ? parsed.photos : []
      };
    };
    const { data: product, pending: loading } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`product-${productId}`, async () => {
      try {
        const res = await $fetch(`${apiBaseUrl}/site/products/${productId}`);
        if ((res == null ? void 0 : res.status) !== false && (res == null ? void 0 : res.data)) return parseProduct(res.data);
      } catch (e) {
        console.error("Failed to fetch product:", e);
      }
      return null;
    })), __temp = await __temp, __restore(), __temp);
    const activePhotoIndex = ref(0);
    const activePhoto = computed(() => {
      var _a, _b;
      return ((_b = (_a = product.value) == null ? void 0 : _a.photos) == null ? void 0 : _b[activePhotoIndex.value]) || "";
    });
    const prevPhoto = () => {
      if (activePhotoIndex.value > 0) activePhotoIndex.value--;
    };
    const nextPhoto = () => {
      var _a, _b;
      const len = ((_b = (_a = product.value) == null ? void 0 : _a.photos) == null ? void 0 : _b.length) || 0;
      if (activePhotoIndex.value < len - 1) activePhotoIndex.value++;
    };
    ref(null);
    const relatedProducts = ref([]);
    const relatedLoading = ref(false);
    const responsiveOptions = ref([
      { breakpoint: "1400px", numVisible: 4, numScroll: 1 },
      { breakpoint: "1100px", numVisible: 3, numScroll: 1 },
      { breakpoint: "768px", numVisible: 2, numScroll: 1 },
      { breakpoint: "560px", numVisible: 2, numScroll: 1 }
    ]);
    computed(() => {
      var _a;
      if ((_a = product.value) == null ? void 0 : _a.content_id) {
        return `/#section-${product.value.content_id}`;
      }
      return "/";
    });
    const formatPrice = (price) => {
      return Number(price).toLocaleString(void 0, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    };
    useHead(() => {
      var _a, _b;
      return {
        title: ((_a = product.value) == null ? void 0 : _a.name) || "Product",
        meta: ((_b = product.value) == null ? void 0 : _b.shortdes) ? [{ name: "description", content: product.value.shortdes }] : []
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b, _c, _d;
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_Button = resolveComponent("Button");
      const _component_Carousel = resolveComponent("Carousel");
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-detail" }, _attrs))} data-v-f1b0c39b><div class="container" data-v-f1b0c39b>`);
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-f1b0c39b>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent));
        _push(`</div>`);
      } else if (unref(product)) {
        _push(`<!--[--><div class="product-layout" data-v-f1b0c39b><div class="product-gallery" data-v-f1b0c39b><div class="main-image" data-v-f1b0c39b>`);
        if (unref(activePhoto)) {
          _push(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${unref(activePhoto)}`)}${ssrRenderAttr("alt", unref(product).name)} data-v-f1b0c39b>`);
        } else {
          _push(`<div class="no-image" data-v-f1b0c39b><i class="pi pi-image" data-v-f1b0c39b></i></div>`);
        }
        if ((((_a = unref(product).photos) == null ? void 0 : _a.length) || 0) > 1) {
          _push(ssrRenderComponent(_component_Button, {
            icon: "pi pi-chevron-left",
            class: "gallery-nav gallery-prev",
            severity: "secondary",
            rounded: "",
            text: "",
            disabled: unref(activePhotoIndex) === 0,
            "aria-label": _ctx.$t("product.lightbox.previousPhoto"),
            onClick: prevPhoto
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if ((((_b = unref(product).photos) == null ? void 0 : _b.length) || 0) > 1) {
          _push(ssrRenderComponent(_component_Button, {
            icon: "pi pi-chevron-right",
            class: "gallery-nav gallery-next",
            severity: "secondary",
            rounded: "",
            text: "",
            disabled: unref(activePhotoIndex) === (((_c = unref(product).photos) == null ? void 0 : _c.length) || 0) - 1,
            "aria-label": _ctx.$t("product.lightbox.nextPhoto"),
            onClick: nextPhoto
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if ((((_d = unref(product).photos) == null ? void 0 : _d.length) || 0) > 1) {
          _push(`<span class="gallery-counter" data-v-f1b0c39b>${ssrInterpolate(unref(activePhotoIndex) + 1)} / ${ssrInterpolate(unref(product).photos.length)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(product).photos && unref(product).photos.length > 1) {
          _push(`<div class="thumbnails" data-v-f1b0c39b><!--[-->`);
          ssrRenderList(unref(product).photos, (photo, idx) => {
            _push(`<div class="${ssrRenderClass([{ active: unref(activePhotoIndex) === idx }, "thumbnail"])}" data-v-f1b0c39b><img${ssrRenderAttr("src", `${unref(photoUrl)}${photo}`)}${ssrRenderAttr("alt", `Photo ${Number(idx) + 1}`)} data-v-f1b0c39b></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="product-info" data-v-f1b0c39b><h1 class="product-name" data-v-f1b0c39b>${ssrInterpolate(unref(product).name)}</h1>`);
        if (unref(product).price !== void 0 && unref(product).price !== null) {
          _push(`<div class="product-price" data-v-f1b0c39b>${ssrInterpolate(formatPrice(unref(product).price))}\xA0`);
          if (unref(product).currency) {
            _push(`<span class="currency" data-v-f1b0c39b>${ssrInterpolate(unref(product).currency)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).shortdes) {
          _push(`<p class="product-shortdes" data-v-f1b0c39b>${ssrInterpolate(unref(product).shortdes)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).features && unref(product).features.length) {
          _push(`<div class="features-section" data-v-f1b0c39b><h3 class="features-title" data-v-f1b0c39b>Features</h3><ul class="features-list" data-v-f1b0c39b><!--[-->`);
          ssrRenderList(unref(product).features, (feat, i) => {
            _push(`<li data-v-f1b0c39b><i class="pi pi-check-circle" data-v-f1b0c39b></i> ${ssrInterpolate(feat)}</li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).longdes) {
          _push(`<div class="product-description" data-v-f1b0c39b>${(_a2 = unref(product).longdes) != null ? _a2 : ""}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(relatedProducts).length || unref(relatedLoading)) {
          _push(`<section class="related-products" data-v-f1b0c39b>`);
          if (unref(relatedLoading) && !unref(relatedProducts).length) {
            _push(ssrRenderComponent(_component_ProgressSpinner, { class: "related-loading" }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(relatedProducts).length) {
            _push(ssrRenderComponent(_component_Carousel, {
              value: unref(relatedProducts),
              numVisible: 4,
              numScroll: 1,
              circular: unref(relatedProducts).length >= 8,
              responsiveOptions: unref(responsiveOptions),
              class: "related-carousel"
            }, {
              header: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<h2 class="related-title" data-v-f1b0c39b${_scopeId}>${ssrInterpolate(_ctx.$t("product.related.title"))}</h2>`);
                } else {
                  return [
                    createVNode("h2", { class: "related-title" }, toDisplayString(_ctx.$t("product.related.title")), 1)
                  ];
                }
              }),
              item: withCtx((slotProps, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_NuxtLink, {
                    to: `/products/${slotProps.data.id}`,
                    class: "related-card"
                  }, {
                    default: withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="related-image" data-v-f1b0c39b${_scopeId2}>`);
                        if (slotProps.data.photos && slotProps.data.photos.length) {
                          _push3(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${slotProps.data.photos[0]}`)}${ssrRenderAttr("alt", slotProps.data.name)} data-v-f1b0c39b${_scopeId2}>`);
                        } else {
                          _push3(`<div class="related-placeholder" data-v-f1b0c39b${_scopeId2}><i class="pi pi-image" data-v-f1b0c39b${_scopeId2}></i></div>`);
                        }
                        _push3(`</div><div class="related-info" data-v-f1b0c39b${_scopeId2}><h4 class="related-name" data-v-f1b0c39b${_scopeId2}>${ssrInterpolate(slotProps.data.name)}</h4>`);
                        if (slotProps.data.price !== void 0 && slotProps.data.price !== null) {
                          _push3(`<div class="related-price" data-v-f1b0c39b${_scopeId2}>${ssrInterpolate(formatPrice(slotProps.data.price))}\xA0`);
                          if (slotProps.data.currency) {
                            _push3(`<small data-v-f1b0c39b${_scopeId2}>${ssrInterpolate(slotProps.data.currency)}</small>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "related-image" }, [
                            slotProps.data.photos && slotProps.data.photos.length ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: `${unref(photoUrl)}${slotProps.data.photos[0]}`,
                              alt: slotProps.data.name
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "related-placeholder"
                            }, [
                              createVNode("i", { class: "pi pi-image" })
                            ]))
                          ]),
                          createVNode("div", { class: "related-info" }, [
                            createVNode("h4", { class: "related-name" }, toDisplayString(slotProps.data.name), 1),
                            slotProps.data.price !== void 0 && slotProps.data.price !== null ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "related-price"
                            }, [
                              createTextVNode(toDisplayString(formatPrice(slotProps.data.price)) + "\xA0", 1),
                              slotProps.data.currency ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(slotProps.data.currency), 1)) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_NuxtLink, {
                      to: `/products/${slotProps.data.id}`,
                      class: "related-card"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "related-image" }, [
                          slotProps.data.photos && slotProps.data.photos.length ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: `${unref(photoUrl)}${slotProps.data.photos[0]}`,
                            alt: slotProps.data.name
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "related-placeholder"
                          }, [
                            createVNode("i", { class: "pi pi-image" })
                          ]))
                        ]),
                        createVNode("div", { class: "related-info" }, [
                          createVNode("h4", { class: "related-name" }, toDisplayString(slotProps.data.name), 1),
                          slotProps.data.price !== void 0 && slotProps.data.price !== null ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "related-price"
                          }, [
                            createTextVNode(toDisplayString(formatPrice(slotProps.data.price)) + "\xA0", 1),
                            slotProps.data.currency ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(slotProps.data.currency), 1)) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["to"])
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="empty-state" data-v-f1b0c39b><i class="pi pi-exclamation-circle" data-v-f1b0c39b></i><p data-v-f1b0c39b>Product not found</p></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[productId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _productId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f1b0c39b"]]);

export { _productId_ as default };
//# sourceMappingURL=_productId_-EjPmHnjX.mjs.map
