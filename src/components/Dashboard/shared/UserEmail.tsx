import { getUserInfo, isLoggedIn, removeUser } from "@/services/auth.services";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserEmail = () => {
  const userInfo = getUserInfo();
  const userEmail = userInfo?.email;
  const isLoggedUser = isLoggedIn();

  return (
    <>
      <Typography
        variant="body2"
        noWrap
        component="div"
        sx={{ color: "rgba(11, 17, 52, 0.6)" }}
      >
        Hi, {isLoggedUser ? userEmail : "example@gmail.com"},
      </Typography>
    </>
  );
};

export default UserEmail;
