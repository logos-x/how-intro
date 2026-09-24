import { UserInfo } from "@repo/shared";
import { create } from "zustand";

interface AuthState {
  user: UserInfo | null;
  isAuthenticated: boolean;
  setUser: (user: UserInfo | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));
