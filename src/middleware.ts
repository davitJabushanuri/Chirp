import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(20, "10 s"),
});

export async function middleware(req: NextRequest) {
  // rate limit api routes
  if (req.nextUrl.pathname.startsWith("/api")) {
    const path = req.nextUrl.pathname;
    if (path.startsWith("/api/blocked")) {
      return NextResponse.next();
    }

    const ip = req.ip ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.redirect(new URL("/api/blocked", req.url));
    }
  }
  const url = req.nextUrl.clone();
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  // authentication flow
  if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/auth") ||
    req.nextUrl.pathname.startsWith("/home") ||
    req.nextUrl.pathname.startsWith("/notifications") ||
    req.nextUrl.pathname.startsWith("/messages") ||
    req.nextUrl.pathname.startsWith("/bookmarks")
  ) {
    if (isAuthenticated) {
      if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/home", req.url));
      }
    }

    if (!isAuthenticated) {
      if (
        req.nextUrl.pathname.startsWith("/home") ||
        req.nextUrl.pathname.startsWith("/notifications") ||
        req.nextUrl.pathname.startsWith("/messages") ||
        req.nextUrl.pathname.startsWith("/bookmarks") ||
        url.pathname === "/auth/signout"
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  }

  // admin flow
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (isAuthenticated && token?.role === "ADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
