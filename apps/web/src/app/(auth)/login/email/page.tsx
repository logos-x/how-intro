"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Checkbox } from "@repo/ui/checkbox";
import { toast } from "sonner";
import { LiveClassCard } from "@/features/auth/components/LiveClassCard";
import { useLogin } from "@/features/auth/hooks";
import {
  AiSphereMark,
  CleverIcon,
  GoogleIcon,
  MicrosoftIcon,
} from "@/shared/components";

export default function SignInWithEmailPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: login } = useLogin();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login({
        identifier: email,
        password,
      });
    } catch (error) {
      toast.error("Đăng nhập thất bại, vui lòng thử lại");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FB]">
      <main className="flex flex-1 items-center justify-center px-8 py-14">
        <div className="grid w-full max-w-[1152px] grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Left column — email/password form */}
          <section className="max-w-[512px] lg:col-span-6">
            <Link
              href="/login"
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#767586] hover:text-[#191C1E]"
            >
              <ArrowLeft className="size-4" />
              Tất cả phương thức đăng nhập
            </Link>

            <AiSphereMark className="mb-4" />

            <h1 className="text-[36px] font-extrabold leading-[40px] tracking-[-0.9px] text-[#191C1E]">
              Đăng nhập với Email
            </h1>

            <p className="mt-2 max-w-[448px] text-sm leading-5 text-[#464554]">
              Nhập địa chỉ email và mật khẩu của bạn để tiếp tục hành trình học
              tiếng Anh với LingoLearn.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-bold tracking-[0.6px] text-[#191C1E] uppercase"
                >
                  Email của bạn
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-[#767586]" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="h-auto rounded-xl border-[#C6C5D7]/70 py-3.5 pl-10 pr-4 text-sm shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs font-bold tracking-[0.6px] text-[#191C1E] uppercase"
                  >
                    Mật khẩu
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#4648D4]"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-[#767586]" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-auto rounded-xl border-[#C6C5D7]/70 py-3.5 pl-10 pr-11 text-sm shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#767586] hover:text-[#191C1E]"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 py-1 text-sm text-[#464554]">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(v) => setRememberMe(v === true)}
                />
                Ghi nhớ phiên đăng nhập trên thiết bị này
              </label>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-auto w-full rounded-full bg-[#4648D4] py-3.5 text-sm font-bold text-white shadow-[0_4px_6px_-1px_rgba(70,72,212,0.3),0_2px_4px_-2px_rgba(70,72,212,0.3)] hover:bg-[#3d3fc0]"
              >
                Đăng nhập
                <ArrowRight className="size-4" />
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#E6E8EA]" />
              <span className="text-[11px] font-bold tracking-[0.55px] text-[#767586] uppercase">
                Hoặc tiếp tục với
              </span>
              <span className="h-px flex-1 bg-[#E6E8EA]" />
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="relative h-auto w-full justify-center rounded-full border-[#C6C5D7]/70 py-3.5 text-sm font-semibold text-[#191c1E] shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] hover:bg-[#F7F9FB]"
              >
                <GoogleIcon className="absolute left-6 size-5" />
                Tiếp tục với Google
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="relative h-auto w-full justify-center rounded-full border-[#C6C5D7]/70 py-3.5 text-sm font-semibold text-[#191c1E] shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] hover:bg-[#F7F9FB]"
              >
                <MicrosoftIcon className="absolute left-6 size-5" />
                Tiếp tục với Microsoft
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="relative h-auto w-full justify-center rounded-full border-[#C6C5D7]/70 py-3.5 text-sm font-semibold text-[#191c1E] shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] hover:bg-[#F7F9FB]"
              >
                <CleverIcon className="absolute left-6 size-5" />
                Tiếp tục với Clever
              </Button>
            </div>

            <p className="mt-6 flex gap-1 text-sm text-[#464554]">
              Chưa có tài khoản?{" "}
              <Link href="/sign-up" className="font-semibold text-[#4648D4]">
                Đăng ký ngay
              </Link>
            </p>
          </section>

          {/* Right column — live AI class showcase (shared with /sign-in) */}
          <section className="flex justify-self-stretch lg:col-span-6 lg:justify-end">
            <LiveClassCard />
          </section>
        </div>
      </main>
    </div>
  );
}
