import CreateSubMenuForm from "@/components/Dashboard/dev_super_admin/contents/submenus/SubMenuCreateForm";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";

const CreateSubMenu = () => {
  return (
    <Box>
      <TitleDashboard title="Create Sub Menu" />
      <CreateSubMenuForm />
    </Box>
  );
};

export default CreateSubMenu;
