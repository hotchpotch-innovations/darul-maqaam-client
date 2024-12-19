"use client";

import { customTimeOut } from "@/utils/customTimeOut";

import { toast } from "sonner";
import { Card, CardContent, Typography } from "@mui/material";
import Loading from "@/components/UI/LoadingBar";

import {
  useChangeOrganizationLogoMutation,
  useGetFirstOrganizationQuery,
} from "@/redux/api/organization/organizationApi";
import { modifyPayload } from "@/utils/modifyPayload";
import OrganizationLogoField, { TOrgData } from "./OrganizationLogoField";

export type TLogoPayload = {
  previous_primary_key?: string;
  previous_secondary_key?: string;
  primary_logo?: File;
  secondary_logo?: File;
};

const OrganizationLogo = () => {
  // Fetching user data from the API
  const { data, isLoading } = useGetFirstOrganizationQuery("");
  const business_data = data?.data?.business;

  // API hook to update profile picture
  const [changeLogo, { isLoading: isLogoUpdateLoading }] =
    useChangeOrganizationLogoMutation();

  // Function to handle for update user profile picture
  const handleImageUpload = async (data: TLogoPayload) => {
    if (!data) return;
    const toastId = toast.loading("Please wait...");
    const payload = modifyPayload(data);

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

  if (isLoading) {
    return <Loading />;
  }

  const primary_logo_Field_data: TOrgData = {
    label: "Primary",
    logo: business_data?.primary_logo,
    name: business_data?.name,
    tag_line: business_data?.tag_line,
    type: "primary_logo",
  };

  const secondary_logo_Field_data: TOrgData = {
    label: "Secondary",
    logo: business_data?.secondary_logo,
    name: business_data?.name,
    tag_line: business_data?.tag_line,
    type: "secondary_logo",
  };

  return (
    <>
      {/* Logos */}
      <Card>
        {/* Primary Logo Field  */}
        <OrganizationLogoField
          org_data={primary_logo_Field_data}
          onImageUpload={handleImageUpload}
          isUploading={isLogoUpdateLoading}
        />

        {/* Secondary Logo Field  */}
        <OrganizationLogoField
          org_data={secondary_logo_Field_data}
          onImageUpload={handleImageUpload}
          isUploading={isLogoUpdateLoading}
        />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            {business_data?.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {business_data?.tag_line}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default OrganizationLogo;
