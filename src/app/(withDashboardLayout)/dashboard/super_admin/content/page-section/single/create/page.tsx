import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const CreateSingleWebpage = () => {
  const CreateSinglePageSectionForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/page_section/single_utils/CreateSinglePageSectionForm"
      ),
    {
      ssr: false,
    }
  );

  return (
    <Box>
      <Stack>
        <TitleDashboard title="Create Section" />
      </Stack>
      <Stack>
        <CreateSinglePageSectionForm />
      </Stack>
    </Box>
  );
};

export default CreateSingleWebpage;
