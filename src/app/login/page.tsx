"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import loginImage from "../../../public/images/login-blue-logo.png";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import CMForm from "@/components/Forms/CMForm";
import Link from "next/link";
import CMInput from "@/components/Forms/CMInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const validationSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z.string().min(6, "passrword must be at least 6 character"),
});

const LoginPage = () => {
  const handleLogin = (values: FieldValues) => {
    const data = modifyPayload(values);
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
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            boxShadow: "1",
          }}
          pt={4}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Image
              src={loginImage}
              alt="Login Logo Image "
              height={60}
              width={60}
            />
            <Typography variant="h5" pt={2} pb={1}>
              {" "}
              Login Here
            </Typography>

            <Box
              sx={{
                width: "100%",
                padding: "10px 20px",
              }}
            >
              <CMForm
                onSubmit={handleLogin}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  email: "",
                  password: "",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <CMInput label="Email" fullWidth={true} name="email" />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <CMInput
                      name="password"
                      type="password"
                      label="Password"
                      fullWidth={true}
                    />
                  </Grid>
                  <Typography textAlign={"end"} py={1} width={"100%"}>
                    <Link href={"/register"}>
                      <span className="text-blue-500 text-end">
                        forgot password
                      </span>
                    </Link>
                  </Typography>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: "10px",
                  }}
                >
                  Register
                </Button>

                <Typography textAlign={"center"} py={2}>
                  do not have an account?{" "}
                  <Link href={"/register"}>
                    <span className="text-blue-500">Register</span>
                  </Link>
                </Typography>
              </CMForm>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
