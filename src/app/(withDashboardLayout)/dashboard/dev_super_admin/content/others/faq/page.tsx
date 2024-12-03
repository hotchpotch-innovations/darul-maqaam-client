import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import FAQTable from "@/components/Dashboard/dev_super_admin/contents/others/faq_utils/FAQTable";
import { Box } from "@mui/material";
import React from "react";

const FAQPage = () => {
  return (
    <Box>
      <TitleDashboard title="FAQ List" />
      <FAQTable />
    </Box>
  );
};

export default FAQPage;
