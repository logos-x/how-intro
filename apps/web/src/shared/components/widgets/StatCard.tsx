interface StatCardProps {
  value: string;
  label: string;
  color: string;
}

export function StatCard({ value, label, color }: StatCardProps) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl border border-[#c7c4d7] bg-[#f7f9fb] p-[25px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <p
        className="text-[40px] font-extrabold leading-[48px] tracking-[-0.8px]"
        style={{ color }}
      >
        {value}
      </p>
      <p className="text-base leading-6 text-[#464554]">{label}</p>
    </div>
  );
}
