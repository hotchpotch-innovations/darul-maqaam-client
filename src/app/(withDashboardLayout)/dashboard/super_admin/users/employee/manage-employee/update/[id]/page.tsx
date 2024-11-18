"use client";

import UpdateEmployeeForm from "@/components/Dashboard/dev_super_admin/user/employee-utils/UpdateEmployeeForm";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";

const UpdateEmployee = () => {
  const { id }: { id: string } = useParams();
  console.log(id);
  return (
    <Box>
      <TitleDashboard title="Update Employee" />
      <UpdateEmployeeForm employee_id={id} />
    </Box>
  );
};

export default UpdateEmployee;
