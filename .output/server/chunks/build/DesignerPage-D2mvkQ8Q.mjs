import { _ as __nuxt_component_6, a as __nuxt_component_1, b as __nuxt_component_2$1, c as __nuxt_component_4, d as __nuxt_component_0$1, e as __nuxt_component_3, f as __nuxt_component_5 } from './ProductCatalog-D_CU5s3R.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { C as ContentType } from './content-KJHlnLiT.mjs';
import { _ as _export_sfc, b as useDomainStore } from './server.mjs';
import { _ as __nuxt_component_2, g as getSocialIcon } from './BannerSlideshow-coH5HzQO.mjs';
import { i as isKbWidgetType, c as createWidgetHtml } from './blockWidgets-C4vo-aO5.mjs';

const CONTENT_TYPE_META = {
  [ContentType.ARTICLE]: { label: "Articles", icon: "pi pi-file-edit" },
  [ContentType.PHOTO]: { label: "Photo gallery", icon: "pi pi-images" },
  [ContentType.VIDEO]: { label: "Videos", icon: "pi pi-video" },
  [ContentType.DOCUMENT]: { label: "Documents", icon: "pi pi-file-pdf" },
  [ContentType.NEWS]: { label: "News", icon: "pi pi-newspaper" },
  [ContentType.MAP]: { label: "Map", icon: "pi pi-map-marker" },
  [ContentType.PRODUCT]: { label: "Products", icon: "pi pi-shopping-bag" }
};
const DESIGNER_PALETTE = [
  {
    group: "Layout",
    items: [
      { kind: "widget", type: "columns", label: "Columns", icon: "pi pi-table" },
      { kind: "widget", type: "divider", label: "Divider", icon: "pi pi-minus" },
      { kind: "widget", type: "spacer", label: "Spacer", icon: "pi pi-arrows-v" }
    ]
  },
  {
    group: "Content blocks",
    items: [
      { kind: "widget", type: "card", label: "Card", icon: "pi pi-id-card" },
      { kind: "widget", type: "callout", label: "Callout", icon: "pi pi-info-circle" },
      { kind: "widget", type: "stats", label: "Stats", icon: "pi pi-chart-bar" },
      { kind: "widget", type: "quote", label: "Quote", icon: "pi pi-comment" },
      { kind: "widget", type: "accordion", label: "FAQ", icon: "pi pi-list" },
      { kind: "widget", type: "checkbox", label: "Checklist", icon: "pi pi-check-square" },
      { kind: "widget", type: "contact", label: "Contact info", icon: "pi pi-phone" }
    ]
  },
  {
    group: "Media",
    items: [
      { kind: "widget", type: "image", label: "Image", icon: "pi pi-image" },
      { kind: "widget", type: "gallery", label: "Gallery", icon: "pi pi-images" },
      { kind: "widget", type: "video", label: "Video", icon: "pi pi-video" },
      { kind: "widget", type: "icon", label: "Icon", icon: "pi pi-star" }
    ]
  },
  {
    group: "Action",
    items: [
      { kind: "widget", type: "button", label: "Button", icon: "pi pi-share" }
    ]
  },
  // Phase 2b — bind to live tenant content. Each tile pre-sets a contentType.
  {
    group: "Site content",
    items: [
      { kind: "content", contentType: ContentType.NEWS, label: "News", icon: CONTENT_TYPE_META[ContentType.NEWS].icon },
      { kind: "content", contentType: ContentType.PHOTO, label: "Photos", icon: CONTENT_TYPE_META[ContentType.PHOTO].icon },
      { kind: "content", contentType: ContentType.VIDEO, label: "Videos", icon: CONTENT_TYPE_META[ContentType.VIDEO].icon },
      { kind: "content", contentType: ContentType.PRODUCT, label: "Products", icon: CONTENT_TYPE_META[ContentType.PRODUCT].icon },
      { kind: "content", contentType: ContentType.ARTICLE, label: "Articles", icon: CONTENT_TYPE_META[ContentType.ARTICLE].icon },
      { kind: "content", contentType: ContentType.DOCUMENT, label: "Documents", icon: CONTENT_TYPE_META[ContentType.DOCUMENT].icon },
      { kind: "content", contentType: ContentType.MAP, label: "Map", icon: CONTENT_TYPE_META[ContentType.MAP].icon }
    ]
  },
  // Phase 2b — built-in slots that pull from site config.
  {
    group: "Built-in",
    items: [
      { kind: "banner", label: "Banners", icon: "pi pi-image" },
      { kind: "social", label: "Social links", icon: "pi pi-share-alt" }
    ]
  }
];
const ALL_PALETTE_TYPES = DESIGNER_PALETTE.flatMap(
  (g) => g.items.filter((i) => i.kind === "widget")
);
const slotLabel = (slot) => {
  var _a2, _b2;
  var _a, _b;
  if (slot.kind === "widget") {
    return (_a2 = (_a = ALL_PALETTE_TYPES.find((i) => i.type === slot.type)) == null ? void 0 : _a.label) != null ? _a2 : slot.type;
  }
  if (slot.kind === "content") {
    return (_b2 = (_b = CONTENT_TYPE_META[slot.contentType]) == null ? void 0 : _b.label) != null ? _b2 : `Content #${slot.contentType}`;
  }
  return slot.kind === "banner" ? "Banners" : "Social links";
};
const slotIcon = (slot) => {
  var _a2, _b2;
  var _a, _b;
  if (slot.kind === "widget") {
    return (_a2 = (_a = ALL_PALETTE_TYPES.find((i) => i.type === slot.type)) == null ? void 0 : _a.icon) != null ? _a2 : "pi pi-th-large";
  }
  if (slot.kind === "content") {
    return (_b2 = (_b = CONTENT_TYPE_META[slot.contentType]) == null ? void 0 : _b.icon) != null ? _b2 : "pi pi-file";
  }
  return slot.kind === "banner" ? "pi pi-image" : "pi pi-share-alt";
};
const renderSlotHtml = (slot) => {
  if (slot.kind === "widget" && isKbWidgetType(slot.type)) {
    return createWidgetHtml(slot.type, slot.payload);
  }
  return "";
};
const HOME_PAGE_KEY = "home";
const menuIdToPageKey = (itemId) => {
  if (itemId === null || itemId === void 0 || itemId === "") return HOME_PAGE_KEY;
  return String(itemId);
};
const HEADER_ITEM_PALETTE = [
  { type: "logo", label: "Logo", icon: "pi pi-image" },
  { type: "menu", label: "Menu", icon: "pi pi-bars" },
  { type: "social", label: "Social", icon: "pi pi-share-alt" },
  { type: "language", label: "Language", icon: "pi pi-globe" },
  { type: "text", label: "Text", icon: "pi pi-pencil" },
  { type: "image", label: "Image", icon: "pi pi-image" }
];
const FOOTER_ITEM_PALETTE = [
  { type: "text", label: "Text", icon: "pi pi-pencil" },
  { type: "social", label: "Social", icon: "pi pi-share-alt" },
  { type: "menu", label: "Quick links", icon: "pi pi-list" },
  { type: "contact", label: "Contact", icon: "pi pi-phone" },
  { type: "image", label: "Image", icon: "pi pi-image" }
];
const ALL_REGION_ITEMS = [...HEADER_ITEM_PALETTE, ...FOOTER_ITEM_PALETTE];
const regionItemLabel = (item) => {
  var _a2;
  var _a;
  return (_a2 = (_a = ALL_REGION_ITEMS.find((i) => i.type === item.type)) == null ? void 0 : _a.label) != null ? _a2 : item.type;
};
const regionItemIcon = (item) => {
  var _a2;
  var _a;
  return (_a2 = (_a = ALL_REGION_ITEMS.find((i) => i.type === item.type)) == null ? void 0 : _a.icon) != null ? _a2 : "pi pi-th-large";
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
    const isClassicTemplate = computed(
      () => {
        var _a, _b;
        return ((_a = domainStore.settings) == null ? void 0 : _a.page_style) === 0 || ((_b = domainStore.settings) == null ? void 0 : _b.page_style) === 4;
      }
    );
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
    const mapRaw = computed(() => {
      const c = content.value;
      if (!c || c.content_type !== ContentType.MAP) return null;
      try {
        return JSON.parse(c.description || "{}");
      } catch {
        return null;
      }
    });
    const mapDescriptionHtml = computed(() => {
      const p = mapRaw.value;
      return p && typeof p.description === "string" ? p.description : "";
    });
    const mapData = computed(() => {
      const c = content.value;
      const p = mapRaw.value;
      if (!c || !p || p.visible === 0) return null;
      const lat = Number(p.lat);
      const lng = Number(p.lng);
      if (!isFinite(lat) || !isFinite(lng)) return null;
      return {
        lat,
        lng,
        zoom: Number(p.zoom) || 13,
        marker: p.title || c.title
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_ArticleSection = __nuxt_component_6;
      const _component_PhotoGallery = __nuxt_component_1;
      const _component_VideoSection = __nuxt_component_2$1;
      const _component_DocumentSection = __nuxt_component_4;
      const _component_NewsSection = __nuxt_component_0$1;
      const _component_MapDisplay = __nuxt_component_3;
      const _component_ProductCatalog = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-renderer" }, _attrs))} data-v-c4818e1d>`);
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
          "section-title": __props.showTitle ? unref(content).title : ""
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).MAP) {
        _push(`<section class="map-section-render" data-v-c4818e1d>`);
        if (__props.showTitle) {
          _push(`<h2 class="map-section-title" data-v-c4818e1d>${ssrInterpolate(unref(content).title)}</h2>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(mapDescriptionHtml)) {
          _push(`<div class="map-section-desc" data-v-c4818e1d>${(_a = unref(mapDescriptionHtml)) != null ? _a : ""}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(mapData)) {
          _push(ssrRenderComponent(_component_MapDisplay, {
            "map-data": unref(mapData),
            "section-title": "",
            "section-description": ""
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/ContentRenderer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c4818e1d"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DesignerPage",
  __ssrInlineRender: true,
  props: {
    sections: {},
    contentSections: {}
  },
  setup(__props) {
    const props = __props;
    const domainStore = useDomainStore();
    const domainId = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = domainStore.domain) == null ? void 0 : _a.domain_id) != null ? _a2 : 0;
    });
    const socialMedia = computed(() => {
      var _a;
      return (_a = domainStore.socialMedia) != null ? _a : [];
    });
    const langBanners = computed(() => {
      var _a2;
      var _a;
      const all = (_a2 = domainStore.banners) != null ? _a2 : [];
      const langId = (_a = domainStore.currentLanguage) == null ? void 0 : _a.lang_id;
      if (!langId) return all;
      const matching = all.filter((b) => b.lang_id === langId);
      return matching.length ? matching : all;
    });
    const resolveContent = (slot) => {
      var _a, _b, _c;
      const list = (_a = props.contentSections) != null ? _a : [];
      if (slot.menuId !== void 0) {
        return (_b = list.find((cs) => {
          var _a2;
          return ((_a2 = cs.content) == null ? void 0 : _a2.menu_id) === slot.menuId;
        })) != null ? _b : null;
      }
      return (_c = list.find((cs) => {
        var _a2;
        return ((_a2 = cs.content) == null ? void 0 : _a2.content_type) === slot.contentType;
      })) != null ? _c : null;
    };
    const slotMetaLabel = (contentType) => {
      var _a2;
      var _a;
      return (_a2 = (_a = CONTENT_TYPE_META[contentType]) == null ? void 0 : _a.label) != null ? _a2 : "content";
    };
    const slotMetaIcon = (contentType) => {
      var _a2;
      var _a;
      return (_a2 = (_a = CONTENT_TYPE_META[contentType]) == null ? void 0 : _a.icon) != null ? _a2 : "pi pi-file";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = __nuxt_component_0;
      const _component_BannerSlideshow = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "designer-page" }, _attrs))} data-v-0da78446>`);
      if (!__props.sections.length) {
        _push(`<div class="designer-empty" data-v-0da78446><i class="pi pi-palette" data-v-0da78446></i><p data-v-0da78446>This page uses the Site Designer but has no sections yet.</p><span data-v-0da78446>Add blocks in <strong data-v-0da78446>Admin \u2192 Designer \u2192 Build page</strong>.</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.sections, (slot, i) => {
        var _a;
        _push(`<!--[-->`);
        if (slot.kind === "widget") {
          _push(`<div class="designer-section" data-v-0da78446>${(_a = unref(renderSlotHtml)(slot)) != null ? _a : ""}</div>`);
        } else if (slot.kind === "content") {
          _push(`<div class="designer-section" data-v-0da78446>`);
          if (resolveContent(slot)) {
            _push(ssrRenderComponent(_component_ContentRenderer, {
              content: resolveContent(slot),
              "domain-id": unref(domainId),
              "show-title": true
            }, null, _parent));
          } else {
            _push(`<div class="designer-placeholder" data-v-0da78446><i class="${ssrRenderClass(slotMetaIcon(slot.contentType))}" data-v-0da78446></i><span data-v-0da78446>No ${ssrInterpolate(slotMetaLabel(slot.contentType))} content yet.</span></div>`);
          }
          _push(`</div>`);
        } else if (slot.kind === "banner") {
          _push(`<div class="designer-section" data-v-0da78446>`);
          if (unref(langBanners).length) {
            _push(ssrRenderComponent(_component_BannerSlideshow, { banners: unref(langBanners) }, null, _parent));
          } else {
            _push(`<div class="designer-placeholder" data-v-0da78446><i class="pi pi-image" data-v-0da78446></i><span data-v-0da78446>No banners published.</span></div>`);
          }
          _push(`</div>`);
        } else if (slot.kind === "social") {
          _push(`<div class="designer-section" data-v-0da78446>`);
          if (unref(socialMedia).length) {
            _push(`<div class="designer-social" data-v-0da78446><!--[-->`);
            ssrRenderList(unref(socialMedia), (s) => {
              _push(`<a${ssrRenderAttr("href", s.link)} target="_blank" rel="noopener" class="designer-social-link" data-v-0da78446><i class="${ssrRenderClass(unref(getSocialIcon)(s.stype))}" data-v-0da78446></i></a>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<div class="designer-placeholder" data-v-0da78446><i class="pi pi-share-alt" data-v-0da78446></i><span data-v-0da78446>No social links configured.</span></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/DesignerPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DesignerPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0da78446"]]);

export { CONTENT_TYPE_META as C, DESIGNER_PALETTE as D, FOOTER_ITEM_PALETTE as F, HOME_PAGE_KEY as H, __nuxt_component_0 as _, slotLabel as a, HEADER_ITEM_PALETTE as b, regionItemLabel as c, DesignerPage as d, menuIdToPageKey as m, regionItemIcon as r, slotIcon as s };
//# sourceMappingURL=DesignerPage-D2mvkQ8Q.mjs.map
