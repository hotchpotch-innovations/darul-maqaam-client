import CreateEmployeeForm from "@/components/Dashboard/dev_super_admin/user/employee-utils/CreateEmployeeForm";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";

const CreateEmployeePage = () => {
  return (
    <Box>
      <TitleDashboard title="Create Employee" />
      <CreateEmployeeForm />
    </Box>
  );
};

export default CreateEmployeePage;
