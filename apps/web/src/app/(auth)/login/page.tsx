"use client";

import { CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { Label } from "@repo/ui/label";
import { GoogleChromeLogoIcon, AppleLogoIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useGoogleLogin, useLogin } from "../../../features/auth";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useGoogleLogin as useGoogleOAuth } from "@react-oauth/google";

function VerificationHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const verified = searchParams.get("verified");
    if (verified === 'true') {
      toast.success('Xác thực email thành công! Đăng nhập để sử dụng hệ thống');
    } else if (verified === 'false') {
      toast.error('Đường dẫn xác thực không hợp lệ hoặc đã hết hạn!');
    }
  }, [searchParams]);

  return null;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const { mutate: loginMutate, isPending } = useLogin();
  const { mutate: googleLoginMutate } = useGoogleLogin();

  const googleLogin = useGoogleOAuth({
    onSuccess: (tokenResponse) => {
      if (tokenResponse.access_token) {
        googleLoginMutate(tokenResponse.access_token);
      }
    },
    onError: () => {
      toast.error('Đăng nhập Google thất bại');
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    loginMutate(form);
  }

  return (
    <div className="w-full mx-auto sm:max-w-md">
      <Suspense fallback={null}>
        <VerificationHandler />
      </Suspense>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to access our musical library</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Username or Email</Label>
            <Input
              id="identifier"
              placeholder="John Doe"
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeSlashIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>
          </div>

          <Button className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-right text-sm">
            <a href="/forgot-password" className="underline font-medium">
              Forgot password?
            </a>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t" />
            <span className="px-2 text-xs text-muted-foreground uppercase">
              Or continue with
            </span>
            <div className="flex-grow border-t" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => googleLogin()}
            >
              <GoogleChromeLogoIcon className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" type="button">
              <AppleLogoIcon className="mr-2 h-4 w-4" /> Apple
            </Button>
          </div>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline font-medium">
              Sign Up
            </a>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
