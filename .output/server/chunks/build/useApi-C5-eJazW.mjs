import { b as useRuntimeConfig } from './server.mjs';

let accessToken = null;
let refreshToken = null;
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
      if (response.status === 401 && refreshToken) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          return apiFetch(endpoint, options);
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

export { useApi as u };
//# sourceMappingURL=useApi-C5-eJazW.mjs.map
