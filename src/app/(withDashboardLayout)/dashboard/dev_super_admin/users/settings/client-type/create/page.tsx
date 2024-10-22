import CreateClientTypeForm from "@/components/dashboard/dev_super_admin/settings/client-type/CreateClientTypeForm";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
import { Box } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <Box>
      <TitleDashboard title="Create Client Type" />
      <CreateClientTypeForm />
    </Box>
  );
};

export default page;
