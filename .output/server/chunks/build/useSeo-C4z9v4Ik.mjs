import { b as useRuntimeConfig } from './server.mjs';
import { u as useHead } from './index-CrXeyONu.mjs';

const useSeo = () => {
  const config = useRuntimeConfig();
  const photoUrl = config.public.photoUrl || "https://your-cdn-url.com/";
  const setMeta = (options) => {
    const {
      title = "",
      description = "",
      image,
      icon,
      siteName,
      url,
      type = "website"
    } = options;
    useHead({
      title,
      link: [
        {
          rel: "icon",
          type: "image/png",
          // Change to 'image/x-icon' if your file ends with .ico
          href: icon
          // Pass your dynamic or static icon URL variable here
        }
      ].filter((l) => l.href !== void 0),
      meta: [
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: type },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:site_name", content: siteName },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image }
      ].filter((m) => m.content !== void 0)
    });
  };
  const setFromSetting = (setting) => {
    setMeta({
      title: setting.title || setting.domain_name || "",
      siteName: setting.domain_name || "",
      icon: photoUrl + setting.mobile_logo || photoUrl + setting.logo || ""
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
    const photoPath = (item == null ? void 0 : item.photo) || ((_b = (_a = content.items) == null ? void 0 : _a[0]) == null ? void 0 : _b.photo);
    const imageUrl = photoPath ? `${photoUrl}${photoPath}` : void 0;
    setMeta({
      title: content.title,
      description: content.description || void 0,
      image: imageUrl,
      icon: photoUrl + setting.mobile_logo || photoUrl + setting.logo || "",
      siteName: setting.domain_name || "",
      type: "article"
    });
  };
  return {
    setMeta,
    setFromSetting,
    setForContent
  };
};

export { useSeo as u };
//# sourceMappingURL=useSeo-C4z9v4Ik.mjs.map
