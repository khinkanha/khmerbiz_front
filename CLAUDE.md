# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi-tenant SaaS website platform built with Nuxt 3. Each domain/subdomain maps to a separate site with its own theme, content, and languages. The frontend connects to a separate backend API (khmerbiz-api).

## Commands

```bash
npm run dev        # Start dev server on port 8080
npm run build      # Production build
npm run generate   # Static site generation
npm run preview    # Preview production build
```

No test framework is configured. Node.js >= 19.0.0 required.

## Architecture

### Two-App Structure

The app splits into a **public site** (SSR) and an **admin panel** (client-side only):

- **Public pages** (`pages/index.vue`, future pages under `/pages/**`, `/article/**`, `/news/**`): SSR enabled, resolved domain config is injected server-side via `middleware/domain-resolver.server.ts`
- **Admin pages** (`pages/admin/**`): SSR disabled via route rules, auth-protected by `middleware/auth.global.ts`

### Layouts

- `layouts/default.vue` — Public layout with `PublicHeader`/`PublicFooter`, applies theme CSS class
- `layouts/admin.vue` — Admin layout with `AdminSidebar`/`AdminHeader`/`AdminBreadcrumb`

### Domain Resolution Flow

1. **Server middleware** (`middleware/domain-resolver.server.ts`): reads the `Host` header, calls `GET /site/config` with `X-Forwarded-Host`, stores config in `event.context`
2. **Domain store** (`stores/domain.ts`): on client mount, calls the same API to hydrate state — holds domain, settings, languages, banners, social media, and menu tree
3. **Theme/template selection**: `composables/useTheme.ts` maps `settings.page_style` to one of 4 template components (`ClassicMultiPage`, `ScrollingSinglePage`, `MagazineGrid`, `FullscreenHero`) and `settings.theme` to a CSS theme class

### API Layer

`composables/useApi.ts` — centralized API client using native `fetch`:
- JWT token management (access + refresh tokens in localStorage)
- Auto-refresh on 401 responses
- All API calls go through `apiFetch<T>()` which returns `ApiResponse<T>`
- Base URL from `runtimeConfig.public.apiBaseUrl`

### State Management

Pinia stores in `stores/`: `auth`, `domain`, `content`, `media`, `menu`, `setting`. The `domain` store is the primary one — it holds all site configuration and uses readonly refs with HMR support.

### Auth & Roles

`composables/useAuth.ts` + `stores/auth.ts`:
- JWT-based auth with login/signup/logout/profile/password change
- Roles: Super Admin (`user_level: -1`), Web Admin (`user_level: 1`), Normal User (`user_level: 2`)
- Global middleware redirects unauthenticated users to `/admin/login` for admin routes

### Internationalization

`@nuxtjs/i18n` with 5 locales (en, kh, ch, th, vn). Default locale is Khmer (`kh`). Strategy: `no_prefix` (no language prefix in URLs). Translation files in `i18n/locales/`. Additionally, the domain store manages language-specific content and menu trees per language ID.

### Theming

6 color themes (default, inverse, red, green, purple, yellow) defined in `assets/css/themes/`. Theme applied via CSS class on layout root. Custom Khmer fonts loaded via `assets/css/fonts.css`.

### Key Libraries

- **PrimeVue 4** with Aura theme (plugin config in `plugins/primevue.ts`)
- **Tailwind CSS** via `@nuxtjs/tailwindcss`
- **TinyMCE** (`@tinymce/tinymce-vue`) for rich text editing
- **Leaflet** (`@vue-leaflet/vue-leaflet`) for maps
- **Quill** for secondary editor

### Component Organization

Components are auto-imported with `pathPrefix: false`. Located under:
- `components/public/themes/` — template components rendered dynamically on homepage
- `components/public/layout/` — PublicHeader, PublicFooter
- `components/public/content/` — Content sections (articles, news, videos, photos, documents, maps)
- `components/admin/layout/` — AdminSidebar, AdminHeader, AdminBreadcrumb, LanguageSelector

### Backend API Contract

All endpoints are prefixed with the `apiBaseUrl` (default: `http://khmerbiz-api.localhost/api/v1`). Key endpoints:
- `GET /site/config` — domain-specific site configuration (requires `X-Forwarded-Host` header)
- `GET /menu/tree/:langId` — menu tree for a language
- `POST /auth/login`, `POST /auth/signup`, `POST /auth/refresh`, `GET /auth/profile`
