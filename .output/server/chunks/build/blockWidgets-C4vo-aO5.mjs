const KB_WIDGET_TYPES = [
  "card",
  "checkbox",
  "button",
  "image",
  "divider",
  "columns",
  "spacer",
  "icon",
  "stats",
  "callout",
  "contact",
  "gallery",
  "quote",
  "accordion",
  "video"
];
const isKbWidgetType = (v) => typeof v === "string" && KB_WIDGET_TYPES.includes(v);
const defaultData = {
  card: {
    title: "Card title",
    text: "Add a short description for this card.",
    imageUrl: "",
    imageAlt: "",
    linkUrl: "",
    linkLabel: "Learn more"
  },
  checkbox: {
    title: "Checklist",
    items: [
      { label: "First item", checked: true },
      { label: "Second item", checked: false }
    ],
    style: "check"
  },
  button: { label: "Click here", url: "#", variant: "primary", align: "left" },
  image: { url: "", alt: "", caption: "", width: "100%", align: "center" },
  divider: { style: "solid" },
  columns: { leftHtml: "<p>Left column</p>", rightHtml: "<p>Right column</p>" },
  spacer: { height: "32" },
  icon: { glyph: "\u2B50", label: "", size: "24", align: "center" },
  stats: {
    items: [
      { number: "500+", label: "Clients" },
      { number: "10", label: "Years" },
      { number: "24/7", label: "Support" }
    ],
    columns: 3
  },
  callout: { variant: "info", title: "", text: "" },
  contact: {
    title: "",
    items: [
      { type: "phone", value: "" },
      { type: "email", value: "" }
    ]
  },
  gallery: { images: [], columns: 3, caption: "" },
  quote: { quote: "", author: "", role: "", avatarUrl: "" },
  accordion: {
    items: [
      { q: "First question?", a: "Answer here." },
      { q: "Second question?", a: "Answer here." }
    ],
    firstOpen: true
  },
  video: { url: "", caption: "" }
};
function encodePayload(data) {
  const json = JSON.stringify(data);
  if (typeof btoa !== "undefined") {
    return btoa(unescape(encodeURIComponent(json)));
  }
  return Buffer.from(json, "utf-8").toString("base64");
}
function decodePayload(payload) {
  if (!payload) return null;
  try {
    const json = typeof atob !== "undefined" ? decodeURIComponent(escape(atob(payload))) : Buffer.from(payload, "base64").toString("utf-8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}
function esc(value) {
  return String(value != null ? value : "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function cardHtml(d) {
  const img = d.imageUrl ? `<img class="kb-card__img" src="${esc(d.imageUrl)}" alt="${esc(d.imageAlt)}" />` : "";
  const title = d.title ? `<h3 class="kb-card__title">${esc(d.title)}</h3>` : "";
  const text = d.text ? `<div class="kb-card__text">${esc(d.text).replace(/\n/g, "<br/>")}</div>` : "";
  const link = d.linkUrl && d.linkLabel ? `<a class="kb-card__link" href="${esc(d.linkUrl)}">${esc(d.linkLabel)}</a>` : "";
  return `${img}<div class="kb-card__body">${title}${text}${link}</div>`;
}
function checkboxHtml(d) {
  const title = d.title ? `<h4 class="kb-checklist__title">${esc(d.title)}</h4>` : "";
  const markClass = d.style === "cross" ? "kb-checklist__mark--cross" : "kb-checklist__mark--check";
  const items = (d.items || []).map((it) => {
    const on = it.checked ? " kb-checklist__item--on" : "";
    return `<li class="kb-checklist__item${on}"><span class="kb-checklist__mark ${markClass}"></span><span class="kb-checklist__label">${esc(
      it.label
    )}</span></li>`;
  }).join("");
  return `${title}<ul class="kb-checklist">${items}</ul>`;
}
function buttonHtml(d) {
  return `<div class="kb-button-wrap" style="text-align:${esc(
    d.align
  )}"><a class="kb-button kb-button--${esc(d.variant)}" href="${esc(
    d.url || "#"
  )}">${esc(d.label)}</a></div>`;
}
function imageHtml(d) {
  if (!d.url) return `<div class="kb-image kb-image--empty">No image selected</div>`;
  const cap = d.caption ? `<figcaption class="kb-image__caption">${esc(d.caption)}</figcaption>` : "";
  return `<figure class="kb-image" style="max-width:${esc(
    d.width
  )};text-align:${esc(d.align)}"><img src="${esc(d.url)}" alt="${esc(
    d.alt
  )}" />${cap}</figure>`;
}
function dividerHtml(d) {
  return `<hr class="kb-divider kb-divider--${esc(d.style)}" />`;
}
function columnsHtml(d) {
  return `<div class="kb-columns"><div class="kb-col">${d.leftHtml || ""}</div><div class="kb-col">${d.rightHtml || ""}</div></div>`;
}
function spacerHtml(d) {
  const h = parseInt(String(d.height), 10);
  const px = Number.isFinite(h) && h > 0 ? h : 32;
  return `<div class="kb-spacer" style="height:${px}px"></div>`;
}
function iconHtml(d) {
  const s = parseInt(String(d.size), 10);
  const px = Number.isFinite(s) && s > 0 ? s : 24;
  const glyph = `<span class="kb-icon__glyph" style="font-size:${px}px">${esc(d.glyph)}</span>`;
  const label = d.label ? `<span class="kb-icon__label">${esc(d.label)}</span>` : "";
  return `<div class="kb-icon" style="text-align:${esc(d.align)}">${glyph}${label}</div>`;
}
function statsHtml(d) {
  const c = Number(d.columns);
  const cols = [2, 3, 4].includes(c) ? c : 3;
  const items = (d.items || []).filter((it) => it.number || it.label).map(
    (it) => `<div class="kb-stats__item"><span class="kb-stats__num">${esc(
      it.number
    )}</span><span class="kb-stats__label">${esc(it.label)}</span></div>`
  ).join("");
  return `<div class="kb-stats" style="--kb-cols:${cols}">${items}</div>`;
}
function calloutHtml(d) {
  const variant = ["info", "success", "warning", "danger"].includes(d.variant) ? d.variant : "info";
  const title = d.title ? `<h4 class="kb-callout__title">${esc(d.title)}</h4>` : "";
  const text = d.text ? `<div class="kb-callout__text">${esc(d.text).replace(/\n/g, "<br/>")}</div>` : "";
  return `<div class="kb-callout kb-callout--${variant}">${title}${text}</div>`;
}
const contactIcon = {
  phone: "\u{1F4DE}",
  email: "\u{1F4E7}",
  address: "\u{1F4CD}",
  hours: "\u{1F552}"
};
function contactHtml(d) {
  const title = d.title ? `<h4 class="kb-contact__title">${esc(d.title)}</h4>` : "";
  const items = (d.items || []).filter((it) => it.value).map((it) => {
    const ic = contactIcon[it.type] || "\u2022";
    const value = it.type === "phone" ? `<a class="kb-contact__value" href="tel:${esc(it.value)}">${esc(it.value)}</a>` : it.type === "email" ? `<a class="kb-contact__value" href="mailto:${esc(it.value)}">${esc(it.value)}</a>` : `<span class="kb-contact__value">${esc(it.value)}</span>`;
    return `<li class="kb-contact__item"><span class="kb-contact__icon">${ic}</span>${value}</li>`;
  }).join("");
  if (!items) return title;
  return `${title}<ul class="kb-contact">${items}</ul>`;
}
function galleryHtml(d) {
  const c = Number(d.columns);
  const cols = [2, 3, 4].includes(c) ? c : 3;
  const imgs = (d.images || []).filter((im) => im.url).map(
    (im) => `<div class="kb-gallery__cell"><img src="${esc(im.url)}" alt="${esc(
      im.alt
    )}" /></div>`
  ).join("");
  if (!imgs) return `<div class="kb-gallery kb-gallery--empty">No images selected</div>`;
  const cap = d.caption ? `<figcaption class="kb-gallery__caption">${esc(d.caption)}</figcaption>` : "";
  return `<figure class="kb-gallery"><div class="kb-gallery__grid" style="--kb-cols:${cols}">${imgs}</div>${cap}</figure>`;
}
function quoteHtml(d) {
  const quote = d.quote ? `<blockquote class="kb-quote__text">${esc(d.quote).replace(/\n/g, "<br/>")}</blockquote>` : "";
  const avatar = d.avatarUrl ? `<img class="kb-quote__avatar" src="${esc(d.avatarUrl)}" alt="${esc(d.author)}" />` : "";
  const author = d.author ? `<span class="kb-quote__author">${esc(d.author)}</span>` : "";
  const role = d.role ? `<span class="kb-quote__role">${esc(d.role)}</span>` : "";
  const meta = avatar || author || role ? `<figcaption class="kb-quote__meta">${avatar}${author}${role}</figcaption>` : "";
  return `<figure class="kb-quote">${quote}${meta}</figure>`;
}
function accordionHtml(d) {
  const items = (d.items || []).filter((it) => it.q || it.a).map((it, i) => {
    const open = d.firstOpen && i === 0 ? " open" : "";
    return `<details class="kb-accordion__item"${open}><summary class="kb-accordion__q">${esc(
      it.q
    )}</summary><div class="kb-accordion__a">${esc(it.a).replace(/\n/g, "<br/>")}</div></details>`;
  }).join("");
  return `<div class="kb-accordion">${items}</div>`;
}
function toEmbedUrl(url) {
  const u = String(url || "").trim();
  if (!u) return "";
  const yt = u.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return u;
}
function isVideoFile(url) {
  return /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(String(url || ""));
}
function videoHtml(d) {
  const url = String(d.url || "").trim();
  if (!url) return `<div class="kb-video kb-video--empty">No video URL</div>`;
  const cap = d.caption ? `<figcaption class="kb-video__caption">${esc(d.caption)}</figcaption>` : "";
  const media = isVideoFile(url) ? `<div class="kb-video__frame"><video src="${esc(url)}" controls preload="metadata"></video></div>` : `<div class="kb-video__frame"><iframe src="${esc(
    toEmbedUrl(url)
  )}" title="${esc(d.caption || "Video")}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  return `<figure class="kb-video">${media}${cap}</figure>`;
}
function previewHtml(type, data) {
  switch (type) {
    case "card":
      return cardHtml(data);
    case "checkbox":
      return checkboxHtml(data);
    case "button":
      return buttonHtml(data);
    case "image":
      return imageHtml(data);
    case "divider":
      return dividerHtml(data);
    case "columns":
      return columnsHtml(data);
    case "spacer":
      return spacerHtml(data);
    case "icon":
      return iconHtml(data);
    case "stats":
      return statsHtml(data);
    case "callout":
      return calloutHtml(data);
    case "contact":
      return contactHtml(data);
    case "gallery":
      return galleryHtml(data);
    case "quote":
      return quoteHtml(data);
    case "accordion":
      return accordionHtml(data);
    case "video":
      return videoHtml(data);
    default:
      return "";
  }
}
function createWidgetHtml(type, data) {
  const payload = encodePayload(data != null ? data : defaultData[type]);
  const inner = previewHtml(type, data != null ? data : defaultData[type]);
  return `<div class="kb-widget kb-${type} mceNonEditable" contenteditable="false" data-kb-type="${type}" data-kb-payload="${payload}">${inner}</div>`;
}
function readWidget(node) {
  if (!node) return null;
  let el = null;
  if (node.closest && typeof node.closest === "function") {
    el = node.closest(".kb-widget");
  } else if (node.nodeType === 1) {
    el = node.classList && node.classList.contains("kb-widget") ? node : null;
  }
  if (!el) return null;
  const type = el.getAttribute("data-kb-type");
  if (!isKbWidgetType(type)) return null;
  const data = decodePayload(el.getAttribute("data-kb-payload") || "") || {
    ...defaultData[type]
  };
  return { type, data };
}
const KB_DRAG_PREFIX = "kb:";
function parseDragMarker(value) {
  if (typeof value !== "string" || !value.startsWith(KB_DRAG_PREFIX)) return null;
  const type = value.slice(KB_DRAG_PREFIX.length);
  return isKbWidgetType(type) ? type : null;
}
let __dragType = null;
const setKbDrag = (type) => {
  __dragType = type;
};
const getKbDrag = () => __dragType;

export { previewHtml as a, createWidgetHtml as c, encodePayload as e, getKbDrag as g, isKbWidgetType as i, parseDragMarker as p, readWidget as r, setKbDrag as s };
//# sourceMappingURL=blockWidgets-C4vo-aO5.mjs.map
