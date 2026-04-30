import type { Setting, Content, ContentItem } from '~/types'

export const useSeo = () => {
  const config = useRuntimeConfig()
  const photoUrl = config.public.photoUrl || 'https://your-cdn-url.com/'

  const setMeta = (options: {
    title?: string
    description?: string
    image?: string
    siteName?: string
    url?: string
    type?: string
  }) => {
    const {
      title = '',
      description = '',
      image,
      siteName,
      url,
      type = 'website',
    } = options

    useHead({
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: type },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image },
        { property: 'og:site_name', content: siteName },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
      ].filter(m => m.content !== undefined),
    })
  }

  const setFromSetting = (setting: Setting) => {
    setMeta({
      title: setting.title || setting.domain_name || '',
      siteName: setting.domain_name || '',
    })

    if (setting.tracking_id) {
      useHead({
        script: [
          {
            src: `https://www.googletagmanager.com/gtag/js?id=${setting.tracking_id}`,
            async: true,
          },
          {
            innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${setting.tracking_id}');
            `,
            type: 'text/javascript',
          },
        ],
      })
    }

    if (setting.chat_script) {
      useHead({
        script: [
          {
            innerHTML: setting.chat_script,
            type: 'text/javascript',
          },
        ],
      })
    }
  }

  const setForContent = (
    setting: Setting,
    content: Content,
    item?: ContentItem
  ) => {
    const photoPath = item?.photo || content.items?.[0]?.photo
    const imageUrl = photoPath
      ? `${photoUrl}${photoPath}`
      : undefined

    setMeta({
      title: content.title,
      description: content.description || undefined,
      image: imageUrl,
      siteName: setting.domain_name || '',
      type: 'article',
    })
  }

  return {
    setMeta,
    setFromSetting,
    setForContent,
  }
}
