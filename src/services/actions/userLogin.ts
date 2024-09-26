// "use server";

import { FieldValues } from "react-hook-form";
import { setAccessTokenCookie } from "./setAccessTokenCookie";
import { redirect } from "next/navigation";

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login
    `,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // cache: "no-store",
      credentials: "include",
    }
  );
  const userInfo = await res.json();
  const token = userInfo?.data?.accessToken;
  if (userInfo?.data?.accessToken) {
    setAccessTokenCookie(token, {
      redirect: "/dasboard",
    });
  }
  return userInfo;
};
