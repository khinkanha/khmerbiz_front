// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(<any>{
  devtools: { enabled: false },
  experimental: {
    appManifest: false
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.includes('-'),
    },
  },

  typescript: {
    strict: false,
    typeCheck: false,
  },
  devServer: {
    port: 8888
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://khmerbiz-api.localhost/api/v1',
      photoUrl: 'https://khmer.sgp1.digitaloceanspaces.com/',
      recaptchaSiteKey: '6Lcn38oZAAAAAHXplGrr62pAKHTpdh7vsLy1OnMO',
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
  ],

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'kh', name: 'ខ្មែរ', file: 'kh.json' },
      { code: 'ch', name: '中文', file: 'ch.json' }
    ],
    defaultLocale: 'kh',
    lazy: true,
    langDir: 'i18n/locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },

  routeRules: {
    '/admin/**': { ssr: false },
    '/': { ssr: true },
    '/pages/**': { ssr: true },
    '/article/**': { ssr: true },
    '/news/**': { ssr: true },
    '/legal': { ssr: true },
    '/test/**': { ssr: true },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        { src: 'https://www.google.com/recaptcha/api.js?render=explicit', async: true, defer: true },
      ],
    },
  },

  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/themes/default.css',
    '~/assets/css/themes/inverse.css',
    '~/assets/css/themes/red.css',
    '~/assets/css/themes/green.css',
    '~/assets/css/themes/purple.css',
    '~/assets/css/themes/yellow.css',
    '~/assets/css/admin.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
    'primeicons/primeicons.css',
    'leaflet/dist/leaflet.css',
    'quill/dist/quill.snow.css',
  ],

  ssr: true,

  build: {
    transpile: ['primevue'],
  },

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  compatibilityDate: '2024-01-01',
})