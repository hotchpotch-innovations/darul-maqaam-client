import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import logo from "../../../../public/Darul Maqaam_Logo-01.png";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Link from "next/link";

const Footer = () => {
  return (
    <Box bgcolor={"#2a261f"} color={"white"} pt={12}>
      <Container>
        {/* Logo Section is Start */}

        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={12} md={6} lg={2}>
            <Image
              src={logo}
              alt="Website Logo Image"
              height={200}
              width={200}
            />
          </Grid>

          {/* Do you have questions? Section Is Start */}

          <Grid item xs={12} md={6} lg={3}>
            <Stack direction={"column"} gap={2}>
              <Typography variant="h5">
                Do you have questions? <br /> Call or visit us.
              </Typography>
              <Typography color={"#ff9f0d"} fontWeight={700} variant="h6">
                <span className="me-2 border-[#ff9f0d] border-2">
                  <LocalPhoneIcon />
                </span>
                +[88] 017XX XXX XXX
              </Typography>
              <Typography fontWeight={300}>
                5617 Glassford Street <br />
                New York, NY 10000, USA
              </Typography>
              <Typography
                className="border-b-[1px] pb-[2px] border-[#ff9f0d] w-3/5"
                fontWeight={300}
              >
                darul.maqaam@gmail.com
              </Typography>
            </Stack>
          </Grid>
          {/* Newsletter Section is Start */}
          <Grid item xs={12} md={6} lg={2}>
            <Stack direction={"column"} gap={2}>
              <Typography variant="h5">Newsletter.</Typography>
              <Typography className="text-yellow-500" fontWeight={300}>
                Get latest news & update
              </Typography>
              <form className="flex flex-col gap-4 text-black">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="px-2 py-4 text-xs border border-transparent focus:border-green-500 rounded-ss-2xl rounded-ee-2xl w-[230px] focus:outline-none focus:ring-0"
                />
                <input
                  type="submit"
                  value="SUBCRIBE"
                  className="px-2 py-4 text-white text-xs bg border border-transparent bg-yellow-500 focus:border-yellow-400 rounded-ss-2xl rounded-ee-2xl  w-[230px]"
                />
              </form>
            </Stack>
          </Grid>

          {/* Usefull Links Section is Start */}
          <Grid item xs={12} md={6} lg={2} className="md:text-end ">
            <Typography variant="h5">Connect With Us</Typography>
            <Stack direction={"column"} gap={2} mt={4}>
              <Link href={"/"}> Work with Us</Link>
              <Link href={"/"}> Who we are</Link>
              <Link href={"/"}> Resource </Link>
              <Link href={"/"}> Leatest Storise </Link>
              <Link href={"/"}> Financials </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <div className="flex flex-col justify-end w-full md:text-end">
              <Stack direction={"column"} gap={1}>
                <Typography variant="h5">Connect With Us</Typography>
                <Stack direction={"row"} className="md:justify-end" gap={2}>
                  <Typography>
                    <FacebookIcon />
                  </Typography>
                  <Typography>
                    <FacebookIcon />
                  </Typography>
                  <Typography>
                    <FacebookIcon />
                  </Typography>
                  <Typography>
                    <FacebookIcon />
                  </Typography>
                </Stack>
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Box bgcolor={"#24211b"} mt={12}>
        <Container>
          <Stack
            direction={{
              md: "row",
              sx: "column",
              lg: "row",
            }}
            justifyContent={"space-between"}
            py={5}
          >
            <Typography>
              © {new Date().getFullYear()} – <span>Darul Maqaam</span>. All
              rights reserved.
            </Typography>
            <Typography>Developed by Hotchpotch Innovations Ltd.</Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
