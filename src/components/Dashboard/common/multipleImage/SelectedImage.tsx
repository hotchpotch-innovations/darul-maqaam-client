"use client";
import React from "react";
import Image from "next/image";
import { Box, Grid2, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

type TData = {
  url: string;
  key: string;
};

type TProps = {
  data: TData;
  removeHandler: any;
};

const SelectedImage = ({ data, removeHandler }: TProps) => {
  return (
    <Grid2
      size={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "150px",
        }}
      >
        <IconButton
          onClick={() => removeHandler(data?.key)}
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            backgroundColor: "white",
            color: "red",
            fontSize: "20px",
            padding: "2px",
          }}
        >
          <ClearIcon fontSize="small" />
        </IconButton>

        <Image
          src={data?.url}
          alt="Selected Image Preview"
          width={150}
          height={150}
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Grid2>
  );
};

export default SelectedImage;
