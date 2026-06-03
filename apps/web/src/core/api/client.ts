import axios from "axios"; 
import { InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/auth';

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(new Error("Network error: No response received"));
    }

    const { status, config } = error.response;

    if (status !== 401 || config.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token: string) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(config));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const res = await apiClient.post<{
        data: { accessToken: string };
      }>('/auth/refresh');

      const newToken = res.data.data.accessToken;

      useAuthStore.getState().setAccessToken(newToken);

      refreshQueue.forEach((q) => q.resolve(newToken));
      refreshQueue = [];

      config.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(config);
    } catch (refreshError) {
      refreshQueue.forEach((q) => q.reject(refreshError));
      refreshQueue = [];

      useAuthStore.getState().clearAuth();
      window.location.href = '/login';

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
