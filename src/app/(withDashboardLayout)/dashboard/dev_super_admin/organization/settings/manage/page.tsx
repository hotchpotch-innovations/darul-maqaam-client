import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import ManageOrganization from "@/components/Dashboard/dev_super_admin/organization/manage-utils/ManageOrganization";

import { Box } from "@mui/material";
import React from "react";

const OrganizationManagePage = () => {
  return (
    <Box>
      <TitleDashboard title="Organization Manage Page" />
      <ManageOrganization />
    </Box>
  );
};

export default OrganizationManagePage;
