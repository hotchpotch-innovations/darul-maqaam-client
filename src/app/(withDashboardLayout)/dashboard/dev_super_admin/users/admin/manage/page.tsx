import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const AdminManagePage = () => {
  const AdminTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/user/admin-utils/AdminTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Admins List" />
      <AdminTable />
    </Box>
  );
};

export default AdminManagePage;
