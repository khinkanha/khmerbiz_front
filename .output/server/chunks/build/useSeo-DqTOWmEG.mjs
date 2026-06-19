import { b as useRuntimeConfig } from './server.mjs';
import { u as useHead } from './index-CrXeyONu.mjs';

const useSeo = () => {
  const config = useRuntimeConfig();
  const photoUrl = config.public.photoUrl || "https://your-cdn-url.com/";
  const stripHtml = (html) => (html || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  const truncate = (text, max = 155) => !text ? "" : text.length <= max ? text : text.slice(0, max).replace(/\s+\S*$/, "").trim() + "\u2026";
  const logoUrl = (setting) => {
    const logo = (setting == null ? void 0 : setting.mobile_logo) || (setting == null ? void 0 : setting.logo);
    return logo ? `${photoUrl}${logo}` : void 0;
  };
  const siteName = (setting) => (setting == null ? void 0 : setting.domain_name) || (setting == null ? void 0 : setting.title) || "";
  const setMeta = (options) => {
    const {
      title = "",
      description = "",
      image,
      icon,
      siteName: siteName2,
      url,
      type = "website",
      noindex = false
    } = options;
    useHead({
      title,
      link: [
        {
          rel: "icon",
          type: "image/png",
          // Change to 'image/x-icon' if your file ends with .ico
          href: icon
        }
      ].filter((l) => l.href !== void 0),
      meta: [
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: type },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:site_name", content: siteName2 },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image }
      ].filter((m) => m.content !== void 0 && m.content !== "").concat(noindex ? [{ name: "robots", content: "noindex, follow" }] : [])
    });
  };
  const setFromSetting = (setting) => {
    setMeta({
      title: setting.title || setting.domain_name || "",
      siteName: setting.domain_name || "",
      icon: logoUrl(setting)
    });
    if (setting.tracking_id) {
      useHead({
        script: [
          {
            src: `https://www.googletagmanager.com/gtag/js?id=${setting.tracking_id}`,
            async: true
          },
          {
            innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${setting.tracking_id}');
            `,
            type: "text/javascript"
          }
        ]
      });
    }
    if (setting.chat_script) {
      useHead({
        script: [
          {
            innerHTML: setting.chat_script,
            type: "text/javascript"
          }
        ]
      });
    }
  };
  const setForContent = (setting, content, item) => {
    var _a, _b;
    let body = "";
    try {
      const parsed = content.description ? JSON.parse(content.description) : {};
      body = typeof parsed.description === "string" ? parsed.description : "";
    } catch {
      body = "";
    }
    const photoPath = (item == null ? void 0 : item.photo) || ((_b = (_a = content.items) == null ? void 0 : _a[0]) == null ? void 0 : _b.photo);
    const name = siteName(setting);
    setMeta({
      title: name ? `${content.title} | ${name}` : content.title,
      description: truncate(stripHtml(body)),
      image: photoPath ? `${photoUrl}${photoPath}` : logoUrl(setting),
      icon: logoUrl(setting),
      siteName: name,
      type: "article"
    });
  };
  const setForNews = (setting, news) => {
    const name = siteName(setting);
    const noindex = (news == null ? void 0 : news.status) !== void 0 && news.status !== 1;
    setMeta({
      title: name ? `${news.title} | ${name}` : news.title,
      description: news.short_description || truncate(stripHtml(news.description)),
      image: news.photo ? `${photoUrl}${news.photo}` : logoUrl(setting),
      icon: logoUrl(setting),
      siteName: name,
      type: "article",
      noindex
    });
  };
  return {
    setMeta,
    setFromSetting,
    setForContent,
    setForNews
  };
};

export { useSeo as u };
//# sourceMappingURL=useSeo-DqTOWmEG.mjs.map
