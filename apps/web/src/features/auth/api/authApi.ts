import { apiClient } from '@/core/api';
import type { ApiResponse, GoogleLoginRequest, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@repo/shared';
import { API_ENDPOINTS } from "@/core/api";

export const authApi = {
  register: async (data: RegisterRequest) => {
    return apiClient.post<ApiResponse<RegisterResponse>>(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  login: async (data: LoginRequest) => {
    return apiClient.post<ApiResponse<LoginResponse>>(API_ENDPOINTS.AUTH.LOGIN, data);
  },

  googleLogin: async (accessToken: string) => {
    return apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.GOOGLE,
      { accessToken } satisfies GoogleLoginRequest,
    );
  },

  logout: () => {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  refresh: () => {
    return apiClient.post<ApiResponse<{ accessToken: string }>>(API_ENDPOINTS.AUTH.REFRESH);
  },
};
