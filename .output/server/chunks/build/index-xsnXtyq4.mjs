import { defineComponent, ref, computed, watch, resolveComponent, unref, withCtx, createVNode, withModifiers, toDisplayString, readonly, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { f as defineStore, b as useRuntimeConfig } from './server.mjs';
import { u as useApi } from './auth-CZZkTxj2.mjs';
import { u as useUpload } from './useUpload-Dxcx6zHS.mjs';
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

const useMediaStore = defineStore("media", () => {
  const api = useApi();
  const { uploadFile, uploads, isUploading } = useUpload();
  const mediaList = ref([]);
  const search = ref("");
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });
  const fetchMedia = async (page = 1) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pagination.value.limit)
      });
      const term = search.value.trim();
      if (term) params.set("search", term);
      const response = await api.get(`/media?${params}`);
      if (response.success && response.data) {
        mediaList.value = response.data.items;
        const pag = response.data.pagination;
        pagination.value = {
          page: pag.page,
          limit: pag.limit,
          total: pag.total,
          totalPages: pag.totalPages
        };
      }
    } catch (error) {
      console.error("Failed to fetch media:", error);
    }
  };
  const uploadMedia = async (title, file, folder = "uploads", onProgress) => {
    const mediaId = await uploadFile(title, file, folder, onProgress);
    if (mediaId) {
      await fetchMedia();
    }
    return mediaId;
  };
  const deleteMedia = async (id) => {
    try {
      const response = await api.delete(`/media/${id}`);
      if (response.success) {
        mediaList.value = mediaList.value.filter((m) => m.photo_id !== id);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to delete media:", error);
      return false;
    }
  };
  const searchMedia = async (query) => {
    search.value = query;
    await fetchMedia(1);
  };
  return {
    mediaList: readonly(mediaList),
    search,
    pagination: readonly(pagination),
    uploads,
    isUploading,
    fetchMedia,
    uploadMedia,
    deleteMedia,
    searchMedia
  };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const mediaStore = useMediaStore();
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl || "https://khmer.biz";
    const showUpload = ref(false);
    const showPreview = ref(false);
    const previewUrl = ref("");
    const uploadForm = ref({ title: "", file: null });
    const loading = ref(false);
    const pagination = computed(() => mediaStore.pagination);
    const onPageChange = (event) => {
      loading.value = true;
      mediaStore.fetchMedia(event.page + 1).finally(() => {
        loading.value = false;
      });
    };
    let searchTimer = null;
    watch(() => mediaStore.search, () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        loading.value = true;
        mediaStore.fetchMedia(1).finally(() => {
          loading.value = false;
        });
      }, 400);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = resolveComponent("DataTable");
      const _component_Column = resolveComponent("Column");
      _push(`<div${ssrRenderAttrs(_attrs)}><form style="${ssrRenderStyle({ "margin-bottom": "10px", "max-width": "500px" })}"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input type="text"${ssrRenderAttr("value", unref(mediaStore).search)} class="form-control"${ssrRenderAttr("placeholder", _ctx.$t("contentManager.search"))}>`);
      if (unref(mediaStore).search) {
        _push(`<span class="input-group-addon" style="${ssrRenderStyle({ "cursor": "pointer" })}"><i class="fa fa-times"></i></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form><div class="text-right" style="${ssrRenderStyle({ "margin-bottom": "10px" })}"><a href="#" class="btn btn-info"><i class="fa fa-plus"></i></a></div>`);
      if (unref(showUpload)) {
        _push(`<div class="panel panel-info" style="${ssrRenderStyle({ "margin-bottom": "15px" })}"><div class="panel-heading">${ssrInterpolate(_ctx.$t("mediaManager.uploadFile"))}</div><div class="panel-body"><form><div class="form-group"><label>${ssrInterpolate(_ctx.$t("contentManager.contentTitle"))}</label><input type="text"${ssrRenderAttr("value", unref(uploadForm).title)} class="form-control"></div><div class="form-group"><label>${ssrInterpolate(_ctx.$t("mediaManager.uploadFile"))}</label><input type="file" class="form-control" required></div><button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> ${ssrInterpolate(_ctx.$t("contentManager.save"))}</button></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_DataTable, {
        value: unref(mediaStore).mediaList,
        loading: unref(loading),
        paginator: true,
        rows: unref(pagination).limit,
        totalRecords: unref(pagination).total,
        lazy: true,
        onPage: onPageChange,
        rowsPerPageOptions: [10, 20, 50],
        stripedRows: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "photo_id",
              header: "#",
              style: { width: "80px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              header: "",
              style: { width: "60px" }
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a href="#"${_scopeId2}><i class="fa fa-eye fa-lg"${_scopeId2}></i></a>`);
                } else {
                  return [
                    createVNode("a", {
                      href: "#",
                      onClick: withModifiers(($event) => {
                        previewUrl.value = unref(photoUrl) + data.file_name;
                        showPreview.value = true;
                      }, ["prevent"])
                    }, [
                      createVNode("i", { class: "fa fa-eye fa-lg" })
                    ], 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "title",
              header: _ctx.$t("contentManager.contentTitle")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "file_name",
              header: _ctx.$t("mediaManager.url")
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a${ssrRenderAttr("href", unref(photoUrl) + data.file_name)} target="_blank"${_scopeId2}>${ssrInterpolate(data.file_name)}</a>`);
                } else {
                  return [
                    createVNode("a", {
                      href: unref(photoUrl) + data.file_name,
                      target: "_blank"
                    }, toDisplayString(data.file_name), 9, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, {
                field: "photo_id",
                header: "#",
                style: { width: "80px" }
              }),
              createVNode(_component_Column, {
                header: "",
                style: { width: "60px" }
              }, {
                body: withCtx(({ data }) => [
                  createVNode("a", {
                    href: "#",
                    onClick: withModifiers(($event) => {
                      previewUrl.value = unref(photoUrl) + data.file_name;
                      showPreview.value = true;
                    }, ["prevent"])
                  }, [
                    createVNode("i", { class: "fa fa-eye fa-lg" })
                  ], 8, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "title",
                header: _ctx.$t("contentManager.contentTitle")
              }, null, 8, ["header"]),
              createVNode(_component_Column, {
                field: "file_name",
                header: _ctx.$t("mediaManager.url")
              }, {
                body: withCtx(({ data }) => [
                  createVNode("a", {
                    href: unref(photoUrl) + data.file_name,
                    target: "_blank"
                  }, toDisplayString(data.file_name), 9, ["href"])
                ]),
                _: 1
              }, 8, ["header"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(showPreview)) {
        _push(`<div style="${ssrRenderStyle({ "position": "fixed", "top": "0", "left": "0", "right": "0", "bottom": "0", "background": "rgba(0,0,0,.9)", "z-index": "9999", "display": "flex", "align-items": "center", "justify-content": "center" })}"><button style="${ssrRenderStyle({ "position": "absolute", "top": "20px", "right": "20px", "color": "#FFF600", "font-size": "30px", "background": "none", "border": "none", "cursor": "pointer" })}">\xD7</button><iframe${ssrRenderAttr("src", unref(previewUrl))} style="${ssrRenderStyle({ "width": "80%", "max-width": "700px", "height": "80%", "max-height": "700px", "border": "none" })}"></iframe></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/media/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-xsnXtyq4.mjs.map
