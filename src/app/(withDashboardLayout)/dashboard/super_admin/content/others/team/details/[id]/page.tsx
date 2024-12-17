import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack, Typography } from "@mui/material";

type TProps = {
  params: Record<string, any>;
};

const TeamDetailsPage = async ({ params }: TProps) => {
      const id = params?.id;
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Team Member Details" />
      </Stack>
      <Stack>
        <Typography>Member Id : {id}</Typography>
      </Stack>
    </Box>
  );
};

export default TeamDetailsPage;
