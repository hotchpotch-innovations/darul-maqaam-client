"use server";
// import { authKey } from "@/constant/authKey";

import { authkey } from "@/constants/authkey";
import { cookies } from "next/headers";

// export const getCookie = () => {
//   const namePattern = `${authkey}=`;
//   const cookies = document?.cookie?.split("; ");
//   for (const cookie of cookies) {
//     if (cookie.startsWith(namePattern)) {
//       return cookie.substring(namePattern?.length);
//     }
//   }
//   return null;
// };

export const getCookie = async () => {
  const accessToken = await cookies().get(authkey)?.value;
  if (accessToken) {
    return accessToken;
  } else {
    return null;
  }
};
