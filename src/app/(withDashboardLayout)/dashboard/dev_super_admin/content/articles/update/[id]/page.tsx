import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

type TProps = {
  params: Record<string, any>;
};

const UpdateArticlePage = async ({ params }: TProps) => {
  const id = params?.id;

  const UpdateArticleForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/article_utils/UpdateArticleForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Update Article" />
      <UpdateArticleForm id={id} />
    </Box>
  );
};

export default UpdateArticlePage;
