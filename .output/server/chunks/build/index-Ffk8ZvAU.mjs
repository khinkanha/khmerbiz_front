import { defineComponent, ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { u as useApi } from './auth-CZZkTxj2.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useApi();
    const allUsers = ref([]);
    const search = ref("");
    const filteredUsers = computed(() => {
      const term = search.value.trim().toLowerCase();
      if (!term) return allUsers.value;
      return allUsers.value.filter(
        (u) => String(u.username || "").toLowerCase().includes(term) || String(u.full_name || "").toLowerCase().includes(term) || String(u.email || "").toLowerCase().includes(term)
      );
    });
    const showAddForm = ref(false);
    const addErrorMessage = ref("");
    const addForm = ref({ username: "", full_name: "", phone: "", email: "", password: "" });
    const showEditForm = ref(false);
    const editErrorMessage = ref("");
    const editUser = ref(null);
    const editForm = ref({ full_name: "", phone: "", email: "", domain_id: 0, user_level: 2 });
    const showPasswordDialog = ref(false);
    const passwordUser = ref(null);
    const passwordForm = ref({ new_password: "" });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)}><div id="btnnew" style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center", "gap": "10px", "flex-wrap": "wrap" })}"><div class="input-group" style="${ssrRenderStyle({ "flex": "1 1 300px", "max-width": "500px" })}"><span class="input-group-addon"><i class="fa fa-search"></i></span><input type="text"${ssrRenderAttr("value", unref(search))} class="form-control" placeholder="Search username, name, email...">`);
      if (unref(search)) {
        _push(`<span class="input-group-addon" style="${ssrRenderStyle({ "cursor": "pointer" })}"><i class="fa fa-times"></i></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><a href="#" class="btn btn-info"><i class="fa fa-plus"></i> Add User</a></div><br>`);
      if (unref(showAddForm)) {
        _push(`<div class="panel panel-warning"><div class="panel-heading">Add User</div><div class="panel-body"><form><div class="row"><div class="col-md-6"><div class="form-group"><label>Username</label><input type="text"${ssrRenderAttr("value", unref(addForm).username)} class="form-control" placeholder="Username"></div></div><div class="col-md-6"><div class="form-group"><label>Full Name</label><input type="text"${ssrRenderAttr("value", unref(addForm).full_name)} class="form-control" placeholder="Full Name"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>Phone</label><input type="text"${ssrRenderAttr("value", unref(addForm).phone)} class="form-control" placeholder="Phone"></div></div><div class="col-md-6"><div class="form-group"><label>Email</label><input type="email"${ssrRenderAttr("value", unref(addForm).email)} class="form-control" placeholder="Email"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>Password</label><input type="password"${ssrRenderAttr("value", unref(addForm).password)} class="form-control" placeholder="Password"></div></div></div>`);
        if (unref(addErrorMessage)) {
          _push(`<div class="alert alert-danger">${ssrInterpolate(unref(addErrorMessage))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> Save</button><button type="button" class="btn btn-default">Cancel</button></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showEditForm) && unref(editUser)) {
        _push(`<div class="panel panel-info"><div class="panel-heading">Edit User: ${ssrInterpolate(unref(editUser).username)}</div><div class="panel-body"><form><div class="row"><div class="col-md-6"><div class="form-group"><label>Username</label><input type="text"${ssrRenderAttr("value", unref(editUser).username)} class="form-control" disabled></div></div><div class="col-md-6"><div class="form-group"><label>Full Name</label><input type="text"${ssrRenderAttr("value", unref(editForm).full_name)} class="form-control"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>Phone</label><input type="text"${ssrRenderAttr("value", unref(editForm).phone)} class="form-control"></div></div><div class="col-md-6"><div class="form-group"><label>Email</label><input type="email"${ssrRenderAttr("value", unref(editForm).email)} class="form-control"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>Domain ID</label><input type="number"${ssrRenderAttr("value", unref(editForm).domain_id)} class="form-control"></div></div><div class="col-md-6"><div class="form-group"><label>User Level</label><select class="form-control"><option value="-1"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).user_level) ? ssrLooseContain(unref(editForm).user_level, "-1") : ssrLooseEqual(unref(editForm).user_level, "-1")) ? " selected" : ""}>Super Admin</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).user_level) ? ssrLooseContain(unref(editForm).user_level, "1") : ssrLooseEqual(unref(editForm).user_level, "1")) ? " selected" : ""}>Web Admin</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).user_level) ? ssrLooseContain(unref(editForm).user_level, "2") : ssrLooseEqual(unref(editForm).user_level, "2")) ? " selected" : ""}>Normal User</option></select></div></div></div>`);
        if (unref(editErrorMessage)) {
          _push(`<div class="alert alert-danger">${ssrInterpolate(unref(editErrorMessage))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> Save</button><button type="button" class="btn btn-default">Cancel</button></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showPasswordDialog)) {
        _push(`<div style="${ssrRenderStyle({ "position": "fixed", "top": "0", "left": "0", "right": "0", "bottom": "0", "background": "rgba(0,0,0,.5)", "z-index": "9999", "display": "flex", "align-items": "center", "justify-content": "center" })}"><div class="panel panel-default" style="${ssrRenderStyle({ "width": "400px", "margin": "0" })}"><div class="panel-heading">Set Password: ${ssrInterpolate((_a = unref(passwordUser)) == null ? void 0 : _a.username)}</div><div class="panel-body"><form><div class="form-group"><label>New Password</label><input type="password"${ssrRenderAttr("value", unref(passwordForm).new_password)} class="form-control"></div><button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> Save</button><button type="button" class="btn btn-default">Cancel</button></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="table-responsive"><table class="table"><thead><tr><th>#</th><th>Username</th><th>Full Name</th><th>Phone</th><th>Email</th><th>Domain</th><th>Status</th><th>Actions</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(filteredUsers), (user, i) => {
        _push(`<tr><td>${ssrInterpolate(i + 1)}</td><td>${ssrInterpolate(user.username)}</td><td>${ssrInterpolate(user.full_name)}</td><td>${ssrInterpolate(user.phone)}</td><td>${ssrInterpolate(user.email)}</td><td>${ssrInterpolate(user.domain_id)}</td><td>`);
        if (user.is_verified) {
          _push(`<span class="label label-success">Verified</span>`);
        } else {
          _push(`<span class="label label-warning">Pending</span>`);
        }
        _push(`</td><td><a href="#" title="Edit"><i class="fa fa-pencil"></i></a>\xA0 <a href="#" title="Set Password"><i class="fa fa-key"></i></a>\xA0 `);
        if (!user.is_verified) {
          _push(`<a href="#" title="Verify User"><i class="fa fa-check-circle"></i></a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</td></tr>`);
      });
      _push(`<!--]-->`);
      if (unref(filteredUsers).length === 0) {
        _push(`<tr><td colspan="8" class="text-center text-muted">No users match your search.</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/super/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Ffk8ZvAU.mjs.map
