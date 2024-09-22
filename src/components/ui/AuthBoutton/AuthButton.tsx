import { getUserInfo, isLoggedIn, removeUser } from "@/services/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = getUserInfo();
  const isLoggedUser = isLoggedIn();
  const handleLoutOut = () => {
    removeUser();
    router.refresh();
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
