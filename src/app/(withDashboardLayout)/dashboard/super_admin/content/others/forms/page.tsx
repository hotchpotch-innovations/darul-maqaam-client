import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const FormsAndTemplatePage = () => {
  const FormsTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/others/forms_utils/FormsTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Forms List" />
      <FormsTable />
    </Box>
  );
};

export default FormsAndTemplatePage;
