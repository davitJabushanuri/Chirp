import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "10 s"),
});

export async function middleware(req: NextRequest) {
  // Rate limit middleware
  if (req.nextUrl.pathname.startsWith("/api")) {
    if (req.nextUrl.pathname === "/api/blocked") {
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

  // Auth middleware
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
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
