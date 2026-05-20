export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const payload = event.context.configPayload
    if (payload) {
      const script = `<script>window.__NUXT_SITE_CONFIG__ = ${JSON.stringify(payload)}</script>`
      html.head.push(script)
    }
  })
})
