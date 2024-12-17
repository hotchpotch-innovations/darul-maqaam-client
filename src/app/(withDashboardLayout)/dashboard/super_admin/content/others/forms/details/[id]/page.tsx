import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type TProps = {
  params: Record<string, any>;
};

const FormDetailsPage = ({ params }: TProps) => {
  const id = params?.id;
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Form Details" />
      </Stack>
      <Stack>
        <Typography>Form Id : {id}</Typography>
      </Stack>
    </Box>
  );
};

export default FormDetailsPage;
