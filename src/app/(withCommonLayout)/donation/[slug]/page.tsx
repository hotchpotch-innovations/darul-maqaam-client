import React from "react";
import { Box, Container } from "@mui/material";
import LeftSideDonationBoxArea from "@/components/UI/DonationDetails/LeftSideBoxArea";
import RightSideDonationBoxArea from "@/components/UI/DonationDetails/RightSideBoxArea";
import TopSideDonationBoxArea from "@/components/UI/DonationDetails/TopSideBoxArea";
type TProps = {
  params: Record<string, any>;
};

const DonationDetailsPage = async ({ params }: TProps) => {
  const slug = params?.slug;
  const backend_api = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const res = await fetch(`${backend_api}/content/webpage/${slug}`, {
    cache: "no-store",
  });

  const donation_obj = await res.json();
  // console.log({ donation_obj });

  return (
    <Container>
      <Box sx={{ minHeight: "100vh", overflow: "hidden", width: "100%" }}>
        {/* top box area  */}
        <TopSideDonationBoxArea title={donation_obj?.data?.title} />
        {/* bottom box area */}
        <Box
          sx={{
            marginTop: "150px",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
          }}
        >
          {/* left sided box area  */}
          <LeftSideDonationBoxArea
            description={donation_obj?.data?.description}
          />

          {/* right side box area */}
          <RightSideDonationBoxArea og_image={donation_obj?.data?.og_image} />
        </Box>
      </Box>
    </Container>
  );
};

export default DonationDetailsPage;
