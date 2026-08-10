import { useDomainStore } from '~/stores/domain'

/**
 * A script descriptor Nuxt's `useHead` can render as a real, executing
 * <script> tag. Either a remote `src` or inline `innerHTML` JS body.
 */
type ScriptDescriptor = { src?: string; innerHTML?: string; async?: boolean }

/**
 * Normalize whatever the admin pasted into the "Widget Chat" field
 * (tblsetting.chat_script) into a single script descriptor. Vendors ship
 * their snippet in a few different shapes:
 *   • full tag:    <script src="https://embed.tawk.to/..."></script>
 *                  <script async src="https://…"></script>
 *   • full tag:    <script>var Tawk_API=…; (function(){…})()</script>
 *   • bare URL:    https://embed.tawk.to/abc/def
 *   • bare JS:     var Tawk_API=…
 * All four become one of { src } or { innerHTML }.
 */
export function parseChatScript(raw: string): ScriptDescriptor | null {
  const value = (raw || '').trim()
  if (!value) return null

  // Full <script ...>…</script> tag (case-insensitive, attributes optional).
  const tagMatch = value.match(/<script\b([^>]*)>([\s\S]*?)<\/script>/i)
  if (tagMatch) {
    const attrs = tagMatch[1] || ''
    const inner = (tagMatch[2] || '').trim()
    const srcMatch = attrs.match(/\bsrc\s*=\s*(['"])(.*?)\1/i)
    if (srcMatch) {
      return { src: srcMatch[2], async: /\basync\b/i.test(attrs) }
    }
    if (inner) return { innerHTML: inner }
    return null // empty <script></script>
  }

  // Self-closing-ish or lone opening tag with a src: <script src="…" >
  const loneSrc = value.match(/<script\b([^>]*)\/?>/i)
  if (loneSrc) {
    const attrs = loneSrc[1] || ''
    const srcMatch = attrs.match(/\bsrc\s*=\s*(['"])(.*?)\1/i)
    if (srcMatch) return { src: srcMatch[2], async: /\basync\b/i.test(attrs) }
  }

  // Bare URL (http(s):// or protocol-relative //…)
  if (/^(https?:)?\/\//i.test(value)) {
    return { src: value, async: true }
  }

  // Everything else: treat as an inline JS body.
  return { innerHTML: value }
}

/**
 * Emit the configured chat widget as a real <script> at the end of <body>,
 * so the vendor snippet executes and bootstraps its own UI. Reads
 * tblsetting.chat_script (shipped via GET /site/config → domain store)
 * reactively; no-op when the field is empty. Call once from a footer
 * component. Only one footer is mounted at a time (Designer XOR Public),
 * so there's never a double injection.
 */
export const useChatWidget = () => {
  const domainStore = useDomainStore()

  const descriptor = computed<ScriptDescriptor | null>(() =>
    parseChatScript(domainStore.settings?.chat_script || ''),
  )

  useHead(
    computed(() => ({
      script:
        descriptor.value != null
          ? [{ ...descriptor.value, tagPosition: 'bodyClose' as const }]
          : [],
    })),
  )
}
