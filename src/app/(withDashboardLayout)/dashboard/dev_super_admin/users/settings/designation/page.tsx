import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import DesignationTable from "@/components/Dashboard/dev_super_admin/user/settings/designation-uitls/DesignationTable";
import { Box } from "@mui/material";
import React from "react";

const DesignationPage = () => {
  return (
    <Box>
      <TitleDashboard title="Designation Settings" />
      <DesignationTable />
    </Box>
  );
};

export default DesignationPage;
