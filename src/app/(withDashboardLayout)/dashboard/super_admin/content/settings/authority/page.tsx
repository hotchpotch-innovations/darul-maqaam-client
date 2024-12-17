import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const AuthorityPage = () => {
  const AuthorityTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/settings/authority_utils/AuthorityTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Authority List" />
      <AuthorityTable />
    </Box>
  );
};

export default AuthorityPage;
