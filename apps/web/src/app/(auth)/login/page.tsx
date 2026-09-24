import Link from "next/link";
import { Button } from "@repo/ui/button";
import { TopAppBar } from "@/shared/components";
import { GlobalFooter } from "@/shared/components";
import { LiveClassCard } from "@/features/auth/components/LiveClassCard";
import {
  AiSphereMark,
  ClassLinkIcon,
  CleverIcon,
  GoogleIcon,
  MicrosoftIcon,
} from "@/shared/components";
import { Mail } from "lucide-react";

// Each row here maps 1:1 to an SSO provider button in the design.
// `onSelect` is left to the caller (NestJS auth service) to wire up —
// this page only renders the entry points.
const SSO_OPTIONS = [
  {
    key: "google",
    label: "Tiếp tục với Google",
    icon: <GoogleIcon className="size-5" />,
  },
  {
    key: "microsoft",
    label: "Tiếp tục với Microsoft",
    icon: <MicrosoftIcon className="size-5" />,
  },
  { key: "clever", label: "Tiếp tục với Clever", icon: <CleverIcon /> },
  {
    key: "classlink",
    label: "Tiếp tục với ClassLink",
    icon: <ClassLinkIcon className="size-5" />,
  },
] as const;

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FB]">
      <main className="flex flex-1 items-center justify-center px-8 py-14">
        <div className="grid w-full max-w-[1152px] grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Left column — auth actions */}
          <section className="max-w-[512px] lg:col-span-6">
            <AiSphereMark className="mb-6" />

            <h1 className="text-[36px] font-extrabold leading-[40px] tracking-[-0.9px] text-[#191C1E]">
              Chào mừng trở lại với
              <br />
              LingoLearn.
            </h1>

            <p className="mt-3 max-w-[448px] text-sm leading-5 text-[#464554]">
              Bằng việc tiếp tục, bạn đồng ý với{" "}
              <a href="/terms" className="font-medium text-[#4648D4]">
                Điều khoản dịch vụ
              </a>{" "}
              và{" "}
              <a href="/privacy" className="font-medium text-[#4648D4]">
                Chính sách quyền riêng tư
              </a>{" "}
              của LingoLearn.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {SSO_OPTIONS.map((opt) => (
                <Button
                  key={opt.key}
                  variant="outline"
                  size="lg"
                  className="relative h-auto w-full justify-center rounded-full border-[#C6C5D7]/70 py-3.5 text-sm font-semibold text-[#191C1E] shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] hover:bg-[#F7F9FB]"
                >
                  <span className="absolute left-6">{opt.icon}</span>
                  {opt.label}
                </Button>
              ))}

              <Button
                asChild
                variant="outline"
                size="lg"
                className="relative h-auto w-full justify-center rounded-full border-[#C6C5D7]/70 py-3.5 text-sm font-semibold text-[#191C1E] shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] hover:bg-[#F7F9FB]"
              >
                <Link href="/login/email">
                  <Mail className="absolute left-6 size-5 text-[#464554]" />
                  Đăng nhập với Email
                </Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-[#464554]">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="font-semibold text-[#4648D4]">
                Đăng ký ngay
              </Link>
            </p>
          </section>

          {/* Right column — live AI class showcase */}
          <section className="flex justify-self-stretch lg:col-span-6 lg:justify-end">
            <LiveClassCard />
          </section>
        </div>
      </main>
    </div>
  );
}
