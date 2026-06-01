import { f as defineStore } from './server.mjs';
import { u as useApi } from './useApi-C5-eJazW.mjs';
import { ref, computed, readonly } from 'vue';

const useAuthStore = defineStore("auth", () => {
  const api = useApi();
  const user = ref(null);
  const accessToken = ref(null);
  const refreshToken = ref(null);
  const isAuthenticated = computed(() => !!user.value && !!accessToken.value);
  const initialize = () => {
  };
  const setTokens = (access, refresh) => {
    accessToken.value = access;
    refreshToken.value = refresh;
  };
  const setUser = (userData) => {
    user.value = userData;
  };
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      console.log(login, "Login response:", response);
      if (response.success && response.data) {
        const { user: userData, accessToken: access, refreshToken: refresh } = response.data;
        setTokens(access, refresh);
        setUser(userData);
        console.log("Login successful:", access, refresh, userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
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
      accessToken.value = null;
      refreshToken.value = null;
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
    changePassword
  };
});

export { useAuthStore as u };
//# sourceMappingURL=auth-Bg8VnjAZ.mjs.map
