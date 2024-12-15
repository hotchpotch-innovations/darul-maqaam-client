import Title from "@/components/UI/Title";
import { Box } from "@mui/material";
import { GallerytData } from "../../../../public/data/GalleryData";
import GalleryDrawer from "@/components/UI/Gallery/GalleryDrawer";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import { MPS_Types } from "@/constants/options";
import CategoryDrawer from "@/components/UI/CategoryDrawer";

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

const GalleryPage = async () => {
  const backend_api = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const res = await fetch(
    `${backend_api}/content/config/common-category/public?type=${MPS_Types?.gallery}&sortBy=createdAt&sortOrder=asc`,
    {
      cache: "no-store",
    }
  );
  const { data: gallery_category_obj = {} } = await res.json();
  const categoryData = gallery_category_obj?.data || [];
  return (
    <>
      <Title title="gallery" />
      <Box bgcolor={"secondary.main"}>
        {/* <GalleryDrawer
          firstMenu="Bonna "
          drawerData={GallerytData}
          isGallery={true}
        /> */}
        <CategoryDrawer categoryData={categoryData} />
      </Box>
    </>
  );
};

export default GalleryPage;
