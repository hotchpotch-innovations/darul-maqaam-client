import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const CreateBranchPage = () => {
  const CreateBranchForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/organization/branch-utils/CreateBranchForm"
      ),
    {
      ssr: false,
    }
  );

  return (
    <Box>
      <Stack>
        <TitleDashboard title="Create Branch" />
      </Stack>
      <Stack>
        <CreateBranchForm />
      </Stack>
    </Box>
  );
};

export default CreateBranchPage;
