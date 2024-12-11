import Title from "@/components/UI/Title";
import { Box } from "@mui/material";
import { GallerytData } from "../../../../public/data/GalleryData";
import GalleryDrawer from "@/components/UI/Gallery/GalleryDrawer";

const GalleryPage = () => {
  return (
    <>
      <Title title="gallery" />
      <Box bgcolor={"secondary.main"}>
        <GalleryDrawer
          firstMenu="Bonna "
          drawerData={GallerytData}
          isGallery={true}
        />
      </Box>
    </>
  );
};

export default GalleryPage;
