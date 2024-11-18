"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
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
      <Stack direction={"row"} justifyContent="center" gap={4}>
        {/* 1st Pera */}
        <Grid
          item
          xs={3}
          md={6}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={4}
        >
          <Typography variant="h5">Basic Information </Typography>

          <Grid item xs={12} md={12}>
            <CMSelect
              name="countryId"
              fullWidth
              items={country_options}
              label="Select Country"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMInput name="name" label="Name" fullWidth={true} />
          </Grid>
        </Grid>

        {/* 2nd Pera */}
      </Stack>
      <Stack sx={{}} justifyContent="center" direction="row">
        <Box
          sx={{
            width: "400px",
          }}
        >
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: "30px",
            }}
          >
            Create Divisiton
          </Button>
        </Box>
      </Stack>
    </CMForm>
  );
};

export default CreateDivisionForm;
