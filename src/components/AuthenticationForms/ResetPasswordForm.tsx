"use client";
import { Box, Button, Grid } from "@mui/material";
import { refreshToken } from "@/constants/authkey";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-starage";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CMInput from "@/components/forms/CMInput";
import { useResetPasswordMutation } from "@/redux/api/auth/authApi";
import CMForm from "@/components/forms/CMForm";

const validationSchema = z.object({
  password: z.string().min(6, "passrword must be at least 6 character"),
});

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");
  const token = searchParams.get("token");

  const router = useRouter();
  const [resetPasswordRequest] = useResetPasswordMutation();

  useEffect(() => {
    if (token) {
      setToLocalStorage(refreshToken, token);
    }
  }, [token]);

  // Handler for reset password form submission
  const handleReset: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    const payload = {
      id,
      token,
      ...values,
    };
    try {
      const res = await resetPasswordRequest(payload).unwrap();
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
        removeFromLocalStorage(refreshToken);
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
  );
};

export default ResetPasswordForm;
