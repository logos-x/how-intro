import { StatCard } from "../components/widgets/StatCard";

const STATS = [
  { value: "98%", label: "Học viên đạt mục tiêu", color: "#4648d4" },
  { value: "500K+", label: "Người dùng hoạt động", color: "#6b38d4" },
  { value: "4.9/5", label: "Đánh giá hài lòng", color: "#006c49" },
  { value: "24/7", label: "Hỗ trợ luyện nói AI", color: "#6063ee" },
];

const PARTNERS = [
  "VIETCOMBANK",
  "FPT SOFTWARE",
  "VINFAST",
  "RMIT UNIVERSITY",
  "VNPT",
];

export function SocialProof() {
  return (
    <section className="w-full bg-[#f2f4f6] px-6 py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <div className="flex flex-col gap-6 md:flex-row">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <h2 className="text-center text-2xl font-semibold leading-8 text-[#191c1e]">
            Được tin tưởng bởi học viên từ các tập đoàn và trường học hàng đầu
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-70">
            {PARTNERS.map((name) => (
              <span
                key={name}
                className="text-center text-xl font-bold leading-7 text-[#464554]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
