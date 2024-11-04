import CreateDesignation from "@/components/Dashboard/dev_super_admin/settings/designation-uitls/CreateDesignation";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
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
