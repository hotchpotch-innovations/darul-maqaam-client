"use client";

import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GalleryImage = ({ data }: { data: Record<string, any> }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Button onClick={handleClickOpen}> */}
      <Grid item xs={12} sm={12} md={5} lg={4} width={"33%"}>
        <div className="hover:relative group transition-all duration-1000 h-[300px]">
          <Image
            src={data?.cover_image?.url || ""}
            alt={data?.title || ""}
            height={500}
            width={500}
            objectFit="cover"
            className="z-10 h-[300px] w-full"
          />
          <Typography
            onClick={handleClickOpen}
            className="group-hover:absolute hidden transition-all duration-10.00  inset-0 group-hover:flex items-center justify-center z-[999] bg-black opacity-70 text-white"
          >
            Preview
          </Typography>
        </div>
      </Grid>
      {/* </Button> */}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar
            sx={{
              position: "absolute",
              right: "20px",
              top: "0px",
              zIndex: "999",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon className="text-red-500 size-14!" />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* View Full Image  */}
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <div className="w-screen " onClick={handleClose}>
            <Image
              src={data?.cover_image?.url}
              className="w-[80%] mx-auto max-h-[calc(100vh)] object-cover z-10"
              alt={data?.title || ""}
              height={1900}
              width={2400}
            />
          </div>
        </Grid>
      </Dialog>
    </>
  );
};

export default GalleryImage;
