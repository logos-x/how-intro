export type {
  RegisterRequest,
  LoginRequest,
  GoogleLoginRequest,
  RefreshRequest,
  LogoutRequest,
  ChangePasswordRequest,
  UserInfo,
  RegisterResponse,
  LoginResponse,
  RefreshResponse,
} from "./auth";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
