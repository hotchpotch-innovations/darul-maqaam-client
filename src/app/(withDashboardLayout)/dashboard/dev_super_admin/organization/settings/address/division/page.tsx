import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import DivisionTable from "@/components/Dashboard/dev_super_admin/user/settings/address/division-utils/DivisionTable";
import { Box } from "@mui/material";

const DivisionPage = () => {
  return (
    <Box>
      <TitleDashboard title="Divisition Settings" />
      <DivisionTable />
    </Box>
  );
};

export default DivisionPage;
