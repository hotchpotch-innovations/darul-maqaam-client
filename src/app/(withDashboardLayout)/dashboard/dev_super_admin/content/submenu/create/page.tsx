import CreateSubMenuForm from "@/components/dashboard/dev_super_admin/content/submenu/SubMenuCreateForm";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
import { Box } from "@mui/material";

const CreateSubMenu = () => {
  return (
    <Box>
      <TitleDashboard title="Create Sub Menue" />
      <CreateSubMenuForm />
    </Box>
  );
};

export default CreateSubMenu;
