import ClientTypeTable from "@/components/dashboard/dev_super_admin/settings/client-type/ClientTypeTable";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
