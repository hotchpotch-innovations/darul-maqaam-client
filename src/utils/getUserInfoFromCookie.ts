import { getCookie } from "./getCookie";
import { decodedToken } from "./jwt";

export const getUserInfoFromCookie = () => {
  const authToken = getCookie();

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
