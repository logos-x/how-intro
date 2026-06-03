import { UserInfo } from '@repo/shared';
import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  user: UserInfo | null;
  isAuthenticated: boolean;
  setAuth: (payload: { accessToken: string; user: UserInfo }) => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,

  setAuth: ({ accessToken, user }) => set({ accessToken, user, isAuthenticated: true }),

  setAccessToken: (token) => set({ accessToken: token }),

  clearAuth: () => set({ accessToken: null, user: null, isAuthenticated: false }),
}))

