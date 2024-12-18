"use client";

import { useState } from "react";
import { customTimeOut } from "@/utils/customTimeOut";
import { filterUndefinedValues } from "@/utils/sanitizeObject";

import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Box } from "@mui/material";
import Loading from "@/components/UI/LoadingBar";
import { TSocialLinkPayload } from "@/types";
import {
  useGetFirstOrganizationQuery,
  useUpdateOrganizationMutation,
} from "@/redux/api/organization/organizationApi";
import CMMultipleTwoFieldInput from "@/components/forms/multiple_fields/CMMultipleTwoFieldInput";

const OrganizationFooter = () => {
  const [footerLinks, setFooterLinks] = useState<any>([{}]);

  // Fetching user data from the API
  const { data, isLoading } = useGetFirstOrganizationQuery("");
  const business_data = data?.data?.business;

  // API hook to update client data
  const [updateOrganizationProfile, { isLoading: isUpdateLoading }] =
    useUpdateOrganizationMutation();

  // Function to handle profile update
  const handleUpdate: SubmitHandler<FieldValues> = async (values) => {
    const { location, social_links, ...data } = values;

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
      <Box sx={{ width: "100%" }}>
        <CMMultipleTwoFieldInput
          states={footerLinks}
          setStates={setFooterLinks}
          firstFieldName="label"
          secondFieldName="value"
          label="Footer Details"
        />
      </Box>
    </>
  );
};

export default OrganizationFooter;
