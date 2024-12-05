import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import CreateDepartmentForm from "@/components/Dashboard/dev_super_admin/user/settings/department-utils/CreateDepartment";
import { Box } from "@mui/material";

const DepartmentCreatePage = () => {
  return (
    <Box>
      <TitleDashboard title="Create Department" />
      <CreateDepartmentForm />
    </Box>
  );
};

export default DepartmentCreatePage;
