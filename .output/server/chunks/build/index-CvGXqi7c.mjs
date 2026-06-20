import { _ as __nuxt_component_0 } from './nuxt-link-DlwdfiwN.mjs';
import { defineComponent, ref, computed, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, toDisplayString, unref, createVNode, openBlock, createBlock, createCommentVNode, withDirectives, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrGetDirectiveProps, ssrRenderAttr } from 'vue/server-renderer';
import { u as useMenuStore } from './menu-BOTtrAoL.mjs';
import { u as useDomainStore } from './domain-CCktQG6u.mjs';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const menuStore = useMenuStore();
    const domainStore = useDomainStore();
    const loading = ref(false);
    const selectedLangId = ref(0);
    const clearMsg = ref(false);
    computed(() => domainStore.languages);
    const pagination = computed(() => menuStore.pagination);
    const flatMenuItems = computed(() => {
      const flatten = (items, depth = 0) => {
        var _a;
        const result = [];
        for (const item of items) {
          result.push({ ...item, _depth: depth });
          if ((_a = item.children) == null ? void 0 : _a.length) result.push(...flatten(item.children, depth + 1));
        }
        return result;
      };
      return flatten([...menuStore.menuItems]);
    });
    const flagMap = (flag) => {
      const flags = {
        0: "kh.svg",
        1: "en.svg",
        2: "ch.svg",
        3: "th.svg",
        4: "vn.svg",
        5: "fr.svg"
      };
      return flags[flag] || "kh.svg";
    };
    const getLanguageByLangId = (langId) => {
      return domainStore.languages.find((l) => l.lang_id === langId);
    };
    const onPageChange = (event) => {
      loading.value = true;
      menuStore.fetchMenuItems(event.page + 1).finally(() => {
        loading.value = false;
      });
    };
    const confirmDelete = async (item) => {
      if (confirm("Are you sure?")) {
        await menuStore.deleteMenuItem(item.item_id);
        if (selectedLangId.value) await menuStore.fetchMenuTree(selectedLangId.value);
      }
    };
    const handleReorder = async (item, direction) => {
      if (loading.value) return;
      loading.value = true;
      const ok = await menuStore.reorderMenu(item.item_id, direction);
      if (ok) {
        menuStore.clearCache();
        domainStore.clearCache();
      }
      await menuStore.fetchMenuItems(pagination.value.page);
      loading.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_DataTable = resolveComponent("DataTable");
      const _component_Column = resolveComponent("Column");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "row" }, _attrs))} data-v-0e1dce5f><div class="col-md-3" data-v-0e1dce5f><ul class="nav nav-pills nav-stacked" data-v-0e1dce5f><li class="${ssrRenderClass({ active: true })}" data-v-0e1dce5f>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/menu" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("menuManager.listMenu"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("menuManager.listMenu")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-0e1dce5f>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/menu/add" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("menuManager.addMenu"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("menuManager.addMenu")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-0e1dce5f><a href="#" data-v-0e1dce5f>Clear Cache</a></li></ul></div><div class="col-md-9" data-v-0e1dce5f>`);
      if (unref(clearMsg)) {
        _push(`<div class="alert alert-success" data-v-0e1dce5f>Menu Cache has been cleared.</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-right" style="${ssrRenderStyle({ "margin-bottom": "10px" })}" data-v-0e1dce5f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/menu/add",
        class: "btn btn-success"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa fa-plus" data-v-0e1dce5f${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fa fa-plus" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_DataTable, {
        value: unref(flatMenuItems),
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
              header: "#",
              style: { width: "80px" }
            }, {
              body: withCtx(({ index: index2 }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(index2 + 1)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(index2 + 1), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              header: _ctx.$t("menuManager.menuName")
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: `/admin/menu/${data.item_id}`,
                    style: { paddingLeft: `${data._depth * 1.5}rem` }
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (data._depth > 0) {
                          _push4(`<i class="fa fa-angle-right" style="${ssrRenderStyle({ "color": "#a0aec0", "margin-right": "4px" })}" data-v-0e1dce5f${_scopeId3}></i>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` ${ssrInterpolate(data.item_name)}`);
                      } else {
                        return [
                          data._depth > 0 ? (openBlock(), createBlock("i", {
                            key: 0,
                            class: "fa fa-angle-right",
                            style: { "color": "#a0aec0", "margin-right": "4px" }
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(data.item_name), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  if (data.content_id) {
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: `/admin/content/${data.content_id}`,
                      style: { "margin-left": "6px" }
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<i class="fa fa-eye" style="${ssrRenderStyle({ "color": "#3b82f6" })}" data-v-0e1dce5f${_scopeId3}></i>`);
                        } else {
                          return [
                            createVNode("i", {
                              class: "fa fa-eye",
                              style: { "color": "#3b82f6" }
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_NuxtLink, {
                      to: `/admin/menu/${data.item_id}`,
                      style: { paddingLeft: `${data._depth * 1.5}rem` }
                    }, {
                      default: withCtx(() => [
                        data._depth > 0 ? (openBlock(), createBlock("i", {
                          key: 0,
                          class: "fa fa-angle-right",
                          style: { "color": "#a0aec0", "margin-right": "4px" }
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(data.item_name), 1)
                      ]),
                      _: 2
                    }, 1032, ["to", "style"]),
                    data.content_id ? (openBlock(), createBlock(_component_NuxtLink, {
                      key: 0,
                      to: `/admin/content/${data.content_id}`,
                      style: { "margin-left": "6px" }
                    }, {
                      default: withCtx(() => [
                        createVNode("i", {
                          class: "fa fa-eye",
                          style: { "color": "#3b82f6" }
                        })
                      ]),
                      _: 1
                    }, 8, ["to"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              header: _ctx.$t("menuManager.parentMenu")
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(data.parent_name || "\u2014")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(data.parent_name || "\u2014"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "item_order",
              header: _ctx.$t("menuManager.menuOrder"),
              style: { width: "100px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              header: _ctx.$t("menuManager.reorder"),
              style: { width: "90px" }
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="reorder-btns" data-v-0e1dce5f${_scopeId2}><a${ssrRenderAttrs(mergeProps({
                    href: "#",
                    class: ["btn btn-xs btn-default", { disabled: unref(loading) }]
                  }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.$t("menuManager.moveUp"), void 0, { top: true })))} data-v-0e1dce5f${_scopeId2}><i class="fa fa-arrow-up" data-v-0e1dce5f${_scopeId2}></i></a><a${ssrRenderAttrs(mergeProps({
                    href: "#",
                    class: ["btn btn-xs btn-default", { disabled: unref(loading) }]
                  }, ssrGetDirectiveProps(_ctx, _directive_tooltip, _ctx.$t("menuManager.moveDown"), void 0, { top: true })))} data-v-0e1dce5f${_scopeId2}><i class="fa fa-arrow-down" data-v-0e1dce5f${_scopeId2}></i></a></div>`);
                } else {
                  return [
                    createVNode("div", { class: "reorder-btns" }, [
                      withDirectives((openBlock(), createBlock("a", {
                        href: "#",
                        onClick: withModifiers(($event) => handleReorder(data, "up"), ["prevent"]),
                        class: ["btn btn-xs btn-default", { disabled: unref(loading) }]
                      }, [
                        createVNode("i", { class: "fa fa-arrow-up" })
                      ], 10, ["onClick"])), [
                        [
                          _directive_tooltip,
                          _ctx.$t("menuManager.moveUp"),
                          void 0,
                          { top: true }
                        ]
                      ]),
                      withDirectives((openBlock(), createBlock("a", {
                        href: "#",
                        onClick: withModifiers(($event) => handleReorder(data, "down"), ["prevent"]),
                        class: ["btn btn-xs btn-default", { disabled: unref(loading) }]
                      }, [
                        createVNode("i", { class: "fa fa-arrow-down" })
                      ], 10, ["onClick"])), [
                        [
                          _directive_tooltip,
                          _ctx.$t("menuManager.moveDown"),
                          void 0,
                          { top: true }
                        ]
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              header: _ctx.$t("menuManager.language"),
              style: { width: "80px" }
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (getLanguageByLangId(data.lang_id)) {
                    _push3(`<img${ssrRenderAttr("src", `/flag/${flagMap(getLanguageByLangId(data.lang_id).flag)}`)} style="${ssrRenderStyle({ "width": "20px", "height": "14px", "border-radius": "2px" })}" data-v-0e1dce5f${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    getLanguageByLangId(data.lang_id) ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: `/flag/${flagMap(getLanguageByLangId(data.lang_id).flag)}`,
                      style: { "width": "20px", "height": "14px", "border-radius": "2px" }
                    }, null, 8, ["src"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, { style: { width: "80px" } }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a href="#" class="text-danger" data-v-0e1dce5f${_scopeId2}>${ssrInterpolate(_ctx.$t("menuManager.delete"))}</a>`);
                } else {
                  return [
                    createVNode("a", {
                      href: "#",
                      onClick: withModifiers(($event) => confirmDelete(data), ["prevent"]),
                      class: "text-danger"
                    }, toDisplayString(_ctx.$t("menuManager.delete")), 9, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, {
                header: "#",
                style: { width: "80px" }
              }, {
                body: withCtx(({ index: index2 }) => [
                  createTextVNode(toDisplayString(index2 + 1), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                header: _ctx.$t("menuManager.menuName")
              }, {
                body: withCtx(({ data }) => [
                  createVNode(_component_NuxtLink, {
                    to: `/admin/menu/${data.item_id}`,
                    style: { paddingLeft: `${data._depth * 1.5}rem` }
                  }, {
                    default: withCtx(() => [
                      data._depth > 0 ? (openBlock(), createBlock("i", {
                        key: 0,
                        class: "fa fa-angle-right",
                        style: { "color": "#a0aec0", "margin-right": "4px" }
                      })) : createCommentVNode("", true),
                      createTextVNode(" " + toDisplayString(data.item_name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to", "style"]),
                  data.content_id ? (openBlock(), createBlock(_component_NuxtLink, {
                    key: 0,
                    to: `/admin/content/${data.content_id}`,
                    style: { "margin-left": "6px" }
                  }, {
                    default: withCtx(() => [
                      createVNode("i", {
                        class: "fa fa-eye",
                        style: { "color": "#3b82f6" }
                      })
                    ]),
                    _: 1
                  }, 8, ["to"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, {
                header: _ctx.$t("menuManager.parentMenu")
              }, {
                body: withCtx(({ data }) => [
                  createTextVNode(toDisplayString(data.parent_name || "\u2014"), 1)
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, {
                field: "item_order",
                header: _ctx.$t("menuManager.menuOrder"),
                style: { width: "100px" }
              }, null, 8, ["header"]),
              createVNode(_component_Column, {
                header: _ctx.$t("menuManager.reorder"),
                style: { width: "90px" }
              }, {
                body: withCtx(({ data }) => [
                  createVNode("div", { class: "reorder-btns" }, [
                    withDirectives((openBlock(), createBlock("a", {
                      href: "#",
                      onClick: withModifiers(($event) => handleReorder(data, "up"), ["prevent"]),
                      class: ["btn btn-xs btn-default", { disabled: unref(loading) }]
                    }, [
                      createVNode("i", { class: "fa fa-arrow-up" })
                    ], 10, ["onClick"])), [
                      [
                        _directive_tooltip,
                        _ctx.$t("menuManager.moveUp"),
                        void 0,
                        { top: true }
                      ]
                    ]),
                    withDirectives((openBlock(), createBlock("a", {
                      href: "#",
                      onClick: withModifiers(($event) => handleReorder(data, "down"), ["prevent"]),
                      class: ["btn btn-xs btn-default", { disabled: unref(loading) }]
                    }, [
                      createVNode("i", { class: "fa fa-arrow-down" })
                    ], 10, ["onClick"])), [
                      [
                        _directive_tooltip,
                        _ctx.$t("menuManager.moveDown"),
                        void 0,
                        { top: true }
                      ]
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, {
                header: _ctx.$t("menuManager.language"),
                style: { width: "80px" }
              }, {
                body: withCtx(({ data }) => [
                  getLanguageByLangId(data.lang_id) ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: `/flag/${flagMap(getLanguageByLangId(data.lang_id).flag)}`,
                    style: { "width": "20px", "height": "14px", "border-radius": "2px" }
                  }, null, 8, ["src"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, { style: { width: "80px" } }, {
                body: withCtx(({ data }) => [
                  createVNode("a", {
                    href: "#",
                    onClick: withModifiers(($event) => confirmDelete(data), ["prevent"]),
                    class: "text-danger"
                  }, toDisplayString(_ctx.$t("menuManager.delete")), 9, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/menu/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e1dce5f"]]);

export { index as default };
//# sourceMappingURL=index-CvGXqi7c.mjs.map
