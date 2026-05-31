import { defineComponent, ref, computed, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import L from 'leaflet';
import { u as useContentStore } from './content-D4LOINuK.mjs';
import { _ as _export_sfc, k as useI18n, l as useRoute } from './server.mjs';
import './useApi-C5-eJazW.mjs';
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
  __name: "map",
  __ssrInlineRender: true,
  setup(__props) {
    const contentStore = useContentStore();
    const { t } = useI18n();
    const route = useRoute();
    const mapRef = ref();
    const saving = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    const mapCenter = ref({ lat: 11.5564, lng: 104.9282 });
    const mapZoom = ref(13);
    const markerPosition = ref(null);
    const markerTitle = ref("");
    const contentId = computed(() => Number(route.params.contentId));
    const handleMapClick = (event) => {
      markerPosition.value = event.latlng;
    };
    const handleMarkerDrag = (event) => {
      markerPosition.value = event.latlng;
    };
    const updateMarkerFromInput = () => {
      if (markerPosition.value) {
        markerPosition.value = L.latLng(mapCenter.value.lat, mapCenter.value.lng);
      }
    };
    const clearMarker = () => {
      markerPosition.value = null;
    };
    const handleSave = async () => {
      successMessage.value = "";
      errorMessage.value = "";
      if (!markerPosition.value) {
        errorMessage.value = "Please click on the map to set a location";
        return;
      }
      saving.value = true;
      try {
        const result = await contentStore.saveMapLocation(contentId.value, {
          lat: mapCenter.value.lat,
          lng: mapCenter.value.lng,
          zoom: mapZoom.value,
          marker: markerTitle.value
        });
        if (result) {
          successMessage.value = t("common.success");
          setTimeout(() => {
            successMessage.value = "";
          }, 3e3);
        } else {
          errorMessage.value = t("common.error");
        }
      } catch (error) {
        errorMessage.value = error.message || t("common.error");
      } finally {
        saving.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _component_InputText = resolveComponent("InputText");
      const _component_InputNumber = resolveComponent("InputNumber");
      const _component_Slider = resolveComponent("Slider");
      const _component_Message = resolveComponent("Message");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "map-editor-page" }, _attrs))} data-v-72bdfced><div class="page-header" data-v-72bdfced><h1 class="page-title" data-v-72bdfced>${ssrInterpolate(_ctx.$t("contentManager.showMap"))}: ${ssrInterpolate((_a = unref(contentStore).currentContent) == null ? void 0 : _a.title)}</h1><div class="page-actions" data-v-72bdfced>`);
      _push(ssrRenderComponent(_component_Button, {
        label: _ctx.$t("common.back"),
        icon: "pi pi-arrow-left",
        outlined: "",
        onClick: ($event) => _ctx.$router.back()
      }, null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        label: _ctx.$t("common.save"),
        icon: "pi pi-check",
        onClick: handleSave,
        loading: unref(saving)
      }, null, _parent));
      _push(`</div></div><div class="map-container" data-v-72bdfced>`);
      _push(ssrRenderComponent(_component_Card, { class: "map-card" }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="map-wrapper" data-v-72bdfced${_scopeId}>`);
            _push2(ssrRenderComponent(unref(LMap), {
              ref_key: "mapRef",
              ref: mapRef,
              zoom: unref(mapZoom),
              center: unref(mapCenter),
              useGlobalLeaflet: false,
              onClick: handleMapClick,
              class: "leaflet-map"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(LTileLayer), {
                    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    attribution: "\xA9 OpenStreetMap"
                  }, null, _parent3, _scopeId2));
                  if (unref(markerPosition)) {
                    _push3(ssrRenderComponent(unref(LMarker), {
                      "lat-lng": unref(markerPosition),
                      draggable: true,
                      onDragend: handleMarkerDrag
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(LPopup), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(markerTitle))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(markerTitle)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(LPopup), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(markerTitle)), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(unref(LTileLayer), {
                      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                      attribution: "\xA9 OpenStreetMap"
                    }),
                    unref(markerPosition) ? (openBlock(), createBlock(unref(LMarker), {
                      key: 0,
                      "lat-lng": unref(markerPosition),
                      draggable: true,
                      onDragend: handleMarkerDrag
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(LPopup), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(markerTitle)), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["lat-lng"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "map-wrapper" }, [
                createVNode(unref(LMap), {
                  ref_key: "mapRef",
                  ref: mapRef,
                  zoom: unref(mapZoom),
                  center: unref(mapCenter),
                  useGlobalLeaflet: false,
                  onClick: handleMapClick,
                  class: "leaflet-map"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(LTileLayer), {
                      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                      attribution: "\xA9 OpenStreetMap"
                    }),
                    unref(markerPosition) ? (openBlock(), createBlock(unref(LMarker), {
                      key: 0,
                      "lat-lng": unref(markerPosition),
                      draggable: true,
                      onDragend: handleMarkerDrag
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(LPopup), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(markerTitle)), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["lat-lng"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["zoom", "center"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Card, { class: "settings-card" }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("settings.otherSetting"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("settings.otherSetting")), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="settings-form" data-v-72bdfced${_scopeId}><div class="form-group" data-v-72bdfced${_scopeId}><label for="markerTitle" data-v-72bdfced${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.contentTitle"))}</label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "markerTitle",
              modelValue: unref(markerTitle),
              "onUpdate:modelValue": ($event) => isRef(markerTitle) ? markerTitle.value = $event : null,
              placeholder: _ctx.$t("contentManager.contentTitle")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-72bdfced${_scopeId}><label data-v-72bdfced${_scopeId}>Latitude</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              modelValue: unref(mapCenter).lat,
              "onUpdate:modelValue": [($event) => unref(mapCenter).lat = $event, updateMarkerFromInput],
              min: -90,
              max: 90,
              decimalPlaces: 6
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-72bdfced${_scopeId}><label data-v-72bdfced${_scopeId}>Longitude</label>`);
            _push2(ssrRenderComponent(_component_InputNumber, {
              modelValue: unref(mapCenter).lng,
              "onUpdate:modelValue": [($event) => unref(mapCenter).lng = $event, updateMarkerFromInput],
              min: -180,
              max: 180,
              decimalPlaces: 6
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-group" data-v-72bdfced${_scopeId}><label data-v-72bdfced${_scopeId}>Zoom Level</label>`);
            _push2(ssrRenderComponent(_component_Slider, {
              modelValue: unref(mapZoom),
              "onUpdate:modelValue": ($event) => isRef(mapZoom) ? mapZoom.value = $event : null,
              min: 1,
              max: 18,
              step: 1
            }, null, _parent2, _scopeId));
            _push2(`<span class="zoom-value" data-v-72bdfced${_scopeId}>${ssrInterpolate(unref(mapZoom))}</span></div>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: _ctx.$t("contentManager.delete"),
              icon: "pi pi-trash",
              outlined: "",
              severity: "danger",
              onClick: clearMarker,
              disabled: !unref(markerPosition),
              class: "w-full"
            }, null, _parent2, _scopeId));
            if (unref(successMessage)) {
              _push2(ssrRenderComponent(_component_Message, {
                severity: "success",
                closable: false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(successMessage))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(successMessage)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(errorMessage)) {
              _push2(ssrRenderComponent(_component_Message, {
                severity: "error",
                closable: false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(errorMessage))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(errorMessage)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "settings-form" }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "markerTitle" }, toDisplayString(_ctx.$t("contentManager.contentTitle")), 1),
                  createVNode(_component_InputText, {
                    id: "markerTitle",
                    modelValue: unref(markerTitle),
                    "onUpdate:modelValue": ($event) => isRef(markerTitle) ? markerTitle.value = $event : null,
                    placeholder: _ctx.$t("contentManager.contentTitle")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "Latitude"),
                  createVNode(_component_InputNumber, {
                    modelValue: unref(mapCenter).lat,
                    "onUpdate:modelValue": [($event) => unref(mapCenter).lat = $event, updateMarkerFromInput],
                    min: -90,
                    max: 90,
                    decimalPlaces: 6
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "Longitude"),
                  createVNode(_component_InputNumber, {
                    modelValue: unref(mapCenter).lng,
                    "onUpdate:modelValue": [($event) => unref(mapCenter).lng = $event, updateMarkerFromInput],
                    min: -180,
                    max: 180,
                    decimalPlaces: 6
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "Zoom Level"),
                  createVNode(_component_Slider, {
                    modelValue: unref(mapZoom),
                    "onUpdate:modelValue": ($event) => isRef(mapZoom) ? mapZoom.value = $event : null,
                    min: 1,
                    max: 18,
                    step: 1
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("span", { class: "zoom-value" }, toDisplayString(unref(mapZoom)), 1)
                ]),
                createVNode(_component_Button, {
                  label: _ctx.$t("contentManager.delete"),
                  icon: "pi pi-trash",
                  outlined: "",
                  severity: "danger",
                  onClick: clearMarker,
                  disabled: !unref(markerPosition),
                  class: "w-full"
                }, null, 8, ["label", "disabled"]),
                unref(successMessage) ? (openBlock(), createBlock(_component_Message, {
                  key: 0,
                  severity: "success",
                  closable: false
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(successMessage)), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                unref(errorMessage) ? (openBlock(), createBlock(_component_Message, {
                  key: 1,
                  severity: "error",
                  closable: false
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(errorMessage)), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/content/[contentId]/map.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const map = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-72bdfced"]]);

export { map as default };
//# sourceMappingURL=map-CAKz5Ccy.mjs.map
