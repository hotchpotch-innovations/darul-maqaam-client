import Title from "@/components/UI/Title";
import { Box } from "@mui/material";
import { GallerytData } from "../../../../public/data/GalleryData";
import GalleryDrawer from "@/components/UI/Gallery/GalleryDrawer";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";

// Dynamic metadata generation function
export async function generateMetadata() {
  const page_slug = webpageSlugs?.gallery;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    slug: page_slug,
  });

  return result;
}

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
