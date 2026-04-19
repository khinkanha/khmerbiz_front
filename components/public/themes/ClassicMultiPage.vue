<template>
  <div class="classic-multi-page">
    <!-- Banner Slideshow -->
    <BannerSlideshow v-if="banners.length > 0" :banners="banners" />

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <ProgressSpinner />
          <p>Loading content...</p>
        </div>

        <!-- Menu Sections -->
        <div
          v-for="menuItem in menuTree"
          :key="menuItem.item_id"
          class="menu-section"
          :id="`section-${menuItem.item_id}`"
        >
          <!-- Submenu Navigation -->
          <div v-if="menuItem.children && menuItem.children.length > 0" class="submenu-nav">
            <h2 class="menu-title">{{ menuItem.item_name }}</h2>
            <nav class="submenu-tabs">
              <a
                v-for="child in menuItem.children"
                :key="child.item_id"
                :href="`#section-${child.item_id}`"
                class="submenu-tab"
                :class="{ active: activeSection === child.item_id }"
                @click.prevent="scrollToSection(child.item_id)"
              >
                {{ child.item_name }}
              </a>
            </nav>
          </div>

          <!-- Content Sections -->
          <div
            v-if="menuItem.children && menuItem.children.length > 0"
            class="content-sections"
          >
            <div
              v-for="child in menuItem.children"
              :key="child.item_id"
              class="content-section"
              :id="`section-${child.item_id}`"
            >
              <ContentRenderer
                v-if="getContentForMenuItem(child.item_id)"
                :content="getContentForMenuItem(child.item_id)!"
                :domain-id="domain.domain_id"
              />
              <div v-else class="no-content">
                <p>No content available for this section.</p>
              </div>
            </div>
          </div>

          <!-- Single content section for menu items without children -->
          <div v-else class="content-section">
            <ContentRenderer
              v-if="getContentForMenuItem(menuItem.item_id)"
              :content="getContentForMenuItem(menuItem.item_id)!"
              :domain-id="domain.domain_id"
            />
            <div v-else class="no-content">
              <p>No content available for this section.</p>
            </div>
          </div>
        </div>
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

defineProps<Props>()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const activeSection = ref<number | null>(null)
const loading = ref(false)

const scrollToSection = (sectionId: number) => {
  activeSection.value = sectionId
  const element = document.getElementById(`section-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const getContentForMenuItem = (menuItemId: number): ContentSection | undefined => {
  return props.contentSections.find(cs => cs.content.menu_id === menuItemId)
}
</script>

<style scoped>
.classic-multi-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  gap: 1rem;
}

.loading-state p {
  color: #718096;
  margin: 0;
}

.menu-section {
  padding: 3rem 0;
}

.menu-section:not(:last-child) {
  border-bottom: 1px solid #e2e8f0;
}

.menu-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
  text-align: center;
  font-family: var(--font-battambang);
}

.submenu-nav {
  margin-bottom: 2rem;
}

.submenu-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.submenu-tab {
  padding: 0.75rem 1.5rem;
  background-color: #f7fafc;
  color: #4a5568;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
  font-weight: 500;
}

.submenu-tab:hover,
.submenu-tab.active {
  background-color: #667eea;
  color: white;
}

.content-section {
  padding: 2rem 0;
}

.no-content {
  text-align: center;
  padding: 3rem;
  color: #718096;
}

@media (max-width: 768px) {
  .menu-title {
    font-size: 1.5rem;
  }

  .submenu-tabs {
    flex-direction: column;
  }

  .submenu-tab {
    text-align: center;
  }
}
</style>
