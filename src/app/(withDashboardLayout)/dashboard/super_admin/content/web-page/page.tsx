import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const WebPage = () => {
  const WebpageTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/webpage_utils/WebpageTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Web Page List" />
      <WebpageTable />
    </Box>
  );
};

export default WebPage;
