import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const SinglePageSectionPage = () => {
  const SinglePageSectionTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/page_section/single_utils/SinglePageSectionTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Page Section (single) List" />
      <SinglePageSectionTable />
    </Box>
  );
};

export default SinglePageSectionPage;
