import { getUserInfo, isLoggedIn } from "@/services/auth.services";
import { Typography } from "@mui/material";

const UserEmail = () => {
  const userInfo = getUserInfo();
  const userEmail = userInfo;
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
