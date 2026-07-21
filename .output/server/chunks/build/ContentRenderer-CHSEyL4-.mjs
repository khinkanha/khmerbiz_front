import { f as _sfc_main$1, a as __nuxt_component_1, b as __nuxt_component_2, d as __nuxt_component_4, _ as __nuxt_component_0$1, c as __nuxt_component_3, e as __nuxt_component_5 } from './ArticleSection-iTNk2c-R.mjs';
import { defineComponent, computed, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { C as ContentType } from './content-KJHlnLiT.mjs';
import { u as useDomainStore } from './domain-CCktQG6u.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContentRenderer",
  __ssrInlineRender: true,
  props: {
    content: {},
    domainId: {},
    showTitle: { type: Boolean, default: true },
    compact: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const domainStore = useDomainStore();
    const isClassicTemplate = computed(() => {
      var _a;
      return ((_a = domainStore.settings) == null ? void 0 : _a.page_style) === 0;
    });
    const isContentSection = (val) => {
      return val != null && "content" in val && "items" in val;
    };
    const content = computed(() => {
      if (isContentSection(props.content)) {
        return props.content.content;
      }
      return props.content;
    });
    const items = computed(() => {
      var _a;
      if (isContentSection(props.content)) {
        return props.content.items || [];
      }
      return ((_a = props.content) == null ? void 0 : _a.items) || [];
    });
    const mapData = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ArticleSection = _sfc_main$1;
      const _component_PhotoGallery = __nuxt_component_1;
      const _component_VideoSection = __nuxt_component_2;
      const _component_DocumentSection = __nuxt_component_4;
      const _component_NewsSection = __nuxt_component_0$1;
      const _component_MapDisplay = __nuxt_component_3;
      const _component_ProductCatalog = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-renderer" }, _attrs))} data-v-da7d40bb>`);
      if (unref(content) && unref(content).content_type === unref(ContentType).ARTICLE) {
        _push(ssrRenderComponent(_component_ArticleSection, {
          content: unref(content),
          "show-title": __props.showTitle
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).PHOTO) {
        _push(ssrRenderComponent(_component_PhotoGallery, {
          items: unref(items),
          "section-title": __props.showTitle ? unref(content).title : ""
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).VIDEO) {
        _push(ssrRenderComponent(_component_VideoSection, {
          items: unref(items),
          "section-title": __props.showTitle ? unref(content).title : ""
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).DOCUMENT) {
        _push(ssrRenderComponent(_component_DocumentSection, {
          items: unref(items),
          "section-title": __props.showTitle ? unref(content).title : ""
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).NEWS && unref(isClassicTemplate)) {
        _push(ssrRenderComponent(_component_NewsSection, {
          "domain-id": __props.domainId,
          "content-id": unref(content).content_id,
          "section-title": __props.showTitle ? unref(content).title : "",
          "show-more-link": true
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).MAP) {
        _push(ssrRenderComponent(_component_MapDisplay, {
          "map-data": unref(mapData) || {},
          "section-title": __props.showTitle ? unref(content).title : ""
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).PRODUCT) {
        _push(ssrRenderComponent(_component_ProductCatalog, {
          "content-id": unref(content).content_id,
          "section-title": __props.showTitle ? unref(content).title : ""
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/ContentRenderer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-da7d40bb"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=ContentRenderer-CHSEyL4-.mjs.map
