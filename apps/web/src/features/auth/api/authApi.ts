import { createClient } from "@/lib/supabase/client";
import type {
  RegisterRequest,
  LoginRequest,
  ChangePasswordRequest,
} from "@repo/shared";
import { apiClient } from "@/core/api";

const supabase = createClient();

export const authApi = {
  register: async (data: RegisterRequest) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/callback`,
        data: {
          username: data.username,
          name: data.name ?? data.username,
        },
      },
    });
    if (error) throw error;
    return { data: { message: "Registration successful" } }
  },

  login: async (data: LoginRequest) => {
    const { data: session, error } = await supabase.auth.signInWithPassword({
      email: data.identifier.includes("@") ? data.identifier : "",
      password: data.password,
    });
    if (error) throw error;

    const userRes = await apiClient.get("/auth/me");
    return {
      data: {
        accessToken: session.session.access_token,
        user: userRes.data.data,
      },
    };
  },

  googleLogin: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });
    if (error) throw error;
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  changePassword: async (data: ChangePasswordRequest) => {
    const { error } = await supabase.auth.updateUser({
      password: data.newPassword,
    });
    if (error) throw error;
  },

  forgotPassword: async (data: { email: string }) => {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  resetPassword: async (data: { token: string; password: string}) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });
    if (error) throw error;
  }
};
