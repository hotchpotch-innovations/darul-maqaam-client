import ConutryTable from "@/components/dashboard/dev_super_admin/settings/address/country/CountryTable";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
