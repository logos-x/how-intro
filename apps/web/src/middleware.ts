import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const protectedRoutes = ["/change-password", "/home", "/me", "/onboarding"];
const authPages = ["/login", "/register"];
const skipOnboardingRoutes = ["/change-password"];

export async function middleware(request: NextRequest) {
  const { supabase, response: supabaseResponse, user } =
    await updateSession(request);
  const path = request.nextUrl.pathname;

  const startsWithAny = (routes: string[]) =>
    routes.some((route) => path === route || path.startsWith(`${route}/`));

  const isProtected = startsWithAny(protectedRoutes);
  const isAuthPage = startsWithAny(authPages);

  const redirectTo = (target: string) => {
    const url = request.nextUrl.clone();
    url.pathname = target;
    url.search = "";
    const response = NextResponse.redirect(url);
    supabaseResponse.cookies
      .getAll()
      .forEach((cookie) => response.cookies.set(cookie));
    return response;
  };

  if (!user) {
    return isProtected ? redirectTo("/login") : supabaseResponse;
  }

  if (startsWithAny(skipOnboardingRoutes)) {
    return supabaseResponse;
  }

  const { data: profile } = await supabase
    .from("User")
    .select("onboardingCompleted")
    .eq("supabaseUserId", user.id)
    .maybeSingle();

  const isOnboardingCompleted = profile?.onboardingCompleted === true;

  if (!isOnboardingCompleted) {
    if (
      (isProtected && !path.startsWith("/onboarding")) ||
      isAuthPage ||
      path === "/"
    ) {
      return redirectTo("/onboarding");
    }
  } else if (
    path.startsWith("/onboarding") ||
    isAuthPage ||
    path === "/"
  ) {
    return redirectTo("/home");
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
