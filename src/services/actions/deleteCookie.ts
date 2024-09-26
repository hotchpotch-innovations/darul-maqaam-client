"use server";

import { cookies } from "next/headers";

export const deleteCookie = (keys: string[]) => {
  keys.forEach((key) => {
    cookies().delete(key);
  });
};
