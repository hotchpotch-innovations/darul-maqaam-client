import ContactDeatils from "@/components/UI/Contact/ContactDeatils";
import ContactForm from "@/components/UI/Contact/ContactForm";
import Title from "@/components/UI/Title";
import { Box, Container } from "@mui/material";

const ContactPage = () => {
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
          <ContactDeatils />
        </Container>
      </Box>
    </Box>
  );
};

export default ContactPage;
