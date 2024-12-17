import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

type TProps = {
  params: Record<string, any>;
};
const UpdateBranchPage = ({ params }: TProps) => {
  const id = params?.id;
  const UpdateBranchForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/organization/branch-utils/UpdateBranchForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Update Branch" />
      <UpdateBranchForm id={id} />
    </Box>
  );
};

export default UpdateBranchPage;
