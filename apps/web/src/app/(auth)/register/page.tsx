import { Metadata } from "next";
import { SignUpFormCard } from "@/features/auth/components/SignupFormCard";
import { AiTutorShowcase } from "@/features/auth/components/AiTutorShowcase";

export const metadata: Metadata = {
  title: "Tạo tài khoản | LingoLearn",
  description: "Đăng ký tài khoản LingoLearn để bắt đầu học tiếng Anh cùng AI.",
};

export default function SignUpPage() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-64px-57px)] max-w-[1280px] grid-cols-1 items-center gap-16 px-8 py-16 md:grid-cols-2">
      <div className="flex justify-center md:justify-start">
        <SignUpFormCard />
      </div>

      {/* Ẩn showcase trên mobile để ưu tiên form */}
      <div className="hidden md:flex md:justify-end">
        <AiTutorShowcase />
      </div>
    </div>
  );
}
