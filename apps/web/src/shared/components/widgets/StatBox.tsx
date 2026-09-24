import { cn } from "@/lib/utils";

interface StatBoxProps {
  value: string;
  label: string;
  color?: "primary" | "success" | "purple";
}

const COLOR_MAP = {
  primary: "text-[#4648d4]",
  success: "text-[#006a48]",
  purple: "text-[#6b38d4]",
};

export function StatBox({ value, label, color = "primary" }: StatBoxProps) {
  return (
    <div className="flex-1 rounded-2xl border border-[rgba(198,197,215,0.2)] bg-[#f2f4f6] p-[11px] text-center">
      <p className={cn("text-base font-extrabold", COLOR_MAP[color])}>
        {value}
      </p>
      <p className="text-[11px] font-medium text-[#767586]">{label}</p>
    </div>
  );
}
