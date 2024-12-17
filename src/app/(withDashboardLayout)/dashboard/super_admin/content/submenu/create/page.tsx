import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const CreateSubMenu = () => {
  const CreateSubMenuForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/submenus/SubMenuCreateForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Create Sub Menu" />
      <CreateSubMenuForm />
    </Box>
  );
};

export default CreateSubMenu;
