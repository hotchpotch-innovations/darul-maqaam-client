import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import TeamMembersTable from "@/components/Dashboard/dev_super_admin/contents/others/team_utils/TeamMembersTable";
import { Box } from "@mui/material";
import React from "react";

const TeamPage = () => {
  return (
    <Box>
      <TitleDashboard title="Team Page" />
      <TeamMembersTable />
    </Box>
  );
};

export default TeamPage;
