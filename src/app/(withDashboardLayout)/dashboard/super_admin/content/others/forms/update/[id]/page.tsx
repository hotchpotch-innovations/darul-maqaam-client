import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

type TProps = {
  params: Record<string, any>;
};

const UpdateFormsPage = ({ params }: TProps) => {
  const id = params?.id;

  const UpdateFormsForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/others/forms_utils/UpdateFormsForm"
      ),
    {
      ssr: false,
    }
  );

  return (
    <Box>
      <TitleDashboard title="Update Form & Template" />
      <UpdateFormsForm id={id} />
    </Box>
  );
};

export default UpdateFormsPage;
