import { defineComponent, ref, computed, watch, resolveComponent, resolveDirective, mergeProps, unref, isRef, withCtx, createVNode, withDirectives, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrGetDirectiveProps, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { u as useUpload } from './useUpload-Dxcx6zHS.mjs';
import { _ as _export_sfc, b as useRuntimeConfig } from './server.mjs';
import { u as useApi } from './auth-CZZkTxj2.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/MediaPicker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-865918a2"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=MediaPicker-8UPlYHHf.mjs.map
