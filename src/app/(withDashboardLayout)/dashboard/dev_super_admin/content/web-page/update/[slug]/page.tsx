import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
type TProps = {
  params: Record<string, any>;
};
const UpdateWebpage = async ({ params }: TProps) => {
  const slug = params?.slug;

  const WebpageImageSection = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/webpage_utils/WebpageImageSection"
      ),
    {
      ssr: false,
    }
  );
  const UpdateWebpageForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/webpage_utils/UpdateWebpageForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Update Webpage" />
      </Stack>
      <Stack>
        <WebpageImageSection slug={slug} />
      </Stack>
      <Stack>
        <UpdateWebpageForm slug={slug} />
      </Stack>
    </Box>
  );
};

export default UpdateWebpage;
