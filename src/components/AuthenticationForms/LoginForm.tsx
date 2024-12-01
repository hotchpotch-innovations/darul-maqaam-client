"use client";

import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CMForm from "@/components/forms/CMForm";
import Link from "next/link";
import CMInput from "@/components/forms/CMInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { setToLocalStorage } from "@/utils/local-starage";
import { authkey } from "@/constants/authkey";
import { userSignIn } from "@/services/actions/userSignIn";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const validationSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z.string().min(6, "passrword must be at least 6 character"),
});

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggolePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const handleLogin: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    const data = {
      email: values?.email,
      password: values?.password,
    };
    try {
      const res = await userSignIn(data);

      if (res?.success) {
        const access_token = res?.data?.accessToken;
        toast.success(res?.message, { id: toastId, duration: 2000 });
        setToLocalStorage(authkey, access_token);
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });
    }
  };

  return (
    <Box
      sx={{
        width: "70%",
        padding: "60px 15px",
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
          <Grid size={{ xs: 12, md: 12 }}>
            <CMInput label="Email" fullWidth={true} name="email" />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Grid flexGrow={1}>
                <CMInput
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  label="Password"
                  fullWidth={true}
                  endAdornment={
                    <IconButton
                      onClick={toggolePasswordVisibility}
                      edge="end"
                      sx={{
                        backgroundColor: "#f5f5f5",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                        borderRadius: "10px",
                        padding: "5px",
                      }}
                    >
                      {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  }
                />
              </Grid>
            </Stack>
          </Grid>
          <Typography textAlign={"end"} py={1} width={"100%"}>
            <Link href={"authentication/forgot-password"}>
              <span className="text-blue-500 text-end">Forgot Password?</span>
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
          Don&apos;t have an account?
          <Link href={"/register"}>
            <span className="text-blue-500"> Register</span>
          </Link>
        </Typography>
      </CMForm>
    </Box>
  );
};

export default LoginForm;
