import { Typography } from "@mui/material";

type TTileDashboardProps = {
  title: string;
};
const TitleDashboard = ({ title }: TTileDashboardProps) => {
  return (
    <Typography
      fontSize={"28px"}
      color="primary.main"
      align="center"
      borderBottom={"1px solid lightgray"}
      maxWidth={"400px"}
      mx={"auto"}
      sx={{
        textTransform: "capitalize",
      }}
    >
      {title}
    </Typography>
  );
};

export default TitleDashboard;
