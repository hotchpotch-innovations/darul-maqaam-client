
import { getUserInfoFromLocalStorage, isLoggedIn } from "@/services/auth.Services.Loacl";
import { Typography } from "@mui/material";

const UserEmail = () => {
  const user_info = getUserInfoFromLocalStorage()

  return (
    <>
      <Typography
        variant="body2"
        noWrap
        component="div"
        sx={{ color: "rgba(11, 17, 52, 0.6)" }}
      >
        Hi, {user_info?.email},
      </Typography>
    </>
  );
};

export default UserEmail;
