import CreateSuperAdminForm from "@/components/dashboard/dev_super_admin/user/admin/CreateSuperAdminForm";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
import { Box } from "@mui/material";

const CreateSuperAdminPage = () => {
  return (
    <Box>
      <TitleDashboard title="Create Super Admin" />
      <CreateSuperAdminForm />
    </Box>
  );
};

export default CreateSuperAdminPage;
