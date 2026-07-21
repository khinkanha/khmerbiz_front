import { defineComponent, computed, mergeProps, unref, h, useSSRContext } from 'vue';
import { _ as _export_sfc } from './server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const BlockRendererContent = defineComponent({
  name: "BlockRendererContent",
  props: {
    content: { type: Array, default: () => [] }
  },
  setup(props) {
    return () => {
      return (props.content || []).map((node, i) => {
        var _a, _b;
        if (node.type === "text") {
          let el = node.text || "";
          const marks = node.marks || [];
          for (const mark of marks) {
            if (mark.type === "bold") el = h("strong", null, el);
            else if (mark.type === "italic") el = h("em", null, el);
            else if (mark.type === "strike") el = h("s", null, el);
            else if (mark.type === "code") el = h("code", null, el);
            else if (mark.type === "underline") el = h("u", null, el);
            else if (mark.type === "link") {
              const href = ((_a = mark.attrs) == null ? void 0 : _a.href) || "#";
              el = h("a", { href, rel: "noopener noreferrer", target: ((_b = mark.attrs) == null ? void 0 : _b.target) || "_self" }, el);
            }
          }
          return h("span", { key: i }, el);
        }
        if (node.type === "hardBreak") return h("br", { key: i });
        return null;
      });
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BlockRenderer",
  __ssrInlineRender: true,
  props: {
    blocks: {},
    doc: {}
  },
  setup(__props) {
    const props = __props;
    computed(() => {
      if (props.doc) return props.doc.content || [];
      return props.blocks || [];
    });
    function extractText(content) {
      if (!content) return "";
      return content.map((node) => {
        if (node.type === "text") return node.text || "";
        if (node.content) return extractText(node.content);
        return "";
      }).join("");
    }
    function sanitizeHtml(html) {
      return html;
    }
    function resolveUrl(url) {
      if (!url) return "";
      if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) return url;
      if (url.startsWith("/")) return url;
      return `/${url}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
      const _component_BlockRenderer = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "block-renderer" }, _attrs))} data-v-b3630d5f>`);
      if (_ctx.block.type === "heading" && ((_a = _ctx.block.attrs) == null ? void 0 : _a.level) === 1) {
        _push(`<h1${ssrRenderAttr("id", _ctx.block.attrs.id)} data-v-b3630d5f>`);
        _push(ssrRenderComponent(unref(BlockRendererContent), {
          content: _ctx.block.content
        }, null, _parent));
        _push(`</h1>`);
      } else if (_ctx.block.type === "heading" && ((_b = _ctx.block.attrs) == null ? void 0 : _b.level) === 2) {
        _push(`<h2${ssrRenderAttr("id", _ctx.block.attrs.id)} data-v-b3630d5f>`);
        _push(ssrRenderComponent(unref(BlockRendererContent), {
          content: _ctx.block.content
        }, null, _parent));
        _push(`</h2>`);
      } else if (_ctx.block.type === "heading" && ((_c = _ctx.block.attrs) == null ? void 0 : _c.level) === 3) {
        _push(`<h3${ssrRenderAttr("id", _ctx.block.attrs.id)} data-v-b3630d5f>`);
        _push(ssrRenderComponent(unref(BlockRendererContent), {
          content: _ctx.block.content
        }, null, _parent));
        _push(`</h3>`);
      } else if (_ctx.block.type === "heading" && ((_d = _ctx.block.attrs) == null ? void 0 : _d.level) === 4) {
        _push(`<h4${ssrRenderAttr("id", _ctx.block.attrs.id)} data-v-b3630d5f>`);
        _push(ssrRenderComponent(unref(BlockRendererContent), {
          content: _ctx.block.content
        }, null, _parent));
        _push(`</h4>`);
      } else if (_ctx.block.type === "paragraph") {
        _push(`<p data-v-b3630d5f>`);
        _push(ssrRenderComponent(unref(BlockRendererContent), {
          content: _ctx.block.content
        }, null, _parent));
        _push(`</p>`);
      } else if (_ctx.block.type === "bulletList") {
        _push(`<ul data-v-b3630d5f><!--[-->`);
        ssrRenderList(_ctx.block.content, (item, i) => {
          _push(`<li data-v-b3630d5f>`);
          _push(ssrRenderComponent(_component_BlockRenderer, {
            blocks: item.content
          }, null, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else if (_ctx.block.type === "orderedList") {
        _push(`<ol data-v-b3630d5f><!--[-->`);
        ssrRenderList(_ctx.block.content, (item, i) => {
          _push(`<li data-v-b3630d5f>`);
          _push(ssrRenderComponent(_component_BlockRenderer, {
            blocks: item.content
          }, null, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ol>`);
      } else if (_ctx.block.type === "blockquote") {
        _push(`<blockquote data-v-b3630d5f>`);
        _push(ssrRenderComponent(_component_BlockRenderer, {
          blocks: _ctx.block.content
        }, null, _parent));
        _push(`</blockquote>`);
      } else if (_ctx.block.type === "codeBlock") {
        _push(`<pre data-v-b3630d5f><code data-v-b3630d5f>${ssrInterpolate(extractText(_ctx.block.content))}</code></pre>`);
      } else if (_ctx.block.type === "horizontalRule") {
        _push(`<hr data-v-b3630d5f>`);
      } else if (_ctx.block.type === "hardBreak") {
        _push(`<br data-v-b3630d5f>`);
      } else if (_ctx.block.type === "image") {
        _push(`<figure class="block-renderer-figure" data-v-b3630d5f><img${ssrRenderAttr("src", resolveUrl((_e = _ctx.block.attrs) == null ? void 0 : _e.src))}${ssrRenderAttr("alt", ((_f = _ctx.block.attrs) == null ? void 0 : _f.alt) || "")}${ssrRenderAttr("title", (_g = _ctx.block.attrs) == null ? void 0 : _g.title)}${ssrRenderAttr("width", (_h = _ctx.block.attrs) == null ? void 0 : _h.width)}${ssrRenderAttr("height", (_i = _ctx.block.attrs) == null ? void 0 : _i.height)} data-v-b3630d5f>`);
        if ((_j = _ctx.block.attrs) == null ? void 0 : _j.title) {
          _push(`<figcaption data-v-b3630d5f>${ssrInterpolate(_ctx.block.attrs.title)}</figcaption>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</figure>`);
      } else if (_ctx.block.type === "cardBlock") {
        _push(`<div class="block-renderer-card"${ssrRenderAttr("data-image-position", ((_k = _ctx.block.attrs) == null ? void 0 : _k.imagePosition) || "top")} data-v-b3630d5f>`);
        if ((_l = _ctx.block.attrs) == null ? void 0 : _l.imageUrl) {
          _push(`<img${ssrRenderAttr("src", resolveUrl(_ctx.block.attrs.imageUrl))}${ssrRenderAttr("alt", "")} class="block-renderer-card-image" data-v-b3630d5f>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="block-renderer-card-body" data-v-b3630d5f>`);
        _push(ssrRenderComponent(_component_BlockRenderer, {
          blocks: _ctx.block.content
        }, null, _parent));
        _push(`</div></div>`);
      } else if (_ctx.block.type === "legacyHtml") {
        _push(`<div class="block-renderer-legacy"${ssrRenderAttr("data-title", ((_m = _ctx.block.attrs) == null ? void 0 : _m.title) || "")} data-v-b3630d5f><div class="block-renderer-legacy-badge" data-v-b3630d5f>\u26A0 Legacy content</div>`);
        if ((_n = _ctx.block.attrs) == null ? void 0 : _n.title) {
          _push(`<div class="block-renderer-legacy-title" data-v-b3630d5f>${ssrInterpolate(_ctx.block.attrs.title)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="block-renderer-legacy-html" data-v-b3630d5f>${(_a2 = sanitizeHtml(((_o = _ctx.block.attrs) == null ? void 0 : _o.html) || "")) != null ? _a2 : ""}</div></div>`);
      } else if (_ctx.block.type === "text") {
        _push(`<!--[--><!--]-->`);
      } else {
        _push(`<div class="block-renderer-unknown"${ssrRenderAttr("title", `Unknown block type: ${_ctx.block.type}`)} data-v-b3630d5f></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/BlockRenderer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b3630d5f"]]);
function isTiptapDoc(value) {
  if (!value || typeof value !== "string") return false;
  const trimmed = value.trim();
  return trimmed.startsWith('{"type":"doc"') || trimmed.startsWith('{"type": "doc"');
}
function parseTiptapDoc(value) {
  if (!isTiptapDoc(value)) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
function parseLegacyDescription(value) {
  if (!value || typeof value !== "string") return null;
  if (isTiptapDoc(value)) return null;
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === "object" && parsed !== null) {
      return {
        title: parsed.title || "",
        description: parsed.description || parsed.longdes || parsed.shortdes || "",
        ...parsed
      };
    }
  } catch {
  }
  return { title: "", description: value };
}
function parseSmartDescription(value) {
  if (!value || typeof value !== "string" || value.trim() === "") {
    return null;
  }
  if (isTiptapDoc(value)) {
    const doc = parseTiptapDoc(value);
    if (doc) {
      return { format: "tiptap", tiptapDoc: doc, title: "", description: "" };
    }
  }
  const legacy = parseLegacyDescription(value);
  if (legacy) {
    if (isTiptapDoc(legacy.description)) {
      const doc = parseTiptapDoc(legacy.description);
      if (doc) {
        return {
          format: "wrapped-tiptap",
          tiptapDoc: doc,
          title: legacy.title,
          description: "",
          legacy: { ...legacy, _innerDescription: legacy.description }
        };
      }
    }
    return {
      format: "legacy",
      title: legacy.title,
      description: legacy.description,
      legacy
    };
  }
  return null;
}

export { __nuxt_component_0 as _, parseSmartDescription as p };
//# sourceMappingURL=tiptapFormat-VsmiBmjD.mjs.map
