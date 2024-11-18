import DivisionTable from "@/components/Dashboard/dev_super_admin/settings/address/division-utils/DivisionTable";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
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
