import { defineComponent, ref, computed, resolveComponent, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { u as useDesignStore, D as DESIGN_PRESETS, F as FONT_OPTIONS, d as defaultHeader, a as defaultFooter, b as designTokensToCssVars, T as THEME_PRESETS, P as PRESET_NAMES } from './setting-B7aDaTtz.mjs';
import { a as useAuthStore, u as useApi } from './auth-CZZkTxj2.mjs';
import { u as useDomainStore } from './domain-CF4nfyOM.mjs';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_1 } from './BlockWidgetDialog-JIMrR0ha.mjs';
import { D as DESIGNER_PALETTE, s as slotIcon, a as slotLabel, H as HEADER_ITEM_PALETTE, r as regionItemIcon, b as regionItemLabel, F as FOOTER_ITEM_PALETTE, c as DesignerPage } from './DesignerPage-BdcSIjyy.mjs';
import { _ as __nuxt_component_0, a as __nuxt_component_3 } from './DesignerFooter-DMeC05L2.mjs';
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
import './MediaPicker-kILQE-jC.mjs';
import './useUpload-Bx0YYvez.mjs';
import './blockWidgets-C4vo-aO5.mjs';
import './nuxt-link-DlwdfiwN.mjs';

const useSiteDesigner = () => {
  const store = useDesignStore();
  const authStore = useAuthStore();
  const api = useApi();
  const design = computed(() => store.design);
  const style = computed(() => store.style);
  const homeSections = computed(() => store.homeSections);
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
    // page sections (Phase 2)
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
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/designer/StylePanel.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const StylePanel = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-1efcf2a0"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BuildPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      homeSections,
      updateSection,
      removeSection,
      duplicateSection,
      save,
      activateHomepage
    } = useSiteDesigner();
    const sections = homeSections;
    ref(null);
    const dragIndex = ref(null);
    const dragOverIndex = ref(null);
    const dialogVisible = ref(false);
    const editIndex = ref(null);
    const editType = ref(null);
    const editData = ref({});
    const onDialogSave = (data) => {
      if (editIndex.value === null || !editType.value) return;
      const slot = { kind: "widget", type: editType.value, payload: data };
      updateSection(editIndex.value, slot);
      dialogVisible.value = false;
    };
    const onDialogDelete = () => {
      if (editIndex.value !== null) removeSection(editIndex.value);
      dialogVisible.value = false;
    };
    const onDialogDuplicate = () => {
      if (editIndex.value !== null) duplicateSection(editIndex.value);
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
    const excerpt = (slot) => {
      if (slot.kind !== "widget") return "";
      const p = slot.payload || {};
      if (typeof p.title === "string" && p.title) return p.title;
      if (Array.isArray(p.items) && p.items.length) return `${p.items.length} items`;
      if (typeof p.text === "string" && p.text) return p.text.slice(0, 60);
      if (typeof p.label === "string" && p.label) return p.label;
      return "Empty \u2014 click to edit";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "build-panel" }, _attrs))} data-v-3db87efc><div class="palette-col" data-v-3db87efc><h4 class="col-title" data-v-3db87efc>Add a block</h4><p class="col-hint" data-v-3db87efc>Click a block to add it, then edit its content.</p><!--[-->`);
      ssrRenderList(unref(DESIGNER_PALETTE), (g) => {
        _push(`<div class="palette-group" data-v-3db87efc><div class="palette-group-title" data-v-3db87efc>${ssrInterpolate(g.group)}</div><div class="palette-grid" data-v-3db87efc><!--[-->`);
        ssrRenderList(g.items, (item) => {
          _push(`<button type="button" class="palette-tile" draggable="true" data-v-3db87efc><i class="${ssrRenderClass(item.icon)}" data-v-3db87efc></i><span data-v-3db87efc>${ssrInterpolate(item.label)}</span></button>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div><div class="canvas-col" data-v-3db87efc><div class="canvas-head" data-v-3db87efc><h4 class="col-title" data-v-3db87efc>Homepage layout</h4><div class="canvas-actions" data-v-3db87efc>`);
      _push(ssrRenderComponent(_component_Button, {
        label: "Set as homepage",
        icon: "pi pi-home",
        size: "small",
        loading: unref(activating),
        onClick: onActivate
      }, null, _parent));
      _push(`</div></div>`);
      if (!unref(sections).length) {
        _push(`<div class="empty-canvas" data-v-3db87efc><i class="pi pi-th-large" data-v-3db87efc></i><p data-v-3db87efc>Your homepage is empty.</p><span data-v-3db87efc>Click or drag a block from the left to start.</span></div>`);
      } else {
        _push(`<ul class="section-list" data-v-3db87efc><!--[-->`);
        ssrRenderList(unref(sections), (slot, i) => {
          _push(`<li class="${ssrRenderClass([{ dragover: unref(dragOverIndex) === i, dragging: unref(dragIndex) === i }, "section-row"])}" draggable="true" data-v-3db87efc><div class="row-grip" data-v-3db87efc><i class="pi pi-bars" data-v-3db87efc></i></div><div class="row-icon" data-v-3db87efc><i class="${ssrRenderClass(unref(slotIcon)(slot))}" data-v-3db87efc></i></div><div class="row-label" data-v-3db87efc><strong data-v-3db87efc>${ssrInterpolate(unref(slotLabel)(slot))}</strong><span class="row-sub" data-v-3db87efc>${ssrInterpolate(excerpt(slot))}</span></div><div class="row-tools" data-v-3db87efc><button class="tool" title="Move up"${ssrIncludeBooleanAttr(i === 0) ? " disabled" : ""} data-v-3db87efc><i class="pi pi-arrow-up" data-v-3db87efc></i></button><button class="tool" title="Move down"${ssrIncludeBooleanAttr(i === unref(sections).length - 1) ? " disabled" : ""} data-v-3db87efc><i class="pi pi-arrow-down" data-v-3db87efc></i></button><button class="tool" title="Edit" data-v-3db87efc><i class="pi pi-pencil" data-v-3db87efc></i></button><button class="tool" title="Duplicate" data-v-3db87efc><i class="pi pi-clone" data-v-3db87efc></i></button><button class="tool danger" title="Delete" data-v-3db87efc><i class="pi pi-trash" data-v-3db87efc></i></button></div></li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`<p class="canvas-foot" data-v-3db87efc> Drag rows to reorder, or use the arrows. Click <strong data-v-3db87efc>Set as homepage</strong> to make this layout live (switches the template to the Designer). </p></div>`);
      _push(ssrRenderComponent(__nuxt_component_1, {
        visible: unref(dialogVisible),
        "onUpdate:visible": ($event) => isRef(dialogVisible) ? dialogVisible.value = $event : null,
        type: unref(editType),
        data: unref(editData),
        onSave: onDialogSave,
        onDelete: onDialogDelete,
        onDuplicate: onDialogDuplicate
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
const BuildPanel = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-3db87efc"]]);
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
    const { homeSections, style } = useSiteDesigner();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "preview-panel" }, _attrs))} data-v-d9647825><div class="preview-bar" data-v-d9647825><b data-v-d9647825>Live preview</b><div class="seg" data-v-d9647825><button class="${ssrRenderClass({ on: unref(device) === "desktop" })}" title="Desktop" data-v-d9647825><i class="pi pi-desktop" data-v-d9647825></i></button><button class="${ssrRenderClass({ on: unref(device) === "tablet" })}" title="Tablet" data-v-d9647825><i class="pi pi-tablet" data-v-d9647825></i></button><button class="${ssrRenderClass({ on: unref(device) === "mobile" })}" title="Mobile" data-v-d9647825><i class="pi pi-mobile" data-v-d9647825></i></button></div><span class="hint" data-v-d9647825>Updates live as you edit \u2014 Save to publish.</span></div><div class="preview-scroll" data-v-d9647825><div class="${ssrRenderClass([[unref(deviceClass), unref(themeClass)], "dp-stage"])}" style="${ssrRenderStyle(unref(tokenStyle))}" data-v-d9647825>`);
      _push(ssrRenderComponent(__nuxt_component_0, null, null, _parent));
      _push(`<main class="dp-main" data-v-d9647825>`);
      _push(ssrRenderComponent(DesignerPage, { sections: unref(homeSections) }, null, _parent));
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
const PreviewPanel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-d9647825"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Placeholder",
  __ssrInlineRender: true,
  props: {
    icon: {},
    title: {},
    text: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "placeholder" }, _attrs))} data-v-b604db3e><i class="${ssrRenderClass(__props.icon)}" data-v-b604db3e></i><h3 data-v-b604db3e>${ssrInterpolate(__props.title)}</h3><p data-v-b604db3e>${ssrInterpolate(__props.text)}</p></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/designer/Placeholder.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Placeholder = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b604db3e"]]);
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
      { id: "pages", label: "Pages", icon: "pi pi-file", soon: true },
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "designer-page" }, _attrs))} data-v-40c2dc49><div class="toolbar" data-v-40c2dc49><div class="title" data-v-40c2dc49><i class="pi pi-palette" data-v-40c2dc49></i><h1 data-v-40c2dc49>Site Designer</h1>`);
      if (unref(domainName)) {
        _push(`<span class="domain" data-v-40c2dc49>${ssrInterpolate(unref(domainName))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grow" data-v-40c2dc49></div><button class="tool-btn"${ssrIncludeBooleanAttr(!unref(canUndo)) ? " disabled" : ""} title="Undo (Ctrl+Z)" data-v-40c2dc49><i class="pi pi-undo" data-v-40c2dc49></i></button><button class="tool-btn"${ssrIncludeBooleanAttr(!unref(canRedo)) ? " disabled" : ""} title="Redo (Ctrl+Shift+Z)" data-v-40c2dc49><i class="pi pi-refresh" data-v-40c2dc49></i></button>`);
      if (unref(dirty)) {
        _push(`<span class="badge dirty" data-v-40c2dc49>Unsaved changes</span>`);
      } else if (unref(lastSaved)) {
        _push(`<span class="badge ok" data-v-40c2dc49>Saved \u2713</span>`);
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
      _push(`</div><div class="designer-body" data-v-40c2dc49><nav class="tabs" data-v-40c2dc49><!--[-->`);
      ssrRenderList(tabs, (t) => {
        _push(`<button class="${ssrRenderClass([{ on: unref(activeTab) === t.id, soon: t.soon }, "tab"])}" data-v-40c2dc49><i class="${ssrRenderClass(t.icon)}" data-v-40c2dc49></i><span data-v-40c2dc49>${ssrInterpolate(t.label)}</span>`);
        if (t.soon) {
          _push(`<small data-v-40c2dc49>soon</small>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></nav><div class="panel-area" data-v-40c2dc49>`);
      if (unref(loading)) {
        _push(`<div class="state" data-v-40c2dc49><i class="pi pi-spin pi-spinner" data-v-40c2dc49></i> Loading design\u2026</div>`);
      } else {
        _push(`<!--[--><div class="panel" style="${ssrRenderStyle(unref(activeTab) === "style" ? null : { display: "none" })}" data-v-40c2dc49>`);
        _push(ssrRenderComponent(StylePanel, null, null, _parent));
        _push(`<aside class="live-note" data-v-40c2dc49><i class="pi pi-info-circle" data-v-40c2dc49></i><span data-v-40c2dc49>Open the public site in another tab to see your colors live. In production this re-themes instantly with no flash.</span></aside></div><div class="panel wide" style="${ssrRenderStyle(unref(activeTab) === "build" ? null : { display: "none" })}" data-v-40c2dc49>`);
        _push(ssrRenderComponent(BuildPanel, null, null, _parent));
        _push(`</div><div class="panel wide" style="${ssrRenderStyle(unref(activeTab) === "header" ? null : { display: "none" })}" data-v-40c2dc49>`);
        _push(ssrRenderComponent(HeaderPanel, null, null, _parent));
        _push(`</div><div class="panel wide" style="${ssrRenderStyle(unref(activeTab) === "footer" ? null : { display: "none" })}" data-v-40c2dc49>`);
        _push(ssrRenderComponent(FooterPanel, null, null, _parent));
        _push(`</div><div class="panel" style="${ssrRenderStyle(unref(activeTab) === "pages" ? null : { display: "none" })}" data-v-40c2dc49>`);
        _push(ssrRenderComponent(Placeholder, {
          icon: "pi pi-file",
          title: "Pages \u2014 Phase 2",
          text: "Choose which page you are designing (Home, About\u2026) and manage custom pages."
        }, null, _parent));
        _push(`</div><div class="panel wide" style="${ssrRenderStyle(unref(activeTab) === "preview" ? null : { display: "none" })}" data-v-40c2dc49>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-40c2dc49"]]);

export { index as default };
//# sourceMappingURL=index-DJX9qwaF.mjs.map
