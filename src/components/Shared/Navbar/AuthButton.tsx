"use client";

import useUserInfo from "@/app/hooks/useUserInfo";
import { authkey } from "@/constants/authkey";
import { logOutUser } from "@/services/actions/logoutUser";
import { getUserInfo, isLoggedIn } from "@/services/auth.services";
import { Button } from "@mui/material";
import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = useUserInfo();

  const isLoggedUser = isLoggedIn();
  const handleLoutOut = () => {
    logOutUser(router);
  };
  return (
    <>
      {userInfo?.role ? (
        <Button
          onClick={handleLoutOut}
          variant="text"
          sx={{
            color: "red",
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          component={Link}
          href="/login"
          variant="text"
          sx={{
            color: "white",
          }}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
