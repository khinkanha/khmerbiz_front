export default defineEventHandler(async (event) => {
  const host = getHeader(event, 'host')?.replace(/^www\./, '')
  const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl || 'http://localhost:8000/api/v1'

  try {
    // Use native fetch to avoid $fetch throwing on non-200 responses
    const res = await globalThis.fetch(`${apiBaseUrl}/site/config`, {
      headers: {
        'X-Forwarded-Host': host || '',
      },
    })

    if (res.ok) {
      const body = await res.json()
      if (body.status && body.data) {
        const data = body.data
        event.context.domain = data.domain
        event.context.settings = data.settings
        event.context.languages = data.languages
        event.context.banners = data.banners
        event.context.socialMedia = data.socialMedia

        // Pass server-fetched config to the client via Nuxt payload so it doesn't re-fetch
        event.context.configPayload = data
      }
    }
  } catch (error) {
    console.error('Failed to resolve domain:', error)
  }
})
