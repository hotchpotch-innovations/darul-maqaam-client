import { authkey } from "@/constants/authkey";
import { deleteCookie } from "@/services/actions/deleteCookie";
import { logOutUser } from "@/services/actions/logoutUser";
import { getUserInfo, isLoggedIn, logoutUser } from "@/services/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = getUserInfo();
  const isLoggedUser = isLoggedIn();
  const handleLoutOut = () => {
    logOutUser(router);
  };
  return (
    <>
      {isLoggedUser ? (
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
