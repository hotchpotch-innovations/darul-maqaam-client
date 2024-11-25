import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import MultiplePageSectionTable from "@/components/Dashboard/dev_super_admin/contents/page_section/multiple_utils/MultiplePageSectionTable";
import { Box } from "@mui/material";
import React from "react";

const MultiplePageSectionPage = () => {
  return (
    <Box>
      <TitleDashboard title="Page Section (multiple) List" />
      <MultiplePageSectionTable />
    </Box>
  );
};

export default MultiplePageSectionPage;
