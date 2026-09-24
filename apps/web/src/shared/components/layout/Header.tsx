import Link from "next/link";
import { Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Trang chủ", href: "/", active: true },
  { label: "Khóa học", href: "/khoa-hoc" },
  { label: "Tính năng", href: "/tinh-nang" },
  { label: "AI Voice Tutor", href: "/ai-voice-tutor" },
  { label: "Về chúng tôi", href: "/ve-chung-toi" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#f7f9fb]/95 backdrop-blur drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/apps/web/public" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-[#4648d4]" strokeWidth={2.2} />
          <span className="text-xl font-bold leading-7 text-[#4648d4]">
            LingoLearn
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-1 text-sm font-semibold leading-5 transition-colors ${
                link.active
                  ? "text-[#191c1e]"
                  : "text-[#464554] hover:text-[#191c1e]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-1 text-sm font-semibold leading-5 text-[#4648d4]"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-[#4648d4] px-6 py-2 text-sm font-semibold leading-5 text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.02]"
          >
            Bắt đầu miễn phí
          </Link>
        </div>
      </div>
    </header>
  );
}
