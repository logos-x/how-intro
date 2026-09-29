"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function Inner() {
  const params= useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (params.get("verified") === "1") {
      toast.success("Xác thực email thành công!", { id: "email-verified"})
      router.replace(pathname);
    }
  }, [params, params, router]);

  return null;
}

export default function VerifiedToast() {
  return (
    <Suspense>
      <Inner />
    </Suspense>
  )
}