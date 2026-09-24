import { LucideIcon, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  iconBg: string;
  title: string;
  description: string;
  linkColor: string;
}

export function FeatureCard({
  icon: Icon,
  iconBg,
  title,
  description,
  linkColor,
}: FeatureCardProps) {
  return (
    <div className="flex flex-1 flex-col justify-between rounded-2xl border border-[#c7c4d7] bg-white p-[25px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col items-start gap-1">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="h-6 w-6 text-[#191c1e]" strokeWidth={2} />
        </div>
        <h3 className="pt-3 text-xl font-semibold leading-7 text-[#191c1e]">
          {title}
        </h3>
        <p className="text-sm leading-5 text-[#464554]">{description}</p>
      </div>

      <div className="mt-6 flex w-full items-center gap-1 border-t border-[#c7c4d7] pt-[17px]">
        <span
          className="text-sm font-semibold leading-5"
          style={{ color: linkColor }}
        >
          Khám phá thêm
        </span>
        <ArrowRight className="h-[14px] w-[14px]" style={{ color: linkColor }} />
      </div>
    </div>
  );
}
