import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicRoutes = ["/login", "/register", "/unauthorised"];

  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (pathname === "/order-success") {
    const orderSuccessCookie = req.cookies.get("order-success");

    if (!orderSuccessCookie) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 🔥 DELETE COOKIE AFTER FIRST VALID ACCESS
    const response = NextResponse.next();
    response.cookies.set("order-success", "", {
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role;

  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/unauthorised", req.url));
  }

  if (pathname.startsWith("/deliver") && role !== "deliveryBoy") {
    return NextResponse.redirect(new URL("/unauthorised", req.url));
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorised", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
