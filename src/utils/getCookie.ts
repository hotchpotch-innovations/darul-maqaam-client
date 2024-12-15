// import { authKey } from "@/constant/authKey";

import { authkey } from "@/constants/authkey";

export const getCookie = () => {
  const namePattern = `${authkey}=`;
  const cookies = document?.cookie?.split("; ");
  for (const cookie of cookies) {
    if (cookie.startsWith(namePattern)) {
      return cookie.substring(namePattern?.length);
    }
  }
  return null;
};
