import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import DepartmentTable from "@/components/Dashboard/dev_super_admin/user/settings/department-utils/DepartmentTable";
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
