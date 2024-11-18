import { authkey } from "@/constants/authkey";
import { deleteCookie } from "./deleteCookie";
import { removeFromLocalStorage } from "@/utils/local-starage";

export const logOutUser = () => {
  removeFromLocalStorage(authkey);
  deleteCookie([authkey, "refreshToken"]);
  deleteCookie([authkey, "accessToken"]);
};
