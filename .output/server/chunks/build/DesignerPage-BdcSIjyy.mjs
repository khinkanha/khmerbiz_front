import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList } from 'vue/server-renderer';
import { i as isKbWidgetType, c as createWidgetHtml } from './blockWidgets-C4vo-aO5.mjs';
import { _ as _export_sfc } from './server.mjs';

const DESIGNER_PALETTE = [
  {
    group: "Layout",
    items: [
      { type: "columns", label: "Columns", icon: "pi pi-table" },
      { type: "divider", label: "Divider", icon: "pi pi-minus" },
      { type: "spacer", label: "Spacer", icon: "pi pi-arrows-v" }
    ]
  },
  {
    group: "Content blocks",
    items: [
      { type: "card", label: "Card", icon: "pi pi-id-card" },
      { type: "callout", label: "Callout", icon: "pi pi-info-circle" },
      { type: "stats", label: "Stats", icon: "pi pi-chart-bar" },
      { type: "quote", label: "Quote", icon: "pi pi-comment" },
      { type: "accordion", label: "FAQ", icon: "pi pi-list" },
      { type: "checkbox", label: "Checklist", icon: "pi pi-check-square" },
      { type: "contact", label: "Contact info", icon: "pi pi-phone" }
    ]
  },
  {
    group: "Media",
    items: [
      { type: "image", label: "Image", icon: "pi pi-image" },
      { type: "gallery", label: "Gallery", icon: "pi pi-images" },
      { type: "video", label: "Video", icon: "pi pi-video" },
      { type: "icon", label: "Icon", icon: "pi pi-star" }
    ]
  },
  {
    group: "Action",
    items: [
      { type: "button", label: "Button", icon: "pi pi-share" }
    ]
  }
];
const ALL_PALETTE_TYPES = DESIGNER_PALETTE.flatMap((g) => g.items);
const slotLabel = (slot) => {
  var _a;
  if (slot.kind === "widget") {
    const found = ALL_PALETTE_TYPES.find((i) => i.type === slot.type);
    return (_a = found == null ? void 0 : found.label) != null ? _a : slot.type;
  }
  if (slot.kind === "content") return "Content section";
  return slot.kind;
};
const slotIcon = (slot) => {
  var _a2;
  var _a;
  if (slot.kind === "widget") {
    return (_a2 = (_a = ALL_PALETTE_TYPES.find((i) => i.type === slot.type)) == null ? void 0 : _a.icon) != null ? _a2 : "pi pi-th-large";
  }
  return "pi pi-file";
};
const renderSlotHtml = (slot) => {
  if (slot.kind === "widget" && isKbWidgetType(slot.type)) {
    return createWidgetHtml(slot.type, slot.payload);
  }
  return "";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DesignerPage",
  __ssrInlineRender: true,
  props: {
    sections: {},
    contentSections: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "designer-page" }, _attrs))} data-v-ab74a913>`);
      if (!__props.sections.length) {
        _push(`<div class="designer-empty" data-v-ab74a913><i class="pi pi-palette" data-v-ab74a913></i><p data-v-ab74a913>This page uses the Site Designer but has no sections yet.</p><span data-v-ab74a913>Add blocks in <strong data-v-ab74a913>Admin \u2192 Designer \u2192 Build page</strong>.</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.sections, (slot, i) => {
        var _a;
        _push(`<div class="designer-section" data-v-ab74a913>${(_a = unref(renderSlotHtml)(slot)) != null ? _a : ""}</div>`);
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
const DesignerPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ab74a913"]]);

export { DESIGNER_PALETTE as D, FOOTER_ITEM_PALETTE as F, HEADER_ITEM_PALETTE as H, slotLabel as a, regionItemLabel as b, DesignerPage as c, regionItemIcon as r, slotIcon as s };
//# sourceMappingURL=DesignerPage-BdcSIjyy.mjs.map
