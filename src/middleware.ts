"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authkey } from "./constants/authkey";
import { jwtDecode } from "jwt-decode";

type Role = keyof typeof roleBasedPrivateRoutes;
const authRoute = ["/login", "/register"];
const roleBasedPrivateRoutes = {
  DEV_SUPER_ADMIN: [/^\/dashboard\/dev_super_admin/],
  SUPER_ADMIN: [/^\/dashboard\/super_admin/],
  ADMIN: [/^\/dashboard\/admin/],
  CLIENT: [/^\/dashboard\/client/],
};
console.log({ authRoute });

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = await cookies().get(authkey)?.value;

  // console.log({ accessToken });

  if (!accessToken) {
    if (authRoute.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  let decoedData = null;

  if (accessToken) {
    decoedData = jwtDecode(accessToken) as any;
  }

  const role = decoedData?.role;

  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:page*"],
};

// // New Middleware
// import { NextRequest, NextResponse } from "next/server";
// import { jwtDecode } from "jwt-decode";
// import { authkey } from "./constants/authkey";
// type Role = keyof typeof roleBasedPrivateRoutes;

// // This function can be marked `async` if using `await` inside
// const commonPrivateRoutes = ["/dashboard", "/dashboard/change-password"];
// const roleBasedPrivateRoutes = {
//   CLIENT: [/^\/dashboard\/client/],
//   EMPLOYEE: [/^\/dashboard\/employee/],
//   ADMIN: [/^\/dashboard\/admin/],
//   SUPER_ADMIN: [/^\/dashboard\/super_admin/],
//   DEV_SUPER_ADMIN: [/^\/dashboard\/dev_super_admin/],
// };

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (pathname === "/home") {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   const accessToken = request?.cookies?.get(authkey)?.value;

//   if (!accessToken) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   let decodedData = null;

//   if (accessToken) {
//     decodedData = jwtDecode(accessToken) as any;
//   }

//   if (!decodedData) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (accessToken && commonPrivateRoutes.includes(pathname)) {
//     return NextResponse.next();
//   }

//   const role = decodedData?.role;
//   const role_path = `/${role?.toLowerCase()}`;

//   if (roleBasedPrivateRoutes[role as Role] && pathname.includes(role_path)) {
//     return NextResponse.next();
//   }

//   return NextResponse.redirect(new URL("/", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/home", "/login", "/register", "/dashboard/:page*"],
// };
