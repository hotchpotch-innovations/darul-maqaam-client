import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import SinglePageSectionTable from "@/components/Dashboard/dev_super_admin/contents/page_section/single_utils/SinglePageSectionTable";
import { Box } from "@mui/material";
import React from "react";

const SinglePageSectionPage = () => {
  return (
    <Box>
      <TitleDashboard title="Page Section (single) Page" />
      <SinglePageSectionTable />
    </Box>
  );
};

export default SinglePageSectionPage;
