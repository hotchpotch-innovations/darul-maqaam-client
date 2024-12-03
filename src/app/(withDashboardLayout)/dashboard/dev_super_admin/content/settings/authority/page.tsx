import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import AuthorityTable from "@/components/Dashboard/dev_super_admin/contents/settings/authority_utils/AuthorityTable";
import { Box } from "@mui/material";
import React from "react";

const AuthorityPage = () => {
  return (
    <Box>
      <TitleDashboard title="Authority List" />
      <AuthorityTable />
    </Box>
  );
};

export default AuthorityPage;
