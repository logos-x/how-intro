"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import VerifyEmailContent from "@/features/auth/components/VerifyEmailContent";

function VerifyEmailInner() {
  const router = useRouter();
  const email = useSearchParams().get("email");

  if (!email) {
    router.replace("/register");
    return null;
  }

  async function handleResend() {
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email!,
      options: { emailRedirectTo: `${window.location.origin}/auth/confirm` },
    });
    if (error)
      toast.error("Bạn thao tác quá nhanh, vui lòng thử lại sau ít phút.");
    else toast.success("Đã gửi lại email xác thực.");
  }

  return (
    <VerifyEmailContent
      email={email}
      onResend={handleResend}
      onBackToLogin={() => router.push("/login")}
    />
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailInner />
    </Suspense>
  );
}
