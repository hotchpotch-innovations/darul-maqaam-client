"use client";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "@/redux/api/auth/authApi";
import { toast } from "sonner";
import { useState } from "react";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { FieldValues, SubmitHandler } from "react-hook-form";

const validationSchema = z.object({
  email: z.string().email("please enter a valid email"),
});

const ForgotPasswordForm = () => {
  const [checkGamil, setCheckGmail] = useState(false);
  const [isGamil, setIsGmail] = useState("");
  const [forgetPassword] = useForgotPasswordMutation();

  const forgotHandler: SubmitHandler<FieldValues> = async (values) => {
    try {
      const res = await forgetPassword(values).unwrap();
      console.log({ res });
      if (res?.success) {
        setCheckGmail(true);
        setIsGmail(values?.email);
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
      console.error("Failed to forgot password:", err);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px 20px",
      }}
    >
      {!checkGamil ? (
        <CMForm
          onSubmit={forgotHandler}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            email: "",
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Typography sx={{ fontSize: "16px", marginBottom: "12px" }}>
                Please enter your email address for password recovery:
              </Typography>
              <CMInput
                label="Email address"
                type="email"
                fullWidth={true}
                name="email"
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              sx={{
                mt: "20px",
                mb: "10px",
              }}
            >
              Submit
            </Button>
          </Box>
        </CMForm>
      ) : (
        <Box>
          <Typography color="green" fontSize={20} fontWeight={550} py={1}>
            Please Check Your Gmail...
          </Typography>
          <Typography color="secondary.main" py={1}>
            Email Address: {isGamil}
          </Typography>
          <Typography color="secondary.main" py={1}>
            Experied in: <samp className="text-red-500">10 minute</samp>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ForgotPasswordForm;
