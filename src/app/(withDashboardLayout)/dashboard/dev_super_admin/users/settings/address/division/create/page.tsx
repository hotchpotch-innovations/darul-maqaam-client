import CreateDivisionForm from "@/components/dashboard/dev_super_admin/settings/address/division/CreateDivisionForm";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
import { Box } from "@mui/material";

const CreateDivisionPage = () => {
  return (
    <Box>
      <TitleDashboard title="Create Division" />
      <CreateDivisionForm />
    </Box>
  );
};

export default CreateDivisionPage;
