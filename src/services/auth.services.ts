"use server";

import { authkey } from "@/constants/authkey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-starage";
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

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: "http://localhost:5000/api/v1/auth/refresh-token",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
