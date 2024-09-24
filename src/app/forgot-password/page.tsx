"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import CMForm from "@/components/Forms/CMForm";
import CMInput from "@/components/Forms/CMInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LockIcon from "@mui/icons-material/Lock";
import { useForgotPasswordMutation } from "@/redux/api/auth/authApi";
import { toast } from "sonner";

export const validationSchema = z.object({
  email: z.string().email("please enter a valid email"),
});

const ForgotPassword = () => {
  const [forgtPassword] = useForgotPasswordMutation();
  const handleForgot = async (values: FieldValues) => {
    try {
      const res = await forgtPassword(values).unwrap();
      toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.message);
      console.error("Failed to forgot password:", err);
    }
  };
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
              <LockIcon sx={{ color: "primary.main" }} />
            </Box>
            <Typography variant="h5" pt={2} pb={1}>
              {" "}
              Forgot Password
            </Typography>

            <Box
              sx={{
                width: "100%",
                padding: "10px 20px",
              }}
            >
              <CMForm
                onSubmit={handleForgot}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  email: "",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <CMInput
                      label="Email"
                      type="email"
                      fullWidth={true}
                      name="email"
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
                >
                  Submit
                </Button>
              </CMForm>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ForgotPassword;
