"use server";

import { authkey } from "@/constants/authkey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setAccessTokenCookie = (token: string, option?: any) => {
  cookies().set(authkey, token);
  if (option && option?.redirect) {
    redirect("/dashboard");
  }
};
