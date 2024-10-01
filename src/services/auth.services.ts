import { authkey } from "@/constants/authkey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-starage";
import { cookies } from "next/headers";

type TStoreUserInfo = {
  accessToken: string;
  resetToken?: string;
};

export const storeUserInfo = ({ accessToken, resetToken }: TStoreUserInfo) => {
  if (resetToken) {
    return setToLocalStorage(resetToken, accessToken);
  } else {
    return setToLocalStorage(authkey, accessToken);
  }
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authkey);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  }
};

export const isLoggedIn = (): boolean => {
  const authToken = getFromLocalStorage("authkey");

  if (authToken) {
    return !!authToken;
  }

  return false;
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: "http://localhost:5000/api/v1/auth/refresh-token",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
