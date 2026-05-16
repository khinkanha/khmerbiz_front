<template>
  <div class="magazine-grid">
    <!-- Top Banner Bar -->
    <section class="banner-bar" v-if="settings">
      <div class="banner-bar-inner">
        <div class="banner-bar-text">
          <h1 class="site-title">{{ settings.title || settings.domain_name }}</h1>
          <p v-if="settings.company_desc" class="site-desc">{{ settings.company_desc }}</p>
        </div>
        <div v-if="banners.length > 0" class="banner-grid" :class="{ 'multi': banners.length > 1 }">
          <img
            v-for="(banner, i) in banners.slice(0, 3)"
            :key="banner.banner_id"
            :src="`${photoUrl}${banner.image}`"
            :alt="banner.title"
            class="banner-img"
            :class="{ 'span-2': banners.length === 2 && i === 0 }"
          />
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <main class="main-content">
      <div class="content-layout">
        <!-- Main Column -->
        <div class="content-main">
          <div
            v-for="(menuItem, index) in menuTree"
            :key="menuItem.item_id"
            class="magazine-section"
            :id="`section-${menuItem.item_id}`"
          >
            <!-- Section Header -->
            <div class="section-header">
              <h2 class="section-title">{{ menuItem.item_name }}</h2>
              <span class="section-tag">{{ menuItem.item_name }}</span>
            </div>

            <!-- Submenu grid -->
            <div v-if="menuItem.children && menuItem.children.length > 0" class="editorial-grid">
              <div
                v-for="(child, ci) in menuItem.children"
                :key="child.item_id"
                class="editorial-card"
                :class="{ 'card-wide': ci === 0 }"
                :id="`subsection-${child.item_id}`"
              >
                <ContentRenderer
                  :content="getContentForMenuItem(child.item_id)"
                  :domain-id="domain.domain_id"
                />
              </div>
            </div>

            <!-- Single content -->
            <div v-else class="section-body">
              <ContentRenderer
                :content="getContentForMenuItem(menuItem.item_id)"
                :domain-id="domain.domain_id"
              />
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="content-sidebar">
          <!-- Quick Navigation -->
          <div class="sidebar-card">
            <h3 class="sidebar-title">Sections</h3>
            <ul class="sidebar-nav">
              <li v-for="item in menuTree" :key="item.item_id">
                <a :href="`#section-${item.item_id}`" @click.prevent="scrollToSection(item.item_id)">
                  {{ item.item_name }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Social Links -->
          <div v-if="socialMedia && socialMedia.length > 0" class="sidebar-card">
            <h3 class="sidebar-title">Follow Us</h3>
            <div class="sidebar-social">
              <a
                v-for="social in socialMedia"
                :key="social.social_id || social.smid"
                :href="social.url || social.link"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn"
              >
                <i :class="getSocialIcon(social.stype)"></i>
              </a>
            </div>
          </div>

          <!-- Contact Info -->
          <div v-if="settings" class="sidebar-card">
            <h3 class="sidebar-title">Contact</h3>
            <div class="sidebar-contact">
              <p v-if="domain.company_name">{{ domain.company_name }}</p>
              <p v-if="domain.phone_number"><i class="pi pi-phone"></i> {{ domain.phone_number }}</p>
              <p v-if="domain.email"><i class="pi pi-envelope"></i> {{ domain.email }}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem, Domain, Setting, Banner, SocialMedia, ContentSection, Language } from '~/types'

interface Props {
  menuTree: MenuItem[]
  contentSections: ContentSection[]
  banners: Banner[]
  settings: Setting
  domain: Domain
  socialMedia: SocialMedia[]
  language: Language
}

const props = defineProps<Props>()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const scrollToSection = (sectionId: number) => {
  const element = document.getElementById(`section-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const getContentForMenuItem = (menuItemId: number): ContentSection | null => {
  return props.contentSections.find(cs => cs.content.menu_id === menuItemId) || null
}

const getSocialIcon = (stype: number): string => {
  const icons: Record<number, string> = {
    1: 'pi pi-globe',
    2: 'pi pi-facebook',
    3: 'pi pi-youtube',
    4: 'pi pi-linkedin',
    5: 'pi pi-twitter',
  }
  return icons[stype] || 'pi pi-globe'
}
</script>

<style scoped>
.magazine-grid {
  min-height: 100vh;
  background: #fff;
}

/* ===== Banner Bar ===== */
.banner-bar {
  background: #1a202c;
  color: white;
}

.banner-bar-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: stretch;
}

.banner-bar-text {
  flex: 1;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.site-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  margin: 0 0 0.5rem;
  font-family: var(--font-battambang);
  letter-spacing: -0.02em;
}

.site-desc {
  opacity: 0.7;
  font-size: 0.95rem;
  margin: 0;
  max-width: 400px;
}

.banner-grid {
  display: flex;
  gap: 4px;
  width: 45%;
}

.banner-grid.multi {
  flex-wrap: wrap;
}

.banner-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.banner-grid.multi .banner-img {
  width: calc(50% - 2px);
  height: 123px;
}

.banner-img.span-2 {
  width: 100%;
  height: 123px;
}

/* ===== Main Layout ===== */
.content-layout {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
  padding: 3rem 1rem;
}

/* ===== Section Header ===== */
.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.section-header::before {
  content: '';
  width: 4px;
  height: 28px;
  background: var(--primary-color, #3b82f6);
  border-radius: 2px;
  flex-shrink: 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a202c;
  margin: 0;
  font-family: var(--font-battambang);
}

.section-tag {
  margin-left: auto;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  font-weight: 600;
}

/* ===== Editorial Grid ===== */
.editorial-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.editorial-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: box-shadow 0.3s, transform 0.3s;
}

.editorial-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.editorial-card.card-wide {
  grid-column: 1 / -1;
}

.section-body {
  background: white;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
}

.magazine-section {
  margin-bottom: 3rem;
}

.magazine-section:last-child {
  margin-bottom: 0;
}

/* ===== Sidebar ===== */
.content-sidebar {
  position: sticky;
  top: 80px;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
}

.sidebar-title {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
  margin: 0 0 1rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--primary-color, #3b82f6);
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.sidebar-nav a {
  display: block;
  padding: 0.45rem 0.75rem;
  color: #475569;
  text-decoration: none;
  font-size: 0.88rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.sidebar-nav a:hover {
  background: var(--primary-color, #3b82f6);
  color: white;
}

.sidebar-social {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  text-decoration: none;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.social-btn:hover {
  background: var(--primary-color, #3b82f6);
  color: white;
}

.sidebar-contact p {
  font-size: 0.85rem;
  color: #475569;
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sidebar-contact p i {
  font-size: 0.8rem;
  color: var(--primary-color, #3b82f6);
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .content-layout {
    grid-template-columns: 1fr;
  }

  .content-sidebar {
    position: static;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .banner-bar-inner {
    flex-direction: column;
  }

  .banner-grid {
    width: 100%;
  }

  .banner-grid.multi .banner-img {
    height: 120px;
  }
}

@media (max-width: 600px) {
  .editorial-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-wrap: wrap;
  }

  .section-tag {
    display: none;
  }
}
</style>
