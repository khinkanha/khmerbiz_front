import { d as __nuxt_component_0, a as __nuxt_component_1, b as __nuxt_component_2, e as __nuxt_component_3, c as __nuxt_component_4, f as __nuxt_component_5, _ as __nuxt_component_6 } from './ProductCatalog-ClMGtbUR.mjs';
import { defineComponent, withAsyncContext, watchEffect, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { C as ContentType } from './content-KJHlnLiT.mjs';
import { _ as _export_sfc, f as useRoute, c as useRuntimeConfig, b as useDomainStore, x as createError } from './server.mjs';
import { u as useSeo } from './useSeo-NE_q2kSX.mjs';
import { t as toNumericId, u as useAsyncData } from './numericId-DFykt9z8.mjs';
import './nuxt-link-BKwuAYR2.mjs';
import './useNewsParser-BRh25yln.mjs';
import '@vue-leaflet/vue-leaflet';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[menuId]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { public: { apiBaseUrl } } = useRuntimeConfig();
    const domainStore = useDomainStore();
    const { setForContent } = useSeo();
    const domainId = toNumericId(route.params.domainId);
    const menuId = toNumericId(route.params.menuId);
    if (domainId === null || menuId === null) {
      throw createError({ statusCode: 404, statusMessage: "Page Not Found", fatal: true });
    }
    const { data: contentSection, pending: loading, error: fetchError } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      `page-${domainId}-${menuId}`,
      async () => {
        try {
          const res = await $fetch(`${apiBaseUrl}/site/pages/${domainId}/${menuId}`);
          if ((res == null ? void 0 : res.status) === false || !(res == null ? void 0 : res.data)) return null;
          const raw = res.data.content || res.data;
          return {
            content: {
              ...raw,
              items: raw.items || []
            },
            items: raw.items || []
          };
        } catch (e) {
          if ((e == null ? void 0 : e.statusCode) === 404 || (e == null ? void 0 : e.status) === 404) return null;
          throw e;
        }
      },
      { watch: [() => domainStore.currentLanguage] }
    )), __temp = await __temp, __restore(), __temp);
    if (fetchError.value) console.error("Failed to fetch page content:", fetchError.value);
    if (!contentSection.value && !fetchError.value) {
      throw createError({ statusCode: 404, statusMessage: "Page Not Found", fatal: true });
    }
    watchEffect(() => {
      var _a2;
      var _a, _b, _c;
      const c = (_a = contentSection.value) == null ? void 0 : _a.content;
      if (c && c.content_type === ContentType.ARTICLE) {
        setForContent(domainStore.settings, c, (_a2 = (_c = (_b = contentSection.value) == null ? void 0 : _b.items) == null ? void 0 : _c[0]) != null ? _a2 : null);
      }
    });
    const parseMapData = (content) => {
      try {
        return JSON.parse(content.description || "{}");
      } catch {
        return {};
      }
    };
    const parseMapDescription = (content) => {
      try {
        return JSON.parse(content.description || "{}").description || "";
      } catch {
        return "";
      }
    };
    const mapVisible = (content) => {
      try {
        return JSON.parse(content.description || "{}").visible !== 0;
      } catch {
        return true;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_NewsSection = __nuxt_component_0;
      const _component_PhotoGallery = __nuxt_component_1;
      const _component_VideoSection = __nuxt_component_2;
      const _component_MapDisplay = __nuxt_component_3;
      const _component_DocumentSection = __nuxt_component_4;
      const _component_ProductCatalog = __nuxt_component_5;
      const _component_ArticleSection = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-content" }, _attrs))} data-v-bb33eda1><div class="container" data-v-bb33eda1>`);
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-bb33eda1>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent));
        _push(`<p data-v-bb33eda1>${ssrInterpolate(_ctx.$t("common.loading"))}</p></div>`);
      } else if (unref(contentSection)) {
        _push(`<section class="section" data-v-bb33eda1>`);
        if (unref(contentSection).content.content_type === unref(ContentType).NEWS) {
          _push(ssrRenderComponent(_component_NewsSection, {
            items: unref(contentSection).news,
            "domain-id": unref(domainId),
            "content-id": unref(contentSection).content.content_id,
            "section-description": JSON.parse(unref(contentSection).content.description).description
          }, null, _parent));
        } else if (unref(contentSection).content.content_type === unref(ContentType).PHOTO) {
          _push(ssrRenderComponent(_component_PhotoGallery, {
            items: unref(contentSection).items,
            "section-description": JSON.parse(unref(contentSection).content.description).description
          }, null, _parent));
        } else if (unref(contentSection).content.content_type === unref(ContentType).VIDEO) {
          _push(ssrRenderComponent(_component_VideoSection, {
            items: unref(contentSection).items,
            "section-description": JSON.parse(unref(contentSection).content.description).description
          }, null, _parent));
        } else if (unref(contentSection).content.content_type === unref(ContentType).MAP) {
          _push(`<!--[-->`);
          if (unref(contentSection).content.title) {
            _push(`<h2 class="map-page-title" data-v-bb33eda1>${ssrInterpolate(unref(contentSection).content.title)}</h2>`);
          } else {
            _push(`<!---->`);
          }
          if (parseMapDescription(unref(contentSection).content)) {
            _push(`<div class="map-page-desc" data-v-bb33eda1>${(_a = parseMapDescription(unref(contentSection).content)) != null ? _a : ""}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (mapVisible(unref(contentSection).content)) {
            _push(ssrRenderComponent(_component_MapDisplay, {
              "map-data": parseMapData(unref(contentSection).content),
              "section-title": "",
              "section-description": ""
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else if (unref(contentSection).content.content_type === unref(ContentType).DOCUMENT) {
          _push(ssrRenderComponent(_component_DocumentSection, {
            items: unref(contentSection).items,
            "section-description": JSON.parse(unref(contentSection).content.description).description
          }, null, _parent));
        } else if (unref(contentSection).content.content_type === unref(ContentType).PRODUCT) {
          _push(ssrRenderComponent(_component_ProductCatalog, {
            "content-id": unref(contentSection).content.content_id,
            "section-title": unref(contentSection).content.title,
            "section-description": JSON.parse(unref(contentSection).content.description).description
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_ArticleSection, {
            content: unref(contentSection).content,
            "show-title": true
          }, null, _parent));
        }
        _push(`</section>`);
      } else {
        _push(`<div class="empty-state" data-v-bb33eda1><p data-v-bb33eda1>${ssrInterpolate(_ctx.$t("common.noContent") || "No content available")}</p></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pages/[domainId]/[menuId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _menuId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bb33eda1"]]);

export { _menuId_ as default };
//# sourceMappingURL=_menuId_-D2oORm_9.mjs.map
