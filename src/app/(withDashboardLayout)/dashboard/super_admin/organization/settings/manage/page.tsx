import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import ManageOrganization from "@/components/Dashboard/super_admin/organization/manage-utils/ManageOrganization";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const OrganizationManagePage = () => {
  const ManageOrganization = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/organization/manage-utils/ManageOrganization"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Organization Manage Page" />
      <ManageOrganization />
    </Box>
  );
};

export default OrganizationManagePage;
