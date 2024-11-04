import SubMenuTable from "@/components/Dashboard/dev_super_admin/contents/submenus/SubMenuTable";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";

const SubmenuPage = () => {
  return (
    <Box>
      <TitleDashboard title="Submenu Page" />
      <SubMenuTable />
    </Box>
  );
};

export default SubmenuPage;
