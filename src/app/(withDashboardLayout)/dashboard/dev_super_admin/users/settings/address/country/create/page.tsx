import CreateCountryForm from "@/components/Dashboard/dev_super_admin/settings/address/country-utils/CreateCountryForm";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
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
