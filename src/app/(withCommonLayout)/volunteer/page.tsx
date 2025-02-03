import Title from "@/components/UI/titles/Title";
import AddressInformation from "@/components/UI/VolunteerRegistation/AddressInformation";
import PersonalInformation from "@/components/UI/VolunteerRegistation/PersonalInformation";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import { Box, Container } from "@mui/material";

// Dynamic metadata generation function
export async function generateMetadata() {
  const page_slug = webpageSlugs?.volunteer;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    slug: page_slug,
  });

  return result;
}

const VolunteerRegistration = () => {
  return (
    <Box>
      <Title title="volunteer registration" />
      <Box bgcolor={"secondary.main"} py={4}>
        <Container
          sx={{
            background: "white",
            padding: "20px",
            border: "1px solid #dee2e6",
          }}
        >
          <form className="md:flex gap-8">
            <PersonalInformation />
            <AddressInformation />
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default VolunteerRegistration;
