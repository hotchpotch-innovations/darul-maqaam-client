"use client";
// Icons Import
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  a11yProps,
  CustomTabPanel,
} from "@/components/Dashboard/common/profile/ProfileTab";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { FieldValues } from "react-hook-form";
import CMInput from "@/components/forms/CMInput";
import CMForm from "@/components/forms/CMForm";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import Loading from "@/components/ui/LoadingBar";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";

import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/user/userApi";
import { useCountryOptions } from "@/hooks/useCountryOptions";
import { toast } from "sonner";
import { customTimeOut } from "@/utils/customTimeOut";
import { TAddress, TSocialLinkPayload } from "@/types";
import CMStateFileInput from "@/components/forms/without_form_state_fields/CMStateFileInput";
import styled from "@emotion/styled";

const PrivateUserProfile = () => {
  // State variables for handling active tab and country IDs
  const [value, setValue] = useState(0);
  const [presentCountryId, setPresentCountryId] = useState(null);
  const [permanentCountryId, setPermanentCountryId] = useState(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  console.log(profileImage);

  // Fetching user data from the API
  const { data, isLoading } = useGetMyProfileQuery("");
  const user_data = data?.data;
  console.log(user_data);

  // API hook to update client data
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateMyProfileMutation();

  // Country options
  const { options: country_options } = useCountryOptions();

  // Handle tab changes
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Utility function to filter out undefined or empty values from an object
  const filterUndefinedValues = (obj: Record<string, any>) => {
    return Object.entries(obj)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .reduce((acc, [key, value]) => {
        // @ts-ignore
        acc[key] = value;
        return acc;
      }, {});
  };

  // Function to handle profile update
  const handleUpdate = async (values: FieldValues) => {
    const { present_address, permanent_address, social_links, ...data } =
      values;

    const toastId = toast.loading("Please wait...");

    // Filter the address and social link data, only including fields with valid values
    const presentAddressData: TAddress = filterUndefinedValues(present_address);
    const permanentAddressData: TAddress =
      filterUndefinedValues(permanent_address);
    const socialLinkData: TSocialLinkPayload =
      filterUndefinedValues(social_links);

    // Construct the final payload, including address and social data only if they are not empty
    const payload: FieldValues = {
      ...data,
      ...(Object.keys(presentAddressData).length > 0 && {
        present_address: presentAddressData,
      }),
      ...(Object.keys(permanentAddressData).length > 0 && {
        permanent_address: permanentAddressData,
      }),
      ...(Object.keys(socialLinkData).length > 0 && {
        social_links: socialLinkData,
      }),
    };
    console.log(payload);
    try {
      const res = await updateProfile({ ...payload }).unwrap();
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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  // Default form values
  const default_values = {
    name: user_data?.name,
    web_mail: user_data?.web_mail,
    gender: user_data?.gender,
    phone: user_data?.phone,

    present_address: {
      countryId: user_data?.presentAddress?.countryId,
      state: user_data?.presentAddress?.state,
      city: user_data?.presentAddress?.city,
      address_line: user_data?.presentAddress?.address_line,
    },

    permanent_address: {
      countryId: user_data?.permanentAddress?.countryId,
      state: user_data?.permanentAddress?.state,
      city: user_data?.permanentAddress?.city,
      address_line: user_data?.permanentAddress?.address_line,
    },

    social_links: {
      facebook: user_data?.socialLink?.facebook,
      twitter: user_data?.socialLink?.twitter,
      linkedIn: user_data?.socialLink?.linkedIn,
      instagram: user_data?.socialLink?.instagram,
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
                      <Box sx={{ position: "relative" }}>
                        <Avatar
                          src={user_data?.profile_image}
                          alt={user_data?.name}
                          sx={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            border: "2px solid black",
                          }}
                        />

                        <IconButton
                          sx={{
                            position: "absolute",
                            right: 5,
                            bottom: -2,
                            backgroundColor: "#dce0dd",
                            border: "1px solid #bbb",
                            borderRadius: "50%",
                            boxShadow: "none",
                            width: 30,
                            height: 30,
                            zIndex: 1,
                            "&:hover": {
                              backgroundColor: "#f0f0f0",
                              borderColor: "#bbb",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                            },
                          }}
                          component="label"
                        >
                          <CameraAltSharpIcon fontSize="small"></CameraAltSharpIcon>
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ) => {
                              const selectedFile = event.target.files
                                ? event.target.files[0]
                                : null;
                              setProfileImage(selectedFile);

                              // const files = event?.target?.files;
                              // if (!files) return;
                              // return setProfileImage(files[0]);
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {user_data?.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {user_data?.designation?.title}
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
                    </Stack>
                  </Box>
                </Box>
              </Grid>

              {/* Personal details */}
              <Grid
                size={{ xs: 12, lg: 8 }}
                sx={{
                  mt: { xs: 0, lg: 6.5 },
                  borderRadius: "8px",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Personal Details" {...a11yProps(0)} />
                      <Tab label="Change Password" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <Stack spacing={2}>
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMInput
                          name="name"
                          fullWidth={true}
                          label="Name"
                          size="small"
                        />
                        <CMInput
                          name="gender"
                          fullWidth={true}
                          label="Gender"
                          size="small"
                        />
                      </Stack>

                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMInput
                          name="web_mail"
                          fullWidth={true}
                          label="Web Mail"
                          size="small"
                          readOnly={true}
                        />
                        <CMInput
                          name="phone"
                          fullWidth={true}
                          label="Phone"
                          size="small"
                        />
                      </Stack>

                      {/* Present Address Start */}
                      <Typography pt={2} variant="body1" fontWeight="500">
                        Present Address:
                      </Typography>
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMSelectWithWatch
                          name="present_address.countryId"
                          label={"Country"}
                          options={country_options}
                          setState={setPresentCountryId}
                        />
                        <CMInput
                          name="present_address.state"
                          fullWidth={true}
                          label="State"
                          size="small"
                          required={!!presentCountryId}
                        />
                      </Stack>
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMInput
                          name="present_address.city"
                          fullWidth={true}
                          label="City"
                          size="small"
                          required={!!presentCountryId}
                        />

                        <CMInput
                          name="present_address.address_line"
                          fullWidth={true}
                          label="Address Line"
                          size="small"
                          required={!!presentCountryId}
                        />
                      </Stack>
                      {/* Present Address End */}

                      {/* Permanent Address Start */}
                      <Typography pt={2} variant="body1" fontWeight="500">
                        Permanent Address:
                      </Typography>
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMSelectWithWatch
                          name="permanent_address.countryId"
                          label={"Country"}
                          options={country_options}
                          setState={setPermanentCountryId}
                        />
                        <CMInput
                          name="permanent_address.state"
                          fullWidth={true}
                          label="State"
                          size="small"
                          required={!!permanentCountryId}
                        />
                      </Stack>
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMInput
                          name="permanent_address.city"
                          fullWidth={true}
                          label="City"
                          size="small"
                          required={!!permanentCountryId}
                        />

                        <CMInput
                          name="permanent_address.address_line"
                          fullWidth={true}
                          label="Address Line"
                          size="small"
                          required={!!permanentCountryId}
                        />
                      </Stack>
                      {/* Permanent Address End */}
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
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    Item Two
                  </CustomTabPanel>
                </Box>
              </Grid>
            </Grid>
          </CMForm>
        </Box>
      )}
    </>
  );
};

export default PrivateUserProfile;
