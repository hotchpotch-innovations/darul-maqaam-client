"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import CMSelect from "@/components/forms/CMSelect";
import { useCountryOptions } from "@/hooks/useCountryOptions";
import { useCreateDivisionMutation } from "@/redux/api/user/settings/divisionApi";

const CreateDivisionForm = () => {
  const default_values = {
    countryId: "",
    name: "",
  };
  // Alll Countriy
  const { options: country_options, isLoading: present_country_isLoading } =
    useCountryOptions();

  const [CreateDivision] = useCreateDivisionMutation();
  const handleCreateDivision = async (values: FieldValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await CreateDivision(values).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
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
    <CMForm onSubmit={handleCreateDivision} defaultValues={default_values}>
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
            name="countryId"
            fullWidth={true}
            items={country_options}
            label="Select Country"
          />
        </Grid>
        <Grid size={12}>
          <CMInput name="name" label="Name" fullWidth={true} />
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
              xs: "30%",
              lg: "20%",
            },
          }}
        >
          Add Division
        </Button>
      </Box>
    </CMForm>
  );
};

export default CreateDivisionForm;
