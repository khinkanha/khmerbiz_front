<template>
  <footer class="public-footer" :class="footerClass">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>{{ settings?.title || 'Company' }}</h3>
          <p v-if="settings?.footer" v-html="settings.footer"></p>
        </div>

        <div class="footer-section">
          <h4>{{ $t('settings.socialMedia') }}</h4>
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
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h4>{{ $t('settings.language') }}</h4>
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

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} {{ settings?.title || 'Company' }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useDomainStore } from '~/stores'

const domainStore = useDomainStore()

const settings = computed(() => domainStore.settings)
const socialMedia = computed(() => domainStore.socialMedia)
const languages = computed(() => domainStore.languages)
const currentLanguage = computed(() => domainStore.currentLanguage)

const footerClass = computed(() => {
  const align = settings.value?.footer_align ?? 0
  return `align-${align}`
})

const currentYear = new Date().getFullYear()

const setLanguage = async (langId: number) => {
  await domainStore.setLanguage(langId)
}
</script>

<style scoped>
.public-footer {
  background-color: #1a202c;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.footer-section h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.footer-section p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
}

.social-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.language-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.language-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: none;
  border: none;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
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

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

.footer-bottom p {
  margin: 0;
}
</style>
