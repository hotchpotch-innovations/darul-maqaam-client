import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const FAQPage = () => {
  const FAQTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/others/faq_utils/FAQTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="FAQ List" />
      <FAQTable />
    </Box>
  );
};

export default FAQPage;
