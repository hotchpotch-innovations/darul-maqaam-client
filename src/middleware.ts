import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authkey } from "./constants/authkey";
import { jwtDecode } from "jwt-decode";

type TRole = keyof typeof roleBasedPrivateRoutes;
const authRoute = ["/login", "/register"];
const roleBasedPrivateRoutes = {
  DEV_SUPER_ADMIN: [/^\/dashboard\/dev_super_admin/],
  SUPER_ADMIN: [/^\/dashboard\/super_admin/],
  ADMIN: [/^\/dashboard\/admin/],
  CLIENT: [/^\/dashboard\/client/],
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get(authkey)?.value;

  if (!accessToken) {
    if (authRoute.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  let decoedData = null;
  if (accessToken) {
    decoedData = jwtDecode(accessToken) as any;
  }
  const role = decoedData?.role;
  if (role && roleBasedPrivateRoutes[role as TRole]) {
    const routes = roleBasedPrivateRoutes[role as TRole];
    if (routes?.some((route) => pathname?.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:page*", "/login", "/register"],
};
