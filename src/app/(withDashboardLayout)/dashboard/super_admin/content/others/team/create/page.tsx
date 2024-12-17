import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";

const CreateTeamMemberPage = () => {
  const CreateTeamMemberForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/others/team_utils/CreateTeamMemberForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Create Team Member" />
      </Stack>
      <Stack>
        <CreateTeamMemberForm />
      </Stack>
    </Box>
  );
};

export default CreateTeamMemberPage;
