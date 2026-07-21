import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useSettingStore } from './setting-CbG1E-5s.mjs';
import { _ as _export_sfc, l as useI18n, b as useRuntimeConfig } from './server.mjs';
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
    useSettingStore();
    const { t } = useI18n();
    const config = useRuntimeConfig();
    config.public.photoUrl || "https://khmer.biz";
    const form = ref({
      title: "",
      page_style: 0,
      theme: 0,
      tracking_id: "",
      chat_script: "",
      footer: "",
      footer_align: "1",
      s_mode: "1",
      background: ""
    });
    const bgPreview = ref("");
    ref(null);
    const saving = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    const templates = [
      {
        id: 0,
        name: "Classic Multi-Page",
        color: "#555",
        desc: "Traditional multi-page with navbar",
        preview: '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 10px;height:20px;background:#555"><div style="width:28px;height:7px;border-radius:2px;background:rgba(255,255,255,.5)"></div><div><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b></div></div><div style="padding:4px 10px"><div style="width:100%;height:24px;background:linear-gradient(135deg,#ddd,#ccc);border-radius:3px"></div></div><div style="padding:6px 10px"><div style="width:45%;height:5px;background:#555;border-radius:2px;margin-bottom:4px"></div><div style="width:100%;height:3px;background:#e0e0e0;border-radius:1px;margin-bottom:3px"></div><div style="display:flex;gap:4px;margin-top:5px"><div style="flex:1;height:28px;background:#f5f5f5;border-radius:3px;border:1px solid #eee"></div><div style="flex:1;height:28px;background:#f5f5f5;border-radius:3px;border:1px solid #eee"></div><div style="flex:1;height:28px;background:#f5f5f5;border-radius:3px;border:1px solid #eee"></div></div></div>'
      },
      {
        id: 1,
        name: "Scrolling Single-Page",
        color: "#e94560",
        desc: "Scrolling sections on one page",
        preview: '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 10px;height:20px;background:#16213e"><div style="width:28px;height:7px;border-radius:2px;background:rgba(255,255,255,.5)"></div><div><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b></div></div><div style="height:50px;background:linear-gradient(135deg,#1a1a2e,#16213e);display:flex;align-items:center;justify-content:center;flex-direction:column"><div style="width:45%;height:4px;background:rgba(255,255,255,.7);border-radius:2px;margin-bottom:3px"></div><div style="width:30%;height:4px;background:rgba(255,255,255,.5);border-radius:2px"></div></div>'
      },
      {
        id: 2,
        name: "Magazine/News Grid",
        color: "#e94560",
        desc: "Card grid layout with sidebar",
        preview: '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 10px;height:20px;background:#1a1a2e"><div style="width:28px;height:7px;border-radius:2px;background:rgba(255,255,255,.5)"></div><div><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b></div></div><div style="display:flex;padding:5px 10px;gap:5px"><div style="flex:1"><div style="width:100%;height:32px;background:linear-gradient(135deg,#e94560,#c0392b);border-radius:4px;margin-bottom:3px"></div><div style="width:55%;height:4px;background:#555;border-radius:1px"></div></div><div style="width:50px;border-left:1px solid #eee;padding-left:5px"><div style="width:100%;height:3px;background:#999;border-radius:1px;margin-bottom:5px"></div><div style="width:100%;height:2px;background:#e8e8e8;border-radius:1px;margin-bottom:6px"></div><div style="width:100%;height:2px;background:#e8e8e8;border-radius:1px"></div></div></div>'
      },
      {
        id: 3,
        name: "Fullscreen Hero",
        color: "#764ba2",
        desc: "Full-screen hero with sections",
        preview: '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 10px;height:20px;background:rgba(0,0,0,.35)"><div style="width:28px;height:7px;border-radius:2px;background:rgba(255,255,255,.5)"></div><div><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b></div></div><div style="height:60px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="width:20px;height:20px;border-radius:50%;border:2px solid rgba(255,255,255,.8);margin-bottom:5px"></div><div style="width:55%;height:4px;background:rgba(255,255,255,.7);border-radius:2px;margin-bottom:3px"></div><div style="width:30%;height:4px;background:rgba(255,255,255,.5);border-radius:2px"></div></div>'
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-be1ff062><form data-v-be1ff062><div class="form-group" data-v-be1ff062><label data-v-be1ff062>${ssrInterpolate(_ctx.$t("settings.websiteTitle"))}</label><input type="text"${ssrRenderAttr("value", unref(form).title)} class="form-control"${ssrRenderAttr("placeholder", _ctx.$t("settings.websiteTitle"))} data-v-be1ff062></div><div class="row" data-v-be1ff062><div class="col-md-6" data-v-be1ff062><div class="form-group" data-v-be1ff062><label data-v-be1ff062>${ssrInterpolate(_ctx.$t("settings.backgroundImage"))}</label><input type="file" accept="image/*" class="form-control" data-v-be1ff062>`);
      if (unref(bgPreview)) {
        _push(`<div style="${ssrRenderStyle({ "margin-top": "5px" })}" data-v-be1ff062><img${ssrRenderAttr("src", unref(bgPreview))} style="${ssrRenderStyle({ "max-height": "80px" })}" data-v-be1ff062></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="col-md-6" data-v-be1ff062><div class="form-group" data-v-be1ff062><label data-v-be1ff062>${ssrInterpolate(_ctx.$t("settings.screenMode"))}</label><select class="form-control" data-v-be1ff062><option value="1" data-v-be1ff062${ssrIncludeBooleanAttr(Array.isArray(unref(form).s_mode) ? ssrLooseContain(unref(form).s_mode, "1") : ssrLooseEqual(unref(form).s_mode, "1")) ? " selected" : ""}>Full Screen</option><option value="2" data-v-be1ff062${ssrIncludeBooleanAttr(Array.isArray(unref(form).s_mode) ? ssrLooseContain(unref(form).s_mode, "2") : ssrLooseEqual(unref(form).s_mode, "2")) ? " selected" : ""}>Medium</option></select></div></div></div><div class="row" data-v-be1ff062><div class="col-md-6" data-v-be1ff062><div class="form-group" data-v-be1ff062><label data-v-be1ff062>Footer (Normal Text / HTML Code)</label><textarea class="form-control" rows="3" placeholder="Website Footer" data-v-be1ff062>${ssrInterpolate(unref(form).footer)}</textarea></div></div><div class="col-md-6" data-v-be1ff062><div class="form-group" data-v-be1ff062><label data-v-be1ff062>${ssrInterpolate(_ctx.$t("settings.footerAlignment"))}</label><select class="form-control" data-v-be1ff062><option value="1" data-v-be1ff062${ssrIncludeBooleanAttr(Array.isArray(unref(form).footer_align) ? ssrLooseContain(unref(form).footer_align, "1") : ssrLooseEqual(unref(form).footer_align, "1")) ? " selected" : ""}>Left</option><option value="2" data-v-be1ff062${ssrIncludeBooleanAttr(Array.isArray(unref(form).footer_align) ? ssrLooseContain(unref(form).footer_align, "2") : ssrLooseEqual(unref(form).footer_align, "2")) ? " selected" : ""}>Center</option><option value="3" data-v-be1ff062${ssrIncludeBooleanAttr(Array.isArray(unref(form).footer_align) ? ssrLooseContain(unref(form).footer_align, "3") : ssrLooseEqual(unref(form).footer_align, "3")) ? " selected" : ""}>Right</option></select></div></div></div><div class="row" data-v-be1ff062><div class="col-md-6" data-v-be1ff062><div class="form-group" data-v-be1ff062><label data-v-be1ff062>${ssrInterpolate(_ctx.$t("settings.themeStyle"))}</label><select class="form-control" data-v-be1ff062><option${ssrRenderAttr("value", 0)} data-v-be1ff062${ssrIncludeBooleanAttr(Array.isArray(unref(form).theme) ? ssrLooseContain(unref(form).theme, 0) : ssrLooseEqual(unref(form).theme, 0)) ? " selected" : ""}>Default</option><option${ssrRenderAttr("value", 1)} data-v-be1ff062${ssrIncludeBooleanAttr(Array.isArray(unref(form).theme) ? ssrLooseContain(unref(form).theme, 1) : ssrLooseEqual(unref(form).theme, 1)) ? " selected" : ""}>Dark</option><option${ssrRenderAttr("value", 2)} data-v-be1ff062${ssrIncludeBooleanAttr(Array.isArray(unref(form).theme) ? ssrLooseContain(unref(form).theme, 2) : ssrLooseEqual(unref(form).theme, 2)) ? " selected" : ""}>Red</option><option${ssrRenderAttr("value", 3)} data-v-be1ff062${ssrIncludeBooleanAttr(Array.isArray(unref(form).theme) ? ssrLooseContain(unref(form).theme, 3) : ssrLooseEqual(unref(form).theme, 3)) ? " selected" : ""}>Green</option><option${ssrRenderAttr("value", 4)} data-v-be1ff062${ssrIncludeBooleanAttr(Array.isArray(unref(form).theme) ? ssrLooseContain(unref(form).theme, 4) : ssrLooseEqual(unref(form).theme, 4)) ? " selected" : ""}>Purple</option><option${ssrRenderAttr("value", 5)} data-v-be1ff062${ssrIncludeBooleanAttr(Array.isArray(unref(form).theme) ? ssrLooseContain(unref(form).theme, 5) : ssrLooseEqual(unref(form).theme, 5)) ? " selected" : ""}>Yellow</option></select></div></div><div class="col-md-6" data-v-be1ff062><div class="form-group" data-v-be1ff062><label data-v-be1ff062>${ssrInterpolate(_ctx.$t("settings.googleAnalytics"))}</label><input type="text"${ssrRenderAttr("value", unref(form).tracking_id)} class="form-control"${ssrRenderAttr("placeholder", _ctx.$t("settings.googleAnalytics"))} data-v-be1ff062></div></div></div><div class="form-group" data-v-be1ff062><label data-v-be1ff062>${ssrInterpolate(_ctx.$t("settings.widgetChat"))}</label><textarea class="form-control" rows="3" placeholder="Widget Chat" data-v-be1ff062>${ssrInterpolate(unref(form).chat_script)}</textarea></div><div class="form-group" data-v-be1ff062><label class="tpl-label" data-v-be1ff062>Choose Template Style</label><div class="template-picker" data-v-be1ff062><!--[-->`);
      ssrRenderList(templates, (tpl) => {
        var _a;
        _push(`<div class="${ssrRenderClass([{ selected: unref(form).page_style == tpl.id }, "tpl-card"])}" data-v-be1ff062><div class="tpl-bar" style="${ssrRenderStyle({ background: tpl.color })}" data-v-be1ff062></div><div class="tpl-preview" data-v-be1ff062>${(_a = tpl.preview) != null ? _a : ""}</div><div class="tpl-meta" data-v-be1ff062><div class="tpl-name" data-v-be1ff062>${ssrInterpolate(tpl.name)}</div><div class="tpl-desc" data-v-be1ff062>${ssrInterpolate(tpl.desc)}</div></div><div class="tpl-chk" data-v-be1ff062><i class="fa fa-check" data-v-be1ff062></i></div></div>`);
      });
      _push(`<!--]--></div></div>`);
      if (unref(successMessage)) {
        _push(`<div class="alert alert-success" data-v-be1ff062>${ssrInterpolate(unref(successMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMessage)) {
        _push(`<div class="alert alert-danger" data-v-be1ff062>${ssrInterpolate(unref(errorMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="btn btn-danger"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} data-v-be1ff062><i class="fa fa-floppy-o" data-v-be1ff062></i> ${ssrInterpolate(_ctx.$t("settings.save"))}</button></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-be1ff062"]]);

export { index as default };
//# sourceMappingURL=index-Dnbbq9fK.mjs.map
