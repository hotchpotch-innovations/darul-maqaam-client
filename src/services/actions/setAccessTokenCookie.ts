"use server";

import { authkey } from "@/constants/authkey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setAccessTokenCookie = (token: string, option?: any) => {
  if (!token) {
    return null;
  }

  cookies().set(authkey, token);

  if (option && option?.redirect) {
    redirect(option?.redirect);
  }
};

export default setAccessTokenCookie;
