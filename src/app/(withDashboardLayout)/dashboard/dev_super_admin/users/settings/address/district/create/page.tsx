import CreateDistrictForm from "@/components/dashboard/dev_super_admin/settings/address/district/CreateDistrictForm";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
