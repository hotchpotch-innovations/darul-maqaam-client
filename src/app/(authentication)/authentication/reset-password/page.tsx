"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/api/auth/authApi";
import { toast } from "sonner";
import { useEffect } from "react";
import { resetKey } from "@/constants/authkey";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-starage";

export const validationSchema = z.object({
  password: z.string().min(6, "passrword must be at least 6 character"),
});

const ResetPassword = () => {
  const router = useRouter();
  const [resetPasswordRequest, { error }] = useResetPasswordMutation();
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");
  const token = searchParams.get("token");

  console.log({ id, token });
  useEffect(() => {
    if (token) {
      setToLocalStorage(resetKey, token);
    }
  }, [token]);
  const handleReset = async (values: FieldValues) => {
    const toastId = toast.loading("please wait...");
    const payload = {
      id,
      token,
      ...values,
    };
    try {
      const res = await resetPasswordRequest(payload);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
        removeFromLocalStorage(resetKey);
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
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
              <LockOpenIcon sx={{ color: "primary.main" }} />
            </Box>
            <Typography variant="h5" pt={2} pb={1}>
              {" "}
              Reset Password
            </Typography>

            <Box
              sx={{
                width: "100%",
                padding: "10px 20px",
              }}
            >
              <CMForm
                onSubmit={handleReset}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  password: "",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <CMInput
                      type="password"
                      label="New Password"
                      fullWidth={true}
                      name="password"
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

export default ResetPassword;
