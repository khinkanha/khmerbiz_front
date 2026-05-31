import { u as useApi } from './useApi-C5-eJazW.mjs';
import { ref, readonly } from 'vue';

const useSetup = () => {
  const api = useApi();
  const setupStatus = ref(null);
  const loading = ref(false);
  const fetchStatus = async () => {
    loading.value = true;
    try {
      const response = await api.get("/setup/status");
      if (response.success && response.data) {
        setupStatus.value = response.data;
      }
    } catch (error) {
      console.error("Failed to fetch setup status:", error);
    } finally {
      loading.value = false;
    }
    return setupStatus.value;
  };
  const createLanguage = async (data) => {
    const response = await api.post("/settings/languages", {
      ...data,
      is_default: 1
    });
    return response.success;
  };
  const createMenus = async (items) => {
    const results = [];
    for (const item of items) {
      const response = await api.post("/menus", {
        item_name: item.item_name,
        item_url: "",
        lang_id: item.lang_id,
        parent_id: 0
      });
      if (response.success && response.data) {
        results.push({ item_id: response.data.item_id, item_name: item.item_name });
      }
    }
    return results;
  };
  const updateSiteTitle = async (title) => {
    const response = await api.put("/settings/general", { title });
    return response.success;
  };
  const createContent = async (data) => {
    const response = await api.post("/content", data);
    return response.success;
  };
  return {
    setupStatus: readonly(setupStatus),
    loading,
    fetchStatus,
    createLanguage,
    createMenus,
    updateSiteTitle,
    createContent
  };
};

export { useSetup as u };
//# sourceMappingURL=useSetup-DyrI_Dqo.mjs.map
