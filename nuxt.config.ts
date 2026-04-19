// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 80
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://khmerbizapi.s2.web141.com/api/v1',
      photoUrl: 'https://khmer.biz',
      siteUrl: 'https://khmer.biz',
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    'nuxt-primevue',
  ],

  primevue: {
    options: {
      theme: 'none',
    },
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'kh', name: 'ខ្មែរ', file: 'kh.json' },
      { code: 'ch', name: '中文', file: 'ch.json' },
      { code: 'th', name: 'ไทย', file: 'th.json' },
      { code: 'vn', name: 'Tiếng Việt', file: 'vn.json' },
    ],
    defaultLocale: 'kh',
    lazy: true,
    langDir: 'i18n/locales',
    strategy: 'no_prefix',
  },

  routeRules: {
    '/admin/**': { ssr: false },
    '/': { ssr: true },
    '/pages/**': { ssr: true },
    '/article/**': { ssr: true },
    '/news/**': { ssr: true },
    '/legal': { ssr: true },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/themes/default.css',
    'primeicons/primeicons.css',
    'leaflet/dist/leaflet.css',
  ],

  ssr: true,

  compatibilityDate: '2024-01-01',
})