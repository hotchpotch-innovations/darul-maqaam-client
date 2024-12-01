import { Box, Container, Stack, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import dynamic from "next/dynamic";

const ForgotPassword = () => {
  const ForgotPasswordForm = dynamic(
    () => import("@/components/AuthenticationForms/ForgotPasswordForm"),
    {
      ssr: false,
    }
  );
  return (
    <Container>
      <title>CM | Forgot Password</title>
      <Stack
        gap={1}
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: "500px", width: "100%", boxShadow: "1" }} pt={4}>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                "& svg": {
                  width: 90,
                  height: 90,
                },
              }}
            >
              <LockIcon sx={{ color: "primary.main" }} />
            </Box>
            <Typography variant="h4" pt={2} pb={4}>
              Forgot Password
            </Typography>
            <ForgotPasswordForm />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ForgotPassword;
