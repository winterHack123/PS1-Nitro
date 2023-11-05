import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;

  const url = req.nextUrl.pathname;

  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.includes("/password-reset")) {
    return res;
  }

  if (!!data.session && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!data.session && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/login", "/reset", "/admin"],
};
