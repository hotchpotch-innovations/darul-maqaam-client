"use client";
import { Box, Button, IconButton } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import React, { Dispatch, SetStateAction } from "react";
import Loading from "@/components/ui/LoadingBar";
import Image from "next/image";

type TBannerImage = {
  isLoading: boolean;
  selectedBanner: string;
  bannerImage: string;
  handleChange: any;
  handleUpload: any;
};

const BannerImage = ({
  isLoading,
  selectedBanner,
  bannerImage,
  handleChange,
  handleUpload,
}: TBannerImage) => {
  return (
    <>
      {/* Banner Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
          ":hover .removeButton": {
            opacity: 1,
          },
        }}
      >
        <IconButton
          className="removeButton"
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            backgroundColor: "white",
            color: "white",
            fontSize: "20px",
            padding: "2px",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
          onClick={() => {
            const fileInput = document.getElementById(
              "fileInput"
            ) as HTMLInputElement;
            fileInput.click();
          }}
        >
          <ChangeCircleIcon fontSize="large" color="info" />
        </IconButton>

        {isLoading ? (
          <Loading />
        ) : (
          <Image
            src={selectedBanner || bannerImage}
            alt="Banner Image"
            width={100}
            height={100}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        )}
        <input
          type="file"
          id="fileInput"
          hidden
          accept="image/*"
          onChange={handleChange}
        />
      </Box>

      <Box sx={{ height: { xs: "42px", lg: "60px" } }}>
        <Button
          sx={{
            marginY: "8px",
            ...(selectedBanner
              ? { visibility: "visible" }
              : { visibility: "hidden" }),
          }}
          type="submit"
          disabled={isLoading || !selectedBanner}
          onClick={handleUpload}
        >
          Save Changes
        </Button>
      </Box>
    </>
  );
};

export default BannerImage;
