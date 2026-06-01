import { defineComponent, computed, ref, watch, resolveComponent, unref, createVNode, resolveDynamicComponent, mergeProps, withCtx, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderVNode, ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useDomainStore } from './domain-D7lCra9Q.mjs';
import { _ as _export_sfc, b as useRuntimeConfig } from './server.mjs';
import { _ as __nuxt_component_0$2, a as __nuxt_component_1, b as __nuxt_component_2, c as __nuxt_component_3, d as __nuxt_component_4, e as __nuxt_component_5 } from './ArticleSection-CRiqqHLR.mjs';
import { C as ContentType } from './content-BKhKEcUD.mjs';
import { g as getSocialIcon } from './setting-v72qPBnu.mjs';
import { u as useApi } from './useApi-C5-eJazW.mjs';
import { u as useHead } from './index-CrXeyONu.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@primeuix/themes/aura/accordion';
import '@primeuix/themes/aura/autocomplete';
import '@primeuix/themes/aura/avatar';
import '@primeuix/themes/aura/badge';
import '@primeuix/themes/aura/base';
import '@primeuix/themes/aura/blockui';
import '@primeuix/themes/aura/breadcrumb';
import '@primeuix/themes/aura/button';
import '@primeuix/themes/aura/card';
import '@primeuix/themes/aura/carousel';
import '@primeuix/themes/aura/cascadeselect';
import '@primeuix/themes/aura/checkbox';
import '@primeuix/themes/aura/chip';
import '@primeuix/themes/aura/colorpicker';
import '@primeuix/themes/aura/confirmdialog';
import '@primeuix/themes/aura/confirmpopup';
import '@primeuix/themes/aura/contextmenu';
import '@primeuix/themes/aura/datatable';
import '@primeuix/themes/aura/dataview';
import '@primeuix/themes/aura/datepicker';
import '@primeuix/themes/aura/dialog';
import '@primeuix/themes/aura/divider';
import '@primeuix/themes/aura/dock';
import '@primeuix/themes/aura/drawer';
import '@primeuix/themes/aura/editor';
import '@primeuix/themes/aura/fieldset';
import '@primeuix/themes/aura/fileupload';
import '@primeuix/themes/aura/floatlabel';
import '@primeuix/themes/aura/galleria';
import '@primeuix/themes/aura/iconfield';
import '@primeuix/themes/aura/iftalabel';
import '@primeuix/themes/aura/image';
import '@primeuix/themes/aura/imagecompare';
import '@primeuix/themes/aura/inlinemessage';
import '@primeuix/themes/aura/inplace';
import '@primeuix/themes/aura/inputchips';
import '@primeuix/themes/aura/inputgroup';
import '@primeuix/themes/aura/inputnumber';
import '@primeuix/themes/aura/inputotp';
import '@primeuix/themes/aura/inputtext';
import '@primeuix/themes/aura/knob';
import '@primeuix/themes/aura/listbox';
import '@primeuix/themes/aura/megamenu';
import '@primeuix/themes/aura/menu';
import '@primeuix/themes/aura/menubar';
import '@primeuix/themes/aura/message';
import '@primeuix/themes/aura/metergroup';
import '@primeuix/themes/aura/multiselect';
import '@primeuix/themes/aura/orderlist';
import '@primeuix/themes/aura/organizationchart';
import '@primeuix/themes/aura/overlaybadge';
import '@primeuix/themes/aura/paginator';
import '@primeuix/themes/aura/panel';
import '@primeuix/themes/aura/panelmenu';
import '@primeuix/themes/aura/password';
import '@primeuix/themes/aura/picklist';
import '@primeuix/themes/aura/popover';
import '@primeuix/themes/aura/progressbar';
import '@primeuix/themes/aura/progressspinner';
import '@primeuix/themes/aura/radiobutton';
import '@primeuix/themes/aura/rating';
import '@primeuix/themes/aura/ripple';
import '@primeuix/themes/aura/scrollpanel';
import '@primeuix/themes/aura/select';
import '@primeuix/themes/aura/selectbutton';
import '@primeuix/themes/aura/skeleton';
import '@primeuix/themes/aura/slider';
import '@primeuix/themes/aura/speeddial';
import '@primeuix/themes/aura/splitbutton';
import '@primeuix/themes/aura/splitter';
import '@primeuix/themes/aura/stepper';
import '@primeuix/themes/aura/steps';
import '@primeuix/themes/aura/tabmenu';
import '@primeuix/themes/aura/tabs';
import '@primeuix/themes/aura/tabview';
import '@primeuix/themes/aura/tag';
import '@primeuix/themes/aura/terminal';
import '@primeuix/themes/aura/textarea';
import '@primeuix/themes/aura/tieredmenu';
import '@primeuix/themes/aura/timeline';
import '@primeuix/themes/aura/toast';
import '@primeuix/themes/aura/togglebutton';
import '@primeuix/themes/aura/toggleswitch';
import '@primeuix/themes/aura/toolbar';
import '@primeuix/themes/aura/tooltip';
import '@primeuix/themes/aura/tree';
import '@primeuix/themes/aura/treeselect';
import '@primeuix/themes/aura/treetable';
import '@primeuix/themes/aura/virtualscroller';
import '@primeuix/utils/eventbus';
import '@primeuix/utils';
import '@primeuix/utils/object';
import '@primeuix/styled';
import '@primeuix/utils/dom';
import '@primeuix/styles/base';
import '@primeuix/styles/badge';
import '@primeuix/utils/uuid';
import '@primeuix/styles/ripple';
import '@primeuix/styles/button';
import '@primeuix/utils/zindex';
import '@primeuix/styles/inputtext';
import '@primeuix/styles/datepicker';
import '@primeuix/styles/card';
import '@primeuix/styles/carousel';
import '@primeuix/styles/checkbox';
import '@primeuix/styles/dialog';
import '@primeuix/styles/confirmdialog';
import '@primeuix/styles/paginator';
import '@primeuix/styles/iconfield';
import '@primeuix/styles/virtualscroller';
import '@primeuix/styles/select';
import '@primeuix/styles/inputnumber';
import '@primeuix/styles/datatable';
import '@primeuix/styles/radiobutton';
import '@primeuix/styles/editor';
import '@primeuix/styles/message';
import '@primeuix/styles/progressbar';
import '@primeuix/styles/fileupload';
import '@primeuix/styles/menu';
import '@primeuix/styles/password';
import '@primeuix/styles/progressspinner';
import '@primeuix/styles/slider';
import '@primeuix/styles/tag';
import '@primeuix/styles/textarea';
import '@primeuix/styles/toast';
import '@primeuix/styles/toggleswitch';
import './nuxt-link-DlwdfiwN.mjs';
import '@vue-leaflet/vue-leaflet';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "BannerSlideshow",
  __ssrInlineRender: true,
  props: {
    banners: {}
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Carousel = resolveComponent("Carousel");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-slideshow" }, _attrs))} data-v-7ea04ce3>`);
      _push(ssrRenderComponent(_component_Carousel, {
        value: __props.banners,
        numVisible: 1,
        numScroll: 1,
        circular: true,
        autoplayInterval: 5e3,
        class: "banner-carousel"
      }, {
        item: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="banner-slide" data-v-7ea04ce3${_scopeId}>`);
            if (data.link) {
              _push2(`<a${ssrRenderAttr("href", data.link)} target="_blank" rel="noopener noreferrer" class="banner-link" data-v-7ea04ce3${_scopeId}>`);
              if (data.image) {
                _push2(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${data.image}`)}${ssrRenderAttr("alt", data.title || "Banner")} class="banner-image" data-v-7ea04ce3${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</a>`);
            } else if (data.image) {
              _push2(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${data.image}`)}${ssrRenderAttr("alt", data.title || "Banner")} class="banner-image" data-v-7ea04ce3${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (data.title) {
              _push2(`<div class="banner-caption" data-v-7ea04ce3${_scopeId}><h2 data-v-7ea04ce3${_scopeId}>${ssrInterpolate(data.title)}</h2></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "banner-slide" }, [
                data.link ? (openBlock(), createBlock("a", {
                  key: 0,
                  href: data.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  class: "banner-link"
                }, [
                  data.image ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: `${unref(photoUrl)}${data.image}`,
                    alt: data.title || "Banner",
                    class: "banner-image"
                  }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                ], 8, ["href"])) : data.image ? (openBlock(), createBlock("img", {
                  key: 1,
                  src: `${unref(photoUrl)}${data.image}`,
                  alt: data.title || "Banner",
                  class: "banner-image"
                }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                data.title ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "banner-caption"
                }, [
                  createVNode("h2", null, toDisplayString(data.title), 1)
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/BannerSlideshow.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-7ea04ce3"]]);
const itemsPerPage = 10;
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ClassicMultiPage",
  __ssrInlineRender: true,
  props: {
    menuTree: {},
    contentSections: {},
    banners: {},
    settings: {},
    domain: {},
    socialMedia: {},
    language: {}
  },
  setup(__props) {
    const props = __props;
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl;
    useApi();
    const loading = ref(false);
    const currentPage = ref(1);
    const featuredNews = ref([]);
    computed(
      () => props.contentSections.filter((cs) => cs.content.content_type === ContentType.NEWS).map((cs) => cs.content.content_id)
    );
    const totalPages = computed(() => Math.ceil(featuredNews.value.length / itemsPerPage));
    const paginatedNews = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return featuredNews.value.slice(start, start + itemsPerPage);
    });
    const visiblePages = computed(() => {
      const pages = [];
      const total = totalPages.value;
      const current = currentPage.value;
      let start = Math.max(1, current - 2);
      const end = Math.min(total, start + 4);
      start = Math.max(1, end - 4);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });
    watch(totalPages, (val) => {
      if (currentPage.value > val) currentPage.value = Math.max(1, val);
    });
    const getContentForMenuItem = (menuItemId) => {
      return props.contentSections.find((cs) => cs.content.menu_id === menuItemId);
    };
    const getContentType = (menuItemId) => {
      const section = getContentForMenuItem(menuItemId);
      return section == null ? void 0 : section.content.content_type;
    };
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };
    const parseMapData = (content) => {
      try {
        return JSON.parse(content.description || "{}");
      } catch {
        return {};
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BannerSlideshow = __nuxt_component_0$1;
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_NewsSection = __nuxt_component_0$2;
      const _component_PhotoGallery = __nuxt_component_1;
      const _component_VideoSection = __nuxt_component_2;
      const _component_MapDisplay = __nuxt_component_3;
      const _component_DocumentSection = __nuxt_component_4;
      const _component_ArticleSection = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "classic-multi-page" }, _attrs))} data-v-db762f65>`);
      if (__props.banners.length > 0) {
        _push(ssrRenderComponent(_component_BannerSlideshow, { banners: __props.banners }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="main-content" data-v-db762f65><div class="container" data-v-db762f65>`);
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-db762f65>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent));
        _push(`<p data-v-db762f65>${ssrInterpolate(_ctx.$t("common.loading"))}</p></div>`);
      } else {
        _push(`<!--[-->`);
        if (unref(featuredNews).length > 0) {
          _push(`<section class="section news-section" data-v-db762f65>`);
          if (unref(paginatedNews).length > 0) {
            _push(`<div class="featured-grid" data-v-db762f65><!--[-->`);
            ssrRenderList(unref(paginatedNews).slice(0, 2), (news) => {
              _push(`<a href="#" class="featured-card" data-v-db762f65><div class="featured-card-img" data-v-db762f65>`);
              if (news.photo) {
                _push(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${news.photo}`)}${ssrRenderAttr("alt", news.title)} data-v-db762f65>`);
              } else {
                _push(`<div class="img-placeholder" data-v-db762f65><i class="pi pi-image" data-v-db762f65></i></div>`);
              }
              _push(`</div><div class="featured-card-body" data-v-db762f65><h4 class="media-heading" data-v-db762f65><a href="#" data-v-db762f65>${ssrInterpolate(news.title)}</a></h4>`);
              if (news.short_description) {
                _push(`<p class="featured-excerpt" data-v-db762f65>${ssrInterpolate(news.short_description)}</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<p class="date" data-v-db762f65><i class="fa fa-clock-o" data-v-db762f65></i> ${ssrInterpolate(formatDate(news.publish_date))}</p></div></a>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(paginatedNews).length > 2) {
            _push(`<div class="news-media-list" data-v-db762f65><!--[-->`);
            ssrRenderList(unref(paginatedNews).slice(2), (news, index2) => {
              _push(`<!--[--><div class="news-media-item" data-v-db762f65><div class="media-left" data-v-db762f65><a href="#" data-v-db762f65>`);
              if (news.photo) {
                _push(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${news.photo}`)}${ssrRenderAttr("alt", news.title)} data-v-db762f65>`);
              } else {
                _push(`<div class="img-placeholder small" data-v-db762f65><i class="pi pi-image" data-v-db762f65></i></div>`);
              }
              _push(`</a></div><div class="media-body" data-v-db762f65><h4 class="media-heading" data-v-db762f65><a href="#" data-v-db762f65>${ssrInterpolate(news.title)}</a></h4>`);
              if (news.short_description) {
                _push(`<p class="media-excerpt" data-v-db762f65>${ssrInterpolate(news.short_description)}</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<p class="date" data-v-db762f65><i class="fa fa-clock-o" data-v-db762f65></i> ${ssrInterpolate(formatDate(news.publish_date))}</p></div></div>`);
              if (index2 < unref(paginatedNews).slice(2).length - 1) {
                _push(`<hr class="news-separator" data-v-db762f65>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--]-->`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(totalPages) > 1) {
            _push(`<div class="pagination-wrap" data-v-db762f65><ul class="pagination-list" data-v-db762f65><li class="${ssrRenderClass([{ disabled: unref(currentPage) === 1 }, "page-item"])}" data-v-db762f65><button class="page-link"${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} data-v-db762f65> \xAB </button></li><li class="${ssrRenderClass([{ disabled: unref(currentPage) === 1 }, "page-item"])}" data-v-db762f65><button class="page-link"${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} data-v-db762f65> \u2039 </button></li><!--[-->`);
            ssrRenderList(unref(visiblePages), (page) => {
              _push(`<li class="${ssrRenderClass([{ active: page === unref(currentPage) }, "page-item"])}" data-v-db762f65><button class="page-link" data-v-db762f65>${ssrInterpolate(page)}</button></li>`);
            });
            _push(`<!--]--><li class="${ssrRenderClass([{ disabled: unref(currentPage) === unref(totalPages) }, "page-item"])}" data-v-db762f65><button class="page-link"${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} data-v-db762f65> \u203A </button></li><li class="${ssrRenderClass([{ disabled: unref(currentPage) === unref(totalPages) }, "page-item"])}" data-v-db762f65><button class="page-link"${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} data-v-db762f65> \xBB </button></li></ul></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(__props.menuTree, (menuItem) => {
          _push(`<!--[-->`);
          if (menuItem.children && menuItem.children.length > 0 && menuItem.children.some((child) => getContentForMenuItem(child.item_id))) {
            _push(`<section class="section"${ssrRenderAttr("id", `section-${menuItem.item_id}`)} data-v-db762f65><!--[-->`);
            ssrRenderList(menuItem.children, (child) => {
              _push(`<div${ssrRenderAttr("id", `section-${child.item_id}`)} class="sub-section" data-v-db762f65>`);
              if (getContentForMenuItem(child.item_id)) {
                _push(`<!--[-->`);
                if (getContentType(child.item_id) === unref(ContentType).NEWS) {
                  _push(ssrRenderComponent(_component_NewsSection, {
                    "domain-id": __props.domain.domain_id,
                    "content-id": getContentForMenuItem(child.item_id).content.content_id,
                    "section-title": child.item_name || ""
                  }, null, _parent));
                } else if (getContentType(child.item_id) === unref(ContentType).PHOTO) {
                  _push(ssrRenderComponent(_component_PhotoGallery, {
                    items: getContentForMenuItem(child.item_id).items,
                    "section-title": child.item_name || ""
                  }, null, _parent));
                } else if (getContentType(child.item_id) === unref(ContentType).VIDEO) {
                  _push(ssrRenderComponent(_component_VideoSection, {
                    items: getContentForMenuItem(child.item_id).items,
                    "section-title": child.item_name || ""
                  }, null, _parent));
                } else if (getContentType(child.item_id) === unref(ContentType).MAP) {
                  _push(ssrRenderComponent(_component_MapDisplay, {
                    "map-data": parseMapData(getContentForMenuItem(child.item_id).content),
                    "section-title": child.item_name || ""
                  }, null, _parent));
                } else if (getContentType(child.item_id) === unref(ContentType).DOCUMENT) {
                  _push(ssrRenderComponent(_component_DocumentSection, {
                    items: getContentForMenuItem(child.item_id).items,
                    "section-title": child.item_name || ""
                  }, null, _parent));
                } else {
                  _push(ssrRenderComponent(_component_ArticleSection, {
                    content: getContentForMenuItem(child.item_id).content,
                    "show-title": true
                  }, null, _parent));
                }
                _push(`<!--]-->`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            });
            _push(`<!--]--></section>`);
          } else if (getContentForMenuItem(menuItem.item_id)) {
            _push(`<section class="section"${ssrRenderAttr("id", `section-${menuItem.item_id}`)} data-v-db762f65>`);
            if (getContentForMenuItem(menuItem.item_id)) {
              _push(`<!--[-->`);
              if (getContentType(menuItem.item_id) === unref(ContentType).NEWS) {
                _push(ssrRenderComponent(_component_NewsSection, {
                  "domain-id": __props.domain.domain_id,
                  "content-id": getContentForMenuItem(menuItem.item_id).content.content_id
                }, null, _parent));
              } else if (getContentType(menuItem.item_id) === unref(ContentType).PHOTO) {
                _push(ssrRenderComponent(_component_PhotoGallery, {
                  items: getContentForMenuItem(menuItem.item_id).items
                }, null, _parent));
              } else if (getContentType(menuItem.item_id) === unref(ContentType).VIDEO) {
                _push(ssrRenderComponent(_component_VideoSection, {
                  items: getContentForMenuItem(menuItem.item_id).items
                }, null, _parent));
              } else if (getContentType(menuItem.item_id) === unref(ContentType).MAP) {
                _push(ssrRenderComponent(_component_MapDisplay, {
                  "map-data": parseMapData(getContentForMenuItem(menuItem.item_id).content)
                }, null, _parent));
              } else if (getContentType(menuItem.item_id) === unref(ContentType).DOCUMENT) {
                _push(ssrRenderComponent(_component_DocumentSection, {
                  items: getContentForMenuItem(menuItem.item_id).items
                }, null, _parent));
              } else {
                _push(ssrRenderComponent(_component_ArticleSection, {
                  content: getContentForMenuItem(menuItem.item_id).content
                }, null, _parent));
              }
              _push(`<!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`</section>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]-->`);
        if (__props.socialMedia.length > 0) {
          _push(`<section class="section social-section" data-v-db762f65><div class="social-links-center" data-v-db762f65><!--[-->`);
          ssrRenderList(__props.socialMedia, (social) => {
            _push(`<a${ssrRenderAttr("href", social.link)} target="_blank" rel="noopener noreferrer" class="social-icon-link" data-v-db762f65><i class="${ssrRenderClass(unref(getSocialIcon)(social.stype))}" data-v-db762f65></i></a>`);
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/themes/ClassicMultiPage.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ClassicMultiPage = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-db762f65"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ContentRenderer",
  __ssrInlineRender: true,
  props: {
    content: {},
    domainId: {},
    showTitle: { type: Boolean, default: true },
    compact: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const domainStore = useDomainStore();
    const isClassicTemplate = computed(() => {
      var _a;
      return ((_a = domainStore.settings) == null ? void 0 : _a.page_style) === 0;
    });
    const isContentSection = (val) => {
      return val != null && "content" in val && "items" in val;
    };
    const content = computed(() => {
      if (isContentSection(props.content)) {
        return props.content.content;
      }
      return props.content;
    });
    const items = computed(() => {
      var _a;
      if (isContentSection(props.content)) {
        return props.content.items || [];
      }
      return ((_a = props.content) == null ? void 0 : _a.items) || [];
    });
    const mapData = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ArticleSection = __nuxt_component_5;
      const _component_PhotoGallery = __nuxt_component_1;
      const _component_VideoSection = __nuxt_component_2;
      const _component_DocumentSection = __nuxt_component_4;
      const _component_NewsSection = __nuxt_component_0$2;
      const _component_MapDisplay = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-renderer" }, _attrs))} data-v-0aa0374d>`);
      if (unref(content) && unref(content).content_type === unref(ContentType).ARTICLE) {
        _push(ssrRenderComponent(_component_ArticleSection, {
          content: unref(content),
          "show-title": __props.showTitle
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).PHOTO) {
        _push(ssrRenderComponent(_component_PhotoGallery, {
          items: unref(items),
          "section-title": __props.showTitle ? unref(content).title : ""
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).VIDEO) {
        _push(ssrRenderComponent(_component_VideoSection, {
          items: unref(items),
          "section-title": __props.showTitle ? unref(content).title : ""
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).DOCUMENT) {
        _push(ssrRenderComponent(_component_DocumentSection, {
          items: unref(items),
          "section-title": __props.showTitle ? unref(content).title : ""
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).NEWS && unref(isClassicTemplate)) {
        _push(ssrRenderComponent(_component_NewsSection, {
          "domain-id": __props.domainId,
          "content-id": unref(content).content_id,
          "section-title": __props.showTitle ? unref(content).title : "",
          "show-more-link": true
        }, null, _parent));
      } else if (unref(content) && unref(content).content_type === unref(ContentType).MAP) {
        _push(ssrRenderComponent(_component_MapDisplay, {
          "map-data": unref(mapData) || {},
          "section-title": __props.showTitle ? unref(content).title : ""
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/ContentRenderer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-0aa0374d"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ScrollingSinglePage",
  __ssrInlineRender: true,
  props: {
    menuTree: {},
    contentSections: {},
    banners: {},
    settings: {},
    domain: {},
    socialMedia: {},
    language: {}
  },
  setup(__props) {
    const props = __props;
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl;
    const heroBanner = computed(() => props.banners[0] || null);
    const showBackToTop = ref(false);
    const getContentForMenuItem = (menuItemId) => {
      return props.contentSections.find((cs) => cs.content.menu_id === menuItemId) || null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "scrolling-single-page" }, _attrs))} data-v-c2b98c96>`);
      if (unref(heroBanner) || __props.settings.background) {
        _push(`<section class="hero-section" data-v-c2b98c96><div class="hero-background" style="${ssrRenderStyle({ backgroundImage: unref(heroBanner) ? `url(${unref(photoUrl)}${unref(heroBanner).photo})` : __props.settings.background ? `url(${__props.settings.background})` : "" })}" data-v-c2b98c96></div><div class="hero-overlay" data-v-c2b98c96></div><div class="hero-content" data-v-c2b98c96><h1 class="hero-title" data-v-c2b98c96>${ssrInterpolate(__props.settings.title || __props.settings.domain_name)}</h1>`);
        if (__props.settings.company_desc) {
          _push(`<p class="hero-subtitle" data-v-c2b98c96>${ssrInterpolate(__props.settings.company_desc)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<nav class="anchor-nav" data-v-c2b98c96><!--[-->`);
        ssrRenderList(__props.menuTree, (menuItem) => {
          _push(`<a${ssrRenderAttr("href", `#section-${menuItem.item_id}`)} class="anchor-link" data-v-c2b98c96>${ssrInterpolate(menuItem.item_name)}</a>`);
        });
        _push(`<!--]--></nav></div><div class="scroll-indicator" data-v-c2b98c96><span data-v-c2b98c96>Scroll</span><i class="pi pi-chevron-down" data-v-c2b98c96></i></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="main-content" data-v-c2b98c96><!--[-->`);
      ssrRenderList(__props.menuTree, (menuItem, index2) => {
        _push(`<div class="${ssrRenderClass([{ "section-left": index2 % 2 === 0, "section-right": index2 % 2 === 1 }, "content-section-wrapper"])}"${ssrRenderAttr("id", `section-${menuItem.item_id}`)} data-v-c2b98c96><div class="section-inner" data-v-c2b98c96><span class="section-number" data-v-c2b98c96>${ssrInterpolate(String(index2 + 1).padStart(2, "0"))}</span><div class="${ssrRenderClass([{ "content-push-right": index2 % 2 === 1 }, "section-content"])}" data-v-c2b98c96><div class="section-header" data-v-c2b98c96><div class="section-line" data-v-c2b98c96></div><h2 class="section-title" data-v-c2b98c96>${ssrInterpolate(menuItem.item_name)}</h2></div>`);
        if (menuItem.children && menuItem.children.length > 0) {
          _push(`<div class="submenu-grid" data-v-c2b98c96><!--[-->`);
          ssrRenderList(menuItem.children, (child) => {
            _push(`<div class="submenu-card"${ssrRenderAttr("id", `subsection-${child.item_id}`)} data-v-c2b98c96>`);
            _push(ssrRenderComponent(_component_ContentRenderer, {
              content: getContentForMenuItem(child.item_id),
              "domain-id": __props.domain.domain_id
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="single-content" data-v-c2b98c96>`);
          _push(ssrRenderComponent(_component_ContentRenderer, {
            content: getContentForMenuItem(menuItem.item_id),
            "domain-id": __props.domain.domain_id
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div></div>`);
        if (index2 < __props.menuTree.length - 1) {
          _push(`<div class="section-divider" data-v-c2b98c96><span data-v-c2b98c96></span><span data-v-c2b98c96></span><span data-v-c2b98c96></span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></main>`);
      if (__props.socialMedia.length > 0) {
        _push(`<section class="social-footer" data-v-c2b98c96><div class="social-inner" data-v-c2b98c96><!--[-->`);
        ssrRenderList(__props.socialMedia, (social) => {
          _push(`<a${ssrRenderAttr("href", social.link)} target="_blank" rel="noopener noreferrer" class="social-icon-link" data-v-c2b98c96><i class="${ssrRenderClass(unref(getSocialIcon)(social.stype))}" data-v-c2b98c96></i></a>`);
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showBackToTop)) {
        _push(`<button class="back-to-top" data-v-c2b98c96><i class="pi pi-arrow-up" data-v-c2b98c96></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/themes/ScrollingSinglePage.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ScrollingSinglePage = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c2b98c96"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MagazineGrid",
  __ssrInlineRender: true,
  props: {
    menuTree: {},
    contentSections: {},
    banners: {},
    settings: {},
    domain: {},
    socialMedia: {},
    language: {}
  },
  setup(__props) {
    const props = __props;
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl;
    const getContentForMenuItem = (menuItemId) => {
      return props.contentSections.find((cs) => cs.content.menu_id === menuItemId) || null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "magazine-grid" }, _attrs))} data-v-82f3ed1e>`);
      if (__props.settings) {
        _push(`<section class="banner-bar" data-v-82f3ed1e><div class="banner-bar-inner" data-v-82f3ed1e><div class="banner-bar-text" data-v-82f3ed1e><h1 class="site-title" data-v-82f3ed1e>${ssrInterpolate(__props.settings.title || __props.settings.domain_name)}</h1>`);
        if (__props.settings.company_desc) {
          _push(`<p class="site-desc" data-v-82f3ed1e>${ssrInterpolate(__props.settings.company_desc)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (__props.banners.length > 0) {
          _push(`<div class="${ssrRenderClass([{ "multi": __props.banners.length > 1 }, "banner-grid"])}" data-v-82f3ed1e><!--[-->`);
          ssrRenderList(__props.banners.slice(0, 3), (banner, i) => {
            _push(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${banner.image}`)}${ssrRenderAttr("alt", banner.title)} class="${ssrRenderClass([{ "span-2": __props.banners.length === 2 && i === 0 }, "banner-img"])}" data-v-82f3ed1e>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="main-content" data-v-82f3ed1e><div class="content-layout" data-v-82f3ed1e><div class="content-main" data-v-82f3ed1e><!--[-->`);
      ssrRenderList(__props.menuTree, (menuItem, index2) => {
        _push(`<div class="magazine-section"${ssrRenderAttr("id", `section-${menuItem.item_id}`)} data-v-82f3ed1e><div class="section-header" data-v-82f3ed1e><h2 class="section-title" data-v-82f3ed1e>${ssrInterpolate(menuItem.item_name)}</h2><span class="section-tag" data-v-82f3ed1e>${ssrInterpolate(menuItem.item_name)}</span></div>`);
        if (menuItem.children && menuItem.children.length > 0) {
          _push(`<div class="editorial-grid" data-v-82f3ed1e><!--[-->`);
          ssrRenderList(menuItem.children, (child, ci) => {
            _push(`<div class="${ssrRenderClass([{ "card-wide": ci === 0 }, "editorial-card"])}"${ssrRenderAttr("id", `subsection-${child.item_id}`)} data-v-82f3ed1e>`);
            _push(ssrRenderComponent(_component_ContentRenderer, {
              content: getContentForMenuItem(child.item_id),
              "domain-id": __props.domain.domain_id
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="section-body" data-v-82f3ed1e>`);
          _push(ssrRenderComponent(_component_ContentRenderer, {
            content: getContentForMenuItem(menuItem.item_id),
            "domain-id": __props.domain.domain_id
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><aside class="content-sidebar" data-v-82f3ed1e><div class="sidebar-card" data-v-82f3ed1e><h3 class="sidebar-title" data-v-82f3ed1e>Sections</h3><ul class="sidebar-nav" data-v-82f3ed1e><!--[-->`);
      ssrRenderList(__props.menuTree, (item) => {
        _push(`<li data-v-82f3ed1e><a${ssrRenderAttr("href", `#section-${item.item_id}`)} data-v-82f3ed1e>${ssrInterpolate(item.item_name)}</a></li>`);
      });
      _push(`<!--]--></ul></div>`);
      if (__props.socialMedia && __props.socialMedia.length > 0) {
        _push(`<div class="sidebar-card" data-v-82f3ed1e><h3 class="sidebar-title" data-v-82f3ed1e>Follow Us</h3><div class="sidebar-social" data-v-82f3ed1e><!--[-->`);
        ssrRenderList(__props.socialMedia, (social) => {
          _push(`<a${ssrRenderAttr("href", social.link)} target="_blank" rel="noopener noreferrer" class="social-btn" data-v-82f3ed1e><i class="${ssrRenderClass(unref(getSocialIcon)(social.stype))}" data-v-82f3ed1e></i></a>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.settings) {
        _push(`<div class="sidebar-card" data-v-82f3ed1e><h3 class="sidebar-title" data-v-82f3ed1e>Contact</h3><div class="sidebar-contact" data-v-82f3ed1e>`);
        if (__props.domain.company_name) {
          _push(`<p data-v-82f3ed1e>${ssrInterpolate(__props.domain.company_name)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.domain.phone_number) {
          _push(`<p data-v-82f3ed1e><i class="pi pi-phone" data-v-82f3ed1e></i> ${ssrInterpolate(__props.domain.phone_number)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.domain.email) {
          _push(`<p data-v-82f3ed1e><i class="pi pi-envelope" data-v-82f3ed1e></i> ${ssrInterpolate(__props.domain.email)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</aside></div></main></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/themes/MagazineGrid.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MagazineGrid = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-82f3ed1e"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FullscreenHero",
  __ssrInlineRender: true,
  props: {
    menuTree: {},
    contentSections: {},
    banners: {},
    settings: {},
    domain: {},
    socialMedia: {},
    language: {}
  },
  setup(__props) {
    const props = __props;
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl;
    const heroBanner = computed(() => props.banners[0] || null);
    const activeSection = ref(null);
    const showBackToTop = ref(false);
    const getContentForMenuItem = (menuItemId) => {
      return props.contentSections.find((cs) => cs.content.menu_id === menuItemId) || null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fullscreen-hero" }, _attrs))} data-v-c6a477e5><section class="hero-section" data-v-c6a477e5><div class="hero-background" style="${ssrRenderStyle({ backgroundImage: unref(heroBanner) ? `url(${unref(photoUrl)}${unref(heroBanner).photo})` : "" })}" data-v-c6a477e5></div><div class="hero-overlay" data-v-c6a477e5></div><div class="hero-content" data-v-c6a477e5><div class="hero-badge" data-v-c6a477e5>${ssrInterpolate(__props.settings.domain_name || "")}</div><h1 class="hero-title" data-v-c6a477e5>${ssrInterpolate(__props.settings.title || __props.settings.domain_name)}</h1>`);
      if (__props.settings.company_desc) {
        _push(`<p class="hero-subtitle" data-v-c6a477e5>${ssrInterpolate(__props.settings.company_desc)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="hero-cta" data-v-c6a477e5> Discover <i class="pi pi-arrow-down" data-v-c6a477e5></i></button></div><div class="scroll-hint" data-v-c6a477e5><div class="scroll-line" data-v-c6a477e5></div></div></section><div class="panels-container" data-v-c6a477e5><!--[-->`);
      ssrRenderList(__props.menuTree, (menuItem, index2) => {
        _push(`<section class="${ssrRenderClass([{ "panel-dark": index2 % 2 === 1 }, "panel"])}"${ssrRenderAttr("id", `section-${menuItem.item_id}`)} data-v-c6a477e5><div class="panel-inner" data-v-c6a477e5><div class="panel-label" data-v-c6a477e5><span class="label-line" data-v-c6a477e5></span><span class="label-text" data-v-c6a477e5>Section ${ssrInterpolate(index2 + 1)}</span></div><h2 class="panel-title" data-v-c6a477e5>${ssrInterpolate(menuItem.item_name)}</h2>`);
        if (menuItem.children && menuItem.children.length > 0) {
          _push(`<div class="panel-grid" data-v-c6a477e5><!--[-->`);
          ssrRenderList(menuItem.children, (child) => {
            _push(`<div class="panel-card"${ssrRenderAttr("id", `subsection-${child.item_id}`)} data-v-c6a477e5>`);
            _push(ssrRenderComponent(_component_ContentRenderer, {
              content: getContentForMenuItem(child.item_id),
              "domain-id": __props.domain.domain_id
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="panel-body" data-v-c6a477e5>`);
          _push(ssrRenderComponent(_component_ContentRenderer, {
            content: getContentForMenuItem(menuItem.item_id),
            "domain-id": __props.domain.domain_id
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div></section>`);
      });
      _push(`<!--]--></div><div class="nav-dots" data-v-c6a477e5><!--[-->`);
      ssrRenderList(__props.menuTree, (menuItem, index2) => {
        _push(`<a${ssrRenderAttr("href", `#section-${menuItem.item_id}`)} class="${ssrRenderClass([{ active: unref(activeSection) === menuItem.item_id }, "nav-dot"])}"${ssrRenderAttr("title", menuItem.item_name)} data-v-c6a477e5></a>`);
      });
      _push(`<!--]--></div>`);
      if (__props.socialMedia.length > 0) {
        _push(`<section class="social-footer" data-v-c6a477e5><div class="social-inner" data-v-c6a477e5><!--[-->`);
        ssrRenderList(__props.socialMedia, (social) => {
          _push(`<a${ssrRenderAttr("href", social.link)} target="_blank" rel="noopener noreferrer" class="social-icon-link" data-v-c6a477e5><i class="${ssrRenderClass(unref(getSocialIcon)(social.stype))}" data-v-c6a477e5></i></a>`);
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showBackToTop)) {
        _push(`<button class="back-to-top" data-v-c6a477e5><i class="pi pi-arrow-up" data-v-c6a477e5></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/public/themes/FullscreenHero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const FullscreenHero = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c6a477e5"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const domainStore = useDomainStore();
    const api = useApi();
    const themeMap = {
      ClassicMultiPage,
      ScrollingSinglePage,
      MagazineGrid,
      FullscreenHero
    };
    const themeComponent = computed(() => {
      if (domainStore.settings) {
        const styles = {
          0: "ClassicMultiPage",
          1: "ScrollingSinglePage",
          2: "MagazineGrid",
          3: "FullscreenHero"
        };
        const name = styles[domainStore.settings.page_style] || "ClassicMultiPage";
        return themeMap[name];
      }
      return null;
    });
    const contentSections = ref([]);
    const homeMenuTree = ref([]);
    const mapSection = (s) => ({
      content: {
        ...s.content,
        items: s.content.items || []
      },
      items: s.content.items || []
    });
    const getFirstMenuId = () => {
      var _a;
      const tree = domainStore.menuTree;
      if (!tree.length) return null;
      const first = tree[0];
      if ((_a = first.children) == null ? void 0 : _a.length) return first.children[0].item_id;
      return first.item_id;
    };
    const loadContent = async () => {
      var _a;
      const domainId = (_a = domainStore.domain) == null ? void 0 : _a.domain_id;
      if (!domainId) return;
      if (domainStore.settings && domainStore.settings.page_style !== 0) {
        const response = await api.get(`/site/home?domain_id=${domainId}`);
        if (response.success && response.data) {
          const items = Array.isArray(response.data) ? response.data : [response.data];
          homeMenuTree.value = items.map((s) => s.menu);
          contentSections.value = items.filter((s) => s.content).map(mapSection);
        }
      } else if (domainStore.settings) {
        const allMenuIds = [];
        const collectIds = (items) => {
          var _a2;
          for (const item of items) {
            allMenuIds.push(item.item_id);
            if ((_a2 = item.children) == null ? void 0 : _a2.length) collectIds(item.children);
          }
        };
        collectIds(domainStore.menuTree);
        const batchSize = 4;
        const sections = [];
        for (let i = 0; i < allMenuIds.length; i += batchSize) {
          const batch = allMenuIds.slice(i, i + batchSize);
          const results = await Promise.all(
            batch.map(
              (menuId) => api.get(`/site/pages/${domainId}/${menuId}`).then((res) => res.success && res.data ? res.data : null).catch(() => null)
            )
          );
          for (const data of results) {
            if (!data) continue;
            const items = Array.isArray(data) ? data : [data];
            for (const s of items) {
              const section = s.content !== void 0 ? s : { content: s };
              if (!section.content) continue;
              sections.push(mapSection(section));
            }
          }
        }
        contentSections.value = sections;
      }
      if (contentSections.value.length === 0) {
        const firstMenuId = getFirstMenuId();
        if (firstMenuId) {
          try {
            const response = await api.get(`/site/pages/${domainId}/${firstMenuId}`);
            if (response.success && response.data) {
              const raw = response.data.content || response.data;
              contentSections.value = [mapSection({ content: raw })];
            }
          } catch {
          }
        }
      }
    };
    watch(() => domainStore.currentLanguage, async (newLang, oldLang) => {
      if ((newLang == null ? void 0 : newLang.lang_id) !== (oldLang == null ? void 0 : oldLang.lang_id)) {
        await loadContent();
      }
    });
    useHead({
      title: "Home"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      if (unref(themeComponent)) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(themeComponent)), mergeProps({
          "menu-tree": unref(homeMenuTree).length ? unref(homeMenuTree) : unref(domainStore).menuTree,
          "content-sections": unref(contentSections),
          banners: unref(domainStore).banners,
          settings: unref(domainStore).settings,
          domain: unref(domainStore).domain,
          "social-media": unref(domainStore).socialMedia,
          language: unref(domainStore).currentLanguage
        }, _attrs), null), _parent);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "loading" }, _attrs))} data-v-70066017>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-70066017"]]);

export { index as default };
//# sourceMappingURL=index-DIcN1DiK.mjs.map
