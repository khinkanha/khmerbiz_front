# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi-tenant SaaS website builder platform built with Nuxt 3. Organizations sign up, pick a domain, choose a theme, and get a fully functional website with content management, multi-language support, and an AI assistant — all managed through an admin panel. Each domain/subdomain maps to a separate site with its own theme, content, and languages. The frontend connects to a separate backend API (khmerbiz-api).

## Platform Features

### Public Website (what visitors see)

Four homepage templates selectable by the site admin:
- **ClassicMultiPage** — traditional multi-page layout with a section per menu item
- **ScrollingSinglePage** — single scrollable page with all content sections stacked
- **MagazineGrid** — magazine-style card grid layout
- **FullscreenHero** — hero-image-focused layout with large banner imagery

Each template renders content sections driven by the menu tree: articles (rich HTML), photo galleries (grid + lightbox), video embeds, document viewers, news/blog listings with pagination, and interactive Leaflet maps with location markers. A rotating banner slideshow and social media links (Facebook, Google, YouTube, LinkedIn, Twitter) appear in the header/footer. All content is served in the visitor's chosen language.

### Setup Wizard (`/admin/setup`)

New site owners go through a 3-step wizard:
1. **Language** — pick default language (Khmer, English, Chinese, Thai, Vietnamese) and flag icon
2. **Menus & Settings** — set site title, choose a starter menu structure (Home, About Us, Service, Contact Us)
3. **First Content** — pick a menu page, add a title and HTML description to create initial content

This gets a basic website live in minutes.

### Admin Panel (`/admin/**`)

**Content Management** (`/admin/content/`): CRUD for pages/sections. Each content record has a type (article, photo gallery, video, document, map, news), an HTML description stored as JSON, a status (published/draft), a priority for ordering, and sub-items (e.g. individual photos in a gallery). The content detail page (`/admin/content/[contentId]`) has tabs for items, map configuration, and news.

**Media Library** (`/admin/media/`): Upload flow uses S3 presigned URLs — client requests a presigned URL from the backend, uploads directly to DigitalOcean Spaces, then confirms. Supports images, videos, and documents with progress tracking. Files are organized by domain and type. Media URL base: `runtimeConfig.public.photoUrl` (`https://khmer.sgp1.digitaloceanspaces.com/`).

**Menu Management** (`/admin/menu/`): Hierarchical menu builder with parent-child relationships. Menus are per-language — each language gets its own tree. Menu items link to content sections or external URLs. Support for add, edit, delete, and reorder.

**Settings** (`/admin/settings/`): Grouped into sub-pages — site title and logo, theme/color selection (6 themes × 4 layouts), banner image management, social media link configuration, language management, and SEO settings (Google Analytics tracking ID).

**Profile & Security** (`/admin/profile`, `/admin/password`): User profile editing and password changes.

**reCAPTCHA** (`composables/useRecaptcha.ts`): Google reCAPTCHA v2 integration used on signup/login forms. Renders widget into a container element, retrieves response token for server-side verification, and resets after submission.

### Super Admin Panel (`/admin/super/**`)

Accessible only to `user_level === -1`:
- **Domains** (`/admin/super/domains/`) — create, edit, and manage all tenant domains. Each domain gets its own full site config (theme, settings, languages, content).
- **Users** (`/admin/super/users/`) — view and manage all platform users, assign roles (Super Admin, Web Admin, Normal User).
- **Announcements** (`/admin/super/announcing/`) — platform-wide announcement management.

### AI Chat Assistant (`composables/useAIChat.ts` + `stores/aiChat.ts`)

An in-admin AI assistant that can manage the website via natural language. Capabilities include creating/editing/deleting content and menu items, changing themes and colors, generating articles and SEO keywords, and running quick setup. Uses an async job-based architecture — requests return a job ID, client polls for completion. Limited to 10 questions per user per day. Shows tool-call results inline so the admin can see what actions the AI took.

### News Parser (`composables/useNewsParser.ts`)

Parses structured news content from JSON description fields. Extracts title, short/long descriptions, featured photo, and publish date. Used by the news listing and detail components.

### SEO (`composables/useSeo.ts`)

Dynamic meta tag management: sets `<title>`, `<meta description>`, Open Graph tags (`og:title`, `og:description`, `og:image`), and Twitter Card tags based on the current page's content. Google Analytics/Tag Manager integration via configurable tracking ID in settings.

### File Upload (`composables/useUpload.ts`)

Handles the S3 presigned URL upload flow: request presigned URL from backend → upload file directly to DigitalOcean Spaces → confirm upload with original filename. Tracks upload progress and handles errors/retries.

### Multi-Language System

Two layers of i18n:
1. **UI translations** via `@nuxtjs/i18n` — static UI strings in `i18n/locales/{en,kh,ch}.json`
2. **Content translations** via the domain store — content, menus, and settings are all fetched per `lang_id`, allowing each language to have completely different content and navigation

Languages available: Khmer (default), English, Chinese. The domain config from the backend may also include Thai and Vietnamese depending on the tenant's language setup. Language preference persisted in localStorage.

## Commands

```bash
npm run dev        # Start dev server on port 8888 (with --logLevel error)
npm run build      # Production build
npm run generate   # Static site generation
npm run preview    # Preview production build
```

No test framework is configured. Node.js >= 19.0.0 required.

## Architecture

### Two-App Structure

The app splits into a **public site** (SSR) and an **admin panel** (client-side only):

- **Public pages** (`/`, `/pages/[domainId]/[menuId]`, `/article/**`, `/news/[newsId]`, `/legal`): SSR enabled, domain config injected server-side
- **Admin pages** (`/admin/**`): SSR disabled via route rules, auth-protected by global middleware

### Domain Resolution Flow

1. **Server middleware** (`middleware/domain-resolver.server.ts`): reads `Host` header, calls `GET /site/config` with `X-Forwarded-Host`, stores config in `event.context`
2. **Nitro plugin** (`server/plugins/domain-hydration.ts`): serializes config into `<script>window.__NUXT_SITE_CONFIG__</script>` in the HTML head
3. **Domain store** (`stores/domain.ts`): on client mount, `hydrateFromServer()` reads `__NUXT_SITE_CONFIG__` to avoid re-fetching; falls back to API call if not present

### Template & Theme System

`composables/useTheme.ts` maps `settings.page_style` (0–3) to template components and `settings.theme` (0–5) to CSS theme classes. Theme CSS files in `assets/css/themes/`, applied via class on layout root element.

### API Layer

`composables/useApi.ts` — centralized API client using native `fetch`:
- JWT token management (access + refresh tokens in localStorage)
- Auto-refresh on 401 responses with retry
- Methods: `get`, `post`, `put`, `delete` — all go through `apiFetch<T>()` returning `ApiResponse<T>`
- FormData detection: auto-sets Content-Type based on body type
- Base URL from `runtimeConfig.public.apiBaseUrl` (default: `http://khmerbiz-api.localhost/api/v1`)

### State Management

Pinia stores in `stores/`: `auth`, `domain`, `content`, `media`, `menu`, `setting`, `user`, `aiChat`. The `domain` store is the primary one — it holds all site configuration, uses readonly refs with HMR support, and caches menu trees per language.

### Auth & Roles

`composables/useAuth.ts` + `stores/auth.ts` + three middleware files:
- `middleware/auth.global.ts` — global: initializes auth, fetches profile for admin routes, enforces role checks
- `middleware/auth.ts` — local: redirects unauthenticated users to `/admin/login`
- `middleware/guest.ts` — prevents authenticated users from accessing login/signup

Roles: Super Admin (`user_level: -1`), Web Admin (`user_level: 1`), Normal User (`user_level: 2`). Super admin routes (`/admin/super/**`) require `user_level === -1`.

### Admin Panel Structure

See **Platform Features** section above for detailed descriptions of each admin area. Route map:
- `/admin/` — Dashboard
- `/admin/content/[contentId]` — Content detail (tabs: items, map, news)
- `/admin/media/` — Media library
- `/admin/menu/` — Menu builder (list, `/menu/add`, `/menu/[id]`)
- `/admin/settings/` — Settings sub-pages (index, banner, language, logo, menu, social)
- `/admin/profile`, `/admin/password` — Profile & security
- `/admin/setup` — Setup wizard (3 steps)
- `/admin/super/domains/` — Domain management (super admin)
- `/admin/super/users/` — User management (super admin)
- `/admin/super/announcing/` — Announcements (super admin)

### Layouts

- `layouts/default.vue` — Public layout with `PublicHeader`/`PublicFooter`, applies theme CSS class
- `layouts/admin.vue` — Admin layout with `AdminNavbar`/`AdminBreadcrumb`/`AdminFooter`, initializes auth on mount
- `layouts/blank.vue` — Minimal layout with no chrome

### Internationalization

See **Multi-Language System** in Platform Features for the two-layer i18n design. `@nuxtjs/i18n` config: 3 locales (en, kh, ch), default `kh`, `no_prefix` strategy, lazy-loaded from `i18n/locales/`.

### Types

TypeScript interfaces in `types/`: `api.ts` (`ApiResponse<T>`, `PaginatedResponse<T>`), `domain.ts`, `setting.ts`, `menu.ts`, `content.ts`, `media.ts`, `user.ts`, `ai.ts`. Re-exported from `types/index.ts`. TypeScript strict mode and type checking are disabled.

### Key Libraries

- **PrimeVue 4** with Aura theme — 24 components registered in `plugins/primevue.ts`
- **Tailwind CSS** via `@nuxtjs/tailwindcss`
- **TinyMCE** (`@tinymce/tinymce-vue`) + **Quill** for rich text editing
- **Leaflet** (`@vue-leaflet/vue-leaflet`) for maps
- **Google reCAPTCHA v2** — `composables/useRecaptcha.ts` handles widget lifecycle (render, getResponse, reset). Used on signup/login forms.

### Component Organization

Auto-imported with `pathPrefix: false`:
- `components/public/themes/` — 4 template components rendered dynamically on homepage
- `components/public/layout/` — PublicHeader, PublicFooter
- `components/public/content/` — Content sections (articles, news, videos, photos, documents, maps)
- `components/admin/layout/` — AdminNavbar, AdminBreadcrumb, AdminFooter, LanguageSelector

### Backend API Contract

All endpoints prefixed with `apiBaseUrl`. Key endpoints:
- `GET /site/config` — domain-specific site config (requires `X-Forwarded-Host` header)
- `GET /site/menu?domain_id=X&lang_id=Y` — menu tree for a language/domain
- `GET /site/default?domain_name=X` — fallback when domain not found
- `POST /auth/login`, `POST /auth/signup`, `POST /auth/refresh`, `GET /auth/profile`
