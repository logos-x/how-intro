import { MessageCircle, Route, Gamepad2, Award } from "lucide-react";
import { Badge } from "../components/widgets/Badge";
import { FeatureCard } from "../../files/FeatureCard";

const FEATURES = [
  {
    icon: MessageCircle,
    iconBg: "#e1e0ff",
    title: "Luyện nói AI 24/7",
    description:
      "Trò chuyện tự do với gia sư AI không giới hạn thời gian. Nhận phản hồi sửa lỗi phát âm và ngữ pháp tức thì.",
    linkColor: "#4648d4",
  },
  {
    icon: Route,
    iconBg: "#e9ddff",
    title: "Lộ trình cá nhân hóa",
    description:
      "Hệ thống AI phân tích năng lực hiện tại và thiết kế riêng giáo trình tối ưu nhất cho mục tiêu nghề nghiệp của bạn.",
    linkColor: "#6b38d4",
  },
  {
    icon: Gamepad2,
    iconBg: "#6ffbbe",
    title: "Bài học tương tác thông minh",
    description:
      "Học từ vựng và ngữ pháp qua các tình huống thực tế sinh động, trò chơi tương tác ghi nhớ lâu gấp 3 lần.",
    linkColor: "#006c49",
  },
  {
    icon: Award,
    iconBg: "#ffdad6",
    title: "Luyện thi IELTS/TOEIC",
    description:
      "Bộ đề thi chuẩn quốc tế được cập nhật liên tục với công nghệ chấm điểm Speaking & Writing chính xác đến 95%.",
    linkColor: "#ba1a1a",
  },
];

export function CoreFeatures() {
  return (
    <section className="w-full bg-white px-6 pb-10 pt-[39px]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10">
        <div className="flex max-w-[768px] flex-col items-center gap-4">
          <Badge className="bg-[#e1e0ff] text-[#4648d4]">
            Tính năng cốt lõi
          </Badge>
          <h2 className="text-center text-[32px] font-bold leading-10 tracking-[-0.32px] text-[#191c1e]">
            Giải pháp toàn diện giúp bạn bứt phá tiếng Anh
          </h2>
          <p className="text-center text-lg leading-7 text-[#464554]">
            Tích hợp công nghệ trí tuệ nhân tạo tiên tiến nhất mang lại trải
            nghiệm học tập vượt trội so với phương pháp truyền thống.
          </p>
        </div>

        <div className="flex w-full flex-col gap-6 md:flex-row">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
