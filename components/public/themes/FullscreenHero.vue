<template>
  <div class="fullscreen-hero" :class="containerClass">
    <!-- Hero Section -->
    <section class="hero-section" v-if="showBanners" :class="bannerPosClass">
      <div
        class="hero-background"
        :style="{ backgroundImage: heroBanner ? `url(${photoUrl}${heroBanner.photo})` : '' }"
      ></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge">{{ settings.domain_name || '' }}</div>
        <h1 class="hero-title">{{ settings.title || settings.domain_name }}</h1>
        <p v-if="settings.company_desc" class="hero-subtitle">{{ settings.company_desc }}</p>
        <button class="hero-cta" @click="scrollToFirstSection">
          Discover
          <i class="pi pi-arrow-down"></i>
        </button>
      </div>

      <!-- Scroll hint -->
      <div class="scroll-hint">
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- Content Panels -->
    <div class="panels-container">
      <section
        v-for="(menuItem, index) in menuTree"
        :key="menuItem.item_id"
        class="panel"
        :class="{ 'panel-dark': index % 2 === 1 }"
        :id="`section-${menuItem.item_id}`"
      >
        <div class="panel-inner">
          <div class="panel-label">
            <span class="label-line"></span>
            <span class="label-text">Section {{ index + 1 }}</span>
          </div>
          <h2 class="panel-title">{{ menuItem.item_name }}</h2>

          <!-- Submenu items -->
          <div v-if="menuItem.children && menuItem.children.length > 0" class="panel-grid">
            <div
              v-for="child in menuItem.children"
              :key="child.item_id"
              class="panel-card"
              :id="`subsection-${child.item_id}`"
            >
              <ContentRenderer
                :content="getContentForMenuItem(child.item_id)"
                :domain-id="domain.domain_id"
              />
            </div>
          </div>

          <!-- Single content -->
          <div v-else class="panel-body">
            <ContentRenderer
              :content="getContentForMenuItem(menuItem.item_id)"
              :domain-id="domain.domain_id"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- Navigation Dots -->
    <div class="nav-dots">
      <a
        v-for="(menuItem, index) in menuTree"
        :key="menuItem.item_id"
        :href="`#section-${menuItem.item_id}`"
        class="nav-dot"
        :class="{ active: activeSection === menuItem.item_id }"
        :title="menuItem.item_name"
        @click.prevent="scrollToSection(menuItem.item_id)"
      ></a>
    </div>

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
  if (!bannerMode.value) return false
  if (props.banners.length === 0) return false
  return bannerDisplayAll.value || isHomePage.value
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
const activeSection = ref<number | null>(null)
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

    // Track active section for dots
    for (const item of props.menuTree) {
      const el = document.getElementById(`section-${item.item_id}`)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          activeSection.value = item.item_id
          break
        }
      }
    }
  })
})
</script>

<style scoped>
.fullscreen-hero {
  min-height: 100vh;
  position: relative;
}

/* ===== Hero ===== */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

.hero-background {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.4;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 0 1rem;
  animation: heroIn 1s ease-out;
}

@keyframes heroIn {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-badge {
  display: inline-block;
  padding: 0.4rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 30px;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.hero-title {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 800;
  margin: 0 0 1rem;
  font-family: var(--font-battambang);
  letter-spacing: -0.01em;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  opacity: 0.65;
  margin: 0 0 2.5rem;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 2rem;
  background: white;
  color: #0f172a;
  border: none;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 0.03em;
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(255, 255, 255, 0.2);
}

/* Scroll hint line */
.scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-line {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
  animation: scrollLine 2s ease-in-out infinite;
}

@keyframes scrollLine {
  0% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.3; transform: scaleY(0.5); }
  100% { opacity: 1; transform: scaleY(1); }
}

/* ===== Panels ===== */
.panels-container {
  position: relative;
}

.panel {
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding: 5rem 1rem;
}

.panel-dark {
  background: #0f172a;
  color: #e2e8f0;
}

.panel-inner {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.panel-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.label-line {
  width: 30px;
  height: 1px;
  background: var(--primary-color, #3b82f6);
}

.label-text {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #94a3b8;
  font-weight: 600;
}

.panel-dark .label-text {
  color: #64748b;
}

.panel-dark .label-line {
  background: #3b82f6;
}

.panel-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin: 0 0 3rem;
  font-family: var(--font-battambang);
  color: #1e293b;
}

.panel-dark .panel-title {
  color: #f1f5f9;
}

/* ===== Panel Cards ===== */
.panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.panel-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.panel-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.panel-dark .panel-card {
  background: #1e293b;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.panel-dark .panel-card:hover {
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.15);
}

.panel-body {
  max-width: 800px;
}

.panel-body > * {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.panel-dark .panel-body > * {
  background: #1e293b;
  box-shadow: none;
}

/* ===== Navigation Dots ===== */
.nav-dots {
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 40;
}

.nav-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  text-decoration: none;
}

.nav-dot:hover {
  background: var(--primary-color, #3b82f6);
  transform: scale(1.3);
}

.nav-dot.active {
  background: var(--primary-color, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.panel-dark ~ .nav-dots .nav-dot,
.nav-dots .nav-dot {
  background: rgba(0, 0, 0, 0.15);
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  z-index: 50;
}

.back-to-top:hover {
  transform: translateY(-3px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
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
  .panel {
    min-height: auto;
    padding: 4rem 1rem;
  }

  .panel-grid {
    grid-template-columns: 1fr;
  }

  .nav-dots {
    display: none;
  }

  .hero-title {
    font-size: 2.2rem;
  }
}

/* Screen mode: boxed */
.screen-boxed .container { max-width: 960px; }

/* Banner positions */
.banner-pos-middle { padding: 2rem 0; }
.banner-pos-bottom { order: 999; }
</style>
