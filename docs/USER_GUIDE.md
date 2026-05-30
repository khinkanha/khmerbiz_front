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

---

## 1. Getting Started

### Logging In

1. Go to your admin URL: `http://yourdomain.com/admin/login`
2. Enter your **username** and **password**
3. Click **Login**

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
2. Click **Add New** or **Create New**
3. Fill in the form:
   - **Title** — The page/section heading
   - **Content Type** — Select the type (Article, Photo, Video, etc.)
   - **Menu** — Choose which menu item this content belongs to
   - **Language** — Select the language for this content
   - **Description** — Enter your content (rich text editor for articles)
4. Click **Save**

### Editing Content

1. Go to **Content** and find the item you want to edit
2. Click the **pencil icon** (✏️) on the right
3. Update the fields and click **Save**

### Deleting Content

1. Click the **trash icon** (🗑️) on the content item
2. Confirm the deletion

> ⚠️ **Warning:** Deleted content cannot be recovered.

### Managing Content Items (Photo, Video, Document, News)

For gallery-type content, you can manage individual items within a content section:

1. Click on a content item to open its detail page
2. Use the **Items** tab to add, edit, or delete individual photos/videos/documents
3. Use the **News** tab (for news-type content) to manage news articles

### Adding News Articles

1. Open a **News** type content section
2. Click **Add New**
3. Fill in:
   - **Title** — News headline
   - **Short Description** — Brief summary shown in listings
   - **Description** — Full article content (rich text editor)
   - **Primary Image** — Thumbnail/cover image
   - **Publish Date** — When the article should appear
   - **Status** — Toggle **Show** (visible) or **Not Show** (hidden)
   - **Priority** — Mark as featured/highlighted
4. Click **Save**

### Managing Map Content

1. Open a **Map** type content section
2. Go to the **Map** tab
3. Set the **latitude** and **longitude** coordinates
4. Add a **title** and **description** for the marker
5. Toggle **visible** to show/hide the map
6. Click **Save**

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

- **Site Title** — Your website name (shown in browser tab and header)
- **Footer Text** — Text displayed at the bottom of your site
- **Theme** — Color theme for your website:

| Theme | Description |
|-------|-------------|
| Default | Light/standard theme |
| Inverse | Dark mode theme |
| Red | Red color scheme |
| Green | Green color scheme |
| Purple | Purple color scheme |
| Yellow | Yellow color scheme |

- **Page Layout** — Overall website layout:

| Layout | Description |
|--------|-------------|
| Classic Multi-Page | Traditional website with separate pages per menu item |
| Scrolling Single Page | All content on one scrollable page |
| Magazine Grid | Card-based magazine style layout |
| Fullscreen Hero | Large hero image focused layout |

- **Background** — Optional background image/color for the site
- **Google Analytics Tracking ID** — For visitor analytics
- **Chat Script** — Third-party chat widget embed code

### 6.2 Logo Settings

Go to **Settings → Logo**

- **Logo Image** — Upload or set your logo image URL
- **Mobile Logo** — Optional separate logo for mobile devices
- **Logo Position** — Left, Center, or Right
- **Logo Alignment** — Alignment within its position

### 6.3 Banner Settings

Go to **Settings → Banner**

- **Banner Display** — Enable/disable the banner slideshow
- **Banner Mode** — How banners transition (slide, fade, etc.)
- **Banner Position** — Where banners appear

### Managing Banner Images

- Add banners with a title, image URL, and optional link
- Reorder banners by changing their display order
- Delete banners you no longer need

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

---

## 7. AI Chat Assistant

The AI assistant lets you manage your website using natural language — no technical knowledge required.

### Accessing AI Chat

Look for the **AI Chat** button (💬) in the admin panel.

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

## Keyboard Shortcuts & Tips

- Use the **breadcrumb navigation** at the top to go back to previous pages
- Click the **logo** in the admin header to return to the Dashboard
- Use **Ctrl+S** (or **Cmd+S**) in the rich text editor to save content
- The **language selector** in the top-right lets you switch the admin interface language

---

## Getting Help

If you encounter issues:

1. Check this user guide first
2. Try the **AI Chat Assistant** for quick help
3. Contact your **Super Admin** for account or permission issues
4. For technical problems, contact the platform support team

---

*Last updated: May 2026*
