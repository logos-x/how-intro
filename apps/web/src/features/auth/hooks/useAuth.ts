import { ApiResponse, ChangePasswordRequest, ForgotPasswordRequest, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ResetPasswordRequest } from "@repo/shared";
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

export function useGoogleLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (credential: string) => authApi.googleLogin(credential),
    onSuccess: (res) => {
      const { accessToken, user } = res.data.data;
      setAuth({ accessToken, user });
      toast.success('Đăng nhập với Google thành công');
      router.push(ROUTE.HOME);
    },
    onError: (error: AxiosError<ApiResponse<LoginResponse>>) => {
      const message = error.response?.data.message ?? 'Đã có lỗi xảy ra';
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

export function useChangePassword() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
    onSuccess: () => {
      clearAuth();
      toast.success('Đổi mật khẩu thành công');
      router.push(ROUTE.LOGIN);
    },
    onError: (error: AxiosError<ApiResponse<void>>) => {
      const message = error.response?.data.message ?? 'Đã có lỗi xảy ra';
      toast.error(message);
    }
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
    onSuccess: () => {
      toast.success('Kiểm tra email để đặt lại mật khẩu');
    },
    onError: (error: AxiosError<ApiResponse<void>>) => {
      const message = error.response?.data.message ?? 'Đã có lỗi xảy ra';
      toast.error(message);
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onSuccess: () => {
      toast.success('Đặt lại mật khẩu thành công');
      router.push(ROUTE.LOGIN);
    },
    onError: (error: AxiosError<ApiResponse<void>>) => {
      const message = error.response?.data.message ?? 'Đã có lỗi xảy ra';
      toast.error(message);
    },
  });
}