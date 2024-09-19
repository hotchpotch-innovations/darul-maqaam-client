"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import loginImage from "../../../public/images/login-blue-logo.png";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import CMForm from "@/components/Forms/CMForm";
import Link from "next/link";
import CMInput from "@/components/Forms/CMInput";
import CMSelect from "@/components/Forms/CMSelect";
import { gender_options } from "../../constants/options";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const clientValidationSchema = z.object({
  name: z.string().min(1, "please enter your name"),
  email: z.string().email("please enter a valid email"),
  gender: z.string().nonempty("Gender is required"),
  phone: z.string().regex(/^\d{11}$/, "enter a valid phone number"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "passrword must be at least 6 character"),
  client: clientValidationSchema,
});

const RegisterPage = () => {
  const [accountType, setAccountType] = useState("");
  console.log(accountType);

  const handleRegister = (values: FieldValues) => {
    const data = modifyPayload(values);
    console.log(values);
  };

  return (
    <Container>
      <title>CM | User Register</title>;
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
              src={loginImage}
              alt="Login Logo Image "
              height={60}
              width={60}
              className="h-auto w-auto"
            />
            <Typography variant="h5" pt={2} pb={1}>
              {" "}
              Register Here
            </Typography>

            <Box
              sx={{
                width: "100%",
                padding: "10px 20px",
              }}
            >
              <CMForm
                onSubmit={handleRegister}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  password: "",
                  client: {
                    name: "",
                    email: "",
                    phone: "",
                    gender: "",
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <CMInput
                      name="client.name"
                      label="Name *"
                      // {...register("client.owner_name")}
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CMInput
                      name="client.email"
                      label="Email *"
                      type="email"
                      size="small"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CMInput
                      name="password"
                      label="Password *"
                      type="password"
                      size="small"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CMInput
                      name="client.phone"
                      label="Contact Number *"
                      type="tel"
                      size="small"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CMSelect
                      setAccountType={setAccountType}
                      name="client.gender"
                      fullWidth={true}
                      label="Gender *"
                      items={gender_options}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: "30px",
                  }}
                >
                  Register
                </Button>

                <Typography textAlign={"center"} py={2}>
                  Do you already have an account?{" "}
                  <Link href={"/login"}>
                    <span className="text-blue-500">Login</span>
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

export default RegisterPage;
