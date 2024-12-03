import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const CreateFaqPage = () => {
  const CreateFAQForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/others/faq_utils/CreateFAQForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Create FAQ" />
      </Stack>
      <Stack>
        <CreateFAQForm />
      </Stack>
    </Box>
  );
};

export default CreateFaqPage;
