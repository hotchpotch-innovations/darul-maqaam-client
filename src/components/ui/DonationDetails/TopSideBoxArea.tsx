import { Box, Typography } from "@mui/material";
import gift from "../../../../public/images/detailPage-gift.png";
import cloud from "../../../../public/images/detailPage-cloud.png";
import Image from "next/image";
import React from "react";

type TProps = {
  title: string;
};

const TopSideDonationBoxArea = ({ title = "" }: TProps) => {
  return (
    <Box
      sx={{
        height: "500px",
        backgroundColor: "primary.main",
        position: "relative",
        display: "flex", // Enables flexbox
        alignItems: "center", // Centers vertically
        justifyContent: "center", // Centers horizontally
        textAlign: "center", // Ensures text alignment
      }}
    >
      {/* gift images area  */}
      <Image
        className="absolute right-[-2%] top-[300px] lg:top-[200px] lg:w-24 w-16 animate-float z-10"
        src={gift}
        alt=""
      />
      <Image
        className="absolute left-[30%] top-[230px] animate-float  w-10 lg:w-28 z-10"
        src={gift}
        alt=""
      />
      <Image
        className="absolute lg:left-[10%] left-[15%] lg:top-[60px] lg:w-10 w-6 top-[20px] animate-float z-10"
        src={gift}
        alt=""
      />

      {/* gift images area  end*/}
      {/* cloud images area */}
      <Image
        className="absolute lg:left-[-4%] left-[-20%] top-[80px] animate-float-cloud "
        src={cloud}
        width={200}
        height={40}
        alt=""
      />
      <Image
        className="absolute left-[20%] top-[220px] animate-float-cloud "
        src={cloud}
        width={100}
        height={40}
        alt=""
      />
      <Image
        className="absolute left-[10%] top-[400px] animate-float-cloud"
        src={cloud}
        width={100}
        height={40}
        alt=""
      />
      <Image
        className="absolute lg:left-[20%] w-10 lg:w-20 top-[220px] animate-float-cloud"
        src={cloud}
        alt=""
      />
      <Image
        className="absolute right-[10%] top-[60px] animate-float-cloud lg:block hidden"
        src={cloud}
        width={200}
        height={40}
        alt=""
      />
      <Image
        className="absolute lg:w-20  lg:right-[7%] right-0 top-[300px] animate-float-cloud"
        src={cloud}
        alt=""
      />

      {/* cloud images area */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "900px",
          height: "300px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: "25px",
              lg: "4em",
            },
            color: "#ffffff",
            zIndex: "50",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "#ffffff",
            fontStyle: "italic",
            zIndex: 100,
            marginTop: "10px",
            fontSize: {
              xs: "13px",
              lg: "15px",
            },
            paddingX: "5px",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          esse alias aliquid, nemo vitae recusandae voluptatum consectetur?
          Aspernatur, tempora nisi?
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            xs: "95%",
            lg: "1000px",
          },
          height: "200px",
          borderRadius: "16px",
          backgroundColor: "#ecb96a",
          position: "absolute",
          top: "400px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex", // Enables flexbox
          alignItems: "center", // Centers vertically
          justifyContent: "center", // Centers horizontally
          textAlign: "center", // Ensures text alignment
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          Abu Hurairah (RAA) narrated that the Messenger of Allah (ﷺ)
          said:“Allah helps His slave as long as he helps his brother.” (Muslim
          Hadith 1508)
        </Typography>
      </Box>
    </Box>
  );
};

export default TopSideDonationBoxArea;
