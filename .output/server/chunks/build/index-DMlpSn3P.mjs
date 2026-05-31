import { defineComponent, ref, computed, resolveComponent, resolveDirective, mergeProps, withCtx, isRef, unref, createVNode, withDirectives, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
import { C as ContentType } from './content-BKhKEcUD.mjs';
import { _ as _export_sfc, g as useConfirm, k as useI18n, u as useRouter } from './server.mjs';
import { u as useContentStore } from './content-D4LOINuK.mjs';
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
import './useApi-C5-eJazW.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const contentStore = useContentStore();
    const confirm = useConfirm();
    const { t } = useI18n();
    useRouter();
    const loading = ref(false);
    const searchQuery = ref("");
    const contentTypeFilter = ref(null);
    const statusFilter = ref(null);
    const pagination = computed(() => contentStore.pagination);
    const contentTypeOptions = [
      { label: t("contentManager.article"), value: ContentType.ARTICLE },
      { label: t("contentManager.photo"), value: ContentType.PHOTO },
      { label: t("contentManager.video"), value: ContentType.VIDEO },
      { label: t("contentManager.document"), value: ContentType.DOCUMENT },
      { label: t("contentManager.blogNews"), value: ContentType.NEWS },
      { label: "Map", value: ContentType.MAP }
    ];
    const statusOptions = [
      { label: t("contentManager.published"), value: 1 },
      { label: t("contentManager.draft"), value: 0 }
    ];
    const getContentTypeLabel = (type) => {
      const option = contentTypeOptions.find((opt) => opt.value === type);
      return (option == null ? void 0 : option.label) || "-";
    };
    const onPageChange = (event) => {
      contentStore.fetchContents(event.page + 1, searchQuery.value);
    };
    const handleSearch = () => {
      contentStore.fetchContents(1, searchQuery.value);
    };
    const confirmDelete = (content) => {
      confirm.require({
        message: t("common.confirm"),
        header: t("common.warning"),
        icon: "pi pi-exclamation-triangle",
        accept: () => deleteContent(content.content_id),
        acceptClass: "p-button-danger"
      });
    };
    const deleteContent = async (id) => {
      await contentStore.deleteContent(id);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _component_InputText = resolveComponent("InputText");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_DataTable = resolveComponent("DataTable");
      const _component_Column = resolveComponent("Column");
      const _component_Tag = resolveComponent("Tag");
      const _component_ConfirmDialog = resolveComponent("ConfirmDialog");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-list-page" }, _attrs))} data-v-a0b8d4c7><div class="page-header" data-v-a0b8d4c7><h1 class="page-title" data-v-a0b8d4c7>${ssrInterpolate(_ctx.$t("contentManager.title"))}</h1><div class="page-actions" data-v-a0b8d4c7>`);
      _push(ssrRenderComponent(_component_Button, {
        label: _ctx.$t("contentManager.addNew"),
        icon: "pi pi-plus",
        onClick: ($event) => _ctx.$router.push("/admin/content/new")
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_Card, { class: "filter-card" }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-row" data-v-a0b8d4c7${_scopeId}>`);
            _push2(ssrRenderComponent(_component_InputText, {
              modelValue: unref(searchQuery),
              "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
              placeholder: _ctx.$t("contentManager.search"),
              class: "search-input"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Dropdown, {
              modelValue: unref(contentTypeFilter),
              "onUpdate:modelValue": ($event) => isRef(contentTypeFilter) ? contentTypeFilter.value = $event : null,
              options: contentTypeOptions,
              optionLabel: "label",
              optionValue: "value",
              placeholder: _ctx.$t("contentManager.contentType"),
              class: "filter-dropdown",
              showClear: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Dropdown, {
              modelValue: unref(statusFilter),
              "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
              options: statusOptions,
              optionLabel: "label",
              optionValue: "value",
              placeholder: _ctx.$t("contentManager.status"),
              class: "filter-dropdown",
              showClear: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: _ctx.$t("contentManager.btnsearch"),
              icon: "pi pi-search",
              onClick: handleSearch
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "filter-row" }, [
                createVNode(_component_InputText, {
                  modelValue: unref(searchQuery),
                  "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                  placeholder: _ctx.$t("contentManager.search"),
                  class: "search-input"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                createVNode(_component_Dropdown, {
                  modelValue: unref(contentTypeFilter),
                  "onUpdate:modelValue": ($event) => isRef(contentTypeFilter) ? contentTypeFilter.value = $event : null,
                  options: contentTypeOptions,
                  optionLabel: "label",
                  optionValue: "value",
                  placeholder: _ctx.$t("contentManager.contentType"),
                  class: "filter-dropdown",
                  showClear: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                createVNode(_component_Dropdown, {
                  modelValue: unref(statusFilter),
                  "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                  options: statusOptions,
                  optionLabel: "label",
                  optionValue: "value",
                  placeholder: _ctx.$t("contentManager.status"),
                  class: "filter-dropdown",
                  showClear: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                createVNode(_component_Button, {
                  label: _ctx.$t("contentManager.btnsearch"),
                  icon: "pi pi-search",
                  onClick: handleSearch
                }, null, 8, ["label"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Card, { class: "content-list-card" }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DataTable, {
              value: unref(contentStore).contents,
              loading: unref(loading),
              paginator: true,
              rows: unref(pagination).limit,
              totalRecords: unref(pagination).total,
              lazy: true,
              onPage: onPageChange,
              rowsPerPageOptions: [10, 20, 50],
              stripedRows: "",
              class: "content-table"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "content_id",
                    header: "ID",
                    style: { width: "80px" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "title",
                    header: _ctx.$t("contentManager.contentTitle")
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "content_type",
                    header: _ctx.$t("contentManager.contentType"),
                    style: { width: "150px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Tag, {
                          value: getContentTypeLabel(data.content_type)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Tag, {
                            value: getContentTypeLabel(data.content_type)
                          }, null, 8, ["value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "status",
                    header: _ctx.$t("contentManager.status"),
                    style: { width: "120px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Tag, {
                          value: data.status === 1 ? _ctx.$t("contentManager.published") : _ctx.$t("contentManager.draft"),
                          severity: data.status === 1 ? "success" : "warning"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Tag, {
                            value: data.status === 1 ? _ctx.$t("contentManager.published") : _ctx.$t("contentManager.draft"),
                            severity: data.status === 1 ? "success" : "warning"
                          }, null, 8, ["value", "severity"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    header: _ctx.$t("contentManager.actions"),
                    style: { width: "200px" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="action-buttons" data-v-a0b8d4c7${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Button, mergeProps({
                          icon: "pi pi-pencil",
                          rounded: "",
                          text: "",
                          onClick: ($event) => _ctx.$router.push(`/admin/content/${data.content_id}`)
                        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.$t("contentManager.edit"), void 0, { top: true })), null, _parent4, _scopeId3));
                        if (data.content_type !== unref(ContentType).ARTICLE) {
                          _push4(ssrRenderComponent(_component_Button, mergeProps({
                            icon: "pi pi-list",
                            rounded: "",
                            text: "",
                            onClick: ($event) => _ctx.$router.push(`/admin/content/${data.content_id}/items`)
                          }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.$t("contentManager.list"), void 0, { top: true })), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
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
                              onClick: ($event) => _ctx.$router.push(`/admin/content/${data.content_id}`)
                            }, null, 8, ["onClick"]), [
                              [
                                _directive_tooltip,
                                _ctx.$t("contentManager.edit"),
                                void 0,
                                { top: true }
                              ]
                            ]),
                            data.content_type !== unref(ContentType).ARTICLE ? withDirectives((openBlock(), createBlock(_component_Button, {
                              key: 0,
                              icon: "pi pi-list",
                              rounded: "",
                              text: "",
                              onClick: ($event) => _ctx.$router.push(`/admin/content/${data.content_id}/items`)
                            }, null, 8, ["onClick"])), [
                              [
                                _directive_tooltip,
                                _ctx.$t("contentManager.list"),
                                void 0,
                                { top: true }
                              ]
                            ]) : createCommentVNode("", true),
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
                      field: "content_id",
                      header: "ID",
                      style: { width: "80px" }
                    }),
                    createVNode(_component_Column, {
                      field: "title",
                      header: _ctx.$t("contentManager.contentTitle")
                    }, null, 8, ["header"]),
                    createVNode(_component_Column, {
                      field: "content_type",
                      header: _ctx.$t("contentManager.contentType"),
                      style: { width: "150px" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode(_component_Tag, {
                          value: getContentTypeLabel(data.content_type)
                        }, null, 8, ["value"])
                      ]),
                      _: 1
                    }, 8, ["header"]),
                    createVNode(_component_Column, {
                      field: "status",
                      header: _ctx.$t("contentManager.status"),
                      style: { width: "120px" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode(_component_Tag, {
                          value: data.status === 1 ? _ctx.$t("contentManager.published") : _ctx.$t("contentManager.draft"),
                          severity: data.status === 1 ? "success" : "warning"
                        }, null, 8, ["value", "severity"])
                      ]),
                      _: 1
                    }, 8, ["header"]),
                    createVNode(_component_Column, {
                      header: _ctx.$t("contentManager.actions"),
                      style: { width: "200px" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("div", { class: "action-buttons" }, [
                          withDirectives(createVNode(_component_Button, {
                            icon: "pi pi-pencil",
                            rounded: "",
                            text: "",
                            onClick: ($event) => _ctx.$router.push(`/admin/content/${data.content_id}`)
                          }, null, 8, ["onClick"]), [
                            [
                              _directive_tooltip,
                              _ctx.$t("contentManager.edit"),
                              void 0,
                              { top: true }
                            ]
                          ]),
                          data.content_type !== unref(ContentType).ARTICLE ? withDirectives((openBlock(), createBlock(_component_Button, {
                            key: 0,
                            icon: "pi pi-list",
                            rounded: "",
                            text: "",
                            onClick: ($event) => _ctx.$router.push(`/admin/content/${data.content_id}/items`)
                          }, null, 8, ["onClick"])), [
                            [
                              _directive_tooltip,
                              _ctx.$t("contentManager.list"),
                              void 0,
                              { top: true }
                            ]
                          ]) : createCommentVNode("", true),
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
                value: unref(contentStore).contents,
                loading: unref(loading),
                paginator: true,
                rows: unref(pagination).limit,
                totalRecords: unref(pagination).total,
                lazy: true,
                onPage: onPageChange,
                rowsPerPageOptions: [10, 20, 50],
                stripedRows: "",
                class: "content-table"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Column, {
                    field: "content_id",
                    header: "ID",
                    style: { width: "80px" }
                  }),
                  createVNode(_component_Column, {
                    field: "title",
                    header: _ctx.$t("contentManager.contentTitle")
                  }, null, 8, ["header"]),
                  createVNode(_component_Column, {
                    field: "content_type",
                    header: _ctx.$t("contentManager.contentType"),
                    style: { width: "150px" }
                  }, {
                    body: withCtx(({ data }) => [
                      createVNode(_component_Tag, {
                        value: getContentTypeLabel(data.content_type)
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                  }, 8, ["header"]),
                  createVNode(_component_Column, {
                    field: "status",
                    header: _ctx.$t("contentManager.status"),
                    style: { width: "120px" }
                  }, {
                    body: withCtx(({ data }) => [
                      createVNode(_component_Tag, {
                        value: data.status === 1 ? _ctx.$t("contentManager.published") : _ctx.$t("contentManager.draft"),
                        severity: data.status === 1 ? "success" : "warning"
                      }, null, 8, ["value", "severity"])
                    ]),
                    _: 1
                  }, 8, ["header"]),
                  createVNode(_component_Column, {
                    header: _ctx.$t("contentManager.actions"),
                    style: { width: "200px" }
                  }, {
                    body: withCtx(({ data }) => [
                      createVNode("div", { class: "action-buttons" }, [
                        withDirectives(createVNode(_component_Button, {
                          icon: "pi pi-pencil",
                          rounded: "",
                          text: "",
                          onClick: ($event) => _ctx.$router.push(`/admin/content/${data.content_id}`)
                        }, null, 8, ["onClick"]), [
                          [
                            _directive_tooltip,
                            _ctx.$t("contentManager.edit"),
                            void 0,
                            { top: true }
                          ]
                        ]),
                        data.content_type !== unref(ContentType).ARTICLE ? withDirectives((openBlock(), createBlock(_component_Button, {
                          key: 0,
                          icon: "pi pi-list",
                          rounded: "",
                          text: "",
                          onClick: ($event) => _ctx.$router.push(`/admin/content/${data.content_id}/items`)
                        }, null, 8, ["onClick"])), [
                          [
                            _directive_tooltip,
                            _ctx.$t("contentManager.list"),
                            void 0,
                            { top: true }
                          ]
                        ]) : createCommentVNode("", true),
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
              }, 8, ["value", "loading", "rows", "totalRecords"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/content/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a0b8d4c7"]]);

export { index as default };
//# sourceMappingURL=index-DMlpSn3P.mjs.map
