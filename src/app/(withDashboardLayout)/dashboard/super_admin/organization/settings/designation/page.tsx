import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const DesignationPage = () => {
  const DesignationTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/user/settings/designation-uitls/DesignationTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Designation Settings" />
      <DesignationTable />
    </Box>
  );
};

export default DesignationPage;
