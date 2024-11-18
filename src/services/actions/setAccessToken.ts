"use server";

import { authkey } from "@/constants/authkey";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

const setAccessToken = (token: string, option?: any) => {
  if (!token) {
    return "";
  }
  cookies().set(authkey, token);
  if (option && option.passwordChangeRequired) {
    redirect("/");
  }
  if (option && !option.passwordChangeRequired && option.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessToken;
