"use client";

import CMForm from "@/components/forms/CMForm";
import { addressValidationSchema } from "@/constants/zodvalidation";
import { useCountryOptions } from "@/hooks/useCountryOptions";
import {
  useGetSingleBranchQuery,
  useUpdateBranchMutation,
} from "@/redux/api/organization/branchApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { filterUndefinedValues } from "@/utils/sanitizeObject";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Grid from "@mui/material/Grid2";
import CMInput from "@/components/forms/CMInput";
import CMTextarea from "@/components/forms/CMTextarea";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import Loading from "@/components/ui/LoadingBar";

type TProps = {
  id: string;
};

const validationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().nonempty({ message: "Email is required" }).email(),
  web_mail: z.string({ required_error: "Web mail is required" }).optional(),
  primary_phone: z.string().nonempty({ message: "Primary phone is required" }),
  secondary_phone: z
    .string({ required_error: "Secondary phone number is required" })
    .optional(),
  primary_tel: z
    .string({ required_error: "Primary telephone number is required" })
    .optional(),
  secondary_tel: z
    .string({ required_error: "Secondary telephone number is required" })
    .optional(),
  summary: z.string({ required_error: "Summary is required" }).optional(),
  branch_location: addressValidationSchema,
});

const UpdateBranchForm = ({ id }: TProps) => {
  const router = useRouter();
  const [countryId, setCountryId] = useState(null);

  const { data: branch_obj, isLoading: isGetLoading } =
    useGetSingleBranchQuery(id);
  const branch_info = branch_obj?.data;

  const defaultValues = {
    name: branch_info?.name,
    email: branch_info?.email,
    web_mail: branch_info?.web_mail || "",
    primary_phone: branch_info?.primary_phone,
    secondary_phone: branch_info?.secondary_phone || "",
    primary_tel: branch_info?.primary_tel || "",
    secondary_tel: branch_info?.secondary_tel || "",
    summary: branch_info?.summary || "",
    branch_location: {
      countryId: branch_info?.location?.countryId,
      state: branch_info?.location?.state,
      city: branch_info?.location?.city,
      address_line: branch_info?.location?.address_line,
    },
  };

  const [updateBranch, { isLoading: isUpdateLoading }] =
    useUpdateBranchMutation();

  const { options: country_options, isLoading: isCountryLoading } =
    useCountryOptions();

  const updateHandler: SubmitHandler<FieldValues> = async (values) => {
    const { branch_location, ...formValue } = values;
    const branch = filterUndefinedValues(formValue);
    const location = filterUndefinedValues(branch_location);
    const payload = {
      branch,
      location,
    };

    const toastId = toast.loading("Please wait...", { duration: 3000 });

    try {
      const res = await updateBranch({ id, ...payload }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/dev_super_admin/organization/settings/branch");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });
      console.log(error);
      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  if (!!isGetLoading) {
    return <Loading />;
  }

  return (
    <CMForm
      onSubmit={updateHandler}
      resolver={zodResolver(validationSchema)}
      defaultValues={defaultValues}
    >
      <Stack direction={{ xs: "column", lg: "row" }} gap={4}>
        {/* 1st Pera */}
        <Grid
          size={{ xs: 12, lg: 6 }}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={4}
        >
          <Typography variant="h5">Basic Information</Typography>
          <Grid size={12}>
            <CMInput name="name" label="Name*" fullWidth={true} />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="email"
              label="Email*"
              //   size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="web_mail"
              label="Web mail"
              //   size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="h6" sx={{ marginBottom: "8px" }}>
              Phone
            </Typography>
            <Grid
              container
              size={{ xs: 12, lg: 6 }}
              justifyContent={"space-between"}
            >
              <Grid size={12}>
                <CMInput
                  name="primary_phone"
                  label="Primary*"
                  //   size="medium"
                  fullWidth={true}
                />
              </Grid>
              <Grid size={12}>
                <CMInput
                  name="secondary_phone"
                  label="Secondary"
                  //   size="medium"
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid size={12}>
            <Typography variant="h6" sx={{ marginBottom: "8px" }}>
              Telephone
            </Typography>
            <Grid
              container
              size={{ xs: 12, lg: 6 }}
              justifyContent={"space-between"}
            >
              <Grid size={12}>
                <CMInput
                  name="primary_tel"
                  label="Primary"
                  //   size="medium"
                  fullWidth={true}
                />
              </Grid>
              <Grid size={12}>
                <CMInput
                  name="secondary_tel"
                  label="Secondary"
                  //   size="medium"
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <CMTextarea name="summary" label="Summary" />
          </Grid>
        </Grid>

        {/* 2nd Pera */}
        <Grid
          size={{ xs: 12, lg: 6 }}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={4}
        >
          <Typography variant="h5">Branch Location</Typography>
          <Grid size={12}>
            <CMSelectWithWatch
              name="branch_location.countryId"
              label="Country *"
              //   size="medium"
              options={country_options}
              setState={setCountryId}
            />
          </Grid>

          <Grid size={12}>
            <CMInput
              name="branch_location.state"
              label="State *"
              //   size="medium"
              fullWidth={true}
              readOnly={!countryId}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="branch_location.city"
              label="City *"
              //   size="medium"
              fullWidth={true}
              readOnly={!countryId}
            />
          </Grid>

          <Grid size={12}>
            <CMInput
              name="branch_location.address_line"
              label="Address Line *"
              //   size="medium"
              fullWidth={true}
              readOnly={!countryId}
            />
          </Grid>
        </Grid>
      </Stack>
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
          }}
          disabled={isUpdateLoading}
        >
          update Branch
        </Button>
      </Box>
    </CMForm>
  );
};

export default UpdateBranchForm;
