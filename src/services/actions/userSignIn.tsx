import { jwtDecode } from "jwt-decode";
import setAccessTokenCookie from "./setAccessTokenCookie";

type TLoginData = {
  email: string;
  password: string;
};

export const userSignIn = async (data: TLoginData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
      cache: "no-store",
    }
  );

  const userInfo = await res.json();

  const user_data: any = jwtDecode(userInfo?.data?.accessToken);

  const passwordChangeRequired = userInfo?.data?.needPasswordChange;

  // when user role is not client then user should change his password
  let redirect: string | null = null;

  if (passwordChangeRequired) {
    redirect = "/authentication/change-password";
  } else {
    redirect = `/dashboard/${user_data?.role.toLowerCase()}`;
  }

  if (userInfo?.data?.accessToken) {
    setAccessTokenCookie(userInfo?.data?.accessToken, {
      redirect,
    });
  }

  return userInfo;
};
