"use client";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";

// const validationSchema = z.object({
//   amount: z.number({ required_error: "Amount is required" }).min(0),
//   donor_name: z.string({ required_error: "Donor name is required" }).nonempty(),
//   email_phone: z
//     .string({ required_error: "Email/Phone is required" })
//     .nonempty(),
// });

const DonationForm = () => {
  // const default_values = {
  //   amount: "",
  //   donor_name: "",
  //   email_phone: "",
  // };
  const createHandler: SubmitHandler<FieldValues> = (values) => {
    // console.log({ values });
    alert("This features is coming soon...");
  };
  return (
    <CMForm
      onSubmit={createHandler}
      // resolver={zodResolver(validationSchema)}
      // defaultValues={default_values}
    >
      <Stack justifyContent="center" gap={4}>
        <Grid container gap={2} p={4}>
          <Typography variant="h5">Authority Information </Typography>
          <Grid size={12}>
            <CMInput
              name="amount"
              label="Amount"
              type="number"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput name="donor_name" label="Name" fullWidth={true} />
          </Grid>
          <Grid size={12}>
            <CMInput name="email_phone" label="Email/Phone" fullWidth={true} />
          </Grid>
        </Grid>
      </Stack>

      <Stack>
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
              marginRight: "10px",
            }}
            // disabled={isLoading}
          >
            Donate
          </Button>
        </Box>
      </Stack>
    </CMForm>
  );
};

export default DonationForm;
