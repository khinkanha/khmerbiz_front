import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { defineComponent, ref, computed, resolveComponent, resolveDirective, mergeProps, unref, withCtx, openBlock, createBlock, createTextVNode, toDisplayString, createVNode, withDirectives, isRef, withModifiers, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrGetDirectiveProps } from 'vue/server-renderer';
import { _ as _export_sfc, g as useConfirm, k as useI18n, u as useRouter, l as useRoute, b as useRuntimeConfig } from './server.mjs';
import TinyMCEEditor from '@tinymce/tinymce-vue';
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
import './auth-CZZkTxj2.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "news",
  __ssrInlineRender: true,
  setup(__props) {
    const contentStore = useContentStore();
    const confirm = useConfirm();
    const { t } = useI18n();
    useRouter();
    const route = useRoute();
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl || "https://khmer.biz";
    const loading = ref(false);
    const showAddDialog = ref(false);
    const editingNews = ref(null);
    const saving = ref(false);
    const newsForm = ref({
      title: "",
      short_description: "",
      description: "",
      photo: null,
      photoPreview: "",
      publish_date: /* @__PURE__ */ new Date(),
      status: true
    });
    const newsErrors = ref({});
    const contentId = computed(() => Number(route.params.contentId));
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    };
    const validateNewsForm = () => {
      newsErrors.value = {};
      if (!newsForm.value.title) {
        newsErrors.value.title = t("validation.required");
      }
      if (!newsForm.value.short_description) {
        newsErrors.value.short_description = t("validation.required");
      }
      if (!newsForm.value.description) {
        newsErrors.value.description = t("validation.required");
      }
      return Object.keys(newsErrors.value).length === 0;
    };
    const handlePhotoSelect = (event) => {
      const file = event.files[0];
      if (file) {
        newsForm.value.photo = file;
        newsForm.value.photoPreview = URL.createObjectURL(file);
      }
    };
    const clearPhoto = () => {
      newsForm.value.photo = null;
      newsForm.value.photoPreview = "";
    };
    const editNews = (news2) => {
      editingNews.value = news2;
      newsForm.value = {
        title: news2.title,
        short_description: news2.short_description || "",
        description: news2.description || "",
        photo: null,
        photoPreview: news2.photo ? `${photoUrl}${news2.photo}` : "",
        publish_date: news2.publish_date ? new Date(news2.publish_date) : /* @__PURE__ */ new Date(),
        status: news2.status !== 1
      };
      showAddDialog.value = true;
    };
    const closeDialog = () => {
      showAddDialog.value = false;
      editingNews.value = null;
      newsForm.value = {
        title: "",
        short_description: "",
        description: "",
        photo: null,
        photoPreview: "",
        publish_date: /* @__PURE__ */ new Date(),
        status: true
      };
      newsErrors.value = {};
    };
    const handleSaveNews = async () => {
      if (!validateNewsForm()) {
        return;
      }
      saving.value = true;
      try {
        const publishDate = newsForm.value.publish_date ? newsForm.value.publish_date.toISOString().slice(0, 19).replace("T", " ") : void 0;
        const data = {
          title: newsForm.value.title,
          short_description: newsForm.value.short_description,
          description: newsForm.value.description,
          photo: newsForm.value.photo,
          publish_date: publishDate,
          status: newsForm.value.status ? 0 : 1
        };
        let result;
        if (editingNews.value) {
          result = await contentStore.updateNews(contentId.value, editingNews.value.news_id, data);
        } else {
          result = await contentStore.saveNews(contentId.value, data);
        }
        if (result === true || typeof result === "object" && result.success) {
          await contentStore.fetchNews(contentId.value);
          closeDialog();
        }
      } finally {
        saving.value = false;
      }
    };
    const confirmDelete = (news2) => {
      confirm.require({
        message: t("common.confirm"),
        header: t("common.warning"),
        icon: "pi pi-exclamation-triangle",
        accept: () => deleteNews(news2.news_id),
        acceptClass: "p-button-danger"
      });
    };
    const deleteNews = async (id) => {
      await contentStore.deleteNews(contentId.value, id);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _component_DataTable = resolveComponent("DataTable");
      const _component_Column = resolveComponent("Column");
      const _component_Tag = resolveComponent("Tag");
      const _component_Dialog = resolveComponent("Dialog");
      const _component_InputText = resolveComponent("InputText");
      const _component_Textarea = resolveComponent("Textarea");
      const _component_ClientOnly = __nuxt_component_0;
      const _component_FileUpload = resolveComponent("FileUpload");
      const _component_Calendar = resolveComponent("Calendar");
      const _component_InputSwitch = resolveComponent("InputSwitch");
      const _component_ConfirmDialog = resolveComponent("ConfirmDialog");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "news-page" }, _attrs))} data-v-794707f3><div class="page-header" data-v-794707f3><h1 class="page-title" data-v-794707f3>${ssrInterpolate(_ctx.$t("contentManager.blogNews"))}: ${ssrInterpolate((_a = unref(contentStore).currentContent) == null ? void 0 : _a.title)}</h1><div class="page-actions" data-v-794707f3>`);
      _push(ssrRenderComponent(_component_Button, {
        label: _ctx.$t("contentManager.addNew"),
        icon: "pi pi-plus",
        onClick: ($event) => showAddDialog.value = true
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_Card, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DataTable, {
              value: unref(contentStore).newsList,
              loading: unref(loading),
              paginator: true,
              rows: 20,
              stripedRows: "",
              class: "news-table"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "news_id",
                    header: "ID",
                    style: { width: "80px" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "title",
                    header: _ctx.$t("contentManager.contentTitle")
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "photo",
                    header: _ctx.$t("contentManager.primaryImage"),
                    style: { width: "120px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (data.photo) {
                          _push4(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${data.photo}`)}${ssrRenderAttr("alt", data.title)} class="news-thumb" data-v-794707f3${_scopeId3}>`);
                        } else {
                          _push4(`<span data-v-794707f3${_scopeId3}>-</span>`);
                        }
                      } else {
                        return [
                          data.photo ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: `${unref(photoUrl)}${data.photo}`,
                            alt: data.title,
                            class: "news-thumb"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "publish_date",
                    header: _ctx.$t("contentManager.publishDate"),
                    style: { width: "150px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(formatDate(data.publish_date))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(formatDate(data.publish_date)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "status",
                    header: _ctx.$t("contentManager.status") || "Status",
                    style: { width: "100px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Tag, {
                          value: data.status === 1 ? _ctx.$t("contentManager.notShow") || "Not Show" : _ctx.$t("contentManager.show") || "Show",
                          severity: data.status === 1 ? "secondary" : "success"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Tag, {
                            value: data.status === 1 ? _ctx.$t("contentManager.notShow") || "Not Show" : _ctx.$t("contentManager.show") || "Show",
                            severity: data.status === 1 ? "secondary" : "success"
                          }, null, 8, ["value", "severity"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    header: _ctx.$t("contentManager.actions"),
                    style: { width: "150px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="action-buttons" data-v-794707f3${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Button, mergeProps({
                          icon: "pi pi-pencil",
                          rounded: "",
                          text: "",
                          onClick: ($event) => editNews(data)
                        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.$t("contentManager.edit"), void 0, { top: true })), null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Button, mergeProps({
                          icon: "pi pi-trash",
                          rounded: "",
                          text: "",
                          severity: "danger",
                          onClick: ($event) => confirmDelete(data)
                        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.$t("contentManager.delete"), void 0, { top: true })), null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "action-buttons" }, [
                            withDirectives(createVNode(_component_Button, {
                              icon: "pi pi-pencil",
                              rounded: "",
                              text: "",
                              onClick: ($event) => editNews(data)
                            }, null, 8, ["onClick"]), [
                              [
                                _directive_tooltip,
                                _ctx.$t("contentManager.edit"),
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
                                _ctx.$t("contentManager.delete"),
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
                      field: "news_id",
                      header: "ID",
                      style: { width: "80px" }
                    }),
                    createVNode(_component_Column, {
                      field: "title",
                      header: _ctx.$t("contentManager.contentTitle")
                    }, null, 8, ["header"]),
                    createVNode(_component_Column, {
                      field: "photo",
                      header: _ctx.$t("contentManager.primaryImage"),
                      style: { width: "120px" }
                    }, {
                      body: withCtx(({ data }) => [
                        data.photo ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: `${unref(photoUrl)}${data.photo}`,
                          alt: data.title,
                          class: "news-thumb"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                      ]),
                      _: 1
                    }, 8, ["header"]),
                    createVNode(_component_Column, {
                      field: "publish_date",
                      header: _ctx.$t("contentManager.publishDate"),
                      style: { width: "150px" }
                    }, {
                      body: withCtx(({ data }) => [
                        createTextVNode(toDisplayString(formatDate(data.publish_date)), 1)
                      ]),
                      _: 1
                    }, 8, ["header"]),
                    createVNode(_component_Column, {
                      field: "status",
                      header: _ctx.$t("contentManager.status") || "Status",
                      style: { width: "100px" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode(_component_Tag, {
                          value: data.status === 1 ? _ctx.$t("contentManager.notShow") || "Not Show" : _ctx.$t("contentManager.show") || "Show",
                          severity: data.status === 1 ? "secondary" : "success"
                        }, null, 8, ["value", "severity"])
                      ]),
                      _: 1
                    }, 8, ["header"]),
                    createVNode(_component_Column, {
                      header: _ctx.$t("contentManager.actions"),
                      style: { width: "150px" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("div", { class: "action-buttons" }, [
                          withDirectives(createVNode(_component_Button, {
                            icon: "pi pi-pencil",
                            rounded: "",
                            text: "",
                            onClick: ($event) => editNews(data)
                          }, null, 8, ["onClick"]), [
                            [
                              _directive_tooltip,
                              _ctx.$t("contentManager.edit"),
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
                              _ctx.$t("contentManager.delete"),
                              void 0,
                              { top: true }
                            ]
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["header"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DataTable, {
                value: unref(contentStore).newsList,
                loading: unref(loading),
                paginator: true,
                rows: 20,
                stripedRows: "",
                class: "news-table"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Column, {
                    field: "news_id",
                    header: "ID",
                    style: { width: "80px" }
                  }),
                  createVNode(_component_Column, {
                    field: "title",
                    header: _ctx.$t("contentManager.contentTitle")
                  }, null, 8, ["header"]),
                  createVNode(_component_Column, {
                    field: "photo",
                    header: _ctx.$t("contentManager.primaryImage"),
                    style: { width: "120px" }
                  }, {
                    body: withCtx(({ data }) => [
                      data.photo ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `${unref(photoUrl)}${data.photo}`,
                        alt: data.title,
                        class: "news-thumb"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                    ]),
                    _: 1
                  }, 8, ["header"]),
                  createVNode(_component_Column, {
                    field: "publish_date",
                    header: _ctx.$t("contentManager.publishDate"),
                    style: { width: "150px" }
                  }, {
                    body: withCtx(({ data }) => [
                      createTextVNode(toDisplayString(formatDate(data.publish_date)), 1)
                    ]),
                    _: 1
                  }, 8, ["header"]),
                  createVNode(_component_Column, {
                    field: "status",
                    header: _ctx.$t("contentManager.status") || "Status",
                    style: { width: "100px" }
                  }, {
                    body: withCtx(({ data }) => [
                      createVNode(_component_Tag, {
                        value: data.status === 1 ? _ctx.$t("contentManager.notShow") || "Not Show" : _ctx.$t("contentManager.show") || "Show",
                        severity: data.status === 1 ? "secondary" : "success"
                      }, null, 8, ["value", "severity"])
                    ]),
                    _: 1
                  }, 8, ["header"]),
                  createVNode(_component_Column, {
                    header: _ctx.$t("contentManager.actions"),
                    style: { width: "150px" }
                  }, {
                    body: withCtx(({ data }) => [
                      createVNode("div", { class: "action-buttons" }, [
                        withDirectives(createVNode(_component_Button, {
                          icon: "pi pi-pencil",
                          rounded: "",
                          text: "",
                          onClick: ($event) => editNews(data)
                        }, null, 8, ["onClick"]), [
                          [
                            _directive_tooltip,
                            _ctx.$t("contentManager.edit"),
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
                            _ctx.$t("contentManager.delete"),
                            void 0,
                            { top: true }
                          ]
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["header"])
                ]),
                _: 1
              }, 8, ["value", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        visible: unref(showAddDialog),
        "onUpdate:visible": ($event) => isRef(showAddDialog) ? showAddDialog.value = $event : null,
        header: unref(editingNews) ? _ctx.$t("contentManager.edit") : _ctx.$t("contentManager.addNew"),
        style: { width: "600px" },
        modal: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="news-form" data-v-794707f3${_scopeId}><div class="form-group" data-v-794707f3${_scopeId}><label for="newsTitle" data-v-794707f3${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.contentTitle"))} *</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "newsTitle",
              modelValue: unref(newsForm).title,
              "onUpdate:modelValue": ($event) => unref(newsForm).title = $event,
              placeholder: _ctx.$t("contentManager.contentTitle"),
              class: { "p-invalid": unref(newsErrors).title }
            }, null, _parent2, _scopeId));
            if (unref(newsErrors).title) {
              _push2(`<small class="p-error" data-v-794707f3${_scopeId}>${ssrInterpolate(unref(newsErrors).title)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-794707f3${_scopeId}><label for="shortDescription" data-v-794707f3${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.shortDescription"))} *</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "shortDescription",
              modelValue: unref(newsForm).short_description,
              "onUpdate:modelValue": ($event) => unref(newsForm).short_description = $event,
              rows: "3",
              placeholder: _ctx.$t("contentManager.shortDescription"),
              class: { "p-invalid": unref(newsErrors).short_description }
            }, null, _parent2, _scopeId));
            if (unref(newsErrors).short_description) {
              _push2(`<small class="p-error" data-v-794707f3${_scopeId}>${ssrInterpolate(unref(newsErrors).short_description)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-794707f3${_scopeId}><label for="description" data-v-794707f3${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.description"))} *</label>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            if (unref(newsErrors).description) {
              _push2(`<small class="p-error" data-v-794707f3${_scopeId}>${ssrInterpolate(unref(newsErrors).description)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-794707f3${_scopeId}><label for="newsPhoto" data-v-794707f3${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.primaryImage"))}</label>`);
            _push2(ssrRenderComponent(_component_FileUpload, {
              mode: "basic",
              customUpload: true,
              onSelect: handlePhotoSelect,
              auto: false,
              accept: "image/*",
              chooseLabel: "Choose Image"
            }, null, _parent2, _scopeId));
            if (unref(newsForm).photoPreview) {
              _push2(`<div class="photo-preview" data-v-794707f3${_scopeId}><img${ssrRenderAttr("src", unref(newsForm).photoPreview)} alt="Preview" data-v-794707f3${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, {
                icon: "pi pi-times",
                rounded: "",
                text: "",
                severity: "danger",
                onClick: clearPhoto,
                class: "remove-photo"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-794707f3${_scopeId}><label for="publishDate" data-v-794707f3${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.publishDate"))}</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              id: "publishDate",
              modelValue: unref(newsForm).publish_date,
              "onUpdate:modelValue": ($event) => unref(newsForm).publish_date = $event,
              showTime: "",
              hourFormat: "12",
              dateFormat: "yy-mm-dd"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-794707f3${_scopeId}><label for="newsStatus" data-v-794707f3${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.status") || "Status")}</label><div class="status-toggle" data-v-794707f3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_InputSwitch, {
              id: "newsStatus",
              modelValue: unref(newsForm).status,
              "onUpdate:modelValue": ($event) => unref(newsForm).status = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="status-label" data-v-794707f3${_scopeId}>${ssrInterpolate(unref(newsForm).status ? _ctx.$t("contentManager.show") || "Show" : _ctx.$t("contentManager.notShow") || "Not Show")}</span></div></div><div class="form-actions" data-v-794707f3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: _ctx.$t("common.cancel"),
              outlined: "",
              onClick: closeDialog
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              label: _ctx.$t("common.save"),
              loading: unref(saving)
            }, null, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(handleSaveNews, ["prevent"]),
                class: "news-form"
              }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "newsTitle" }, toDisplayString(_ctx.$t("contentManager.contentTitle")) + " *", 1),
                  createVNode(_component_InputText, {
                    id: "newsTitle",
                    modelValue: unref(newsForm).title,
                    "onUpdate:modelValue": ($event) => unref(newsForm).title = $event,
                    placeholder: _ctx.$t("contentManager.contentTitle"),
                    class: { "p-invalid": unref(newsErrors).title }
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "class"]),
                  unref(newsErrors).title ? (openBlock(), createBlock("small", {
                    key: 0,
                    class: "p-error"
                  }, toDisplayString(unref(newsErrors).title), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "shortDescription" }, toDisplayString(_ctx.$t("contentManager.shortDescription")) + " *", 1),
                  createVNode(_component_Textarea, {
                    id: "shortDescription",
                    modelValue: unref(newsForm).short_description,
                    "onUpdate:modelValue": ($event) => unref(newsForm).short_description = $event,
                    rows: "3",
                    placeholder: _ctx.$t("contentManager.shortDescription"),
                    class: { "p-invalid": unref(newsErrors).short_description }
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "class"]),
                  unref(newsErrors).short_description ? (openBlock(), createBlock("small", {
                    key: 0,
                    class: "p-error"
                  }, toDisplayString(unref(newsErrors).short_description), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "description" }, toDisplayString(_ctx.$t("contentManager.description")) + " *", 1),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(unref(TinyMCEEditor), {
                        modelValue: unref(newsForm).description,
                        "onUpdate:modelValue": ($event) => unref(newsForm).description = $event,
                        tinymceScriptSrc: "/tinymce/tinymce.min.js",
                        init: {
                          height: 300,
                          menubar: "tools",
                          plugins: "advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste",
                          toolbar: "undo redo | bold italic underline | forecolor backcolor | fontselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | fullscreen",
                          branding: false,
                          promotion: false,
                          relative_urls: false,
                          remove_script_host: false,
                          document_base_url: unref(photoUrl)
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "init"])
                    ]),
                    _: 1
                  }),
                  unref(newsErrors).description ? (openBlock(), createBlock("small", {
                    key: 0,
                    class: "p-error"
                  }, toDisplayString(unref(newsErrors).description), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "newsPhoto" }, toDisplayString(_ctx.$t("contentManager.primaryImage")), 1),
                  createVNode(_component_FileUpload, {
                    mode: "basic",
                    customUpload: true,
                    onSelect: handlePhotoSelect,
                    auto: false,
                    accept: "image/*",
                    chooseLabel: "Choose Image"
                  }),
                  unref(newsForm).photoPreview ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "photo-preview"
                  }, [
                    createVNode("img", {
                      src: unref(newsForm).photoPreview,
                      alt: "Preview"
                    }, null, 8, ["src"]),
                    createVNode(_component_Button, {
                      icon: "pi pi-times",
                      rounded: "",
                      text: "",
                      severity: "danger",
                      onClick: clearPhoto,
                      class: "remove-photo"
                    })
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "publishDate" }, toDisplayString(_ctx.$t("contentManager.publishDate")), 1),
                  createVNode(_component_Calendar, {
                    id: "publishDate",
                    modelValue: unref(newsForm).publish_date,
                    "onUpdate:modelValue": ($event) => unref(newsForm).publish_date = $event,
                    showTime: "",
                    hourFormat: "12",
                    dateFormat: "yy-mm-dd"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "newsStatus" }, toDisplayString(_ctx.$t("contentManager.status") || "Status"), 1),
                  createVNode("div", { class: "status-toggle" }, [
                    createVNode(_component_InputSwitch, {
                      id: "newsStatus",
                      modelValue: unref(newsForm).status,
                      "onUpdate:modelValue": ($event) => unref(newsForm).status = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("span", { class: "status-label" }, toDisplayString(unref(newsForm).status ? _ctx.$t("contentManager.show") || "Show" : _ctx.$t("contentManager.notShow") || "Not Show"), 1)
                  ])
                ]),
                createVNode("div", { class: "form-actions" }, [
                  createVNode(_component_Button, {
                    type: "button",
                    label: _ctx.$t("common.cancel"),
                    outlined: "",
                    onClick: closeDialog
                  }, null, 8, ["label"]),
                  createVNode(_component_Button, {
                    type: "submit",
                    label: _ctx.$t("common.save"),
                    loading: unref(saving)
                  }, null, 8, ["label", "loading"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ConfirmDialog, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/content/[contentId]/news.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const news = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-794707f3"]]);

export { news as default };
//# sourceMappingURL=news-Dfs3qfed.mjs.map
