import NewsCard from "@/components/UI/NewsCard";
import Title from "@/components/UI/titles/Title";
import { Article_Types } from "@/constants/options";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import { Box, Container, Grid } from "@mui/material";

// Dynamic metadata generation function
export async function generateMetadata() {
  const page_slug = webpageSlugs?.news;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    slug: page_slug,
  });

  return result;
}

const NewsPage = async () => {
  const backend_api = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const res = await fetch(
    `${backend_api}/content/article/public?type=${Article_Types?.news}&sortBy=createdAt&sortOrder=asc&isPublished=true`,
    {
      cache: "no-store",
    }
  );
  const { data: news_obj = {} } = await res.json();
  const news_data = news_obj?.data || [];
  return (
    <Box bgcolor={"secondary.main"}>
      <Title title="news" />
      <Container
        sx={{
          padding: "34px 10px",
        }}
      >
        <Grid
          container
          columnSpacing={2}
          borderRadius={2}
          justifyContent="center"
          alignItems="center"
        >
          {news_data.map((item: Record<string, any>) => (
            <NewsCard key={item?.id} data={item} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default NewsPage;
