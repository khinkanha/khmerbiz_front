<template>
  <div class="scrolling-single-page">
    <!-- Hero Section -->
    <section class="hero-section" v-if="heroBanner || settings.background">
      <div
        class="hero-background"
        :style="{ backgroundImage: heroBanner ? `url(${photoUrl}${heroBanner.photo})` : settings.background ? `url(${settings.background})` : '' }"
      ></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">{{ settings.title || settings.domain_name }}</h1>
        <nav class="anchor-nav">
          <a
            v-for="menuItem in menuTree"
            :key="menuItem.item_id"
            :href="`#section-${menuItem.item_id}`"
            class="anchor-link"
            @click.prevent="scrollToSection(menuItem.item_id)"
          >
            {{ menuItem.item_name }}
          </a>
        </nav>
      </div>
      <div class="scroll-indicator" @click="scrollToFirstSection">
        <i class="pi pi-chevron-down"></i>
      </div>
    </section>

    <!-- Content Sections -->
    <main class="main-content">
      <div
        v-for="menuItem in menuTree"
        :key="menuItem.item_id"
        class="content-section-wrapper"
        :id="`section-${menuItem.item_id}`"
      >
        <!-- Section with submenu items -->
        <div v-if="menuItem.children && menuItem.children.length > 0" class="submenu-section">
          <div class="section-header">
            <h2 class="section-title">{{ menuItem.item_name }}</h2>
          </div>

          <div class="submenu-grid">
            <div
              v-for="child in menuItem.children"
              :key="child.item_id"
              class="subsection"
              :id="`subsection-${child.item_id}`"
            >
              <ContentRenderer
                :content="getContentForMenuItem(child.item_id)"
                :domain-id="domain.domain_id"
              />
            </div>
          </div>
        </div>

        <!-- Single content section -->
        <div v-else class="single-section">
          <div class="section-header" :id="`section-${menuItem.item_id}`">
            <h2 class="section-title">{{ menuItem.item_name }}</h2>
          </div>
          <ContentRenderer
            :content="getContentForMenuItem(menuItem.item_id)"
            :domain-id="domain.domain_id"
          />
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

const props = defineProps<Props>()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const heroBanner = computed(() => props.banners[0] || null)

const scrollToSection = (sectionId: number) => {
  const element = document.getElementById(`section-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const scrollToFirstSection = () => {
  if (props.menuTree.length > 0) {
    scrollToSection(props.menuTree[0].item_id)
  }
}

const getContentForMenuItem = (menuItemId: number): ContentSection | null => {
  return props.contentSections.find(cs => cs.content.menu_id === menuItemId) || null
}
</script>

<style scoped>
.scrolling-single-page {
  min-height: 100vh;
}

.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 0 1rem;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  margin: 0 0 2rem 0;
  font-family: var(--font-battambang);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.anchor-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.anchor-link {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  transition: all 0.3s;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.anchor-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  animation: bounce 2s infinite;
  z-index: 2;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

.main-content {
  background-color: white;
}

.content-section-wrapper {
  min-height: 50vh;
  padding: 4rem 0;
}

.content-section-wrapper:nth-child(even) {
  background-color: #f7fafc;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  font-family: var(--font-battambang);
}

.submenu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.subsection {
  padding: 1rem;
}

.single-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .anchor-nav {
    flex-direction: column;
    gap: 0.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
