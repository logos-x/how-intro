import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "outline";
}

export function Badge({ children, className = "", variant = "solid" }: BadgeProps) {
  const base =
    "inline-flex items-center gap-1 rounded-full px-4 py-1 text-sm font-semibold leading-5";
  const styles =
    variant === "outline"
      ? "border border-[#c7c4d7] bg-[#e6e8ea] text-xs leading-4 px-[17px] py-[5px]"
      : "";
  return <span className={`${base} ${styles} ${className}`}>{children}</span>;
}
