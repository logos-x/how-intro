"use client";

import { cn } from "@/lib/utils";
import { PASSWORD_RULES, countPassedRules } from "./passwordRules";

const STRENGTH_LABEL = ["Chưa nhập", "Yếu", "Trung bình", "Khá", "Mạnh"];

export function PasswordStrengthBar({ password }: { password: string }) {
  const passedRules = countPassedRules(password);

  return (
    <div className="flex flex-col gap-1 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium leading-4 text-brand-body">
          Độ mạnh mật khẩu:
        </span>
        <span className="text-[11px] font-bold leading-4 text-brand-muted">
          {STRENGTH_LABEL[passedRules]}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="Độ mạnh mật khẩu"
        aria-valuemin={0}
        aria-valuemax={PASSWORD_RULES.length}
        aria-valuenow={passedRules}
        aria-valuetext={STRENGTH_LABEL[passedRules]}
        className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-brand-track"
      >
        {PASSWORD_RULES.map((rule, i) => (
          <div
            key={rule.key}
            className={cn(
              "h-full flex-1 rounded-full transition-colors",
              i < passedRules ? "bg-brand" : "bg-brand-line"
            )}
          />
        ))}
      </div>
    </div>
  );
}
