import { f as defineStore, b as useRuntimeConfig } from './server.mjs';
import { ref, computed, readonly } from 'vue';

let accessToken = null;
let refreshToken = null;
let handlingAuthFailure = false;
const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl;
  const setTokens = (access, refresh) => {
    accessToken = access;
    refreshToken = refresh;
  };
  const getStoredTokens = () => {
  };
  const clearTokens = () => {
    accessToken = null;
    refreshToken = null;
  };
  const handleAuthFailure = () => {
    if (handlingAuthFailure) return;
    handlingAuthFailure = true;
    clearTokens();
    try {
      useAuthStore().forceLogout();
    } catch (error) {
      console.error("Failed to force logout after auth failure:", error);
    }
  };
  const refreshAccessToken = async () => {
    if (!refreshToken) return false;
    try {
      const response = await $fetch(
        `${baseURL}/auth/refresh`,
        {
          method: "POST",
          body: { refreshToken }
        }
      );
      if (response) {
        setTokens(response.accessToken, response.refreshToken || refreshToken);
        return true;
      }
      return false;
    } catch (error) {
      clearTokens();
      return false;
    }
  };
  const apiFetch = async (endpoint, options = {}) => {
    const url = `${baseURL}${endpoint}`;
    const isFormData = options.body instanceof FormData;
    const headers = {
      ...options.headers
    };
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    try {
      const response = await globalThis.fetch(url, {
        ...options,
        headers
      });
      const data = await response.json();
      if (response.status === 401) {
        const isAuthEndpoint = endpoint.startsWith("/auth/");
        if (!isAuthEndpoint) {
          if (refreshToken) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
              return apiFetch(endpoint, options);
            }
          }
          handleAuthFailure();
          return {
            success: false,
            message: data.message || "Session expired. Please log in again."
          };
        }
      }
      if (!response.ok || data.status === false) {
        return {
          success: false,
          message: data.message || "An error occurred",
          errors: data.errors
        };
      }
      return {
        success: true,
        data: data.data || data,
        message: data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Network error"
      };
    }
  };
  const get = (endpoint) => apiFetch(endpoint, { method: "GET" });
  const post = (endpoint, body) => apiFetch(endpoint, {
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body)
  });
  const put = (endpoint, body) => apiFetch(endpoint, {
    method: "PUT",
    body: body instanceof FormData ? body : JSON.stringify(body)
  });
  const del = (endpoint) => apiFetch(endpoint, { method: "DELETE" });
  return {
    get,
    post,
    put,
    delete: del,
    setTokens,
    clearTokens,
    getStoredTokens
  };
};
const useAuthStore = defineStore("auth", () => {
  const api = useApi();
  const user = ref(null);
  const accessToken2 = ref(null);
  const refreshToken2 = ref(null);
  const isAuthenticated = computed(() => !!user.value && !!accessToken2.value);
  const clearAuth = () => {
    user.value = null;
    accessToken2.value = null;
    refreshToken2.value = null;
  };
  const forceLogout = () => {
    clearAuth();
  };
  const initialize = () => {
  };
  const setTokens = (access, refresh) => {
    accessToken2.value = access;
    refreshToken2.value = refresh;
  };
  const setUser = (userData) => {
    user.value = userData;
  };
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.success && response.data) {
        const { user: userData, accessToken: access, refreshToken: refresh } = response.data;
        setTokens(access, refresh);
        setUser(userData);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false };
    }
  };
  const signup = async (data) => {
    const response = await api.post("/auth/signup", data);
    if (response.success) {
      return true;
    }
    const error = new Error(response.message || "Signup failed");
    error.errors = response.errors || [];
    throw error;
  };
  const logout = async () => {
    try {
      await api.post("/auth/logout", {});
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      user.value = null;
      accessToken2.value = null;
      refreshToken2.value = null;
    }
  };
  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/me");
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };
  const checkAuth = async () => {
    if (user.value) {
      await fetchProfile();
    }
  };
  const updateProfile = async (data) => {
    try {
      const response = await api.put("/users/me", data);
      if (response.success && response.data) {
        setUser(response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update profile:", error);
      return false;
    }
  };
  const changePassword = async (data) => {
    try {
      const response = await api.put("/users/me/password", data);
      return { success: response.success, message: response.message };
    } catch (error) {
      return { success: false, message: error.message || "Password change failed" };
    }
  };
  const isSuperAdmin = computed(() => {
    var _a;
    return ((_a = user.value) == null ? void 0 : _a.user_level) === -1;
  });
  const isWebAdmin = computed(() => {
    var _a;
    return ((_a = user.value) == null ? void 0 : _a.user_level) === 1;
  });
  const isNormalUser = computed(() => {
    var _a;
    return ((_a = user.value) == null ? void 0 : _a.user_level) === 2;
  });
  return {
    user: readonly(user),
    isAuthenticated,
    isSuperAdmin,
    isWebAdmin,
    isNormalUser,
    initialize,
    login,
    signup,
    logout,
    fetchProfile,
    checkAuth,
    updateProfile,
    changePassword,
    clearAuth,
    forceLogout
  };
});

export { useAuthStore as a, useApi as u };
//# sourceMappingURL=auth-CZZkTxj2.mjs.map
