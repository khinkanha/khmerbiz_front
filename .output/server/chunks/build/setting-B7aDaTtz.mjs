import { f as defineStore } from './server.mjs';
import { u as useApi } from './auth-CZZkTxj2.mjs';
import { u as useDomainStore } from './domain-CF4nfyOM.mjs';
import { ref, computed, watch, readonly } from 'vue';

const designTokensToCssVars = (style) => {
  var _a, _b;
  const c = style == null ? void 0 : style.colors;
  const vars = {};
  if (c) {
    vars["--primary-color"] = c.primary;
    vars["--primary-dark"] = c.primaryDark;
    vars["--bg-color"] = c.background;
    vars["--text-color"] = c.text;
    vars["--nav-bg"] = c.navBackground;
    vars["--footer-bg"] = c.footerBackground;
    vars["--card-bg"] = c.cardBackground;
  }
  if ((_a = style == null ? void 0 : style.fonts) == null ? void 0 : _a.body) vars["--kb-body-font"] = style.fonts.body;
  if ((_b = style == null ? void 0 : style.fonts) == null ? void 0 : _b.heading) vars["--kb-heading-font"] = style.fonts.heading;
  if (typeof (style == null ? void 0 : style.radius) === "number") vars["--kb-radius"] = `${style.radius}px`;
  return vars;
};
const THEME_PRESETS = {
  0: { primary: "#3b82f6", primaryDark: "#1d4ed8", background: "#ffffff", text: "#1f2937", navBackground: "#3b82f6", footerBackground: "#1f2937", cardBackground: "#ffffff" },
  1: { primary: "#0ea5e9", primaryDark: "#0369a1", background: "#0f172a", text: "#e2e8f0", navBackground: "#1e293b", footerBackground: "#020617", cardBackground: "#1e293b" },
  2: { primary: "#dc2626", primaryDark: "#991b1b", background: "#ffffff", text: "#1f2937", navBackground: "#dc2626", footerBackground: "#1f2937", cardBackground: "#ffffff" },
  3: { primary: "#16a34a", primaryDark: "#166534", background: "#ffffff", text: "#1f2937", navBackground: "#16a34a", footerBackground: "#1f2937", cardBackground: "#ffffff" },
  4: { primary: "#7c3aed", primaryDark: "#5b21b6", background: "#ffffff", text: "#1f2937", navBackground: "#7c3aed", footerBackground: "#1f2937", cardBackground: "#ffffff" },
  5: { primary: "#eab308", primaryDark: "#a16207", background: "#ffffff", text: "#1f2937", navBackground: "#eab308", footerBackground: "#1f2937", cardBackground: "#ffffff" }
};
const PRESET_NAMES = {
  0: "Blue (default)",
  1: "Dark",
  2: "Red",
  3: "Green",
  4: "Purple",
  5: "Yellow"
};
const FONT_OPTIONS = [
  { label: "Inter", value: "Inter, system-ui, sans-serif" },
  { label: "Poppins", value: "Poppins, system-ui, sans-serif" },
  { label: "Roboto", value: "Roboto, system-ui, sans-serif" },
  { label: "Open Sans", value: '"Open Sans", system-ui, sans-serif' },
  { label: "Battambang (\u1781\u17D2\u1798\u17C2\u179A)", value: "'Battambang', system-ui, sans-serif" },
  { label: "Moul (\u1781\u17D2\u1798\u17C2\u179A)", value: "'Moul', system-ui, sans-serif" },
  { label: "System default", value: "system-ui, sans-serif" }
];
const defaultStyle = (themeIndex = 0) => {
  var _a;
  return {
    colors: { ...(_a = THEME_PRESETS[themeIndex]) != null ? _a : THEME_PRESETS[0] },
    fonts: {
      heading: "Inter, system-ui, sans-serif",
      body: "Inter, system-ui, sans-serif",
      baseSize: 16
    },
    radius: 10,
    spacing: 16
  };
};
const DESIGN_PRESETS = [
  {
    name: "Ocean",
    colors: { primary: "#0ea5e9", primaryDark: "#0369a1", background: "#f8fafc", text: "#0f172a", navBackground: "#0ea5e9", footerBackground: "#0f172a", cardBackground: "#ffffff" },
    fonts: { heading: "Poppins, system-ui, sans-serif", body: "Inter, system-ui, sans-serif", baseSize: 16 },
    radius: 12
  },
  {
    name: "Forest",
    colors: { primary: "#16a34a", primaryDark: "#166534", background: "#ffffff", text: "#1f2937", navBackground: "#16a34a", footerBackground: "#14532d", cardBackground: "#ffffff" },
    fonts: { heading: "Roboto, system-ui, sans-serif", body: "Inter, system-ui, sans-serif", baseSize: 16 },
    radius: 8
  },
  {
    name: "Sunset",
    colors: { primary: "#f97316", primaryDark: "#c2410c", background: "#fffbeb", text: "#1f2937", navBackground: "#f97316", footerBackground: "#7c2d12", cardBackground: "#ffffff" },
    fonts: { heading: "Poppins, system-ui, sans-serif", body: "Inter, system-ui, sans-serif", baseSize: 17 },
    radius: 16
  },
  {
    name: "Royal",
    colors: { primary: "#7c3aed", primaryDark: "#5b21b6", background: "#faf5ff", text: "#1f2937", navBackground: "#7c3aed", footerBackground: "#2e1065", cardBackground: "#ffffff" },
    fonts: { heading: "Poppins, system-ui, sans-serif", body: "Inter, system-ui, sans-serif", baseSize: 16 },
    radius: 10
  },
  {
    name: "Coral",
    colors: { primary: "#ef4444", primaryDark: "#b91c1c", background: "#ffffff", text: "#1f2937", navBackground: "#ef4444", footerBackground: "#1f2937", cardBackground: "#ffffff" },
    fonts: { heading: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif", baseSize: 16 },
    radius: 6
  },
  {
    name: "Slate",
    colors: { primary: "#475569", primaryDark: "#1e293b", background: "#ffffff", text: "#0f172a", navBackground: "#1e293b", footerBackground: "#020617", cardBackground: "#f8fafc" },
    fonts: { heading: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif", baseSize: 15 },
    radius: 4
  }
];
const defaultDesign = (domainId = null, themeIndex = 0) => ({
  version: 1,
  domain_id: domainId,
  style: defaultStyle(themeIndex),
  header: null,
  footer: null,
  pages: {}
});
const defaultHeader = () => ({
  layout: "logo-left",
  regions: [
    { id: "left", items: [{ type: "logo" }, { type: "menu" }] },
    { id: "center", items: [] },
    { id: "right", items: [{ type: "social" }] }
  ]
});
const defaultFooter = () => ({
  columns: [
    { items: [{ type: "text", payload: { text: "About your company." } }] },
    { items: [{ type: "menu" }] },
    { items: [{ type: "social" }] }
  ]
});
const readLs = (domainId) => {
  return null;
};
const writeLs = (design) => {
  return;
};
const normalize = (d, domainId) => {
  var _a, _b, _c, _d, _e, _f;
  return {
    version: (_a = d == null ? void 0 : d.version) != null ? _a : 1,
    domain_id: (_b = d == null ? void 0 : d.domain_id) != null ? _b : domainId,
    style: (_c = d == null ? void 0 : d.style) != null ? _c : defaultStyle(),
    header: (_d = d == null ? void 0 : d.header) != null ? _d : null,
    footer: (_e = d == null ? void 0 : d.footer) != null ? _e : null,
    pages: (_f = d == null ? void 0 : d.pages) != null ? _f : {}
  };
};
const useDesignStore = defineStore("design", () => {
  const api = useApi();
  const design = ref(null);
  const loading = ref(false);
  const saving = ref(false);
  const dirty = ref(false);
  const style = computed(() => {
    var _a2;
    var _a;
    return (_a2 = (_a = design.value) == null ? void 0 : _a.style) != null ? _a2 : null;
  });
  const past = ref([]);
  const future = ref([]);
  const HISTORY_LIMIT = 60;
  let muted = 0;
  watch(design, (_n, o) => {
    if (muted > 0 || !o) return;
    past.value.push(JSON.parse(JSON.stringify(o)));
    if (past.value.length > HISTORY_LIMIT) past.value.shift();
    future.value = [];
  }, { flush: "sync" });
  const undo = () => {
    if (!past.value.length || !design.value) return;
    muted++;
    try {
      future.value.push(JSON.parse(JSON.stringify(design.value)));
      design.value = past.value.pop();
    } finally {
      muted = Math.max(0, muted - 1);
    }
    dirty.value = true;
  };
  const redo = () => {
    if (!future.value.length || !design.value) return;
    muted++;
    try {
      past.value.push(JSON.parse(JSON.stringify(design.value)));
      design.value = future.value.pop();
    } finally {
      muted = Math.max(0, muted - 1);
    }
    dirty.value = true;
  };
  const canUndo = computed(() => past.value.length > 0);
  const canRedo = computed(() => future.value.length > 0);
  const clearHistory = () => {
    past.value = [];
    future.value = [];
  };
  const resolveDomainId = (domainId) => {
    var _a2;
    var _a;
    if (domainId) return domainId;
    try {
      return (_a2 = (_a = useDomainStore().domain) == null ? void 0 : _a.domain_id) != null ? _a2 : null;
    } catch {
      return null;
    }
  };
  const currentThemeIndex = () => {
    var _a2;
    var _a;
    try {
      return Number((_a2 = (_a = useDomainStore().settings) == null ? void 0 : _a.theme) != null ? _a2 : 0);
    } catch {
      return 0;
    }
  };
  const seedFromTheme = (domainId) => defaultDesign(domainId, currentThemeIndex());
  const hydrateFromServer = () => {
    return false;
  };
  const loadPublicDesign = async (domainId) => {
    if (design.value) return;
    const id = resolveDomainId(domainId);
    muted++;
    try {
      if (hydrateFromServer()) ;
      let cfgDesign = null;
      try {
        cfgDesign = useDomainStore().siteDesign;
      } catch {
      }
      if (cfgDesign) {
        design.value = normalize(cfgDesign, id);
        dirty.value = false;
        return;
      }
      design.value = seedFromTheme(id);
      dirty.value = false;
    } finally {
      muted = Math.max(0, muted - 1);
    }
  };
  const loadDesign = async (domainId) => {
    if (design.value) return;
    const id = resolveDomainId(domainId);
    muted++;
    try {
      if (hydrateFromServer()) ;
      loading.value = true;
      try {
        const endpoint = id ? `/admin/design?domain_id=${id}` : "/admin/design";
        const res = await api.get(endpoint);
        if (res.success && res.data) {
          design.value = normalize(res.data, id);
          dirty.value = false;
          loading.value = false;
          return;
        }
      } catch {
      }
      const ls = readLs(id);
      design.value = ls ? normalize(ls, id) : seedFromTheme(id);
      dirty.value = false;
      loading.value = false;
    } finally {
      muted = Math.max(0, muted - 1);
    }
  };
  const saveDesign = async (domainId) => {
    if (!design.value) return false;
    const id = resolveDomainId(domainId);
    design.value.domain_id = id;
    saving.value = true;
    let saved = false;
    try {
      const endpoint = id ? `/admin/design?domain_id=${id}` : "/admin/design";
      const res = await api.put(endpoint, design.value);
      saved = !!(res && res.success);
    } catch {
      saved = false;
    }
    if (!saved) writeLs(design.value);
    saving.value = false;
    dirty.value = false;
    clearHistory();
    return saved;
  };
  const ensureDesign = () => {
    if (!design.value) design.value = seedFromTheme(resolveDomainId());
    return design.value;
  };
  const updateStyle = (partial) => {
    var _a;
    const d = ensureDesign();
    const base = (_a = d.style) != null ? _a : defaultStyle(currentThemeIndex());
    design.value = { ...d, style: { ...base, ...partial } };
    dirty.value = true;
  };
  const setColor = (key, value) => {
    var _a;
    const d = ensureDesign();
    const base = (_a = d.style) != null ? _a : defaultStyle(currentThemeIndex());
    design.value = { ...d, style: { ...base, colors: { ...base.colors, [key]: value } } };
    dirty.value = true;
  };
  const applyPreset = (themeIndex) => {
    var _a;
    const d = ensureDesign();
    const base = (_a = d.style) != null ? _a : defaultStyle(currentThemeIndex());
    design.value = { ...d, style: { ...base, colors: { ...defaultStyle(themeIndex).colors } } };
    dirty.value = true;
  };
  const applyDesignPreset = (preset) => {
    var _a2;
    var _a;
    const d = ensureDesign();
    design.value = {
      ...d,
      style: {
        colors: { ...preset.colors },
        fonts: {
          heading: preset.fonts.heading,
          body: preset.fonts.body,
          baseSize: preset.fonts.baseSize
        },
        radius: preset.radius,
        spacing: (_a2 = (_a = d.style) == null ? void 0 : _a.spacing) != null ? _a2 : 16
      }
    };
    dirty.value = true;
  };
  const resetStyle = () => {
    const d = ensureDesign();
    design.value = { ...d, style: defaultStyle(currentThemeIndex()) };
    dirty.value = true;
  };
  const homeSections = computed(() => {
    var _a2;
    var _a, _b, _c;
    return (_a2 = (_c = (_b = (_a = design.value) == null ? void 0 : _a.pages) == null ? void 0 : _b.home) == null ? void 0 : _c.sections) != null ? _a2 : [];
  });
  const addSection = (slot) => {
    var _a2;
    var _a;
    const d = ensureDesign();
    const home = (_a2 = (_a = d.pages) == null ? void 0 : _a.home) != null ? _a2 : { sections: [] };
    design.value = {
      ...d,
      pages: { ...d.pages, home: { sections: [...home.sections, slot] } }
    };
    dirty.value = true;
  };
  const updateSection = (index, slot) => {
    var _a;
    const d = design.value;
    if (!((_a = d == null ? void 0 : d.pages) == null ? void 0 : _a.home)) return;
    const sections = [...d.pages.home.sections];
    if (index < 0 || index >= sections.length) return;
    sections[index] = slot;
    design.value = { ...d, pages: { ...d.pages, home: { sections } } };
    dirty.value = true;
  };
  const removeSection = (index) => {
    var _a;
    const d = design.value;
    if (!((_a = d == null ? void 0 : d.pages) == null ? void 0 : _a.home)) return;
    const sections = d.pages.home.sections.filter((_, i) => i !== index);
    design.value = { ...d, pages: { ...d.pages, home: { sections } } };
    dirty.value = true;
  };
  const moveSection = (from, to) => {
    var _a;
    const d = design.value;
    if (!((_a = d == null ? void 0 : d.pages) == null ? void 0 : _a.home)) return;
    const sections = [...d.pages.home.sections];
    if (from < 0 || from >= sections.length || to < 0 || to >= sections.length) return;
    const [moved] = sections.splice(from, 1);
    sections.splice(to, 0, moved);
    design.value = { ...d, pages: { ...d.pages, home: { sections } } };
    dirty.value = true;
  };
  const duplicateSection = (index) => {
    var _a;
    const d = design.value;
    if (!((_a = d == null ? void 0 : d.pages) == null ? void 0 : _a.home)) return;
    const sections = [...d.pages.home.sections];
    const orig = sections[index];
    if (!orig) return;
    const copy = JSON.parse(JSON.stringify(orig));
    sections.splice(index + 1, 0, copy);
    design.value = { ...d, pages: { ...d.pages, home: { sections } } };
    dirty.value = true;
  };
  const homeHeader = computed(() => {
    var _a2;
    var _a;
    return (_a2 = (_a = design.value) == null ? void 0 : _a.header) != null ? _a2 : null;
  });
  const homeFooter = computed(() => {
    var _a2;
    var _a;
    return (_a2 = (_a = design.value) == null ? void 0 : _a.footer) != null ? _a2 : null;
  });
  const patchHeader = (updater) => {
    var _a;
    const d = ensureDesign();
    const draft = JSON.parse(JSON.stringify((_a = d.header) != null ? _a : defaultHeader()));
    updater(draft);
    design.value = { ...d, header: draft };
    dirty.value = true;
  };
  const patchFooter = (updater) => {
    var _a;
    const d = ensureDesign();
    const draft = JSON.parse(JSON.stringify((_a = d.footer) != null ? _a : defaultFooter()));
    updater(draft);
    design.value = { ...d, footer: draft };
    dirty.value = true;
  };
  return {
    design: readonly(design),
    style: readonly(style),
    homeSections: readonly(homeSections),
    homeHeader: readonly(homeHeader),
    homeFooter: readonly(homeFooter),
    loading: readonly(loading),
    saving: readonly(saving),
    dirty: readonly(dirty),
    canUndo: readonly(canUndo),
    canRedo: readonly(canRedo),
    loadDesign,
    loadPublicDesign,
    saveDesign,
    hydrateFromServer,
    undo,
    redo,
    updateStyle,
    setColor,
    applyPreset,
    applyDesignPreset,
    resetStyle,
    addSection,
    updateSection,
    removeSection,
    moveSection,
    duplicateSection,
    patchHeader,
    patchFooter
  };
});
const SOCIAL_ICONS = {
  1: "pi pi-google",
  2: "pi pi-facebook",
  3: "pi pi-youtube",
  4: "pi pi-linkedin",
  5: "pi pi-twitter",
  6: "pi pi-telegram",
  7: "pi pi-instagram"
};
const getSocialIcon = (stype) => {
  return SOCIAL_ICONS[stype] || "pi pi-globe";
};

export { DESIGN_PRESETS as D, FONT_OPTIONS as F, PRESET_NAMES as P, THEME_PRESETS as T, defaultFooter as a, designTokensToCssVars as b, defaultHeader as d, getSocialIcon as g, useDesignStore as u };
//# sourceMappingURL=setting-B7aDaTtz.mjs.map
