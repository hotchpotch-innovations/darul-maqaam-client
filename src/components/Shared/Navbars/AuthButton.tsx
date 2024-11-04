"use client";

import useUserInfo from "@/hooks/other/useUserInfo";
import { logOutUser } from "@/services/actions/logoutUser";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = useUserInfo();

  const handleLoutOut = () => {
    logOutUser();
    router.push("/");
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
