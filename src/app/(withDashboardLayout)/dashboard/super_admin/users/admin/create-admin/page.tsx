import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const CreateAdminPage = () => {
  const CreateAdminFrom = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/user/admin-utils/CreateAdminFrom"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Create Admin" />
      <CreateAdminFrom />
    </Box>
  );
};

export default CreateAdminPage;
