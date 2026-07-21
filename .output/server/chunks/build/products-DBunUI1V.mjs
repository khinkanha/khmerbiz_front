import { _ as __nuxt_component_0, M as MediaPicker } from './MediaPicker-DTd9YafP.mjs';
import { defineComponent, ref, computed, resolveComponent, resolveDirective, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createTextVNode, createCommentVNode, withDirectives, isRef, withModifiers, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, k as useConfirm, o as useToast, m as useRoute, b as useRuntimeConfig } from './server.mjs';
import { H as HtmlBlockEditor } from './HtmlBlockEditor-OS-aBEWi.mjs';
import { u as useContentStore } from './content-CfTGS04A.mjs';
import './useUpload-BUN8k0ZN.mjs';
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
import '@tiptap/vue-3';
import '@tiptap/starter-kit';
import '@tiptap/extension-image';
import '@tiptap/extension-link';

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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "products-page" }, _attrs))} data-v-a791353f><div class="page-header" data-v-a791353f><h1 class="page-title" data-v-a791353f> Products / Services: ${ssrInterpolate((_a = unref(contentStore).currentContent) == null ? void 0 : _a.title)}</h1><div class="page-actions" data-v-a791353f>`);
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
                        _push4(`<strong data-v-a791353f${_scopeId3}>${ssrInterpolate(data.name)}</strong>`);
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
                          _push4(`<span data-v-a791353f${_scopeId3}>${ssrInterpolate(formatPrice(data.price))}`);
                          if (data.currency) {
                            _push4(`<small data-v-a791353f${_scopeId3}>${ssrInterpolate(data.currency)}</small>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</span>`);
                        } else {
                          _push4(`<span data-v-a791353f${_scopeId3}>-</span>`);
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
                          _push4(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${data.photos[0]}`)}${ssrRenderAttr("alt", data.name)} class="product-thumb" data-v-a791353f${_scopeId3}>`);
                        } else {
                          _push4(`<span data-v-a791353f${_scopeId3}>-</span>`);
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
                          _push4(`<span data-v-a791353f${_scopeId3}>-</span>`);
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
                        _push4(`<div class="action-buttons" data-v-a791353f${_scopeId3}>`);
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
            _push2(`<form class="product-form" data-v-a791353f${_scopeId}><div class="form-group" data-v-a791353f${_scopeId}><label data-v-a791353f${_scopeId}>Name *</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              placeholder: "Product or service name",
              class: { "p-invalid": unref(errors).name }
            }, null, _parent2, _scopeId));
            if (unref(errors).name) {
              _push2(`<small class="p-error" data-v-a791353f${_scopeId}>${ssrInterpolate(unref(errors).name)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-row" data-v-a791353f${_scopeId}><div class="form-group" data-v-a791353f${_scopeId}><label data-v-a791353f${_scopeId}>Price</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              modelValue: unref(form).price,
              "onUpdate:modelValue": ($event) => unref(form).price = $event,
              mode: "decimal",
              minFractionDigits: 0,
              maxFractionDigits: 2,
              placeholder: "0.00"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-a791353f${_scopeId}><label data-v-a791353f${_scopeId}>Currency</label>`);
            _push2(ssrRenderComponent(_component_Dropdown, {
              modelValue: unref(form).currency,
              "onUpdate:modelValue": ($event) => unref(form).currency = $event,
              options: currencies,
              placeholder: "USD",
              showClear: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-a791353f${_scopeId}><label data-v-a791353f${_scopeId}>Priority</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              modelValue: unref(form).priority,
              "onUpdate:modelValue": ($event) => unref(form).priority = $event,
              min: 0,
              max: 4
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="form-group" data-v-a791353f${_scopeId}><label data-v-a791353f${_scopeId}>Short Description</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              modelValue: unref(form).shortdes,
              "onUpdate:modelValue": ($event) => unref(form).shortdes = $event,
              rows: "2",
              placeholder: "One-line summary"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-a791353f${_scopeId}><label data-v-a791353f${_scopeId}>Full Description</label>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-a791353f${_scopeId}><label data-v-a791353f${_scopeId}>Features</label><div class="feature-list" data-v-a791353f${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).features, (feat, idx) => {
              _push2(`<div class="feature-row" data-v-a791353f${_scopeId}>`);
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
            _push2(`</div><div class="form-group" data-v-a791353f${_scopeId}><label data-v-a791353f${_scopeId}>Photos</label>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              fallback: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="media-picker-loading" data-v-a791353f${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ProgressSpinner, { style: { "width": "30px", "height": "30px" } }, null, _parent3, _scopeId2));
                  _push3(`<span data-v-a791353f${_scopeId2}>Loading media picker...</span></div>`);
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
            _push2(`</div><div class="form-group" data-v-a791353f${_scopeId}><label data-v-a791353f${_scopeId}>Status</label><div class="status-toggle" data-v-a791353f${_scopeId}>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              modelValue: unref(form).visible,
              "onUpdate:modelValue": ($event) => unref(form).visible = $event
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-a791353f${_scopeId}>${ssrInterpolate(unref(form).visible ? "Visible" : "Hidden")}</span></div></div><div class="form-actions" data-v-a791353f${_scopeId}>`);
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
                      createVNode(HtmlBlockEditor, {
                        modelValue: unref(form).longdes,
                        "onUpdate:modelValue": ($event) => unref(form).longdes = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
const products = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a791353f"]]);

export { products as default };
//# sourceMappingURL=products-DBunUI1V.mjs.map
