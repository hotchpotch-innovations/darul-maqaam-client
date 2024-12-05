import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import CreateDistrictForm from "@/components/Dashboard/dev_super_admin/user/settings/address/district-utils/CreateDistrictForm";
import { Box } from "@mui/material";

const DistrictCreatePage = () => {
  return (
    <Box>
      <TitleDashboard title="Create District" />
      <CreateDistrictForm />
    </Box>
  );
};

export default DistrictCreatePage;
