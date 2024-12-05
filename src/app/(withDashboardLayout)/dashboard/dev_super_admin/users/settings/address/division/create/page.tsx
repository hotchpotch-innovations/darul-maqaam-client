import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import CreateDivisionForm from "@/components/Dashboard/dev_super_admin/user/settings/address/division-utils/CreateDivisionForm";
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
