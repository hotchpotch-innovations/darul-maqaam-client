import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";

const CreateAuthorityPage = () => {
  const CreateAuthorityForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/settings/authority_utils/CreateAuthorityForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Create Authority" />
      </Stack>
      <Stack>
        <CreateAuthorityForm />
      </Stack>
    </Box>
  );
};

export default CreateAuthorityPage;
