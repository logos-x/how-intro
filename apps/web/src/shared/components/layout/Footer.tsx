import Link from "next/link";
import { Sparkles } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Support", href: "/support" },
  { label: "Careers", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-[#c7c4d7] bg-[#f2f4f6]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <Link href="/apps/web/public" className="flex items-center gap-2">
          <Sparkles
            className="h-[18px] w-[22px] text-[#4648d4]"
            strokeWidth={2.2}
          />
          <span className="text-xl font-bold leading-7 text-[#4648d4]">
            LingoLearn
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm leading-5 text-[#464554] hover:text-[#191c1e]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-sm leading-5 text-[#464554]">
          © 2025 LingoLearn AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
