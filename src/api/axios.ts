import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("accessToken");
    const expiry = localStorage.getItem("tokenExpiry");

    if (
      config.url?.includes("/auth/login")
    ) {
      return config;
    }

    // ❌ No token → redirect
    if (!token) {
      window.location.href = "/ecommerce-app-ManRa/login";
      return config;
    }

    // ❌ Expired token → clear & redirect
    if (expiry && Date.now() > Number(expiry)) {
      console.log("Token expired");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenExpiry");

      window.location.href = "/login";
      return config;
    }

    // ✅ Attach token
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ✅ Response Interceptor (backup safety)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;