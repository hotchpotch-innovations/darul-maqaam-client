import { authkey } from "@/constants/authkey";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-starage";
import { TStoreUserInfo } from "./auth.services";
import { decodedToken } from "@/utils/jwt";

export const storeUserInfo = ({ accessToken, resetToken }: TStoreUserInfo) => {
  if (resetToken) {
    return setToLocalStorage(resetToken, accessToken);
  } else {
    return setToLocalStorage(authkey, accessToken);
  }
};

export const getUserInfoFromLocalStorage = () => {
  // const authToken = getFromLocalStorage(authkey);
  const authToken = getFromLocalStorage(authkey);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    console.log({ decodedData });
    const role = decodedData?.role.toLowerCase();
    return decodedData?.role.toLowerCase();
  }
};
