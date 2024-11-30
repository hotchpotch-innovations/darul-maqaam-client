"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateClientTypeMutation } from "@/redux/api/user/settings/clientTypeApi";
import { useRouter } from "next/navigation";

const CreateClientTypeForm = () => {
  const router = useRouter();
  const default_values = {
    title: "",
    identifier: "",
  };

  const [CreateClientType] = useCreateClientTypeMutation();

  const createHandler = async (values: FieldValues) => {
    console.log(values);

    const toastId = toast.loading("Please wait...");
    try {
      const res = await CreateClientType(values).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/dev_super_admin/users/settings/c_type");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { duration: 3000 });
    }
  };
  return (
    <CMForm onSubmit={createHandler} defaultValues={default_values}>
      <Grid
        container
        gap={2}
        sx={{
          border: "1px solid lightgray",
          boxShadow: 1,
        }}
        p={4}
      >
        <Typography variant="h5">Basic Information </Typography>

        <Grid size={12}>
          <CMInput name="title" label="Title" fullWidth={true} />
        </Grid>
        <Grid size={12}>
          <CMInput name="identifier" label="Identifier" fullWidth={true} />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="submit"
          sx={{
            mt: "30px",
            width: {
              xs: "40%",
              lg: "20%",
            },
          }}
        >
          create Client Type
        </Button>
      </Box>
    </CMForm>
  );
};

export default CreateClientTypeForm;
