import CreateDepartmentForm from "@/components/dashboard/dev_super_admin/settings/department/CreateDepartment";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
