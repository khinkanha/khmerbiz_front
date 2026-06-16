import type { Setting, Content, ContentItem } from '~/types'

export const useSeo = () => {
  const config = useRuntimeConfig()
  const photoUrl = config.public.photoUrl || 'https://your-cdn-url.com/'

  // ── helpers ──
  const stripHtml = (html: string | null | undefined): string =>
    (html || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()

  const truncate = (text: string, max = 155): string =>
    !text ? '' : (text.length <= max ? text : text.slice(0, max).replace(/\s+\S*$/, '').trim() + '…')

  const logoUrl = (setting?: Setting | null): string | undefined => {
    const logo = setting?.mobile_logo || setting?.logo
    return logo ? `${photoUrl}${logo}` : undefined
  }

  const siteName = (setting?: Setting | null): string =>
    (setting?.domain_name as string) || (setting?.title as string) || ''

  const setMeta = (options: {
    title?: string
    description?: string
    image?: string
    icon?: string
    siteName?: string
    url?: string
    type?: string
    noindex?: boolean
  }) => {
    const {
      title = '',
      description = '',
      image,
      icon,
      siteName,
      url,
      type = 'website',
      noindex = false,
    } = options

    useHead({
      title,
      link: [
        {
          rel: 'icon',
          type: 'image/png', // Change to 'image/x-icon' if your file ends with .ico
          href: icon,
        },
      ].filter(l => l.href !== undefined),
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
      ]
        .filter(m => m.content !== undefined && m.content !== '')
        .concat(noindex ? [{ name: 'robots', content: 'noindex, follow' }] : []),
    })
  }

  const setFromSetting = (setting: Setting) => {
    setMeta({
      title: setting.title || setting.domain_name || '',
      siteName: setting.domain_name || '',
      icon: logoUrl(setting),
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

  // ── article SEO — only call for content_type === ARTICLE ──
  // content.description is JSON { title, description }; derive meta description from the body.
  const setForContent = (setting: Setting | null | undefined, content: Content, item?: ContentItem | null) => {
    let body = ''
    try {
      const parsed = content.description ? JSON.parse(content.description) : {}
      body = typeof parsed.description === 'string' ? parsed.description : ''
    } catch {
      body = ''
    }

    const photoPath = item?.photo || content.items?.[0]?.photo
    const name = siteName(setting)

    setMeta({
      title: name ? `${content.title} | ${name}` : content.title,
      description: truncate(stripHtml(body)),
      image: photoPath ? `${photoUrl}${photoPath}` : logoUrl(setting),
      icon: logoUrl(setting),
      siteName: name,
      type: 'article',
    })
  }

  // ── news SEO — pass a news item already normalized by parseNewsItem ──
  // news.description JSON holds { title, shortdes, longdes, photo, publish }.
  const setForNews = (setting: Setting | null | undefined, news: any) => {
    const name = siteName(setting)
    // status: 1 = published; anything else (draft) → do not index
    const noindex = news?.status !== undefined && news.status !== 1

    setMeta({
      title: name ? `${news.title} | ${name}` : news.title,
      description: news.short_description || truncate(stripHtml(news.description)),
      image: news.photo ? `${photoUrl}${news.photo}` : logoUrl(setting),
      icon: logoUrl(setting),
      siteName: name,
      type: 'article',
      noindex,
    })
  }

  return {
    setMeta,
    setFromSetting,
    setForContent,
    setForNews,
  }
}
