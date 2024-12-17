import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";

import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";

const CreateMenuPage = () => {
  const CreateMenuForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/menus/MenuCreateForm"
      ),
    {
      ssr: false,
    }
  );
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
