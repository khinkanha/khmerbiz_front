import { defineComponent, computed, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useApi } from './auth-CZZkTxj2.mjs';
import { m as useRoute } from './server.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useApi();
    const route = useRoute();
    computed(() => Number(route.params.id));
    const domain = ref(null);
    const editing = ref(false);
    const errorMessage = ref("");
    const allUsers = ref([]);
    const currentAdmin = ref(null);
    const assignForm = ref({ userId: "" });
    const assignMessage = ref("");
    const assignSuccess = ref(false);
    const editForm = ref({
      domain_name: "",
      company_name: "",
      company_address: "",
      company_desc: "",
      email: "",
      phone_number: ""
    });
    const statusText = computed(() => {
      var _a;
      const s = (_a = domain.value) == null ? void 0 : _a.status;
      if (s === 1) return "Active";
      if (s === 2) return "Suspended";
      if (s === 3) return "Expired";
      return "Unknown";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="h2">${ssrInterpolate((_a = unref(domain)) == null ? void 0 : _a.domain_name)}</div>`);
      if (unref(editing)) {
        _push(`<div class="panel panel-warning"><div class="panel-heading">Edit Domain</div><div class="panel-body"><form><div class="row"><div class="col-md-6"><div class="form-group"><label>Domain Name</label><input type="text"${ssrRenderAttr("value", unref(editForm).domain_name)} class="form-control" disabled></div></div><div class="col-md-6"><div class="form-group"><label>Company Name</label><input type="text"${ssrRenderAttr("value", unref(editForm).company_name)} class="form-control"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>Address</label><input type="text"${ssrRenderAttr("value", unref(editForm).company_address)} class="form-control"></div></div><div class="col-md-6"><div class="form-group"><label>Company Description</label><input type="text"${ssrRenderAttr("value", unref(editForm).company_desc)} class="form-control"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>Email</label><input type="email"${ssrRenderAttr("value", unref(editForm).email)} class="form-control"></div></div><div class="col-md-6"><div class="form-group"><label>Phone</label><input type="text"${ssrRenderAttr("value", unref(editForm).phone_number)} class="form-control"></div></div></div>`);
        if (unref(errorMessage)) {
          _push(`<div class="alert alert-danger">${ssrInterpolate(unref(errorMessage))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> Save</button><button type="button" class="btn btn-default">Cancel</button></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(editing)) {
        _push(`<div class="panel panel-info"><div class="panel-heading"> Overview <a href="#"><i class="fa fa-pencil fa-lg"></i></a></div><div class="panel-body"><table class="table"><tbody><tr><td>Company Name</td><td>${ssrInterpolate((_b = unref(domain)) == null ? void 0 : _b.company_name)}</td></tr><tr><td>Phone Number</td><td>${ssrInterpolate((_c = unref(domain)) == null ? void 0 : _c.phone_number)}</td></tr><tr><td>Email Address</td><td>${ssrInterpolate((_d = unref(domain)) == null ? void 0 : _d.email)}</td></tr><tr><td>Company Address</td><td>${ssrInterpolate((_e = unref(domain)) == null ? void 0 : _e.company_address)}</td></tr><tr><td>Status</td><td>${ssrInterpolate(unref(statusText))}</td></tr></tbody></table></div><div class="panel-footer"><button class="btn btn-danger">Suspend</button>\xA0 <button class="btn btn-warning">Activate</button>\xA0 <button class="btn btn-success">Renew</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="panel panel-default" style="${ssrRenderStyle({ "margin-top": "15px" })}"><div class="panel-heading">Assign Domain Admin</div><div class="panel-body"><form class="form-inline"><div class="form-group" style="${ssrRenderStyle({ "margin-right": "10px" })}"><label style="${ssrRenderStyle({ "margin-right": "5px" })}">User:</label><select class="form-control" style="${ssrRenderStyle({ "min-width": "200px" })}"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assignForm).userId) ? ssrLooseContain(unref(assignForm).userId, "") : ssrLooseEqual(unref(assignForm).userId, "")) ? " selected" : ""}>-- Select User --</option><!--[-->`);
      ssrRenderList(unref(allUsers), (u) => {
        _push(`<option${ssrRenderAttr("value", u.userid)}${ssrIncludeBooleanAttr(Array.isArray(unref(assignForm).userId) ? ssrLooseContain(unref(assignForm).userId, u.userid) : ssrLooseEqual(unref(assignForm).userId, u.userid)) ? " selected" : ""}>${ssrInterpolate(u.username)} (${ssrInterpolate(u.full_name)}) - Domain: ${ssrInterpolate(u.domain_id || "None")}</option>`);
      });
      _push(`<!--]--></select></div><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(!unref(assignForm).userId) ? " disabled" : ""}>Assign as Domain Admin</button>`);
      if (unref(assignMessage)) {
        _push(`<span class="${ssrRenderClass(unref(assignSuccess) ? "text-success" : "text-danger")}" style="${ssrRenderStyle({ "margin-left": "10px" })}">${ssrInterpolate(unref(assignMessage))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form>`);
      if (unref(currentAdmin)) {
        _push(`<p style="${ssrRenderStyle({ "margin-top": "10px" })}" class="text-info"> Current domain admin: <strong>${ssrInterpolate(unref(currentAdmin).username)}</strong> (${ssrInterpolate(unref(currentAdmin).full_name)}) </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/super/domains/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CEOrVeRb.mjs.map
