import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const MenuListPage = () => {
  const MenuTable = dynamic(
    () => import("@/components/Dashboard/super_admin/contents/menus/MenuTable"),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Menu List" />
      <MenuTable />
    </Box>
  );
};

export default MenuListPage;
