import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { u as useSettingStore } from './setting-Bcy0SxVq.mjs';
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
import './useApi-C5-eJazW.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "social",
  __ssrInlineRender: true,
  setup(__props) {
    const settingStore = useSettingStore();
    const adding = ref(false);
    const socialLabels = {
      1: "Google",
      2: "Facebook",
      3: "YouTube",
      4: "LinkedIn",
      5: "Twitter",
      6: "Telegram",
      7: "Instagram"
    };
    const socialForm = ref({ stype: "", link: "" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><form><div class="row"><div class="col-md-6"><div class="form-group"><label>${ssrInterpolate(_ctx.$t("settings.socialMedia"))}</label><select class="form-control"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(socialForm).stype) ? ssrLooseContain(unref(socialForm).stype, "") : ssrLooseEqual(unref(socialForm).stype, "")) ? " selected" : ""}>-- Select --</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(unref(socialForm).stype) ? ssrLooseContain(unref(socialForm).stype, "2") : ssrLooseEqual(unref(socialForm).stype, "2")) ? " selected" : ""}>Facebook</option><option value="3"${ssrIncludeBooleanAttr(Array.isArray(unref(socialForm).stype) ? ssrLooseContain(unref(socialForm).stype, "3") : ssrLooseEqual(unref(socialForm).stype, "3")) ? " selected" : ""}>YouTube</option><option value="5"${ssrIncludeBooleanAttr(Array.isArray(unref(socialForm).stype) ? ssrLooseContain(unref(socialForm).stype, "5") : ssrLooseEqual(unref(socialForm).stype, "5")) ? " selected" : ""}>Twitter</option><option value="4"${ssrIncludeBooleanAttr(Array.isArray(unref(socialForm).stype) ? ssrLooseContain(unref(socialForm).stype, "4") : ssrLooseEqual(unref(socialForm).stype, "4")) ? " selected" : ""}>LinkedIn</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(socialForm).stype) ? ssrLooseContain(unref(socialForm).stype, "1") : ssrLooseEqual(unref(socialForm).stype, "1")) ? " selected" : ""}>Google</option><option value="6"${ssrIncludeBooleanAttr(Array.isArray(unref(socialForm).stype) ? ssrLooseContain(unref(socialForm).stype, "6") : ssrLooseEqual(unref(socialForm).stype, "6")) ? " selected" : ""}>Telegram</option><option value="7"${ssrIncludeBooleanAttr(Array.isArray(unref(socialForm).stype) ? ssrLooseContain(unref(socialForm).stype, "7") : ssrLooseEqual(unref(socialForm).stype, "7")) ? " selected" : ""}>Instagram</option></select></div></div><div class="col-md-6"><div class="form-group"><label>${ssrInterpolate(_ctx.$t("settings.link"))}</label><input type="text"${ssrRenderAttr("value", unref(socialForm).link)} class="form-control" placeholder="https://..."></div></div></div><button type="submit" class="btn btn-danger"${ssrIncludeBooleanAttr(unref(adding)) ? " disabled" : ""}><i class="fa fa-floppy-o"></i> ${ssrInterpolate(_ctx.$t("settings.save"))}</button></form><div class="table-responsive" style="${ssrRenderStyle({ "margin-top": "15px" })}"><table class="table"><thead><tr><th></th><th></th><th></th><th></th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(settingStore).socialMedia, (social, i) => {
        _push(`<tr><td>${ssrInterpolate(i + 1)}</td><td>${ssrInterpolate(socialLabels[social.stype] || "Unknown")}</td><td>${ssrInterpolate(social.link)}</td><td><a href="#" class="text-danger">${ssrInterpolate(_ctx.$t("settings.removeImage"))}</a></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings/social.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=social-BiXomItT.mjs.map
