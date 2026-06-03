import { apiClient } from "../../../core/api/client";
import type { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@repo/shared";
import { API_ENDPOINTS } from "../../../core/api";

export const authApi = {
  register: async (data: RegisterRequest) => {
    const res = await apiClient.post<ApiResponse<RegisterResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
    );
    return res.data;
  },

  login: async (data: LoginRequest) => {
    const res = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      data,
    );
    return res.data;
  }
};
