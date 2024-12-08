import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import CreateDesignation from "@/components/Dashboard/dev_super_admin/user/settings/designation-uitls/CreateDesignation";
import { Box } from "@mui/material";

const page = () => {
  return (
    <Box>
      <TitleDashboard title="Create Designation" />
      <CreateDesignation />
    </Box>
  );
};

export default page;
