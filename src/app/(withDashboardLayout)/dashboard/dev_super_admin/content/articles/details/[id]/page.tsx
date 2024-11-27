import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack, Typography } from "@mui/material";

type TProps = {
  params: Record<string, any>;
};

const ArticleDetailsPage = async ({ params }: TProps) => {
  const id = params?.id;
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Page Section (multiple) Details" />
      </Stack>
      <Stack>
        <Typography>Article Id : {id}</Typography>
      </Stack>
    </Box>
  );
};

export default ArticleDetailsPage;
