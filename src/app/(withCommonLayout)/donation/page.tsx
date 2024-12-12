import { Box, Container, Grid, Typography } from "@mui/material";
import { makeChange } from "../../../../public/HomePageData/makeChange";
import { TMakeChange } from "../Types";
import MakeChangeCard from "@/components/UI/MakeChangeCard";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";

// Dynamic metadata generation function
export async function generateMetadata() {
  const page_slug = webpageSlugs?.donation;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    slug: page_slug,
  });

  return result;
}

const DonationPage = () => {
  const data = makeChange;
  return (
    <Box bgcolor={"secondary.main"}>
      <Container
        sx={{
          paddingY: "50px",
        }}
      >
        <Typography variant="h4" className="text-center pb-8">
          Together Let’s make a change
        </Typography>
        <Grid className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {data?.map((item: TMakeChange) => (
            <MakeChangeCard key={item._id} data={item} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DonationPage;
