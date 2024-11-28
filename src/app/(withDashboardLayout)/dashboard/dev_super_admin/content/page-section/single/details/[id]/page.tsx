import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type TProps = {
  params: Record<string, any>;
};
const SinglePageSectionDetailsPage = async ({ params }: TProps) => {
  const id = params?.id;
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Page Section (single) Details" />
      </Stack>
      <Stack>
        <Typography>ObjectId : {id}</Typography>
      </Stack>
    </Box>
  );
};

export default SinglePageSectionDetailsPage;
