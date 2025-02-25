import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const DesignationCreatePage = () => {
  const CreateDesignation = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/user/settings/designation-uitls/CreateDesignation"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Create Designation" />
      <CreateDesignation />
    </Box>
  );
};

export default DesignationCreatePage;
