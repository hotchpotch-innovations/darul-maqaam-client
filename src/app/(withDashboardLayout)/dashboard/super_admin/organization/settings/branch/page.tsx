import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import BranchTable from "@/components/Dashboard/super_admin/organization/branch-utils/BranchTable";
import { Box } from "@mui/material";
import React from "react";

const BranchPage = () => {
  return (
    <Box>
      <TitleDashboard title="Branch List" />
      <BranchTable />
    </Box>
  );
};

export default BranchPage;
