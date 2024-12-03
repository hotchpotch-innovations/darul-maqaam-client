import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import CommonCategoryTable from "@/components/Dashboard/dev_super_admin/contents/settings/category_utils/CommonCategoryTable";
import { Box } from "@mui/material";
import React from "react";

const CategoryPage = () => {
  return (
    <Box>
      <TitleDashboard title="Category List" />
      <CommonCategoryTable />
    </Box>
  );
};

export default CategoryPage;
