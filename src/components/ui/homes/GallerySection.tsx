import { Box, Container, Grid, Typography } from "@mui/material";
import GalleryImage from "./GalleryImage";
import { MPS_Types } from "@/constants/options";

const GallerySection = async () => {
  const backend_api = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const res = await fetch(
    `${backend_api}/content/multiple-page-section/public?type=${MPS_Types?.gallery}&sortBy=createdAt&sortOrder=asc&page=1&limit=9&isPublished=true`,
    {
      cache: "no-store",
    }
  );
  const { data: gallery_obj = {} } = await res.json();
  const galleryData = gallery_obj?.data || [];
  return (
    <Box
      sx={{
        py: "40px",
        bgcolor: "#ced4da",
      }}
    >
      <Box>
        <Typography textAlign={"center"} variant="h4" color={"black"} pb={4}>
          Gallery
        </Typography>
        <Container>
          <Grid container spacing={"3px"} width={"100%"}>
            {galleryData?.map((item: Record<string, any>) => {
              return <GalleryImage key={item?.id} data={item} />;
            })}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default GallerySection;
