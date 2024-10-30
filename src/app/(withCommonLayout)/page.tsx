import { Box, Button, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        background:
          "lightgray url(https://www.w3schools.com/cssref/img_tree.gif) no-repeat fixed center",
        minHeight: "calc(100vh - 80px)",
        // background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          width: "60%",
          textAlign: "center",
          animation: "marquee 30s linear infinite",
          position: "absolute",
          "@keyframes marquee": {
            "0%": { transform: "translateX(100%)" },
            "100%": { transform: "translateX(-100%)" },
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#b50000",
            fontWeight: "700",
            textShadow: "2px 2px 8px rgba(181, 0, 0, 0.7)",
          }}
        >
          Hotchpotch Innovations Ltd.
        </Typography>
        <Typography
          sx={{
            color: "#b50000",
            textShadow: "2px 2px 8px rgba(181, 0, 0, 0.7)",
          }}
        >
          Since - 2016
        </Typography>
      </Box>

      <Typography
        variant="h1"
        sx={{ color: "#E5E7EB", position: "absolute", bottom: "100px" }}
      >
        Hotchpotch Innovations Limited
      </Typography>
    </Box>
  );
};

export default HomePage;
