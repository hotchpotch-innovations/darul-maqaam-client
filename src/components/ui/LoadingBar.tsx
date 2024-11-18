import { CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Typography
      sx={{
        minHeight: "50vh",
        py: "10%",
        textAlign: "center",
      }}
    >
      <CircularProgress />
    </Typography>
  );
};

export default Loading;
