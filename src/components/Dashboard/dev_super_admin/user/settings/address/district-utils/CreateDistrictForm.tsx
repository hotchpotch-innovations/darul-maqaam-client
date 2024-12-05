"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateClientTypeMutation } from "@/redux/api/user/settings/clientTypeApi";
import CMSelect from "@/components/forms/CMSelect";
import { useDivisionOptions } from "@/hooks/useDivisionOptions";
import { useCreateDistrictMutation } from "@/redux/api/user/settings/districtApi";

const CreateDistrictForm = () => {
  const default_values = {
    divisionId: "",
    name: "",
  };

  const { options, isLoading } = useDivisionOptions();
  console.log(options);

  const [CreateDistrict] = useCreateDistrictMutation();
  const handleCreateCountry = async (values: FieldValues) => {
    console.log(values);

    const toastId = toast.loading("Please wait...");
    try {
      const res = await CreateDistrict(values).unwrap();
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
          <CMSelect name="divisionId" items={options} label="Select Division" />
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
            width: "30%",
          }}
        >
          Add District
        </Button>
      </Box>
    </CMForm>
  );
};

export default CreateDistrictForm;
