"use client";

import { useEffect, useState } from "react";
import { Mail, Send, Info, ArrowLeft, MailCheck } from "lucide-react";

const RESEND_COOLDOWN_SECONDS = 60;

interface VerifyEmailContentProps {
  /** Email address the verification link was sent to. */
  email: string;
  /** Called when the user asks to resend the verification email. */
  onResend: () => Promise<void> | void;
  /** Navigates back to the login page. */
  onBackToLogin: () => void;
}

/**
 * Content of the "check your email" screen shown right after sign-up.
 * Header and footer are intentionally NOT included here — render this
 * inside your existing app shell/layout.
 */
export default function VerifyEmailContent({
  email,
  onResend,
  onBackToLogin,
}: VerifyEmailContentProps) {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const canResend = secondsLeft === 0 && !isResending;

  const handleResend = async () => {
    if (!canResend) return;
    setIsResending(true);
    try {
      await onResend();
    } finally {
      setIsResending(false);
      setSecondsLeft(RESEND_COOLDOWN_SECONDS);
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-10">
      <div className="relative w-full max-w-[512px] overflow-hidden rounded-2xl border border-[#c7c4d7]/30 bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
        {/* Decorative background glows */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-48 rounded-full bg-[#e1e0ff] opacity-50 blur-[32px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-48 rounded-full bg-[#e9ddff] opacity-50 blur-[32px]" />

        <div className="relative flex flex-col items-center px-10 pb-10 pt-10">
          {/* Icon */}
          <div className="relative mb-6">
            <div className="flex size-24 items-center justify-center rounded-full bg-[#e1e0ff] shadow-[0_10px_15px_-3px_rgba(70,72,212,0.1),0_4px_6px_-4px_rgba(70,72,212,0.1)]">
              <Mail className="size-9 text-[#4648d4]" strokeWidth={2} />
            </div>
            <div className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-[#6b38d4] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
              <MailCheck className="size-4 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-center text-4xl font-bold leading-[48px] tracking-[-0.8px] text-[#191c1e]">
            Kiểm tra email của bạn
          </h1>

          {/* Description */}
          <div className="mt-2 flex flex-col items-center text-center">
            <p className="text-base leading-[26px] text-[#464554]">
              Chúng tôi đã gửi email xác thực tới
            </p>
            <span className="rounded bg-[#eceef0] px-2 text-base font-bold leading-[26px] text-[#191c1e]">
              {email}
            </span>
          </div>

          {/* Instruction box */}
          <div className="mt-6 flex w-full items-start gap-3 rounded-xl border border-[#c7c4d7]/40 bg-[#f2f4f6] p-[17px]">
            <Info
              className="mt-0.5 size-5 shrink-0 text-[#4648d4]"
              strokeWidth={2}
            />
            <div className="flex flex-col gap-1 text-sm leading-5">
              <p className="font-semibold text-[#191c1e]">
                Hướng dẫn kích hoạt tài khoản:
              </p>
              <p className="text-[#464554]">
                Vui lòng mở hộp thư đến, kiểm tra cả mục{" "}
                <span className="font-medium text-[#191c1e]">Spam/Thư rác</span>{" "}
                nếu không thấy trong hòm thư chính, sau đó bấm vào liên kết xác
                thực để bắt đầu trải nghiệm.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex w-full flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4648d4] px-6 py-[14px] text-base text-white shadow-[0_4px_6px_-1px_rgba(70,72,212,0.2),0_2px_4px_-2px_rgba(70,72,212,0.2)] transition-opacity disabled:cursor-not-allowed disabled:opacity-75"
            >
              <Send className="size-[13px]" strokeWidth={2.5} />
              <span>
                {canResend
                  ? "Gửi lại email xác thực"
                  : `Gửi lại email xác thực (${secondsLeft}s)`}
              </span>
            </button>

            <button
              type="button"
              onClick={onBackToLogin}
              className="flex items-center gap-2 pt-1 text-sm font-semibold text-[#4648d4] hover:underline"
            >
              <ArrowLeft className="size-[13px]" strokeWidth={2.5} />
              Quay lại trang đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
