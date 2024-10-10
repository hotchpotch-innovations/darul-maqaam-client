"use client";
import UpdateAdminFrom from "@/components/dashboard/dev_super_admin/user/admin/UpdateAdminFrom";
import TitleDashboard from "@/components/dashboard/TitleDashboard";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";

const UpdateAdminPage = ({}) => {
  const { id }: { id: string } = useParams();
  console.log(id);

  return (
    <Box>
      <TitleDashboard title="Update Admin" />
      <UpdateAdminFrom adminId={id} />
    </Box>
  );
};

export default UpdateAdminPage;
