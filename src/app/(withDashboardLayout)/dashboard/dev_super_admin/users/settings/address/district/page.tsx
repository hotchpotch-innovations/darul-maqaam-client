import DistrictTable from "@/components/Dashboard/dev_super_admin/settings/address/district-utils/DistrictTable";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
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
