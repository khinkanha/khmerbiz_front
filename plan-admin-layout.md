# Admin Layout Plan — Based on khmer.biz

Mapped from the live khmer.biz admin panel at `http://khmerbiz.localhost/member/login`.
All 3 user roles explored: Super Admin (level -1), Web Admin (level 1), Normal User (level 2).

---

## Overall Layout Structure

```
┌──────────────────────────────────────────────────────────┐
│  HEADER BAR: Logo image (right-aligned) + Site branding  │
├──────────────────────────────────────────────────────────┤
│  NAV BAR: Dark (Bootstrap 3 inverse `.navbar-inverse`)   │
│  Left: Home | Settings | Menu | Content | Media | Users  │
│  Right: [Language btn] [View Site btn] User Dropdown ▼   │
├──────────────────────────────────────────────────────────┤
│  BREADCRUMB: Home > Section > Page                        │
│  Top-right: Language toggle (EN/KH) + View Website link  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  CONTENT AREA (varies per page — see below)              │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  FOOTER BAR: Sticky bottom                               │
│  KHMER.BIZ | User Guide | Telegram | YouTube             │
│  "Total database query: N, page generated X second"      │
└──────────────────────────────────────────────────────────┘
```

---

## Navigation by User Role

### Web Admin (level: 1) — kanha / Normal User (level: 2) — kkanha

**Left nav**: Home | Settings | Menu | Content | Media | Users

**Right nav**: Language toggle button (EN/KH) | View Website link (points to their assigned domain, e.g. `localhost:8080` or `nc.khmerbiz.localhost`) | User dropdown (Profile Setting, Password Setting, Logout)

> Levels 1 and 2 see **identical navigation**. Only difference is their assigned domain. Both get the same Quick Actions dashboard.

### Super Admin (level: -1) — superadmin

**Left nav**: Home | Admin ▼ dropdown (Users, Domain, Announcing)

**Right nav**: Same as Web Admin

> Super Admin manages **all domains** across the platform. No Settings/Menu/Content/Media access — those are domain-specific.

---

## Complete Page-by-Page Breakdown

### 1. Login (`/member/login`)

Layout: **Full-width centered**

- Logo image (right-aligned at top)
- Dark navbar with Home | Login (active)
- Breadcrumb: Home > Login
- **Login form** (centered, col-md-6 col-md-offset-3):
  - Username (text input)
  - Password (password input)
  - reCAPTCHA
  - Login button (blue primary)
  - Sign Up link button (blue info)
- Footer bar

### 2. Signup (`/member/signup`)

Layout: **Full-width centered form**

- **Signup form**:
  - Username + Full Name (2-column row)
  - Email + Phone (2-column row)
  - Sign Up button (blue primary)

### 3. Dashboard (`/member/`)

Layout: **Full-width**

- Breadcrumb: Home
- **Quick Actions panel** (`.panel.panel-default`):
  - 4 buttons in a horizontal row:
    - ⚙️ Settings → `/csetting/logo_setting/`
    - 📝 Manage Content → `/ccontent/list_content`
    - 🖼️ Upload Media → `/cmedia/list_media`
    - 👥 User Management → `/member/mlist`

### 4. Settings — 6 sub-pages with sidebar

Layout: **Left sidebar (col-md-2/3)** `.nav-pills.nav-stacked` + **Right content (col-md-10/9)**

#### 4a. Logo Setting (`/csetting/logo_setting`)
- Active sidebar pill highlighted
- **Form** (multipart):
  - Logo Position select: Top / Middle / Bottom
  - Logo Align select: Left / Center / Right
  - Desktop Logo file upload (height: 97px)
  - Mobile Logo file upload (97 x 97 pixels)
  - Save button (green `.btn-success`)

#### 4b. Menu Setting (`/csetting/menu_setting`)
- **Form**:
  - Menu Position select: Top / Middle / Bottom
  - Menu Alignment select: Left / Center / Right
  - Save button (green)

#### 4c. Slideshow Setting (`/csetting/banner_setting`)
- **Left half (col-md-6)** — Display settings:
  - Banner Position select
  - Banner Mode select
  - Banner Display radio: Default Page / All Pages
  - Save button
- **Right half (col-md-6)** — Slide Images panel (`.panel.panel-info`):
  - Image upload (1115 x 287 pixels)
  - Image Link text input
  - Image Title text input
  - Description text input
  - Image Language select: EN / KH
  - Add Image button (green)
  - Images table: #, Title, (preview), Delete link

#### 4d. Language Setting (`/csetting/language_setting`)
- **Form**:
  - Language Title text input
  - Flag Type select: KH / EN / CH / Th / VN (auto-submits on change)
  - Save button (green)
- **Languages table**: #, Language Name, Flag Icon, Star (default), Delete link

#### 4e. Social Setting (`/csetting/social_media`)
- **Form**:
  - Social Media select: Google+ / Facebook / Youtube / LinkedIn / Twitter
  - Link text input
  - Save button (green)
- **Social links table**: #, Platform, URL, Delete link

#### 4f. Other Setting (`/csetting/other_setting`)
- **Form** (multipart):
  - Website Title text input
  - Screen Mode select: Full Screen / Medium
  - Background Image upload + preview with remove button
  - Footer textarea (Normal Text / HTML Code) + Footer Alignment select (Left/Center/Right)
  - Theme Style select: Default / Dark / Red / Green / Purple / Yellow
  - Google Analytics ID text input
  - Widget Chat Script textarea
  - **Template Style Picker** — visual card grid:
    - Classic Multi-Page (nav + banner + body)
    - Scrolling Single-Page (dark nav + full sections)
    - Magazine Grid (magazine layout)
    - Fullscreen Hero (full-screen hero banner)
    - Each card shows a mini CSS preview of the layout
    - Selected card has green checkmark
  - Save button (green)

### 5. Menu — 3 sub-pages with sidebar

Layout: **Left sidebar (col-md-3)** + **Right table (col-md-9)**

#### 5a. List Menu (`/cmenu/item_list/{page}`)
- **Add button** (green + icon, top-right)
- **Menu table** (`table table-responsive`):
  - Columns: #, Name, Language, Parent, Order, Delete
  - Name column shows: menu name (link to edit) + content type icon + content name (link to content editor) + items management link (for Photo/Video/News/Doc types)
  - Language column: flag icon (e.g., `flag-icon-kh`)
  - Parent column: parent menu name or empty
  - Pagination

#### 5b. Add Menu (`/cmenu/add_menu_item/{id}`)
- **Form**:
  - Name text input
  - Language select (e.g., ខ្មែរ)
  - Parent select (Root + all existing menu items)
  - Save button (blue `.btn-primary`)

#### 5c. Clear Cache (`/cmenu/clear`)
- Clears menu cache

### 6. Content List (`/ccontent/list_content`)

Layout: **Full-width**

- **Search bar**: text input "Search via title..."
- **Add buttons** (top-right):
  - New Content (green + button)
  - New Map (blue map-marker button)
- **Content table** (`table table-bordered table-hover table-striped`):
  - Columns: #, Preview (eye button linking to `localhost:8080/article/{domainId}/{contentId}`), Title (link to edit), Content Type, Items (sitemap icon for Photo/Video/News/Doc), Edit/Delete
  - Content types in Khmer: អត្ថបទ (Article=0), រូបភាព (Photo=1), វីដេអូ (Video=2), ឯកសារ (Document=3), ពត៍មាន (News=4), ផែនទី (Map=5)

### 7. Content Edit Form (`/ccontent/add_content/{id}`)

Layout: **Full-width form**

- Preview eye button (top-right, links to public article view)
- **Form fields**:
  - Title (text input, full-width)
  - Language select + Menu select (2-column row)
  - Content Type select: អត្ថបទ / រូបភាព / វីដេអូ / ឯកសារ / ពត៍មាន
  - Description (TinyMCE rich text editor, ~25 rows height, with toolbar: forecolor, backcolor, fontselect, table, insertfile, undo/redo, styleselect, bold/italic, alignment, bullist/numlist, link/image, pagebreak)
  - Save button

### 8. Content Items (`/ccontent/add_item/{contentId}/{type}`)

Layout: **Left form (col-md-6)** + **Right list table (col-md-6)**

Section heading: Content type name in Khmer (e.g., "រូបភាព" for photos)

**Add form** (left):
- Title text input + Status select (Active/Inactive) — 2-column row
- Upload file input (e.g., "1000 x 800 pixels") + Media URL text input — 2-column row
  - Media URL has tooltip: "Put url here if your already uploaded the media"
- Short Description text input (full-width)
- Save button (blue `.btn-primary`)

**Items table** (right, `table table-bordered table-hover table-striped`):
- Columns: #, Title, Status (Visible/Hidden), Documents (eye preview), Edit (pencil), Delete (trash)

> Layout is identical for Photo (type=1), Video (type=2), Document (type=3). Only the upload label changes.

### 9. News Management (`/cnews/list_news/{contentId}/{itemId}/{page}`)

Layout: **Full-width**

- "Latest News" panel (`.panel.panel-info`)
- **Add button** (pull-right, plus icon, toggles inline form)
- **Create form** (inline, expandable):
  - "Create New" heading with close icon
  - Save Draft / Load Draft / Delete Draft buttons (pull-right)
  - Title + Status (បង្ហាញ/មិនបង្ហាញ) — 2-column row
  - Priority select: ទេ (No) / ចា៎/បាទ (Yes — featured)
  - Short Description + Primary Image upload (max 1000x800px) — 2-column row
  - Primary Image (URL) + Publish Date — 2-column row
  - Description (TinyMCE rich text editor)
  - Hidden fields: content_id, item_id
  - Save button (blue)
- **News list table** (`table table-bordered table-hover table-striped`):
  - Columns: Preview (eye, links to `localhost:8080/news/{domainId}/{contentId}/{newsId}`), #, Title, Short Description, Edit, Delete

### 10. Map Content (`/ccontent/map` or content with type=5)

Layout: **Full-width**

- Map content uses the standard content edit form with TinyMCE for description
- Map data (lat, lng, zoom, marker) is stored in the content description as JSON

### 11. Media Library (`/cmedia/list_media`)

Layout: **Full-width**

- **Search bar**: "Search via title..."
- **Add button** (blue info, toggles upload form)
- **Upload form** (collapsible, `.panel.panel-info`):
  - Title text input + File upload — 2-column row
  - Save button (blue `.btn-primary`)
- **Image preview modal** (custom modal with iframe for viewing files)
- **Media table** (`table table-responsive table-hover`):
  - Columns: #, Preview (eye icon), Title, URL (clickable link to DigitalOcean Spaces CDN)
  - Media stored at: `https://khmer.sgp1.digitaloceanspaces.com/{type}/{filename}`
  - Types: files/, photos/, logo/, banner/, logo/mobile/, background/

### 12. Users (`/member/mlist/{page}`) — Web Admin

Layout: **Full-width**

- **Add button** (blue info, toggles add user form)
- **Add User form** (collapsible, `.panel.panel-warning`):
  - "Add User" heading
  - Username + Full Name — 2-column row
  - Email + Phone — 2-column row
  - Save button (green `.btn-success`)
- **Users table** (`table table-responsive`):
  - Columns: #, Username (links to set password page), Full Name, Phone, Email, Domain

### 13. Profile (`/member/profile`)

Layout: **Full-width form**

- "Profile Setting" heading (h3)
- **Form**:
  - Email + Full Name — 2-column row
  - Phone (full-width)
  - Update button (blue `.btn-primary` with floppy icon)

### 14. Password (`/member/password`)

Layout: **Full-width form**

- "Password Setting" heading (h3)
- **Form**:
  - Current Password + New Password — 2-column row
  - Setting button (blue `.btn-primary` with floppy icon)

---

## Super Admin Pages (level -1 only)

### 15. Super Admin Dashboard (`/member/`)
- Same layout as Web Admin dashboard but **no Settings/Menu/Content/Media/Users** in top nav
- Only **Home** and **Admin dropdown** in nav bar

### 16. All Members (`/member/members`)
- Same layout as Web Admin Users page but shows **ALL platform users**
- **Add User form** (collapsible, `.panel.panel-warning`):
  - Labels in Khmer: ឈ្មោះអ្នកប្រើប្រាស់, នាមត្រកូល នឹង នាមខ្លួន, អ៊ីម៉ែល, លេខទូរស័ព្ទ
  - Save button (green, Khmer label: រក្សាទុក)
- **Users table**: ល.រ (#), ឈ្មោះប្រើប្រាស់, នាមត្រកូល នឹង នាមខ្លួន, លេខទូរស័ព្ទ, អ៊ីម៉ែល, ដូមែន
  - Username links to `/member/aupdate_password/{userId}` (superadmin can reset any user's password)

### 17. Domain List (`/cdomain/domain_list/{page}`)

Layout: **Left sidebar** (Domain List / New Domain) `.nav-pills.nav-stacked` + **Right table (col-md-9)**

- **Domains table**:
  - Columns: No, Domain (link to dashboard), Company, Phone, Permission (link to assign rights)
  - Paginated (3 pages)
  - Domain links go to `/cdomain/dashboard/{domainId}`

### 18. Domain Dashboard (`/cdomain/dashboard/{id}`)
- **Domain name** (h2 heading)
- **Overview panel** (`.panel.panel-info`):
  - Edit icon link (top-right) → `/cdomain/domain/{id}`
  - Table: Company Name, Phone Number, Email Address, Company Address, Status (ACTIVE)
  - Footer buttons: Suspend (red danger), Activate (yellow warning), Renew (green success)

### 19. Add Domain (`/cdomain/add_domain`)
- **Form**:
  - Domain Name + Company Name — 2-column row
  - Address + Company Description — 2-column row
  - Company Email + Company Phone — 2-column row
  - Save button (blue)

### 20. Announcing (`/cdomain/announce`)
- "Make an announcement" heading (h1)
- **Form**:
  - Subject text input (full-width)
  - To Email Address input (full-width)
  - "Send to all" checkbox
  - Message textarea (10 rows)
  - Send Email button (blue)

---

## Visual Design Patterns

### Colors & Style
- **Navbar**: Bootstrap 3 `.navbar-inverse` (dark gray/black background)
- **Font**: Battambang for body text, Moul for `.title` class headings
- **Buttons**: Bootstrap 3 style — green (`.btn-success`) for save/create, blue (`.btn-primary`/`.btn-info`) for add/info, red for danger, yellow for warning
- **Forms**: Bootstrap 3 `.form-control` inputs, 2-column `.row > .col-sm-6` grid for paired fields
- **Tables**: `.table-bordered.table-hover.table-striped` — Bootstrap 3 striped tables
- **Sidebar nav**: `.nav.nav-pills.nav-stacked` — vertical pill navigation with `.active` state
- **Panels**: `.panel.panel-info` (blue header), `.panel.panel-warning` (yellow), `.panel.panel-default` (gray)
- **Footer**: Sticky bottom bar (`position: sticky; bottom: 0`) with white background

### Form Layout Pattern
```
┌─────────────────────┬─────────────────────┐
│  Field Label 1      │  Field Label 2      │
│  [input]            │  [input/select]     │
├─────────────────────┴─────────────────────┤
│  Field Label 3 (full-width)               │
│  [input/textarea]                         │
├─────────────────────┬─────────────────────┤
│  Field Label 4      │  Field Label 5      │
│  [input]            │  [input]            │
├─────────────────────┴─────────────────────┤
│  [Save] button                            │
└───────────────────────────────────────────┘
```

### Settings Page Layout (with sidebar)
```
┌──────────┬────────────────────────────────┐
│ Sidebar  │  Main Content Area (col-10)    │
│ (col-2)  │                                │
│          │  Form with settings fields      │
│ • Logo   │  OR                             │
│ • Menu   │  Left form + Right table        │
│ • Slide  │  (for Banner sub-page)          │
│ • Lang   │                                │
│ • Social │                                │
│ • Other  │                                │
└──────────┴────────────────────────────────┘
```

### Content Items Page Layout (split)
```
┌──────────────────────┬──────────────────────┐
│  Add Form (col-md-6) │  Items List (col-md-6)│
│                      │                      │
│  Title    [Status]   │  # │ Title │ Status  │
│  Upload   [URL]      │  1 │ ...   │ ...     │
│  Description         │  2 │ ...   │ ...     │
│  [Save]              │  3 │ ...   │ ...     │
└──────────────────────┴──────────────────────┘
```

---

## Complete Route Mapping: khmer.biz → Nuxt Frontend

| # | khmer.biz Route | Description | Nuxt Route | Status |
|---|---|---|---|---|
| 1 | `/member/login` | Login form | `/admin/login` | Exists |
| 2 | `/member/signup` | Signup form | `/admin/signup` | Exists |
| 3 | `/member/` | Dashboard with Quick Actions | `/admin` | Exists, needs quick actions |
| 4 | `/csetting/logo_setting` | Logo Setting | `/admin/settings/logo` | Exists |
| 5 | `/csetting/menu_setting` | Menu Setting | `/admin/settings/index` | Exists (combined?) |
| 6 | `/csetting/banner_setting` | Slideshow Setting | `/admin/settings/banner` | Exists |
| 7 | `/csetting/language_setting` | Language Setting | `/admin/settings/index` | Needs sub-page |
| 8 | `/csetting/social_media` | Social Setting | `/admin/settings/index` | Needs sub-page |
| 9 | `/csetting/other_setting` | Other Setting + Template Picker | `/admin/settings/index` | Needs sub-page |
| 10 | `/cmenu/item_list/{page}` | Menu List | — | Needs page |
| 11 | `/cmenu/add_menu_item/{id}` | Add/Edit Menu | — | Needs page |
| 12 | `/ccontent/list_content` | Content List | `/admin/content` | Exists |
| 13 | `/ccontent/add_content/{id}` | Content Edit (TinyMCE) | `/admin/content/[id]` | Exists |
| 14 | `/ccontent/add_item/{id}/{type}` | Photo/Video/Doc Items | `/admin/content/[contentId]/items` | Exists |
| 15 | `/cnews/list_news/{id}/{iid}/{page}` | News Management | `/admin/content/[contentId]/news` | Exists |
| 16 | `/ccontent/map` | Map Content | `/admin/content/[contentId]/map` | Exists |
| 17 | `/cmedia/list_media` | Media Library | `/admin/media` | Exists |
| 18 | `/member/mlist/{page}` | Users (Web Admin) | — | Needs page |
| 19 | `/member/profile` | Profile Setting | `/admin/profile` | Exists |
| 20 | `/member/password` | Password Setting | `/admin/password` | Exists |
| 21 | `/member/members` | All Members (Super Admin) | — | Super admin, not yet |
| 22 | `/cdomain/domain_list` | Domain List (Super Admin) | — | Super admin, not yet |
| 23 | `/cdomain/dashboard/{id}` | Domain Detail (Super Admin) | — | Super admin, not yet |
| 24 | `/cdomain/add_domain` | Add Domain (Super Admin) | — | Super admin, not yet |
| 25 | `/cdomain/announce` | Announcements (Super Admin) | — | Super admin, not yet |
| 26 | `/member/update_user_password/{id}` | Set User Password | — | Needs page |
| 27 | `/cdomain/assign_right/{id}` | Assign Domain Permissions | — | Super admin, not yet |

---

## Key Takeaways

1. **Layout**: Top dark navbar (NOT sidebar) — khmer.biz uses Bootstrap 3 horizontal navbar with dropdown menus

2. **Settings** has 6 sub-pages with vertical pill sidebar (Logo, Menu, Slideshow, Language, Social, Other)

3. **Content items** (Photo/Video/Doc) use split layout: add form left, items table right

4. **News management** uses an inline expandable create form with Save Draft/Load Draft feature

5. **TinyMCE** rich text editor for article/news descriptions with custom toolbar

6. **Template picker** in Other Settings shows visual CSS previews of 4 template styles

7. **Media library** is a simple table list (not grid gallery) with file upload and preview modal

8. **Super Admin** has completely separate nav (Admin dropdown: Users, Domain, Announcing) — no access to domain-specific Settings/Content

9. **Level 1 & 2 users** see identical navigation — only difference is their assigned domain

10. **Breadcrumb** appears on every page for navigation context

11. **Language toggle** (EN/KH) button appears on every page's top-right area
