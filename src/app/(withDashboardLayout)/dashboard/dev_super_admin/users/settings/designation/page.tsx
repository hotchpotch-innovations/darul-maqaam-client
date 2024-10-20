import DesignationTable from "@/components/dashboard/dev_super_admin/settings/designation/DesignationTable";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
