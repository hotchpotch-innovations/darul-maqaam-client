"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
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
              name="divisionId"
              items={options}
              label="Select Division"
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
            Create Department
          </Button>
        </Box>
      </Stack>
    </CMForm>
  );
};

export default CreateDistrictForm;
