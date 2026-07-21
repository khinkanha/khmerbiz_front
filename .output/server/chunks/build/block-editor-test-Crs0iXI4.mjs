import { B as BlockEditor } from './BlockEditor-D5srBOa0.mjs';
import { p as parseSmartDescription, _ as __nuxt_component_0 } from './tiptapFormat-skNvmggH.mjs';
import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import './MediaPicker-DTd9YafP.mjs';
import './useUpload-BUN8k0ZN.mjs';
import './auth-CZZkTxj2.mjs';
import '@tiptap/vue-3';
import '@tiptap/starter-kit';
import '@tiptap/extension-image';
import '@tiptap/extension-link';
import '@tiptap/core';
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
  __name: "block-editor-test",
  __ssrInlineRender: true,
  setup(__props) {
    const empty = ref("");
    const tiptapSample = ref(JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "Welcome to the block editor" }] },
        { type: "paragraph", content: [
          { type: "text", text: "This is a " },
          { type: "text", marks: [{ type: "bold" }], text: "bold" },
          { type: "text", text: " and " },
          { type: "text", marks: [{ type: "italic" }], text: "italic" },
          { type: "text", text: " paragraph." }
        ] },
        { type: "image", attrs: { src: "https://picsum.photos/600/300", alt: "Sample image" } },
        { type: "blockquote", content: [
          { type: "paragraph", content: [{ type: "text", text: "A famous quote goes here." }] }
        ] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "First item" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Second item" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Third item" }] }] }
        ] }
      ]
    }, null, 2));
    const legacySample = ref(JSON.stringify({
      title: "Old Article Title",
      description: "<p>This is <strong>legacy</strong> HTML content from <em>TinyMCE</em>.</p><p>It has multiple paragraphs.</p>"
    }));
    const saveLog = ref([]);
    function onSave(label, value) {
      saveLog.value.unshift(`[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ${label}: ${value.length} chars`);
    }
    const tiptapDoc = computed(() => {
      const smart = parseSmartDescription(tiptapSample.value);
      return (smart == null ? void 0 : smart.format) === "tiptap" ? smart.tiptapDoc : null;
    });
    const legacySmart = computed(() => parseSmartDescription(legacySample.value));
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b;
      const _component_BlockEditor = BlockEditor;
      const _component_BlockRenderer = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "block-editor-test" }, _attrs))} data-v-88b30e8d><h1 data-v-88b30e8d>BlockEditor Test Page</h1><p data-v-88b30e8d>This page is a developer tool to manually verify the new Tiptap-based BlockEditor works end-to-end.</p><section class="test-section" data-v-88b30e8d><h2 data-v-88b30e8d>Test 1: Empty input</h2>`);
      _push(ssrRenderComponent(_component_BlockEditor, {
        modelValue: empty.value,
        "onUpdate:modelValue": ($event) => empty.value = $event,
        "auto-save-ms": 0,
        onSave: ($event) => onSave("empty", $event)
      }, null, _parent));
      _push(`<pre data-v-88b30e8d>value: ${ssrInterpolate(JSON.stringify(empty.value, null, 2))}</pre></section><section class="test-section" data-v-88b30e8d><h2 data-v-88b30e8d>Test 2: Tiptap doc input (already in new format)</h2>`);
      _push(ssrRenderComponent(_component_BlockEditor, {
        modelValue: tiptapSample.value,
        "onUpdate:modelValue": ($event) => tiptapSample.value = $event,
        "auto-save-ms": 0,
        onSave: ($event) => onSave("tiptap", $event)
      }, null, _parent));
      _push(`<pre data-v-88b30e8d>value: ${ssrInterpolate(JSON.stringify(tiptapSample.value, null, 2))}</pre></section><section class="test-section" data-v-88b30e8d><h2 data-v-88b30e8d>Test 3: Legacy TinyMCE input (should show warning + convert on save)</h2>`);
      _push(ssrRenderComponent(_component_BlockEditor, {
        modelValue: legacySample.value,
        "onUpdate:modelValue": ($event) => legacySample.value = $event,
        "auto-save-ms": 0,
        onSave: ($event) => onSave("legacy", $event)
      }, null, _parent));
      _push(`<pre data-v-88b30e8d>value: ${ssrInterpolate(JSON.stringify(legacySample.value, null, 2))}</pre></section><section class="test-section" data-v-88b30e8d><h2 data-v-88b30e8d>Test 4: Public site render \u2014 Tiptap</h2><div class="render-box" data-v-88b30e8d>`);
      if (tiptapDoc.value) {
        _push(ssrRenderComponent(_component_BlockRenderer, { doc: tiptapDoc.value }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section><section class="test-section" data-v-88b30e8d><h2 data-v-88b30e8d>Test 5: Public site render \u2014 Legacy</h2><div class="render-box" data-v-88b30e8d>`);
      if (((_a = legacySmart.value) == null ? void 0 : _a.format) === "tiptap") {
        _push(`<div class="legacy-warning" data-v-88b30e8d> (format detection says this is Tiptap, not legacy) </div>`);
      } else {
        _push(`<div class="article-content" data-v-88b30e8d>${(_a2 = ((_b = legacySmart.value) == null ? void 0 : _b.description) || "") != null ? _a2 : ""}</div>`);
      }
      _push(`</div></section><section class="test-section" data-v-88b30e8d><h2 data-v-88b30e8d>Save log</h2><ul data-v-88b30e8d><!--[-->`);
      ssrRenderList(saveLog.value, (entry, i) => {
        _push(`<li data-v-88b30e8d>${ssrInterpolate(entry)}</li>`);
      });
      _push(`<!--]--></ul></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/block-editor-test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const blockEditorTest = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-88b30e8d"]]);

export { blockEditorTest as default };
//# sourceMappingURL=block-editor-test-Crs0iXI4.mjs.map
