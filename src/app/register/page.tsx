"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
// import loginImage from "../../../public/images/login-blue-logo.png";

import dynamic from "next/dynamic";

const RegisterPage = () => {
  const RegisterForm = dynamic(
    () => import("@/components/AuthenticationForms/RegisterForm"),
    {
      ssr: false,
    }
  );
  return (
    <Container>
      <title>CM | User Register</title>;
      <Stack
        gap={1}
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: "600px", width: "100%", boxShadow: "1" }} pt={4}>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Image
              src={"/images/login_logo_1.png"}
              alt="Login Logo Image "
              height={80}
              width={80}
              className="h-auto w-auto"
            />
            <Typography variant="h5" pt={2} pb={1}>
              Register Here
            </Typography>

            <RegisterForm />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
