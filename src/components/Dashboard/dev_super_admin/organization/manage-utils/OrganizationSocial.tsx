"use client";

import { customTimeOut } from "@/utils/customTimeOut";
import { filterUndefinedValues } from "@/utils/sanitizeObject";

import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Box, Button, Stack, Typography } from "@mui/material";
import CMForm from "@/components/forms/CMForm";
import Loading from "@/components/UI/LoadingBar";
import { TSocialLinkPayload } from "@/types";
import CMInput from "@/components/forms/CMInput";

import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WebAssetIcon from "@mui/icons-material/WebAsset";

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

const OrganizationSocial = () => {
  // Fetching user data from the API
  const { data, isLoading } = useGetFirstOrganizationQuery("");
  const business_data = data?.data?.business;

  // API hook to update client data
  const [updateOrganizationProfile, { isLoading: isUpdateLoading }] =
    useUpdateOrganizationMutation();

  // Function to handle profile update
  const handleUpdate: SubmitHandler<FieldValues> = async (values) => {
    const { social_links } = values;

    const toastId = toast.loading("Please wait...");

    // Filter the address and social link data, only including fields with valid values

    const socialLinkData: TSocialLinkPayload =
      filterUndefinedValues(social_links);

    // Construct the final payload, including address and social data only if they are not empty
    const payload = {
      social_links: socialLinkData,
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
    social_links: {
      facebook: business_data?.socialLinks.facebook,
      twitter: business_data?.socialLinks.twitter,
      linkedIn: business_data?.socialLinks.linkedIn,
      instagram: business_data?.socialLinks.instagram,
      youtube: business_data?.socialLinks.youtube,
      website: business_data?.socialLinks.website,
    },
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <CMForm onSubmit={handleUpdate} defaultValues={default_values}>
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
    </>
  );
};

export default OrganizationSocial;
