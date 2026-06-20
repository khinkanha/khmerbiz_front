import { _ as __nuxt_component_0 } from './nuxt-link-DlwdfiwN.mjs';
import { defineComponent, ref, reactive, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useSetup } from './useSetup-CcxEtI0l.mjs';
import { a as useAuthStore } from './auth-CZZkTxj2.mjs';
import { u as useDomainStore } from './domain-CCktQG6u.mjs';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "setup",
  __ssrInlineRender: true,
  setup(__props) {
    const domainStore = useDomainStore();
    const { setupStatus: status, loading, fetchStatus, createLanguage, createMenus, updateSiteTitle, createContent } = useSetup();
    useAuthStore();
    const stepLoading = ref(null);
    const flagOptions = [
      { label: "\u1781\u17D2\u1798\u17C2\u179A (Khmer)", value: 0 },
      { label: "English", value: 1 },
      { label: "\u4E2D\u6587 (Chinese)", value: 2 },
      { label: "\u0E44\u0E17\u0E22 (Thai)", value: 3 },
      { label: "Ti\u1EBFng Vi\u1EC7t (Vietnamese)", value: 4 }
    ];
    const langForm = reactive({
      lang_name: "",
      flag: null
    });
    const menuForm = reactive({
      siteTitle: "",
      menus: [
        { name: "Home", checked: true },
        { name: "About Us", checked: true },
        { name: "Service", checked: true },
        { name: "Contact Us", checked: true }
      ]
    });
    const contentForm = reactive({
      menu_id: null,
      title: "",
      description: ""
    });
    const allDone = computed(
      () => {
        var _a, _b, _c;
        return ((_a = status.value) == null ? void 0 : _a.hasLanguage) && ((_b = status.value) == null ? void 0 : _b.hasMenus) && ((_c = status.value) == null ? void 0 : _c.hasContent);
      }
    );
    const domainName = computed(() => {
      var _a;
      return ((_a = domainStore.domain) == null ? void 0 : _a.domain_name) || "";
    });
    const handleCreateLanguage = async () => {
      stepLoading.value = 1;
      const ok = await createLanguage({ lang_name: langForm.lang_name, flag: langForm.flag });
      if (ok) await fetchStatus();
      stepLoading.value = null;
    };
    const handleCreateMenus = async () => {
      var _a, _b;
      stepLoading.value = 2;
      const langId = (_b = (_a = status.value) == null ? void 0 : _a.language) == null ? void 0 : _b.lang_id;
      if (!langId) return;
      await updateSiteTitle(menuForm.siteTitle);
      const items = menuForm.menus.filter((m) => m.checked).map((m) => ({ item_name: m.name, lang_id: langId }));
      const created = await createMenus(items);
      if (created.length) {
        contentForm.menu_id = created[0].item_id;
        contentForm.title = created[0].item_name;
      }
      await fetchStatus();
      stepLoading.value = null;
    };
    const handleCreateContent = async () => {
      var _a, _b, _c, _d;
      stepLoading.value = 3;
      const langId = (_b = (_a = status.value) == null ? void 0 : _a.language) == null ? void 0 : _b.lang_id;
      if (!langId || !contentForm.menu_id) return;
      await createContent({
        title: contentForm.title,
        description: contentForm.description,
        content_type: 0,
        lang_id: langId,
        menu_id: contentForm.menu_id
      });
      await fetchStatus();
      stepLoading.value = null;
      const nextMenu = (_d = (_c = status.value) == null ? void 0 : _c.menus) == null ? void 0 : _d.find((m) => m.item_id !== contentForm.menu_id);
      if (nextMenu) {
        contentForm.menu_id = nextMenu.item_id;
        contentForm.title = nextMenu.item_name;
        contentForm.description = "";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_InputText = resolveComponent("InputText");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Button = resolveComponent("Button");
      const _component_Checkbox = resolveComponent("Checkbox");
      const _component_Textarea = resolveComponent("Textarea");
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "setup-page" }, _attrs))} data-v-91e8d45a><div class="setup-header" data-v-91e8d45a><h1 data-v-91e8d45a>Quick Setup</h1><p data-v-91e8d45a>Get your website ready in 3 simple steps</p></div>`);
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-91e8d45a>`);
        _push(ssrRenderComponent(_component_ProgressSpinner, {
          style: { "width": "40px", "height": "40px" },
          strokeWidth: "3"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="setup-steps" data-v-91e8d45a><div class="${ssrRenderClass(["step-card", { completed: (_a = unref(status)) == null ? void 0 : _a.hasLanguage }])}" data-v-91e8d45a><div class="step-header" data-v-91e8d45a><div class="step-number" data-v-91e8d45a>1</div><div class="step-info" data-v-91e8d45a><h3 data-v-91e8d45a>Language</h3><p data-v-91e8d45a>Create your website&#39;s default language</p></div>`);
        if ((_b = unref(status)) == null ? void 0 : _b.hasLanguage) {
          _push(`<div class="step-check" data-v-91e8d45a><i class="pi pi-check-circle" data-v-91e8d45a></i></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if ((_c = unref(status)) == null ? void 0 : _c.hasLanguage) {
          _push(`<div class="step-done" data-v-91e8d45a><i class="pi pi-check" style="${ssrRenderStyle({ "color": "#10b981" })}" data-v-91e8d45a></i><span data-v-91e8d45a>${ssrInterpolate((_d = unref(status).language) == null ? void 0 : _d.lang_name)} is set as default language</span></div>`);
        } else {
          _push(`<div class="step-body" data-v-91e8d45a><div class="form-row" data-v-91e8d45a><label data-v-91e8d45a>Language Name</label>`);
          _push(ssrRenderComponent(_component_InputText, {
            modelValue: unref(langForm).lang_name,
            "onUpdate:modelValue": ($event) => unref(langForm).lang_name = $event,
            placeholder: "e.g. English, \u1781\u17D2\u1798\u17C2\u179A",
            class: "form-input"
          }, null, _parent));
          _push(`</div><div class="form-row" data-v-91e8d45a><label data-v-91e8d45a>Language Flag</label>`);
          _push(ssrRenderComponent(_component_Dropdown, {
            modelValue: unref(langForm).flag,
            "onUpdate:modelValue": ($event) => unref(langForm).flag = $event,
            options: flagOptions,
            optionLabel: "label",
            optionValue: "value",
            placeholder: "Select language",
            class: "form-input"
          }, null, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(_component_Button, {
            label: "Create Language",
            icon: "pi pi-check",
            loading: unref(stepLoading) === 1,
            disabled: !unref(langForm).lang_name || unref(langForm).flag === null,
            onClick: handleCreateLanguage
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div><div class="${ssrRenderClass(["step-card", { completed: ((_e = unref(status)) == null ? void 0 : _e.hasMenus) && ((_f = unref(status)) == null ? void 0 : _f.hasBasicSettings), disabled: !((_g = unref(status)) == null ? void 0 : _g.hasLanguage) }])}" data-v-91e8d45a><div class="step-header" data-v-91e8d45a><div class="step-number" data-v-91e8d45a>2</div><div class="step-info" data-v-91e8d45a><h3 data-v-91e8d45a>Menus &amp; Settings</h3><p data-v-91e8d45a>Set your site title and create navigation menus</p></div>`);
        if (((_h = unref(status)) == null ? void 0 : _h.hasMenus) && ((_i = unref(status)) == null ? void 0 : _i.hasBasicSettings)) {
          _push(`<div class="step-check" data-v-91e8d45a><i class="pi pi-check-circle" data-v-91e8d45a></i></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (((_j = unref(status)) == null ? void 0 : _j.hasMenus) && ((_k = unref(status)) == null ? void 0 : _k.hasBasicSettings)) {
          _push(`<div class="step-done" data-v-91e8d45a><i class="pi pi-check" style="${ssrRenderStyle({ "color": "#10b981" })}" data-v-91e8d45a></i><span data-v-91e8d45a>${ssrInterpolate(unref(status).menuCount)} menus created, site title set</span></div>`);
        } else {
          _push(`<div class="step-body" data-v-91e8d45a><div class="form-row" data-v-91e8d45a><label data-v-91e8d45a>Site Title</label>`);
          _push(ssrRenderComponent(_component_InputText, {
            modelValue: unref(menuForm).siteTitle,
            "onUpdate:modelValue": ($event) => unref(menuForm).siteTitle = $event,
            placeholder: "e.g. My Company",
            class: "form-input"
          }, null, _parent));
          _push(`</div><div class="form-row" data-v-91e8d45a><label data-v-91e8d45a>Default Menus</label><div class="menu-checkboxes" data-v-91e8d45a><!--[-->`);
          ssrRenderList(unref(menuForm).menus, (menu) => {
            _push(`<div class="menu-check" data-v-91e8d45a>`);
            _push(ssrRenderComponent(_component_Checkbox, {
              modelValue: menu.checked,
              "onUpdate:modelValue": ($event) => menu.checked = $event,
              binary: true,
              inputId: "menu-" + menu.name
            }, null, _parent));
            _push(`<label${ssrRenderAttr("for", "menu-" + menu.name)} data-v-91e8d45a>${ssrInterpolate(menu.name)}</label></div>`);
          });
          _push(`<!--]--></div></div>`);
          _push(ssrRenderComponent(_component_Button, {
            label: "Create Menus & Settings",
            icon: "pi pi-check",
            loading: unref(stepLoading) === 2,
            disabled: !((_l = unref(status)) == null ? void 0 : _l.hasLanguage) || !unref(menuForm).siteTitle || !unref(menuForm).menus.some((m) => m.checked),
            onClick: handleCreateMenus
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div><div class="${ssrRenderClass(["step-card", { completed: (_m = unref(status)) == null ? void 0 : _m.hasContent, disabled: !((_n = unref(status)) == null ? void 0 : _n.hasMenus) }])}" data-v-91e8d45a><div class="step-header" data-v-91e8d45a><div class="step-number" data-v-91e8d45a>3</div><div class="step-info" data-v-91e8d45a><h3 data-v-91e8d45a>First Content</h3><p data-v-91e8d45a>Create your first page content</p></div>`);
        if ((_o = unref(status)) == null ? void 0 : _o.hasContent) {
          _push(`<div class="step-check" data-v-91e8d45a><i class="pi pi-check-circle" data-v-91e8d45a></i></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if ((_p = unref(status)) == null ? void 0 : _p.hasContent) {
          _push(`<div class="step-done" data-v-91e8d45a><i class="pi pi-check" style="${ssrRenderStyle({ "color": "#10b981" })}" data-v-91e8d45a></i><span data-v-91e8d45a>${ssrInterpolate(unref(status).contentCount)} content pages created</span></div>`);
        } else {
          _push(`<div class="step-body" data-v-91e8d45a><div class="form-row" data-v-91e8d45a><label data-v-91e8d45a>Menu Page</label>`);
          _push(ssrRenderComponent(_component_Dropdown, {
            modelValue: unref(contentForm).menu_id,
            "onUpdate:modelValue": ($event) => unref(contentForm).menu_id = $event,
            options: ((_q = unref(status)) == null ? void 0 : _q.menus) || [],
            optionLabel: "item_name",
            optionValue: "item_id",
            placeholder: "Select a page",
            class: "form-input"
          }, null, _parent));
          _push(`</div><div class="form-row" data-v-91e8d45a><label data-v-91e8d45a>Title</label>`);
          _push(ssrRenderComponent(_component_InputText, {
            modelValue: unref(contentForm).title,
            "onUpdate:modelValue": ($event) => unref(contentForm).title = $event,
            placeholder: "Page title",
            class: "form-input"
          }, null, _parent));
          _push(`</div><div class="form-row" data-v-91e8d45a><label data-v-91e8d45a>Content</label>`);
          _push(ssrRenderComponent(_component_Textarea, {
            modelValue: unref(contentForm).description,
            "onUpdate:modelValue": ($event) => unref(contentForm).description = $event,
            rows: "6",
            placeholder: "Write your page content here... (HTML is supported)",
            class: "form-input"
          }, null, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(_component_Button, {
            label: "Create Content",
            icon: "pi pi-check",
            loading: unref(stepLoading) === 3,
            disabled: !unref(contentForm).menu_id || !unref(contentForm).title || !unref(contentForm).description,
            onClick: handleCreateContent
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div>`);
        if (unref(allDone)) {
          _push(`<div class="setup-complete" data-v-91e8d45a><div class="complete-icon" data-v-91e8d45a><i class="pi pi-check-circle" style="${ssrRenderStyle({ "font-size": "3rem", "color": "#10b981" })}" data-v-91e8d45a></i></div><h2 data-v-91e8d45a>Your website is ready!</h2><p data-v-91e8d45a>All setup steps are complete. You can now view your website or continue customizing.</p><div class="complete-actions" data-v-91e8d45a>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin",
            class: "p-button p-button-secondary"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="p-button-label" data-v-91e8d45a${_scopeId}>Back to Dashboard</span>`);
              } else {
                return [
                  createVNode("span", { class: "p-button-label" }, "Back to Dashboard")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<a${ssrRenderAttr("href", "http://" + unref(domainName))} target="_blank" class="p-button p-button-success" data-v-91e8d45a><span class="p-button-label" data-v-91e8d45a>View Your Site</span></a></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/setup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const setup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-91e8d45a"]]);

export { setup as default };
//# sourceMappingURL=setup-Z88rvvlG.mjs.map
