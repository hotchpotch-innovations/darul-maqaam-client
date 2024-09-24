"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import authImage from "../../../public/images/login-blue-logo.png";
import CMForm from "@/components/Forms/CMForm";
import CMInput from "@/components/Forms/CMInput";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export const validationSchema = z.object({
  password: z.string().min(6, "passrword must be at least 6 character"),
});

const ResetPassword = () => {
  const handleReset = (values: FieldValues) => {};
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
