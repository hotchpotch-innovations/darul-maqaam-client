import { decodedToken } from "./jwt";
import { getFromLocalStorage } from "./local-starage";
import { authkey } from "@/constants/authkey";

export const getUserInfoFromLocalStorage = () => {
  const authToken = getFromLocalStorage(authkey);

  if (authToken) {
    const decodedData = decodedToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  } else {
    return null;
  }
};
