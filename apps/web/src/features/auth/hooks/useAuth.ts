import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@repo/shared";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/auth-store";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/core/constants/routes";

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
    },
  });
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (res) => {
      const { accessToken, user } = res.data.data;
      setAuth({ accessToken, user });
      toast.success('Đăng nhập thành công');
      router.push(ROUTE.HOME);
    },
    onError: (error: AxiosError<ApiResponse<LoginResponse>>) => {
      const message = error.response?.data?.message ?? 'Đã có lỗi xảy ra';
      toast.error(message);
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();
  
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      toast.success('Đăng xuất thành công');
      router.push(ROUTE.LOGIN);
    },
  });
}