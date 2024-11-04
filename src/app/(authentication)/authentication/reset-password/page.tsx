import { Box, Container, Stack, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import dynamic from "next/dynamic";

const ResetPasswordPage = () => {
  const ResetPasswordForm = dynamic(
    () => import("@/components/AuthenticationForms/ResetPasswordForm"),
    {
      ssr: false,
    }
  );

  return (
    <Container>
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
            <Box
              sx={{
                "& svg": {
                  width: 90,
                  height: 90,
                },
              }}
            >
              <LockOpenIcon sx={{ color: "primary.main" }} />
            </Box>
            <Typography variant="h5" pt={2} pb={1}>
              Reset Password
            </Typography>
            <ResetPasswordForm />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ResetPasswordPage;
