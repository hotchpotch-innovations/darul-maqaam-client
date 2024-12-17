import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const ArticlesPage = () => {
  const ArticleTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/article_utils/ArticleTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Articles Page" />
      <ArticleTable />
    </Box>
  );
};

export default ArticlesPage;
