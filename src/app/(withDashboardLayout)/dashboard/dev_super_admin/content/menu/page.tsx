import MenuTable from "@/components/dashboard/dev_super_admin/content/menu/MenuTable";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
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
