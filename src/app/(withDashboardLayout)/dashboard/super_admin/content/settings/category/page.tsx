import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const CategoryPage = () => {
  const CommonCategoryTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/settings/category_utils/CommonCategoryTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Category List" />
      <CommonCategoryTable />
    </Box>
  );
};

export default CategoryPage;
