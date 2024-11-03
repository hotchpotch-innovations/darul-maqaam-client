"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { z } from "zod";
import { useChangePasswordMutation } from "@/redux/api/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import KeyIcon from "@mui/icons-material/Key";
import { logOutUser } from "@/services/actions/logoutUser";
import { FieldValues, SubmitHandler } from "react-hook-form";

const validationSchema = z.object({
  oldPassword: z.string().min(6, "Please enter a valid password"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const ChangePasswordPage = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();

  const handleChangePassword: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await changePassword(values).unwrap();
      toast.success(res?.message, { id: toastId, duration: 5000 });
      logOutUser();
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.message, { id: toastId, duration: 5000 });
      console.error("Failed to change password:", err);
    }
  };

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

            <Box
              sx={{
                width: "100%",
                padding: "10px 20px",
              }}
            >
              <CMForm
                onSubmit={handleChangePassword}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  oldPassword: "",
                  newPassword: "",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <CMInput
                      label="Old Password"
                      fullWidth={true}
                      name="oldPassword"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <CMInput
                      name="newPassword"
                      type="password"
                      label="New Password"
                      fullWidth={true}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: "20px",
                    mb: "10px",
                  }}
                  // Disable button if mutation is in progress
                >
                  Change Password
                </Button>
              </CMForm>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ChangePasswordPage;
