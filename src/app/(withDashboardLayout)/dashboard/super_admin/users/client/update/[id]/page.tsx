"use client";

import UpdateClientForm from "@/components/Dashboard/dev_super_admin/user/client-utils/UpdateClientForm";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";

const UpdateClient = () => {
  const { id }: { id: string } = useParams();
  return (
    <Box>
      <TitleDashboard title="Update Client" />
      <UpdateClientForm client_id={id} />
    </Box>
  );
};

export default UpdateClient;
