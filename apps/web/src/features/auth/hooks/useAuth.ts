import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth-store";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/core/constants/routes";
import {
  ApiResponse,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
} from "@repo/shared";
import { AxiosError } from "axios";

export const AUTH_QUERY_KEY = "authentication-key";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: () => {
      toast.success("Đăng ký thành công! Kiểm tra email để xác thực.");
    },
    onError: (error: AxiosError<ApiResponse<RegisterResponse>>) => {
      const message = error.response?.data?.message ?? "Đã có lỗi xảy ra";
      toast.error(message);
    },
  });
}

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (res) => {
      const { user } = res.data;
      setUser(user);
      toast.success("Đăng nhập thành công");
      router.push(ROUTE.HOME);
    },
    onError: (error: AxiosError<ApiResponse<LoginResponse>>) => {
      const message = error.response?.data?.message ?? "Đã có lỗi xảy ra";
      toast.error(message);
    },
  });
}

export function useGoogleLogin() {
  return useMutation({
    mutationFn: () => authApi.googleLogin(),
    onError: (error: AxiosError<ApiResponse<LoginResponse>>) => {
      const message = error.response?.data.message ?? "Đã có lỗi xảy ra";
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
      toast.success("Đăng xuất thành công");
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
      toast.success("Đổi mật khẩu thành công");
      router.push(ROUTE.LOGIN);
    },
    onError: (error: AxiosError<ApiResponse<void>>) => {
      const message = error.response?.data.message ?? "Đã có lỗi xảy ra";
      toast.error(message);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
    onSuccess: () => {
      toast.success("Kiểm tra email để đặt lại mật khẩu");
    },
    onError: (error: AxiosError<ApiResponse<void>>) => {
      const message = error.response?.data.message ?? "Đã có lỗi xảy ra";
      toast.error(message);
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onSuccess: () => {
      toast.success("Đặt lại mật khẩu thành công");
      router.push(ROUTE.LOGIN);
    },
    onError: (error: AxiosError<ApiResponse<void>>) => {
      const message = error.response?.data.message ?? "Đã có lỗi xảy ra";
      toast.error(message);
    },
  });
}
