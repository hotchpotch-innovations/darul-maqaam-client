import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const CreateEmployeePage = () => {
  const CreateEmployeeForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/user/employee-utils/CreateEmployeeForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Create Employee" />
      <CreateEmployeeForm />
    </Box>
  );
};

export default CreateEmployeePage;
