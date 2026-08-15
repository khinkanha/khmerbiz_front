import { _ as __nuxt_component_1 } from './MapPicker-DG-M7TqZ.mjs';
import { defineComponent, ref, computed, resolveComponent, mergeProps, unref, withCtx, isRef, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useContentStore } from './content-C-PHntlj.mjs';
import { _ as _export_sfc, g as useI18n, k as useRoute } from './server.mjs';
import './client-only-Bwxzq3Sq.mjs';
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
  __name: "map",
  __ssrInlineRender: true,
  setup(__props) {
    const contentStore = useContentStore();
    const { t } = useI18n();
    const route = useRoute();
    const saving = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    const mapValue = ref({
      lat: 11.5564,
      lng: 104.9282,
      zoom: 13,
      visible: 1
    });
    const mapDescription = ref("");
    const contentId = computed(() => Number(route.params.contentId));
    const handleSave = async () => {
      var _a;
      successMessage.value = "";
      errorMessage.value = "";
      if (!isFinite(mapValue.value.lat) || !isFinite(mapValue.value.lng)) {
        errorMessage.value = t("contentManager.searchLocation");
        return;
      }
      saving.value = true;
      try {
        const result = await contentStore.saveMapLocation(contentId.value, {
          title: ((_a = contentStore.currentContent) == null ? void 0 : _a.title) || "",
          description: mapDescription.value,
          lat: mapValue.value.lat,
          lng: mapValue.value.lng,
          zoom: mapValue.value.zoom,
          visible: mapValue.value.visible
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
      const _component_Textarea = resolveComponent("Textarea");
      const _component_MapPicker = __nuxt_component_1;
      const _component_Message = resolveComponent("Message");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "map-editor-page" }, _attrs))} data-v-e47dbbe9><div class="page-header" data-v-e47dbbe9><h1 class="page-title" data-v-e47dbbe9>${ssrInterpolate(_ctx.$t("contentManager.showMap"))}: ${ssrInterpolate((_a = unref(contentStore).currentContent) == null ? void 0 : _a.title)}</h1><div class="page-actions" data-v-e47dbbe9>`);
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
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_Card, { class: "map-card" }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="map-form" data-v-e47dbbe9${_scopeId}><div class="form-group" data-v-e47dbbe9${_scopeId}><label for="mapDesc" data-v-e47dbbe9${_scopeId}>${ssrInterpolate(_ctx.$t("contentManager.description"))}</label>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "mapDesc",
              modelValue: unref(mapDescription),
              "onUpdate:modelValue": ($event) => isRef(mapDescription) ? mapDescription.value = $event : null,
              placeholder: _ctx.$t("contentManager.description"),
              rows: "3",
              autoResize: ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_MapPicker, {
              modelValue: unref(mapValue),
              "onUpdate:modelValue": ($event) => isRef(mapValue) ? mapValue.value = $event : null,
              "label-visible": _ctx.$t("contentManager.show"),
              "label-hidden": _ctx.$t("contentManager.notShow")
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "map-form" }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "mapDesc" }, toDisplayString(_ctx.$t("contentManager.description")), 1),
                  createVNode(_component_Textarea, {
                    id: "mapDesc",
                    modelValue: unref(mapDescription),
                    "onUpdate:modelValue": ($event) => isRef(mapDescription) ? mapDescription.value = $event : null,
                    placeholder: _ctx.$t("contentManager.description"),
                    rows: "3",
                    autoResize: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                ]),
                createVNode(_component_MapPicker, {
                  modelValue: unref(mapValue),
                  "onUpdate:modelValue": ($event) => isRef(mapValue) ? mapValue.value = $event : null,
                  "label-visible": _ctx.$t("contentManager.show"),
                  "label-hidden": _ctx.$t("contentManager.notShow")
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label-visible", "label-hidden"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(successMessage)) {
        _push(ssrRenderComponent(_component_Message, {
          severity: "success",
          closable: false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(successMessage))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(successMessage)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMessage)) {
        _push(ssrRenderComponent(_component_Message, {
          severity: "error",
          closable: false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(errorMessage))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(errorMessage)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/content/[contentId]/map.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const map = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e47dbbe9"]]);

export { map as default };
//# sourceMappingURL=map-B5LtwPXM.mjs.map
