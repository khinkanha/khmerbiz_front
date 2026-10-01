import { defineComponent, ref, computed, resolveComponent, mergeProps, unref, reactive, isRef, watch, withCtx, createVNode, openBlock, createBlock, Fragment, createTextVNode, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { u as useDesignStore, D as DESIGN_PRESETS, F as FONT_OPTIONS, d as defaultHeader, a as defaultFooter, b as designTokensToCssVars, T as THEME_PRESETS, P as PRESET_NAMES } from './BannerSlideshow-CCoIC11T.mjs';
import { _ as _export_sfc, b as useDomainStore, a as useAuthStore, u as useApi } from './server.mjs';
import { u as useMenuStore } from './menu-C2HnqT4z.mjs';
import { _ as __nuxt_component_2 } from './BlockWidgetDialog-C-LGs8vv.mjs';
import { m as menuIdToPageKey, H as HOME_PAGE_KEY, D as DESIGNER_PALETTE, s as slotIcon, a as slotLabel, b as HEADER_ITEM_PALETTE, r as regionItemIcon, c as regionItemLabel, F as FOOTER_ITEM_PALETTE, d as DesignerPage, C as CONTENT_TYPE_META } from './DesignerPage-DySTpaWy.mjs';
import { _ as __nuxt_component_0, a as __nuxt_component_3 } from './DesignerFooter-D5eKuilE.mjs';
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
import './MediaPicker-OJSdvCcK.mjs';
import './useUpload-CLutraF_.mjs';
import './ProductCatalog-ClMGtbUR.mjs';
import './nuxt-link-BKwuAYR2.mjs';
import './useNewsParser-BRh25yln.mjs';
import '@vue-leaflet/vue-leaflet';
import './content-KJHlnLiT.mjs';
import './blockWidgets-C4vo-aO5.mjs';

const useSiteDesigner = () => {
  const store = useDesignStore();
  const authStore = useAuthStore();
  const api = useApi();
  const design = computed(() => store.design);
  const style = computed(() => store.style);
  const homeSections = computed(() => store.homeSections);
  const currentSections = computed(() => store.currentSections);
  const currentPageKey = computed(() => store.currentPageKey);
  const designedPageKeys = computed(() => store.designedPageKeys);
  const homeHeader = computed(() => store.homeHeader);
  const homeFooter = computed(() => store.homeFooter);
  const loading = computed(() => store.loading);
  const saving = computed(() => store.saving);
  const dirty = computed(() => store.dirty);
  const canUndo = computed(() => store.canUndo);
  const canRedo = computed(() => store.canRedo);
  const domainId = computed(() => {
    var _a2;
    var _a;
    return (_a2 = (_a = authStore.user) == null ? void 0 : _a.domain_id) != null ? _a2 : null;
  });
  const init = async () => {
    await store.loadDesign(domainId.value);
  };
  const save = async () => {
    return store.saveDesign(domainId.value);
  };
  const activateHomepage = async () => {
    const res = await api.put("/settings/general", { page_style: 4 });
    return !!(res && res.success);
  };
  return {
    // reactive state (computeds = always reactive)
    design,
    style,
    homeSections,
    currentSections,
    currentPageKey,
    designedPageKeys,
    homeHeader,
    homeFooter,
    loading,
    saving,
    dirty,
    canUndo,
    canRedo,
    domainId,
    // lifecycle
    init,
    save,
    activateHomepage,
    undo: store.undo,
    redo: store.redo,
    // style tokens (Phase 1)
    updateStyle: (partial) => store.updateStyle(partial),
    setColor: (key, value) => store.setColor(key, value),
    applyPreset: (themeIndex) => store.applyPreset(themeIndex),
    applyDesignPreset: (preset) => store.applyDesignPreset(preset),
    resetStyle: () => store.resetStyle(),
    // page sections (Phase 2 + Pages)
    pageSections: (key) => store.pageSections(key),
    setCurrentPage: (key) => store.setCurrentPage(key),
    clearPage: (key) => store.clearPage(key),
    addSection: (slot) => store.addSection(slot),
    updateSection: (index2, slot) => store.updateSection(index2, slot),
    removeSection: (index2) => store.removeSection(index2),
    moveSection: (from, to) => store.moveSection(from, to),
    duplicateSection: (index2) => store.duplicateSection(index2),
    // header / footer (Phase 3)
    patchHeader: store.patchHeader,
    patchFooter: store.patchFooter
  };
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "StylePanel",
  __ssrInlineRender: true,
  setup(__props) {
    const { style, updateStyle, resetStyle } = useSiteDesigner();
    const presets = [0, 1, 2, 3, 4, 5].map((i) => ({ index: i, name: PRESET_NAMES[i], colors: THEME_PRESETS[i] }));
    const colorFields = [
      { key: "primary", label: "Primary" },
      { key: "primaryDark", label: "Primary dark" },
      { key: "background", label: "Background" },
      { key: "text", label: "Text" },
      { key: "navBackground", label: "Header background" },
      { key: "footerBackground", label: "Footer background" },
      { key: "cardBackground", label: "Card background" }
    ];
    const colorValue = (key) => {
      var _a2;
      var _a, _b;
      return (_a2 = (_b = (_a = style.value) == null ? void 0 : _a.colors) == null ? void 0 : _b[key]) != null ? _a2 : "#3b82f6";
    };
    const selectedPreset = computed(() => {
      var _a, _b;
      const primary = (_b = (_a = style.value) == null ? void 0 : _a.colors) == null ? void 0 : _b.primary;
      if (!primary) return 0;
      const found = presets.find((p) => p.colors.primary.toLowerCase() === primary.toLowerCase());
      return found ? found.index : -1;
    });
    const onFont = (which, value) => {
      var _a2;
      var _a;
      const fonts = { ...(_a2 = (_a = style.value) == null ? void 0 : _a.fonts) != null ? _a2 : { heading: "", body: "", baseSize: 16 } };
      fonts[which] = value;
      updateStyle({ fonts });
    };
    const onNumber = (key, value) => {
      var _a2;
      var _a;
      const n = Number(Array.isArray(value) ? value[0] : value);
      if (key === "baseSize") {
        const fonts = { ...(_a2 = (_a = style.value) == null ? void 0 : _a.fonts) != null ? _a2 : { heading: "", body: "", baseSize: 16 }, baseSize: n };
        updateStyle({ fonts });
      } else if (key === "radius") {
        updateStyle({ radius: n });
      } else {
        updateStyle({ spacing: n });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d2, _e2, _f2;
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Slider = resolveComponent("Slider");
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "style-panel" }, _attrs))} data-v-1efcf2a0><section class="group" data-v-1efcf2a0><h4 data-v-1efcf2a0>Start from a look</h4><div class="looks" data-v-1efcf2a0><!--[-->`);
      ssrRenderList(unref(DESIGN_PRESETS), (p) => {
        _push(`<button type="button" class="look" data-v-1efcf2a0><span class="look-swatches" data-v-1efcf2a0><span class="ls" style="${ssrRenderStyle({ background: p.colors.primary })}" data-v-1efcf2a0></span><span class="ls" style="${ssrRenderStyle({ background: p.colors.navBackground })}" data-v-1efcf2a0></span><span class="ls" style="${ssrRenderStyle({ background: p.colors.footerBackground })}" data-v-1efcf2a0></span></span><span class="look-name" data-v-1efcf2a0>${ssrInterpolate(p.name)}</span></button>`);
      });
      _push(`<!--]--></div><p class="hint" data-v-1efcf2a0>Applies coordinated colors, fonts and corner radius.</p></section><section class="group" data-v-1efcf2a0><h4 data-v-1efcf2a0>Color theme</h4><div class="presets" data-v-1efcf2a0><!--[-->`);
      ssrRenderList(unref(presets), (p) => {
        _push(`<button type="button" class="${ssrRenderClass([{ sel: unref(selectedPreset) === p.index }, "preset"])}" style="${ssrRenderStyle({ background: p.colors.primary })}"${ssrRenderAttr("title", p.name)} data-v-1efcf2a0></button>`);
      });
      _push(`<!--]--></div><p class="hint" data-v-1efcf2a0>Start from a preset, then fine-tune individual colors below.</p></section><section class="group" data-v-1efcf2a0><h4 data-v-1efcf2a0>Colors</h4><!--[-->`);
      ssrRenderList(colorFields, (f) => {
        _push(`<div class="color-field" data-v-1efcf2a0><label data-v-1efcf2a0>${ssrInterpolate(f.label)}</label><div class="color-row" data-v-1efcf2a0><input type="color" class="swatch"${ssrRenderAttr("value", colorValue(f.key))} data-v-1efcf2a0><input type="text" class="hex"${ssrRenderAttr("value", colorValue(f.key))} data-v-1efcf2a0></div></div>`);
      });
      _push(`<!--]--></section><section class="group" data-v-1efcf2a0><h4 data-v-1efcf2a0>Typography</h4><div class="field" data-v-1efcf2a0><label data-v-1efcf2a0>Heading font</label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        modelValue: (_b = (_a = unref(style)) == null ? void 0 : _a.fonts) == null ? void 0 : _b.heading,
        options: unref(FONT_OPTIONS),
        optionLabel: "label",
        optionValue: "value",
        "onUpdate:modelValue": ($event) => onFont("heading", $event)
      }, null, _parent));
      _push(`</div><div class="field" data-v-1efcf2a0><label data-v-1efcf2a0>Body font</label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        modelValue: (_d = (_c = unref(style)) == null ? void 0 : _c.fonts) == null ? void 0 : _d.body,
        options: unref(FONT_OPTIONS),
        optionLabel: "label",
        optionValue: "value",
        "onUpdate:modelValue": ($event) => onFont("body", $event)
      }, null, _parent));
      _push(`</div><div class="field" data-v-1efcf2a0><label data-v-1efcf2a0>Base size <span class="pill" data-v-1efcf2a0>${ssrInterpolate((_a2 = (_f = (_e = unref(style)) == null ? void 0 : _e.fonts) == null ? void 0 : _f.baseSize) != null ? _a2 : 16)}px</span></label>`);
      _push(ssrRenderComponent(_component_Slider, {
        modelValue: (_b2 = (_h = (_g = unref(style)) == null ? void 0 : _g.fonts) == null ? void 0 : _h.baseSize) != null ? _b2 : 16,
        min: 13,
        max: 20,
        step: 1,
        "onUpdate:modelValue": ($event) => onNumber("baseSize", $event)
      }, null, _parent));
      _push(`</div></section><section class="group" data-v-1efcf2a0><h4 data-v-1efcf2a0>Shape</h4><div class="field" data-v-1efcf2a0><label data-v-1efcf2a0>Corner radius <span class="pill" data-v-1efcf2a0>${ssrInterpolate((_c2 = (_i = unref(style)) == null ? void 0 : _i.radius) != null ? _c2 : 10)}px</span></label>`);
      _push(ssrRenderComponent(_component_Slider, {
        modelValue: (_d2 = (_j = unref(style)) == null ? void 0 : _j.radius) != null ? _d2 : 10,
        min: 0,
        max: 24,
        step: 1,
        "onUpdate:modelValue": ($event) => onNumber("radius", $event)
      }, null, _parent));
      _push(`</div><div class="field" data-v-1efcf2a0><label data-v-1efcf2a0>Section spacing <span class="pill" data-v-1efcf2a0>${ssrInterpolate((_e2 = (_k = unref(style)) == null ? void 0 : _k.spacing) != null ? _e2 : 16)}px</span></label>`);
      _push(ssrRenderComponent(_component_Slider, {
        modelValue: (_f2 = (_l = unref(style)) == null ? void 0 : _l.spacing) != null ? _f2 : 16,
        min: 8,
        max: 48,
        step: 2,
        "onUpdate:modelValue": ($event) => onNumber("spacing", $event)
      }, null, _parent));
      _push(`</div></section><div class="actions" data-v-1efcf2a0>`);
      _push(ssrRenderComponent(_component_Button, {
        label: "Reset to theme",
        severity: "secondary",
        size: "small",
        outlined: "",
        onClick: unref(resetStyle)
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/designer/StylePanel.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const StylePanel = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-1efcf2a0"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ContentSlotDialog",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    contentType: {},
    menuId: {}
  },
  emits: ["update:visible", "save", "delete"],
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const emit = __emit;
    const local = reactive({
      contentType: props.contentType,
      mode: props.menuId !== void 0 ? "menu" : "auto",
      menuId: (_a = props.menuId) != null ? _a : null
    });
    watch(
      () => props.visible,
      (open) => {
        var _a2;
        if (open) {
          local.contentType = props.contentType;
          local.mode = props.menuId !== void 0 ? "menu" : "auto";
          local.menuId = (_a2 = props.menuId) != null ? _a2 : null;
        }
      }
    );
    const typeOptions = computed(
      () => Object.entries(CONTENT_TYPE_META).map(([k, v]) => ({ label: v.label, value: Number(k) }))
    );
    const menuStore = useMenuStore();
    const menuLoading = ref(false);
    const flattenLeaves = (items, acc = [], depth = 0) => {
      for (const it of items) {
        const hasChildren = it.children && it.children.length > 0;
        if (!hasChildren) {
          acc.push({ item_id: it.item_id, item_name: it.item_name, content_type: it.content_type });
        }
        if (hasChildren) flattenLeaves(it.children, acc, depth + 1);
      }
      return acc;
    };
    const menuOptions = computed(() => {
      var _a2;
      const leaves = flattenLeaves((_a2 = menuStore.menuTree) != null ? _a2 : []);
      const matching = leaves.filter((m) => m.content_type === local.contentType);
      const list = matching.length ? matching : leaves;
      return list.map((m) => ({
        label: `${m.item_name || "Untitled"}${m.content_type !== void 0 && CONTENT_TYPE_META[m.content_type] ? ` \xB7 ${CONTENT_TYPE_META[m.content_type].label}` : ""}`,
        value: m.item_id
      }));
    });
    const canSave = computed(() => {
      if (local.mode === "menu") return local.menuId !== null;
      return true;
    });
    const loadMenus = async () => {
      menuLoading.value = true;
      try {
        await menuStore.fetchAllMenuTree();
      } finally {
        menuLoading.value = false;
      }
    };
    watch(
      () => props.visible,
      (open) => {
        if (open && !menuStore.menuTree.length) loadMenus();
      }
    );
    const onSave = () => {
      const payload = { contentType: local.contentType };
      if (local.mode === "menu" && local.menuId !== null) payload.menuId = local.menuId;
      emit("save", payload);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = resolveComponent("Dialog");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Button = resolveComponent("Button");
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: __props.visible,
        modal: "",
        draggable: false,
        header: "Content section",
        style: { width: "480px" },
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event)
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              label: "Delete",
              icon: "pi pi-trash",
              severity: "danger",
              text: "",
              onClick: ($event) => _ctx.$emit("delete")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: "Cancel",
              text: "",
              onClick: ($event) => _ctx.$emit("update:visible", false)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: "Save",
              icon: "pi pi-check",
              disabled: !unref(canSave),
              onClick: onSave
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                label: "Delete",
                icon: "pi pi-trash",
                severity: "danger",
                text: "",
                onClick: ($event) => _ctx.$emit("delete")
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                label: "Cancel",
                text: "",
                onClick: ($event) => _ctx.$emit("update:visible", false)
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                label: "Save",
                icon: "pi pi-check",
                disabled: !unref(canSave),
                onClick: onSave
              }, null, 8, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="csd-body" data-v-ec3f8151${_scopeId}><div class="field" data-v-ec3f8151${_scopeId}><label data-v-ec3f8151${_scopeId}>Content type</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              modelValue: unref(local).contentType,
              "onUpdate:modelValue": ($event) => unref(local).contentType = $event,
              options: unref(typeOptions),
              "option-label": "label",
              "option-value": "value",
              placeholder: "Select a content type",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="field" data-v-ec3f8151${_scopeId}><label data-v-ec3f8151${_scopeId}>Source</label><div class="seg" data-v-ec3f8151${_scopeId}><button type="button" class="${ssrRenderClass([{ on: unref(local).mode === "auto" }, "seg-btn"])}" data-v-ec3f8151${_scopeId}> Auto </button><button type="button" class="${ssrRenderClass([{ on: unref(local).mode === "menu" }, "seg-btn"])}" data-v-ec3f8151${_scopeId}> Specific menu </button></div><p class="hint" data-v-ec3f8151${_scopeId}>`);
            if (unref(local).mode === "auto") {
              _push2(`<!--[--> Shows the first published content of this type \u2014 re-resolved per language. <!--]-->`);
            } else {
              _push2(`<!--[--> Bind this section to one menu item&#39;s content (re-resolved per language). <!--]-->`);
            }
            _push2(`</p>`);
            if (unref(local).mode === "menu") {
              _push2(ssrRenderComponent(_component_Dropdown, {
                modelValue: unref(local).menuId,
                "onUpdate:modelValue": ($event) => unref(local).menuId = $event,
                options: unref(menuOptions),
                "option-label": "label",
                "option-value": "value",
                placeholder: unref(menuLoading) ? "Loading menus\u2026" : "Choose a menu item",
                loading: unref(menuLoading),
                filter: "",
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else if (unref(local).mode === "menu" && !unref(menuOptions).length && !unref(menuLoading)) {
              _push2(`<p class="hint warn" data-v-ec3f8151${_scopeId}> No menu items found for this type yet. </p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "csd-body" }, [
                createVNode("div", { class: "field" }, [
                  createVNode("label", null, "Content type"),
                  createVNode(_component_Dropdown, {
                    modelValue: unref(local).contentType,
                    "onUpdate:modelValue": ($event) => unref(local).contentType = $event,
                    options: unref(typeOptions),
                    "option-label": "label",
                    "option-value": "value",
                    placeholder: "Select a content type",
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "field" }, [
                  createVNode("label", null, "Source"),
                  createVNode("div", { class: "seg" }, [
                    createVNode("button", {
                      type: "button",
                      class: ["seg-btn", { on: unref(local).mode === "auto" }],
                      onClick: ($event) => unref(local).mode = "auto"
                    }, " Auto ", 10, ["onClick"]),
                    createVNode("button", {
                      type: "button",
                      class: ["seg-btn", { on: unref(local).mode === "menu" }],
                      onClick: ($event) => unref(local).mode = "menu"
                    }, " Specific menu ", 10, ["onClick"])
                  ]),
                  createVNode("p", { class: "hint" }, [
                    unref(local).mode === "auto" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(" Shows the first published content of this type \u2014 re-resolved per language. ")
                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createTextVNode(" Bind this section to one menu item's content (re-resolved per language). ")
                    ], 64))
                  ]),
                  unref(local).mode === "menu" ? (openBlock(), createBlock(_component_Dropdown, {
                    key: 0,
                    modelValue: unref(local).menuId,
                    "onUpdate:modelValue": ($event) => unref(local).menuId = $event,
                    options: unref(menuOptions),
                    "option-label": "label",
                    "option-value": "value",
                    placeholder: unref(menuLoading) ? "Loading menus\u2026" : "Choose a menu item",
                    loading: unref(menuLoading),
                    filter: "",
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder", "loading"])) : unref(local).mode === "menu" && !unref(menuOptions).length && !unref(menuLoading) ? (openBlock(), createBlock("p", {
                    key: 1,
                    class: "hint warn"
                  }, " No menu items found for this type yet. ")) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/designer/ContentSlotDialog.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ContentSlotDialog = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-ec3f8151"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BuildPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      currentSections,
      currentPageKey,
      updateSection,
      removeSection,
      duplicateSection,
      setCurrentPage,
      save,
      activateHomepage
    } = useSiteDesigner();
    const menuStore = useMenuStore();
    const sections = currentSections;
    const flattenLeaves = (items, acc = []) => {
      for (const it of items) {
        if (it.children && it.children.length > 0) flattenLeaves(it.children, acc);
        else acc.push(it);
      }
      return acc;
    };
    const pageOptions = computed(() => {
      var _a;
      const leaves = flattenLeaves((_a = menuStore.menuTree) != null ? _a : []);
      const opts = [
        { label: "Home", value: HOME_PAGE_KEY }
      ];
      const seen = /* @__PURE__ */ new Set([HOME_PAGE_KEY]);
      for (const m of leaves) {
        const key = menuIdToPageKey(m.item_id);
        if (seen.has(key)) continue;
        seen.add(key);
        opts.push({ label: m.item_name || `Menu #${m.item_id}`, value: key });
      }
      return opts;
    });
    const onSelectPage = (key) => setCurrentPage(key);
    ref(null);
    const dragIndex = ref(null);
    const dragOverIndex = ref(null);
    const isEditable = (slot) => slot.kind === "widget" || slot.kind === "content";
    const widgetDialog = ref(false);
    const widgetType = ref(null);
    const widgetData = ref({});
    const widgetEditIndex = ref(null);
    const contentDialog = ref(false);
    const contentEdit = reactive({
      index: null,
      contentType: 0,
      menuId: void 0
    });
    const onWidgetSave = (data) => {
      if (widgetEditIndex.value === null || !widgetType.value) return;
      const slot = { kind: "widget", type: widgetType.value, payload: data };
      updateSection(widgetEditIndex.value, slot);
      widgetDialog.value = false;
      widgetEditIndex.value = null;
    };
    const onContentSave = (payload) => {
      if (contentEdit.index === null) return;
      const slot = { kind: "content", contentType: payload.contentType };
      if (payload.menuId !== void 0) slot.menuId = payload.menuId;
      updateSection(contentEdit.index, slot);
      contentDialog.value = false;
      contentEdit.index = null;
    };
    const onWidgetDelete = () => {
      if (widgetEditIndex.value !== null) removeSection(widgetEditIndex.value);
      widgetDialog.value = false;
      widgetEditIndex.value = null;
    };
    const onDialogDelete = () => {
      if (contentEdit.index !== null) removeSection(contentEdit.index);
      contentDialog.value = false;
      contentEdit.index = null;
    };
    const onDialogDuplicate = () => {
      if (widgetEditIndex.value !== null) duplicateSection(widgetEditIndex.value);
    };
    const activating = ref(false);
    const onActivate = async () => {
      activating.value = true;
      await save();
      await activateHomepage();
      activating.value = false;
      activatedMsg.value = true;
      setTimeout(() => activatedMsg.value = false, 4e3);
    };
    const activatedMsg = ref(false);
    const menuNameFor = (menuId) => {
      var _a, _b;
      const find = (items) => {
        var _a2;
        for (const it of items) {
          if (it.item_id === menuId) return it;
          if ((_a2 = it.children) == null ? void 0 : _a2.length) {
            const c = find(it.children);
            if (c) return c;
          }
        }
        return null;
      };
      const m = find((_a = menuStore.menuTree) != null ? _a : []);
      return (_b = m == null ? void 0 : m.item_name) != null ? _b : null;
    };
    const excerpt = (slot) => {
      var _a2;
      var _a;
      if (slot.kind === "widget") {
        const p = slot.payload || {};
        if (typeof p.title === "string" && p.title) return p.title;
        if (Array.isArray(p.items) && p.items.length) return `${p.items.length} items`;
        if (typeof p.text === "string" && p.text) return p.text.slice(0, 60);
        if (typeof p.label === "string" && p.label) return p.label;
        return "Empty \u2014 click to edit";
      }
      if (slot.kind === "content") {
        const typeLabel = (_a2 = (_a = CONTENT_TYPE_META[slot.contentType]) == null ? void 0 : _a.label) != null ? _a2 : "content";
        if (slot.menuId !== void 0) {
          const name = menuNameFor(slot.menuId);
          return name ? `${typeLabel} \xB7 ${name}` : `${typeLabel} \xB7 menu #${slot.menuId}`;
        }
        return `${typeLabel} \xB7 auto`;
      }
      return slot.kind === "banner" ? "Tenant banners" : "Tenant social links";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "build-panel" }, _attrs))} data-v-c4bbed02><div class="palette-col" data-v-c4bbed02><h4 class="col-title" data-v-c4bbed02>Add a block</h4><p class="col-hint" data-v-c4bbed02>Click a block to add it, then edit its content.</p><!--[-->`);
      ssrRenderList(unref(DESIGNER_PALETTE), (g) => {
        _push(`<div class="palette-group" data-v-c4bbed02><div class="palette-group-title" data-v-c4bbed02>${ssrInterpolate(g.group)}</div><div class="palette-grid" data-v-c4bbed02><!--[-->`);
        ssrRenderList(g.items, (item) => {
          _push(`<button type="button" class="palette-tile" draggable="true" data-v-c4bbed02><i class="${ssrRenderClass(item.icon)}" data-v-c4bbed02></i><span data-v-c4bbed02>${ssrInterpolate(item.label)}</span></button>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div><div class="canvas-col" data-v-c4bbed02><div class="canvas-head" data-v-c4bbed02><div class="page-picker" data-v-c4bbed02><span class="editing-label" data-v-c4bbed02>Editing:</span>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        "model-value": unref(currentPageKey),
        options: unref(pageOptions),
        "option-label": "label",
        "option-value": "value",
        class: "page-select",
        "onUpdate:modelValue": onSelectPage
      }, null, _parent));
      _push(`</div><div class="canvas-actions" data-v-c4bbed02>`);
      _push(ssrRenderComponent(_component_Button, {
        label: "Set as homepage",
        icon: "pi pi-home",
        size: "small",
        loading: unref(activating),
        onClick: onActivate
      }, null, _parent));
      _push(`</div></div>`);
      if (!unref(sections).length) {
        _push(`<div class="empty-canvas" data-v-c4bbed02><i class="pi pi-th-large" data-v-c4bbed02></i><p data-v-c4bbed02>${ssrInterpolate(unref(currentPageKey) === "home" ? "Your homepage is empty." : "This page is empty.")}</p><span data-v-c4bbed02>Click or drag a block from the left to start.</span></div>`);
      } else {
        _push(`<ul class="section-list" data-v-c4bbed02><!--[-->`);
        ssrRenderList(unref(sections), (slot, i) => {
          _push(`<li class="${ssrRenderClass([{ dragover: unref(dragOverIndex) === i, dragging: unref(dragIndex) === i }, "section-row"])}" draggable="true" data-v-c4bbed02><div class="row-grip" data-v-c4bbed02><i class="pi pi-bars" data-v-c4bbed02></i></div><div class="row-icon" data-v-c4bbed02><i class="${ssrRenderClass(unref(slotIcon)(slot))}" data-v-c4bbed02></i></div><div class="row-label" data-v-c4bbed02><strong data-v-c4bbed02>${ssrInterpolate(unref(slotLabel)(slot))}</strong><span class="row-sub" data-v-c4bbed02>${ssrInterpolate(excerpt(slot))}</span></div><div class="row-tools" data-v-c4bbed02><button class="tool" title="Move up"${ssrIncludeBooleanAttr(i === 0) ? " disabled" : ""} data-v-c4bbed02><i class="pi pi-arrow-up" data-v-c4bbed02></i></button><button class="tool" title="Move down"${ssrIncludeBooleanAttr(i === unref(sections).length - 1) ? " disabled" : ""} data-v-c4bbed02><i class="pi pi-arrow-down" data-v-c4bbed02></i></button><button class="${ssrRenderClass([{ muted: !isEditable(slot) }, "tool"])}"${ssrRenderAttr("title", isEditable(slot) ? "Edit" : "No settings")}${ssrIncludeBooleanAttr(!isEditable(slot)) ? " disabled" : ""} data-v-c4bbed02><i class="pi pi-pencil" data-v-c4bbed02></i></button><button class="tool" title="Duplicate" data-v-c4bbed02><i class="pi pi-clone" data-v-c4bbed02></i></button><button class="tool danger" title="Delete" data-v-c4bbed02><i class="pi pi-trash" data-v-c4bbed02></i></button></div></li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`<p class="canvas-foot" data-v-c4bbed02> Drag rows to reorder, or use the arrows. Banner and social blocks need no editing \u2014 they show the tenant&#39;s published banners / social links. Content blocks bind to a menu item. Click <strong data-v-c4bbed02>Set as homepage</strong> to make this layout live. </p></div>`);
      _push(ssrRenderComponent(__nuxt_component_2, {
        visible: unref(widgetDialog),
        "onUpdate:visible": ($event) => isRef(widgetDialog) ? widgetDialog.value = $event : null,
        type: unref(widgetType),
        data: unref(widgetData),
        onSave: onWidgetSave,
        onDelete: onWidgetDelete,
        onDuplicate: onDialogDuplicate
      }, null, _parent));
      _push(ssrRenderComponent(ContentSlotDialog, {
        visible: unref(contentDialog),
        "onUpdate:visible": ($event) => isRef(contentDialog) ? contentDialog.value = $event : null,
        "content-type": unref(contentEdit).contentType,
        "menu-id": unref(contentEdit).menuId,
        onSave: onContentSave,
        onDelete: onDialogDelete
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/designer/BuildPanel.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const BuildPanel = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-c4bbed02"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "HeaderPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const { homeHeader, patchHeader } = useSiteDesigner();
    const header = computed(() => {
      var _a;
      return (_a = homeHeader.value) != null ? _a : defaultHeader();
    });
    const REGION_IDS = ["left", "center", "right"];
    const targetRegion = ref("left");
    const regionItems = (id) => {
      var _a2;
      var _a;
      return (_a2 = (_a = header.value.regions.find((r) => r.id === id)) == null ? void 0 : _a.items) != null ? _a2 : [];
    };
    const setPayload = (regionId, idx, key, value) => patchHeader((h) => {
      var _a;
      const it = (_a = h.regions.find((x) => x.id === regionId)) == null ? void 0 : _a.items[idx];
      if (it) it.payload = { ...it.payload || {}, [key]: value };
    });
    ref(null);
    const overRegion = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputText = resolveComponent("InputText");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hf-panel" }, _attrs))} data-v-5fac63cd><div class="palette" data-v-5fac63cd><span class="palette-label" data-v-5fac63cd>Add to:</span><div class="seg" data-v-5fac63cd><!--[-->`);
      ssrRenderList(REGION_IDS, (r) => {
        _push(`<button class="${ssrRenderClass([{ on: unref(targetRegion) === r }, "seg-btn"])}" data-v-5fac63cd>${ssrInterpolate(r)}</button>`);
      });
      _push(`<!--]--></div><div class="palette-items" data-v-5fac63cd><!--[-->`);
      ssrRenderList(unref(HEADER_ITEM_PALETTE), (p) => {
        _push(`<button type="button" class="palette-tile" draggable="true" data-v-5fac63cd><i class="${ssrRenderClass(p.icon)}" data-v-5fac63cd></i><span data-v-5fac63cd>${ssrInterpolate(p.label)}</span></button>`);
      });
      _push(`<!--]--></div><p class="hint" data-v-5fac63cd>Click to add to \u201C${ssrInterpolate(unref(targetRegion))}\u201D, or drag a tile onto a region below.</p></div><div class="regions" data-v-5fac63cd><!--[-->`);
      ssrRenderList(REGION_IDS, (rid) => {
        _push(`<div class="${ssrRenderClass([{ over: unref(overRegion) === rid }, "region"])}" data-v-5fac63cd><div class="region-head" data-v-5fac63cd>${ssrInterpolate(rid)}</div>`);
        if (!regionItems(rid).length) {
          _push(`<div class="region-empty" data-v-5fac63cd>Empty \u2014 drop items here</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(regionItems(rid), (item, idx) => {
          var _a, _b;
          _push(`<div class="item" data-v-5fac63cd><div class="item-top" data-v-5fac63cd><i class="${ssrRenderClass(unref(regionItemIcon)(item))}" data-v-5fac63cd></i><span class="item-label" data-v-5fac63cd>${ssrInterpolate(unref(regionItemLabel)(item))}</span><div class="item-tools" data-v-5fac63cd><button class="tool"${ssrIncludeBooleanAttr(idx === 0) ? " disabled" : ""} data-v-5fac63cd><i class="pi pi-arrow-up" data-v-5fac63cd></i></button><button class="tool"${ssrIncludeBooleanAttr(idx === regionItems(rid).length - 1) ? " disabled" : ""} data-v-5fac63cd><i class="pi pi-arrow-down" data-v-5fac63cd></i></button><button class="tool danger" data-v-5fac63cd><i class="pi pi-times" data-v-5fac63cd></i></button></div></div>`);
          if (item.type === "text") {
            _push(ssrRenderComponent(_component_InputText, {
              class: "item-input",
              value: (_a = item.payload) == null ? void 0 : _a.text,
              placeholder: "Text",
              "onUpdate:modelValue": ($event) => setPayload(rid, idx, "text", $event)
            }, null, _parent));
          } else if (item.type === "image") {
            _push(ssrRenderComponent(_component_InputText, {
              class: "item-input",
              value: (_b = item.payload) == null ? void 0 : _b.url,
              placeholder: "Image URL",
              "onUpdate:modelValue": ($event) => setPayload(rid, idx, "url", $event)
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/designer/HeaderPanel.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const HeaderPanel = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-5fac63cd"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FooterPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const { homeFooter, patchFooter } = useSiteDesigner();
    const footer = computed(() => {
      var _a;
      return (_a = homeFooter.value) != null ? _a : defaultFooter();
    });
    const colCount = computed(() => footer.value.columns.length || 1);
    const targetCol = ref(0);
    const setPayload = (ci, idx, key, value) => patchFooter((f) => {
      var _a;
      const it = (_a = f.columns[ci]) == null ? void 0 : _a.items[idx];
      if (it) it.payload = { ...it.payload || {}, [key]: value };
    });
    ref(null);
    const overCol = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputText = resolveComponent("InputText");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hf-panel" }, _attrs))} data-v-171a7b12><div class="palette" data-v-171a7b12><div class="palette-row" data-v-171a7b12><span class="palette-label" data-v-171a7b12>Columns:</span><div class="seg" data-v-171a7b12><!--[-->`);
      ssrRenderList(4, (n) => {
        _push(`<button class="${ssrRenderClass([{ on: unref(colCount) === n }, "seg-btn"])}" data-v-171a7b12>${ssrInterpolate(n)}</button>`);
      });
      _push(`<!--]--></div><span class="palette-label" style="${ssrRenderStyle({ "margin-left": "14px" })}" data-v-171a7b12>Add to col:</span><div class="seg" data-v-171a7b12><!--[-->`);
      ssrRenderList(unref(colCount), (n) => {
        _push(`<button class="${ssrRenderClass([{ on: unref(targetCol) === n - 1 }, "seg-btn"])}" data-v-171a7b12>${ssrInterpolate(n)}</button>`);
      });
      _push(`<!--]--></div></div><div class="palette-items" data-v-171a7b12><!--[-->`);
      ssrRenderList(unref(FOOTER_ITEM_PALETTE), (p) => {
        _push(`<button type="button" class="palette-tile" draggable="true" data-v-171a7b12><i class="${ssrRenderClass(p.icon)}" data-v-171a7b12></i><span data-v-171a7b12>${ssrInterpolate(p.label)}</span></button>`);
      });
      _push(`<!--]--></div><p class="hint" data-v-171a7b12>Click to add to column ${ssrInterpolate(unref(targetCol) + 1)}, or drag a tile onto a column.</p></div><div class="columns" style="${ssrRenderStyle({ gridTemplateColumns: "repeat(" + unref(colCount) + ", 1fr)" })}" data-v-171a7b12><!--[-->`);
      ssrRenderList(unref(footer).columns, (col, ci) => {
        _push(`<div class="${ssrRenderClass([{ over: unref(overCol) === ci }, "column"])}" data-v-171a7b12><div class="column-head" data-v-171a7b12>Column ${ssrInterpolate(ci + 1)}</div>`);
        if (!col.items.length) {
          _push(`<div class="column-empty" data-v-171a7b12>Empty \u2014 drop items here</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(col.items, (item, idx) => {
          var _a, _b, _c, _d, _e;
          _push(`<div class="item" data-v-171a7b12><div class="item-top" data-v-171a7b12><i class="${ssrRenderClass(unref(regionItemIcon)(item))}" data-v-171a7b12></i><span class="item-label" data-v-171a7b12>${ssrInterpolate(unref(regionItemLabel)(item))}</span><div class="item-tools" data-v-171a7b12><button class="tool"${ssrIncludeBooleanAttr(idx === 0) ? " disabled" : ""} data-v-171a7b12><i class="pi pi-arrow-up" data-v-171a7b12></i></button><button class="tool"${ssrIncludeBooleanAttr(idx === col.items.length - 1) ? " disabled" : ""} data-v-171a7b12><i class="pi pi-arrow-down" data-v-171a7b12></i></button><button class="tool danger" data-v-171a7b12><i class="pi pi-times" data-v-171a7b12></i></button></div></div>`);
          if (item.type === "text") {
            _push(ssrRenderComponent(_component_InputText, {
              class: "item-input",
              value: (_a = item.payload) == null ? void 0 : _a.text,
              placeholder: "Text",
              "onUpdate:modelValue": ($event) => setPayload(ci, idx, "text", $event)
            }, null, _parent));
          } else if (item.type === "image") {
            _push(ssrRenderComponent(_component_InputText, {
              class: "item-input",
              value: (_b = item.payload) == null ? void 0 : _b.url,
              placeholder: "Image URL",
              "onUpdate:modelValue": ($event) => setPayload(ci, idx, "url", $event)
            }, null, _parent));
          } else if (item.type === "contact") {
            _push(`<!--[-->`);
            _push(ssrRenderComponent(_component_InputText, {
              class: "item-input",
              value: (_c = item.payload) == null ? void 0 : _c.phone,
              placeholder: "Phone",
              "onUpdate:modelValue": ($event) => setPayload(ci, idx, "phone", $event)
            }, null, _parent));
            _push(ssrRenderComponent(_component_InputText, {
              class: "item-input",
              value: (_d = item.payload) == null ? void 0 : _d.email,
              placeholder: "Email",
              "onUpdate:modelValue": ($event) => setPayload(ci, idx, "email", $event)
            }, null, _parent));
            _push(ssrRenderComponent(_component_InputText, {
              class: "item-input",
              value: (_e = item.payload) == null ? void 0 : _e.address,
              placeholder: "Address",
              "onUpdate:modelValue": ($event) => setPayload(ci, idx, "address", $event)
            }, null, _parent));
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/designer/FooterPanel.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const FooterPanel = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-171a7b12"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PreviewPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentSections, style } = useSiteDesigner();
    const domainStore = useDomainStore();
    const device = ref("desktop");
    const deviceClass = computed(() => `dp-${device.value}`);
    const themeClass = computed(() => {
      var _a2;
      var _a;
      return `theme-${(_a2 = (_a = domainStore.settings) == null ? void 0 : _a.theme) != null ? _a2 : 0}`;
    });
    const tokenStyle = computed(() => designTokensToCssVars(style.value));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "preview-panel" }, _attrs))} data-v-4e78bc2e><div class="preview-bar" data-v-4e78bc2e><b data-v-4e78bc2e>Live preview</b><div class="seg" data-v-4e78bc2e><button class="${ssrRenderClass({ on: unref(device) === "desktop" })}" title="Desktop" data-v-4e78bc2e><i class="pi pi-desktop" data-v-4e78bc2e></i></button><button class="${ssrRenderClass({ on: unref(device) === "tablet" })}" title="Tablet" data-v-4e78bc2e><i class="pi pi-tablet" data-v-4e78bc2e></i></button><button class="${ssrRenderClass({ on: unref(device) === "mobile" })}" title="Mobile" data-v-4e78bc2e><i class="pi pi-mobile" data-v-4e78bc2e></i></button></div><span class="hint" data-v-4e78bc2e>Updates live as you edit \u2014 Save to publish.</span></div><div class="preview-scroll" data-v-4e78bc2e><div class="${ssrRenderClass([[unref(deviceClass), unref(themeClass)], "dp-stage"])}" style="${ssrRenderStyle(unref(tokenStyle))}" data-v-4e78bc2e>`);
      _push(ssrRenderComponent(__nuxt_component_0, null, null, _parent));
      _push(`<main class="dp-main" data-v-4e78bc2e>`);
      _push(ssrRenderComponent(DesignerPage, { sections: unref(currentSections) }, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(__nuxt_component_3, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/designer/PreviewPanel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PreviewPanel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-4e78bc2e"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PagesPanel",
  __ssrInlineRender: true,
  emits: ["navigate"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { designedPageKeys, setCurrentPage, clearPage } = useSiteDesigner();
    const menuStore = useMenuStore();
    const flattenLeaves = (items, acc = []) => {
      for (const it of items) {
        if (it.children && it.children.length > 0) flattenLeaves(it.children, acc);
        else acc.push(it);
      }
      return acc;
    };
    const domainId = computed(() => {
      var _a2;
      var _a, _b;
      return (_a2 = (_b = (_a = menuStore.menuTree) == null ? void 0 : _a[0]) == null ? void 0 : _b.domain_id) != null ? _a2 : 1;
    });
    const menuPages = computed(() => {
      var _a;
      const leaves = flattenLeaves((_a = menuStore.menuTree) != null ? _a : []);
      const seen = /* @__PURE__ */ new Set();
      const out = [];
      for (const m of leaves) {
        const key = menuIdToPageKey(m.item_id);
        if (key === HOME_PAGE_KEY || seen.has(key)) continue;
        seen.add(key);
        out.push({ key, label: m.item_name || `Menu #${m.item_id}`, url: `/pages/${domainId.value}/${m.item_id}` });
      }
      return out;
    });
    const isDesigned = (key) => designedPageKeys.value.includes(key);
    const goEdit = (key) => {
      setCurrentPage(key);
      emit("navigate", "build");
    };
    const onClear = (key) => {
      const page = menuPages.value.find((p) => p.key === key);
      const name = page ? page.label : `page ${key}`;
      if ((void 0).confirm(`Clear the custom design for "${name}"? This page will fall back to the default theme.`)) {
        clearPage(key);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pages-panel" }, _attrs))} data-v-e92a5b8d><p class="intro" data-v-e92a5b8d> Each menu page can either use the default theme or a custom layout you design here. Switch the <strong data-v-e92a5b8d>Build page</strong> tab to edit a page&#39;s sections. Designed pages take over only when the Designer template is active (page_style 4). </p><ul class="page-list" data-v-e92a5b8d><li class="page-row" data-v-e92a5b8d><div class="page-icon" data-v-e92a5b8d><i class="pi pi-home" data-v-e92a5b8d></i></div><div class="page-info" data-v-e92a5b8d><strong data-v-e92a5b8d>Home</strong><span class="page-url" data-v-e92a5b8d>The site homepage</span></div><span class="${ssrRenderClass([isDesigned(unref(HOME_PAGE_KEY)) ? "on" : "", "badge"])}" data-v-e92a5b8d>${ssrInterpolate(isDesigned(unref(HOME_PAGE_KEY)) ? "Designed" : "Default")}</span><div class="page-tools" data-v-e92a5b8d>`);
      _push(ssrRenderComponent(_component_Button, {
        label: "Edit",
        icon: "pi pi-pencil",
        size: "small",
        severity: "secondary",
        onClick: ($event) => goEdit(unref(HOME_PAGE_KEY))
      }, null, _parent));
      if (isDesigned(unref(HOME_PAGE_KEY))) {
        _push(ssrRenderComponent(_component_Button, {
          label: "Clear",
          icon: "pi pi-times",
          size: "small",
          severity: "danger",
          text: "",
          onClick: ($event) => onClear(unref(HOME_PAGE_KEY))
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></li><!--[-->`);
      ssrRenderList(unref(menuPages), (p) => {
        _push(`<li class="page-row" data-v-e92a5b8d><div class="page-icon" data-v-e92a5b8d><i class="pi pi-file" data-v-e92a5b8d></i></div><div class="page-info" data-v-e92a5b8d><strong data-v-e92a5b8d>${ssrInterpolate(p.label)}</strong><span class="page-url" data-v-e92a5b8d>${ssrInterpolate(p.url)}</span></div><span class="${ssrRenderClass([isDesigned(p.key) ? "on" : "", "badge"])}" data-v-e92a5b8d>${ssrInterpolate(isDesigned(p.key) ? "Designed" : "Default")}</span><div class="page-tools" data-v-e92a5b8d>`);
        _push(ssrRenderComponent(_component_Button, {
          label: "Edit",
          icon: "pi pi-pencil",
          size: "small",
          severity: "secondary",
          onClick: ($event) => goEdit(p.key)
        }, null, _parent));
        if (isDesigned(p.key)) {
          _push(ssrRenderComponent(_component_Button, {
            label: "Clear",
            icon: "pi pi-times",
            size: "small",
            severity: "danger",
            text: "",
            onClick: ($event) => onClear(p.key)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></li>`);
      });
      _push(`<!--]--></ul>`);
      if (!unref(menuPages).length) {
        _push(`<p class="empty" data-v-e92a5b8d>No menu pages found. Create menu items first.</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/designer/PagesPanel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PagesPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e92a5b8d"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { save, saving, dirty, canUndo, canRedo } = useSiteDesigner();
    const domainStore = useDomainStore();
    const activeTab = ref("style");
    const loading = ref(true);
    const lastSaved = ref(false);
    const tabs = [
      { id: "style", label: "Style & colors", icon: "pi pi-palette", soon: false },
      { id: "build", label: "Build page", icon: "pi pi-th-large", soon: false },
      { id: "header", label: "Header", icon: "pi pi-bars", soon: false },
      { id: "footer", label: "Footer", icon: "pi pi-directions", soon: false },
      { id: "pages", label: "Pages", icon: "pi pi-file", soon: false },
      { id: "preview", label: "Preview", icon: "pi pi-eye", soon: false }
    ];
    const domainName = computed(() => {
      var _a, _b;
      return ((_a = domainStore.domain) == null ? void 0 : _a.domain_name) || ((_b = domainStore.settings) == null ? void 0 : _b.domain_name) || "";
    });
    const handleSave = async () => {
      const ok = await save();
      if (ok) {
        lastSaved.value = true;
        setTimeout(() => lastSaved.value = false, 3e3);
      }
    };
    const onNavigate = (tab) => {
      if (tab === "build" || tab === "pages" || tab === "style" || tab === "header" || tab === "footer" || tab === "preview") {
        activeTab.value = tab;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-fluid" }, _attrs))} data-v-b3a70d54><div class="toolbar" data-v-b3a70d54><div class="title" data-v-b3a70d54><i class="pi pi-palette" data-v-b3a70d54></i><h1 data-v-b3a70d54>Site Designer</h1>`);
      if (unref(domainName)) {
        _push(`<span class="domain" data-v-b3a70d54>${ssrInterpolate(unref(domainName))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grow" data-v-b3a70d54></div><button class="tool-btn"${ssrIncludeBooleanAttr(!unref(canUndo)) ? " disabled" : ""} title="Undo (Ctrl+Z)" data-v-b3a70d54><i class="pi pi-undo" data-v-b3a70d54></i></button><button class="tool-btn"${ssrIncludeBooleanAttr(!unref(canRedo)) ? " disabled" : ""} title="Redo (Ctrl+Shift+Z)" data-v-b3a70d54><i class="pi pi-refresh" data-v-b3a70d54></i></button>`);
      if (unref(dirty)) {
        _push(`<span class="badge dirty" data-v-b3a70d54>Unsaved changes</span>`);
      } else if (unref(lastSaved)) {
        _push(`<span class="badge ok" data-v-b3a70d54>Saved \u2713</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Button, {
        label: "Save design",
        icon: "pi pi-save",
        loading: unref(saving),
        disabled: !unref(dirty),
        onClick: handleSave
      }, null, _parent));
      _push(`</div><div class="designer-body" data-v-b3a70d54><nav class="tabs" data-v-b3a70d54><!--[-->`);
      ssrRenderList(tabs, (t) => {
        _push(`<button class="${ssrRenderClass([{ on: unref(activeTab) === t.id, soon: t.soon }, "tab"])}" data-v-b3a70d54><i class="${ssrRenderClass(t.icon)}" data-v-b3a70d54></i><span data-v-b3a70d54>${ssrInterpolate(t.label)}</span>`);
        if (t.soon) {
          _push(`<small data-v-b3a70d54>soon</small>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></nav><div class="panel-area" data-v-b3a70d54>`);
      if (unref(loading)) {
        _push(`<div class="state" data-v-b3a70d54><i class="pi pi-spin pi-spinner" data-v-b3a70d54></i> Loading design\u2026</div>`);
      } else {
        _push(`<!--[--><div class="panel" style="${ssrRenderStyle(unref(activeTab) === "style" ? null : { display: "none" })}" data-v-b3a70d54>`);
        _push(ssrRenderComponent(StylePanel, null, null, _parent));
        _push(`<aside class="live-note" data-v-b3a70d54><i class="pi pi-info-circle" data-v-b3a70d54></i><span data-v-b3a70d54>Open the public site in another tab to see your colors live. In production this re-themes instantly with no flash.</span></aside></div><div class="panel wide" style="${ssrRenderStyle(unref(activeTab) === "build" ? null : { display: "none" })}" data-v-b3a70d54>`);
        _push(ssrRenderComponent(BuildPanel, null, null, _parent));
        _push(`</div><div class="panel wide" style="${ssrRenderStyle(unref(activeTab) === "header" ? null : { display: "none" })}" data-v-b3a70d54>`);
        _push(ssrRenderComponent(HeaderPanel, null, null, _parent));
        _push(`</div><div class="panel wide" style="${ssrRenderStyle(unref(activeTab) === "footer" ? null : { display: "none" })}" data-v-b3a70d54>`);
        _push(ssrRenderComponent(FooterPanel, null, null, _parent));
        _push(`</div><div class="panel wide" style="${ssrRenderStyle(unref(activeTab) === "pages" ? null : { display: "none" })}" data-v-b3a70d54>`);
        _push(ssrRenderComponent(PagesPanel, { onNavigate }, null, _parent));
        _push(`</div><div class="panel wide" style="${ssrRenderStyle(unref(activeTab) === "preview" ? null : { display: "none" })}" data-v-b3a70d54>`);
        _push(ssrRenderComponent(PreviewPanel, null, null, _parent));
        _push(`</div><!--]-->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/builder/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b3a70d54"]]);

export { index as default };
//# sourceMappingURL=index-CZwOBNav.mjs.map
