# KhmerBiz CMS — Web Admin User Guide

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Dashboard](#2-dashboard)
3. [Content Management](#3-content-management)
4. [Menu Management](#4-menu-management)
5. [Media Library](#5-media-library)
6. [Settings](#6-settings)
7. [AI Chat Assistant](#7-ai-chat-assistant)
8. [Quick Setup Wizard](#8-quick-setup-wizard)
9. [Profile & Password](#9-profile--password)
10. [Roles & Super Admin](#10-roles--super-admin)
11. [Making Your Site Bilingual](#11-making-your-site-bilingual)

---

## 1. Getting Started

### Logging In

1. Go to your admin login page: `https://<your-domain>/member/login`
2. Enter your **username** and **password**
3. Complete the **reCAPTCHA** ("I'm not a robot") check
4. Click **Login**

### After Login

You'll land on the **Dashboard** — your central hub for managing the website. From here you can navigate to all management sections.

---

## 2. Dashboard

The Dashboard provides an overview of your website and quick access to all management tools:

- **Quick Actions** — Shortcuts to common tasks (add content, manage menus, change settings)
- **Statistics** — Overview of your content, media, and users
- **Recent Activity** — Latest changes made to your site

---

## 3. Content Management

Content is the pages and sections of your website. Each piece of content is linked to a menu item and has a specific type.

### Content Types

| Type | Description |
|------|-------------|
| **Article** | Rich text pages with HTML content (About Us, Services, etc.) |
| **Photo Gallery** | Image collections displayed in a grid with lightbox |
| **Video** | Embedded video links (YouTube, Vimeo, etc.) |
| **Document** | File attachments and document viewers |
| **Map** | Interactive map with a location marker |
| **News/Blog** | News articles with title, description, image, and publish date |

### Creating Content

1. Go to **Content** in the sidebar
2. Click **Add New**
3. Fill in the form:
   - **Title** *(required)* — the page/section heading
   - **Content Type** *(required)* — Article, Photo, Video, Document, Blog News, or Map
   - **Description** — rich-text (TinyMCE) editor; mainly used for **Article** content
   - **Menu** *(required)* — the menu item this content belongs to. **The language is set automatically** from the menu you choose (each menu belongs to one language), so there is no separate language field.
   - **Status** — toggle **Published** (visible on the public site) or **Draft** (hidden)
4. Click **Save**

> 💡 **Tip:** For Photo, Video, Document, News, and Map types, this form only creates the *section*. You add the actual photos / videos / files / articles in the next step (see below).

### The two-step workflow (Photo / Video / Document / News / Map)

Most content types are built in two steps:

1. **Create the content section** (title + type + menu + status) — described above.
2. **Open the section** and add the individual entries using the buttons on the right of the edit page:
   - **Photo / Video / Document** → click **Items** to open the items table
   - **Blog News** → click **Blog News** to open the news manager
   - **Map** → click **Show Map** to configure the map

### Photo Gallery items

1. Open a **Photo** content section → click **Items**
2. Click **Add New**
3. Fill in:
   - **Title** *(required)* — caption shown under the photo
   - **Primary Image** — choose **Upload** (pick an image file) or **URL** (paste `https://…/image.jpg`). A preview appears.
4. Click **Add**. Repeat for each photo.
5. Use the **pencil** (edit) or **trash** (delete) icons on each row.

> The gallery renders as a grid with a lightbox on the public site.

### Video items

1. Open a **Video** content section → click **Items**
2. Click **Add New**
3. Enter:
   - **Title** *(required)*
   - **Video Link** — paste a **YouTube** or **Vimeo** URL (e.g. `https://www.youtube.com/watch?v=…`). It is embedded automatically.
4. Click **Add**.

### Document items

1. Open a **Document** content section → click **Items**
2. Click **Add New**
3. Enter:
   - **Title** *(required)*
   - **Description** *(optional)*
   - **File** — paste a direct **URL** to the document (e.g. a PDF). The **Upload** button only accepts images, so non-image documents must be linked by URL.
4. Click **Add**.

### News articles

1. Open a **Blog News** content section → click **Blog News**
2. Click **Add New**
3. Fill in:
   - **Title** *(required)* — headline
   - **Short Description** — brief summary shown in the news **listing** and cards
   - **Description** — full article (rich-text editor); shown on the article **detail** page
   - **Primary Image** — cover/thumbnail (Upload or URL)
   - **Publish Date** — when the article appears
   - **Status** — **Show** (visible) or **Not Show** (hidden)
   - **Priority** — checkbox to mark as important
   - **Feature Item** — toggle to highlight/feature this article
4. Click **Add**.

> News listings on the public site are paginated. **Short Description** appears in the list; **Description** appears when a visitor opens the article.

### Map content

1. Open a **Map** content section → click **Show Map**
2. Set **latitude** and **longitude** (the default is Phnom Penh: `11.5564, 104.9282`)
3. Add a **title** and **description** for the marker
4. Toggle **visible** to show/hide the map
5. Click **Save**

> Tip: to find coordinates, right-click a place on Google Maps — the lat/lng appears.

### Editing & deleting content

1. In the **Content** list, click the **pencil** (✏️) to edit a section, or the **list** icon to manage its items.
2. Update fields and **Save**.
3. Click the **trash** (🗑️) to delete — you'll be asked to confirm.

> ⚠️ **Warning:** Deleted content cannot be recovered.

### Draft vs Published

- **Published** content is live on the public website.
- **Draft** content is saved but **not visible** to visitors — use it to work on a page before releasing it.
- Use the **Status** and **Content Type** filters at the top of the content list to find items quickly.

---

## 4. Menu Management

Menus define your website's navigation structure. Each menu item links to a content page or external URL.

### Understanding Menu Structure

- **Top-level items** appear in the main navigation bar
- **Sub-items** (children) appear in dropdown menus under their parent
- Menus are **per-language** — each language has its own menu tree

### Creating a Menu Item

1. Go to **Menu** in the sidebar
2. Click **Add New**
3. Fill in:
   - **Menu Name** — The text shown in navigation (e.g., "About Us")
   - **Menu URL** — Optional link (leave blank if linking to content)
   - **Parent Menu** — Select parent for sub-menus, or "None" for top-level
   - **Language** — Which language this menu is for
   - **Order** — Display position (lower numbers appear first)
4. Click **Save**

### Reordering Menus

1. Find the menu item in the list
2. Click the **up/down arrows** to move it higher or lower

### Editing a Menu Item

1. Click the **pencil icon** (✏️) next to the menu item
2. Update the name, URL, or order
3. Click **Save**

### Deleting a Menu Item

1. Click the **trash icon** (🗑️)
2. Confirm deletion

> ⚠️ **Note:** Deleting a menu item does **not** delete its linked content.

> 💡 **This page manages menu *items* (the links).** To change the menu bar's **position** and **alignment**, go to **Settings → Menu** (see [6.6 Menu Position & Alignment](#66-menu-position--alignment)).

---

## 5. Media Library

The media library manages all images, videos, and documents uploaded to your website. Files are stored on cloud storage (DigitalOcean Spaces).

### Uploading Files

1. Go to **Media** in the sidebar
2. Click **Choose File** or drag and drop
3. Select your file(s) — supports images, videos, and documents
4. The upload process:
   - A presigned URL is generated for secure upload
   - Your file uploads directly to cloud storage
   - A confirmation record is created in the system
5. Once uploaded, the file appears in your media library

### Using Media in Content

- When adding an image to content, you can reference the file URL from the media library
- The image URL format is: `https://khmer.sgp1.digitaloceanspaces.com/your-file-path`

### Deleting Media

1. Find the file in the media library
2. Click the **trash icon** (🗑️)
3. Confirm deletion

---

## 6. Settings

Settings control the appearance and behavior of your public website.

### 6.1 General Settings

Go to **Settings → General**

- **Website Title** — your site name (shown in the browser tab and header)
- **Background Image** — optional background image (upload)
- **Screen Mode** — **Full Screen** or **Medium**
- **Footer** — text or HTML for the bottom of the site
- **Footer Alignment** — **Left**, **Center**, or **Right**
- **Theme Style** — color theme:

| Value | Theme |
|-------|-------|
| Default | Light / standard |
| Dark | Dark mode |
| Red | Red scheme |
| Green | Green scheme |
| Purple | Purple scheme |
| Yellow | Yellow scheme |

- **Google Analytics Tracking ID** — for visitor analytics
- **Widget Chat** — paste a third-party chat widget's embed script
- **Choose Template Style** — pick the homepage layout by clicking one of the four preview cards:

| Card | Layout |
|------|--------|
| Classic Multi-Page | Traditional website; a separate page per menu item |
| Scrolling Single-Page | All sections on one scrollable page |
| Magazine/News Grid | Card-based magazine layout with a sidebar |
| Fullscreen Hero | Large full-screen hero image with sections below |

Click **Save** to apply. (The **Theme Style** sets colors; the **Template Style** sets the page layout — they are independent.)

### 6.2 Logo Settings

Go to **Settings → Logo**

- **Logo Image** — Upload or set your logo image URL
- **Mobile Logo** — Optional separate logo for mobile devices
- **Logo Position** — Left, Center, or Right
- **Logo Alignment** — Alignment within its position

### 6.3 Banner Settings

Go to **Settings → Banner**

- **Slide Display** — enable/disable the banner slideshow
- **Slide Mode** — how slides transition
- **Slide Position** — where the banner appears

**Managing banner images:** add one or more banners, each with a **Title**, **Image** (URL), optional **Link**, and **Size**. Change the display **order** to reorder, and delete banners you no longer need.

### 6.4 Social Media Links

Go to **Settings → Social Media**

Add links to your social media profiles:
- **Facebook** (type 1)
- **Google** (type 2)
- **YouTube** (type 3)
- **LinkedIn** (type 4)
- **Twitter** (type 5)

For each, enter the full URL (e.g., `https://facebook.com/yourpage`).

### 6.5 Language Management

Go to **Settings → Language**

- **Add Language** — Add support for a new language:

| Flag | Language |
|------|----------|
| 🇰🇭 0 | Khmer |
| 🇺🇸 1 | English |
| 🇨🇳 2 | Chinese |
| 🇹🇭 3 | Thai |
| 🇻🇳 4 | Vietnamese |

- **Set Default** — Choose which language visitors see by default
- **Delete Language** — Remove a language (also removes its menus and content)

> ⚠️ **Important:** Each language has its own set of menus and content. Adding a language means you'll need to create menus and content for it.

### 6.6 Menu Position & Alignment

Go to **Settings → Menu**

- **Menu Position** — **Top**, **Middle**, or **Bottom**
- **Menu Alignment** — **Left**, **Center**, or **Right**

Click **Save**. (This controls the nav bar's placement — different from the **Menu** page, which manages the menu *items/links*.)

---

## 7. AI Chat Assistant

The AI assistant lets you manage your website using natural language — no technical knowledge required.

### Accessing AI Chat

From the **Dashboard**, click the **🤖 AI Assistant** quick-action button. This opens the full AI Chat page (`/admin/ai-chat`).

### What You Can Ask

| Category | Example Commands |
|----------|-----------------|
| **Change Theme** | "Change theme to red", "Switch to dark mode" |
| **Change Layout** | "Change layout to magazine", "Use classic layout" |
| **Create Pages** | "Create a page called Services with content about web design" |
| **Create Menus** | "Add a menu item called Contact" |
| **Create Content** | "Write an article about our company history" |
| **Edit Content** | "Update the About Us page with new information" |
| **Delete Content** | "Delete the old news article" |
| **Setup Website** | "Help me set up my website" (for fresh sites) |

### Usage Limits

- **10 questions per day** per user
- The AI will tell you how many questions you have remaining

### Tips for Best Results

- ✅ **Be specific:** "Create a page called 'Our Team' with content about our 5 team members"
- ✅ **Mention language:** "Create a page in Khmer called 'សេវាកម្ម'"
- ✅ **Confirm before acting:** The AI explains what it will do before making changes
- ❌ **Avoid vague requests:** "Make it better" — specify what you want changed
- ❌ **Don't request file uploads:** The AI cannot upload images; use the Media Library for that

### Confirming & undoing actions

- **Before risky changes**, the AI shows a **preview** with **Confirm** / **Cancel** buttons — nothing is changed until you confirm.
- **If the AI needs more info** (e.g. "which news section should this go in?"), it shows a dropdown to pick from, then **Submit**.
- **Undo:** every successful create/update action shows an **Undo** button — click it to reverse that action.
- **Operation history:** the **history** button in the chat header lists recent operations with their status (completed / pending / failed / rolled back), and an **undo** option where applicable.

### What the AI Cannot Do

- Upload or manage images (use Media Library)
- Change your password or username
- Manage user accounts (requires Super Admin)
- Access other websites' data

---

## 8. Quick Setup Wizard

For new websites, the Setup Wizard guides you through the initial configuration:

### Step 1: Language

1. Go to **Admin → Setup**
2. Select your **default language** (Khmer, English, Chinese, Thai, or Vietnamese)
3. Click **Next**

### Step 2: Menus & Basic Settings

1. Enter your **Site Title**
2. Choose whether to create **default menus** (Home, About Us, Service, Contact Us)
3. Click **Next**

### Step 3: First Content

1. Select a **menu page** to add content to
2. Enter a **title** and **description** for the page
3. Click **Finish**

Your website is now live with basic content! You can continue to customize it through the admin panel.

---

## 9. Profile & Password

### Updating Your Profile

1. Go to **Profile** in the sidebar
2. Update your:
   - **Full Name**
   - **Email**
   - **Phone Number**
3. Click **Save**

### Changing Your Password

1. Go to **Password** in the sidebar
2. Enter your **current password**
3. Enter your **new password** (minimum 6 characters)
4. Confirm the new password
5. Click **Save**

---

## 10. Roles & Super Admin

Your account's role controls which parts of the admin panel you can see.

| Role | What they can do |
|------|------------------|
| **Web Admin** | Full control of their own site: content, menus, media, settings, and managing their site's users |
| **Normal User** | Can edit content / menus / media and settings, but **cannot** manage users |
| **Super Admin** | Platform-wide: manages **all tenant domains**, **all users**, and **announcements** |

### Super Admin areas

If you are a Super Admin, the Dashboard shows extra quick actions:

- **Domains** (`/admin/super/domains`) — create and manage every tenant domain. Each domain has its own theme, settings, languages, menus, and content.
- **Users** (`/admin/super/users`) — view and manage all platform users and assign roles (Super Admin, Web Admin, Normal User).
- **Announcements** (`/admin/super/announcing`) — create platform-wide announcements.

> Web Admins manage their **own site's** users at **Users** (`/admin/users`); only Super Admins reach the platform-wide areas above.

---

## 11. Making Your Site Bilingual

Each language has its **own menus and content** — they are not automatic translations. To add a second language end-to-end:

1. **Enable the language:** go to **Settings → Language**, add the language (e.g. English) and pick its flag. Set it as default only if visitors should see it first.
2. **Build that language's menu tree:** go to **Menu**, switch the admin language selector (top-right) to the new language, and create the menu items (Home, About, etc.) — one tree per language.
3. **Create content for each menu item:** go to **Content**, and for each menu item create the matching content (article, gallery, etc.). The **language comes from the menu item you pick**, so choose menu items in the target language.
4. **Repeat for banners / logo / media** as needed — some may also need language-specific entries.
5. **Preview:** open the public site and use the language switcher to confirm both languages render.

> ⚠️ Adding a language does **not** copy your existing menus or content — you create them fresh for that language. Removing a language deletes its menus and content.

---

## Keyboard Shortcuts & Tips

- Use the **breadcrumb navigation** at the top to go back to previous pages
- Click the **logo** in the admin header to return to the Dashboard
- Use the **Save** button on each form to save changes (there is no keyboard shortcut)
- The **language selector** in the top-right lets you switch the admin interface language

---

## Getting Help

If you encounter issues:

1. Check this user guide first
2. Try the **AI Chat Assistant** for quick help
3. Contact your **Super Admin** for account or permission issues
4. For technical problems, contact the platform support team

---

*Last updated: July 2026*
