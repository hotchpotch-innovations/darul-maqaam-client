import CreateDepartmentForm from "@/components/Dashboard/dev_super_admin/settings/department-utils/CreateDepartment";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
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
