import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { defineComponent, ref, computed, resolveComponent, resolveDirective, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createTextVNode, createCommentVNode, withDirectives, isRef, withModifiers, Fragment, renderList, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, g as useConfirm, m as useToast, l as useRoute, b as useRuntimeConfig } from './server.mjs';
import TinyMCEEditor from '@tinymce/tinymce-vue';
import { u as useUpload } from './useUpload-Dxcx6zHS.mjs';
import { u as useApi } from './auth-CZZkTxj2.mjs';
import { u as useContentStore } from './content-CfTGS04A.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MediaPicker",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    multiple: { type: Boolean, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { uploadFile } = useUpload();
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl || "https://khmer.biz";
    const showLibrary = ref(false);
    const loading = ref(false);
    const loadingMore = ref(false);
    const uploading = ref(false);
    const searchQuery = ref("");
    const mediaList = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const pendingSelection = ref([]);
    const showLightbox = ref(false);
    const currentPhotoIndex = ref(0);
    ref(null);
    const selectedPhotos = computed(() => props.modelValue);
    const hasSelection = computed(() => pendingSelection.value.length > 0);
    const hasMorePages = computed(() => currentPage.value < totalPages.value);
    const isSelected = (fileName) => {
      return pendingSelection.value.includes(fileName) || selectedPhotos.value.includes(fileName);
    };
    const togglePhoto = (fileName) => {
      const index = pendingSelection.value.indexOf(fileName);
      if (index > -1) {
        pendingSelection.value.splice(index, 1);
      } else {
        if (props.multiple) {
          pendingSelection.value.push(fileName);
        } else {
          pendingSelection.value = [fileName];
        }
      }
    };
    const removePhoto = (idx) => {
      const updated = [...selectedPhotos.value];
      updated.splice(idx, 1);
      emit("update:modelValue", updated);
    };
    const loadMedia = async (page = 1) => {
      loading.value = true;
      try {
        const api = useApi();
        const params = new URLSearchParams({
          page: String(page),
          limit: "20"
        });
        if (searchQuery.value.trim()) {
          params.set("search", searchQuery.value.trim());
        }
        const response = await api.get(`/media?${params}`);
        if (response.success && response.data) {
          if (page === 1) {
            mediaList.value = response.data.items || [];
          } else {
            mediaList.value = [...mediaList.value, ...response.data.items || []];
          }
          const pag = response.data.pagination;
          if (pag) {
            totalPages.value = pag.totalPages;
            currentPage.value = pag.page;
          }
        }
      } catch (error) {
        console.error("Failed to load media:", error);
      } finally {
        loading.value = false;
      }
    };
    const loadMore = async () => {
      loadingMore.value = true;
      await loadMedia(currentPage.value + 1);
      loadingMore.value = false;
    };
    const handleNewUpload = async (event) => {
      var _a, _b;
      const file = event.files[0];
      if (!file) return;
      uploading.value = true;
      try {
        const title = file.name;
        const mediaId = await uploadFile(title, file, "uploads");
        if (mediaId) {
          const api = useApi();
          const response = await api.get(`/media?limit=1`);
          if (response.success && ((_b = (_a = response.data) == null ? void 0 : _a.items) == null ? void 0 : _b[0])) {
            const newPhoto = response.data.items[0].file_name;
            const updated = [...selectedPhotos.value, newPhoto];
            emit("update:modelValue", updated);
          }
        }
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        uploading.value = false;
      }
    };
    const confirmSelection = () => {
      const updated = props.multiple ? [...selectedPhotos.value, ...pendingSelection.value] : [...pendingSelection.value];
      emit("update:modelValue", updated);
      pendingSelection.value = [];
      showLibrary.value = false;
    };
    const openLightbox = (index) => {
      currentPhotoIndex.value = index;
      showLightbox.value = true;
    };
    const nextPhoto = () => {
      if (currentPhotoIndex.value < selectedPhotos.value.length - 1) {
        currentPhotoIndex.value++;
      }
    };
    const prevPhoto = () => {
      if (currentPhotoIndex.value > 0) {
        currentPhotoIndex.value--;
      }
    };
    watch(showLightbox, (isOpen) => {
      if (isOpen) {
        const handleKeyPress = (e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            nextPhoto();
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            prevPhoto();
          } else if (e.key === "Escape") {
            e.preventDefault();
            showLightbox.value = false;
          }
        };
        (void 0).addEventListener("keydown", handleKeyPress);
        return () => (void 0).removeEventListener("keydown", handleKeyPress);
      }
    });
    let searchTimer = null;
    watch(searchQuery, () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        currentPage.value = 1;
        loadMedia(1);
      }, 400);
    });
    watch(showLibrary, (isOpen) => {
      if (isOpen) {
        pendingSelection.value = [];
        loadMedia(1);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      const _component_FileUpload = resolveComponent("FileUpload");
      const _component_Dialog = resolveComponent("Dialog");
      const _component_InputText = resolveComponent("InputText");
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "media-picker" }, _attrs))} data-v-865918a2><div class="media-picker-header" data-v-865918a2>`);
      _push(ssrRenderComponent(_component_Button, {
        label: "Browse Media Library",
        icon: "pi pi-images",
        outlined: "",
        onClick: ($event) => showLibrary.value = true
      }, null, _parent));
      _push(`<span class="or-divider" data-v-865918a2>or</span>`);
      _push(ssrRenderComponent(_component_FileUpload, {
        mode: "basic",
        customUpload: true,
        onSelect: handleNewUpload,
        auto: true,
        accept: "image/*",
        chooseLabel: "Upload New Photo"
      }, null, _parent));
      _push(`</div>`);
      if (unref(selectedPhotos).length) {
        _push(`<div class="selected-photos" data-v-865918a2><!--[-->`);
        ssrRenderList(unref(selectedPhotos), (photo, idx) => {
          _push(`<div class="photo-item"${ssrRenderAttr("draggable", true)} data-v-865918a2><img${ssrRenderAttr("src", `${unref(photoUrl)}${photo}`)}${ssrRenderAttr("alt", `Photo ${idx + 1}`)} class="photo-clickable" data-v-865918a2><div class="photo-overlay" data-v-865918a2>`);
          _push(ssrRenderComponent(_component_Button, mergeProps({
            icon: "pi pi-arrows-alt",
            rounded: "",
            text: "",
            severity: "secondary",
            class: "photo-drag"
          }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Drag to reorder", void 0, { top: true })), null, _parent));
          _push(ssrRenderComponent(_component_Button, mergeProps({
            icon: "pi pi-search",
            rounded: "",
            text: "",
            severity: "info",
            class: "photo-view",
            onClick: ($event) => openLightbox(idx)
          }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Click to view", void 0, { top: true })), null, _parent));
          _push(ssrRenderComponent(_component_Button, mergeProps({
            icon: "pi pi-times",
            rounded: "",
            text: "",
            severity: "danger",
            class: "photo-remove",
            onClick: ($event) => removePhoto(idx)
          }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Remove photo", void 0, { top: true })), null, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Dialog, {
        visible: unref(showLightbox),
        "onUpdate:visible": ($event) => isRef(showLightbox) ? showLightbox.value = $event : null,
        "show-header": false,
        style: { width: "90vw", maxWidth: "800px" },
        modal: true,
        dismissableMask: true,
        class: "lightbox-dialog"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              icon: "pi pi-times",
              rounded: "",
              text: "",
              severity: "danger",
              label: "Close",
              onClick: ($event) => showLightbox.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                icon: "pi pi-times",
                rounded: "",
                text: "",
                severity: "danger",
                label: "Close",
                onClick: ($event) => showLightbox.value = false
              }, null, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="lightbox-content" data-v-865918a2${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, mergeProps({
              icon: "pi pi-arrow-left",
              rounded: "",
              text: "",
              severity: "secondary",
              class: "lightbox-nav lightbox-prev",
              onClick: prevPhoto,
              disabled: unref(currentPhotoIndex) === 0
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Previous photo", void 0, { left: true })), null, _parent2, _scopeId));
            _push2(`<div class="lightbox-image-wrapper" data-v-865918a2${_scopeId}><img${ssrRenderAttr("src", `${unref(photoUrl)}${unref(selectedPhotos)[unref(currentPhotoIndex)]}`)}${ssrRenderAttr("alt", `Photo ${unref(currentPhotoIndex) + 1}`)} class="lightbox-image" data-v-865918a2${_scopeId}><div class="lightbox-info" data-v-865918a2${_scopeId}><span class="lightbox-counter" data-v-865918a2${_scopeId}>${ssrInterpolate(unref(currentPhotoIndex) + 1)} / ${ssrInterpolate(unref(selectedPhotos).length)}</span></div></div>`);
            _push2(ssrRenderComponent(_component_Button, mergeProps({
              icon: "pi pi-arrow-right",
              rounded: "",
              text: "",
              severity: "secondary",
              class: "lightbox-nav lightbox-next",
              onClick: nextPhoto,
              disabled: unref(currentPhotoIndex) === unref(selectedPhotos).length - 1
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Next photo", void 0, { right: true })), null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "lightbox-content" }, [
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
                    "Previous photo",
                    void 0,
                    { left: true }
                  ]
                ]),
                createVNode("div", { class: "lightbox-image-wrapper" }, [
                  createVNode("img", {
                    src: `${unref(photoUrl)}${unref(selectedPhotos)[unref(currentPhotoIndex)]}`,
                    alt: `Photo ${unref(currentPhotoIndex) + 1}`,
                    class: "lightbox-image"
                  }, null, 8, ["src", "alt"]),
                  createVNode("div", { class: "lightbox-info" }, [
                    createVNode("span", { class: "lightbox-counter" }, toDisplayString(unref(currentPhotoIndex) + 1) + " / " + toDisplayString(unref(selectedPhotos).length), 1)
                  ])
                ]),
                withDirectives(createVNode(_component_Button, {
                  icon: "pi pi-arrow-right",
                  rounded: "",
                  text: "",
                  severity: "secondary",
                  class: "lightbox-nav lightbox-next",
                  onClick: nextPhoto,
                  disabled: unref(currentPhotoIndex) === unref(selectedPhotos).length - 1
                }, null, 8, ["disabled"]), [
                  [
                    _directive_tooltip,
                    "Next photo",
                    void 0,
                    { right: true }
                  ]
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        visible: unref(showLibrary),
        "onUpdate:visible": ($event) => isRef(showLibrary) ? showLibrary.value = $event : null,
        header: "Media Library",
        style: { width: "90vw", maxWidth: "800px" },
        modal: true
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              label: "Cancel",
              outlined: "",
              onClick: ($event) => showLibrary.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: "Add Selected",
              onClick: confirmSelection,
              disabled: !unref(hasSelection)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                label: "Cancel",
                outlined: "",
                onClick: ($event) => showLibrary.value = false
              }, null, 8, ["onClick"]),
              createVNode(_component_Button, {
                label: "Add Selected",
                onClick: confirmSelection,
                disabled: !unref(hasSelection)
              }, null, 8, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="media-library" data-v-865918a2${_scopeId}><div class="media-search" data-v-865918a2${_scopeId}>`);
            _push2(ssrRenderComponent(_component_InputText, {
              modelValue: unref(searchQuery),
              "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
              placeholder: "Search media...",
              class: "search-input"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(loading)) {
              _push2(`<div class="media-loading" data-v-865918a2${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent2, _scopeId));
              _push2(`<p data-v-865918a2${_scopeId}>Loading media...</p></div>`);
            } else if (unref(mediaList).length) {
              _push2(`<div class="media-grid" data-v-865918a2${_scopeId}><!--[-->`);
              ssrRenderList(unref(mediaList), (media) => {
                _push2(`<div class="${ssrRenderClass([{ "media-item-selected": isSelected(media.file_name) }, "media-item"])}" data-v-865918a2${_scopeId}><img${ssrRenderAttr("src", `${unref(photoUrl)}${media.file_name}`)}${ssrRenderAttr("alt", media.title || media.file_name)} class="media-thumb" data-v-865918a2${_scopeId}><div class="media-info" data-v-865918a2${_scopeId}><small class="media-title" data-v-865918a2${_scopeId}>${ssrInterpolate(media.title || "Untitled")}</small></div>`);
                if (isSelected(media.file_name)) {
                  _push2(`<div class="media-check" data-v-865918a2${_scopeId}><i class="pi pi-check" data-v-865918a2${_scopeId}></i></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="media-empty" data-v-865918a2${_scopeId}><i class="pi pi-images" style="${ssrRenderStyle({ "font-size": "3rem", "color": "#ccc" })}" data-v-865918a2${_scopeId}></i><p data-v-865918a2${_scopeId}>No media found</p></div>`);
            }
            if (unref(hasMorePages)) {
              _push2(`<div class="media-pagination" data-v-865918a2${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, {
                label: "Load More",
                outlined: "",
                onClick: loadMore,
                loading: unref(loadingMore)
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "media-library" }, [
                createVNode("div", { class: "media-search" }, [
                  createVNode(_component_InputText, {
                    modelValue: unref(searchQuery),
                    "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                    placeholder: "Search media...",
                    class: "search-input"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                unref(loading) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "media-loading"
                }, [
                  createVNode(_component_ProgressSpinner),
                  createVNode("p", null, "Loading media...")
                ])) : unref(mediaList).length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "media-grid"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(mediaList), (media) => {
                    return openBlock(), createBlock("div", {
                      key: media.photo_id,
                      class: ["media-item", { "media-item-selected": isSelected(media.file_name) }],
                      onClick: ($event) => togglePhoto(media.file_name)
                    }, [
                      createVNode("img", {
                        src: `${unref(photoUrl)}${media.file_name}`,
                        alt: media.title || media.file_name,
                        class: "media-thumb"
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "media-info" }, [
                        createVNode("small", { class: "media-title" }, toDisplayString(media.title || "Untitled"), 1)
                      ]),
                      isSelected(media.file_name) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "media-check"
                      }, [
                        createVNode("i", { class: "pi pi-check" })
                      ])) : createCommentVNode("", true)
                    ], 10, ["onClick"]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "media-empty"
                }, [
                  createVNode("i", {
                    class: "pi pi-images",
                    style: { "font-size": "3rem", "color": "#ccc" }
                  }),
                  createVNode("p", null, "No media found")
                ])),
                unref(hasMorePages) ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "media-pagination"
                }, [
                  createVNode(_component_Button, {
                    label: "Load More",
                    outlined: "",
                    onClick: loadMore,
                    loading: unref(loadingMore)
                  }, null, 8, ["loading"])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(uploading)) {
        _push(`<div class="upload-progress" data-v-865918a2>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, null, null, _parent));
        _push(`<p data-v-865918a2>Uploading...</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/MediaPicker.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MediaPicker = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-865918a2"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "products",
  __ssrInlineRender: true,
  setup(__props) {
    const contentStore = useContentStore();
    const confirm = useConfirm();
    const toast = useToast();
    const route = useRoute();
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl || "https://khmer.biz";
    const loading = ref(false);
    const showDialog = ref(false);
    const editing = ref(null);
    const saving = ref(false);
    ref(false);
    const currencies = ["USD", "KHR", "THB", "CNY", "EUR"];
    const form = ref({
      name: "",
      price: null,
      currency: "USD",
      shortdes: "",
      longdes: "",
      features: [],
      photos: [],
      priority: 0,
      visible: true
    });
    const errors = ref({});
    const contentId = computed(() => Number(route.params.contentId));
    const formatPrice = (price) => {
      return Number(price).toLocaleString(void 0, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    };
    const resetForm = () => {
      form.value = {
        name: "",
        price: null,
        currency: "USD",
        shortdes: "",
        longdes: "",
        features: [],
        photos: [],
        priority: 0,
        visible: true
      };
      errors.value = {};
    };
    const openAddDialog = () => {
      editing.value = null;
      resetForm();
      showDialog.value = true;
    };
    const editProduct = (product) => {
      var _a, _b;
      editing.value = product;
      form.value = {
        name: product.name || "",
        price: (_a = product.price) != null ? _a : null,
        currency: product.currency || "USD",
        shortdes: product.shortdes || "",
        longdes: product.longdes || "",
        features: Array.isArray(product.features) ? [...product.features] : [],
        photos: Array.isArray(product.photos) ? [...product.photos] : [],
        priority: (_b = product.priority) != null ? _b : 0,
        visible: product.status !== 1
      };
      showDialog.value = true;
    };
    const closeDialog = () => {
      showDialog.value = false;
      editing.value = null;
      resetForm();
    };
    const addFeature = () => {
      form.value.features.push("");
    };
    const removeFeature = (idx) => {
      form.value.features.splice(idx, 1);
    };
    const validateForm = () => {
      errors.value = {};
      if (!form.value.name.trim()) {
        errors.value.name = "Name is required";
      }
      form.value.features = form.value.features.filter((f) => f.trim() !== "");
      return Object.keys(errors.value).length === 0;
    };
    const handleSave = async () => {
      var _a;
      if (!validateForm()) return;
      saving.value = true;
      try {
        const payload = {
          name: form.value.name,
          price: (_a = form.value.price) != null ? _a : void 0,
          currency: form.value.currency,
          shortdes: form.value.shortdes || void 0,
          longdes: form.value.longdes || void 0,
          features: form.value.features,
          photos: form.value.photos,
          priority: form.value.priority,
          status: form.value.visible ? 0 : 1
        };
        let result;
        if (editing.value) {
          result = await contentStore.updateProduct(contentId.value, editing.value.id, payload);
        } else {
          result = await contentStore.saveProduct(contentId.value, payload);
        }
        if (result === true || typeof result === "object" && result.success) {
          await contentStore.fetchProducts(contentId.value);
          toast.add({ severity: "success", summary: "Saved", life: 2e3 });
          closeDialog();
        } else {
          toast.add({ severity: "error", summary: "Save failed", detail: "Please check console for details", life: 5e3 });
        }
      } catch (error) {
        console.error("Save error:", error);
        toast.add({ severity: "error", summary: "Save failed", detail: error.message, life: 5e3 });
      } finally {
        saving.value = false;
      }
    };
    const confirmDelete = (product) => {
      confirm.require({
        message: `Delete "${product.name}"?`,
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          const ok = await contentStore.deleteProduct(contentId.value, product.id);
          if (ok) {
            toast.add({ severity: "success", summary: "Deleted", life: 2e3 });
          } else {
            toast.add({ severity: "error", summary: "Delete failed", life: 3e3 });
          }
        },
        acceptClass: "p-button-danger"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _component_DataTable = resolveComponent("DataTable");
      const _component_Column = resolveComponent("Column");
      const _component_Badge = resolveComponent("Badge");
      const _component_Tag = resolveComponent("Tag");
      const _component_Dialog = resolveComponent("Dialog");
      const _component_InputText = resolveComponent("InputText");
      const _component_InputNumber = resolveComponent("InputNumber");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Textarea = resolveComponent("Textarea");
      const _component_ClientOnly = __nuxt_component_0;
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_InputSwitch = resolveComponent("InputSwitch");
      const _component_ConfirmDialog = resolveComponent("ConfirmDialog");
      const _component_Toast = resolveComponent("Toast");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "products-page" }, _attrs))} data-v-205dcd85><div class="page-header" data-v-205dcd85><h1 class="page-title" data-v-205dcd85> Products / Services: ${ssrInterpolate((_a = unref(contentStore).currentContent) == null ? void 0 : _a.title)}</h1><div class="page-actions" data-v-205dcd85>`);
      _push(ssrRenderComponent(_component_Button, {
        label: "Add New",
        icon: "pi pi-plus",
        onClick: openAddDialog
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_Card, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DataTable, {
              value: unref(contentStore).productList,
              loading: unref(loading),
              paginator: true,
              rows: 20,
              stripedRows: "",
              class: "products-table"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "id",
                    header: "ID",
                    style: { width: "70px" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "name",
                    header: "Name"
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<strong data-v-205dcd85${_scopeId3}>${ssrInterpolate(data.name)}</strong>`);
                      } else {
                        return [
                          createVNode("strong", null, toDisplayString(data.name), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    header: "Price",
                    style: { width: "130px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (data.price !== void 0 && data.price !== null) {
                          _push4(`<span data-v-205dcd85${_scopeId3}>${ssrInterpolate(formatPrice(data.price))}`);
                          if (data.currency) {
                            _push4(`<small data-v-205dcd85${_scopeId3}>${ssrInterpolate(data.currency)}</small>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</span>`);
                        } else {
                          _push4(`<span data-v-205dcd85${_scopeId3}>-</span>`);
                        }
                      } else {
                        return [
                          data.price !== void 0 && data.price !== null ? (openBlock(), createBlock("span", { key: 0 }, [
                            createTextVNode(toDisplayString(formatPrice(data.price)), 1),
                            data.currency ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(data.currency), 1)) : createCommentVNode("", true)
                          ])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    header: "Photo",
                    style: { width: "90px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (data.photos && data.photos.length) {
                          _push4(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${data.photos[0]}`)}${ssrRenderAttr("alt", data.name)} class="product-thumb" data-v-205dcd85${_scopeId3}>`);
                        } else {
                          _push4(`<span data-v-205dcd85${_scopeId3}>-</span>`);
                        }
                      } else {
                        return [
                          data.photos && data.photos.length ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: `${unref(photoUrl)}${data.photos[0]}`,
                            alt: data.name,
                            class: "product-thumb"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    header: "Features",
                    style: { width: "100px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (data.features && data.features.length) {
                          _push4(ssrRenderComponent(_component_Badge, {
                            value: data.features.length
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<span data-v-205dcd85${_scopeId3}>-</span>`);
                        }
                      } else {
                        return [
                          data.features && data.features.length ? (openBlock(), createBlock(_component_Badge, {
                            key: 0,
                            value: data.features.length
                          }, null, 8, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "priority",
                    header: "Priority",
                    style: { width: "90px" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    header: "Status",
                    style: { width: "100px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Tag, {
                          value: data.status === 1 ? "Hidden" : "Visible",
                          severity: data.status === 1 ? "secondary" : "success"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Tag, {
                            value: data.status === 1 ? "Hidden" : "Visible",
                            severity: data.status === 1 ? "secondary" : "success"
                          }, null, 8, ["value", "severity"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    header: "Actions",
                    style: { width: "120px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="action-buttons" data-v-205dcd85${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Button, mergeProps({
                          icon: "pi pi-pencil",
                          rounded: "",
                          text: "",
                          onClick: ($event) => editProduct(data)
                        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Edit", void 0, { top: true })), null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Button, mergeProps({
                          icon: "pi pi-trash",
                          rounded: "",
                          text: "",
                          severity: "danger",
                          onClick: ($event) => confirmDelete(data)
                        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Delete", void 0, { top: true })), null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "action-buttons" }, [
                            withDirectives(createVNode(_component_Button, {
                              icon: "pi pi-pencil",
                              rounded: "",
                              text: "",
                              onClick: ($event) => editProduct(data)
                            }, null, 8, ["onClick"]), [
                              [
                                _directive_tooltip,
                                "Edit",
                                void 0,
                                { top: true }
                              ]
                            ]),
                            withDirectives(createVNode(_component_Button, {
                              icon: "pi pi-trash",
                              rounded: "",
                              text: "",
                              severity: "danger",
                              onClick: ($event) => confirmDelete(data)
                            }, null, 8, ["onClick"]), [
                              [
                                _directive_tooltip,
                                "Delete",
                                void 0,
                                { top: true }
                              ]
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Column, {
                      field: "id",
                      header: "ID",
                      style: { width: "70px" }
                    }),
                    createVNode(_component_Column, {
                      field: "name",
                      header: "Name"
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("strong", null, toDisplayString(data.name), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      header: "Price",
                      style: { width: "130px" }
                    }, {
                      body: withCtx(({ data }) => [
                        data.price !== void 0 && data.price !== null ? (openBlock(), createBlock("span", { key: 0 }, [
                          createTextVNode(toDisplayString(formatPrice(data.price)), 1),
                          data.currency ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(data.currency), 1)) : createCommentVNode("", true)
                        ])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      header: "Photo",
                      style: { width: "90px" }
                    }, {
                      body: withCtx(({ data }) => [
                        data.photos && data.photos.length ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `${unref(photoUrl)}${data.photos[0]}`,
                          alt: data.name,
                          class: "product-thumb"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      header: "Features",
                      style: { width: "100px" }
                    }, {
                      body: withCtx(({ data }) => [
                        data.features && data.features.length ? (openBlock(), createBlock(_component_Badge, {
                          key: 0,
                          value: data.features.length
                        }, null, 8, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "priority",
                      header: "Priority",
                      style: { width: "90px" }
                    }),
                    createVNode(_component_Column, {
                      header: "Status",
                      style: { width: "100px" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode(_component_Tag, {
                          value: data.status === 1 ? "Hidden" : "Visible",
                          severity: data.status === 1 ? "secondary" : "success"
                        }, null, 8, ["value", "severity"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      header: "Actions",
                      style: { width: "120px" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("div", { class: "action-buttons" }, [
                          withDirectives(createVNode(_component_Button, {
                            icon: "pi pi-pencil",
                            rounded: "",
                            text: "",
                            onClick: ($event) => editProduct(data)
                          }, null, 8, ["onClick"]), [
                            [
                              _directive_tooltip,
                              "Edit",
                              void 0,
                              { top: true }
                            ]
                          ]),
                          withDirectives(createVNode(_component_Button, {
                            icon: "pi pi-trash",
                            rounded: "",
                            text: "",
                            severity: "danger",
                            onClick: ($event) => confirmDelete(data)
                          }, null, 8, ["onClick"]), [
                            [
                              _directive_tooltip,
                              "Delete",
                              void 0,
                              { top: true }
                            ]
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DataTable, {
                value: unref(contentStore).productList,
                loading: unref(loading),
                paginator: true,
                rows: 20,
                stripedRows: "",
                class: "products-table"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Column, {
                    field: "id",
                    header: "ID",
                    style: { width: "70px" }
                  }),
                  createVNode(_component_Column, {
                    field: "name",
                    header: "Name"
                  }, {
                    body: withCtx(({ data }) => [
                      createVNode("strong", null, toDisplayString(data.name), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Column, {
                    header: "Price",
                    style: { width: "130px" }
                  }, {
                    body: withCtx(({ data }) => [
                      data.price !== void 0 && data.price !== null ? (openBlock(), createBlock("span", { key: 0 }, [
                        createTextVNode(toDisplayString(formatPrice(data.price)), 1),
                        data.currency ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(data.currency), 1)) : createCommentVNode("", true)
                      ])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Column, {
                    header: "Photo",
                    style: { width: "90px" }
                  }, {
                    body: withCtx(({ data }) => [
                      data.photos && data.photos.length ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `${unref(photoUrl)}${data.photos[0]}`,
                        alt: data.name,
                        class: "product-thumb"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Column, {
                    header: "Features",
                    style: { width: "100px" }
                  }, {
                    body: withCtx(({ data }) => [
                      data.features && data.features.length ? (openBlock(), createBlock(_component_Badge, {
                        key: 0,
                        value: data.features.length
                      }, null, 8, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Column, {
                    field: "priority",
                    header: "Priority",
                    style: { width: "90px" }
                  }),
                  createVNode(_component_Column, {
                    header: "Status",
                    style: { width: "100px" }
                  }, {
                    body: withCtx(({ data }) => [
                      createVNode(_component_Tag, {
                        value: data.status === 1 ? "Hidden" : "Visible",
                        severity: data.status === 1 ? "secondary" : "success"
                      }, null, 8, ["value", "severity"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Column, {
                    header: "Actions",
                    style: { width: "120px" }
                  }, {
                    body: withCtx(({ data }) => [
                      createVNode("div", { class: "action-buttons" }, [
                        withDirectives(createVNode(_component_Button, {
                          icon: "pi pi-pencil",
                          rounded: "",
                          text: "",
                          onClick: ($event) => editProduct(data)
                        }, null, 8, ["onClick"]), [
                          [
                            _directive_tooltip,
                            "Edit",
                            void 0,
                            { top: true }
                          ]
                        ]),
                        withDirectives(createVNode(_component_Button, {
                          icon: "pi pi-trash",
                          rounded: "",
                          text: "",
                          severity: "danger",
                          onClick: ($event) => confirmDelete(data)
                        }, null, 8, ["onClick"]), [
                          [
                            _directive_tooltip,
                            "Delete",
                            void 0,
                            { top: true }
                          ]
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        visible: unref(showDialog),
        "onUpdate:visible": ($event) => isRef(showDialog) ? showDialog.value = $event : null,
        header: unref(editing) ? "Edit Product" : "Add Product",
        style: { width: "720px" },
        modal: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="product-form" data-v-205dcd85${_scopeId}><div class="form-group" data-v-205dcd85${_scopeId}><label data-v-205dcd85${_scopeId}>Name *</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              placeholder: "Product or service name",
              class: { "p-invalid": unref(errors).name }
            }, null, _parent2, _scopeId));
            if (unref(errors).name) {
              _push2(`<small class="p-error" data-v-205dcd85${_scopeId}>${ssrInterpolate(unref(errors).name)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-row" data-v-205dcd85${_scopeId}><div class="form-group" data-v-205dcd85${_scopeId}><label data-v-205dcd85${_scopeId}>Price</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              modelValue: unref(form).price,
              "onUpdate:modelValue": ($event) => unref(form).price = $event,
              mode: "decimal",
              minFractionDigits: 0,
              maxFractionDigits: 2,
              placeholder: "0.00"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-205dcd85${_scopeId}><label data-v-205dcd85${_scopeId}>Currency</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              modelValue: unref(form).currency,
              "onUpdate:modelValue": ($event) => unref(form).currency = $event,
              options: currencies,
              placeholder: "USD",
              showClear: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-205dcd85${_scopeId}><label data-v-205dcd85${_scopeId}>Priority</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              modelValue: unref(form).priority,
              "onUpdate:modelValue": ($event) => unref(form).priority = $event,
              min: 0,
              max: 4
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="form-group" data-v-205dcd85${_scopeId}><label data-v-205dcd85${_scopeId}>Short Description</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              modelValue: unref(form).shortdes,
              "onUpdate:modelValue": ($event) => unref(form).shortdes = $event,
              rows: "2",
              placeholder: "One-line summary"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-205dcd85${_scopeId}><label data-v-205dcd85${_scopeId}>Full Description</label>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-205dcd85${_scopeId}><label data-v-205dcd85${_scopeId}>Features</label><div class="feature-list" data-v-205dcd85${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).features, (feat, idx) => {
              _push2(`<div class="feature-row" data-v-205dcd85${_scopeId}>`);
              _push2(ssrRenderComponent(_component_InputText, {
                modelValue: unref(form).features[idx],
                "onUpdate:modelValue": ($event) => unref(form).features[idx] = $event,
                placeholder: "e.g. 100% organic"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Button, {
                icon: "pi pi-times",
                rounded: "",
                text: "",
                severity: "danger",
                onClick: ($event) => removeFeature(idx)
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: "Add Feature",
              icon: "pi pi-plus",
              outlined: "",
              size: "small",
              onClick: addFeature
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-205dcd85${_scopeId}><label data-v-205dcd85${_scopeId}>Photos</label>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              fallback: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="media-picker-loading" data-v-205dcd85${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ProgressSpinner, { style: { "width": "30px", "height": "30px" } }, null, _parent3, _scopeId2));
                  _push3(`<span data-v-205dcd85${_scopeId2}>Loading media picker...</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "media-picker-loading" }, [
                      createVNode(_component_ProgressSpinner, { style: { "width": "30px", "height": "30px" } }),
                      createVNode("span", null, "Loading media picker...")
                    ])
                  ];
                }
              })
            }, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-205dcd85${_scopeId}><label data-v-205dcd85${_scopeId}>Status</label><div class="status-toggle" data-v-205dcd85${_scopeId}>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              modelValue: unref(form).visible,
              "onUpdate:modelValue": ($event) => unref(form).visible = $event
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-205dcd85${_scopeId}>${ssrInterpolate(unref(form).visible ? "Visible" : "Hidden")}</span></div></div><div class="form-actions" data-v-205dcd85${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: "Cancel",
              outlined: "",
              onClick: closeDialog
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              label: "Save",
              loading: unref(saving)
            }, null, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(handleSave, ["prevent"]),
                class: "product-form"
              }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "Name *"),
                  createVNode(_component_InputText, {
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    placeholder: "Product or service name",
                    class: { "p-invalid": unref(errors).name }
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                  unref(errors).name ? (openBlock(), createBlock("small", {
                    key: 0,
                    class: "p-error"
                  }, toDisplayString(unref(errors).name), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-row" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", null, "Price"),
                    createVNode(_component_InputNumber, {
                      modelValue: unref(form).price,
                      "onUpdate:modelValue": ($event) => unref(form).price = $event,
                      mode: "decimal",
                      minFractionDigits: 0,
                      maxFractionDigits: 2,
                      placeholder: "0.00"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", null, "Currency"),
                    createVNode(_component_Dropdown, {
                      modelValue: unref(form).currency,
                      "onUpdate:modelValue": ($event) => unref(form).currency = $event,
                      options: currencies,
                      placeholder: "USD",
                      showClear: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", null, "Priority"),
                    createVNode(_component_InputNumber, {
                      modelValue: unref(form).priority,
                      "onUpdate:modelValue": ($event) => unref(form).priority = $event,
                      min: 0,
                      max: 4
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "Short Description"),
                  createVNode(_component_Textarea, {
                    modelValue: unref(form).shortdes,
                    "onUpdate:modelValue": ($event) => unref(form).shortdes = $event,
                    rows: "2",
                    placeholder: "One-line summary"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "Full Description"),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(unref(TinyMCEEditor), {
                        modelValue: unref(form).longdes,
                        "onUpdate:modelValue": ($event) => unref(form).longdes = $event,
                        tinymceScriptSrc: "/tinymce/tinymce.min.js",
                        init: {
                          height: 250,
                          menubar: "tools",
                          plugins: "advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste",
                          toolbar: "undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | fullscreen",
                          branding: false,
                          promotion: false,
                          relative_urls: false,
                          remove_script_host: false,
                          document_base_url: unref(photoUrl)
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "init"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "Features"),
                  createVNode("div", { class: "feature-list" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(form).features, (feat, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "feature-row"
                      }, [
                        createVNode(_component_InputText, {
                          modelValue: unref(form).features[idx],
                          "onUpdate:modelValue": ($event) => unref(form).features[idx] = $event,
                          placeholder: "e.g. 100% organic"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_Button, {
                          icon: "pi pi-times",
                          rounded: "",
                          text: "",
                          severity: "danger",
                          onClick: ($event) => removeFeature(idx)
                        }, null, 8, ["onClick"])
                      ]);
                    }), 128))
                  ]),
                  createVNode(_component_Button, {
                    label: "Add Feature",
                    icon: "pi pi-plus",
                    outlined: "",
                    size: "small",
                    onClick: addFeature
                  })
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "Photos"),
                  createVNode(_component_ClientOnly, null, {
                    fallback: withCtx(() => [
                      createVNode("div", { class: "media-picker-loading" }, [
                        createVNode(_component_ProgressSpinner, { style: { "width": "30px", "height": "30px" } }),
                        createVNode("span", null, "Loading media picker...")
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode(MediaPicker, {
                        modelValue: unref(form).photos,
                        "onUpdate:modelValue": ($event) => unref(form).photos = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "Status"),
                  createVNode("div", { class: "status-toggle" }, [
                    createVNode(_component_InputSwitch, {
                      modelValue: unref(form).visible,
                      "onUpdate:modelValue": ($event) => unref(form).visible = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("span", null, toDisplayString(unref(form).visible ? "Visible" : "Hidden"), 1)
                  ])
                ]),
                createVNode("div", { class: "form-actions" }, [
                  createVNode(_component_Button, {
                    type: "button",
                    label: "Cancel",
                    outlined: "",
                    onClick: closeDialog
                  }),
                  createVNode(_component_Button, {
                    type: "submit",
                    label: "Save",
                    loading: unref(saving)
                  }, null, 8, ["loading"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ConfirmDialog, null, null, _parent));
      _push(ssrRenderComponent(_component_Toast, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/content/[contentId]/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const products = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-205dcd85"]]);

export { products as default };
//# sourceMappingURL=products-DlD7pWXq.mjs.map
