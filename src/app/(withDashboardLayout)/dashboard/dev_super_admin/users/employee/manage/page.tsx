import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const EmployeeManagePage = () => {
  const EmployeeTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/user/employee-utils/EmployeeTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Manage Employee" />
      <EmployeeTable />
    </Box>
  );
};

export default EmployeeManagePage;
