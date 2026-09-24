"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, HelpCircle } from "lucide-react";

interface AuthPrompt {
  /** e.g. "Đã có tài khoản?" or "Chưa có tài khoản?" */
  question: string;
  actionLabel: string;
  href: string;
}

const SIGN_UP_PROMPT: AuthPrompt = {
  question: "Đã có tài khoản?",
  actionLabel: "Đăng nhập",
  href: "/login",
};

const SIGN_IN_PROMPT: AuthPrompt = {
  question: "Chưa có tài khoản?",
  actionLabel: "Đăng ký ngay",
  href: "/register",
};

// Routes that count as "the user is on a sign-in screen" — add new
// login-related paths here (e.g. SSO callback pages) as they appear.
const SIGN_IN_ROUTE_PREFIXES = ["/sign-in", "/login"];

function resolveAuthPrompt(pathname: string): AuthPrompt {
  const isSignInRoute = SIGN_IN_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  return isSignInRoute ? SIGN_IN_PROMPT : SIGN_UP_PROMPT;
}

interface TopAppBarProps {
  /**
   * Optional escape hatch: skips route-based detection and forces a
   * specific prompt. Most pages don't need this — TopAppBar infers
   * sign-in vs sign-up automatically from the current path.
   */
  authPrompt?: AuthPrompt;
}

export function TopAppBar({ authPrompt }: TopAppBarProps) {
  const pathname = usePathname();
  const prompt = authPrompt ?? resolveAuthPrompt(pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(198,197,215,0.3)] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#4648d4] shadow-[0px_4px_6px_-1px_rgba(70,72,212,0.2),0px_2px_4px_-2px_rgba(70,72,212,0.2)]">
            <GraduationCap className="size-5 text-white" />
          </span>
          <span className="text-xl font-extrabold tracking-[-0.5px] text-[#191c1e]">
            Lingo<span className="text-[#4648d4]">Learn</span>
          </span>
        </Link>

        {/* Right links */}
        <div className="flex items-center gap-6">
          <Link
            href="/support"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#464554]"
          >
            <HelpCircle className="size-[15px]" />
            Hỗ trợ
          </Link>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-[#464554]">{prompt.question}</span>
            <Link
              href={prompt.href}
              className="pl-1 font-semibold text-[#4648d4]"
            >
              {prompt.actionLabel}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
