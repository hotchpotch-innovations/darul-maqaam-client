"use server";

import { authkey } from "@/constants/authkey";
import { decodedToken } from "@/utils/jwt";
import { cookies } from "next/headers";

export type TStoreUserInfo = {
  accessToken: string;
  resetToken?: string;
};

export const getUserInfo = async () => {
  // const authToken = getFromLocalStorage(authkey);
  const accessToken = await cookies().get(authkey)?.value;
  if (accessToken) {
    const decodedData: any = decodedToken(accessToken);

    return {
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  }
};
