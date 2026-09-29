import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (!token_hash || !type) {
    return NextResponse.redirect(`${origin}/verify-error?reason=invalid_link`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash });
  if (error) {
    return NextResponse.redirect(`${origin}/verify-error?reason=expired`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: row } = await supabase
    .from("User")
    .select("onboardingCompleted")
    .eq("supabaseUserId", user?.id)
    .single();

  const next = row?.onboardingCompleted ? "/" : "/onboarding";
  return NextResponse.redirect(`${origin}${next}?verified=1`);
}
