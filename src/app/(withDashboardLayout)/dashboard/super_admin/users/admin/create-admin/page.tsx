import CreateAdminFrom from "@/components/dashboard/dev_super_admin/user/admin/CreateAdminFrom";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
