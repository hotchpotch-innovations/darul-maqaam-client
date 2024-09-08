"use client";

import CMForm from "@/components/Forms/CMForm";
import CMInput from "@/components/Forms/CMInput";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { z } from "zod";
import authImage from "../../../public/images/login-blue-logo.png";
import { FieldValues } from "react-hook-form";

export const validationSchema = z.object({
  old_password: z.string().min(6, "please enter valied password"),
  new_password: z.string().min(6, "passrword must be at least 6 character"),
});

const ChangePasswordPage = () => {
  const handleChangePassword = (values: FieldValues) => {
    const data = modifyPayload(values);
    console.log(values);
  };

  return (
    <Container>
      <title>CM | User Login</title>
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
            <Image
              src={authImage}
              alt="Login Logo Image "
              height={60}
              width={60}
            />
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
                  old_password: "",
                  new_password: "",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <CMInput
                      label="Old Password"
                      fullWidth={true}
                      name="old_password"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <CMInput
                      name="new_password"
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
