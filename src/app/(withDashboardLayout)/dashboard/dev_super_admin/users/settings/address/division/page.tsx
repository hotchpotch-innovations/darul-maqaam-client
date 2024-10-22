import DivisionTable from "@/components/dashboard/dev_super_admin/settings/address/division/DivisionTable";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
