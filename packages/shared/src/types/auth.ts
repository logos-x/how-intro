// Request DTOs
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

// Response DTOs
export interface UserInfo {
  id: string;
  email: string | null;
  name: string | null;
  roleId: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
  email: string | null;
  name: string | null;
}

export interface LoginResponse {
  accessToken: string;
  user: UserInfo;
}

export interface RefreshResponse {
  accessToken: string;
}
