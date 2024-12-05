import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import ClientTypeTable from "@/components/Dashboard/dev_super_admin/user/settings/client-type-utils/ClientTypeTable";
import { Box } from "@mui/material";
import React from "react";

const ClientTypePage = () => {
  return (
    <Box>
      <TitleDashboard title="Client Types Settings" />
      <ClientTypeTable />
    </Box>
  );
};

export default ClientTypePage;
