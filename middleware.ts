import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicRoutes = [
    "/login",
    "/register",
    "/api/auth",
    "/_next",
    "/favicon.ico",
  ];

  // allow public routes
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // get token
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (pathname === "/" && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", "/");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (Next.js static files)
     * - _next/image (Next.js image optimization files)
     * - favicon.ico (favicon file)
     * - Any file with a file extension (e.g., .png, .jpg, .css)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
