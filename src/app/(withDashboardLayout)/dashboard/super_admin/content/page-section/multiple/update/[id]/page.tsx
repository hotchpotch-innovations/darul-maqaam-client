import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

type TProps = {
  params: Record<string, any>;
};

const MPSUpdatePage = async ({ params }: TProps) => {
  const id = params?.id;
  const UpdateMultiplePageSectionForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/page_section/multiple_utils/UpdateMultiplePageSectionForm"
      ),
    {
      ssr: false,
    }
  );
  const MultipleFilesSection = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/page_section/multiple_utils/MultipleFilesSection"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Update Page Section (multiple)" />
      <MultipleFilesSection id={id} />
      <UpdateMultiplePageSectionForm id={id} />
    </Box>
  );
};

export default MPSUpdatePage;
