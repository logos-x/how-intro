"use client";

import { Circle, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { PASSWORD_RULES } from "./passwordRules";

export function PasswordChecklist({ password }: { password: string }) {
  return (
    <ul className="grid grid-cols-2 gap-1.5 rounded-xl border border-brand-line/30 bg-brand-subtle/80 p-[13px]">
      {PASSWORD_RULES.map((rule) => {
        const passed = rule.test(password);
        const Icon = passed ? CircleCheck : Circle;

        return (
          <li key={rule.key} className="flex h-5 items-center gap-1.5">
            <Icon
              aria-hidden
              className={cn(
                "size-3 shrink-0",
                passed ? "text-brand" : "text-brand-line"
              )}
            />
            <span
              className={cn(
                "text-xs leading-4 transition-colors",
                passed ? "text-brand-body" : "text-brand-muted"
              )}
            >
              {rule.label}
            </span>
            <span className="sr-only">{passed ? "— đã đạt" : "— chưa đạt"}</span>
          </li>
        );
      })}
    </ul>
  );
}
