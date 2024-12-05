import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import OrganizationProfileForm from "@/components/Dashboard/dev_super_admin/organization/manage-utils/OrganizationProfileForm";

import { Box } from "@mui/material";
import React from "react";

const OrganizationManagePage = () => {
  return (
    <Box>
      <TitleDashboard title="Organization Manage Page" />
      <OrganizationProfileForm />
    </Box>
  );
};

export default OrganizationManagePage;
