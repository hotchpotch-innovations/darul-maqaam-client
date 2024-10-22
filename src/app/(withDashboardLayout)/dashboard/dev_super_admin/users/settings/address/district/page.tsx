import DistrictTable from "@/components/dashboard/dev_super_admin/settings/address/district/DistrictTable";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
