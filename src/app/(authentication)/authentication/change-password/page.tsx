import { Box, Container, Stack, Typography } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
// import ChangePasswordForm from "@/components/AuthenticationForms/ChangePasswordForm";
import dynamic from "next/dynamic";

const ChangePasswordPage = () => {
  const ChangePasswordForm = dynamic(
    () => import("@/components/AuthenticationForms/ChangePasswordForm"),
    {
      ssr: false,
    }
  );
  return (
    <Container>
      <title>CM | Change Password</title>
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
                  width: 100,
                  height: 100,
                },
              }}
            >
              <KeyIcon sx={{ color: "primary.main" }} />
            </Box>
            <Typography variant="h5" pt={2} pb={1}>
              Change Password
            </Typography>

            <ChangePasswordForm />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ChangePasswordPage;
