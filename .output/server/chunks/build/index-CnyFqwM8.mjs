import { defineComponent, computed, ref, resolveComponent, unref, withCtx, createVNode, withModifiers, toDisplayString, openBlock, createBlock, createTextVNode, createCommentVNode, readonly, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { m as useToast, f as defineStore } from './server.mjs';
import { a as useAuthStore, u as useApi } from './auth-CZZkTxj2.mjs';
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

const useUserStore = defineStore("user", () => {
  const api = useApi();
  const users = ref([]);
  const search = ref("");
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });
  const fetchUsers = async (page = 1) => {
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "1000");
      const response = await api.get(`/users?${params.toString()}`);
      if (response.success && response.data) {
        users.value = response.data.items || [];
        const pag = response.data.pagination;
        if (pag) {
          pagination.value = {
            page: pag.page,
            limit: pag.limit,
            total: pag.total,
            totalPages: pag.totalPages
          };
        }
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const addUser = async (data) => {
    try {
      const response = await api.post("/users", data);
      if (response.success && response.data) {
        await fetchUsers();
        return { success: true, id: response.data.userid };
      }
      return { success: false, message: response.message };
    } catch (error) {
      console.error("Failed to add user:", error);
      return { success: false, message: "Network error" };
    }
  };
  const updateUser = async (id, data) => {
    console.warn("updateUser: no backend endpoint for generic user update");
    return false;
  };
  const deleteUser = async (id) => {
    console.warn("deleteUser: no backend endpoint for user deletion");
    return false;
  };
  const setUserPassword = async (id, password) => {
    try {
      const response = await api.put(`/users/${id}/password`, { password });
      return response.success;
    } catch (error) {
      console.error("Failed to set user password:", error);
      return false;
    }
  };
  const verifyUser = async (id) => {
    try {
      const response = await api.put(`/users/${id}/verify`, {});
      if (response.success) {
        await fetchUsers();
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      console.error("Failed to verify user:", error);
      return { success: false, message: "Network error" };
    }
  };
  return {
    users: readonly(users),
    search,
    pagination: readonly(pagination),
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    setUserPassword,
    verifyUser
  };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const toast = useToast();
    const isSuperAdmin = computed(() => authStore.isSuperAdmin);
    const showForm = ref(false);
    const showPasswordDialog = ref(false);
    const selectedUser = ref(null);
    const addForm = ref({ username: "", full_name: "", phone: "", email: "", password: "" });
    const passwordForm = ref({ new_password: "" });
    const loading = ref(false);
    const search = ref("");
    const filteredUsers = computed(() => {
      const term = search.value.trim().toLowerCase();
      if (!term) return userStore.users;
      return userStore.users.filter(
        (u) => String(u.username || "").toLowerCase().includes(term) || String(u.full_name || "").toLowerCase().includes(term) || String(u.email || "").toLowerCase().includes(term)
      );
    });
    const verifyUser = async (user) => {
      if (!confirm(`Verify user "${user.username}"? This will allow them to login.`)) return;
      const result = await userStore.verifyUser(user.userid);
      if (result.success) {
        toast.add({ severity: "success", summary: "Verified", detail: `${user.username} can now login`, life: 3e3 });
      } else {
        toast.add({ severity: "error", summary: "Error", detail: result.message || "Failed to verify user", life: 5e3 });
      }
    };
    const openSetPassword = (user) => {
      selectedUser.value = user;
      passwordForm.value = { new_password: "" };
      showPasswordDialog.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_DataTable = resolveComponent("DataTable");
      const _component_Column = resolveComponent("Column");
      _push(`<div${ssrRenderAttrs(_attrs)}><div id="btnnew" style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center", "gap": "10px", "flex-wrap": "wrap" })}"><div class="input-group" style="${ssrRenderStyle({ "flex": "1 1 300px", "max-width": "500px" })}"><span class="input-group-addon"><i class="fa fa-search"></i></span><input type="text"${ssrRenderAttr("value", unref(search))} class="form-control" placeholder="Search username, name, email...">`);
      if (unref(search)) {
        _push(`<span class="input-group-addon" style="${ssrRenderStyle({ "cursor": "pointer" })}"><i class="fa fa-times"></i></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><a href="#" class="btn btn-info"><i class="fa fa-plus"></i> ${ssrInterpolate(_ctx.$t("userManager.addUser"))}</a></div><br>`);
      if (unref(showForm)) {
        _push(`<div class="panel panel-warning"><div class="panel-heading">${ssrInterpolate(_ctx.$t("userManager.addUser"))}</div><div class="panel-body"><form><div class="row"><div class="col-md-6"><div class="form-group"><label>${ssrInterpolate(_ctx.$t("userManager.username"))}</label><input type="text"${ssrRenderAttr("value", unref(addForm).username)} class="form-control" minlength="5"${ssrRenderAttr("placeholder", _ctx.$t("userManager.username"))}></div></div><div class="col-md-6"><div class="form-group"><label>${ssrInterpolate(_ctx.$t("userManager.fullName"))}</label><input type="text"${ssrRenderAttr("value", unref(addForm).full_name)} class="form-control"${ssrRenderAttr("placeholder", _ctx.$t("userManager.fullName"))}></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>${ssrInterpolate(_ctx.$t("userManager.phone"))}</label><input type="text"${ssrRenderAttr("value", unref(addForm).phone)} class="form-control"${ssrRenderAttr("placeholder", _ctx.$t("userManager.phone"))}></div></div><div class="col-md-6"><div class="form-group"><label>${ssrInterpolate(_ctx.$t("userManager.email"))}</label><input type="email"${ssrRenderAttr("value", unref(addForm).email)} class="form-control"${ssrRenderAttr("placeholder", _ctx.$t("userManager.email"))}></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>${ssrInterpolate(_ctx.$t("userManager.password"))}</label><input type="password"${ssrRenderAttr("value", unref(addForm).password)} class="form-control" minlength="6"${ssrRenderAttr("placeholder", _ctx.$t("userManager.password"))}></div></div></div><button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> ${ssrInterpolate(_ctx.$t("userManager.save"))}</button></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_DataTable, {
        value: unref(filteredUsers),
        loading: unref(loading),
        paginator: true,
        rows: 10,
        rowsPerPageOptions: [10, 20, 50],
        stripedRows: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "userid",
              header: "#",
              style: { width: "80px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "username",
              header: _ctx.$t("userManager.username")
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a href="#"${_scopeId2}>${ssrInterpolate(data.username)}</a>`);
                } else {
                  return [
                    createVNode("a", {
                      href: "#",
                      onClick: withModifiers(($event) => openSetPassword(data), ["prevent"])
                    }, toDisplayString(data.username), 9, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "full_name",
              header: _ctx.$t("userManager.fullName")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "phone",
              header: _ctx.$t("userManager.phone")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "email",
              header: _ctx.$t("userManager.email")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              header: "Status",
              style: { width: "100px" }
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (data.is_verified) {
                    _push3(`<span class="label label-success"${_scopeId2}>Verified</span>`);
                  } else {
                    _push3(`<span class="label label-warning"${_scopeId2}>Pending</span>`);
                  }
                } else {
                  return [
                    data.is_verified ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "label label-success"
                    }, "Verified")) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "label label-warning"
                    }, "Pending"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              header: "Actions",
              style: { width: "120px" }
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isSuperAdmin) && !data.is_verified) {
                    _push3(`<button class="btn btn-success btn-xs"${_scopeId2}><i class="fa fa-check"${_scopeId2}></i> Verify </button>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(isSuperAdmin) && !data.is_verified ? (openBlock(), createBlock("button", {
                      key: 0,
                      class: "btn btn-success btn-xs",
                      onClick: ($event) => verifyUser(data)
                    }, [
                      createVNode("i", { class: "fa fa-check" }),
                      createTextVNode(" Verify ")
                    ], 8, ["onClick"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, {
                field: "userid",
                header: "#",
                style: { width: "80px" }
              }),
              createVNode(_component_Column, {
                field: "username",
                header: _ctx.$t("userManager.username")
              }, {
                body: withCtx(({ data }) => [
                  createVNode("a", {
                    href: "#",
                    onClick: withModifiers(($event) => openSetPassword(data), ["prevent"])
                  }, toDisplayString(data.username), 9, ["onClick"])
                ]),
                _: 1
              }, 8, ["header"]),
              createVNode(_component_Column, {
                field: "full_name",
                header: _ctx.$t("userManager.fullName")
              }, null, 8, ["header"]),
              createVNode(_component_Column, {
                field: "phone",
                header: _ctx.$t("userManager.phone")
              }, null, 8, ["header"]),
              createVNode(_component_Column, {
                field: "email",
                header: _ctx.$t("userManager.email")
              }, null, 8, ["header"]),
              createVNode(_component_Column, {
                header: "Status",
                style: { width: "100px" }
              }, {
                body: withCtx(({ data }) => [
                  data.is_verified ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "label label-success"
                  }, "Verified")) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "label label-warning"
                  }, "Pending"))
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                header: "Actions",
                style: { width: "120px" }
              }, {
                body: withCtx(({ data }) => [
                  unref(isSuperAdmin) && !data.is_verified ? (openBlock(), createBlock("button", {
                    key: 0,
                    class: "btn btn-success btn-xs",
                    onClick: ($event) => verifyUser(data)
                  }, [
                    createVNode("i", { class: "fa fa-check" }),
                    createTextVNode(" Verify ")
                  ], 8, ["onClick"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(showPasswordDialog)) {
        _push(`<div style="${ssrRenderStyle({ "position": "fixed", "top": "0", "left": "0", "right": "0", "bottom": "0", "background": "rgba(0,0,0,.5)", "z-index": "9999", "display": "flex", "align-items": "center", "justify-content": "center" })}"><div class="panel panel-default" style="${ssrRenderStyle({ "width": "400px", "margin": "0" })}"><div class="panel-heading">${ssrInterpolate(_ctx.$t("userManager.SettingPasswordForUser"))}: ${ssrInterpolate((_a = unref(selectedUser)) == null ? void 0 : _a.username)}</div><div class="panel-body"><form><div class="form-group"><label>${ssrInterpolate(_ctx.$t("userManager.newPassword"))}</label><input type="password"${ssrRenderAttr("value", unref(passwordForm).new_password)} class="form-control"></div><button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> ${ssrInterpolate(_ctx.$t("userManager.save"))}</button><button type="button" class="btn btn-default">${ssrInterpolate(_ctx.$t("common.cancel"))}</button></form></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CnyFqwM8.mjs.map
