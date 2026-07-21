import { p as parseSmartDescription, _ as __nuxt_component_0$1 } from './tiptapFormat-skNvmggH.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-DlwdfiwN.mjs';
import { defineComponent, computed, mergeProps, ref, watch, resolveComponent, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, createTextVNode, isRef, withModifiers, resolveDirective, Fragment, renderList, withDirectives, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrGetDirectiveProps } from 'vue/server-renderer';
import { p as parseNewsItem } from './useNewsParser-BRh25yln.mjs';
import { _ as _export_sfc, m as useRoute, u as useRouter, l as useI18n, a as useNuxtApp, b as useRuntimeConfig } from './server.mjs';
import { u as useApi } from './auth-CZZkTxj2.mjs';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "NewsSection",
  __ssrInlineRender: true,
  props: {
    domainId: {},
    contentId: {},
    sectionTitle: { default: "" },
    showMoreLink: { type: Boolean, default: false },
    moreLink: { default: "" },
    sectionDescription: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const sectionDescriptionSmart = computed(() => parseSmartDescription(props.sectionDescription));
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl;
    const route = useRoute();
    useRouter();
    const api = useApi();
    const currentPage = ref(1);
    const totalPages = ref(1);
    const loading = ref(false);
    const newsItems = ref([]);
    const featureNews = ref([]);
    const fetchNews = async (page = 1) => {
      if (!props.contentId) return;
      loading.value = true;
      try {
        const response = await api.get(`/site/list-news/${props.contentId}?page=${page}`);
        if (response.success && response.data) {
          const data = response.data;
          const items = data.items || data;
          newsItems.value = (Array.isArray(items) ? items : []).map(parseNewsItem);
          if (data.pagination) {
            totalPages.value = data.pagination.totalPages || data.pagination.total_pages || 1;
          } else {
            totalPages.value = 1;
          }
        }
      } catch (e) {
        console.error("Failed to fetch news:", e);
      } finally {
        loading.value = false;
      }
    };
    const formatDate = (date) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString();
    };
    watch(() => route.query.page, async (newPage) => {
      if (newPage) {
        const page = parseInt(newPage, 10);
        if (page > 0 && page !== currentPage.value) {
          currentPage.value = page;
          await fetchNews(page);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a;
      const _component_BlockRenderer = __nuxt_component_0$1;
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "news-section" }, _attrs))} data-v-e65385b8>`);
      if (__props.sectionTitle) {
        _push(`<h2 class="section-title" data-v-e65385b8>${ssrInterpolate(__props.sectionTitle)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (((_a = sectionDescriptionSmart.value) == null ? void 0 : _a.format) === "tiptap" && sectionDescriptionSmart.value.tiptapDoc) {
        _push(`<div class="section-description" data-v-e65385b8>`);
        _push(ssrRenderComponent(_component_BlockRenderer, {
          doc: sectionDescriptionSmart.value.tiptapDoc
        }, null, _parent));
        _push(`</div>`);
      } else if (__props.sectionDescription) {
        _push(`<div class="section-description" data-v-e65385b8>${(_a2 = __props.sectionDescription) != null ? _a2 : ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-e65385b8>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[-->`);
        if (unref(featureNews).length > 0) {
          _push(`<div class="feature-news" data-v-e65385b8><!--[-->`);
          ssrRenderList(unref(featureNews), (news) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: "feat-" + news.id,
              to: `/news/${news.news_id || news.id}`,
              class: "feature-card"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="feature-badge" data-v-e65385b8${_scopeId}>Featured</div><div class="feature-card-image" data-v-e65385b8${_scopeId}>`);
                  if (news.photo) {
                    _push2(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${news.photo}`)}${ssrRenderAttr("alt", news.title)} data-v-e65385b8${_scopeId}>`);
                  } else {
                    _push2(`<div class="news-placeholder" data-v-e65385b8${_scopeId}><i class="pi pi-image" data-v-e65385b8${_scopeId}></i></div>`);
                  }
                  _push2(`</div><div class="feature-card-body" data-v-e65385b8${_scopeId}><h4 class="feature-title" data-v-e65385b8${_scopeId}>${ssrInterpolate(news.title)}</h4>`);
                  if (news.short_description) {
                    _push2(`<p class="feature-excerpt" data-v-e65385b8${_scopeId}>${ssrInterpolate(news.short_description)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (news.publish_date) {
                    _push2(`<div class="feature-date" data-v-e65385b8${_scopeId}><i class="pi pi-calendar" data-v-e65385b8${_scopeId}></i> ${ssrInterpolate(formatDate(news.publish_date))}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "feature-badge" }, "Featured"),
                    createVNode("div", { class: "feature-card-image" }, [
                      news.photo ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `${unref(photoUrl)}${news.photo}`,
                        alt: news.title
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "news-placeholder"
                      }, [
                        createVNode("i", { class: "pi pi-image" })
                      ]))
                    ]),
                    createVNode("div", { class: "feature-card-body" }, [
                      createVNode("h4", { class: "feature-title" }, toDisplayString(news.title), 1),
                      news.short_description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "feature-excerpt"
                      }, toDisplayString(news.short_description), 1)) : createCommentVNode("", true),
                      news.publish_date ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "feature-date"
                      }, [
                        createVNode("i", { class: "pi pi-calendar" }),
                        createTextVNode(" " + toDisplayString(formatDate(news.publish_date)), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="news-grid" data-v-e65385b8><!--[-->`);
        ssrRenderList(unref(newsItems), (news) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: news.news_id || news.id,
            to: `/news/${news.news_id || news.id}`,
            class: "news-card"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="news-image" data-v-e65385b8${_scopeId}>`);
                if (news.photo) {
                  _push2(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${news.photo}`)}${ssrRenderAttr("alt", news.title)} data-v-e65385b8${_scopeId}>`);
                } else {
                  _push2(`<div class="news-placeholder" data-v-e65385b8${_scopeId}><i class="pi pi-image" data-v-e65385b8${_scopeId}></i></div>`);
                }
                _push2(`</div><div class="news-content" data-v-e65385b8${_scopeId}><h4 class="news-title" data-v-e65385b8${_scopeId}>${ssrInterpolate(news.title)}</h4>`);
                if (news.short_description) {
                  _push2(`<p class="news-excerpt" data-v-e65385b8${_scopeId}>${ssrInterpolate(news.short_description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (news.publish_date) {
                  _push2(`<div class="news-date" data-v-e65385b8${_scopeId}><i class="pi pi-calendar" data-v-e65385b8${_scopeId}></i> ${ssrInterpolate(formatDate(news.publish_date))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "news-image" }, [
                    news.photo ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: `${unref(photoUrl)}${news.photo}`,
                      alt: news.title
                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "news-placeholder"
                    }, [
                      createVNode("i", { class: "pi pi-image" })
                    ]))
                  ]),
                  createVNode("div", { class: "news-content" }, [
                    createVNode("h4", { class: "news-title" }, toDisplayString(news.title), 1),
                    news.short_description ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "news-excerpt"
                    }, toDisplayString(news.short_description), 1)) : createCommentVNode("", true),
                    news.publish_date ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "news-date"
                    }, [
                      createVNode("i", { class: "pi pi-calendar" }),
                      createTextVNode(" " + toDisplayString(formatDate(news.publish_date)), 1)
                    ])) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
        if (unref(totalPages) > 1) {
          _push(`<div class="pagination-controls" data-v-e65385b8><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""}${ssrRenderAttr("title", _ctx.$t("common.first"))} data-v-e65385b8><i class="pi pi-angle-double-left" data-v-e65385b8></i></button><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""}${ssrRenderAttr("title", _ctx.$t("common.previous"))} data-v-e65385b8><i class="pi pi-angle-left" data-v-e65385b8></i></button><span class="pagination-info" data-v-e65385b8>${ssrInterpolate(unref(currentPage))} / ${ssrInterpolate(unref(totalPages))}</span><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""}${ssrRenderAttr("title", _ctx.$t("common.next"))} data-v-e65385b8><i class="pi pi-angle-right" data-v-e65385b8></i></button><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""}${ssrRenderAttr("title", _ctx.$t("common.last"))} data-v-e65385b8><i class="pi pi-angle-double-right" data-v-e65385b8></i></button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      if (__props.showMoreLink) {
        _push(`<div class="section-footer" data-v-e65385b8>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: __props.moreLink,
          class: "view-more-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("contentManager.view"))} ${ssrInterpolate(_ctx.$t("common.more"))} <i class="pi pi-arrow-right" data-v-e65385b8${_scopeId}></i>`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("contentManager.view")) + " " + toDisplayString(_ctx.$t("common.more")) + " ", 1),
                createVNode("i", { class: "pi pi-arrow-right" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/NewsSection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-e65385b8"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "PhotoGallery",
  __ssrInlineRender: true,
  props: {
    items: {},
    sectionTitle: { default: "" },
    sectionDescription: { default: "" }
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl;
    const showLightbox = ref(false);
    const currentItem = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Dialog = resolveComponent("Dialog");
      const _component_Button = resolveComponent("Button");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "photo-gallery-section" }, _attrs))} data-v-5d58d689>`);
      if (__props.sectionTitle) {
        _push(`<h2 class="section-title" data-v-5d58d689>${ssrInterpolate(__props.sectionTitle)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.sectionDescription) {
        _push(`<div class="section-description" data-v-5d58d689>${(_a = __props.sectionDescription) != null ? _a : ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="gallery-grid" data-v-5d58d689><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<div class="${ssrRenderClass([{ featured: item.is_feature }, "gallery-item"])}" data-v-5d58d689><img${ssrRenderAttr("src", `${unref(photoUrl)}${item.url}`)}${ssrRenderAttr("alt", item.title)} data-v-5d58d689>`);
        if (item.title) {
          _push(`<div class="item-caption" data-v-5d58d689><p data-v-5d58d689>${ssrInterpolate(item.title)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_Dialog, {
        visible: unref(showLightbox),
        "onUpdate:visible": ($event) => isRef(showLightbox) ? showLightbox.value = $event : null,
        style: { width: "90vw", maxWidth: "1200px" },
        modal: true,
        showHeader: false,
        contentClass: "lightbox-dialog"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<div class="lightbox-content" data-v-5d58d689${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              icon: "pi pi-times",
              rounded: "",
              text: "",
              severity: "secondary",
              class: "lightbox-close",
              onClick: ($event) => showLightbox.value = false
            }, null, _parent2, _scopeId));
            if (unref(currentItem)) {
              _push2(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${unref(currentItem).url || unref(currentItem).photo}`)}${ssrRenderAttr("alt", unref(currentItem).title)} class="lightbox-image" data-v-5d58d689${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_a2 = unref(currentItem)) == null ? void 0 : _a2.title) {
              _push2(`<div class="lightbox-caption" data-v-5d58d689${_scopeId}>${ssrInterpolate(unref(currentItem).title)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: "lightbox-content",
                onClick: ($event) => showLightbox.value = false
              }, [
                createVNode(_component_Button, {
                  icon: "pi pi-times",
                  rounded: "",
                  text: "",
                  severity: "secondary",
                  class: "lightbox-close",
                  onClick: withModifiers(($event) => showLightbox.value = false, ["stop"])
                }, null, 8, ["onClick"]),
                unref(currentItem) ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: `${unref(photoUrl)}${unref(currentItem).url || unref(currentItem).photo}`,
                  alt: unref(currentItem).title,
                  class: "lightbox-image"
                }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                ((_b = unref(currentItem)) == null ? void 0 : _b.title) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "lightbox-caption"
                }, toDisplayString(unref(currentItem).title), 1)) : createCommentVNode("", true)
              ], 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/PhotoGallery.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-5d58d689"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "VideoSection",
  __ssrInlineRender: true,
  props: {
    items: {},
    sectionTitle: { default: "" },
    sectionDescription: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const sectionDescriptionSmart = computed(() => parseSmartDescription(props.sectionDescription));
    const getEmbedUrl = (url) => {
      if (!url) return null;
      const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
      if (youtubeMatch) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      }
      const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
      if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
      }
      return null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a;
      const _component_BlockRenderer = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "video-section" }, _attrs))} data-v-972a4d78>`);
      if (__props.sectionTitle) {
        _push(`<h2 class="section-title" data-v-972a4d78>${ssrInterpolate(__props.sectionTitle)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (((_a = sectionDescriptionSmart.value) == null ? void 0 : _a.format) === "tiptap" && sectionDescriptionSmart.value.tiptapDoc) {
        _push(`<div class="section-description" data-v-972a4d78>`);
        _push(ssrRenderComponent(_component_BlockRenderer, {
          doc: sectionDescriptionSmart.value.tiptapDoc
        }, null, _parent));
        _push(`</div>`);
      } else if (__props.sectionDescription) {
        _push(`<div class="section-description" data-v-972a4d78>${(_a2 = __props.sectionDescription) != null ? _a2 : ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="video-grid" data-v-972a4d78><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        var _a3;
        _push(`<div class="video-item" data-v-972a4d78><div class="video-wrapper" data-v-972a4d78>`);
        if (item.url && getEmbedUrl(item.url)) {
          _push(`<iframe${ssrRenderAttr("src", (_a3 = getEmbedUrl(item.url)) != null ? _a3 : void 0)}${ssrRenderAttr("title", item.title)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-v-972a4d78></iframe>`);
        } else {
          _push(`<div class="video-placeholder" data-v-972a4d78><i class="pi pi-video" data-v-972a4d78></i><p data-v-972a4d78>Invalid video URL</p></div>`);
        }
        _push(`</div>`);
        if (item.title) {
          _push(`<div class="video-caption" data-v-972a4d78><h3 data-v-972a4d78>${ssrInterpolate(item.title)}</h3>`);
          if (item.description) {
            _push(`<p class="video-description" data-v-972a4d78>${ssrInterpolate(item.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/VideoSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-972a4d78"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MapDisplay",
  __ssrInlineRender: true,
  props: {
    mapData: {},
    sectionTitle: { default: "" },
    sectionDescription: { default: "" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "map-section" }, _attrs))} data-v-603b3917>`);
      if (__props.sectionTitle) {
        _push(`<h2 class="section-title" data-v-603b3917>${ssrInterpolate(__props.sectionTitle)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.sectionDescription) {
        _push(`<div class="section-description" data-v-603b3917>${(_a = __props.sectionDescription) != null ? _a : ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="map-container" data-v-603b3917>`);
      _push(ssrRenderComponent(unref(LMap), {
        zoom: __props.mapData.zoom || 13,
        center: [__props.mapData.lat || 11.5564, __props.mapData.lng || 104.9282],
        useGlobalLeaflet: false,
        class: "map-display"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(LTileLayer), {
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              attribution: "\xA9 OpenStreetMap"
            }, null, _parent2, _scopeId));
            if (__props.mapData.lat && __props.mapData.lng) {
              _push2(ssrRenderComponent(unref(LMarker), {
                "lat-lng": [__props.mapData.lat, __props.mapData.lng]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(LPopup), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(__props.mapData.marker || "Location")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(__props.mapData.marker || "Location"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(LPopup), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.mapData.marker || "Location"), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(LTileLayer), {
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                attribution: "\xA9 OpenStreetMap"
              }),
              __props.mapData.lat && __props.mapData.lng ? (openBlock(), createBlock(unref(LMarker), {
                key: 0,
                "lat-lng": [__props.mapData.lat, __props.mapData.lng]
              }, {
                default: withCtx(() => [
                  createVNode(unref(LPopup), null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.mapData.marker || "Location"), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["lat-lng"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/MapDisplay.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-603b3917"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DocumentSection",
  __ssrInlineRender: true,
  props: {
    items: {},
    sectionTitle: { default: "" },
    sectionDescription: { default: "" }
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl;
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "document-section" }, _attrs))} data-v-883a5a13>`);
      if (__props.sectionTitle) {
        _push(`<h2 class="section-title" data-v-883a5a13>${ssrInterpolate(__props.sectionTitle)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.sectionDescription) {
        _push(`<div class="section-description" data-v-883a5a13>${(_a = __props.sectionDescription) != null ? _a : ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="document-list" data-v-883a5a13><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<a${ssrRenderAttr("href", `${unref(photoUrl)}${item.url}`)}${ssrRenderAttr("download", item.title)} class="document-item" target="_blank" data-v-883a5a13><div class="document-icon" data-v-883a5a13><i class="pi pi-file-pdf" data-v-883a5a13></i></div><div class="document-info" data-v-883a5a13>`);
        if (item.title) {
          _push(`<h3 data-v-883a5a13>${ssrInterpolate(item.title)}</h3>`);
        } else {
          _push(`<!---->`);
        }
        if (item.description) {
          _push(`<p class="document-description" data-v-883a5a13>${ssrInterpolate(item.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="document-action" data-v-883a5a13><i class="pi pi-download" data-v-883a5a13></i></div></a>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/DocumentSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-883a5a13"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductCatalog",
  __ssrInlineRender: true,
  props: {
    contentId: {},
    sectionTitle: { default: "" },
    sectionDescription: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const sectionDescriptionSmart = computed(() => parseSmartDescription(props.sectionDescription));
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl;
    const route = useRoute();
    useApi();
    const { locale } = useI18n();
    const loading = ref(false);
    const allProducts = ref([]);
    const products = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const currentLocale = computed(() => locale.value);
    const searchQuery = ref("");
    const priceRange = ref([0, 1e3]);
    const selectedCurrencies = ref([]);
    const sortBy = ref("priority");
    const sortOrder = ref("desc");
    const showFilters = ref(false);
    const showLightbox = ref(false);
    const currentProduct = ref(null);
    const currentPhotoIndex = ref(0);
    const filterMetadata = computed(() => {
      if (allProducts.value.length === 0) {
        return {
          priceRange: { min: 0, max: 1e3 },
          currencies: [],
          totalCount: 0
        };
      }
      const prices = allProducts.value.map((p) => p.price || 0).filter((p) => p > 0);
      const currencies = [...new Set(allProducts.value.map((p) => p.currency || "USD"))];
      return {
        priceRange: {
          min: prices.length > 0 ? Math.min(...prices) : 0,
          max: prices.length > 0 ? Math.max(...prices) : 1e3
        },
        currencies: currencies.sort(),
        totalCount: allProducts.value.length
      };
    });
    const hasActiveFilters = computed(() => {
      return searchQuery.value || priceRange.value[0] > filterMetadata.value.priceRange.min || priceRange.value[1] < filterMetadata.value.priceRange.max || selectedCurrencies.value.length > 0;
    });
    const appliedFilters = computed(() => {
      const filters = [];
      if (searchQuery.value) {
        filters.push({ type: "search", value: searchQuery.value, label: `${useNuxtApp().$i18n.t("product.filter.title")}: ${searchQuery.value}` });
      }
      if (priceRange.value[0] > filterMetadata.value.priceRange.min || priceRange.value[1] < filterMetadata.value.priceRange.max) {
        filters.push({
          type: "price",
          value: priceRange.value,
          label: `${formatCurrency(priceRange.value[0])} - ${formatCurrency(priceRange.value[1])}`
        });
      }
      if (selectedCurrencies.value.length > 0) {
        filters.push({
          type: "currency",
          value: selectedCurrencies.value,
          label: selectedCurrencies.value.join(", ")
        });
      }
      return filters;
    });
    const sortOptions = computed(() => [
      { value: "priority", label: useNuxtApp().$i18n.t("product.sort.featured") },
      { value: "price", label: useNuxtApp().$i18n.t("product.sort.price") },
      { value: "name", label: useNuxtApp().$i18n.t("product.sort.name") },
      { value: "create_date", label: useNuxtApp().$i18n.t("product.sort.newest") }
    ]);
    const applyFilters = () => {
      let results = [...allProducts.value];
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim();
        results = results.filter(
          (product) => product.name.toLowerCase().includes(query)
        );
      }
      const minPrice = priceRange.value[0] || 0;
      const maxPrice = priceRange.value[1] || 1e4;
      results = results.filter((product) => {
        const price = product.price || 0;
        return price >= minPrice && price <= maxPrice;
      });
      if (selectedCurrencies.value.length > 0) {
        results = results.filter(
          (product) => selectedCurrencies.value.includes(product.currency || "USD")
        );
      }
      results.sort((a, b) => {
        switch (sortBy.value) {
          case "price":
            return sortOrder.value === "asc" ? (a.price || 0) - (b.price || 0) : (b.price || 0) - (a.price || 0);
          case "name":
            return sortOrder.value === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
          case "create_date":
            const dateA = a.create_date ? new Date(a.create_date).getTime() : 0;
            const dateB = b.create_date ? new Date(b.create_date).getTime() : 0;
            return sortOrder.value === "asc" ? dateA - dateB : dateB - dateA;
          case "priority":
          default:
            return sortOrder.value === "asc" ? (a.priority || 0) - (b.priority || 0) : (b.priority || 0) - (a.priority || 0);
        }
      });
      const filteredTotal = results.length;
      totalPages.value = Math.ceil(filteredTotal / 12) || 1;
      if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
      }
      const start = (currentPage.value - 1) * 12;
      const end = start + 12;
      products.value = results.slice(start, end);
    };
    const formatCurrency = (amount) => {
      if (!amount && amount !== 0) return "$0";
      const locale2 = currentLocale.value === "kh" ? "km-KH" : currentLocale.value === "ch" ? "zh-CN" : currentLocale.value === "th" ? "th-TH" : currentLocale.value === "vi" ? "vi-VN" : "en-US";
      return new Intl.NumberFormat(locale2, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount);
    };
    const formatPrice = (price) => {
      if (!price && price !== 0) return "0";
      const locale2 = currentLocale.value === "kh" ? "km-KH" : currentLocale.value === "ch" ? "zh-CN" : currentLocale.value === "th" ? "th-TH" : currentLocale.value === "vi" ? "vi-VN" : "en-US";
      return new Intl.NumberFormat(locale2, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(price);
    };
    const openProductLightbox = (product, photoIndex = 0) => {
      if (product.photos && product.photos.length > 0) {
        currentProduct.value = product;
        currentPhotoIndex.value = photoIndex;
        showLightbox.value = true;
      }
    };
    const lightboxSwipeStartX = ref(null);
    const onLightboxPointerDown = (e) => {
      var _a, _b;
      lightboxSwipeStartX.value = e.clientX;
      (_b = (_a = e.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a, e.pointerId);
    };
    const onLightboxPointerUp = (e) => {
      if (lightboxSwipeStartX.value === null) return;
      const delta = e.clientX - lightboxSwipeStartX.value;
      lightboxSwipeStartX.value = null;
      if (Math.abs(delta) < 50) return;
      if (delta < 0) nextPhoto();
      else prevPhoto();
    };
    const nextPhoto = () => {
      if (currentProduct.value && currentPhotoIndex.value < currentProduct.value.photos.length - 1) {
        currentPhotoIndex.value++;
      }
    };
    const prevPhoto = () => {
      if (currentPhotoIndex.value > 0) {
        currentPhotoIndex.value--;
      }
    };
    watch(() => route.query.page, async (newPage) => {
      if (newPage) {
        const p = parseInt(newPage, 10);
        if (p > 0 && p !== currentPage.value) {
          currentPage.value = p;
          applyFilters();
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a;
      const _component_BlockRenderer = __nuxt_component_0$1;
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_Dialog = resolveComponent("Dialog");
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["product-catalog", `lang-${currentLocale.value}`]
      }, _attrs))} data-v-3d49863c>`);
      if (__props.sectionTitle) {
        _push(`<h2 class="section-title" data-v-3d49863c>${ssrInterpolate(__props.sectionTitle)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (((_a = sectionDescriptionSmart.value) == null ? void 0 : _a.format) === "tiptap" && sectionDescriptionSmart.value.tiptapDoc) {
        _push(`<div class="section-description" data-v-3d49863c>`);
        _push(ssrRenderComponent(_component_BlockRenderer, {
          doc: sectionDescriptionSmart.value.tiptapDoc
        }, null, _parent));
        _push(`</div>`);
      } else if (__props.sectionDescription) {
        _push(`<div class="section-description" data-v-3d49863c>${(_a2 = __props.sectionDescription) != null ? _a2 : ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && unref(allProducts).length > 0) {
        _push(`<div class="search-container" data-v-3d49863c><div class="search-bar" data-v-3d49863c><i class="pi pi-search search-icon" data-v-3d49863c></i><input${ssrRenderAttr("value", unref(searchQuery))}${ssrRenderAttr("placeholder", _ctx.$t("product.search.placeholder"))} class="search-input" data-v-3d49863c>`);
        if (unref(searchQuery)) {
          _push(`<button class="clear-search" data-v-3d49863c><i class="pi pi-times" data-v-3d49863c></i></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button class="${ssrRenderClass([{ active: hasActiveFilters.value }, "filter-button"])}" data-v-3d49863c><i class="pi pi-filter" data-v-3d49863c></i><span data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.filter.title"))}</span>`);
        if (appliedFilters.value.length) {
          _push(`<span class="filter-badge" data-v-3d49863c>${ssrInterpolate(appliedFilters.value.length)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (appliedFilters.value.length) {
        _push(`<div class="applied-filters" data-v-3d49863c><!--[-->`);
        ssrRenderList(appliedFilters.value, (filter) => {
          _push(`<div class="filter-tag" data-v-3d49863c><span data-v-3d49863c>${ssrInterpolate(filter.label)}</span><button class="remove-filter" data-v-3d49863c><i class="pi pi-times" data-v-3d49863c></i></button></div>`);
        });
        _push(`<!--]--><button class="reset-all" data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.filter.clearAll"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showFilters)) {
        _push(`<div class="filter-panel" data-v-3d49863c><div class="filter-header" data-v-3d49863c><h3 data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.filter.title"))}</h3><button class="close-btn" data-v-3d49863c><i class="pi pi-times" data-v-3d49863c></i></button></div><div class="filter-section" data-v-3d49863c><h4 data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.filter.priceRange"))}</h4><div class="price-inputs" data-v-3d49863c><div class="price-input" data-v-3d49863c><label data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.filter.minPrice"))}</label><input type="number"${ssrRenderAttr("value", unref(priceRange)[0])}${ssrRenderAttr("min", filterMetadata.value.priceRange.min)}${ssrRenderAttr("max", filterMetadata.value.priceRange.max)} data-v-3d49863c></div><span class="price-separator" data-v-3d49863c>-</span><div class="price-input" data-v-3d49863c><label data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.filter.maxPrice"))}</label><input type="number"${ssrRenderAttr("value", unref(priceRange)[1])}${ssrRenderAttr("min", filterMetadata.value.priceRange.min)}${ssrRenderAttr("max", filterMetadata.value.priceRange.max)} data-v-3d49863c></div></div><div class="price-display" data-v-3d49863c>${ssrInterpolate(formatCurrency(unref(priceRange)[0]))} - ${ssrInterpolate(formatCurrency(unref(priceRange)[1]))}</div></div>`);
        if (filterMetadata.value.currencies.length) {
          _push(`<div class="filter-section" data-v-3d49863c><h4 data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.filter.currency"))}</h4><div class="currency-options" data-v-3d49863c><!--[-->`);
          ssrRenderList(filterMetadata.value.currencies, (currency) => {
            _push(`<label class="currency-checkbox" data-v-3d49863c><input type="checkbox"${ssrRenderAttr("value", currency)}${ssrIncludeBooleanAttr(unref(selectedCurrencies).includes(currency)) ? " checked" : ""} data-v-3d49863c><span data-v-3d49863c>${ssrInterpolate(currency)}</span></label>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="filter-section" data-v-3d49863c><h4 data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.filter.sortBy"))}</h4><div class="sort-options" data-v-3d49863c><!--[-->`);
        ssrRenderList(sortOptions.value, (option) => {
          _push(`<button class="${ssrRenderClass(["sort-btn", { active: unref(sortBy) === option.value }])}" data-v-3d49863c>${ssrInterpolate(option.label)} `);
          if (unref(sortBy) === option.value) {
            _push(`<i class="${ssrRenderClass(unref(sortOrder) === "asc" ? "pi pi-arrow-up" : "pi pi-arrow-down")}" data-v-3d49863c></i>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div><div class="filter-footer" data-v-3d49863c><div class="results-count" data-v-3d49863c>${ssrInterpolate(unref(products).length)} ${ssrInterpolate(_ctx.$t("product.pagination.of"))} ${ssrInterpolate(filterMetadata.value.totalCount)} ${ssrInterpolate(_ctx.$t("product.search.resultsCount", { count: filterMetadata.value.totalCount }))}</div><button class="reset-btn" data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.filter.resetAll"))}</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-3d49863c>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[-->`);
        if (unref(products).length === 0 && unref(allProducts).length === 0) {
          _push(`<div class="empty-state" data-v-3d49863c><i class="pi pi-shopping-bag" data-v-3d49863c></i><p data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.empty.noProducts"))}</p></div>`);
        } else if (unref(products).length === 0 && hasActiveFilters.value) {
          _push(`<div class="empty-state" data-v-3d49863c><i class="pi pi-search" data-v-3d49863c></i><p data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.search.noResults"))}</p><p class="empty-hint" data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.empty.tryAdjusting"))}</p><button class="reset-btn" data-v-3d49863c>${ssrInterpolate(_ctx.$t("product.empty.clearFilters"))}</button></div>`);
        } else {
          _push(`<div class="product-grid" data-v-3d49863c><!--[-->`);
          ssrRenderList(unref(products), (product) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: product.id,
              to: `/products/${product.id}`,
              class: "product-card"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="product-image" data-v-3d49863c${_scopeId}>`);
                  if (product.photos && product.photos.length) {
                    _push2(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${product.photos[0]}`)}${ssrRenderAttr("alt", product.name)} data-v-3d49863c${_scopeId}>`);
                  } else {
                    _push2(`<div class="product-placeholder" data-v-3d49863c${_scopeId}><i class="pi pi-image" data-v-3d49863c${_scopeId}></i></div>`);
                  }
                  if (product.photos && product.photos.length > 1) {
                    _push2(`<span class="photo-count" data-v-3d49863c${_scopeId}><i class="pi pi-images" data-v-3d49863c${_scopeId}></i> ${ssrInterpolate(product.photos.length)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="image-overlay" data-v-3d49863c${_scopeId}><i class="pi pi-search" data-v-3d49863c${_scopeId}></i></div></div><div class="product-body" data-v-3d49863c${_scopeId}><h4 class="product-name" data-v-3d49863c${_scopeId}>${ssrInterpolate(product.name)}</h4>`);
                  if (product.shortdes) {
                    _push2(`<p class="product-shortdes" data-v-3d49863c${_scopeId}>${ssrInterpolate(product.shortdes)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (product.features && product.features.length) {
                    _push2(`<ul class="product-features" data-v-3d49863c${_scopeId}><!--[-->`);
                    ssrRenderList(product.features.slice(0, 3), (feat, i) => {
                      _push2(`<li data-v-3d49863c${_scopeId}>${ssrInterpolate(feat)}</li>`);
                    });
                    _push2(`<!--]--></ul>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (product.price !== void 0 && product.price !== null) {
                    _push2(`<div class="product-price" data-v-3d49863c${_scopeId}>${ssrInterpolate(formatPrice(product.price))}\xA0`);
                    if (product.currency) {
                      _push2(`<small data-v-3d49863c${_scopeId}>${ssrInterpolate(product.currency)}</small>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "product-image",
                      onClick: withModifiers(($event) => openProductLightbox(product), ["prevent", "stop"])
                    }, [
                      product.photos && product.photos.length ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `${unref(photoUrl)}${product.photos[0]}`,
                        alt: product.name
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "product-placeholder"
                      }, [
                        createVNode("i", { class: "pi pi-image" })
                      ])),
                      product.photos && product.photos.length > 1 ? (openBlock(), createBlock("span", {
                        key: 2,
                        class: "photo-count"
                      }, [
                        createVNode("i", { class: "pi pi-images" }),
                        createTextVNode(" " + toDisplayString(product.photos.length), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "image-overlay" }, [
                        createVNode("i", { class: "pi pi-search" })
                      ])
                    ], 8, ["onClick"]),
                    createVNode("div", { class: "product-body" }, [
                      createVNode("h4", { class: "product-name" }, toDisplayString(product.name), 1),
                      product.shortdes ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "product-shortdes"
                      }, toDisplayString(product.shortdes), 1)) : createCommentVNode("", true),
                      product.features && product.features.length ? (openBlock(), createBlock("ul", {
                        key: 1,
                        class: "product-features"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(product.features.slice(0, 3), (feat, i) => {
                          return openBlock(), createBlock("li", { key: i }, toDisplayString(feat), 1);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      product.price !== void 0 && product.price !== null ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "product-price"
                      }, [
                        createTextVNode(toDisplayString(formatPrice(product.price)) + "\xA0", 1),
                        product.currency ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(product.currency), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        }
        if (unref(totalPages) > 1) {
          _push(`<div class="pagination-controls" data-v-3d49863c><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} data-v-3d49863c><i class="pi pi-angle-left" data-v-3d49863c></i></button><span class="pagination-info" data-v-3d49863c>${ssrInterpolate(unref(currentPage))} / ${ssrInterpolate(unref(totalPages))}</span><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} data-v-3d49863c><i class="pi pi-angle-right" data-v-3d49863c></i></button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(ssrRenderComponent(_component_Dialog, {
        visible: unref(showLightbox),
        "onUpdate:visible": ($event) => isRef(showLightbox) ? showLightbox.value = $event : null,
        "show-header": false,
        style: { width: "90vw", maxWidth: "900px" },
        modal: true,
        dismissableMask: true,
        class: "product-lightbox-dialog"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              icon: "pi pi-times",
              rounded: "",
              text: "",
              severity: "danger",
              label: _ctx.$t("product.lightbox.close"),
              onClick: ($event) => showLightbox.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                icon: "pi pi-times",
                rounded: "",
                text: "",
                severity: "danger",
                label: _ctx.$t("product.lightbox.close"),
                onClick: ($event) => showLightbox.value = false
              }, null, 8, ["label", "onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(currentProduct)) {
              _push2(`<div class="lightbox-content" data-v-3d49863c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, mergeProps({
                icon: "pi pi-arrow-left",
                rounded: "",
                text: "",
                severity: "secondary",
                class: "lightbox-nav lightbox-prev",
                onClick: prevPhoto,
                disabled: unref(currentPhotoIndex) === 0
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.$t("product.lightbox.previousPhoto"), void 0, { left: true })), null, _parent2, _scopeId));
              _push2(`<div class="lightbox-image-wrapper" data-v-3d49863c${_scopeId}><img${ssrRenderAttr("src", `${unref(photoUrl)}${unref(currentProduct).photos[unref(currentPhotoIndex)]}`)}${ssrRenderAttr("alt", unref(currentProduct).name)} class="lightbox-image" data-v-3d49863c${_scopeId}><div class="lightbox-info" data-v-3d49863c${_scopeId}><h3 class="lightbox-title" data-v-3d49863c${_scopeId}>${ssrInterpolate(unref(currentProduct).name)}</h3><span class="lightbox-counter" data-v-3d49863c${_scopeId}>${ssrInterpolate(unref(currentPhotoIndex) + 1)} ${ssrInterpolate(_ctx.$t("product.pagination.of"))} ${ssrInterpolate(unref(currentProduct).photos.length)}</span></div></div>`);
              _push2(ssrRenderComponent(_component_Button, mergeProps({
                icon: "pi pi-arrow-right",
                rounded: "",
                text: "",
                severity: "secondary",
                class: "lightbox-nav lightbox-next",
                onClick: nextPhoto,
                disabled: unref(currentPhotoIndex) === unref(currentProduct).photos.length - 1
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.$t("product.lightbox.nextPhoto"), void 0, { right: true })), null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(currentProduct) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "lightbox-content"
              }, [
                withDirectives(createVNode(_component_Button, {
                  icon: "pi pi-arrow-left",
                  rounded: "",
                  text: "",
                  severity: "secondary",
                  class: "lightbox-nav lightbox-prev",
                  onClick: prevPhoto,
                  disabled: unref(currentPhotoIndex) === 0
                }, null, 8, ["disabled"]), [
                  [
                    _directive_tooltip,
                    _ctx.$t("product.lightbox.previousPhoto"),
                    void 0,
                    { left: true }
                  ]
                ]),
                createVNode("div", { class: "lightbox-image-wrapper" }, [
                  createVNode("img", {
                    src: `${unref(photoUrl)}${unref(currentProduct).photos[unref(currentPhotoIndex)]}`,
                    alt: unref(currentProduct).name,
                    class: "lightbox-image",
                    onPointerdown: onLightboxPointerDown,
                    onPointerup: onLightboxPointerUp,
                    onPointercancel: onLightboxPointerUp
                  }, null, 40, ["src", "alt"]),
                  createVNode("div", { class: "lightbox-info" }, [
                    createVNode("h3", { class: "lightbox-title" }, toDisplayString(unref(currentProduct).name), 1),
                    createVNode("span", { class: "lightbox-counter" }, toDisplayString(unref(currentPhotoIndex) + 1) + " " + toDisplayString(_ctx.$t("product.pagination.of")) + " " + toDisplayString(unref(currentProduct).photos.length), 1)
                  ])
                ]),
                withDirectives(createVNode(_component_Button, {
                  icon: "pi pi-arrow-right",
                  rounded: "",
                  text: "",
                  severity: "secondary",
                  class: "lightbox-nav lightbox-next",
                  onClick: nextPhoto,
                  disabled: unref(currentPhotoIndex) === unref(currentProduct).photos.length - 1
                }, null, 8, ["disabled"]), [
                  [
                    _directive_tooltip,
                    _ctx.$t("product.lightbox.nextPhoto"),
                    void 0,
                    { right: true }
                  ]
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/ProductCatalog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3d49863c"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ArticleSection",
  __ssrInlineRender: true,
  props: {
    content: {},
    showTitle: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const smart = computed(() => parseSmartDescription(props.content.description));
    const decodeContentDescription = (content) => {
      if (!content.description || typeof content.description !== "string") {
        return { title: content.title, description: content.description || "" };
      }
      try {
        const parsed = JSON.parse(content.description);
        return {
          title: parsed.title || content.title,
          description: parsed.description || parsed.longdes || parsed.longdescription || content.description
        };
      } catch {
        return { title: content.title, description: content.description };
      }
    };
    const decoded = computed(() => decodeContentDescription(props.content));
    const decodedDescription = computed(() => decoded.value.description);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a;
      const _component_BlockRenderer = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "article-section" }, _attrs))}>`);
      if (__props.content) {
        _push(`<div class="article-container">`);
        if (((_a = smart.value) == null ? void 0 : _a.format) === "tiptap" && smart.value.tiptapDoc) {
          _push(`<div class="article-content">`);
          _push(ssrRenderComponent(_component_BlockRenderer, {
            doc: smart.value.tiptapDoc
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="article-content">${(_a2 = decodedDescription.value) != null ? _a2 : ""}</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/ArticleSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { __nuxt_component_0 as _, __nuxt_component_1 as a, __nuxt_component_2 as b, __nuxt_component_3 as c, __nuxt_component_4 as d, __nuxt_component_5 as e, _sfc_main as f };
//# sourceMappingURL=ArticleSection-iTNk2c-R.mjs.map
