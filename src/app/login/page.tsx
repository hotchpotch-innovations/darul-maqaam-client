"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import loginImage from "../../../public/images/login-blue-logo.png";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CMForm from "@/components/forms/CMForm";
import Link from "next/link";
import CMInput from "@/components/forms/CMInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "@/services/actions/userLogin";
import { getUserInfo, storeUserInfo } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setAccessTokenCookie } from "@/services/actions/setAccessTokenCookie";

export const validationSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z.string().min(6, "passrword must be at least 6 character"),
});

export type TFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const handleLogin = async (values: FieldValues) => {
    const toastId = toast.loading("Pleace wait...");
    try {
      const res = await userLogin(values);

      if (res?.data?.accessToken) {
        setAccessTokenCookie(res?.data?.accessToken);
        toast.success(res?.message, { id: toastId, duration: 5000 });
        storeUserInfo({ accessToken: res?.data?.accessToken });

        const userIfno = getUserInfo();

        if (userIfno?.role != "client" && res?.data?.needPasswordChange) {
          router.push("/authentication/change-password");
        } else {
          router.push(`/dashboard/${userIfno?.role}`);
        }
      } else {
        toast.error(res?.message, { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      toast.error(err?.message);
      console.log("err?.message");
    }
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
                    <Link href={"authentication/forgot-password"}>
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
                  Login
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
