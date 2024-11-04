import ConutryTable from "@/components/Dashboard/dev_super_admin/settings/address/country-utils/CountryTable";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box, Typography } from "@mui/material";

const CountryPage = () => {
  return (
    <Box>
      <TitleDashboard title="Country Settings" />
      <ConutryTable />
    </Box>
  );
};

export default CountryPage;
