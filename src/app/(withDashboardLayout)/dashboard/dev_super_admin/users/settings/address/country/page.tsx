import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import CountryTable from "@/components/Dashboard/dev_super_admin/settings/address/country-utils/CountryTable";
import { Box } from "@mui/material";

const CountryPage = () => {
  return (
    <Box>
      <TitleDashboard title="Country Settings" />
      <CountryTable />
    </Box>
  );
};

export default CountryPage;
