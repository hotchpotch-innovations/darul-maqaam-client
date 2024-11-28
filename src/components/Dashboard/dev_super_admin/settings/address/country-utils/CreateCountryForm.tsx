"use client";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FieldValues } from "react-hook-form";
import CMFileInput from "@/components/forms/CMFileInput";
import { modifyPayload } from "@/utils/modifyPayload";
import { useCreateCountryMutation } from "@/redux/api/user/settings/countryApi";
import { toast } from "sonner";

const CreateCountryForm = () => {
  const default_values = {
    file: "",
    name: "",
    currency: "",
    iso3: "",
    code: "",
    phone_code: "",
  };

  const [createCountry] = useCreateCountryMutation();
  const handleCreateCountry = async (values: FieldValues) => {
    const create_country_data = modifyPayload(values);
    const toastId = toast.loading("Please wait...");
    try {
      const res = await createCountry(create_country_data).unwrap();

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
    <CMForm onSubmit={handleCreateCountry} defaultValues={default_values}>
      <Grid container spacing={2} alignItems="center">
        <Grid container size={{ xs: 12, lg: 6 }} spacing={2}>
          <Typography variant="h5">Basic Information </Typography>
          <CMInput name="name" label="Name" size="small" fullWidth={true} />
          <CMInput
            name="currency"
            label="Currency"
            size="small"
            fullWidth={true}
          />
          <CMInput name="iso3" label="ISO3" size="small" fullWidth={true} />
        </Grid>
        <Grid container size={{ xs: 12, lg: 6 }} spacing={2}>
          <Typography variant="h5">Official Information</Typography>

          <CMInput name="code" label="Code" size="small" fullWidth={true} />
          <CMInput
            name="phone_code"
            label="Phone Code"
            size="small"
            fullWidth={true}
          />
          <CMFileInput name="file" label="Choose a symbol" />
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
            width: "40%",
          }}
        >
          Add Country
        </Button>
      </Box>
    </CMForm>
  );
};

export default CreateCountryForm;
