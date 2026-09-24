import { BadgeCheck, Users2 } from "lucide-react";
import { ChatBubble } from "@/shared/components/widgets/ChatBubble";
import { StatBox } from "@/shared/components/widgets/StatBox";
import { TestimonialCard } from "@/shared/components/widgets/TestimonialCard";

export function AiTutorShowcase() {
  return (
    <div className="relative flex w-full max-w-[512px] flex-col items-start gap-5">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-80 rounded-full bg-[rgba(70,72,212,0.1)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 size-80 rounded-full bg-[rgba(107,56,212,0.1)] blur-3xl" />

      {/* Status pill */}
      <div className="flex w-full justify-end">
        <span className="flex items-center gap-2 rounded-full border border-[rgba(198,197,215,0.4)] bg-white px-[15px] py-[7px] shadow-sm">
          <span className="size-2.5 rounded-full bg-[#006a48]" />
          <span className="text-xs font-bold text-[#191c1e]">
            98% học viên đạt mục tiêu chuẩn CEFR
          </span>
        </span>
      </div>

      {/* Main card */}
      <div className="relative w-full rounded-3xl border border-[rgba(198,197,215,0.3)] bg-white/95 p-[29px] shadow-[0px_20px_25px_-5px_rgba(216,218,220,0.4),0px_8px_10px_-6px_rgba(216,218,220,0.4)]">
        {/* Card header */}
        <div className="flex items-center justify-between border-b border-[rgba(198,197,215,0.2)] pb-[17px]">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[rgba(70,72,212,0.1)]">
              <Users2 className="size-5 text-[#4648d4]" />
            </span>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-[#191c1e]">
                  Lớp học AI trực tiếp
                </span>
                <BadgeCheck className="size-3.5 text-[#4648d4]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#10b981]" />
                <span className="text-xs text-[#464554]">
                  1.420 học viên đang luyện phản xạ
                </span>
              </div>
            </div>
          </div>
          <span className="rounded-full border border-[rgba(70,72,212,0.2)] bg-[rgba(70,72,212,0.1)] px-[13px] py-[5px] text-xs font-bold text-[#4648d4]">
            Cấp độ B2 - C1
          </span>
        </div>

        {/* Conversation preview */}
        <div className="flex flex-col gap-3.5 py-5">
          <ChatBubble
            variant="ai"
            name="Lingo AI Tutor"
            meta="Vừa xong"
            message='"Could you explain how adopting AI has accelerated your English speaking fluency?"'
          />
          <ChatBubble
            variant="student"
            name="Minh Thư (IELTS 8.0)"
            badge="Phát âm 96%"
            avatarUrl="/images/students/minh-thu.jpg"
            message='"It provides instantaneous feedback on my phonetics and lexical variations!"'
          />
        </div>

        {/* Stats */}
        <div className="flex gap-2.5 border-t border-[rgba(198,197,215,0.2)] pt-[17px]">
          <StatBox value="+2.5 Band" label="IELTS trung bình" color="primary" />
          <StatBox value="15 Phút" label="Mỗi ngày với AI" color="success" />
          <StatBox value="4.9 / 5.0" label="12.000+ đánh giá" color="purple" />
        </div>
      </div>

      {/* Testimonial */}
      <TestimonialCard
        highlight="Lộ trình được cá nhân hóa hoàn toàn."
        text="Học phản xạ tự nhiên 1-1 không áp lực, tiến bộ rõ rệt chỉ sau 2 tuần luyện cùng trợ lý AI."
      />
    </div>
  );
}
