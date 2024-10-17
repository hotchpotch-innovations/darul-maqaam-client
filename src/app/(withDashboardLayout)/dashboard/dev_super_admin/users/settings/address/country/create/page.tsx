import CreateCountryForm from "@/components/dashboard/dev_super_admin/settings/address/country/CreateCountryForm";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
