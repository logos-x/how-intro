"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { createClient } from "@/lib/supabase/client";

type Reason = "expired" | "invalid_link";

const COPY: Record<Reason, { title: string; description: string }> = {
  expired: {
    title: "Liên kết không hợp lệ hoặc đã hết hạn",
    description:
      "Liên kết xác thực chỉ dùng được một lần và có thời hạn. Nếu bạn đã xác thực trước đó, hãy đăng nhập. Nếu chưa, nhập email để nhận liên kết mới.",
  },
  invalid_link: {
    title: "Liên kết xác thực không đúng",
    description:
      "Liên kết có thể đã bị cắt ngắn khi sao chép. Hãy mở lại email và bấm trực tiếp vào nút xác thực, hoặc đăng ký lại.",
  },
};

export default function VerifyErrorContent({ reason }: { reason: Reason }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { title, description } = COPY[reason];

  async function handleResend() {
    if (!email) return;
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/confirm` },
    });
    setLoading(false);

    if (error) {
      toast.error("Bạn thao tác quá nhanh, vui lòng thử lại sau ít phút.");
      return;
    }
    router.push(`/verify-email?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[512px] rounded-2xl border border-[#c7c4d7]/30 bg-white p-10 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-red-50">
            <TriangleAlert className="size-9 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#191c1e]">{title}</h1>
          <p className="mt-2 text-base text-[#464554]">{description}</p>

          {reason === "expired" && (
            <div className="mt-6 flex w-full flex-col gap-3">
              <Input
                type="email"
                placeholder="Email đã đăng ký"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                onClick={handleResend}
                disabled={loading || !email}
                className="w-full bg-[#4648d4] hover:bg-[#3b3dbd]"
              >
                Gửi lại email xác thực
              </Button>
            </div>
          )}

          <div className="mt-6 flex gap-4 text-sm font-semibold text-[#4648d4]">
            <Link href="/login" className="hover:underline">
              Đăng nhập
            </Link>
            <Link href="/register" className="hover:underline">
              Đăng ký lại
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
