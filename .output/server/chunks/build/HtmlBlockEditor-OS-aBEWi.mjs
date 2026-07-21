import { _ as __nuxt_component_0, M as MediaPicker } from './MediaPicker-DTd9YafP.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HtmlBlockEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    readonly: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isFocused = ref(false);
    const showMediaPicker = ref(false);
    const editor = useEditor({
      content: getInitialContent(),
      editable: !props.readonly,
      extensions: [
        StarterKit,
        Image.configure({ inline: false, allowBase64: true, HTMLAttributes: { class: "block-image" } }),
        Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { class: "block-link", rel: "noopener noreferrer" } })
      ],
      editorProps: {
        attributes: { class: "block-editor-prose" }
      },
      onUpdate({ editor: editor2 }) {
        const html = editor2.getHTML();
        emit("update:modelValue", html);
        emit("change", html);
      },
      onFocus() {
        isFocused.value = true;
      },
      onBlur() {
        isFocused.value = false;
      }
    });
    function getInitialContent() {
      if (!props.modelValue || props.modelValue.trim() === "") {
        return { type: "doc", content: [{ type: "paragraph" }] };
      }
      return props.modelValue;
    }
    function onMediaSelected(media) {
      if (!editor.value || !media) return;
      const url = typeof media === "string" ? media : media.url || media.file_url || media.path;
      if (!url) return;
      editor.value.chain().focus().setImage({ src: url, alt: media.alt || media.name || "" }).run();
      showMediaPicker.value = false;
    }
    watch(
      () => props.modelValue,
      (newVal) => {
        if (!editor.value) return;
        const currentHtml = editor.value.getHTML();
        if (newVal === currentHtml) return;
        if (!newVal || newVal.trim() === "") {
          editor.value.commands.setContent({ type: "doc", content: [{ type: "paragraph" }] }, { emitUpdate: false });
          return;
        }
        editor.value.commands.setContent(newVal, { emitUpdate: false });
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      const _component_MediaPicker = MediaPicker;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["block-editor", { "is-focused": isFocused.value }]
      }, _attrs))} data-v-1bcf95ba>`);
      if (unref(editor)) {
        _push(`<div class="block-toolbar" role="toolbar" aria-label="Block editor toolbar" data-v-1bcf95ba><div class="toolbar-group toolbar-block-insert" data-v-1bcf95ba><span class="toolbar-label" data-v-1bcf95ba>${ssrInterpolate(_ctx.$t("blockEditor.insert") || "Insert")}:</span><button type="button" class="toolbar-btn toolbar-btn-block" title="Heading" data-v-1bcf95ba><strong data-v-1bcf95ba>\u{1D407}</strong><span class="block-label" data-v-1bcf95ba>Heading</span></button><button type="button" class="toolbar-btn toolbar-btn-block" title="Text" data-v-1bcf95ba> \xB6<span class="block-label" data-v-1bcf95ba>Text</span></button><button type="button" class="toolbar-btn toolbar-btn-block" title="Image" data-v-1bcf95ba> \u{1F5BC}<span class="block-label" data-v-1bcf95ba>Image</span></button><button type="button" class="toolbar-btn toolbar-btn-block" title="Divider" data-v-1bcf95ba> \u2500<span class="block-label" data-v-1bcf95ba>Divider</span></button><button type="button" class="toolbar-btn toolbar-btn-block" title="Quote" data-v-1bcf95ba> \u275D<span class="block-label" data-v-1bcf95ba>Quote</span></button></div><div class="toolbar-divider" style="${ssrRenderStyle(unref(editor).isFocused ? null : { display: "none" })}" data-v-1bcf95ba></div><div class="toolbar-group toolbar-format" style="${ssrRenderStyle(unref(editor).isFocused ? null : { display: "none" })}" data-v-1bcf95ba><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("bold") }, "toolbar-btn"])}" title="Bold" data-v-1bcf95ba><strong data-v-1bcf95ba>B</strong></button><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("italic") }, "toolbar-btn"])}" title="Italic" data-v-1bcf95ba><em data-v-1bcf95ba>I</em></button><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("strike") }, "toolbar-btn"])}" title="Strikethrough" data-v-1bcf95ba><s data-v-1bcf95ba>S</s></button></div><div class="toolbar-divider" style="${ssrRenderStyle(unref(editor).isFocused ? null : { display: "none" })}" data-v-1bcf95ba></div><div class="toolbar-group toolbar-list" style="${ssrRenderStyle(unref(editor).isFocused ? null : { display: "none" })}" data-v-1bcf95ba><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("bulletList") }, "toolbar-btn"])}" title="Bullet list" data-v-1bcf95ba>\u2022</button><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("orderedList") }, "toolbar-btn"])}" title="Numbered list" data-v-1bcf95ba>1.</button></div><div class="toolbar-divider" data-v-1bcf95ba></div><div class="toolbar-group toolbar-history" data-v-1bcf95ba><button type="button" class="toolbar-btn"${ssrIncludeBooleanAttr(!unref(editor).can().undo()) ? " disabled" : ""} title="Undo" data-v-1bcf95ba>\u21B6</button><button type="button" class="toolbar-btn"${ssrIncludeBooleanAttr(!unref(editor).can().redo()) ? " disabled" : ""} title="Redo" data-v-1bcf95ba>\u21B7</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="block-editor-content" data-v-1bcf95ba>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="block-editor-loading" data-v-1bcf95ba${_scopeId}>Loading editor\u2026</div>`);
          } else {
            return [
              createVNode("div", { class: "block-editor-loading" }, "Loading editor\u2026")
            ];
          }
        })
      }, _parent));
      _push(`</div>`);
      if (showMediaPicker.value) {
        _push(ssrRenderComponent(_component_MediaPicker, {
          multiple: false,
          onSelect: onMediaSelected,
          onClose: ($event) => showMediaPicker.value = false
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/HtmlBlockEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HtmlBlockEditor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1bcf95ba"]]);

export { HtmlBlockEditor as H };
//# sourceMappingURL=HtmlBlockEditor-OS-aBEWi.mjs.map
