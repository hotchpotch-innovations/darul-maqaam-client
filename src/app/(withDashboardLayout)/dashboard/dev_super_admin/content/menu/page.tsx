import MenuTable from "@/components/Dashboard/dev_super_admin/contents/menus/MenuTable";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";

const page = () => {
  return (
    <Box>
      <TitleDashboard title="Menu Page" />
      <MenuTable />
    </Box>
  );
};

export default page;
