import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import WebpageTable from "@/components/Dashboard/dev_super_admin/contents/webpage_utils/WebpageTable";
import { Box } from "@mui/material";

const WebPage = () => {
  return (
    <Box>
      <TitleDashboard title="Web Page List" />
      <WebpageTable />
    </Box>
  );
};

export default WebPage;
