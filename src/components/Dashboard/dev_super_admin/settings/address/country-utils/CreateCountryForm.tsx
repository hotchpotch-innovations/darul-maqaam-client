"use client";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { Button, Grid, Stack, Typography } from "@mui/material";
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
      <Stack direction={"row"} gap={4}>
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
            <CMInput name="name" label="Name" size="small" fullWidth={true} />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMInput
              name="currency"
              label="Currency"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMInput name="iso3" label="ISO3" size="small" fullWidth={true} />
          </Grid>
        </Grid>

        {/* 2nd Pera */}

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
          <Typography variant="h5">Official Information</Typography>
          <Grid item xs={12} md={12}>
            <CMInput name="code" label="Code" size="small" fullWidth={true} />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMInput
              name="phone_code"
              label="Phone Code"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack
              direction="row"
              width="fullWidth"
              alignItems="center"
              gap={2}
            >
              <CMFileInput name="file" label="Choose symbol" />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Button
        type="submit"
        fullWidth
        sx={{
          mt: "30px",
        }}
      >
        Update Client
      </Button>
    </CMForm>
  );
};

export default CreateCountryForm;
