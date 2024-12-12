import Title from "@/components/UI/Title";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import { Box, Container, Grid, Typography } from "@mui/material";

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

const VideoPage = () => {
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
          {Array.from({ length: 24 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} paddingY={2}>
              <Box>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/tgbNymZ7vqY"
                  style={{ border: "none", borderRadius: "6px" }} // Ensures iframe takes full width without borders
                ></iframe>
                <Typography variant="h6" fontSize={18} textAlign={"center"}>
                  Video Title here
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default VideoPage;
