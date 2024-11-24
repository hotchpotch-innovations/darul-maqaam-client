import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import ArticleTable from "@/components/Dashboard/dev_super_admin/contents/article_utils/ArticleTable";
import { Box } from "@mui/material";
import React from "react";

const ArticlesPage = () => {
  return (
    <Box>
      <TitleDashboard title="Articles Page" />
      <ArticleTable />
    </Box>
  );
};

export default ArticlesPage;
