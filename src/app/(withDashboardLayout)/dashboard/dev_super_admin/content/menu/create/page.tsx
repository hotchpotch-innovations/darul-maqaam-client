
import CreateMenuForm from "@/components/Dashboard/dev_super_admin/contents/menus/MenuCreateForm";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";

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
