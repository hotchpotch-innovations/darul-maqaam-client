"use client";

import { Box, Grid2, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

type TData = {
  url: string;
  key: string;
};
type TProps = {
  deleteHandler: any;
  data: TData;
};
const UploadedImage = ({ deleteHandler, data }: TProps) => {
  return (
    <Grid2 size={3}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "150px",
          ":hover .removeButton": {
            opacity: 1,
          },
        }}
      >
        <IconButton
          onClick={() => deleteHandler(data?.key)}
          className="removeButton"
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            backgroundColor: "white",
            color: "red",
            fontSize: "20px",
            padding: "2px",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>

        <Image
          src={data?.url}
          alt="Banner Image"
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

export default UploadedImage;
