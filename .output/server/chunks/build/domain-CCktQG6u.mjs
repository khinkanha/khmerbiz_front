import { f as defineStore } from './server.mjs';
import { u as useApi } from './auth-CZZkTxj2.mjs';
import { ref, readonly } from 'vue';

const useDomainStore = defineStore("domain", () => {
  const api = useApi();
  const domain = ref(null);
  const settings = ref(null);
  const languages = ref([]);
  const currentLanguage = ref(null);
  const banners = ref([]);
  const socialMedia = ref([]);
  const menuTree = ref([]);
  const menuCache = ref({});
  const hydrateFromServer = () => {
    return false;
  };
  const getSavedLangId = () => {
    return null;
  };
  const resolveDomain = async (domainId) => {
    if (domain.value && !domainId) {
      if (languages.value.length > 0) {
        const langToUse = languages.value[0].lang_id;
        await setLanguage(langToUse);
      }
      return;
    }
    try {
      let endpoint;
      if (domainId) {
        endpoint = `/site/config?domain_id=${domainId}`;
      } else if (false) ;
      else {
        endpoint = "/site/config";
      }
      let response = await api.get(endpoint);
      if (response.success && response.data) {
        domain.value = response.data.domain;
        settings.value = response.data.settings;
        languages.value = response.data.languages;
        banners.value = response.data.banners;
        socialMedia.value = response.data.socialMedia;
        if (languages.value.length > 0) {
          const savedLangId = getSavedLangId();
          const langToUse = savedLangId && languages.value.find((l) => l.lang_id === savedLangId) ? savedLangId : languages.value[0].lang_id;
          await setLanguage(langToUse);
        }
      }
    } catch (error) {
      console.error("Failed to resolve domain:", error);
    }
  };
  const setLanguage = async (langId) => {
    const lang = languages.value.find((l) => l.lang_id === langId);
    if (lang) {
      currentLanguage.value = lang;
      await fetchMenuTree();
    }
  };
  const fetchMenuTree = async () => {
    var _a;
    if (!currentLanguage.value) return;
    const langId = currentLanguage.value.lang_id;
    const domainId = (_a = domain.value) == null ? void 0 : _a.domain_id;
    if (menuCache.value[langId]) {
      menuTree.value = menuCache.value[langId];
      return;
    }
    try {
      const endpoint = domainId ? `/site/menu?domain_id=${domainId}&lang_id=${langId}` : `/site/menu?lang_id=${langId}`;
      const response = await api.get(endpoint);
      if (response.success && response.data) {
        const data = response.data;
        const tree = Array.isArray(data) ? buildMenuTree(data) : data;
        menuTree.value = tree;
        menuCache.value[langId] = tree;
      }
    } catch (error) {
      console.error("Failed to fetch menu tree:", error);
    }
  };
  const buildMenuTree = (items) => {
    const map = /* @__PURE__ */ new Map();
    const roots = [];
    items.forEach((item) => {
      map.set(item.item_id, { ...item, children: [] });
    });
    items.forEach((item) => {
      const node = map.get(item.item_id);
      if (!node) return;
      if (item.parent_id === 0) {
        roots.push(node);
      } else {
        const parent = map.get(item.parent_id);
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(node);
        }
      }
    });
    return roots;
  };
  const clearCache = () => {
    menuCache.value = {};
  };
  const getThemeName = (style) => {
    const themes = {
      0: "default",
      1: "inverse",
      2: "red",
      3: "green",
      4: "purple",
      5: "yellow"
    };
    return themes[style] || "default";
  };
  const getTemplateName = (style) => {
    const templates = {
      0: "ClassicMultiPage",
      1: "ScrollingSinglePage",
      2: "MagazineGrid",
      3: "FullscreenHero"
    };
    return templates[style] || "ClassicMultiPage";
  };
  return {
    domain: readonly(domain),
    settings: readonly(settings),
    languages: readonly(languages),
    currentLanguage: readonly(currentLanguage),
    banners: readonly(banners),
    socialMedia: readonly(socialMedia),
    menuTree: readonly(menuTree),
    resolveDomain,
    hydrateFromServer,
    setLanguage,
    fetchMenuTree,
    clearCache,
    getThemeName,
    getTemplateName
  };
});

export { useDomainStore as u };
//# sourceMappingURL=domain-CCktQG6u.mjs.map
