import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { defineComponent, computed, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MapPicker",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    labelVisible: { default: "Show map on site" },
    labelHidden: { default: "Map hidden" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    computed(() => isFinite(props.modelValue.lat) && isFinite(props.modelValue.lng));
    const patch = (changes) => {
      emit("update:modelValue", { ...props.modelValue, ...changes });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      const _component_InputNumber = resolveComponent("InputNumber");
      const _component_Slider = resolveComponent("Slider");
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "map-picker" }, _attrs))} data-v-68667398><div class="map-wrapper" data-v-68667398>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="map-fallback" data-v-68667398${_scopeId}>Loading map\u2026</div>`);
          } else {
            return [
              createVNode("div", { class: "map-fallback" }, "Loading map\u2026")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="map-controls" data-v-68667398><div class="form-row" data-v-68667398><div class="form-group" data-v-68667398><label data-v-68667398>Latitude</label>`);
      _push(ssrRenderComponent(_component_InputNumber, {
        modelValue: __props.modelValue.lat,
        min: -90,
        max: 90,
        maxFractionDigits: 6,
        "onUpdate:modelValue": (v) => patch({ lat: v })
      }, null, _parent));
      _push(`</div><div class="form-group" data-v-68667398><label data-v-68667398>Longitude</label>`);
      _push(ssrRenderComponent(_component_InputNumber, {
        modelValue: __props.modelValue.lng,
        min: -180,
        max: 180,
        maxFractionDigits: 6,
        "onUpdate:modelValue": (v) => patch({ lng: v })
      }, null, _parent));
      _push(`</div></div><div class="form-group" data-v-68667398><label data-v-68667398>Zoom Level</label><div class="zoom-row" data-v-68667398>`);
      _push(ssrRenderComponent(_component_Slider, {
        modelValue: __props.modelValue.zoom,
        min: 1,
        max: 18,
        step: 1,
        "onUpdate:modelValue": (v) => patch({ zoom: v })
      }, null, _parent));
      _push(`<span class="zoom-value" data-v-68667398>${ssrInterpolate(__props.modelValue.zoom)}</span></div></div><div class="visibility-toggle" data-v-68667398>`);
      _push(ssrRenderComponent(_component_ToggleSwitch, {
        modelValue: __props.modelValue.visible,
        "onUpdate:modelValue": (v) => patch({ visible: Number(v) }),
        trueValue: 1,
        falseValue: 0
      }, null, _parent));
      _push(`<span data-v-68667398>${ssrInterpolate(__props.modelValue.visible === 1 ? __props.labelVisible : __props.labelHidden)}</span></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/MapPicker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-68667398"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=MapPicker-DG-M7TqZ.mjs.map
