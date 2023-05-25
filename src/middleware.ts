import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const url = req.nextUrl.clone();

  if (isAuthenticated) {
    if (url.pathname === "/" || url.pathname === "/auth/signin") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  if (!isAuthenticated) {
    if (
      req.nextUrl.pathname.startsWith("/home") ||
      req.nextUrl.pathname.startsWith("/notifications") ||
      req.nextUrl.pathname.startsWith("/messages") ||
      req.nextUrl.pathname.startsWith("/bookmarks") ||
      url.pathname === "/auth/new-user" ||
      url.pathname === "/auth/signout"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (isAuthenticated && token?.role !== "ADMIN") {
    if (url.pathname === "/admin") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/home/:path*",
    "/notifications/:path*",
    "/messages/:path*",
    "/bookmarks/:path*",
    "/admin/:path*",
  ],
};
