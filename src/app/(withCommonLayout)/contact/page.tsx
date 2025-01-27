import ContactDetails from "@/components/UI/Contact/ContactDetails";
import ContactForm from "@/components/UI/Contact/ContactForm";
import Title from "@/components/UI/Title";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import { Box, Container } from "@mui/material";

// Dynamic metadata generation function
export async function generateMetadata() {
  const page_slug = webpageSlugs?.contact;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    slug: page_slug,
  });

  return result;
}

const ContactPage = async () => {
  return (
    <Box>
      <Title title="contact" />
      <Box
        sx={{
          py: {
            xs: "60px",
            sm: "90px",
            md: "80px",
            lg: "100px",
          },
        }}
      >
        <Container
          sx={{
            display: "flex",
            gap: {
              xs: "60px",
              sm: "90px",
              md: "80px",
              lg: "100px",
            },
            justifyItems: "center",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            },
          }}
        >
          <ContactForm />
          <ContactDetails />
        </Container>
      </Box>
    </Box>
  );
};

export default ContactPage;
