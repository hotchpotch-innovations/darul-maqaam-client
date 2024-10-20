import DepartmentTable from "@/components/dashboard/dev_super_admin/settings/department/DepartmentTable";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
