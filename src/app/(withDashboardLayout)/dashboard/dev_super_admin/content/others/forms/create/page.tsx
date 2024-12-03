import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const FormsCreatePage = () => {
  const CreateFormsForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/others/forms_utils/CreateFormsForm"
      ),
    {
      ssr: false,
    }
  );

  return (
    <Box>
      <Stack>
        <TitleDashboard title="Create Forms & Template" />
      </Stack>
      <Stack>
        <CreateFormsForm />
      </Stack>
    </Box>
  );
};

export default FormsCreatePage;
