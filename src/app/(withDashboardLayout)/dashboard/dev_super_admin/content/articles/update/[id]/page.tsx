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

  const ArticleImagesSection = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/article_utils/ArticleImagesSection"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Update Article" />
      <ArticleImagesSection id={id} />
      <UpdateArticleForm id={id} />
    </Box>
  );
};

export default UpdateArticlePage;
