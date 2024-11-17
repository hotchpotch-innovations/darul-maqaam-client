import CreateAdminFrom from "@/components/Dashboard/dev_super_admin/user/admin-utils/CreateAdminFrom";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";

const CreateAdminPage = () => {
  return (
    <Box>
      <TitleDashboard title="Create Admin" />
      <CreateAdminFrom />
    </Box>
  );
};

export default CreateAdminPage;
