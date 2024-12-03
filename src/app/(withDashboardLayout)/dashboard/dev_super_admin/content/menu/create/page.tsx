import CreateMenuForm from "@/components/Dashboard/dev_super_admin/contents/menus/MenuCreateForm";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";

import { Box, Stack } from "@mui/material";

const CreateMenuPage = () => {
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Create Menu" />
      </Stack>
      <Stack>
        <CreateMenuForm />
      </Stack>
    </Box>
  );
};

export default CreateMenuPage;
