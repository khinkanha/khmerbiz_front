# Plan: Drag-and-drop block builder for the content "description" field

## Context

Admins create/edit content on `/admin/content/[id]` (new or existing). Today the **description** is edited with **TinyMCE** and stored as a **plain HTML string**. The user wants a **low-code builder**: drag structured components (cards, checkboxes, buttons, images, dividers, columns) into the description, then fill in each component's data via an inline form.

A previous attempt (`feature/block-editor-phase-0`, reverted in `1f0db07`) tried to replace TinyMCE with **Tiptap and store Tiptap JSON in `description`**. It was reverted because that field is a plain-HTML contract that the backend wraps as `{title, description}` JSON on read (`pages/admin/content/[id].vue:248` does `JSON.parse(raw.description)`), and nested JSON broke the load/render pipeline. It also replaced **all** editors at once.

**The core constraint this plan respects:** the block editor must emit a **plain HTML string** — identical to what TinyMCE emits today — so the existing load / save / public-render pipeline keeps working with **zero backend changes**. Structured block data round-trips inside an **HTML comment** embedded in that HTML.

## Decisions (confirmed with user)
- **Scope:** main content description only (`/admin/content/[id]`). News/products/items keep TinyMCE untouched.
- **MVP blocks:** Text (rich, TinyMCE) + **Card**, **Checkbox/checklist (static)**, **Button/link**, **Image**, **Divider**, **Columns**.
- **Checkbox:** static display on the public site (no submission backend).
- **Drag lib:** **vuedraggable@next** (new dep — user installs; Claude does not run npm).

## How it round-trips (the key mechanism)

`form.description` stays a plain HTML string. The editor embeds a lossless snapshot of the block model in an HTML comment, followed by the rendered block HTML:

```
<!-- kb-blocks:<base64-utf8-json> -->
<div class="kb-card">...</div>
<div class="kb-checklist">...</div>
```

- **Serialize (save):** `description = '<!-- kb-blocks:' + utf8btoa(JSON.stringify(blocks)) + ' -->\n' + blocks.map(toHtml).join('\n')`
- **Deserialize (load):** if the `kb-blocks:` comment is present → `JSON.parse(utf8atob(...))` → blocks (lossless). Otherwise → one **legacy Text block** whose `html` is the raw content (existing TinyMCE content loads intact, no data loss).
- **UTF-8-safe base64** is mandatory (Khmer/Chinese content) — use the `encodeURIComponent`/`unescape` trick, not raw `btoa`.
- The comment is invisible to visitors and survives `v-html`; the rendered HTML is plain elements + `.kb-*` classes, so it renders everywhere even if the comment is ever stripped.

## Architecture

A new self-contained editor under `components/admin/blocks/`, mounted in place of the TinyMCE `<Editor>` on the content page. Rich *prose* keeps TinyMCE (reuse the existing init config from `[id].vue:37-47`); structured blocks are form-driven.

**Canvas + palette UX:**
- **Palette sidebar** lists block types — click to append, or **drag** into the canvas (vuedraggable `:clone` inserts a new block from a template).
- **Canvas** is a vuedraggable list of blocks; reorder via a drag handle.
- Each block is wrapped by `BlockWrapper` (hover toolbar: drag handle, move up/down, duplicate, delete).
- Clicking a block opens its **inline edit form** (PrimeVue inputs, matching the page's existing style).

## Block specs (data → HTML)

- **text** `{ html }` → raw TinyMCE HTML. (Also the legacy fallback block.)
- **card** `{ title, text, imageUrl, imageAlt, linkUrl, linkLabel }` → `<div class="kb-card">…<img/><h3/><div/><a/></div>`.
- **checkbox** `{ title, items:[{label, checked}], style:'check'|'cross' }` → `<div class="kb-checklist"><ul><li><input type=checkbox disabled checked/><label/></li>…</ul></div>` (static; checked state is cosmetic).
- **button** `{ label, url, variant:'primary'|'outline', align }` → `<div class="kb-button-wrap"><a class="kb-button kb-button--{variant}"/></div>`.
- **image** `{ url, alt, caption, width, align }` → `<figure class="kb-image"><img/><figcaption/></figure>`.
- **divider** `{ style:'solid'|'dashed'|'dots' }` → `<hr class="kb-divider kb-divider--{style}"/>`.
- **columns** `{ leftHtml, rightHtml }` → `<div class="kb-columns"><div class="kb-col">left</div><div class="kb-col">right</div></div>` (v1 = two rich-text columns; recursive nesting is a later enhancement).

Each block has a stable `id` and a `toHtml(block)` serializer.

## Files

**Create:**
- `components/admin/blocks/BlockEditor.vue` — main editor: canvas (vuedraggable), palette, selected-block editor, v-model = HTML string (serialize/deserialize on get/set).
- `components/admin/blocks/BlockPalette.vue` — block-type list (click + drag-clone).
- `components/admin/blocks/BlockWrapper.vue` — per-block hover toolbar (drag handle, move, duplicate, delete).
- `components/admin/blocks/types.ts` — `Block` type, `BLOCK_DEFS`, `createBlock(type)` factory.
- `components/admin/blocks/serialize.ts` — `blocksToHtml`, `htmlToBlocks`, UTF-8-safe base64 helpers, block `toHtml` map.
- `components/admin/blocks/editors/` — one component per block: `BlockText.vue` (embeds TinyMCE), `BlockCard.vue`, `BlockCheckbox.vue`, `BlockButton.vue`, `BlockImage.vue`, `BlockDivider.vue`, `BlockColumns.vue`.
- `assets/css/blocks.css` — global `.kb-*` styles (card, checklist, button, image, divider, columns) so `v-html` output is styled on the public site.

**Modify:**
- `pages/admin/content/[id].vue` — replace the `<ClientOnly><Editor …/></ClientOnly>` block (lines 36-48) with `<ClientOnly><BlockEditor v-model="form.description" /></ClientOnly>`. Keep the `import Editor` line only if still referenced; TinyMCE stays installed (used by the Text block and by news/products/items pages).
- `nuxt.config.ts` — add `'~/assets/css/blocks.css'` to the `css:` array (global, so it applies to public `v-html`).
- `i18n/locales/{en,kh,ch}.json` — add `blockEditor.*` keys (palette labels, block names, toolbar actions).
- `package.json` — add `vuedraggable` (`@next`, SortableJS-based). **User runs the install.**

**Reuse (do not rebuild):**
- `components/admin/MediaPicker.vue` — for image selection in Card/Image blocks (existing native-DnD media picker).
- TinyMCE init config from `[id].vue:37-47` — copied into `BlockText.vue` / `BlockColumns.vue` for rich prose.
- `stores/content.ts` `saveContent`/`updateContent` — **unchanged** (still send `description` as a plain HTML string).

## Public rendering

**No public code changes.** `components/public/content/ArticleSection.vue` already does `JSON.parse` → unwrap → `v-html="decodedDescription"`. The block HTML renders as-is; only the new global `blocks.css` is needed for styling. The `kb-blocks` comment is harmless/invisible.

## Implementation order

1. Add dep — **ask user to run `npm install vuedraggable@next`**.
2. `types.ts`, `serialize.ts` (+ base64 helpers) with unit-style manual checks for Khmer/Chinese round-trip.
3. `BlockEditor.vue` + `BlockPalette.vue` + `BlockWrapper.vue` with vuedraggable canvas; start with just the **Text** block (proves the v-model HTML contract end-to-end against the real save/load).
4. Add Card, Checkbox, Button, Image, Divider, Columns editors + their `toHtml`.
5. Wire image fields to `MediaPicker.vue`.
6. Add `blocks.css` to `nuxt.config.ts`; style all `.kb-*` blocks for both admin preview and public.
7. Swap the editor into `[id].vue`; add i18n keys.
8. End-to-end verification (below).

## Risks & mitigations (explicitly avoiding the reverted attempt's failures)
- **Backend wrapping** — solved by emitting plain HTML (same contract as TinyMCE); no Tiptap JSON, no nested-`JSON.parse` surprises.
- **Comment survival through backend** — verify in testing (inspect saved value after round-trip). If the backend ever strips HTML comments, the editor still loads via the legacy-Text fallback (no data loss) and the public site still renders the block HTML.
- **UTF-8 in base64** — Khmer/Chinese must survive; use the `encodeURIComponent`/`unescape` trick and test with real Khmer text.
- **Big-bang scope** — main content only; other editors untouched.
- **TinyMCE instance count** — acceptable for MVP; document that many Text blocks add weight.

## Verification (manual, dev server at http://localhost:8888 — Claude will not run npm)
1. **New content:** add Text (Khmer text), Card (image via MediaPicker + link), Checklist (3 items, some pre-checked), Button, Image, Divider, Columns. Save.
2. **Reload edit page:** all blocks rehydrate from the `kb-blocks` comment with data intact; reorder by drag; duplicate/delete work.
3. **Public site:** open the article — every block renders with correct `.kb-*` styling; checkboxes show as a static checklist.
4. **Legacy content:** open an existing TinyMCE article → loads as one Text block, content verbatim, editable, re-save → still renders.
5. **Multilingual:** Khmer + Chinese text survives save→reload→public render (base64 UTF-8).
6. **Round-trip integrity:** inspect the saved `description` (network/db) to confirm the `kb-blocks` comment and HTML survive the backend unchanged.
