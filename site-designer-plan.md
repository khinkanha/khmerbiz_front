# Plan: Drag-and-Drop Site/Theme Designer (full visual site builder)

> Status: PLANNING — not yet implemented. Companion to `lowcode.md`.
> Scope chosen by owner: **option 3 — full site/theme designer** (Wix/Webflow-level: header, footer, section layouts, colors, fonts).

## Context

Today a tenant's site look-and-feel is **fixed**: 4 hardcoded homepage templates (`ClassicMultiPage`, `ScrollingSinglePage`, `MagazineGrid`, `FullscreenHero` in `components/public/themes/`), a hardcoded `PublicHeader.vue` / `PublicFooter.vue`, and 6 color themes chosen by `settings.theme` (0–5). The only place drag-and-drop exists today is **inside one article's body** — the `kb-widget` system (`utils/blockWidgets.ts`, 15 block types) embedded as locked TinyMCE nodes.

The user wants a **Wix/Webflow-level site designer**: each tenant drags to compose their own header, footer, page sections, and global colors/fonts — "design their flavor." This needs a persisted **site design** document, a drag-and-drop admin designer, and a public render path that draws from that document instead of the fixed templates.

This is large, so it is split into **4 independently-shippable phases**. Phase 1 (global styling) gives the quickest visible win; Phase 2 (page sections) is the "page builder" core; Phase 3 (header/footer) completes the shell; Phase 4 is polish.

## Key assumptions (confirm before building)

- **Design is per-domain, shared across languages.** The *layout/structure* (header, footer, section order, colors) is one design per domain. *Content* stays per-language as today. So a design section that shows "the Services page" must resolve to the current-language content (see Phase 2 decision).
- **Keep the 4 fixed templates as fallback.** A new `page_style = 4` ("Designer") opts a domain into the designer; existing templates keep working. No forced migration.
- **Mobile + desktop.** The designer targets both; sections/regions carry responsive options.
- **Reuse, don't reinvent:** the `kb-widget` payload pattern (`data-kb-payload` base64-JSON, `utils/blockWidgets.ts`), the CSS-variable theming (`assets/css/themes/*.css`), `ContentRenderer.vue`, and `blocks.css` (already global). No new drag library to start — match the existing native HTML5 DnD used in `BlockPalette.vue`.

## The data model — `SiteDesign` (JSON)

Persisted per domain. Single source of truth for the whole site look.

```jsonc
{
  "version": 1,
  "domain_id": 5,
  "style": {                       // -> CSS variables (Phase 1)
    "colors": { "primary": "#3b82f6", "primaryDark": "#1d4ed8",
                "bg": "#ffffff", "text": "#1f2937",
                "navBg": "#3b82f6", "footerBg": "#1f2937", "cardBg": "#ffffff" },
    "fonts":  { "heading": "Inter", "body": "Inter", "baseSize": 16 },
    "radius": 8, "spacing": 16
  },
  "header": {                      // -> PublicHeader render (Phase 3)
    "layout": "logo-left|logo-center|...",
    "regions": [ { "id": "left",  "items": [ {"type":"logo"}, {"type":"menu"} ] },
                 { "id": "right", "items": [ {"type":"social"}, {"type":"search"} ] } ]
  },
  "footer": {                      // -> PublicFooter render (Phase 3)
    "columns": [ { "items": [ {"type":"text","payload":{...}}, {"type":"social"} ] }, ... ]
  },
  "pages": {                       // -> section composition (Phase 2)
    "home":  { "sections": [ {"kind":"widget","type":"hero","payload":{...}},
                             {"kind":"content","menuId":12,"contentType":0},
                             {"kind":"content","contentType":4},
                             {"kind":"widget","type":"cta","payload":{...}} ] }
  }
}
```

A `section` slot is one of:
- `{ kind:"widget", type, payload }` — a free block (hero, cta, stats, columns…) reusing `utils/blockWidgets.ts`.
- `{ kind:"content", menuId?, contentType }` — binds to a tenant content section, resolved to the **current language** at render time (reuses `ContentRenderer.vue`).
- `{ kind:"banner" | "social" | ... }` — built-in slots.

## Backend changes (separate repo `khmerbiz-api` — contract only)

1. **New table `site_designs`**: `design_id, domain_id, design (JSON/TEXT), status (draft|published), created_at, updated_at`. One row per domain (one published + optionally one draft).
2. **Seed/migration**: for every existing domain, generate a default `design` from its current `settings.theme` + `settings.page_style` (map theme→colors, page_style→section order from its menu tree) so nothing visually breaks on opt-in.
3. **New endpoints**:
   - `GET /site/design?domain_id=` — returns the **published** design JSON. Fold this into the existing `GET /site/config` response so SSR hydration keeps working via `__NUXT_SITE_CONFIG__` (no extra round-trip).
   - `GET /admin/design?domain_id=` — full design (draft if present).
   - `PUT /admin/design?domain_id=` — save (upsert). Body = the `design` JSON.
   - `POST /admin/design/publish?domain_id=` — promote draft → published (Phase 4).
4. **Settings**: add `page_style = 4` ("Designer") semantics — when set, public render reads the design. (No new settings column strictly required; the design table carries the rest.)

## Frontend changes

### New (Phase 1+)
- `types/design.ts` — `SiteDesign`, `StyleTokens`, `Region`, `SectionSlot`, `WidgetBlock` interfaces; re-export from `types/index.ts`.
- `stores/design.ts` — `design` ref (readonly), `hydrateFromServer()` (reads design from `__NUXT_SITE_CONFIG__`), `loadDesign()`, `saveDesign()`, `applyStyleTokens()` that writes CSS variables onto the layout root. Mirror the pattern of `stores/domain.ts`.
- `composables/useSiteDesigner.ts` — builder state: add/move/remove sections & region items, undo/redo stack, dirty flag.
- `pages/admin/builder/index.vue` — the designer shell with tabbed panels (Style / Pages / Header / Footer) + live preview. (`pages/admin/builder/` already exists, empty.)
- `components/admin/designer/` — `DesignerPalette.vue` (draggable block/section sources, extends `BlockPalette.vue`), `DesignerCanvas.vue` (drop target + reorder), `StylePanel.vue`, `SectionList.vue`, `HeaderFooterEditor.vue`, `PreviewFrame.vue`.

### Modified
- `utils/blockWidgets.ts` — add page-level block types (`hero`, `cta`, `section-heading`, plus header/footer item types `logo`, `menu`, `social`, `search`, `text`). Each = one union member + `defaultData` + one `*Html` serializer + one dialog branch (the existing extension pattern).
- `composables/useTheme.ts` — add a `designMode` path; when on, `getThemeClass`/style come from the design tokens, not `settings.theme`.
- `layouts/default.vue` — when design mode is on, inject the design's CSS variables onto `.public-layout` (via `stores/design.ts.applyStyleTokens()`) and render `DesignerHeader`/`DesignerFooter` instead of the fixed `PublicHeader`/`PublicFooter`.
- `pages/index.vue` — when `settings.page_style === 4`, render a new `DesignerPage.vue` that loops `design.pages.home.sections` (resolving content slots per language) instead of selecting a fixed template.
- `components/public/` — add `DesignerPage.vue`, `DesignerHeader.vue`, `DesignerFooter.vue`, and a `DesignerSection.vue` dispatcher that renders `kind:widget` (reuse `previewHtml` from `utils/blockWidgets.ts` + `blocks.css`) or `kind:content` (reuse `ContentRenderer.vue`).
- `server/plugins/domain-hydration.ts` + domain resolver — ensure the published design is included in `__NUXT_SITE_CONFIG__` so SSR renders the designed site without a flash.
- `nuxt.config.ts` — no new global CSS needed (`blocks.css` + themes already registered). Add an admin-only designer CSS bundle if the canvas chrome must not leak to public.

## Phased build order (each phase ships on its own)

- **Phase 1 — Global style tokens (colors / fonts / spacing).** Style panel with color pickers + font/radius/spacing sliders → writes CSS vars → instant restyle. Persist to `design.style`. Smallest, highest-impact first step.
- **Phase 2 — Page section composer (the page-builder core).** Drag widget blocks + content sections onto the homepage canvas, reorder, configure each via `BlockWidgetDialog`. New `DesignerPage.vue` renders them.
  - *Decision to nail here:* how a `kind:"content"` slot binds across languages. Recommended: bind by **menu item** (the existing join key) and resolve current-language content through `/site/home` (which already returns `{menu,content}` per language). Avoids hardcoding language-specific `content_id`.
- **Phase 3 — Header/Footer composer.** Drag items (logo, menu, social, search, text, image) into header/footer regions; `DesignerHeader`/`DesignerFooter` render from `design.header`/`design.footer`.
- **Phase 4 — Polish.** Draft/publish, undo/redo, presets/templates ("start from a look"), per-page layouts beyond home, mobile-specific overrides, image uploads via existing `MediaPicker`/`/media/upload`.

## Risks & sharp edges

- **Multilingual content in payloads** — reuse the UTF-8-safe base64 (`encodePayload`/`decodePayload` in `utils/blockWidgets.ts`) so Khmer/Chinese survive.
- **SSR flash / hydration** — the design must ride the existing `__NUXT_SITE_CONFIG__` payload, not a client-only fetch, or the public site will flash the default template.
- **No drag library installed** — Phase 1 (no DnD) is unaffected. Phases 2–3 can use native HTML5 DnD (consistent with `BlockPalette.vue`); if reorder UX needs to be smoother, `vuedraggable@next` / `sortablejs` is the candidate (requires human-run `npm install` — Claude must not run npm per project rules).
- **Backend is a separate repo** — endpoints/table must be added there; this plan specifies the contract only.
- **Scope is large** — Phase 1 alone is a complete, useful feature. Recommend building and reviewing phase-by-phase rather than all at once.

## Verification (manual, dev server at http://localhost:8888)

- **Phase 1:** open `/admin/builder`, change primary color + font, save, reload `/` → public site restyles with no flash. Confirm `--primary-color` etc. applied on `.public-layout`.
- **Phase 2:** drag a Hero block + a News content section onto the homepage, reorder, save → public homepage shows them in that order; switch language → content section shows the other language's content, layout unchanged.
- **Phase 3:** rearrange header items (logo left, social right), save → public header reflects it on all pages.
- **Cross-check:** a domain with `page_style` 0–3 still renders the old fixed template unchanged (fallback path intact).
- **Per project rules:** Claude must not run `npm` commands — the human runs `npm run dev` / `npm install`. Memory confirms `npm run dev` is pre-authorized; other npm commands still need a human.
CREATE TABLE tblsite_design (
  site_design_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  domain_id      INT UNSIGNED NOT NULL,
  design         LONGTEXT NULL,
  status         TINYINT NOT NULL DEFAULT 1 COMMENT '0=draft, 1=published',
  created_at     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (site_design_id),
  UNIQUE KEY uk_domain (domain_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;