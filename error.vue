<script setup lang="ts">
// App-level error page. Rendered instead of the whole app whenever a fatal
// error is thrown (the 404s from the public detail pages, unexpected render
// errors). Wraps the default public layout so the site header/footer/theme
// appear exactly like a normal page — the layout renders its <slot>
// immediately (SSR included) and swaps in header/footer once the domain
// resolves client-side.
const props = defineProps({
  error: Object as () => { statusCode?: number; statusMessage?: string },
})

const { t, locale, availableLocales } = useI18n()
const domainStore = useDomainStore()

const statusCode = computed(() => props.error?.statusCode || 500)
const isNotFound = computed(() => statusCode.value === 404)
const title = computed(() => (isNotFound.value ? t('error.pageNotFound') : t('error.serverError')))
const description = computed(() =>
  isNotFound.value ? t('error.pageNotFoundDesc') : t('error.serverErrorDesc')
)

// Show the error in the visitor's chosen language. The public UI keeps the
// default locale (language switching on the public site is content-only), but
// the saved `language` id tells us what the visitor prefers — map it through
// the domain's language list to its lang_code. Applies once the list resolves
// (client-side; localStorage and the domain store are both needed).
const appliedLocale = ref(false)
watchEffect(() => {
  if (!import.meta.client || appliedLocale.value) return
  const saved = parseInt(localStorage.getItem('language') || '')
  if (Number.isNaN(saved) || domainStore.languages.length === 0) return
  const lang = domainStore.languages.find(l => l.lang_id === saved)
  const code = lang?.lang_code
  if (code && availableLocales.includes(code)) {
    locale.value = code
    appliedLocale.value = true
  }
})

const goHome = () => clearError({ redirect: '/' })
const goBack = async () => {
  await clearError()
  window.history.back()
}

useHead({
  title: () => `${statusCode.value}`,
})
</script>

<template>
  <NuxtLayout name="default">
    <div class="error-page">
      <div class="error-box">
        <div class="error-code">{{ statusCode }}</div>
        <h1 class="error-title">{{ title }}</h1>
        <p class="error-desc">{{ description }}</p>
        <!-- Raw statusMessage is dev-flavored ("invalid news ID") — only surface
             it for non-404 errors, where it can explain what actually broke. -->
        <p v-if="!isNotFound && error?.statusMessage" class="error-detail">{{ error.statusMessage }}</p>
        <div class="error-actions">
          <button class="error-btn error-btn-primary" @click="goHome">
            {{ t('error.backHome') }}
          </button>
          <button class="error-btn error-btn-outline" @click="goBack">
            {{ t('common.back') }}
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.error-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 2rem 1rem;
}

.error-box {
  text-align: center;
  max-width: 480px;
}

.error-code {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--primary-color, #3b82f6);
  letter-spacing: 0.05em;
}

.error-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #1a202c;
  margin: 1rem 0 0.5rem;
  font-family: var(--font-battambang, inherit);
  line-height: 1.4;
}

.error-desc {
  font-size: 0.95rem;
  color: #718096;
  line-height: 1.7;
  margin: 0 0 0.5rem;
}

.error-detail {
  font-size: 0.85rem;
  color: #a0aec0;
  margin: 0 0 0.5rem;
  word-break: break-word;
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.error-btn {
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  font-family: var(--font-battambang, inherit);
}

.error-btn-primary {
  background: var(--primary-color, #3b82f6);
  color: #fff;
  border: 1px solid var(--primary-color, #3b82f6);
}

.error-btn-primary:hover {
  opacity: 0.9;
}

.error-btn-outline {
  background: transparent;
  color: #4a5568;
  border: 1px solid #cbd5e0;
}

.error-btn-outline:hover {
  border-color: var(--primary-color, #3b82f6);
  color: var(--primary-color, #3b82f6);
}

@media (max-width: 480px) {
  .error-code {
    font-size: 4rem;
  }
}
</style>
