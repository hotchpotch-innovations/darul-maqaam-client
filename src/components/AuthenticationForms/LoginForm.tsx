"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CMForm from "@/components/forms/CMForm";
import Link from "next/link";
import CMInput from "@/components/forms/CMInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { userLogin } from "@/services/actions/userLogin";
import { setToLocalStorage } from "@/utils/local-starage";
import { authkey } from "@/constants/authkey";

const validationSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z.string().min(6, "passrword must be at least 6 character"),
});

const LoginForm = () => {
  const handleLogin: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await userLogin(values);

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
              <span className="text-blue-500 text-end">forgot password</span>
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
  );
};

export default LoginForm;
