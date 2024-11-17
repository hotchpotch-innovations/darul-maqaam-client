"use client";

import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import UpdateEmployeeForm from "@/components/Dashboard/dev_super_admin/user/employee-utils/UpdateEmployeeForm";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";

const UpdateEmployee = () => {
  const { id }: { id: string } = useParams();
  return (
    <Box>
      <TitleDashboard title="Update Employee" />
      <UpdateEmployeeForm employee_id={id} />
    </Box>
  );
};

export default UpdateEmployee;
