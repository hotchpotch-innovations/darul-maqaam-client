"use client";

import { authkey, refreshToken } from "@/constants/authkey";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-starage";
import { TStoreUserInfo } from "./auth.services";
import { decodedToken } from "@/utils/jwt";

export const storeUserInfo = ({ accessToken, resetToken }: TStoreUserInfo) => {
  if (resetToken) {
    return setToLocalStorage(refreshToken, accessToken);
  } else {
    return setToLocalStorage(authkey, accessToken);
  }
};

export const isLoggedIn = (): boolean => {
  const authToken = getFromLocalStorage(authkey);

  if (authToken) {
    return !!authToken;
  }

  return false;
};

export const getUserInfoFromLocalStorage = () => {
  // const authToken = getFromLocalStorage(authkey);
  const authToken = getFromLocalStorage(authkey);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return decodedData;
  }
};
