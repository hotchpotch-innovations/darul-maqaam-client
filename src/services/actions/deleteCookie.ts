"use server";

import { cookies } from "next/headers";

export const deleteCookie = async (keys: string[]) => {
  const cookieStore = await cookies(); // Await the cookies() function

  for (const key of keys) {
    cookieStore.delete(key); // Now delete will work
  }
};
