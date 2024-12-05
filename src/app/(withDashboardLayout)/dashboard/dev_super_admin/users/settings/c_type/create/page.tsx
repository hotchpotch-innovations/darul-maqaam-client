import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import CreateClientTypeForm from "@/components/Dashboard/dev_super_admin/user/settings/client-type-utils/CreateClientTypeForm";
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
