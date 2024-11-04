import DepartmentTable from "@/components/Dashboard/dev_super_admin/settings/department-utils/DepartmentTable";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import React from "react";

const DepartmentPage = () => {
  return (
    <Box>
      <TitleDashboard title="Department Settings" />
      <DepartmentTable />
    </Box>
  );
};

export default DepartmentPage;
