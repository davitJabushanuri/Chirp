import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("next-auth.session-token");

  if (
    req.nextUrl.pathname.startsWith(
      "/home" || "/notifications" || "/messages" || "/bookmarks",
    ) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (url.pathname === "/" && token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/auth/signin") && token) {
    return NextResponse.redirect(new URL("/home", req.url));
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
  ],
};
