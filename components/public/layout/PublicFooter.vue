<template>
  <footer class="public-footer">
    <!-- Main Footer -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- About / Site Info -->
          <div class="footer-section footer-about">
            <div class="footer-brand">
              <img
                v-if="settings?.logo"
                :src="settings.logo"
                :alt="settings?.title || 'Logo'"
                class="footer-logo"
              />
              <h3 v-if="settings?.title">{{ settings.title }}</h3>
            </div>
            <div v-if="settings?.footer" class="footer-text" v-html="settings.footer"></div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h4 class="footer-heading">{{ $t('sidebar.menu') }}</h4>
            <ul class="footer-links">
              <li v-for="item in menuTree.slice(0, 8)" :key="item.item_id">
                <NuxtLink :to="item.item_url || '#'">{{ item.item_name }}</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Social Media -->
          <div class="footer-section">
            <h4 class="footer-heading">{{ $t('settings.socialMedia') }}</h4>
            <div class="social-links">
              <a
                v-for="social in socialMedia"
                :key="social.social_id"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
              >
                <i :class="social.icon_class"></i>
                <span>{{ social.platform }}</span>
              </a>
            </div>
          </div>

          <!-- Languages -->
          <div class="footer-section">
            <h4 class="footer-heading">{{ $t('settings.languageSetting') }}</h4>
            <div class="language-links">
              <button
                v-for="lang in languages"
                :key="lang.lang_id"
                @click="setLanguage(lang.lang_id)"
                class="language-link"
                :class="{ active: currentLanguage?.lang_id === lang.lang_id }"
              >
                <img :src="`/flag/${lang.flag_icon}`" :alt="lang.lang_name" />
                {{ lang.lang_name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="container">
        <p>&copy; {{ currentYear }} {{ settings?.title || 'Company' }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useDomainStore } from '~/stores/domain'

const domainStore = useDomainStore()

const settings = computed(() => domainStore.settings)
const socialMedia = computed(() => domainStore.socialMedia)
const languages = computed(() => domainStore.languages)
const currentLanguage = computed(() => domainStore.currentLanguage)
const menuTree = computed(() => domainStore.menuTree)

const currentYear = new Date().getFullYear()

const setLanguage = async (langId: number) => {
  await domainStore.setLanguage(langId)
}
</script>

<style scoped>
.public-footer {
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* ---- Main Footer ---- */
.footer-main {
  background-color: var(--footer-bg, #1a202c);
  color: var(--footer-text, rgba(255, 255, 255, 0.8));
  padding: 3rem 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 2rem;
}

.footer-section {
  min-width: 0;
}

/* About */
.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.footer-logo {
  max-height: 40px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.footer-brand h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: white;
  font-family: var(--font-battambang);
}

.footer-text {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.875rem;
  line-height: 1.7;
}

.footer-text :deep(p) {
  margin: 0;
}

.footer-text :deep(a) {
  color: var(--primary-color, #3b82f6);
  text-decoration: none;
}

/* Headings */
.footer-heading {
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color, #3b82f6);
  display: inline-block;
  font-family: var(--font-battambang);
}

/* Quick Links */
.footer-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s, padding-left 0.2s;
  display: block;
  padding: 0.15rem 0;
}

.footer-links a:hover {
  color: white;
  padding-left: 0.4rem;
}

/* Social Links */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  font-size: 0.85rem;
  padding: 0.3rem 0;
  transition: color 0.2s;
}

.social-link:hover {
  color: white;
}

.social-link i {
  font-size: 1rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: background-color 0.2s;
}

.social-link:hover i {
  background-color: var(--primary-color, #3b82f6);
}

/* Language Links */
.language-links {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.language-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  background: none;
  border: none;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  font-size: 0.85rem;
}

.language-link:hover,
.language-link.active {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.language-link img {
  width: 20px;
  height: 14px;
  object-fit: cover;
  border-radius: 2px;
}

/* ---- Bottom Bar ---- */
.footer-bottom {
  background-color: var(--primary-dark, #111827);
  padding: 0.85rem 0;
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.8rem;
}

/* ---- Responsive ---- */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-main {
    padding: 2rem 0 1.5rem;
  }
}
</style>
