"use client";

import { useState } from "react";
import { useRegister } from "@/features/auth/hooks";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GoogleIcon } from "@/shared/components";

const PASSWORD_RULES = [
  { key: "length", label: "≥ 8 ký tự", test: (v: string) => v.length >= 8 },
  {
    key: "upper",
    label: "Chữ hoa (A-Z)",
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    key: "lower",
    label: "Chữ thường (a-z)",
    test: (v: string) => /[a-z]/.test(v),
  },
  {
    key: "special",
    label: "Số & ký tự đặc biệt",
    test: (v: string) => /[0-9!@#$%^&*]/.test(v),
  },
];

const STRENGTH_LABEL = ["Chưa nhập", "Yếu", "Trung bình", "Khá", "Mạnh"];

export function SignUpFormCard() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const { mutate: register, isPending } = useRegister();

  const passedRules = PASSWORD_RULES.filter((r) => r.test(password)).length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreedTerms) return;
    register({ username: fullName, email, password });
  }

  return (
    <div className="w-full max-w-[448px] rounded-3xl border border-[rgba(198,197,215,0.3)] bg-white p-[33px] shadow-[0px_20px_25px_-5px_rgba(216,218,220,0.4),0px_8px_10px_-6px_rgba(216,218,220,0.4)]">
      {/* Header & Title */}
      <div className="flex flex-col gap-1.5 pb-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#4648d4]/10 px-3 py-1 text-xs font-semibold text-[#4648d4]">
          <Sparkles className="size-3" />
          Trải nghiệm học AI miễn phí
        </span>
        <h1 className="pt-1.5 text-[30px] font-extrabold tracking-[-0.75px] text-[#191c1e]">
          Tạo tài khoản LingoLearn
        </h1>
        <p className="text-sm text-[#464554]">
          Nâng trình ngoại ngữ vượt trội cùng trợ lý AI thông minh mỗi ngày.
        </p>
      </div>

      {/* Google Auth */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="relative h-auto w-full justify-center rounded-full border-[#C6C5D7]/70 py-3.5 text-sm font-semibold text-[#191c1E] shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] hover:bg-[#F7F9FB]"
      >
        <GoogleIcon className="absolute left-6 size-5" />
        Tiếp tục với Google
      </Button>

      {/* Divider */}
      <div className="flex items-center py-4">
        <div className="h-px flex-1 bg-[rgba(198,197,215,0.4)]" />
        <span className="px-3 text-xs font-semibold uppercase tracking-[0.6px] text-[#767586]">
          Hoặc đăng ký bằng email
        </span>
        <div className="h-px flex-1 bg-[rgba(198,197,215,0.4)]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-5">
        {/* Full name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-[0.6px] text-[#191c1e]">
            Họ và tên
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 size-3 -translate-y-1/2 text-[#767586]" />
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="rounded-xl bg-[#f7f9fb] pl-10 border-[rgba(198,197,215,0.6)]"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-[0.6px] text-[#191c1e]">
            Email của bạn
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 size-3 -translate-y-1/2 text-[#767586]" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="rounded-xl bg-[#f7f9fb] pl-10 border-[rgba(198,197,215,0.6)]"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-[0.6px] text-[#191c1e]">
            Mật khẩu
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 size-3 -translate-y-1/2 text-[#767586]" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Tạo mật khẩu bảo mật"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl bg-[#f7f9fb] px-10 border-[rgba(198,197,215,0.6)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767586]"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {/* Strength bar */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#464554]">
                Độ mạnh mật khẩu:
              </span>
              <span className="text-[11px] font-bold text-[#767586]">
                {STRENGTH_LABEL[passedRules]}
              </span>
            </div>
            <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-[#e6e8ea]">
              {PASSWORD_RULES.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-full flex-1 rounded-full transition-colors",
                    i < passedRules ? "bg-[#4648d4]" : "bg-[#c6c5d7]",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-[rgba(198,197,215,0.3)] bg-[rgba(242,244,246,0.8)] p-[13px]">
          {PASSWORD_RULES.map((rule) => {
            const ok = rule.test(password);
            return (
              <div key={rule.key} className="flex items-center gap-1.5">
                <Check
                  className={cn(
                    "size-3 rounded-full",
                    ok ? "text-[#4648d4]" : "text-[#c6c5d7]",
                  )}
                />
                <span className="text-xs text-[#767586]">{rule.label}</span>
              </div>
            );
          })}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2.5 pt-1">
          <Checkbox
            checked={agreedTerms}
            onCheckedChange={(v) => setAgreedTerms(!!v)}
            className="mt-1"
          />
          <label className="text-xs text-[#464554]">
            Tôi đồng ý với{" "}
            <a href="/terms" className="font-semibold text-[#4648d4]">
              Điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a href="/privacy" className="font-semibold text-[#4648d4]">
              Chính sách bảo mật
            </a>{" "}
            của LingoLearn.
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!agreedTerms}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4648d4] py-6 text-sm font-bold tracking-[0.35px] text-white shadow-[0px_4px_6px_-1px_rgba(70,72,212,0.25),0px_2px_4px_-2px_rgba(70,72,212,0.25)] hover:bg-[#4648d4]/90"
        >
          Tạo tài khoản miễn phí
          <ArrowRight className="size-3" />
        </Button>
      </form>

      {/* Bottom hint */}
      <div className="border-t border-[rgba(198,197,215,0.2)] pt-[17px] text-center text-xs text-[#464554]">
        Đã có tài khoản LingoLearn?{" "}
        <a href="/login" className="font-bold text-[#4648d4]">
          Đăng nhập ngay
        </a>
      </div>
    </div>
  );
}
