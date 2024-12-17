import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const MultiplePageSectionPage = () => {
  const MultiplePageSectionTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/page_section/multiple_utils/MultiplePageSectionTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Page Section (multiple) List" />
      <MultiplePageSectionTable />
    </Box>
  );
};

export default MultiplePageSectionPage;
