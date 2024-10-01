import { authkey } from "@/constants/authkey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookie } from "./deleteCookie";

export const logOutUser = (router?: AppRouterInstance) => {
  localStorage.removeItem(authkey);
  deleteCookie([authkey, "refreshToken"]);
  router?.push("/");
  router?.refresh();
};
