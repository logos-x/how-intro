import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Chính sách bảo mật", href: "/privacy" },
  { label: "Điều khoản dịch vụ", href: "/terms" },
  { label: "Tiêu chuẩn cộng đồng", href: "/community-guidelines" },
  { label: "Trợ giúp & FAQ", href: "/support" },
];

export function GlobalFooter() {
  return (
    <footer className="w-full border-t border-[rgba(198,197,215,0.3)] bg-white pb-5 pt-[21px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#4648d4]" />
          <span className="text-xs text-[#767586]">
            © {new Date().getFullYear()} LingoLearn AI Inc. Tất cả quyền được
            bảo lưu.
          </span>
        </div>
        <nav className="flex items-center gap-5">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-[#767586] hover:text-[#4648d4]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
