import MenuTable from "@/components/Dashboard/dev_super_admin/contents/menus/MenuTable";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";

const MenuListPage = () => {
  return (
    <Box>
      <TitleDashboard title="Menu List" />
      <MenuTable />
    </Box>
  );
};

export default MenuListPage;
