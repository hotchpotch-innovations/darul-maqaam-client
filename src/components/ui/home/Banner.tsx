"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import image1 from "../../../../public/imageSRC/map-01.png";
import image2 from "../../../../public/imageSRC/map-03.png";
import Image from "next/image";
import { Box, Container, Stack, Typography } from "@mui/material";

const Banner = () => {
  return (
    <Box>
      <Swiper
        navigation={{
          nextEl: ".button-prev-slide",
          prevEl: ".button-next-slide",
        }}
        modules={[Navigation]}
        loop={true}
        className="mySwiper relative group h-auto -z-999"
      >
        <SwiperSlide className="relative min-h-[550px] lg:min-h-[750px] min-w-full bg-black opacity-80 text-white">
          <Image
            src={image1}
            width={0}
            height={0}
            alt="Banner Background Image relative"
            className=" min-h-[550px] md:h-[750px] bg-cover"
          />

          <Box
            sx={{
              position: "absolute",
              top: {
                xs: "10%", // Mobile devices
                sm: "10%", // Tablet devices
                md: "33%",
              },
              left: {
                xs: "20px", // Mobile devices
                sm: "30px", // Tablet devices
                md: "150px",
              },
              zIndex: "999",
            }}
          >
            <Stack className="lg:max-w-[60%] " direction={"column"} gap={1}>
              <Typography color={"warning.main"}>
                <span className="lg:text-6xl text-3xl font-semibold">
                  DARUL MAQAAM
                </span>
                <span className="text-green-600">Foundation</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "1.25rem", // h6 for mobile (20px)
                    sm: "1.5rem", // h5 for tablet (24px)
                    md: "1.5rem", // h4 for laptop (34px)
                  },
                  fontWeight: {
                    xs: 500, // Match the default h6 font weight
                    sm: 500, // Match the default h5 font weight
                    md: 400, // Match the default h4 font weight
                  },
                }}
              >
                Phone: +88 017XX XXX XXX
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "1.25rem", // h6 for mobile (20px)
                    sm: "1.5rem", // h5 for tablet (24px)
                    md: "1.3rem", // h4 for laptop (34px)
                  },
                  fontWeight: {
                    xs: 500, // Match the default h6 font weight
                    sm: 500, // Match the default h5 font weight
                    md: 400, // Match the default h4 font weight
                  },
                }}
              >
                Email: darul.maquaam@gmail.com
              </Typography>
              <Typography className="lg:text-balance text-justify text-xs lg:text-sm pe-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                nostrum ullam magni ipsa excepturi, explicabo aliquid deserunt
                inventore cum, facere id atque iste, labore blanditiis fugiat
                voluptate fugit. Quis minus pariatur sit reiciendis blanditiis
                incidunt sint facilis non quibusdam vel? Aliquam fuga deleniti
                est! Nulla quod sapiente in vitae. fugiat voluptate fugit. Quis
                minus pariatur sit reiciendis blanditiis incidunt sint facilis
                non quibusdam vel? Aliquam fuga deleniti est! Nulla quod
                sapiente in vitae.
              </Typography>
            </Stack>
          </Box>
        </SwiperSlide>
        <SwiperSlide className="relative min-h-[550px] lg:min-h-[750px] min-w-full bg-black opacity-80 text-white">
          <Image
            src={image1}
            width={0}
            height={0}
            alt="Banner Background Image relative"
            className=" min-h-[550px] md:h-[750px] bg-cover"
          />

          <Box
            sx={{
              position: "absolute",
              top: {
                xs: "10%", // Mobile devices
                sm: "10%", // Tablet devices
                md: "33%",
              },
              left: {
                xs: "20px", // Mobile devices
                sm: "30px", // Tablet devices
                md: "150px",
              },
              zIndex: "999",
            }}
          >
            <Stack className="lg:max-w-[60%] " direction={"column"} gap={1}>
              <Typography color={"warning.main"}>
                <span className="lg:text-6xl text-3xl font-semibold">
                  DARUL MAQAAM
                </span>
                <span className="text-green-600">Foundation</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "1.25rem", // h6 for mobile (20px)
                    sm: "1.5rem", // h5 for tablet (24px)
                    md: "1.5rem", // h4 for laptop (34px)
                  },
                  fontWeight: {
                    xs: 500, // Match the default h6 font weight
                    sm: 500, // Match the default h5 font weight
                    md: 400, // Match the default h4 font weight
                  },
                }}
              >
                Phone: +88 017XX XXX XXX
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "1.25rem", // h6 for mobile (20px)
                    sm: "1.5rem", // h5 for tablet (24px)
                    md: "1.3rem", // h4 for laptop (34px)
                  },
                  fontWeight: {
                    xs: 500, // Match the default h6 font weight
                    sm: 500, // Match the default h5 font weight
                    md: 400, // Match the default h4 font weight
                  },
                }}
              >
                Email: darul.maquaam@gmail.com
              </Typography>
              <Typography className="lg:text-balance text-justify text-xs lg:text-sm pe-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                nostrum ullam magni ipsa excepturi, explicabo aliquid deserunt
                inventore cum, facere id atque iste, labore blanditiis fugiat
                voluptate fugit. Quis minus pariatur sit reiciendis blanditiis
                incidunt sint facilis non quibusdam vel? Aliquam fuga deleniti
                est! Nulla quod sapiente in vitae. fugiat voluptate fugit. Quis
                minus pariatur sit reiciendis blanditiis incidunt sint facilis
                non quibusdam vel? Aliquam fuga deleniti est! Nulla quod
                sapiente in vitae.
              </Typography>
            </Stack>
          </Box>
        </SwiperSlide>

        <button className="absolute top-[50%] -left-[60px] group-hover:left-0 button-prev-slide min-w-[60px] min-h-[40px] z-10 bg-black text-white transition-all duration-700">
          <ArrowBackIcon />
        </button>
        <button className="absolute top-[50%] group-hover:right-0 -right-[60px] button-next-slide min-w-[60px] min-h-[40px] z-10 bg-black text-white transition-all duration-700">
          <ArrowForwardIcon />
        </button>
      </Swiper>
    </Box>
  );
};

export default Banner;
