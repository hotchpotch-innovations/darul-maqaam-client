"use client";

import UpdateClientForm from "@/components/dashboard/dev_super_admin/user/client/UpdateClientForm";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
