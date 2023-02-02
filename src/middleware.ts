import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("next-auth.session-token");
  const secureToken = req.cookies.get("Secure-next-auth.session-token");

  const isAuthorized = token || secureToken;

  if (
    req.nextUrl.pathname.startsWith(
      "/home" || "/notifications" || "/messages" || "/bookmarks",
    ) &&
    !isAuthorized
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (url.pathname === "/" && isAuthorized) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/auth/signin") && isAuthorized) {
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
