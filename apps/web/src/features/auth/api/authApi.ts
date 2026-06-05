import { apiClient } from '@/core/api';
import type {
  ApiResponse,
  ForgotPasswordRequest,
  GoogleLoginRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ChangePasswordRequest
} from '@repo/shared';
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

  changePassword(data: ChangePasswordRequest) {
    return apiClient.patch<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      data
    )
  },

  forgotPassword(data: ForgotPasswordRequest) {
    return apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data
    );
  },

  resetPassword(data: ResetPasswordRequest) {
    return apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data
    );
  }
};
