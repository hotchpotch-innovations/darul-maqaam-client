import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack, Typography } from "@mui/material";

type TProps = {
  params: Record<string, any>;
};

const MPSDetailsPage = async ({ params }: TProps) => {
  const id = params?.id;
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Page Section (multiple) Details" />
      </Stack>
      <Stack>
        <Typography>ObjectId : {id}</Typography>
      </Stack>
    </Box>
  );
};

export default MPSDetailsPage;
