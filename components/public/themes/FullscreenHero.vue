<template>
  <div class="fullscreen-hero">
    <!-- Hero Section -->
    <section class="hero-section" v-if="heroBanner || settings.background">
      <div
        class="hero-background"
        :style="{ backgroundImage: heroBanner ? `url(${photoUrl}${heroBanner.photo})` : settings.background ? `url(${settings.background})` : '' }"
      ></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">{{ settings.title || settings.domain_name }}</h1>
        <p v-if="heroBanner?.title" class="hero-subtitle">{{ heroBanner.title }}</p>
        <div class="scroll-down" @click="scrollToContent">
          <span>{{ $t('contentManager.view') }} {{ $t('common.more') }}</span>
          <i class="pi pi-chevron-down"></i>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <main class="main-content">
      <div class="container">
        <div
          v-for="(menuItem, index) in menuTree"
          :key="menuItem.item_id"
          class="content-block"
          :class="{ 'alternating': index % 2 === 1 }"
        >
          <!-- Section with Background -->
          <div class="section-wrapper" :id="`section-${menuItem.item_id}`">
            <!-- Section Header -->
            <div class="section-header">
              <h2 class="section-title">{{ menuItem.item_name }}</h2>
              <div class="section-line"></div>
            </div>

            <!-- Submenu Items -->
            <div
              v-if="menuItem.children && menuItem.children.length > 0"
              class="items-list"
            >
              <div
                v-for="child in menuItem.children"
                :key="child.item_id"
                class="item-section"
              >
                <ContentRenderer
                  :content="getContentForMenuItem(child.item_id)"
                  :domain-id="domain.domain_id"
                />
              </div>
            </div>

            <!-- Single Content -->
            <div v-else class="single-content">
              <ContentRenderer
                :content="getContentForMenuItem(menuItem.item_id)"
                :domain-id="domain.domain_id"
              />
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

const props = defineProps<Props>()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const heroBanner = computed(() => props.banners[0] || null)

const scrollToContent = () => {
  const firstSection = document.querySelector('.content-block')
  if (firstSection) {
    firstSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const getContentForMenuItem = (menuItemId: number): ContentSection | null => {
  return props.contentSections.find(cs => cs.content.menu_id === menuItemId) || null
}
</script>

<style scoped>
.fullscreen-hero {
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
  background-attachment: fixed;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 0 1rem;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  font-family: var(--font-battambang);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.05em;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin: 0 0 3rem 0;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.scroll-down {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.scroll-down:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.scroll-down span {
  font-weight: 500;
}

.scroll-down i {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.main-content {
  position: relative;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.content-block {
  padding: 6rem 0;
}

.content-block:nth-child(even) {
  background-color: #f7fafc;
}

.content-block.alternating {
  background-color: #f7fafc;
}

.section-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1rem 0;
  position: relative;
  display: inline-block;
  font-family: var(--font-battambang);
}

.section-line {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  margin: 0 auto;
  border-radius: 2px;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.item-section {
  padding: 2rem 0;
}

.single-content {
  padding: 2rem 0;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .content-block {
    padding: 4rem 0;
  }
}
</style>
