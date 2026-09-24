import { Quote } from "lucide-react";

interface TestimonialCardProps {
  highlight: string; // phần in đậm, VD: "Lộ trình được cá nhân hóa hoàn toàn."
  text: string; // phần còn lại
}

export function TestimonialCard({ highlight, text }: TestimonialCardProps) {
  return (
    <div className="flex w-full items-center gap-4 rounded-2xl border border-[rgba(198,197,215,0.3)] bg-white/90 p-[21px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] backdrop-blur-md">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#8455ef]">
        <Quote className="size-4 text-white" />
      </div>
      <p className="text-xs leading-[19.5px]">
        <span className="font-bold text-[#191c1e]">
          &ldquo;{highlight}&rdquo;
        </span>{" "}
        <span className="text-[#464554]">{text}</span>
      </p>
    </div>
  );
}
