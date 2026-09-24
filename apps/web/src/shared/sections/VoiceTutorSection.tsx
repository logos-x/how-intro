import { Check, Mic } from "lucide-react";
import { Badge } from "../components/widgets/Badge";

const POINTS = [
  {
    color: "#4648d4",
    title: "Nhận diện giọng nói chuẩn xác",
    description:
      "Phát hiện ngay các lỗi phát âm nhỏ nhất và hướng dẫn cách đặt khẩu hình miệng.",
  },
  {
    color: "#6b38d4",
    title: "Đa dạng giọng đọc bản xứ",
    description:
      "Tùy chọn giọng Anh-Anh, Anh-Mỹ, Anh-Úc theo sở thích và mục tiêu cá nhân.",
  },
];

export function VoiceTutorSection() {
  return (
    <section className="w-full bg-[#f2f4f6] px-6 py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 md:flex-row">
        {/* Left column */}
        <div className="flex w-full flex-col gap-4 md:w-[616px]">
          <Badge className="bg-[#e9ddff] text-[#6b38d4]">
            Trải nghiệm AI Voice Tutor
          </Badge>
          <h2 className="text-[32px] font-bold leading-10 tracking-[-0.32px] text-[#191c1e]">
            Trò chuyện trực tiếp cùng Gia sư AI thông minh
          </h2>
          <p className="text-lg leading-7 text-[#464554]">
            Không còn cảm giác ngại ngùng hay sợ sai. AI Voice Tutor luôn kiên
            nhẫn lắng nghe, điều chỉnh tốc độ nói phù hợp và đồng hành cùng bạn
            trên mọi chặng đường.
          </p>

          <div className="flex flex-col gap-4 pt-2">
            {POINTS.map((point) => (
              <div key={point.title} className="flex items-start gap-4">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: point.color }}
                >
                  <Check className="h-[14px] w-[14px] text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold leading-6 text-[#191c1e]">
                    {point.title}
                  </h4>
                  <p className="text-sm leading-5 text-[#464554]">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - CTA card */}
        <div className="w-full md:w-[576px]">
          <div className="flex flex-col items-center gap-1 rounded-2xl border border-[#c7c4d7] bg-white p-10 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e1e0ff]">
              <Mic className="h-7 w-7 text-[#4648d4]" strokeWidth={2} />
            </div>
            <h3 className="pt-3 text-xl font-semibold leading-7 text-[#191c1e]">
              Bắt đầu phiên luyện nói mẫu
            </h3>
            <p className="pb-5 text-center text-sm leading-5 text-[#464554]">
              Nhấn vào nút bên dưới để thử nghiệm tương tác với trợ lý AI ngay
              lập tức.
            </p>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4648d4] px-10 py-4 text-sm font-semibold leading-5 text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
              <Mic className="h-[19px] w-[14px]" />
              Kích hoạt AI Voice Tutor
            </button>
            <p className="pt-3 text-center text-[11px] font-medium leading-[14px] text-[#464554]">
              Miễn phí 3 phút trải nghiệm không cần đăng ký tài khoản
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
