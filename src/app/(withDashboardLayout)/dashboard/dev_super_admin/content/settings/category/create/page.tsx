import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const CreateFaqPage = () => {
  const CreateCommonCategoryForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/settings/category_utils/CreateCommonCategoryForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Create Category" />
      </Stack>
      <Stack>
        <CreateCommonCategoryForm />
      </Stack>
    </Box>
  );
};

export default CreateFaqPage;
