import { defineComponent, withAsyncContext, watchEffect, ref, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { p as parseNewsItem } from './useNewsParser-BRh25yln.mjs';
import { u as useSeo } from './useSeo-DqTOWmEG.mjs';
import { u as useDomainStore } from './domain-CCktQG6u.mjs';
import { _ as _export_sfc, m as useRoute, b as useRuntimeConfig } from './server.mjs';
import { u as useAsyncData } from './asyncData-DQv3Qsdd.mjs';
import './index-CrXeyONu.mjs';
import '@unhead/shared';
import './auth-CZZkTxj2.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[newsId]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const config = useRuntimeConfig();
    const { public: { apiBaseUrl } } = config;
    const photoUrl = config.public.photoUrl || "https://khmer.biz";
    const domainStore = useDomainStore();
    const { setForNews } = useSeo();
    const newsId = route.params.newsId;
    const { data: news, pending: loading } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`news-${newsId}`, async () => {
      try {
        const res = await $fetch(`${apiBaseUrl}/site/news/${newsId}`);
        if ((res == null ? void 0 : res.status) !== false && (res == null ? void 0 : res.data)) return parseNewsItem(res.data);
      } catch (e) {
        console.error("Failed to fetch news:", e);
      }
      return null;
    })), __temp = await __temp, __restore(), __temp);
    watchEffect(() => {
      if (news.value) setForNews(domainStore.settings, news.value);
    });
    const relatedNews = ref([]);
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b;
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "news-detail" }, _attrs))} data-v-771302b0><div class="container" data-v-771302b0>`);
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-771302b0>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent));
        _push(`</div>`);
      } else if (unref(news)) {
        _push(`<div class="news-layout" data-v-771302b0><article class="news-main" data-v-771302b0><header class="article-header" data-v-771302b0><h1 class="article-title" data-v-771302b0>${ssrInterpolate(unref(news).title)}</h1><div class="article-meta" data-v-771302b0>`);
        if ((_a = unref(news).author) == null ? void 0 : _a.full_name) {
          _push(`<span class="meta-author" data-v-771302b0><i class="pi pi-user" data-v-771302b0></i> ${ssrInterpolate(unref(news).author.full_name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (((_b = unref(news).author) == null ? void 0 : _b.full_name) && unref(news).publish_date) {
          _push(`<span class="meta-separator" data-v-771302b0>|</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="meta-date" data-v-771302b0><i class="pi pi-calendar" data-v-771302b0></i> ${ssrInterpolate(formatDate(unref(news).publish_date))}</span></div></header>`);
        if (unref(news).photo) {
          _push(`<div class="article-image" data-v-771302b0><img${ssrRenderAttr("src", `${unref(photoUrl)}${unref(news).photo}`)}${ssrRenderAttr("alt", unref(news).title)} data-v-771302b0></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="article-body" data-v-771302b0>${(_a2 = unref(news).description) != null ? _a2 : ""}</div></article>`);
        if (unref(relatedNews).length > 0) {
          _push(`<aside class="news-sidebar" data-v-771302b0><h3 class="sidebar-title" data-v-771302b0>${ssrInterpolate(_ctx.$t("contentManager.latestNews"))}</h3><div class="sidebar-list" data-v-771302b0><!--[-->`);
          ssrRenderList(unref(relatedNews), (item, index) => {
            _push(`<div class="sidebar-item" data-v-771302b0><a href="#" class="sidebar-item-link" data-v-771302b0><div class="sidebar-thumb" data-v-771302b0>`);
            if (item.photo) {
              _push(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${item.photo}`)}${ssrRenderAttr("alt", item.title)} data-v-771302b0>`);
            } else {
              _push(`<div class="thumb-placeholder" data-v-771302b0><i class="pi pi-image" data-v-771302b0></i></div>`);
            }
            _push(`</div><div class="sidebar-info" data-v-771302b0><span class="sidebar-news-title" data-v-771302b0>${ssrInterpolate(item.title)}</span><span class="sidebar-news-date" data-v-771302b0><i class="pi pi-calendar" data-v-771302b0></i> ${ssrInterpolate(formatDate(item.publish_date))}</span></div></a>`);
            if (index < unref(relatedNews).length - 1) {
              _push(`<hr class="sidebar-separator" data-v-771302b0>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div></aside>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="empty-state" data-v-771302b0><p data-v-771302b0>News not found</p></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/[newsId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _newsId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-771302b0"]]);

export { _newsId_ as default };
//# sourceMappingURL=_newsId_-B7Gxkgpo.mjs.map
