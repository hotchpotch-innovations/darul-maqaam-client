import CreateClientTypeForm from "@/components/Dashboard/dev_super_admin/settings/client-type-utils/CreateClientTypeForm";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <Box>
      <TitleDashboard title="Create Client Type" />
      <CreateClientTypeForm />
      {/* abc  */}
    </Box>
  );
};

export default page;
