import { ReactNode } from "react";
import { TopAppBar } from "@/shared/components/layout/TopAppBar";
import { GlobalFooter } from "@/shared/components/layout/GlobalFooter";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopAppBar />
      <main className="flex-1">{children}</main>
      <GlobalFooter />
    </div>
  );
}
