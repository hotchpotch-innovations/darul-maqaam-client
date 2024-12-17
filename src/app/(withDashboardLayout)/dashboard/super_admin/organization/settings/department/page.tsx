import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const DepartmentPage = () => {
  const DepartmentTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/user/settings/department-utils/DepartmentTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Department Settings" />
      <DepartmentTable />
    </Box>
  );
};

export default DepartmentPage;
