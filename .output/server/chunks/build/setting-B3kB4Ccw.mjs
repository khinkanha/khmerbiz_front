import { f as defineStore } from './server.mjs';
import { u as useApi } from './useApi-C5-eJazW.mjs';
import { ref, readonly } from 'vue';

const useSettingStore = defineStore("setting", () => {
  const api = useApi();
  const settings = ref(null);
  const banners = ref([]);
  const socialMedia = ref([]);
  const fetchSettings = async () => {
    try {
      const response = await api.get("/settings");
      if (response.success && response.data) {
        settings.value = response.data;
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    }
  };
  const updateSettings = async (data) => {
    try {
      const response = await api.put("/settings/general", data);
      if (response.success) {
        if (settings.value) {
          settings.value = { ...settings.value, ...data };
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update settings:", error);
      return false;
    }
  };
  const fetchBanners = async () => {
    try {
      const response = await api.get("/banners");
      if (response.success && response.data) {
        banners.value = response.data;
      }
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  };
  const addBanner = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("link", data.link);
      formData.append("banner_order", String(data.banner_order));
      formData.append("status", String(data.status));
      if (typeof data.photo === "string") {
        formData.append("existing_photo", data.photo);
      } else if (data.photo) {
        formData.append("photo", data.photo);
      }
      const response = await api.post("/banners", formData);
      if (response.success && response.data) {
        await fetchBanners();
        return { success: true, id: response.data.banner_id };
      }
      return { success: false };
    } catch (error) {
      console.error("Failed to add banner:", error);
      return { success: false };
    }
  };
  const updateBanner = async (id, data) => {
    console.warn("updateBanner: no backend endpoint for banner update");
    return false;
  };
  const deleteBanner = async (id) => {
    try {
      const response = await api.delete(`/banners/${id}`);
      if (response.success) {
        banners.value = banners.value.filter((b) => b.banner_id !== id);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to delete banner:", error);
      return false;
    }
  };
  const fetchSocialMedia = async () => {
    try {
      const response = await api.get("/settings/social-media");
      if (response.success && response.data) {
        socialMedia.value = response.data;
      }
    } catch (error) {
      console.error("Failed to fetch social media:", error);
    }
  };
  const addSocialMedia = async (data) => {
    try {
      const response = await api.post("/settings/social-media", data);
      if (response.success && response.data) {
        await fetchSocialMedia();
        return { success: true, id: response.data.social_id };
      }
      return { success: false };
    } catch (error) {
      console.error("Failed to add social media:", error);
      return { success: false };
    }
  };
  const updateSocialMedia = async (id, data) => {
    console.warn("updateSocialMedia: no backend endpoint for social media update");
    return false;
  };
  const deleteSocialMedia = async (id) => {
    try {
      const response = await api.delete(`/settings/social-media/${id}`);
      if (response.success) {
        socialMedia.value = socialMedia.value.filter((s) => s.social_id !== id);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to delete social media:", error);
      return false;
    }
  };
  const updateLogoSettings = async (data) => {
    try {
      const formData = new FormData();
      if (typeof data.logo === "string") {
        formData.append("existing_logo", data.logo);
      } else if (data.logo) {
        formData.append("logo", data.logo);
      }
      if (typeof data.mobileLogo === "string") {
        formData.append("existing_mobile_logo", data.mobileLogo);
      } else if (data.mobileLogo) {
        formData.append("mobile_logo", data.mobileLogo);
      }
      const response = await api.put("/settings/logo", formData);
      if (response.success) {
        await fetchSettings();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update logo settings:", error);
      return false;
    }
  };
  const languages = ref([]);
  const fetchLanguages = async () => {
    try {
      const response = await api.get("/settings/languages");
      if (response.success && response.data) {
        languages.value = response.data;
      }
    } catch (error) {
      console.error("Failed to fetch languages:", error);
    }
  };
  const addLanguage = async (data) => {
    try {
      const response = await api.post("/settings/languages", data);
      if (response.success && response.data) {
        await fetchLanguages();
        return { success: true, id: response.data.lang_id };
      }
      return { success: false };
    } catch (error) {
      console.error("Failed to add language:", error);
      return { success: false };
    }
  };
  const deleteLanguage = async (id) => {
    try {
      const response = await api.delete(`/settings/languages/${id}`);
      if (response.success) {
        languages.value = languages.value.filter((l) => l.lang_id !== id);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to delete language:", error);
      return false;
    }
  };
  const setDefaultLanguage = async (id) => {
    try {
      const response = await api.put(`/settings/languages/${id}/default`, {});
      if (response.success) {
        await fetchLanguages();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to set default language:", error);
      return false;
    }
  };
  const reorderBanners = (reordered) => {
    banners.value = reordered.map((banner, index) => ({ ...banner, banner_order: index }));
  };
  return {
    settings: readonly(settings),
    banners: readonly(banners),
    socialMedia: readonly(socialMedia),
    languages: readonly(languages),
    fetchSettings,
    updateSettings,
    fetchBanners,
    addBanner,
    updateBanner,
    deleteBanner,
    reorderBanners,
    fetchSocialMedia,
    addSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
    updateLogoSettings,
    fetchLanguages,
    addLanguage,
    deleteLanguage,
    setDefaultLanguage
  };
});

export { useSettingStore as u };
//# sourceMappingURL=setting-B3kB4Ccw.mjs.map
