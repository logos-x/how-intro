import { Sparkles, PlayCircle, CheckCircle2, Bot, User, Volume2, Mic, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[870px] w-full overflow-hidden bg-white px-6 py-[167px]">
      {/* Decorative blurred blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#e1e0ff] opacity-50 blur-[32px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-[#e9ddff] opacity-50 blur-[32px]" />

      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 md:flex-row">
        {/* Left column */}
        <div className="flex flex-1 flex-col items-start gap-6">
          <div className="flex items-center gap-1 rounded-full border border-[#c7c4d7] bg-[#e6e8ea] px-[17px] py-[5px]">
            <Sparkles className="h-[16.5px] w-[16.5px] text-[#4648d4]" />
            <span className="text-xs font-semibold leading-4 text-[#4648d4]">
              Nền tảng EdTech thế hệ mới bằng AI
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-[48px] tracking-[-0.8px] text-[#191c1e]">
            Chinh phục tiếng Anh tự nhiên
            <br />
            như người bản xứ cùng AI
          </h1>

          <p className="max-w-[672px] text-lg leading-7 text-[#464554]">
            Trải nghiệm phương pháp học tập cá nhân hóa 1 kèm 1 với trợ lý AI
            thông minh. Luyện phản xạ đỉnh cao, sửa phát âm chuẩn xác từng âm
            tiết mọi lúc, mọi nơi.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] px-10 py-4 text-sm font-semibold leading-5 text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
              Bắt đầu miễn phí ngay
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-[#c7c4d7] bg-[#eceef0] px-[41px] py-[17px] text-sm font-semibold leading-5 text-[#191c1e]">
              <PlayCircle className="h-5 w-5" />
              Xem tương tác mẫu
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-5 w-5 text-[#006c49]" />
              <span className="text-sm leading-5 text-[#464554]">
                Không cần thẻ tín dụng
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-5 w-5 text-[#006c49]" />
              <span className="text-sm leading-5 text-[#464554]">
                Học thử 7 ngày miễn phí
              </span>
            </div>
          </div>
        </div>

        {/* Right column - Chat mockup */}
        <div className="relative flex-1">
          <div className="relative flex w-full flex-col gap-4 rounded-2xl border border-[#c7c4d7] bg-white p-[25px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-[#c7c4d7] pb-[17px]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ba1a1a]" />
                <span className="h-3 w-3 rounded-full bg-[#006c49]" />
                <span className="h-3 w-3 rounded-full bg-[#6063ee]" />
              </div>
              <span className="text-sm leading-5 text-[#464554]">
                LingoLearn AI Studio
              </span>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-4 pb-2">
              {/* AI message */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4648d4]">
                  <Bot className="h-[19px] w-[22px] text-white" />
                </div>
                <div className="flex flex-1 flex-col gap-1 rounded-bl-2xl rounded-br-2xl rounded-tr-2xl bg-[#eceef0] p-4">
                  <p className="text-base font-bold leading-6 text-[#191c1e]">
                    AI Tutor Sarah
                  </p>
                  <p className="text-base leading-6 text-[#191c1e]">
                    Hello Alex! Let&apos;s practice ordering coffee in London
                    today. How would you greet the barista?
                  </p>
                  <div className="flex items-center gap-1 pt-1">
                    <Volume2 className="h-[10px] w-[10px] text-[#4648d4]" />
                    <span className="text-xs font-semibold leading-4 text-[#4648d4]">
                      Nghe phát âm mẫu
                    </span>
                  </div>
                </div>
              </div>

              {/* User message */}
              <div className="flex items-start justify-end gap-4">
                <div className="max-w-[448px] rounded-bl-2xl rounded-br-2xl rounded-tl-2xl bg-[#6063ee] py-4 pl-4 pr-5">
                  <p className="text-base leading-6 text-[#fffbff]">
                    Good morning! Could I please have a large cappuccino with
                    oat milk?
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6b38d4]">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* AI feedback message */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4648d4]">
                  <Bot className="h-[19px] w-[22px] text-white" />
                </div>
                <div className="flex flex-1 flex-col gap-1 rounded-bl-2xl rounded-br-2xl rounded-tr-2xl border-2 border-[#006c49] bg-[#eceef0] p-[18px]">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold leading-6 text-[#006c49]">
                      Tuyệt vời! 98% chuẩn xác
                    </p>
                    <span className="rounded-full bg-[#6ffbbe] px-2 py-0.5 text-[11px] font-medium leading-[14px] text-[#002113]">
                      Phát âm hoàn hảo
                    </span>
                  </div>
                  <p className="text-base leading-6 text-[#191c1e]">
                    Ngữ điệu của bạn rất tự nhiên. Cùng chuyển sang tình huống
                    tiếp theo nhé!
                  </p>
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div className="flex items-center justify-between border-t border-[#c7c4d7] pt-[17px]">
              <div className="flex items-center gap-2">
                <Mic className="h-[19px] w-[14px] text-[#464554]" />
                <span className="text-sm leading-5 text-[#464554]">
                  Đang lắng nghe giọng nói của bạn...
                </span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ba1a1a]">
                <span className="h-[11px] w-[8px] rounded-sm bg-white" />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-4 -top-4 flex items-center gap-1 rounded-full bg-[#00885d] px-4 py-1 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
              <TrendingUp className="h-[11px] w-[11.667px] text-[#000703]" />
              <span className="text-xs font-semibold leading-4 text-[#000703]">
                +150% Điểm IELTS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
