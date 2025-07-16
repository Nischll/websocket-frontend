import axios from "axios";
import { getToken, removeToken } from "./utility/authService";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiService = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, (only needed for cookies)
});

// Request Interceptor
apiService.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      // try {
      //   await apiService.post("api/auth/refresh");
      //   return apiService(originalRequest);
      // } catch (refreshError) {
      //   console.log("Refresh API Failed");
      //   return Promise.reject(refreshError);
      // }
      removeToken();

      window.location.href = "/";

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
