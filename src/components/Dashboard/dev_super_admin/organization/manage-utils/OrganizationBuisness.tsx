"use client";

import { useState } from "react";
import { customTimeOut } from "@/utils/customTimeOut";
import { filterUndefinedValues } from "@/utils/sanitizeObject";

import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Box, Button, Stack, Typography } from "@mui/material";
import CMForm from "@/components/forms/CMForm";
import Loading from "@/components/UI/LoadingBar";
import { TAddress } from "@/types";
import CMInput from "@/components/forms/CMInput";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";

import { useCountryOptions } from "@/hooks/useCountryOptions";
import {
  useGetFirstOrganizationQuery,
  useUpdateOrganizationMutation,
} from "@/redux/api/organization/organizationApi";

export type TLogoPayload = {
  previous_primary_key?: string;
  previous_secondary_key?: string;
  primary_logo?: File;
  secondary_logo?: File;
};

const OrganizationBuisness = () => {
  // Select country options
  const [presentCountryId, setPresentCountryId] = useState(null);

  // Fetching user data from the API
  const { data, isLoading } = useGetFirstOrganizationQuery("");
  const business_data = data?.data?.business;
  const business_location = data?.data?.location;

  // API hook to update client data
  const [updateOrganizationProfile, { isLoading: isUpdateLoading }] =
    useUpdateOrganizationMutation();

  // Country options
  const { options: country_options } = useCountryOptions();

  // Function to handle business profile update
  const handleUpdate: SubmitHandler<FieldValues> = async (values) => {
    const { location, ...data } = values;

    const toastId = toast.loading("Please wait...");

    // Filter the address and social link data, only including fields with valid values
    const business = filterUndefinedValues(data);
    const businessLocation: TAddress = filterUndefinedValues(location);

    // Construct the final payload, including address and social data only if they are not empty
    const payload = {
      business,
      location: businessLocation,
    };

    try {
      const res = await updateOrganizationProfile(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 3000 });
      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  // Default form values
  const default_values = {
    name: business_data?.name,
    tag_line: business_data?.tag_line,
    email: business_data?.email,
    web_mail: business_data?.web_mail,
    primary_phone: business_data?.primary_phone,
    secondary_phone: business_data?.secondary_phone,
    descriptions: business_data?.descriptions,
    primary_tel: business_data?.primary_tel,
    secondary_tel: business_data?.secondary_tel,

    location: {
      countryId: business_location?.countryId,
      state: business_location?.state,
      city: business_location?.city,
      address_line: business_location?.address_line,
    },
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box>
        <CMForm onSubmit={handleUpdate} defaultValues={default_values}>
          <Stack spacing={2}>
            {/* Business Name */}
            <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
              <CMInput name="name" fullWidth={true} label="Name" size="small" />
            </Stack>
            <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
              <CMInput
                name="tag_line"
                fullWidth={true}
                label="Tag Line"
                size="small"
              />
            </Stack>

            {/* Business Email & Web Mail */}
            <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
              <CMInput
                name="email"
                fullWidth={true}
                label="Email"
                size="small"
              />
              <CMInput
                name="web_mail"
                fullWidth={true}
                label="Web Mail"
                size="small"
              />
            </Stack>

            {/* Business Phone & Secondary Phone */}
            <Stack spacing={2} direction="row">
              <CMInput
                name="primary_phone"
                fullWidth={true}
                label="Primary Phone"
                size="small"
              />
              <CMInput
                name="secondary_phone"
                fullWidth={true}
                label="Secondary Phone"
                size="small"
              />
            </Stack>

            {/* Busines Telephone & Secondary Telephone */}
            <Stack spacing={2} direction="row">
              <CMInput
                name="primary_tel"
                fullWidth={true}
                label="Primary Telephone"
                size="small"
              />
              <CMInput
                name="secondary_tel"
                fullWidth={true}
                label="Secondary Telephone"
                size="small"
              />
            </Stack>

            {/* Business Location*/}
            <Typography pt={2} variant="body1" fontWeight="500">
              Location:
            </Typography>
            {/* Address Line & State */}
            <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
              <CMInput
                name="location.address_line"
                fullWidth={true}
                label="Address Line"
                size="small"
                required={!!presentCountryId}
              />

              <CMInput
                name="location.state"
                fullWidth={true}
                label="State"
                size="small"
                required={!!presentCountryId}
              />
            </Stack>

            {/* Country & City */}
            <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
              <CMInput
                name="location.city"
                fullWidth={true}
                label="City"
                size="small"
                required={!!presentCountryId}
              />
              <CMSelectWithWatch
                name="location.countryId"
                label={"Country"}
                options={country_options}
                setState={setPresentCountryId}
              />
            </Stack>
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="submit"
              disabled={isUpdateLoading}
              sx={{
                mt: "30px",
              }}
            >
              Update
            </Button>
          </Box>
        </CMForm>
      </Box>
    </>
  );
};

export default OrganizationBuisness;
