import { _ as __nuxt_component_0, M as MediaPicker } from './MediaPicker-DTd9YafP.mjs';
import { defineComponent, computed, ref, watch, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Node, mergeAttributes } from '@tiptap/core';
import { _ as _export_sfc } from './server.mjs';

const CardBlock = Node.create({
  name: "cardBlock",
  group: "block",
  content: "block+",
  defining: true,
  isolating: true,
  addAttributes() {
    return {
      imageUrl: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-image-url"),
        renderHTML: (attrs) => attrs.imageUrl ? { "data-image-url": attrs.imageUrl } : {}
      },
      imagePosition: {
        default: "top",
        parseHTML: (el) => el.getAttribute("data-image-position") || "top",
        renderHTML: (attrs) => ({ "data-image-position": attrs.imagePosition })
      }
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="card-block"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "card-block",
        class: "block-card"
      }),
      0
    ];
  },
  addCommands() {
    return {
      insertCardBlock: () => ({ commands }) => {
        return commands.insertContent({
          type: "cardBlock",
          content: [
            { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Card title" }] },
            { type: "paragraph", content: [{ type: "text", text: "Card description goes here." }] }
          ]
        });
      }
    };
  }
});
const LegacyHtml = Node.create({
  name: "legacyHtml",
  group: "block",
  atom: true,
  selectable: true,
  draggable: false,
  addAttributes() {
    return {
      html: { default: "" },
      title: { default: "" }
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="legacy-html"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const title = HTMLAttributes.title || "";
    HTMLAttributes.html || "";
    return [
      "div",
      {
        "data-type": "legacy-html",
        class: "block-legacy-html",
        "data-title": title
      },
      // Note: HTML inside is rendered via the public-site BlockRenderer
      // (which sanitizes). The editor just shows a static preview card.
      ["div", { class: "block-legacy-html-badge" }, "\u26A0 Legacy content"],
      ["div", { class: "block-legacy-html-title" }, title],
      ["div", { class: "block-legacy-html-preview" }, "Original HTML preserved. Edit with care."]
    ];
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BlockEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    autoSaveMs: { default: 1500 },
    readonly: { type: Boolean, default: false },
    showSaveStatus: { type: Boolean, default: true }
  },
  emits: ["update:modelValue", "save", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function isTiptapJson(value) {
      if (!value || typeof value !== "string") return false;
      const trimmed = value.trim();
      return trimmed.startsWith('{"type":"doc"') || trimmed.startsWith('{"type": "doc"');
    }
    function legacyJsonToTiptapDoc(legacy) {
      let parsed = {};
      try {
        parsed = JSON.parse(legacy);
      } catch {
        parsed = { description: legacy };
      }
      return JSON.stringify({
        type: "doc",
        content: [
          {
            type: "legacyHtml",
            attrs: {
              html: parsed.description || parsed.longdes || parsed.shortdes || JSON.stringify(parsed),
              title: parsed.title || ""
            }
          }
        ]
      });
    }
    const isLegacyContent = computed(() => {
      return !!props.modelValue && !isTiptapJson(props.modelValue) && props.modelValue.trim() !== "";
    });
    const editor = useEditor({
      content: getInitialContent(),
      editable: !props.readonly,
      extensions: [
        StarterKit.configure({
          // Heading, Bold, Italic, Strike, Code, Blockquote, BulletList, OrderedList, ListItem, HardBreak, HorizontalRule, History
        }),
        Image.configure({
          inline: false,
          allowBase64: true,
          HTMLAttributes: { class: "block-image" }
        }),
        Link.configure({
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { class: "block-link", rel: "noopener noreferrer" }
        }),
        CardBlock,
        LegacyHtml
      ],
      editorProps: {
        attributes: {
          class: "block-editor-prose"
        }
      },
      onUpdate({ editor: editor2 }) {
        const json = JSON.stringify(editor2.getJSON());
        scheduleAutoSave(json);
        emit("update:modelValue", json);
        emit("change", json);
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
        return {
          type: "doc",
          content: [{ type: "paragraph" }]
        };
      }
      if (isTiptapJson(props.modelValue)) {
        try {
          return JSON.parse(props.modelValue);
        } catch {
          return { type: "doc", content: [{ type: "paragraph" }] };
        }
      }
      return JSON.parse(legacyJsonToTiptapDoc(props.modelValue));
    }
    const insertableBlocks = [
      { type: "heading", label: "Heading", icon: "\u{1D407}" },
      { type: "paragraph", label: "Text", icon: "\xB6" },
      { type: "image", label: "Image", icon: "\u{1F5BC}" },
      { type: "card", label: "Card", icon: "\u25AD" },
      { type: "divider", label: "Divider", icon: "\u2500" },
      { type: "quote", label: "Quote", icon: "\u275D" }
    ];
    const showMediaPicker = ref(false);
    function onMediaSelected(media) {
      if (!editor.value || !media) return;
      const url = typeof media === "string" ? media : media.url || media.file_url || media.path;
      if (!url) return;
      editor.value.chain().focus().setImage({ src: url, alt: media.alt || media.name || "" }).run();
      showMediaPicker.value = false;
    }
    const isSaving = ref(false);
    const lastSavedAt = ref(null);
    let autoSaveTimer = null;
    function scheduleAutoSave(json) {
      if (!props.showSaveStatus) return;
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
      isSaving.value = true;
      autoSaveTimer = setTimeout(() => {
        isSaving.value = false;
        lastSavedAt.value = /* @__PURE__ */ new Date();
        emit("save", json);
      }, props.autoSaveMs);
    }
    const savedAgo = ref("");
    const isFocused = ref(false);
    watch(
      () => props.modelValue,
      (newVal) => {
        if (!editor.value) return;
        const currentJson = JSON.stringify(editor.value.getJSON());
        if (newVal === currentJson) return;
        if (!newVal || newVal.trim() === "") {
          editor.value.commands.setContent({ type: "doc", content: [{ type: "paragraph" }] }, { emitUpdate: false });
          return;
        }
        if (isTiptapJson(newVal)) {
          try {
            editor.value.commands.setContent(JSON.parse(newVal), { emitUpdate: false });
          } catch {
          }
        } else {
          editor.value.commands.setContent(legacyJsonToTiptapDoc(newVal), { emitUpdate: false });
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      const _component_MediaPicker = MediaPicker;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["block-editor", { "is-focused": isFocused.value }]
      }, _attrs))} data-v-4f98c08e>`);
      if (unref(editor)) {
        _push(`<div class="block-toolbar" role="toolbar" aria-label="Block editor toolbar" data-v-4f98c08e><div class="toolbar-group toolbar-block-insert" data-v-4f98c08e><span class="toolbar-label" data-v-4f98c08e>${ssrInterpolate(_ctx.$t("blockEditor.insert") || "Insert")}:</span><!--[-->`);
        ssrRenderList(insertableBlocks, (block) => {
          var _a;
          _push(`<button type="button" class="toolbar-btn toolbar-btn-block"${ssrRenderAttr("title", block.label)} data-v-4f98c08e><span class="block-icon" data-v-4f98c08e>${(_a = block.icon) != null ? _a : ""}</span><span class="block-label" data-v-4f98c08e>${ssrInterpolate(block.label)}</span></button>`);
        });
        _push(`<!--]--></div><div class="toolbar-divider" data-v-4f98c08e></div><div class="toolbar-group toolbar-format" style="${ssrRenderStyle(unref(editor).isFocused ? null : { display: "none" })}" data-v-4f98c08e><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("heading", { level: 1 }) }, "toolbar-btn"])}" title="Heading 1" data-v-4f98c08e><strong data-v-4f98c08e>H1</strong></button><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("heading", { level: 2 }) }, "toolbar-btn"])}" title="Heading 2" data-v-4f98c08e><strong data-v-4f98c08e>H2</strong></button><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("heading", { level: 3 }) }, "toolbar-btn"])}" title="Heading 3" data-v-4f98c08e><strong data-v-4f98c08e>H3</strong></button><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("paragraph") }, "toolbar-btn"])}" title="Paragraph" data-v-4f98c08e> \xB6 </button></div><div class="toolbar-divider" style="${ssrRenderStyle(unref(editor).isFocused ? null : { display: "none" })}" data-v-4f98c08e></div><div class="toolbar-group toolbar-inline" style="${ssrRenderStyle(unref(editor).isFocused ? null : { display: "none" })}" data-v-4f98c08e><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("bold") }, "toolbar-btn"])}" title="Bold" data-v-4f98c08e><strong data-v-4f98c08e>B</strong></button><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("italic") }, "toolbar-btn"])}" title="Italic" data-v-4f98c08e><em data-v-4f98c08e>I</em></button><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("strike") }, "toolbar-btn"])}" title="Strikethrough" data-v-4f98c08e><s data-v-4f98c08e>S</s></button></div><div class="toolbar-divider" style="${ssrRenderStyle(unref(editor).isFocused ? null : { display: "none" })}" data-v-4f98c08e></div><div class="toolbar-group toolbar-list" style="${ssrRenderStyle(unref(editor).isFocused ? null : { display: "none" })}" data-v-4f98c08e><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("bulletList") }, "toolbar-btn"])}" title="Bullet list" data-v-4f98c08e> \u2022 </button><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("orderedList") }, "toolbar-btn"])}" title="Numbered list" data-v-4f98c08e> 1. </button><button type="button" class="${ssrRenderClass([{ active: unref(editor).isActive("blockquote") }, "toolbar-btn"])}" title="Quote" data-v-4f98c08e> \u201C </button></div><div class="toolbar-divider" style="${ssrRenderStyle(unref(editor).isFocused ? null : { display: "none" })}" data-v-4f98c08e></div><div class="toolbar-group toolbar-history" data-v-4f98c08e><button type="button" class="toolbar-btn"${ssrIncludeBooleanAttr(!unref(editor).can().undo()) ? " disabled" : ""} title="Undo" data-v-4f98c08e> \u21B6 </button><button type="button" class="toolbar-btn"${ssrIncludeBooleanAttr(!unref(editor).can().redo()) ? " disabled" : ""} title="Redo" data-v-4f98c08e> \u21B7 </button></div><div class="toolbar-spacer" data-v-4f98c08e></div><div class="toolbar-group toolbar-status" data-v-4f98c08e>`);
        if (isSaving.value) {
          _push(`<span class="status-saving" data-v-4f98c08e><span class="status-dot status-dot-saving" data-v-4f98c08e></span> ${ssrInterpolate(_ctx.$t("blockEditor.saving") || "Saving\u2026")}</span>`);
        } else if (lastSavedAt.value) {
          _push(`<span class="status-saved" data-v-4f98c08e><span class="status-dot status-dot-saved" data-v-4f98c08e></span> ${ssrInterpolate(_ctx.$t("blockEditor.saved") || "Saved")} ${ssrInterpolate(savedAgo.value)}</span>`);
        } else {
          _push(`<span class="status-draft" data-v-4f98c08e><span class="status-dot status-dot-draft" data-v-4f98c08e></span> ${ssrInterpolate(_ctx.$t("blockEditor.draft") || "Draft")}</span>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="block-editor-content" data-v-4f98c08e>`);
      if (isLegacyContent.value) {
        _push(`<div class="legacy-warning" data-v-4f98c08e><strong data-v-4f98c08e>\u26A0 Legacy content</strong> \u2014 This content was created with the old editor. It will be saved as a single &quot;Legacy HTML&quot; block. <button type="button" class="legacy-edit-btn" data-v-4f98c08e>Edit in legacy mode</button><button type="button" class="legacy-discard-btn" data-v-4f98c08e>Start fresh</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="block-editor-loading" data-v-4f98c08e${_scopeId}>Loading editor\u2026</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/BlockEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BlockEditor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4f98c08e"]]);

export { BlockEditor as B };
//# sourceMappingURL=BlockEditor-D5srBOa0.mjs.map
