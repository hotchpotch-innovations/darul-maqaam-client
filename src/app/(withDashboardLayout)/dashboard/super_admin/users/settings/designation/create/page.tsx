import CreateDesignation from "@/components/dashboard/dev_super_admin/settings/designation/CreateDesignation";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
