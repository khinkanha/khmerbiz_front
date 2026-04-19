# Frontend Plan: Vue.js with Nuxt 3

## Context

Replace the server-rendered PHP templates (jQuery/Bootstrap 3) with a modern Vue.js frontend. The admin panel needs rich interactivity. Public pages need SSR for SEO (Khmer-language content must be indexed by Google).

## Tech Stack

| Component | Choice | Why |
|-----------|--------|-----|
| Framework | **Nuxt 3** | SSR for public pages + SPA for admin (hybrid rendering) |
| UI Library | **PrimeVue 4** | Rich admin components (DataTable, FileUpload, Editor/TinyMCE) |
| CSS | **Tailwind CSS** | Public theme styling, responsive design |
| State | **Pinia** | Vue 3 official state management |
| i18n | **@nuxtjs/i18n** | 5-language support (kh, en, ch, th, vn) |
| HTTP | **Axios** (via useApi composable) | JWT interceptors, refresh tokens |
| Maps | **Leaflet** | Map display and editor |
| Rich Text | **@tinymce/tinymce-vue** | Same editor as current admin |

## Dependencies

```json
{
  "dependencies": {
    "nuxt": "^3.9",
    "vue": "^3.4",
    "vue-router": "^4.2",
    "pinia": "^2.1",
    "@pinia/nuxt": "^0.5",
    "primevue": "^4.0",
    "primeicons": "^7.0",
    "@primevue/themes": "^4.0",
    "tailwindcss": "^3.4",
    "@nuxtjs/i18n": "^8.0",
    "@tinymce/tinymce-vue": "^6.0",
    "axios": "^1.6",
    "leaflet": "^1.9",
    "@vue-leaflet/vue-leaflet": "^0.10"
  },
  "devDependencies": {
    "typescript": "^5.3",
    "nuxt-primevue": "^0.3",
    "@nuxt/devtools": "^1.0",
    "sass": "^1.69"
  }
}
```

## Rendering Strategy

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/admin/**': { ssr: false },     // Admin = SPA (no SEO needed)
    '/': { ssr: true },              // Public = SSR (SEO critical)
    '/pages/**': { ssr: true },
    '/article/**': { ssr: true },
    '/news/**': { ssr: true },
    '/legal': { ssr: true },
  }
})
```

## Project Structure

```
frontend/
  nuxt.config.ts
  app.vue
  tailwind.config.ts

  assets/
    css/
      fonts.css                    # Khmer fonts: Moul, Battambang, Khmer
      themes/
        default.css                # STYLE_DEFAULT = 0
        inverse.css                # STYLE_INVERSE = 1
        red.css                    # STYLE_RED = 2
        green.css                  # STYLE_GREEN = 3
        purple.css                 # STYLE_PURPIL = 4
        yellow.css                 # STYLE_YELLOW = 5

  public/
    flag/                          # Language flag icons (copied from existing /flag/)
    favicon.ico

  components/
    admin/
      layout/
        AdminSidebar.vue           # Navigation sidebar
        AdminHeader.vue            # Top bar with user menu
        AdminBreadcrumb.vue
      dashboard/
        DashboardStats.vue
        QuickActions.vue
        SetupWizard.vue
      content/
        ContentList.vue            # Content table with search/pagination
        ContentForm.vue            # Add/edit content with TinyMCE
        ContentItemForm.vue        # Add/edit content items (photo/video/doc)
        NewsList.vue
        NewsForm.vue
        MapEditor.vue              # Leaflet map editor
      menu/
        MenuList.vue
        MenuForm.vue
        MenuTree.vue               # Drag-and-drop reorder
      settings/
        GeneralSettings.vue
        LogoSettings.vue
        BannerSettings.vue
        LanguageSettings.vue
        SocialMediaSettings.vue
      media/
        MediaGrid.vue
        MediaUploader.vue          # S3 pre-signed URL upload
      users/
        UserList.vue
        ProfileForm.vue
        PasswordForm.vue
      shared/
        RichTextEditor.vue         # TinyMCE wrapper
        FileUpload.vue
        Pagination.vue
        ConfirmDialog.vue

    public/
      layout/
        PublicHeader.vue
        PublicFooter.vue
        PublicNav.vue
        LanguageSelector.vue
        BannerSlideshow.vue
      themes/
        ClassicMultiPage.vue       # page_style=0
        ScrollingSinglePage.vue    # page_style=1
        MagazineGrid.vue           # page_style=2
        FullscreenHero.vue         # page_style=3
      content/
        ArticleSection.vue         # TYPE_ARTICLE=0
        PhotoGallery.vue           # TYPE_PHOTO=1
        VideoSection.vue           # TYPE_VIDEO=2
        DocumentSection.vue        # TYPE_DOCUMENT=3
        NewsSection.vue            # TYPE_NEWS=4
        MapDisplay.vue             # TYPE_MAP=5
        NewsDetail.vue

  composables/
    useApi.ts                      # Axios wrapper with JWT interceptors
    useDomain.ts                   # Domain resolution from hostname
    useAuth.ts                     # Auth guard/check
    useSeo.ts                      # Meta tags, OG tags, GA
    useTheme.ts                    # Theme resolver (page_style -> component)
    useUpload.ts                   # S3 pre-signed URL upload flow

  layouts/
    default.vue                    # Public layout (header + content + footer)
    admin.vue                      # Admin layout (sidebar + header + content)
    blank.vue                      # Login/signup (no nav)

  middleware/
    auth.global.ts                 # JWT check for /admin/** routes
    domain-resolver.server.ts      # Resolve domain from Host header
    guest.ts                       # Redirect authenticated users from login

  pages/
    index.vue                      # Public home page

    pages/
      [domainId]/
        [menuItemId]/
          index.vue                # Page view
          [page].vue               # Paginated content

    article/
      [domainId]/
        [contentId]/
          index.vue                # Article view
          [page].vue               # Paginated article

    news/
      [domainId]/
        [contentId]/
          [newsId].vue             # News detail

    legal.vue                      # Privacy/TOS

    admin/
      index.vue                    # Dashboard
      login.vue
      signup.vue
      content/
        index.vue                  # Content list
        [id].vue                   # Add/edit content
        [contentId]/
          items.vue                # Content items
          news.vue                 # News management
        map.vue                    # Map editor
      menu/
        index.vue
        [id].vue
      settings/
        index.vue                  # General
        logo.vue
        banner.vue
        language.vue
        social.vue
      media/
        index.vue
      users/
        index.vue
        [id].vue
      profile.vue
      password.vue

  server/
    middleware/
      domain-resolver.ts           # Resolve domain from Host header

  stores/
    auth.ts                        # User, token, login/logout/refresh
    domain.ts                      # Current domain, languages, language switching
    content.ts                     # Content CRUD, items, news
    menu.ts                        # Menu tree, CRUD, reorder
    setting.ts                     # Settings, banners, social media
    media.ts                       # Media list, upload progress

  types/
    domain.ts
    content.ts
    menu.ts
    setting.ts
    user.ts
    media.ts
    api.ts

  i18n/
    locales/
      en.json                      # From data/lang.json "en" key
      kh.json                      # From data/lang.json "kh" key
      ch.json                      # From data/lang.json "ch" key
      th.json                      # From data/lang.json "th" key
      vn.json                      # From data/lang.json "vn" key
```

## Route Map

### Public Routes (SSR — SEO Critical)

| Route | PHP Equivalent | Purpose |
|-------|---------------|---------|
| `/` | `Home::index()` | Homepage (theme from settings) |
| `/pages/:domain/:menuItem` | `Home::pages()` | Content page |
| `/pages/:domain/:menuItem/:p` | `Home::pages()` | Paginated content |
| `/article/:domain/:item` | `Home::article()` | Article view |
| `/article/:domain/:item/:p` | `Home::article()` | Paginated article |
| `/news/:domain/:content/:news` | `Home::news()` | News detail |
| `/legal` | `Home::legal()` | Privacy/TOS |

### Admin Routes (SPA — No SEO)

| Route | PHP Equivalent | Purpose |
|-------|---------------|---------|
| `/admin` | Dashboard | Admin dashboard |
| `/admin/login` | `Member::login()` | Login form |
| `/admin/signup` | `Member::signup()` | Registration |
| `/admin/content` | `Ccontent::list_content()` | Content list |
| `/admin/content/:id` | `Ccontent::add_content()` | Add/edit content |
| `/admin/content/:id/items` | `Ccontent::add_item()` | Content items |
| `/admin/content/:id/news` | `Cnews::list_news()` | News management |
| `/admin/content/map` | `Ccontent::map()` | Map editor |
| `/admin/menu` | `Cmenu::item_list()` | Menu list |
| `/admin/menu/:id` | `Cmenu::add_menu_item()` | Add/edit menu |
| `/admin/settings` | `Csetting::other_setting()` | General settings |
| `/admin/settings/logo` | `Csetting::logo_setting()` | Logo settings |
| `/admin/settings/banner` | `Csetting::banner_setting()` | Banner settings |
| `/admin/settings/language` | `Csetting::language_setting()` | Language settings |
| `/admin/settings/social` | `Csetting::social_media()` | Social media |
| `/admin/media` | `Cmedia::list_media()` | Media library |
| `/admin/users` | `Member::mlist()` | User list |
| `/admin/profile` | `Member::profile()` | Profile |
| `/admin/password` | `Member::password()` | Password change |

## Theme Architecture

Settings determine which theme component to render:

```typescript
// composables/useTheme.ts
const THEME_MAP: Record<number, string> = {
  0: 'ClassicMultiPage',      // views/home.php
  1: 'ScrollingSinglePage',   // views/tmp/index.php
  2: 'MagazineGrid',          // views/tmp/magazine.php
  3: 'FullscreenHero',        // views/tmp/hero.php
}
```

Each theme receives identical props:

```typescript
interface ThemeProps {
  menuTree: MenuItem[]
  contentSections: ContentSection[]
  banners: Banner[]
  settings: Setting
  domain: Domain
  socialMedia: SocialMedia[]
  language: Language
}
```

### Theme Descriptions

**ClassicMultiPage** (page_style=0) — Traditional multi-page layout from `views/home.php`. Static navbar, banner slideshow, content sections with page navigation.

**ScrollingSinglePage** (page_style=1) — Single-page scroll from `views/tmp/index.php`. All content in sections with anchor navigation. Hero background image.

**MagazineGrid** (page_style=2) — Card-based grid from `views/tmp/magazine.php`. Featured first item, dropdown navigation, sidebar for recent items.

**FullscreenHero** (page_style=3) — Full-viewport hero from `views/tmp/hero.php`. Transparent navbar, scroll-down arrow, background sections.

### Content Type Components (shared across themes)

| Type | Constant | Component | Description |
|------|----------|-----------|-------------|
| 0 | TYPE_ARTICLE | `ArticleSection.vue` | HTML content from TinyMCE |
| 1 | TYPE_PHOTO | `PhotoGallery.vue` | Grid gallery with lightbox |
| 2 | TYPE_VIDEO | `VideoSection.vue` | YouTube/embed grid |
| 3 | TYPE_DOCUMENT | `DocumentSection.vue` | File download list |
| 4 | TYPE_NEWS | `NewsSection.vue` | News card grid + detail view |
| 5 | TYPE_MAP | `MapDisplay.vue` | Leaflet map with marker |

## Multi-Domain Resolution

Server middleware resolves domain from `Host` header (replaces PHP `DomainController`):

```typescript
// server/middleware/domain-resolver.ts
export default defineEventHandler(async (event) => {
  const host = getHeader(event, 'host')?.replace('www.', '')
  const domain = await $fetch(`http://localhost:3000/api/v1/site/config`, {
    headers: { 'X-Forwarded-Host': host }
  })
  event.context.domain = domain
})
```

The composable `useDomain.ts` makes this available to all components:

```typescript
// composables/useDomain.ts
export const useDomain = () => {
  const domain = useState('domain', () => null)
  const resolveDomain = async () => {
    const { data } = await useFetch('/api/v1/site/config')
    domain.value = data.value
  }
  return { domain, resolveDomain }
}
```

## Pinia Stores

### `stores/auth.ts`
Replaces `$_SESSION['userid']`, `Security::getUser()`.

```typescript
// State
{
  user: User | null,
  token: string | null,
  refreshToken: string | null,
  isAuthenticated: boolean
}

// Actions
login(username: string, password: string): Promise<void>
logout(): void
refreshToken(): Promise<void>
fetchProfile(): Promise<void>
```

### `stores/domain.ts`
Replaces `$this->my_domain` from `DomainController`.

```typescript
// State
{
  currentDomain: Domain | null,
  allLanguages: Language[],
  currentLanguage: Language | null
}

// Actions
resolveDomain(): Promise<void>
setLanguage(langId: number): void
fetchLanguages(): Promise<void>
```

### `stores/content.ts`
Replaces `Content`, `Content_Item`, `News` model interactions.

```typescript
// State
{
  contents: Content[],
  currentContent: Content | null,
  contentItems: ContentItem[],
  newsList: News[],
  pagination: { page, limit, total }
}

// Actions
fetchContents(page?: number, search?: string): Promise<void>
fetchContent(id: number): Promise<void>
saveContent(data: ContentForm): Promise<number>
deleteContent(id: number): Promise<void>
fetchItems(contentId: number): Promise<void>
saveItem(data: ItemForm): Promise<void>
deleteItem(id: number): Promise<void>
fetchNews(contentId: number, page?: number): Promise<void>
saveNews(data: NewsForm): Promise<void>
deleteNews(id: number): Promise<void>
```

### `stores/menu.ts`
Replaces `Menu_Item` model and `menu_cache`.

```typescript
// State
{
  menuTree: MenuItem[],
  menuItems: MenuItem[],
  menuCache: Record<number, MenuItem[]>
}

// Actions
fetchMenuTree(): Promise<void>
addMenuItem(data: MenuForm): Promise<void>
updateMenuItem(id: number, data: MenuForm): Promise<void>
deleteMenuItem(id: number): Promise<void>
reorderMenu(id: number, direction: 'up' | 'down'): Promise<void>
clearCache(): Promise<void>
```

### `stores/setting.ts`
Replaces `Setting`, `Banner`, `SocialMedia` models.

```typescript
// State
{
  settings: Setting | null,
  banners: Banner[],
  socialMedia: SocialMedia[]
}

// Actions
fetchSettings(): Promise<void>
updateSettings(data: Partial<Setting>): Promise<void>
fetchBanners(): Promise<void>
addBanner(data: BannerForm): Promise<void>
deleteBanner(id: number): Promise<void>
fetchSocialMedia(): Promise<void>
addSocialMedia(data: SocialForm): Promise<void>
deleteSocialMedia(id: number): Promise<void>
```

### `stores/media.ts`
Replaces `Media` model and file upload logic.

```typescript
// State
{
  mediaList: Media[],
  uploadProgress: number,
  pagination: { page, limit, total }
}

// Actions
fetchMedia(page?: number): Promise<void>
getPresignedUrl(fileName: string, fileType: string, folder: string): Promise<string>
uploadToS3(url: string, file: File): Promise<void>
confirmUpload(key: string, originalName: string): Promise<number>
deleteMedia(id: number): Promise<void>
```

## i18n Setup

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'kh', name: 'ខ្មែរ', file: 'kh.json' },
      { code: 'ch', name: '中文', file: 'ch.json' },
      { code: 'th', name: 'ไทย', file: 'th.json' },
      { code: 'vn', name: 'Tiếng Việt', file: 'vn.json' },
    ],
    defaultLocale: 'kh',
    lazy: true,
    langDir: 'i18n/locales',
    strategy: 'no_prefix',  // Session-based, not URL-based (same as PHP)
  }
})
```

Locale files extracted from existing `data/lang.json` — split each top-level key (`en`, `kh`, `ch`, `th`, `vn`) into its own file.

## JWT Authentication Flow

```
1. Login form → POST /api/v1/auth/login
2. API returns { accessToken, refreshToken, user }
3. Pinia auth store saves tokens
4. Axios interceptor adds Authorization: Bearer <token> to all admin requests
5. On 401 response → auto-refresh via POST /api/v1/auth/refresh, retry original
6. auth.global.ts middleware protects /admin/** routes
```

### Middleware: `auth.global.ts`

```typescript
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  if (to.path.startsWith('/admin') &&
      to.path !== '/admin/login' &&
      to.path !== '/admin/signup' &&
      !auth.isAuthenticated) {
    return navigateTo('/admin/login')
  }
})
```

## SEO Strategy

```typescript
// composables/useSeo.ts
export const useSeo = (settings: Setting, content?: any) => {
  useSeoMeta({
    title: settings.title,
    ogSiteName: settings.domain_name,
    ogTitle: content?.title,
    ogImage: content?.photo ? `${photoUrl}${content.photo}` : undefined,
    ogDescription: content?.shortdes,
  })

  // Google Analytics
  if (settings.tracking_id) {
    useHead({
      script: [{
        src: `https://www.googletagmanager.com/gtag/js?id=${settings.tracking_id}`,
        async: true
      }, {
        innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${settings.tracking_id}')`
      }]
    })
  }
}
```

### Khmer Font Loading

```css
/* assets/css/fonts.css */
@import url('https://fonts.googleapis.com/css2?family=Battambang:wght@100;300;400;700;900&family=Khmer&family=Moul&display=swap');
```

```javascript
// tailwind.config.ts
fontFamily: {
  khmer: ['Khmer', 'serif'],
  moul: ['Moul', 'serif'],
  battambang: ['Battambang', 'system-ui'],
}
```

## Implementation Phases

| Phase | Weeks | Deliverables |
|-------|-------|-------------|
| 1. Scaffold | 1-2 | Nuxt 3 project, Tailwind + PrimeVue, Pinia stores, useApi composable, i18n, TypeScript types |
| 2. Auth + Admin Shell | 2-3 | Login, signup, admin layout (sidebar, header, breadcrumb), JWT flow, auth middleware |
| 3. Content Management | 3-5 | Content list/create/edit with TinyMCE, content items, news editor, map editor (Leaflet) |
| 4. Settings + Media | 5-6 | All settings pages, S3 media upload with pre-signed URLs, user management |
| 5. Public Themes | 6-8 | All 4 theme components, 6 content type components, domain middleware, SEO meta tags |
| 6. Integration + Deploy | 8-10 | Wire all pages to Node.js API, test all CRUD, SEO audit, deploy |

## Critical PHP Files to Reference

- `controllers/home.php` — All 4 theme rendering methods and menu/content logic (800 lines)
- `class/DomainController.php` — Domain resolution, language/banner loading
- `views/template/aheader.php` — Admin layout, TinyMCE config, navigation structure
- `views/template/header.php` — Public header, meta tags, GA script, banner slideshow
- `views/template/footer.php` — Footer with social media links
- `data/lang.json` — Translation data to split into locale files
- `class/Setting.php` — All configurable properties and theme/template definitions
- `views/tmp/index.php` — Single page theme template
- `views/tmp/magazine.php` — Magazine theme template
- `views/tmp/hero.php` — Hero theme template
- `views/home.php` — Classic multi-page theme template
