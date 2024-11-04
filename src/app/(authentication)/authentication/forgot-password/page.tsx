"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LockIcon from "@mui/icons-material/Lock";
import { useForgotPasswordMutation } from "@/redux/api/auth/authApi";
import { toast } from "sonner";
import { useState } from "react";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";

const validationSchema = z.object({
  email: z.string().email("please enter a valid email"),
});

const ForgotPassword = () => {
  const [checkGamil, setCheckGmail] = useState(false);
  const [isGamil, setIsGmail] = useState("");
  const [forgetPassword] = useForgotPasswordMutation();

  const handleForgot: SubmitHandler<FieldValues> = async (values) => {
    try {
      const res = await forgetPassword(values).unwrap();
      console.log({ res });
      if (!!res.success) {
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
              {!checkGamil ? (
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
              ) : (
                <Box>
                  {" "}
                  <Typography
                    color="green"
                    fontSize={20}
                    fontWeight={550}
                    py={1}
                  >
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
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ForgotPassword;
