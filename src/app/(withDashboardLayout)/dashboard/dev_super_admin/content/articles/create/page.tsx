import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const CreateArticlePage = () => {
  const CreateArticleForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/article_utils/CreateArticleForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <Stack>
        <TitleDashboard title="Create Article" />
      </Stack>
      <Stack>
        <CreateArticleForm />
      </Stack>
    </Box>
  );
};

export default CreateArticlePage;
