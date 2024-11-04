import CreateSuperAdminForm from "@/components/Dashboard/dev_super_admin/user/admin-forms/CreateSuperAdminForm";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
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
