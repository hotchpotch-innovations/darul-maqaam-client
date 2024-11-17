import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import AdminTable from "@/components/Dashboard/dev_super_admin/user/admin-utils/AdminTable";
import { Box } from "@mui/material";

const ManagePage = () => {
  return (
    <Box>
      <TitleDashboard title="Admins List" />
      <AdminTable />
    </Box>
  );
};

export default ManagePage;
