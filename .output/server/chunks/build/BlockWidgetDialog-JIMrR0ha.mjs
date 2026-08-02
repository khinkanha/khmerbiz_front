import { M as MediaPicker } from './MediaPicker-kILQE-jC.mjs';
import { defineComponent, ref, watch, computed, resolveComponent, mergeProps, unref, withCtx, isRef, openBlock, createBlock, Fragment, createVNode, toDisplayString, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, g as useI18n, b as useRuntimeConfig } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BlockWidgetDialog",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    type: {},
    data: {}
  },
  emits: ["update:visible", "save", "delete", "duplicate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const photoUrl = useRuntimeConfig().public.photoUrl || "";
    const local = ref({});
    watch(
      () => props.visible,
      (open) => {
        if (open && props.data) {
          local.value = JSON.parse(JSON.stringify(props.data));
        }
      }
    );
    const dialogHeader = computed(
      () => props.type ? `${t("blockEditor.editWidget")} \u2014 ${t("blockEditor." + props.type)}` : t("blockEditor.editWidget")
    );
    const alignOptions = computed(() => [
      { label: t("blockEditor.left"), value: "left" },
      { label: t("blockEditor.center"), value: "center" },
      { label: t("blockEditor.right"), value: "right" }
    ]);
    const variantOptions = computed(() => [
      { label: t("blockEditor.primary"), value: "primary" },
      { label: t("blockEditor.outline"), value: "outline" }
    ]);
    const checklistStyleOptions = computed(() => [
      { label: t("blockEditor.checkMark"), value: "check" },
      { label: t("blockEditor.crossMark"), value: "cross" }
    ]);
    const dividerStyleOptions = computed(() => [
      { label: t("blockEditor.solid"), value: "solid" },
      { label: t("blockEditor.dashed"), value: "dashed" },
      { label: t("blockEditor.dotted"), value: "dotted" }
    ]);
    const columnsOptions = computed(() => [
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 }
    ]);
    const calloutVariantOptions = computed(() => [
      { label: t("blockEditor.info"), value: "info" },
      { label: t("blockEditor.success"), value: "success" },
      { label: t("blockEditor.warning"), value: "warning" },
      { label: t("blockEditor.danger"), value: "danger" }
    ]);
    const contactTypeOptions = computed(() => [
      { label: t("blockEditor.phone"), value: "phone" },
      { label: t("blockEditor.email"), value: "email" },
      { label: t("blockEditor.address"), value: "address" },
      { label: t("blockEditor.hours"), value: "hours" }
    ]);
    const addItem = () => local.value.items.push({ label: "", checked: false });
    const removeItem = (i) => local.value.items.splice(i, 1);
    const addStat = () => local.value.items.push({ number: "", label: "" });
    const removeStat = (i) => local.value.items.splice(i, 1);
    const addContact = () => local.value.items.push({ type: "phone", value: "" });
    const removeContact = (i) => local.value.items.splice(i, 1);
    const addAccordion = () => local.value.items.push({ q: "", a: "" });
    const removeAccordion = (i) => local.value.items.splice(i, 1);
    const toFileList = (url) => {
      if (!url) return [];
      if (photoUrl && url.startsWith(photoUrl)) return [url.slice(photoUrl.length)];
      return [];
    };
    const fromFileList = (files) => files && files[0] ? photoUrl + files[0] : "";
    const cardImageModel = computed({
      get: () => toFileList(local.value.imageUrl),
      set: (v) => {
        local.value.imageUrl = fromFileList(v);
      }
    });
    const imageBlockModel = computed({
      get: () => toFileList(local.value.url),
      set: (v) => {
        local.value.url = fromFileList(v);
      }
    });
    const quoteAvatarModel = computed({
      get: () => toFileList(local.value.avatarUrl),
      set: (v) => {
        local.value.avatarUrl = fromFileList(v);
      }
    });
    const galleryModel = computed({
      get: () => (local.value.images || []).map((im) => {
        const u = im.url || "";
        return photoUrl && u.startsWith(photoUrl) ? u.slice(photoUrl.length) : u;
      }),
      set: (files) => {
        const prev = new Map(
          (local.value.images || []).map((im) => [im.url, im.alt])
        );
        local.value.images = (files || []).map((f) => {
          const url = photoUrl + f;
          return { url, alt: prev.has(url) ? prev.get(url) : "" };
        });
      }
    });
    const removeGalleryImage = (i) => local.value.images.splice(i, 1);
    const save = () => emit("save", JSON.parse(JSON.stringify(local.value)));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = resolveComponent("Dialog");
      const _component_InputText = resolveComponent("InputText");
      const _component_Textarea = resolveComponent("Textarea");
      const _component_MediaPicker = MediaPicker;
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_Checkbox = resolveComponent("Checkbox");
      const _component_Button = resolveComponent("Button");
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: __props.visible,
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event),
        header: unref(dialogHeader),
        modal: true,
        style: { width: "640px", maxWidth: "95vw" },
        dismissableMask: false,
        class: "kb-dialog"
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              label: _ctx.$t("blockEditor.duplicate"),
              icon: "pi pi-clone",
              severity: "secondary",
              outlined: "",
              onClick: ($event) => _ctx.$emit("duplicate")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: _ctx.$t("blockEditor.delete"),
              icon: "pi pi-trash",
              severity: "danger",
              outlined: "",
              onClick: ($event) => _ctx.$emit("delete")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: _ctx.$t("common.cancel"),
              icon: "pi pi-times",
              outlined: "",
              onClick: ($event) => _ctx.$emit("update:visible", false)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: _ctx.$t("common.save"),
              icon: "pi pi-check",
              onClick: save
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                label: _ctx.$t("blockEditor.duplicate"),
                icon: "pi pi-clone",
                severity: "secondary",
                outlined: "",
                onClick: ($event) => _ctx.$emit("duplicate")
              }, null, 8, ["label", "onClick"]),
              createVNode(_component_Button, {
                label: _ctx.$t("blockEditor.delete"),
                icon: "pi pi-trash",
                severity: "danger",
                outlined: "",
                onClick: ($event) => _ctx.$emit("delete")
              }, null, 8, ["label", "onClick"]),
              createVNode(_component_Button, {
                label: _ctx.$t("common.cancel"),
                icon: "pi pi-times",
                outlined: "",
                onClick: ($event) => _ctx.$emit("update:visible", false)
              }, null, 8, ["label", "onClick"]),
              createVNode(_component_Button, {
                label: _ctx.$t("common.save"),
                icon: "pi pi-check",
                onClick: save
              }, null, 8, ["label"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.type) {
              _push2(`<div class="kb-dialog-body" data-v-9d63c647${_scopeId}>`);
              if (__props.type === "card") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.title"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).title,
                  "onUpdate:modelValue": ($event) => unref(local).title = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.text"))}</label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  modelValue: unref(local).text,
                  "onUpdate:modelValue": ($event) => unref(local).text = $event,
                  rows: "3",
                  autoResize: ""
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.imageUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).imageUrl,
                  "onUpdate:modelValue": ($event) => unref(local).imageUrl = $event,
                  placeholder: _ctx.$t("blockEditor.imageUrl")
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_MediaPicker, {
                  modelValue: unref(cardImageModel),
                  "onUpdate:modelValue": ($event) => isRef(cardImageModel) ? cardImageModel.value = $event : null,
                  multiple: false
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.altText"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).imageAlt,
                  "onUpdate:modelValue": ($event) => unref(local).imageAlt = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.linkUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).linkUrl,
                  "onUpdate:modelValue": ($event) => unref(local).linkUrl = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.linkLabel"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).linkLabel,
                  "onUpdate:modelValue": ($event) => unref(local).linkLabel = $event
                }, null, _parent2, _scopeId));
                _push2(`</div></div><!--]-->`);
              } else if (__props.type === "checkbox") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.title"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).title,
                  "onUpdate:modelValue": ($event) => unref(local).title = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.style"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).style,
                  "onUpdate:modelValue": ($event) => unref(local).style = $event,
                  options: unref(checklistStyleOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.items"))}</label><div class="kb-items" data-v-9d63c647${_scopeId}><!--[-->`);
                ssrRenderList(unref(local).items, (it, i) => {
                  _push2(`<div class="kb-item" data-v-9d63c647${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Checkbox, {
                    modelValue: it.checked,
                    "onUpdate:modelValue": ($event) => it.checked = $event,
                    binary: true
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_InputText, {
                    modelValue: it.label,
                    "onUpdate:modelValue": ($event) => it.label = $event,
                    placeholder: _ctx.$t("blockEditor.label")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_Button, {
                    icon: "pi pi-times",
                    text: "",
                    severity: "danger",
                    onClick: ($event) => removeItem(i)
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("blockEditor.addItem"),
                  icon: "pi pi-plus",
                  size: "small",
                  outlined: "",
                  onClick: addItem
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "button") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.linkLabel"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).label,
                  "onUpdate:modelValue": ($event) => unref(local).label = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.linkUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).url,
                  "onUpdate:modelValue": ($event) => unref(local).url = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.variant"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).variant,
                  "onUpdate:modelValue": ($event) => unref(local).variant = $event,
                  options: unref(variantOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.align"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).align,
                  "onUpdate:modelValue": ($event) => unref(local).align = $event,
                  options: unref(alignOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div></div><!--]-->`);
              } else if (__props.type === "image") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.imageUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).url,
                  "onUpdate:modelValue": ($event) => unref(local).url = $event,
                  placeholder: _ctx.$t("blockEditor.imageUrl")
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_MediaPicker, {
                  modelValue: unref(imageBlockModel),
                  "onUpdate:modelValue": ($event) => isRef(imageBlockModel) ? imageBlockModel.value = $event : null,
                  multiple: false
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.altText"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).alt,
                  "onUpdate:modelValue": ($event) => unref(local).alt = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.caption"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).caption,
                  "onUpdate:modelValue": ($event) => unref(local).caption = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.width"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).width,
                  "onUpdate:modelValue": ($event) => unref(local).width = $event,
                  placeholder: "100% / 320px"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.align"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).align,
                  "onUpdate:modelValue": ($event) => unref(local).align = $event,
                  options: unref(alignOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div></div><!--]-->`);
              } else if (__props.type === "divider") {
                _push2(`<div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.style"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).style,
                  "onUpdate:modelValue": ($event) => unref(local).style = $event,
                  options: unref(dividerStyleOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else if (__props.type === "columns") {
                _push2(`<!--[--><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.leftCol"))}</label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  modelValue: unref(local).leftHtml,
                  "onUpdate:modelValue": ($event) => unref(local).leftHtml = $event,
                  rows: "5",
                  autoResize: ""
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.rightCol"))}</label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  modelValue: unref(local).rightHtml,
                  "onUpdate:modelValue": ($event) => unref(local).rightHtml = $event,
                  rows: "5",
                  autoResize: ""
                }, null, _parent2, _scopeId));
                _push2(`</div></div><small class="kb-note" data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.columnsHint"))}</small><!--]-->`);
              } else if (__props.type === "spacer") {
                _push2(`<div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.height"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).height,
                  "onUpdate:modelValue": ($event) => unref(local).height = $event,
                  placeholder: "32"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else if (__props.type === "icon") {
                _push2(`<!--[--><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.glyph"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).glyph,
                  "onUpdate:modelValue": ($event) => unref(local).glyph = $event,
                  placeholder: "\u2B50"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.size"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).size,
                  "onUpdate:modelValue": ($event) => unref(local).size = $event,
                  placeholder: "24"
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.label"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).label,
                  "onUpdate:modelValue": ($event) => unref(local).label = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.align"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).align,
                  "onUpdate:modelValue": ($event) => unref(local).align = $event,
                  options: unref(alignOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "stats") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.columns"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).columns,
                  "onUpdate:modelValue": ($event) => unref(local).columns = $event,
                  options: unref(columnsOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.items"))}</label><div class="kb-items" data-v-9d63c647${_scopeId}><!--[-->`);
                ssrRenderList(unref(local).items || [], (it, i) => {
                  _push2(`<div class="kb-item" data-v-9d63c647${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_InputText, {
                    modelValue: it.number,
                    "onUpdate:modelValue": ($event) => it.number = $event,
                    placeholder: _ctx.$t("blockEditor.number")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_InputText, {
                    modelValue: it.label,
                    "onUpdate:modelValue": ($event) => it.label = $event,
                    placeholder: _ctx.$t("blockEditor.label")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_Button, {
                    icon: "pi pi-times",
                    text: "",
                    severity: "danger",
                    onClick: ($event) => removeStat(i)
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("blockEditor.addItem"),
                  icon: "pi pi-plus",
                  size: "small",
                  outlined: "",
                  onClick: addStat
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "callout") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.variant"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).variant,
                  "onUpdate:modelValue": ($event) => unref(local).variant = $event,
                  options: unref(calloutVariantOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.title"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).title,
                  "onUpdate:modelValue": ($event) => unref(local).title = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.text"))}</label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  modelValue: unref(local).text,
                  "onUpdate:modelValue": ($event) => unref(local).text = $event,
                  rows: "3",
                  autoResize: ""
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "contact") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.title"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).title,
                  "onUpdate:modelValue": ($event) => unref(local).title = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.items"))}</label><div class="kb-items" data-v-9d63c647${_scopeId}><!--[-->`);
                ssrRenderList(unref(local).items || [], (it, i) => {
                  _push2(`<div class="kb-item" data-v-9d63c647${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Dropdown, {
                    modelValue: it.type,
                    "onUpdate:modelValue": ($event) => it.type = $event,
                    options: unref(contactTypeOptions),
                    optionLabel: "label",
                    optionValue: "value"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_InputText, {
                    modelValue: it.value,
                    "onUpdate:modelValue": ($event) => it.value = $event,
                    placeholder: _ctx.$t("blockEditor." + it.type)
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_Button, {
                    icon: "pi pi-times",
                    text: "",
                    severity: "danger",
                    onClick: ($event) => removeContact(i)
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("blockEditor.addItem"),
                  icon: "pi pi-plus",
                  size: "small",
                  outlined: "",
                  onClick: addContact
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "gallery") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.imageUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_MediaPicker, {
                  modelValue: unref(galleryModel),
                  "onUpdate:modelValue": ($event) => isRef(galleryModel) ? galleryModel.value = $event : null,
                  multiple: true
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
                if (unref(local).images && unref(local).images.length) {
                  _push2(`<div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.altText"))}</label><div class="kb-items" data-v-9d63c647${_scopeId}><!--[-->`);
                  ssrRenderList(unref(local).images, (im, i) => {
                    _push2(`<div class="kb-item" data-v-9d63c647${_scopeId}>`);
                    if (im.url) {
                      _push2(`<img${ssrRenderAttr("src", im.url)} class="kb-thumb" alt="" data-v-9d63c647${_scopeId}>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(ssrRenderComponent(_component_InputText, {
                      modelValue: im.alt,
                      "onUpdate:modelValue": ($event) => im.alt = $event,
                      placeholder: _ctx.$t("blockEditor.altText")
                    }, null, _parent2, _scopeId));
                    _push2(ssrRenderComponent(_component_Button, {
                      icon: "pi pi-times",
                      text: "",
                      severity: "danger",
                      onClick: ($event) => removeGalleryImage(i)
                    }, null, _parent2, _scopeId));
                    _push2(`</div>`);
                  });
                  _push2(`<!--]--></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.columns"))}</label>`);
                _push2(ssrRenderComponent(_component_Dropdown, {
                  modelValue: unref(local).columns,
                  "onUpdate:modelValue": ($event) => unref(local).columns = $event,
                  options: unref(columnsOptions),
                  optionLabel: "label",
                  optionValue: "value"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.caption"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).caption,
                  "onUpdate:modelValue": ($event) => unref(local).caption = $event
                }, null, _parent2, _scopeId));
                _push2(`</div></div><!--]-->`);
              } else if (__props.type === "quote") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.quoteText"))}</label>`);
                _push2(ssrRenderComponent(_component_Textarea, {
                  modelValue: unref(local).quote,
                  "onUpdate:modelValue": ($event) => unref(local).quote = $event,
                  rows: "3",
                  autoResize: ""
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-row" data-v-9d63c647${_scopeId}><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.author"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).author,
                  "onUpdate:modelValue": ($event) => unref(local).author = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.role"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).role,
                  "onUpdate:modelValue": ($event) => unref(local).role = $event
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.imageUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).avatarUrl,
                  "onUpdate:modelValue": ($event) => unref(local).avatarUrl = $event,
                  placeholder: _ctx.$t("blockEditor.imageUrl")
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_MediaPicker, {
                  modelValue: unref(quoteAvatarModel),
                  "onUpdate:modelValue": ($event) => isRef(quoteAvatarModel) ? quoteAvatarModel.value = $event : null,
                  multiple: false
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "accordion") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label class="kb-checkline" data-v-9d63c647${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Checkbox, {
                  modelValue: unref(local).firstOpen,
                  "onUpdate:modelValue": ($event) => unref(local).firstOpen = $event,
                  binary: true
                }, null, _parent2, _scopeId));
                _push2(`<span data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.firstItemOpen"))}</span></label></div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.items"))}</label><div class="kb-items" data-v-9d63c647${_scopeId}><!--[-->`);
                ssrRenderList(unref(local).items || [], (it, i) => {
                  _push2(`<div class="kb-accordionrow" data-v-9d63c647${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_InputText, {
                    modelValue: it.q,
                    "onUpdate:modelValue": ($event) => it.q = $event,
                    placeholder: _ctx.$t("blockEditor.question")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_Textarea, {
                    modelValue: it.a,
                    "onUpdate:modelValue": ($event) => it.a = $event,
                    rows: "2",
                    autoResize: "",
                    placeholder: _ctx.$t("blockEditor.answer")
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_Button, {
                    icon: "pi pi-times",
                    text: "",
                    severity: "danger",
                    onClick: ($event) => removeAccordion(i)
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
                _push2(ssrRenderComponent(_component_Button, {
                  label: _ctx.$t("blockEditor.addItem"),
                  icon: "pi pi-plus",
                  size: "small",
                  outlined: "",
                  onClick: addAccordion
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else if (__props.type === "video") {
                _push2(`<!--[--><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.videoUrl"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).url,
                  "onUpdate:modelValue": ($event) => unref(local).url = $event,
                  placeholder: "https://youtube.com/watch?v=\u2026"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="kb-field" data-v-9d63c647${_scopeId}><label data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.caption"))}</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  modelValue: unref(local).caption,
                  "onUpdate:modelValue": ($event) => unref(local).caption = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><small class="kb-note" data-v-9d63c647${_scopeId}>${ssrInterpolate(_ctx.$t("blockEditor.videoHint"))}</small><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.type ? (openBlock(), createBlock("div", {
                key: 0,
                class: "kb-dialog-body"
              }, [
                __props.type === "card" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.title")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).title,
                      "onUpdate:modelValue": ($event) => unref(local).title = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.text")), 1),
                    createVNode(_component_Textarea, {
                      modelValue: unref(local).text,
                      "onUpdate:modelValue": ($event) => unref(local).text = $event,
                      rows: "3",
                      autoResize: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.imageUrl")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).imageUrl,
                      "onUpdate:modelValue": ($event) => unref(local).imageUrl = $event,
                      placeholder: _ctx.$t("blockEditor.imageUrl")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                    createVNode(_component_MediaPicker, {
                      modelValue: unref(cardImageModel),
                      "onUpdate:modelValue": ($event) => isRef(cardImageModel) ? cardImageModel.value = $event : null,
                      multiple: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.altText")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).imageAlt,
                      "onUpdate:modelValue": ($event) => unref(local).imageAlt = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.linkUrl")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).linkUrl,
                        "onUpdate:modelValue": ($event) => unref(local).linkUrl = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.linkLabel")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).linkLabel,
                        "onUpdate:modelValue": ($event) => unref(local).linkLabel = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ])
                ], 64)) : __props.type === "checkbox" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.title")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).title,
                      "onUpdate:modelValue": ($event) => unref(local).title = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.style")), 1),
                    createVNode(_component_Dropdown, {
                      modelValue: unref(local).style,
                      "onUpdate:modelValue": ($event) => unref(local).style = $event,
                      options: unref(checklistStyleOptions),
                      optionLabel: "label",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.items")), 1),
                    createVNode("div", { class: "kb-items" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(local).items, (it, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "kb-item"
                        }, [
                          createVNode(_component_Checkbox, {
                            modelValue: it.checked,
                            "onUpdate:modelValue": ($event) => it.checked = $event,
                            binary: true
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_InputText, {
                            modelValue: it.label,
                            "onUpdate:modelValue": ($event) => it.label = $event,
                            placeholder: _ctx.$t("blockEditor.label")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Button, {
                            icon: "pi pi-times",
                            text: "",
                            severity: "danger",
                            onClick: ($event) => removeItem(i)
                          }, null, 8, ["onClick"])
                        ]);
                      }), 128))
                    ]),
                    createVNode(_component_Button, {
                      label: _ctx.$t("blockEditor.addItem"),
                      icon: "pi pi-plus",
                      size: "small",
                      outlined: "",
                      onClick: addItem
                    }, null, 8, ["label"])
                  ])
                ], 64)) : __props.type === "button" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.linkLabel")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).label,
                      "onUpdate:modelValue": ($event) => unref(local).label = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.linkUrl")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).url,
                      "onUpdate:modelValue": ($event) => unref(local).url = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.variant")), 1),
                      createVNode(_component_Dropdown, {
                        modelValue: unref(local).variant,
                        "onUpdate:modelValue": ($event) => unref(local).variant = $event,
                        options: unref(variantOptions),
                        optionLabel: "label",
                        optionValue: "value"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.align")), 1),
                      createVNode(_component_Dropdown, {
                        modelValue: unref(local).align,
                        "onUpdate:modelValue": ($event) => unref(local).align = $event,
                        options: unref(alignOptions),
                        optionLabel: "label",
                        optionValue: "value"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ])
                  ])
                ], 64)) : __props.type === "image" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.imageUrl")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).url,
                      "onUpdate:modelValue": ($event) => unref(local).url = $event,
                      placeholder: _ctx.$t("blockEditor.imageUrl")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                    createVNode(_component_MediaPicker, {
                      modelValue: unref(imageBlockModel),
                      "onUpdate:modelValue": ($event) => isRef(imageBlockModel) ? imageBlockModel.value = $event : null,
                      multiple: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.altText")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).alt,
                      "onUpdate:modelValue": ($event) => unref(local).alt = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.caption")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).caption,
                      "onUpdate:modelValue": ($event) => unref(local).caption = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.width")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).width,
                        "onUpdate:modelValue": ($event) => unref(local).width = $event,
                        placeholder: "100% / 320px"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.align")), 1),
                      createVNode(_component_Dropdown, {
                        modelValue: unref(local).align,
                        "onUpdate:modelValue": ($event) => unref(local).align = $event,
                        options: unref(alignOptions),
                        optionLabel: "label",
                        optionValue: "value"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ])
                  ])
                ], 64)) : __props.type === "divider" ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "kb-field"
                }, [
                  createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.style")), 1),
                  createVNode(_component_Dropdown, {
                    modelValue: unref(local).style,
                    "onUpdate:modelValue": ($event) => unref(local).style = $event,
                    options: unref(dividerStyleOptions),
                    optionLabel: "label",
                    optionValue: "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ])) : __props.type === "columns" ? (openBlock(), createBlock(Fragment, { key: 5 }, [
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.leftCol")), 1),
                      createVNode(_component_Textarea, {
                        modelValue: unref(local).leftHtml,
                        "onUpdate:modelValue": ($event) => unref(local).leftHtml = $event,
                        rows: "5",
                        autoResize: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.rightCol")), 1),
                      createVNode(_component_Textarea, {
                        modelValue: unref(local).rightHtml,
                        "onUpdate:modelValue": ($event) => unref(local).rightHtml = $event,
                        rows: "5",
                        autoResize: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("small", { class: "kb-note" }, toDisplayString(_ctx.$t("blockEditor.columnsHint")), 1)
                ], 64)) : __props.type === "spacer" ? (openBlock(), createBlock("div", {
                  key: 6,
                  class: "kb-field"
                }, [
                  createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.height")), 1),
                  createVNode(_component_InputText, {
                    modelValue: unref(local).height,
                    "onUpdate:modelValue": ($event) => unref(local).height = $event,
                    placeholder: "32"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])) : __props.type === "icon" ? (openBlock(), createBlock(Fragment, { key: 7 }, [
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.glyph")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).glyph,
                        "onUpdate:modelValue": ($event) => unref(local).glyph = $event,
                        placeholder: "\u2B50"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.size")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).size,
                        "onUpdate:modelValue": ($event) => unref(local).size = $event,
                        placeholder: "24"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.label")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).label,
                      "onUpdate:modelValue": ($event) => unref(local).label = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.align")), 1),
                    createVNode(_component_Dropdown, {
                      modelValue: unref(local).align,
                      "onUpdate:modelValue": ($event) => unref(local).align = $event,
                      options: unref(alignOptions),
                      optionLabel: "label",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ])
                ], 64)) : __props.type === "stats" ? (openBlock(), createBlock(Fragment, { key: 8 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.columns")), 1),
                    createVNode(_component_Dropdown, {
                      modelValue: unref(local).columns,
                      "onUpdate:modelValue": ($event) => unref(local).columns = $event,
                      options: unref(columnsOptions),
                      optionLabel: "label",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.items")), 1),
                    createVNode("div", { class: "kb-items" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(local).items || [], (it, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "kb-item"
                        }, [
                          createVNode(_component_InputText, {
                            modelValue: it.number,
                            "onUpdate:modelValue": ($event) => it.number = $event,
                            placeholder: _ctx.$t("blockEditor.number")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_InputText, {
                            modelValue: it.label,
                            "onUpdate:modelValue": ($event) => it.label = $event,
                            placeholder: _ctx.$t("blockEditor.label")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Button, {
                            icon: "pi pi-times",
                            text: "",
                            severity: "danger",
                            onClick: ($event) => removeStat(i)
                          }, null, 8, ["onClick"])
                        ]);
                      }), 128))
                    ]),
                    createVNode(_component_Button, {
                      label: _ctx.$t("blockEditor.addItem"),
                      icon: "pi pi-plus",
                      size: "small",
                      outlined: "",
                      onClick: addStat
                    }, null, 8, ["label"])
                  ])
                ], 64)) : __props.type === "callout" ? (openBlock(), createBlock(Fragment, { key: 9 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.variant")), 1),
                    createVNode(_component_Dropdown, {
                      modelValue: unref(local).variant,
                      "onUpdate:modelValue": ($event) => unref(local).variant = $event,
                      options: unref(calloutVariantOptions),
                      optionLabel: "label",
                      optionValue: "value"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.title")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).title,
                      "onUpdate:modelValue": ($event) => unref(local).title = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.text")), 1),
                    createVNode(_component_Textarea, {
                      modelValue: unref(local).text,
                      "onUpdate:modelValue": ($event) => unref(local).text = $event,
                      rows: "3",
                      autoResize: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ], 64)) : __props.type === "contact" ? (openBlock(), createBlock(Fragment, { key: 10 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.title")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).title,
                      "onUpdate:modelValue": ($event) => unref(local).title = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.items")), 1),
                    createVNode("div", { class: "kb-items" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(local).items || [], (it, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "kb-item"
                        }, [
                          createVNode(_component_Dropdown, {
                            modelValue: it.type,
                            "onUpdate:modelValue": ($event) => it.type = $event,
                            options: unref(contactTypeOptions),
                            optionLabel: "label",
                            optionValue: "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                          createVNode(_component_InputText, {
                            modelValue: it.value,
                            "onUpdate:modelValue": ($event) => it.value = $event,
                            placeholder: _ctx.$t("blockEditor." + it.type)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Button, {
                            icon: "pi pi-times",
                            text: "",
                            severity: "danger",
                            onClick: ($event) => removeContact(i)
                          }, null, 8, ["onClick"])
                        ]);
                      }), 128))
                    ]),
                    createVNode(_component_Button, {
                      label: _ctx.$t("blockEditor.addItem"),
                      icon: "pi pi-plus",
                      size: "small",
                      outlined: "",
                      onClick: addContact
                    }, null, 8, ["label"])
                  ])
                ], 64)) : __props.type === "gallery" ? (openBlock(), createBlock(Fragment, { key: 11 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.imageUrl")), 1),
                    createVNode(_component_MediaPicker, {
                      modelValue: unref(galleryModel),
                      "onUpdate:modelValue": ($event) => isRef(galleryModel) ? galleryModel.value = $event : null,
                      multiple: true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  unref(local).images && unref(local).images.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "kb-field"
                  }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.altText")), 1),
                    createVNode("div", { class: "kb-items" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(local).images, (im, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "kb-item"
                        }, [
                          im.url ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: im.url,
                            class: "kb-thumb",
                            alt: ""
                          }, null, 8, ["src"])) : createCommentVNode("", true),
                          createVNode(_component_InputText, {
                            modelValue: im.alt,
                            "onUpdate:modelValue": ($event) => im.alt = $event,
                            placeholder: _ctx.$t("blockEditor.altText")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Button, {
                            icon: "pi pi-times",
                            text: "",
                            severity: "danger",
                            onClick: ($event) => removeGalleryImage(i)
                          }, null, 8, ["onClick"])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.columns")), 1),
                      createVNode(_component_Dropdown, {
                        modelValue: unref(local).columns,
                        "onUpdate:modelValue": ($event) => unref(local).columns = $event,
                        options: unref(columnsOptions),
                        optionLabel: "label",
                        optionValue: "value"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.caption")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).caption,
                        "onUpdate:modelValue": ($event) => unref(local).caption = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ])
                ], 64)) : __props.type === "quote" ? (openBlock(), createBlock(Fragment, { key: 12 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.quoteText")), 1),
                    createVNode(_component_Textarea, {
                      modelValue: unref(local).quote,
                      "onUpdate:modelValue": ($event) => unref(local).quote = $event,
                      rows: "3",
                      autoResize: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-row" }, [
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.author")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).author,
                        "onUpdate:modelValue": ($event) => unref(local).author = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "kb-field" }, [
                      createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.role")), 1),
                      createVNode(_component_InputText, {
                        modelValue: unref(local).role,
                        "onUpdate:modelValue": ($event) => unref(local).role = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.imageUrl")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).avatarUrl,
                      "onUpdate:modelValue": ($event) => unref(local).avatarUrl = $event,
                      placeholder: _ctx.$t("blockEditor.imageUrl")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                    createVNode(_component_MediaPicker, {
                      modelValue: unref(quoteAvatarModel),
                      "onUpdate:modelValue": ($event) => isRef(quoteAvatarModel) ? quoteAvatarModel.value = $event : null,
                      multiple: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ], 64)) : __props.type === "accordion" ? (openBlock(), createBlock(Fragment, { key: 13 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", { class: "kb-checkline" }, [
                      createVNode(_component_Checkbox, {
                        modelValue: unref(local).firstOpen,
                        "onUpdate:modelValue": ($event) => unref(local).firstOpen = $event,
                        binary: true
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("span", null, toDisplayString(_ctx.$t("blockEditor.firstItemOpen")), 1)
                    ])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.items")), 1),
                    createVNode("div", { class: "kb-items" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(local).items || [], (it, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "kb-accordionrow"
                        }, [
                          createVNode(_component_InputText, {
                            modelValue: it.q,
                            "onUpdate:modelValue": ($event) => it.q = $event,
                            placeholder: _ctx.$t("blockEditor.question")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Textarea, {
                            modelValue: it.a,
                            "onUpdate:modelValue": ($event) => it.a = $event,
                            rows: "2",
                            autoResize: "",
                            placeholder: _ctx.$t("blockEditor.answer")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_component_Button, {
                            icon: "pi pi-times",
                            text: "",
                            severity: "danger",
                            onClick: ($event) => removeAccordion(i)
                          }, null, 8, ["onClick"])
                        ]);
                      }), 128))
                    ]),
                    createVNode(_component_Button, {
                      label: _ctx.$t("blockEditor.addItem"),
                      icon: "pi pi-plus",
                      size: "small",
                      outlined: "",
                      onClick: addAccordion
                    }, null, 8, ["label"])
                  ])
                ], 64)) : __props.type === "video" ? (openBlock(), createBlock(Fragment, { key: 14 }, [
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.videoUrl")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).url,
                      "onUpdate:modelValue": ($event) => unref(local).url = $event,
                      placeholder: "https://youtube.com/watch?v=\u2026"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "kb-field" }, [
                    createVNode("label", null, toDisplayString(_ctx.$t("blockEditor.caption")), 1),
                    createVNode(_component_InputText, {
                      modelValue: unref(local).caption,
                      "onUpdate:modelValue": ($event) => unref(local).caption = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("small", { class: "kb-note" }, toDisplayString(_ctx.$t("blockEditor.videoHint")), 1)
                ], 64)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/blocks/BlockWidgetDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9d63c647"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=BlockWidgetDialog-JIMrR0ha.mjs.map
