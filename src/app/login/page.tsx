import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
// import loginImage from "/public/images/login-blue-logo.png";
import dynamic from "next/dynamic";

const LoginPage = () => {
  const LoginForm = dynamic(
    () => import("@/components/AuthenticationForms/LoginForm"),
    {
      ssr: false,
    }
  );

  return (
    <Container>
      <title>CM | User Login</title>
      <Stack
        gap={1}
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "480px",
            width: "100%",
            boxShadow: "1",
          }}
          pt={4}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Image
              style={{ marginTop: "8px" }}
              src={"/images/login_logo_1.png"}
              alt="Login Logo Image "
              height={100}
              width={100}
            />
            <Typography variant="h5" pt={2} pb={1}>
              Login
            </Typography>

            <LoginForm />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
