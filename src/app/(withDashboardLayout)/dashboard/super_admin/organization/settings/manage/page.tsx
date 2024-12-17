import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const OrganizationManagePage = () => {
  const OrganizationProfileForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/organization/manage-utils/OrganizationProfileForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Organization Manage Page" />
      <OrganizationProfileForm />
    </Box>
  );
};

export default OrganizationManagePage;
