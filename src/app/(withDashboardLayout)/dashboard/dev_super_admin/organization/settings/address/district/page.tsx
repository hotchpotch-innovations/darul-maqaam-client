import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import DistrictTable from "@/components/Dashboard/dev_super_admin/user/settings/address/district-utils/DistrictTable";
import { Box } from "@mui/material";
import React from "react";

const DistrictPage = () => {
  return (
    <Box>
      <TitleDashboard title="District Settings" />
      <DistrictTable />
    </Box>
  );
};

export default DistrictPage;
