import { Box, Typography } from "@mui/material";
import mobileMoke from "../../../../public/images/phone.png";
import Image from "next/image";
import React from "react";
import DonationForm from "./DonationForm";

type TProps = {
  og_image: string;
};

const RightSideDonationBoxArea = ({ og_image = "" }: TProps) => {
  return (
    <Box
      sx={{
        width: {
          lg: "600px",
          xs: "350px",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Image
          src={mobileMoke}
          className="lg:w-[600px] w-[400px]  hidden lg:block"
          alt="image"
        />
        <Box
          sx={{
            position: {
              lg: "absolute",
              xs: "relative",
            },

            right: {
              lg: "10px",
            },
            left: {
              lg: "100px",
              // xs: "55px",
            },
            top: {
              lg: "45px",
              xs: "15px",
            },
            width: {
              lg: "400px",
              xs: "100%",
            },
            zIndex: -100,
            height: {
              lg: "800px",
              xs: "610px",
            },
          }}
        >
          <Image
            src={og_image}
            width={400}
            height={400}
            className="lg:w-[400px] rounded-2xl w-full  rounded-b-[50%] lg:block hidden"
            alt="image"
          />
          <Box
            sx={{
              paddingX: {
                lg: "20px",
                // xs: "5px",
              },
            }}
          >
            <Typography
              sx={{
                paddingX: {
                  lg: "20px",
                },
                marginTop: "20px",
                borderRadius: "10px",
                paddingY: "10px",
                textAlign: "center",
                backgroundColor: "#2a6e6148",
                fontWeight: "600",
                fontSize: {
                  lg: "16px",
                  xs: "14px",
                },
              }}
            >
              {`Bkash/Nagad Merchant: ${process.env.NEXT_PUBLIC_MERCHANT_ACCOUNT_NO}`}
              <br />
              <span className="text-xs">{`(Donate by choosing the payment option)`}</span>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            paddingX: "20px",
            position: "absolute",
            bottom: {
              lg: "100px",
              xs: "0px",
            },
            right: {
              lg: "10px",
              xs: "0",
            },
            left: {
              lg: "100px",
              xs: "-30px",
            },
            top: {
              lg: "450px",
              xs: "130px",
            },
            width: "400px",
          }}
        >
          <DonationForm />
        </Box>
      </Box>
    </Box>
  );
};

export default RightSideDonationBoxArea;
