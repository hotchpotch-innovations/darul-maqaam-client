import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import CreateMultiplePageSectionForm from "@/components/Dashboard/dev_super_admin/contents/page_section/multiple_utils/CreateMultiplePageSectionForm";
import { Box, Stack } from "@mui/material";
import React from "react";

const MultiplePageSectionCreatePage = () => {
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
