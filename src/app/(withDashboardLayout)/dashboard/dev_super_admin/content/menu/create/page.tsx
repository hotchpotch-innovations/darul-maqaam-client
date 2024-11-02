import CreateMenuForm from "@/components/dashboard/dev_super_admin/content/menu/MenuCreateForm";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
import { Box } from "@mui/material";

const page = () => {
  return (
    <Box>
      <TitleDashboard title="Create Menu" />
      <CreateMenuForm />
    </Box>
  );
};

export default page;
