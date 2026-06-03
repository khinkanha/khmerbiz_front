import { defineComponent, resolveComponent, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, b as useRuntimeConfig } from './server.mjs';

const SOCIAL_ICONS = {
  1: "pi pi-google",
  2: "pi pi-facebook",
  3: "pi pi-youtube",
  4: "pi pi-linkedin",
  5: "pi pi-twitter",
  6: "pi pi-telegram",
  7: "pi pi-instagram"
};
const getSocialIcon = (stype) => {
  return SOCIAL_ICONS[stype] || "pi pi-globe";
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BannerSlideshow",
  __ssrInlineRender: true,
  props: {
    banners: {}
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Carousel = resolveComponent("Carousel");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-slideshow" }, _attrs))} data-v-fe0c7156>`);
      _push(ssrRenderComponent(_component_Carousel, {
        value: __props.banners,
        numVisible: 1,
        numScroll: 1,
        circular: true,
        autoplayInterval: 5e3,
        class: "banner-carousel"
      }, {
        item: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="banner-slide" data-v-fe0c7156${_scopeId}>`);
            if (data.link) {
              _push2(`<a${ssrRenderAttr("href", data.link)} target="_blank" rel="noopener noreferrer" class="banner-link" data-v-fe0c7156${_scopeId}>`);
              if (data.image) {
                _push2(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${data.image}`)}${ssrRenderAttr("alt", data.title || "Banner")} class="banner-image" data-v-fe0c7156${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</a>`);
            } else if (data.image) {
              _push2(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${data.image}`)}${ssrRenderAttr("alt", data.title || "Banner")} class="banner-image" data-v-fe0c7156${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (data.title) {
              _push2(`<div class="banner-caption" data-v-fe0c7156${_scopeId}><h2 data-v-fe0c7156${_scopeId}>${ssrInterpolate(data.title)}</h2></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "banner-slide" }, [
                data.link ? (openBlock(), createBlock("a", {
                  key: 0,
                  href: data.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  class: "banner-link"
                }, [
                  data.image ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: `${unref(photoUrl)}${data.image}`,
                    alt: data.title || "Banner",
                    class: "banner-image"
                  }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                ], 8, ["href"])) : data.image ? (openBlock(), createBlock("img", {
                  key: 1,
                  src: `${unref(photoUrl)}${data.image}`,
                  alt: data.title || "Banner",
                  class: "banner-image"
                }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                data.title ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "banner-caption"
                }, [
                  createVNode("h2", null, toDisplayString(data.title), 1)
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/BannerSlideshow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fe0c7156"]]);

export { __nuxt_component_1 as _, getSocialIcon as g };
//# sourceMappingURL=BannerSlideshow-CMRyuYsE.mjs.map
