import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type TProps = {
  params: Record<string, any>;
};

const WebpageDetailsPage = async ({ params }: TProps) => {
  const slug = params?.slug;
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Webpage Details" />
      </Stack>
      <Typography>Page Slug : {slug}</Typography>
      <Stack>{/* <UpdateWebpageForm slug={slug} /> */}</Stack>
    </Box>
  );
};

export default WebpageDetailsPage;
