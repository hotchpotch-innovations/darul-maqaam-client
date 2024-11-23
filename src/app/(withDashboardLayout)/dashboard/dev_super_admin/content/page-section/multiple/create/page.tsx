import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const MultiplePageSectionCreatePage = () => {
  const CreateMultiplePageSectionForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/page_section/multiple_utils/CreateMultiplePageSectionForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Create Object" />
      </Stack>
      <Stack>
        <CreateMultiplePageSectionForm />
      </Stack>
    </Box>
  );
};

export default MultiplePageSectionCreatePage;
