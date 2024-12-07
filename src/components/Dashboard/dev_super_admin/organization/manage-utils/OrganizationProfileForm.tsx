"use client";

import { SyntheticEvent, useState } from "react";

import { customTimeOut } from "@/utils/customTimeOut";
import { modifyPayload } from "@/utils/modifyPayload";
import { filterUndefinedValues } from "@/utils/sanitizeObject";

import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CMForm from "@/components/forms/CMForm";
import Loading from "@/components/ui/LoadingBar";
import { TAddress, TSocialLinkPayload } from "@/types";
import ProfilePicture from "@/components/Dashboard/common/profile/ProfilePicture";
import CMInput from "@/components/forms/CMInput";
import {
  a11yProps,
  CustomTabPanel,
} from "@/components/Dashboard/common/profile/ProfileTab";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";

import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WebAssetIcon from "@mui/icons-material/WebAsset";

import { useCountryOptions } from "@/hooks/useCountryOptions";
import {
  useChangeOrganizationLogoMutation,
  useGetFirstOrganizationQuery,
  useUpdateOrganizationMutation,
} from "@/redux/api/organization/organizationApi";

const OrganizationProfileForm = () => {
  const [presentCountryId, setPresentCountryId] = useState(null);

  // Fetching user data from the API
  const { data, isLoading } = useGetFirstOrganizationQuery("");
  const business_data = data?.data?.business;
  console.log(business_data);
  const business_location = data?.data?.location;

  // API hook to update client data
  const [updateOrganizationProfile, { isLoading: isUpdateLoading }] =
    useUpdateOrganizationMutation();

  // API hook to update profile picture
  const [changeLogo, { isLoading: isPictureUpdateLoading }] =
    useChangeOrganizationLogoMutation();

  // Country options
  const { options: country_options } = useCountryOptions();

  // Function to handle profile update
  const handleUpdate: SubmitHandler<FieldValues> = async (values) => {
    const { location, social_links, ...data } = values;

    const toastId = toast.loading("Please wait...");

    // Filter the address and social link data, only including fields with valid values
    const business = filterUndefinedValues(data);
    const businessLocation: TAddress = filterUndefinedValues(location);
    const socialLinkData: TSocialLinkPayload =
      filterUndefinedValues(social_links);

    // Construct the final payload, including address and social data only if they are not empty
    const payload = {
      business,
      location: businessLocation,
      social_links: socialLinkData,
      // ...(Object.keys(businessLocation).length > 0 && {

      // }),
      // ...(Object.keys(socialLinkData).length > 0 && {

      // }),
    };

    // console.log(payload);

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

  // Function to handle for update user profile picture
  const handleImageUpload = async (file: File) => {
    if (!file) return;
    const toastId = toast.loading("Uploading...");
    const payload = modifyPayload({ file });

    try {
      const res = await changeLogo(payload).unwrap();
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
    primary_logo: business_data?.primary_logo,
    secondary_logo: business_data?.secondary_logo,

    location: {
      countryId: business_location?.countryId,
      state: business_location?.state,
      city: business_location?.city,
      address_line: business_location?.address_line,
    },

    social_links: {
      facebook: business_data?.socialLinks.facebook,
      twitter: business_data?.socialLinks.twitter,
      linkedIn: business_data?.socialLinks.linkedIn,
      instagram: business_data?.socialLinks.instagram,
      youtube: business_data?.socialLinks.youtube,
      website: business_data?.socialLinks.website,
    },
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box mt={6}>
          <CMForm onSubmit={handleUpdate} defaultValues={default_values}>
            <Grid
              container
              spacing={2}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: {
                  xs: "column",
                  lg: "row",
                },
              }}
            >
              {/* Avatar and social */}
              <Grid
                size={{ xs: 12, lg: 4 }}
                sx={{
                  p: 2,
                  borderRadius: "8px",
                }}
              >
                <Box>
                  <Card
                    sx={{
                      width: { xs: "100%" },
                      textAlign: "center",
                      borderRadius: 1,
                      padding: [4, 4, 0, 4],
                      backgroundColor: "#f5f5f5",
                      boxShadow:
                        " rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ProfilePicture
                        userData={business_data}
                        isUploading={isPictureUpdateLoading}
                        onImageUpload={handleImageUpload}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {business_data?.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {business_data?.tag_line}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Box mt={4} mb={2}>
                    <Typography mb={2} variant="h6">
                      Social
                    </Typography>

                    <Stack spacing={2}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <FacebookIcon fontSize="large" />
                        <CMInput
                          name="social_links.facebook"
                          label={"Facebook *"}
                          size="small"
                          fullWidth={true}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <TwitterIcon fontSize="large" />
                        <CMInput
                          name="social_links.twitter"
                          label={"Twitter"}
                          size="small"
                          fullWidth={true}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <LinkedInIcon fontSize="large" />
                        <CMInput
                          name="social_links.linkedIn"
                          label={"LinkedIn"}
                          size="small"
                          fullWidth={true}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <InstagramIcon fontSize="large" />
                        <CMInput
                          name="social_links.instagram"
                          label={"Instagram"}
                          size="small"
                          fullWidth={true}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <YouTubeIcon fontSize="large" />
                        <CMInput
                          name="social_links.youtube"
                          label={"Youtube"}
                          size="small"
                          fullWidth={true}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <WebAssetIcon fontSize="large" />
                        <CMInput
                          name="social_links.website"
                          label={"Website"}
                          size="small"
                          fullWidth={true}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Grid>

              {/* Business details */}
              <Grid
                size={{ xs: 12, lg: 8 }}
                sx={{
                  mt: { xs: 0, lg: 6.5 },
                  borderRadius: "8px",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Stack spacing={2}>
                    {/* Business Name */}
                    <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
                      <CMInput
                        name="name"
                        fullWidth={true}
                        label="Name"
                        size="small"
                      />
                    </Stack>

                    {/* Business Emain & Web Mail */}
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
                        readOnly={true}
                      />
                    </Stack>

                    {/* Busines Phone & Secondary Phone */}
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
                </Box>
              </Grid>
            </Grid>
          </CMForm>
        </Box>
      )}
    </>
  );
};

export default OrganizationProfileForm;
