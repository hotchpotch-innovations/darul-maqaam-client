import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import CreateCountryForm from "@/components/Dashboard/dev_super_admin/user/settings/address/country-utils/CreateCountryForm";
import { Box } from "@mui/material";

const CreateCountryPage = () => {
  return (
    <Box>
      <TitleDashboard title="Create Country" />
      <CreateCountryForm />
    </Box>
  );
};

export default CreateCountryPage;
