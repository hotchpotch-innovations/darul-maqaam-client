import Title from "@/components/UI/Title";
import AddressInformation from "@/components/UI/VolunteerRegistation/AddressInformation";
import PersonalInformation from "@/components/UI/VolunteerRegistation/PersonalInformation";
import { Box, Container } from "@mui/material";

const page = () => {
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

export default page;
