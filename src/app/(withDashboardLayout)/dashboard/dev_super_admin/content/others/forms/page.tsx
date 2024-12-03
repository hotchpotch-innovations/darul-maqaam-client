import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import FormsTable from "@/components/Dashboard/dev_super_admin/contents/others/forms_utils/FormsTable";
import { Box } from "@mui/material";
import React from "react";

const FormsAndTemplatePage = () => {
  return (
    <Box>
      <TitleDashboard title="Forms List" />
      <FormsTable />
    </Box>
  );
};

export default FormsAndTemplatePage;
