import CreateDivisionForm from "@/components/Dashboard/dev_super_admin/settings/address/division-utils/CreateDivisionForm";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
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
