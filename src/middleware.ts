"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authkey } from "./constants/authkey";
import { jwtDecode } from "jwt-decode";

type Role = keyof typeof roleBasedPrivateRoutes;

const commonPrivateRoutes = ["/dashboard", "/dashboard/change-password"];

const roleBasedPrivateRoutes = {
  DEV_SUPER_ADMIN: [/^\/dashboard\/dev_super_admin/],
  SUPER_ADMIN: [/^\/dashboard\/super_admin/],
  ADMIN: [/^\/dashboard\/admin/],
  CLIENT: [/^\/dashboard\/client/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request?.nextUrl;

  if (pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/home") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const accessToken = await cookies().get(authkey)?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let decodedData = null;

  if (!!accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  if (!decodedData) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const role = decodedData?.role;
  const role_path = `/${role?.toLowerCase()}`;

  if (roleBasedPrivateRoutes[role as Role] && pathname.includes(role_path)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// matcher
export const config = {
  matcher: ["/home", "/dashboard/:page*"],
};
