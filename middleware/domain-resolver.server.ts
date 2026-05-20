import type { Domain, Setting, Language, Banner, SocialMedia } from '~/types'

interface SiteConfig {
  domain: Domain
  settings: Setting
  languages: Language[]
  banners: Banner[]
  socialMedia: SocialMedia[]
}

export default defineEventHandler(async (event) => {
  const host = getHeader(event, 'host')?.replace(/^www\./, '')
  const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl || 'http://localhost:8000/api/v1'

  try {
    const response = await $fetch<SiteConfig>(`${apiBaseUrl}/site/config`, {
      headers: {
        'X-Forwarded-Host': host || '',
      },
    })

    event.context.domain = response.domain
    event.context.settings = response.settings
    event.context.languages = response.languages
    event.context.banners = response.banners
    event.context.socialMedia = response.socialMedia

    // Pass server-fetched config to the client via Nuxt payload so it doesn't re-fetch
    event.context.configPayload = response
  } catch (error) {
    console.error('Failed to resolve domain:', error)
  }
})
