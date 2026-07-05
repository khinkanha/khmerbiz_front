import { _ as __nuxt_component_0$1 } from './nuxt-link-DlwdfiwN.mjs';
import { defineComponent, ref, watch, resolveComponent, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, createTextVNode, isRef, withModifiers, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { p as parseNewsItem } from './useNewsParser-BRh25yln.mjs';
import { _ as _export_sfc, l as useRoute, u as useRouter, b as useRuntimeConfig } from './server.mjs';
import { u as useApi } from './auth-CZZkTxj2.mjs';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
      var _a;
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "news-section" }, _attrs))} data-v-35f48dd1>`);
      if (__props.sectionTitle) {
        _push(`<h2 class="section-title" data-v-35f48dd1>${ssrInterpolate(__props.sectionTitle)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.sectionDescription) {
        _push(`<div class="section-description" data-v-35f48dd1>${(_a = __props.sectionDescription) != null ? _a : ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-35f48dd1>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[-->`);
        if (unref(featureNews).length > 0) {
          _push(`<div class="feature-news" data-v-35f48dd1><!--[-->`);
          ssrRenderList(unref(featureNews), (news) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: "feat-" + news.id,
              to: `/news/${news.news_id || news.id}`,
              class: "feature-card"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="feature-badge" data-v-35f48dd1${_scopeId}>Featured</div><div class="feature-card-image" data-v-35f48dd1${_scopeId}>`);
                  if (news.photo) {
                    _push2(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${news.photo}`)}${ssrRenderAttr("alt", news.title)} data-v-35f48dd1${_scopeId}>`);
                  } else {
                    _push2(`<div class="news-placeholder" data-v-35f48dd1${_scopeId}><i class="pi pi-image" data-v-35f48dd1${_scopeId}></i></div>`);
                  }
                  _push2(`</div><div class="feature-card-body" data-v-35f48dd1${_scopeId}><h4 class="feature-title" data-v-35f48dd1${_scopeId}>${ssrInterpolate(news.title)}</h4>`);
                  if (news.short_description) {
                    _push2(`<p class="feature-excerpt" data-v-35f48dd1${_scopeId}>${ssrInterpolate(news.short_description)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (news.publish_date) {
                    _push2(`<div class="feature-date" data-v-35f48dd1${_scopeId}><i class="pi pi-calendar" data-v-35f48dd1${_scopeId}></i> ${ssrInterpolate(formatDate(news.publish_date))}</div>`);
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
        _push(`<div class="news-grid" data-v-35f48dd1><!--[-->`);
        ssrRenderList(unref(newsItems), (news) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: news.news_id || news.id,
            to: `/news/${news.news_id || news.id}`,
            class: "news-card"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="news-image" data-v-35f48dd1${_scopeId}>`);
                if (news.photo) {
                  _push2(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${news.photo}`)}${ssrRenderAttr("alt", news.title)} data-v-35f48dd1${_scopeId}>`);
                } else {
                  _push2(`<div class="news-placeholder" data-v-35f48dd1${_scopeId}><i class="pi pi-image" data-v-35f48dd1${_scopeId}></i></div>`);
                }
                _push2(`</div><div class="news-content" data-v-35f48dd1${_scopeId}><h4 class="news-title" data-v-35f48dd1${_scopeId}>${ssrInterpolate(news.title)}</h4>`);
                if (news.short_description) {
                  _push2(`<p class="news-excerpt" data-v-35f48dd1${_scopeId}>${ssrInterpolate(news.short_description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (news.publish_date) {
                  _push2(`<div class="news-date" data-v-35f48dd1${_scopeId}><i class="pi pi-calendar" data-v-35f48dd1${_scopeId}></i> ${ssrInterpolate(formatDate(news.publish_date))}</div>`);
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
          _push(`<div class="pagination-controls" data-v-35f48dd1><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""}${ssrRenderAttr("title", _ctx.$t("common.first"))} data-v-35f48dd1><i class="pi pi-angle-double-left" data-v-35f48dd1></i></button><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""}${ssrRenderAttr("title", _ctx.$t("common.previous"))} data-v-35f48dd1><i class="pi pi-angle-left" data-v-35f48dd1></i></button><span class="pagination-info" data-v-35f48dd1>${ssrInterpolate(unref(currentPage))} / ${ssrInterpolate(unref(totalPages))}</span><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""}${ssrRenderAttr("title", _ctx.$t("common.next"))} data-v-35f48dd1><i class="pi pi-angle-right" data-v-35f48dd1></i></button><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""}${ssrRenderAttr("title", _ctx.$t("common.last"))} data-v-35f48dd1><i class="pi pi-angle-double-right" data-v-35f48dd1></i></button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      if (__props.showMoreLink) {
        _push(`<div class="section-footer" data-v-35f48dd1>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: __props.moreLink,
          class: "view-more-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("contentManager.view"))} ${ssrInterpolate(_ctx.$t("common.more"))} <i class="pi pi-arrow-right" data-v-35f48dd1${_scopeId}></i>`);
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/NewsSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-35f48dd1"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/PhotoGallery.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-5d58d689"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "VideoSection",
  __ssrInlineRender: true,
  props: {
    items: {},
    sectionTitle: { default: "" },
    sectionDescription: { default: "" }
  },
  setup(__props) {
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
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "video-section" }, _attrs))} data-v-74e77cf8>`);
      if (__props.sectionTitle) {
        _push(`<h2 class="section-title" data-v-74e77cf8>${ssrInterpolate(__props.sectionTitle)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.sectionDescription) {
        _push(`<div class="section-description" data-v-74e77cf8>${(_a = __props.sectionDescription) != null ? _a : ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="video-grid" data-v-74e77cf8><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        var _a2;
        _push(`<div class="video-item" data-v-74e77cf8><div class="video-wrapper" data-v-74e77cf8>`);
        if (item.url && getEmbedUrl(item.url)) {
          _push(`<iframe${ssrRenderAttr("src", (_a2 = getEmbedUrl(item.url)) != null ? _a2 : void 0)}${ssrRenderAttr("title", item.title)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-v-74e77cf8></iframe>`);
        } else {
          _push(`<div class="video-placeholder" data-v-74e77cf8><i class="pi pi-video" data-v-74e77cf8></i><p data-v-74e77cf8>Invalid video URL</p></div>`);
        }
        _push(`</div>`);
        if (item.title) {
          _push(`<div class="video-caption" data-v-74e77cf8><h3 data-v-74e77cf8>${ssrInterpolate(item.title)}</h3>`);
          if (item.description) {
            _push(`<p class="video-description" data-v-74e77cf8>${ssrInterpolate(item.description)}</p>`);
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/VideoSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-74e77cf8"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/MapDisplay.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-603b3917"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/content/DocumentSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-883a5a13"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ArticleSection",
  __ssrInlineRender: true,
  props: {
    content: {},
    showTitle: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
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
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "article-section" }, _attrs))} data-v-9264e7c7>`);
      if (__props.content) {
        _push(`<div class="article-container" data-v-9264e7c7><div class="article-content" data-v-9264e7c7>${(_a = unref(decodedDescription)) != null ? _a : ""}</div></div>`);
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
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9264e7c7"]]);

export { __nuxt_component_0 as _, __nuxt_component_1 as a, __nuxt_component_2 as b, __nuxt_component_3 as c, __nuxt_component_4 as d, __nuxt_component_5 as e };
//# sourceMappingURL=ArticleSection-UfwyFBkb.mjs.map
