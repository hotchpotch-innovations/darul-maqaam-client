import Title from "@/components/UI/titles/Title";
import VideoCard from "@/components/UI/VideoCard";
import { Article_Types } from "@/constants/options";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import { Box, Container, Grid } from "@mui/material";

// Dynamic metadata generation function
export async function generateMetadata() {
  const page_slug = webpageSlugs?.video;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    slug: page_slug,
  });

  return result;
}

const VideoPage = async () => {
  const backend_api = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const res = await fetch(
    `${backend_api}/content/article/public?type=${Article_Types?.video}&sortBy=createdAt&sortOrder=asc&isPublished=true`,
    {
      cache: "no-store",
    }
  );
  const { data: video_obj = {} } = await res.json();
  const video_data = video_obj?.data || [];
  return (
    <Box bgcolor={"secondary.main"}>
      <Title title="videos" />
      <Container
        sx={{
          padding: "34px 0px",
        }}
      >
        <Grid
          container
          columnSpacing={2}
          boxShadow={2}
          borderRadius={2}
          justifyContent="center"
          alignItems="center"
          paddingRight={2}
          paddingY={4}
          bgcolor={"white"}
        >
          {video_data.map((item: Record<string, any>) => (
            <VideoCard key={item?.id} data={item} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default VideoPage;
