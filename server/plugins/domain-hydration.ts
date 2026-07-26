export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const payload = event.context.configPayload
    if (payload) {
      const script = `<script>window.__NUXT_SITE_CONFIG__ = ${JSON.stringify(payload)}</script>`
      html.head.push(script)
      // Forward the Site Designer payload separately so the design store can
      // hydrate it zero-flash. (The domain store consumes and deletes
      // __NUXT_SITE_CONFIG__, so the design needs its own global.) Only present
      // once the backend adds `design` to GET /site/config — harmless until then.
      if (payload.design) {
        html.head.push(`<script>window.__NUXT_DESIGN__ = ${JSON.stringify(payload.design)}</script>`)
      }
    }
  })
})
