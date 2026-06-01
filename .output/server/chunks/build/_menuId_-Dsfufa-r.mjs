import { _ as __nuxt_component_0, a as __nuxt_component_1, b as __nuxt_component_2, c as __nuxt_component_3, d as __nuxt_component_4, e as __nuxt_component_5 } from './ArticleSection-CRiqqHLR.mjs';
import { defineComponent, ref, watch, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { C as ContentType } from './content-BKhKEcUD.mjs';
import { u as useDomainStore } from './domain-D7lCra9Q.mjs';
import { _ as _export_sfc, l as useRoute } from './server.mjs';
import { u as useApi } from './useApi-C5-eJazW.mjs';
import { u as useHead } from './index-CrXeyONu.mjs';
import './nuxt-link-DlwdfiwN.mjs';
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
  setup(__props) {
    const route = useRoute();
    const api = useApi();
    const domainStore = useDomainStore();
    const domainId = route.params.domainId;
    const menuId = route.params.menuId;
    const loading = ref(true);
    const contentSection = ref(null);
    const menuItemName = ref("");
    const findMenuItem = (items) => {
      var _a;
      for (const item of items) {
        if (String(item.item_id) === menuId) return item;
        if ((_a = item.children) == null ? void 0 : _a.length) {
          const found = findMenuItem(item.children);
          if (found) return found;
        }
      }
      return null;
    };
    const loadContent = async () => {
      loading.value = true;
      const menuItem = findMenuItem(domainStore.menuTree);
      menuItemName.value = (menuItem == null ? void 0 : menuItem.item_name) || "";
      try {
        const response = await api.get(`/site/pages/${domainId}/${menuId}`);
        if (response.success && response.data) {
          const data = response.data;
          const raw = data.content || data;
          contentSection.value = {
            content: {
              ...raw,
              items: raw.items || []
            },
            items: raw.items || []
          };
        }
      } catch (e) {
        console.error("Failed to fetch page content:", e);
      } finally {
        loading.value = false;
      }
    };
    watch(() => domainStore.currentLanguage, async (newLang, oldLang) => {
      if ((newLang == null ? void 0 : newLang.lang_id) !== (oldLang == null ? void 0 : oldLang.lang_id)) {
        await loadContent();
      }
    });
    const parseMapData = (content) => {
      try {
        return JSON.parse(content.description || "{}");
      } catch {
        return {};
      }
    };
    useHead({
      title: menuItemName.value || "Page"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_NewsSection = __nuxt_component_0;
      const _component_PhotoGallery = __nuxt_component_1;
      const _component_VideoSection = __nuxt_component_2;
      const _component_MapDisplay = __nuxt_component_3;
      const _component_DocumentSection = __nuxt_component_4;
      const _component_ArticleSection = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-content" }, _attrs))} data-v-136f7ac9><div class="container" data-v-136f7ac9>`);
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-136f7ac9>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent));
        _push(`<p data-v-136f7ac9>${ssrInterpolate(_ctx.$t("common.loading"))}</p></div>`);
      } else if (unref(contentSection)) {
        _push(`<section class="section" data-v-136f7ac9>`);
        if (unref(contentSection).content.content_type === unref(ContentType).NEWS) {
          _push(ssrRenderComponent(_component_NewsSection, {
            items: unref(contentSection).news,
            "domain-id": Number(unref(domainId)),
            "content-id": unref(contentSection).content.content_id
          }, null, _parent));
        } else if (unref(contentSection).content.content_type === unref(ContentType).PHOTO) {
          _push(ssrRenderComponent(_component_PhotoGallery, {
            items: unref(contentSection).items
          }, null, _parent));
        } else if (unref(contentSection).content.content_type === unref(ContentType).VIDEO) {
          _push(ssrRenderComponent(_component_VideoSection, {
            items: unref(contentSection).items
          }, null, _parent));
        } else if (unref(contentSection).content.content_type === unref(ContentType).MAP) {
          _push(ssrRenderComponent(_component_MapDisplay, {
            "map-data": parseMapData(unref(contentSection).content)
          }, null, _parent));
        } else if (unref(contentSection).content.content_type === unref(ContentType).DOCUMENT) {
          _push(ssrRenderComponent(_component_DocumentSection, {
            items: unref(contentSection).items
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_ArticleSection, {
            content: unref(contentSection).content,
            "show-title": true
          }, null, _parent));
        }
        _push(`</section>`);
      } else {
        _push(`<div class="empty-state" data-v-136f7ac9><p data-v-136f7ac9>${ssrInterpolate(_ctx.$t("common.noContent") || "No content available")}</p></div>`);
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
const _menuId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-136f7ac9"]]);

export { _menuId_ as default };
//# sourceMappingURL=_menuId_-Dsfufa-r.mjs.map
