"use client";

import { useChangePasswordMutation } from "@/redux/api/auth/authApi";
import { logOutUser } from "@/services/actions/logoutUser";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CMForm from "../forms/CMForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, Grid } from "@mui/material";
import CMInput from "../forms/CMInput";

const validationSchema = z.object({
  oldPassword: z.string().min(6, "Please enter a valid password"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const ChangePasswordForm = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();

  // Change password handler
  const handleChangePassword: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await changePassword(values).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 5000 });
        logOutUser();
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId, duration: 5000 });
      console.error("Failed to change password:", err);
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
        onSubmit={handleChangePassword}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          oldPassword: "",
          newPassword: "",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <CMInput
              label="Old Password"
              fullWidth={true}
              name="oldPassword"
              type="password"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMInput
              name="newPassword"
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
          // Disable button if mutation is in progress
        >
          Change Password
        </Button>
      </CMForm>
    </Box>
  );
};

export default ChangePasswordForm;
