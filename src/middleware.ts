import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const url = req.nextUrl.clone();

  if (token) {
    if (url.pathname === "/" || url.pathname === "/auth/signin") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  if (!token) {
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
    "/api/:path*",
  ],
};
