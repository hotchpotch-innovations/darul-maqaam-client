"use client";

import { useEffect, useState } from "react";
import { customTimeOut } from "@/utils/customTimeOut";
import { toast } from "sonner";
import { Box, Button } from "@mui/material";
import Loading from "@/components/UI/LoadingBar";
import {
  useGetFirstOrganizationQuery,
  useUpdateOrganizationMutation,
} from "@/redux/api/organization/organizationApi";
import CMMultipleTwoFieldInput from "@/components/forms/multiple_fields/CMMultipleTwoFieldInput";

const OrganizationGetUs = () => {
  // Fetching user data from the API
  const { data, isLoading } = useGetFirstOrganizationQuery("");
  const business_data = data?.data?.business;

  const [footerGetUs, setFooterGetUs] = useState<any>([{}]);
  useEffect(() => {
    if (!!business_data?.footer_get_us) {
      setFooterGetUs(business_data?.footer_get_us);
    }
  }, [business_data]);

  // API hook to update client data
  const [updateOrganizationProfile, { isLoading: isUpdateLoading }] =
    useUpdateOrganizationMutation();

  // Function to handle profile update
  const handleUpdate = async () => {
    const toastId = toast.loading("Please wait...");

    const payload = {
      business: { footer_get_us: footerGetUs },
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <CMMultipleTwoFieldInput
          states={footerGetUs}
          setStates={setFooterGetUs}
          firstFieldName="label"
          secondFieldName="url"
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={handleUpdate}
            disabled={isUpdateLoading}
            sx={{
              mt: "30px",
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OrganizationGetUs;
