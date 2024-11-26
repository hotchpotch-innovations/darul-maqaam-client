import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const CreateWebpage = () => {
  const CreateWebpageForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/webpage_utils/CreateWebpageForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Create Webpage" />
      </Stack>
      <Stack>
        <CreateWebpageForm />
      </Stack>
    </Box>
  );
};

export default CreateWebpage;
