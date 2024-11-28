import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

type TProps = {
  params: Record<string, any>;
};
const UpdatePageSectionPage = async ({ params }: TProps) => {
  const id = params?.id;
  const UpdateSinglePageSectionForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/page_section/single_utils/UpdateSinglePageSectionForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Update Page Section (single)" />
      <UpdateSinglePageSectionForm id={id} />
    </Box>
  );
};

export default UpdatePageSectionPage;
