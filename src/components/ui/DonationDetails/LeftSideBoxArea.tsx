import React from "react";
import { Box, Container, Input, Typography } from "@mui/material";

type TProps = {
  description: string;
};

const LeftSideDonationBoxArea = ({ description = "" }: TProps) => {
  return (
    <Box
      sx={{
        width: {
          lg: "50%",
          xs: "100%",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: {
            lg: "3em",
            xs: "28px",
          },
        }}
      >
        Your charity turns{" "}
        <Typography
          component="span"
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            fontSize: "1em",
          }}
        >
          struggle
        </Typography>{" "}
        into a{" "}
        <Typography
          component="span"
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            fontSize: "1em",
          }}
        >
          brighter tomorrow
        </Typography>
      </Typography>
      <Typography
        sx={{
          marginTop: "8px",
          textAlign: "justify",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default LeftSideDonationBoxArea;
