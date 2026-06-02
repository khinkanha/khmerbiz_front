import { _ as __nuxt_component_0 } from './nuxt-link-DlwdfiwN.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useApi } from './useApi-C5-eJazW.mjs';
import './server.mjs';
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
  __name: "add",
  __ssrInlineRender: true,
  setup(__props) {
    useApi();
    const errorMessage = ref("");
    const form = ref({
      domain_name: "",
      company_name: "",
      company_desc: "",
      company_address: "",
      email: "",
      phone_number: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "row" }, _attrs))}><div class="col-md-3"><ul class="nav nav-pills nav-stacked"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/super/domains" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Domain List`);
          } else {
            return [
              createTextVNode("Domain List")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="${ssrRenderClass({ active: true })}">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/super/domains/add" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`New Domain`);
          } else {
            return [
              createTextVNode("New Domain")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="col-md-9"><form><div class="row"><div class="col-md-6"><div class="form-group"><label>Domain Name</label><input type="text"${ssrRenderAttr("value", unref(form).domain_name)} class="form-control" placeholder="domain.com"></div></div><div class="col-md-6"><div class="form-group"><label>Company Name</label><input type="text"${ssrRenderAttr("value", unref(form).company_name)} class="form-control" placeholder="Company Name"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>Address</label><input type="text"${ssrRenderAttr("value", unref(form).company_address)} class="form-control" placeholder="Company Address"></div></div><div class="col-md-6"><div class="form-group"><label>Company Description</label><input type="text"${ssrRenderAttr("value", unref(form).company_desc)} class="form-control" placeholder="Company Description"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>Email</label><input type="email"${ssrRenderAttr("value", unref(form).email)} class="form-control" placeholder="you@yourdomain.com"></div></div><div class="col-md-6"><div class="form-group"><label>Phone</label><input type="text"${ssrRenderAttr("value", unref(form).phone_number)} class="form-control" placeholder="XXX-XXX-XXX"></div></div></div>`);
      if (unref(errorMessage)) {
        _push(`<div class="alert alert-danger">${ssrInterpolate(unref(errorMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> Save</button></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/super/domains/add.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=add-D3tSfvkq.mjs.map
