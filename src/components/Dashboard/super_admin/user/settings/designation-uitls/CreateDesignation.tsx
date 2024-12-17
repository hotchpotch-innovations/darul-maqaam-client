"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateDesignationMutation } from "@/redux/api/user/settings/designationApi";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import CMSelect from "@/components/forms/CMSelect";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  departmentId: z.string().nonempty({ message: "Department is required" }),
  title: z.string().nonempty({ message: "Title is required" }),
  identifier: z.string().nonempty({ message: "Identifier is required" }),
});

const CreateDesignation = () => {
  const router = useRouter();
  const default_values = {
    departmentId: "",
    title: "",
    identifier: "",
  };

  const [CreateDesignation] = useCreateDesignationMutation();
  const { options: department_options, isLoading } = useDepartmentOptions();
  const handleCreateCountry = async (values: FieldValues) => {
    console.log(values);

    const toastId = toast.loading("Please wait...");
    try {
      const res = await CreateDesignation(values).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/super_admin/organization/settings/designation");
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
    <CMForm
      onSubmit={handleCreateCountry}
      defaultValues={default_values}
      resolver={zodResolver(validationSchema)}
    >
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
          <CMSelect
            name="departmentId"
            label="Department"
            fullWidth={true}
            items={department_options}
            isDisabled={isLoading}
          />
        </Grid>
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
          create designation
        </Button>
      </Box>
    </CMForm>
  );
};

export default CreateDesignation;
