type ScoreTone = "green" | "amber" | "blue" | "neutral";

interface Student {
  initials: string;
  name: string;
  note: string;
  noteTone?: "muted" | "amber" | "blue";
  scores: { value: string; tone: ScoreTone }[];
  avatarTone: "neutral" | "amber" | "blue";
}

const TONE_STYLES: Record<
  ScoreTone,
  { bg: string; border: string; text: string }
> = {
  green: {
    bg: "bg-[#10B981]",
    border: "border-transparent",
    text: "text-white",
  },
  amber: {
    bg: "bg-[#F59E0B] shadow-[0_1px_2px_0_rgba(245,158,11,0.3)]",
    border: "border-transparent",
    text: "text-white",
  },
  blue: {
    bg: "bg-[#0284C7] shadow-[0_1px_2px_0_rgba(2,132,199,0.3)]",
    border: "border-transparent",
    text: "text-white",
  },
  neutral: { bg: "bg-[#F2F4F6]", border: "border-transparent", text: "" },
};

const AVATAR_TONE_STYLES: Record<Student["avatarTone"], string> = {
  neutral: "bg-[#F2F4F6] border-[#E6E8EA] text-[#464554]",
  amber: "bg-[#FFFBEB] border-amber-200/60 text-[#B45309]",
  blue: "bg-[#F0F9FF] border-sky-200/60 text-[#0369A1]",
};

const NOTE_TONE_STYLES: Record<NonNullable<Student["noteTone"]>, string> = {
  muted: "text-[#767586]",
  amber: "text-[#F59E0B]",
  blue: "text-[#0284C7]",
};

const STUDENTS: Student[] = [
  {
    initials: "MA",
    name: "Minh Anh",
    note: "Chủ đề: Job Interview",
    noteTone: "muted",
    avatarTone: "neutral",
    scores: [{ value: "8.0", tone: "green" }],
  },
  {
    initials: "TK",
    name: "Tuấn Kiệt",
    note: "Phát âm /θ/ & /ð/",
    noteTone: "muted",
    avatarTone: "neutral",
    scores: [{ value: "8.5", tone: "green" }],
  },
  {
    initials: "HN",
    name: "Hoàng Nam",
    note: "Cần chỉnh ngữ điệu",
    noteTone: "amber",
    avatarTone: "amber",
    scores: [
      { value: "7.0", tone: "green" },
      { value: "7.0", tone: "green" },
      { value: "", tone: "amber" },
    ],
  },
  {
    initials: "LC",
    name: "Linh Chi",
    note: "Đang đàm thoại...",
    noteTone: "blue",
    avatarTone: "blue",
    scores: [
      { value: "7.5", tone: "green" },
      { value: "8.0", tone: "blue" },
      { value: "", tone: "blue" },
    ],
  },
  {
    initials: "BL",
    name: "Bảo Long",
    note: "Coffee Order Roleplay",
    noteTone: "muted",
    avatarTone: "neutral",
    scores: [{ value: "8.5", tone: "green" }],
  },
  {
    initials: "DT",
    name: "Đức Trí",
    note: "Luyện phản xạ 1:1",
    noteTone: "muted",
    avatarTone: "neutral",
    scores: [{ value: "8.0", tone: "green" }],
  },
];

function ScorePill({ value, tone }: { value: string; tone: ScoreTone }) {
  const s = TONE_STYLES[tone];
  if (tone === "neutral") {
    return <div className={`size-8 rounded-lg ${s.bg}`} />;
  }
  return (
    <div
      className={`flex size-8 items-center justify-center rounded-lg border ${s.bg} ${s.border}`}
    >
      {value && (
        <span className={`text-xs font-bold ${s.text || "text-[#10B981]"}`}>
          {value}
        </span>
      )}
    </div>
  );
}

/**
 * "LỚP HỌC AI TRỰC TIẾP" showcase card — reused as the right-hand visual
 * on every auth screen. Data here is illustrative placeholder content;
 * wire it up to the real live-session feed when that API exists.
 */
export function LiveClassCard() {
  return (
    <div className="relative flex h-full w-full max-w-[448px] flex-col gap-2 rounded-3xl border border-[#E6E8EA] bg-white p-8 shadow-[0_20px_25px_-5px_rgba(70,72,212,0.05),0_8px_10px_-6px_rgba(70,72,212,0.05)]">
      <div className="flex items-center justify-between border-b border-[#F2F4F6] pb-6">
        <div className="flex items-center">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-[#10B981]" />
          </span>
          <span className="pl-2.5 text-xs font-bold tracking-[0.6px] text-[#464554] uppercase">
            Lớp học AI trực tiếp
          </span>
        </div>
        <span className="rounded-full border border-[#4648D4]/20 bg-[#EEF0FD] px-3.5 py-1.5 text-xs font-semibold text-[#4648D4]">
          AI Tutor Active
        </span>
      </div>

      <ul className="flex flex-col gap-4 py-2">
        {STUDENTS.map((s) => (
          <li key={s.name} className="flex items-center justify-between py-1.5">
            <div className="flex items-center">
              <div
                className={`flex size-11 items-center justify-center rounded-full border ${AVATAR_TONE_STYLES[s.avatarTone]}`}
              >
                <span className="text-xs font-bold">{s.initials}</span>
              </div>
              <div className="pl-3.5">
                <p className="text-sm font-semibold text-[#191C1E]">{s.name}</p>
                <p
                  className={`text-[11px] ${
                    s.noteTone ? NOTE_TONE_STYLES[s.noteTone] : "text-[#767586]"
                  }`}
                >
                  {s.note}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {s.scores.map((sc, i) => (
                <ScorePill key={i} value={sc.value} tone={sc.tone} />
              ))}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-[#F2F4F6] pt-4">
        <Legend color="#10B981" label="Đạt chuẩn" />
        <Legend color="#F59E0B" label="Cần lưu ý" />
        <Legend color="#0284C7" label="Đang tương tác" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="size-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-[11px] font-medium text-[#767586]">{label}</span>
    </div>
  );
}
