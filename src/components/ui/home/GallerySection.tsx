import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { gallerySectionDalta } from "../../../../public/HomePageData/gallerySectionData";
import GalleryImage from "./GalleryImage";

const GallerySection = () => {
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
            {gallerySectionDalta?.map((item) => {
              return <GalleryImage key={item._id} data={item} />;
            })}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default GallerySection;
