import Image from "next/image";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  variant: "ai" | "student";
  name: string;
  meta?: string; // timestamp hoặc badge text
  message: string;
  avatarUrl?: string; // ảnh thật cho student, bỏ trống cho AI (dùng chữ "AI")
  badge?: string; // ví dụ "Phát âm 96%"
}

export function ChatBubble({
  variant,
  name,
  meta,
  message,
  avatarUrl,
  badge,
}: ChatBubbleProps) {
  const isAi = variant === "ai";

  return (
    <div
      className={cn(
        "flex w-full gap-3 rounded-2xl border p-[15px]",
        isAi
          ? "border-[rgba(198,197,215,0.3)] bg-[#f7f9fb]"
          : "border-[rgba(70,72,212,0.2)] bg-[rgba(225,224,255,0.25)]",
      )}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl",
          isAi
            ? "bg-[#4648d4]"
            : "bg-[#e1e0ff] shadow-[0_0_0_2px_rgba(70,72,212,0.3)]",
        )}
      >
        {isAi ? (
          <span className="text-xs font-extrabold text-white">AI</span>
        ) : avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={36}
            height={36}
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#191c1e]">{name}</span>
          {isAi ? (
            <span className="text-[10px] text-[#767586]">{meta}</span>
          ) : (
            badge && (
              <span className="flex items-center gap-1 rounded-full bg-[rgba(141,247,196,0.3)] px-2 py-0.5 text-[11px] font-bold text-[#006a48]">
                {badge}
              </span>
            )
          )}
        </div>
        <p className="mt-1 text-xs leading-[19.5px] text-[#464554]">
          {message}
        </p>
      </div>
    </div>
  );
}
