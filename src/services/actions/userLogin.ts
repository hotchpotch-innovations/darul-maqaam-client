// "use server";

import { FieldValues } from "react-hook-form";
import { setAccessTokenCookie } from "./setAccessTokenCookie";

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
  const accessToken = userInfo?.data?.accessToken;
  if (accessToken) {
    setAccessTokenCookie(accessToken);
  }

  return userInfo;
};
