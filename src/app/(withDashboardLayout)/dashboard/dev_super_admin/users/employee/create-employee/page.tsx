import CreateEmployeeForm from "@/components/dashboard/dev_super_admin/user/employee/CreateEmployeeForm";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
import { Box } from "@mui/material";

const page = () => {
  return (
    <Box>
      <TitleDashboard title="Create Employee" />
      <CreateEmployeeForm />
    </Box>
  );
};

export default page;
