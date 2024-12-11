import { Box, Stack, Typography } from "@mui/material";

const ContactDeatils = () => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        p={4}
        bgcolor={"white"}
        sx={{
          width: "100%",
          border: "0.1px solid #dee2e6",
        }}
      >
        <Stack direction={"column"} gap={2}>
          <Typography variant="h5">Contact Details</Typography>
          <Box>
            <Typography color={"warning.main"} variant="h6" pb={1}>
              Address
            </Typography>
            <Typography color={"GrayText"}>
              Tropical Alauddin Tower <br /> House No.- 32/C(7th Floor,
              Flat:7E), <br />
              Road - 02, Sector - 03, Uttara,
              <br /> Dhaka-1230, Bangladesh
            </Typography>
          </Box>
          <Box>
            <Typography color={"warning.main"} variant="h6" pb={1}>
              Mobile:
            </Typography>
            <Typography color={"GrayText"}>+88 017XX XXX XXX, +88 017XX XXX XXX</Typography>
          </Box>
          <Box>
            <Typography color={"warning.main"} variant="h6" pb={1}>
              Email:
            </Typography>
            <Typography color={"GrayText"}>darul.maquaam@gmail.com</Typography>
          </Box>
        </Stack>
      </Box>
      <Box
        bgcolor={"secondary.main"}
        sx={{
          width: "100%",
          border: "0.1px solid #dee2e6",
          mt: "20px",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.0445564798056!2d90.39915578641669!3d23.86432642965831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4241b642ee1%3A0x4a890c0739a96c44!2z4Kaf4KeN4Kaw4Kaq4Ka_4KaV4KeN4Kav4Ka-4KayIOCmhuCmsuCmvuCmieCmpuCnjeCmpuCmv-CmqCDgpp_gpr7gppPgpq_gprzgpr7gprAsIFBsb3QgTm8uIDMyL0MsIOCmuOCnnOCmlS3gp6gsIOCmouCmvuCmleCmviAxMjMw!5e0!3m2!1sbn!2sbd!4v1719981490772!5m2!1sbn!2sbd"
          style={{ border: 0 }}
          width="555"
          className="w-full"
          height="450"
          allowFullScreen
          loading="lazy"
        />
      </Box>
    </Box>
  );
};

export default ContactDeatils;
