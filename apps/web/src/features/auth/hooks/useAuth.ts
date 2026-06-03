import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@repo/shared";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const AUTH_QUERY_KEY = "authentication-key";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: () => {
      toast.success('Đăng ký thành công');
    },
    onError: (error: AxiosError<ApiResponse<RegisterResponse>>) => {
      const message = error.response?.data?.message ?? 'Đã có lỗi xảy ra';
      toast.error(message);
    }
  })
};

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: () => {
      toast.success('Đăng nhập thành công');
    },
    onError: (error: AxiosError<ApiResponse<LoginResponse>>) => {
      const message = error.response?.data?.message ?? 'Đã có lỗi xảy ra';
      toast.error(message);
    }
  })
}