<template>
  <div class="scrolling-single-page" :class="containerClass">
    <!-- Hero Section -->
    <section class="hero-section" v-if="showBanners && (heroBanner || settings.background)" :class="bannerPosClass">
      <div class="hero-background"
        :style="{ backgroundImage: heroBanner ? `url(${photoUrl}${heroBanner.photo})` : settings.background ? `url(${settings.background})` : '' }">
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">{{ settings.title || settings.domain_name }}</h1>
        <p v-if="settings.company_desc" class="hero-subtitle">{{ settings.company_desc }}</p>
        <nav class="anchor-nav">
          <a v-for="menuItem in menuTree" :key="menuItem.item_id" :href="`#section-${menuItem.item_id}`"
            class="anchor-link" @click.prevent="scrollToSection(menuItem.item_id)">
            {{ menuItem.item_name }}
          </a>
        </nav>
      </div>
      <div class="scroll-indicator" @click="scrollToFirstSection">
        <span>Scroll</span>
        <i class="pi pi-chevron-down"></i>
      </div>
    </section>

    <!-- Content Sections -->
    <main class="main-content">
      <div v-for="(menuItem, index) in menuTree" :key="menuItem.item_id" class="content-section-wrapper"
        :class="{ 'section-left': index % 2 === 0, 'section-right': index % 2 === 1 }"
        :id="`section-${menuItem.item_id}`">
        <div class="section-inner">
          <!-- Section number decoration -->
          <span class="section-number">{{ String(index + 1).padStart(2, '0') }}</span>

          <div class="section-content" :class="{ 'content-push-right': index % 2 === 1 }">
            <!-- Section header -->
            <div class="section-header">
              <div class="section-line"></div>
              <h2 class="section-title">{{ menuItem.item_name }}</h2>
            </div>

            <!-- Submenu items -->
            <div v-if="menuItem.children && menuItem.children.length > 0" class="submenu-grid">
              <div v-for="child in menuItem.children" :key="child.item_id" class="submenu-card"
                :id="`subsection-${child.item_id}`">
                <ContentRenderer :content="getContentForMenuItem(child.item_id)" :domain-id="domain.domain_id" />
              </div>
            </div>

            <!-- Single content -->
            <div v-else class="single-content">
              <ContentRenderer :content="getContentForMenuItem(menuItem.item_id)" :domain-id="domain.domain_id" />
            </div>
          </div>
        </div>

        <!-- Section divider -->
        <div v-if="index < menuTree.length - 1" class="section-divider">
          <span></span><span></span><span></span>
        </div>
      </div>
    </main>

    <!-- Social Media -->
    <section v-if="socialMedia.length > 0" class="social-footer">
      <div class="social-inner">
        <a
          v-for="social in socialMedia"
          :key="social.smid"
          :href="social.link"
          target="_blank"
          rel="noopener noreferrer"
          class="social-icon-link"
        >
          <i :class="getSocialIcon(social.stype)"></i>
        </a>
      </div>
    </section>

    <!-- Back to top -->
    <transition name="fade">
      <button v-if="showBackToTop" class="back-to-top" @click="scrollToTop">
        <i class="pi pi-arrow-up"></i>
      </button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem, Domain, Setting, Banner, SocialMedia, ContentSection, Language } from '~/types'
import { getSocialIcon } from '~/types'

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
const photoUrl = config.public.photoUrl
const route = useRoute()

const isHomePage = computed(() => route.path === '/')

// banner_mode: 0=off, 1=on
const bannerMode = computed(() => Number(props.settings?.banner_mode) !== 0)

// banner_display: 0=homepage only, 1=all pages
const bannerDisplayAll = computed(() => Number(props.settings?.banner_display) === 1)

const showBanners = computed(() => {
  // Banner only supported in ClassicMultiPage style
  return false
})

// banner_position: 1=Top, 2=Middle, 3=Bottom
const bannerPosClass = computed(() => {
  const pos = Number(props.settings?.banner_pos) || 1
  if (pos === 2) return 'banner-pos-middle'
  if (pos === 3) return 'banner-pos-bottom'
  return ''
})

// screen_mode: 1=full screen, 2=boxed
const containerClass = computed(() => {
  return Number(props.settings?.screen_mode) === 2 ? 'screen-boxed' : ''
})

const heroBanner = computed(() => props.banners[0] || null)
const showBackToTop = ref(false)

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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getContentForMenuItem = (menuItemId: number): ContentSection | null => {
  return props.contentSections.find(cs => cs.content.menu_id === menuItemId) || null
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    showBackToTop.value = window.scrollY > window.innerHeight
  })
})
</script>

<style scoped>
.scrolling-single-page {
  min-height: 100vh;
}

/* ===== Hero ===== */
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
  inset: 0;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 58, 95, 0.6) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 0 1rem;
  animation: heroFadeIn 1.2s ease-out;
}

@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: clamp(2.2rem, 5vw, 4.5rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  font-family: var(--font-battambang);
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
  letter-spacing: 0.02em;
}

.hero-subtitle {
  font-size: clamp(0.95rem, 2vw, 1.2rem);
  opacity: 0.8;
  margin: 0 0 2.5rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.anchor-nav {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.anchor-link {
  padding: 0.6rem 1.4rem;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  transition: all 0.3s;
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.anchor-link:hover {
  background: var(--primary-color, #3b82f6);
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: white;
  cursor: pointer;
  z-index: 2;
  opacity: 0.7;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: opacity 0.3s;
}

.scroll-indicator:hover {
  opacity: 1;
}

.scroll-indicator i {
  animation: scrollBounce 2s ease-in-out infinite;
}

@keyframes scrollBounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(8px);
  }
}

/* ===== Sections ===== */
.main-content {
  background: white;
}

.content-section-wrapper {
  padding: 6rem 1rem;
  position: relative;
  overflow: hidden;
}

.content-section-wrapper.section-right {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

.section-inner {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
}

.section-number {
  position: absolute;
  top: -1.5rem;
  left: 0;
  font-size: clamp(5rem, 10vw, 8rem);
  font-weight: 800;
  color: rgba(0, 0, 0, 0.04);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.section-right .section-number {
  left: auto;
  right: 0;
}

.section-content {
  position: relative;
  z-index: 1;
}

.content-push-right {
  margin-left: auto;
  max-width: 800px;
}

.section-left .section-content {
  max-width: 800px;
}

.section-header {
  margin-bottom: 2.5rem;
}

.section-line {
  width: 40px;
  height: 3px;
  background: var(--primary-color, #3b82f6);
  border-radius: 2px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  font-family: var(--font-battambang);
}

/* ===== Content Cards ===== */
.submenu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.submenu-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: transform 0.3s, box-shadow 0.3s;
}

.submenu-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.section-right .submenu-card {
  background: white;
}

.single-content {
  max-width: 100%;
}

/* ===== Section Divider ===== */
.section-divider {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 0;
  margin-top: 6rem;
}

.section-divider span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #cbd5e1;
}

/* ===== Back to Top ===== */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--primary-color, #3b82f6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
  z-index: 50;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== Social Footer ===== */
.social-footer {
  padding: 2rem 1rem;
  text-align: center;
  background: #f8fafc;
}

.social-inner {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e2e8f0;
  color: #475569;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.2s;
}

.social-icon-link:hover {
  background: var(--primary-color, #3b82f6);
  color: white;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .content-section-wrapper {
    padding: 4rem 1rem;
  }

  .content-push-right {
    margin-left: 0;
  }

  .section-number {
    font-size: 4rem;
  }

  .anchor-nav {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }

  .submenu-grid {
    grid-template-columns: 1fr;
  }
}

/* Screen mode: boxed */
.screen-boxed .container { max-width: 960px; }

/* Banner positions */
.banner-pos-middle { padding: 2rem 0; }
.banner-pos-bottom { order: 999; }
</style>
