"use client";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import UpdateAdminFrom from "@/components/Dashboard/super_admin/user/admin-utils/UpdateAdminFrom";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";

const UpdateAdminPage = ({}) => {
  const { id }: { id: string } = useParams();

  return (
    <Box>
      <TitleDashboard title="Update Admin" />
      <UpdateAdminFrom adminId={id} />
    </Box>
  );
};

export default UpdateAdminPage;
