import { defineComponent, ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { u as useSettingStore } from './setting-CbG1E-5s.mjs';
import { u as useDomainStore } from './domain-CExnDk7w.mjs';
import { m as useToast, k as useI18n, b as useRuntimeConfig } from './server.mjs';
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
  __name: "banner",
  __ssrInlineRender: true,
  setup(__props) {
    const settingStore = useSettingStore();
    const domainStore = useDomainStore();
    useToast();
    const { t } = useI18n();
    const config = useRuntimeConfig();
    const photoUrl = config.public.photoUrl || "https://khmer.biz";
    const showAdd = ref(false);
    const savingSettings = ref(false);
    const settingsForm = ref({ banner_pos: 1, banner_mode: 1, banner_display: 0 });
    const defaultLangId = computed(() => {
      var _a2, _b;
      var _a;
      const langs = domainStore.languages;
      const defaultLang = langs.find((l) => l.is_default === 1);
      return (_b = (_a2 = defaultLang == null ? void 0 : defaultLang.lang_id) != null ? _a2 : (_a = langs[0]) == null ? void 0 : _a.lang_id) != null ? _b : 1;
    });
    const bannerForm = ref({
      title: "",
      description: "",
      link: "",
      photo: null,
      photoPreview: "",
      imageUrl: "",
      lang_id: defaultLangId.value
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="row"><div class="col-md-4"><form><div class="form-group"><label>${ssrInterpolate(_ctx.$t("settings.slidePosition"))}</label><select class="form-control"><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(settingsForm).banner_pos) ? ssrLooseContain(unref(settingsForm).banner_pos, 1) : ssrLooseEqual(unref(settingsForm).banner_pos, 1)) ? " selected" : ""}>Top</option><option${ssrRenderAttr("value", 2)}${ssrIncludeBooleanAttr(Array.isArray(unref(settingsForm).banner_pos) ? ssrLooseContain(unref(settingsForm).banner_pos, 2) : ssrLooseEqual(unref(settingsForm).banner_pos, 2)) ? " selected" : ""}>Middle</option><option${ssrRenderAttr("value", 3)}${ssrIncludeBooleanAttr(Array.isArray(unref(settingsForm).banner_pos) ? ssrLooseContain(unref(settingsForm).banner_pos, 3) : ssrLooseEqual(unref(settingsForm).banner_pos, 3)) ? " selected" : ""}>Bottom</option></select></div><div class="form-group"><label>${ssrInterpolate(_ctx.$t("settings.slideMode"))}</label><select class="form-control"><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(settingsForm).banner_mode) ? ssrLooseContain(unref(settingsForm).banner_mode, 1) : ssrLooseEqual(unref(settingsForm).banner_mode, 1)) ? " selected" : ""}>On</option><option${ssrRenderAttr("value", 0)}${ssrIncludeBooleanAttr(Array.isArray(unref(settingsForm).banner_mode) ? ssrLooseContain(unref(settingsForm).banner_mode, 0) : ssrLooseEqual(unref(settingsForm).banner_mode, 0)) ? " selected" : ""}>Off</option></select></div><div class="form-group"><label>${ssrInterpolate(_ctx.$t("settings.slideDisplay"))}</label><div><label style="${ssrRenderStyle({ "font-weight": "normal" })}"><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(settingsForm).banner_display, 0)) ? " checked" : ""}${ssrRenderAttr("value", 0)}> Default Page</label><label style="${ssrRenderStyle({ "font-weight": "normal", "margin-left": "15px" })}"><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(settingsForm).banner_display, 1)) ? " checked" : ""}${ssrRenderAttr("value", 1)}> All Pages</label></div></div><button type="submit" class="btn btn-danger"${ssrIncludeBooleanAttr(unref(savingSettings)) ? " disabled" : ""}><i class="fa fa-floppy-o"></i> ${ssrInterpolate(_ctx.$t("settings.save"))}</button></form></div><div class="col-md-8"><div class="text-right" style="${ssrRenderStyle({ "margin-bottom": "10px" })}"><a href="#" class="btn btn-success"><i class="fa fa-plus"></i></a></div>`);
      if (unref(showAdd)) {
        _push(`<div class="panel panel-info" style="${ssrRenderStyle({ "margin-bottom": "15px" })}"><div class="panel-heading">${ssrInterpolate(_ctx.$t("settings.addImage"))}</div><div class="panel-body"><form><div class="form-group"><label>${ssrInterpolate(_ctx.$t("settings.imageTitle"))}</label><input type="text"${ssrRenderAttr("value", unref(bannerForm).title)} class="form-control"></div><div class="form-group"><label>Description</label><input type="text"${ssrRenderAttr("value", unref(bannerForm).description)} class="form-control"></div><div class="form-group"><label>Language</label><select class="form-control"><!--[-->`);
        ssrRenderList(unref(domainStore).languages, (lang) => {
          _push(`<option${ssrRenderAttr("value", lang.lang_id)}${ssrIncludeBooleanAttr(Array.isArray(unref(bannerForm).lang_id) ? ssrLooseContain(unref(bannerForm).lang_id, lang.lang_id) : ssrLooseEqual(unref(bannerForm).lang_id, lang.lang_id)) ? " selected" : ""}>${ssrInterpolate(lang.lang_name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="form-group"><label>Image URL</label><input type="text"${ssrRenderAttr("value", unref(bannerForm).imageUrl)} class="form-control" placeholder="banner/1s1.jpg"></div><div class="form-group"><label>Or Upload Image</label><input type="file" accept="image/*" class="form-control">`);
        if (unref(bannerForm).photoPreview) {
          _push(`<div style="${ssrRenderStyle({ "margin-top": "5px" })}"><img${ssrRenderAttr("src", unref(bannerForm).photoPreview)} style="${ssrRenderStyle({ "max-height": "100px" })}"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> ${ssrInterpolate(_ctx.$t("contentManager.save"))}</button></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="table-responsive"><table class="table table-striped table-hover"><thead><tr><th>#</th><th>Image</th><th>${ssrInterpolate(_ctx.$t("settings.imageTitle"))}</th><th>${ssrInterpolate(_ctx.$t("settings.imageLink"))}</th><th>Action</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(settingStore).banners, (banner, i) => {
        _push(`<tr><td>${ssrInterpolate(i + 1)}</td><td>`);
        if (banner.image) {
          _push(`<img${ssrRenderAttr("src", `${unref(photoUrl)}${banner.image}`)} style="${ssrRenderStyle({ "height": "50px", "border-radius": "4px" })}">`);
        } else {
          _push(`<!---->`);
        }
        _push(`</td><td>${ssrInterpolate(banner.title)}</td><td>${ssrInterpolate(banner.link)}</td><td><button class="btn btn-sm btn-danger"><i class="pi pi-trash"></i> Delete </button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings/banner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=banner-DkYq47zI.mjs.map
