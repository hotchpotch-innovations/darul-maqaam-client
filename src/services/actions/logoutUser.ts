import { authkey } from "@/constants/authkey";
import { deleteCookie } from "./deleteCookie";
import { removeFromLocalStorage } from "@/utils/local-starage";

export const logOutUser = async () => {
  removeFromLocalStorage(authkey);
  // await deleteCookie([authkey, "refreshToken"]);
  await deleteCookie([authkey, "accessToken"]);
};
