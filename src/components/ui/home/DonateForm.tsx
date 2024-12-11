import { Box, Button, Container } from "@mui/material";
import InputBox from "../VolunteerRegistation/InputBox";

const DonateForm = () => {
  return (
    <Box
      bgcolor={"secondary.main"}
      py={4}
      sx={{
        borderTop: "1px solid green",
      }}
    >
      <Container
        sx={{
          bgcolor: "white ",
          p: "20px 40px",
          borderRadius: "3px",
        }}
      >
        <form className="flex flex-col md:flex-row lg:justify-between gap-3 md:gap-1 lg:w-9/12">
          <InputBox name="found" placeholder="Donation Found" type="text" />
          <InputBox name="found" placeholder="Phone / Email" type="text" />
          <InputBox name="found" placeholder="Donation Amount" type="text" />
          <Button className="w-[300px]">Donate</Button>
        </form>
      </Container>
    </Box>
  );
};

export default DonateForm;
