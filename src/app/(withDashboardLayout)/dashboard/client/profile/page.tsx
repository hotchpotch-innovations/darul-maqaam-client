"use client";

// Importing custom components and utilities
import {
  a11yProps,
  CustomTabPanel,
} from "@/components/Dashboard/common/profile/ProfileTab";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SyntheticEvent, useState } from "react";
import { FieldValues } from "react-hook-form";
import CMInput from "@/components/forms/CMInput";
import CMForm from "@/components/forms/CMForm";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";

// Importing the function to get user info from localStorage
import { getUserInfoFromLocalStorage } from "@/services/auth.Services.Loacl";

// API hook to fetch user profile data
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/user/userApi";

// API hook to fetch country options
import { useCountryOptions } from "@/hooks/useCountryOptions";
import Loading from "@/components/ui/LoadingBar";
import { toast } from "sonner";
import { customTimeOut } from "@/utils/customTimeOut";
import Image from "next/image";

type TAddress = {
  countryId?: string;
  state?: string;
  city?: string;
  address_line?: string;
};
const ClientProfile = () => {
  // State variables for handling active tab and country IDs
  const [value, setValue] = useState(0);
  const [presentCountryId, setPresentCountryId] = useState(null);
  const [permanentCountryId, setPermanentCountryId] = useState(null);
  const [registerCountryId, setRegisterCountryId] = useState(null);

  // Fetching user data from the API
  const { data, isLoading } = useGetMyProfileQuery("");
  const client_data = data?.data;
  console.log(client_data);

  // API hook to update client data
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateMyProfileMutation();

  // Country options
  const { options: country_options } = useCountryOptions();

  // Function to handle tab switch
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Utility function to create address data
  const createAddressData = (address: {
    countryId?: string;
    state?: string;
    city?: string;
    address_line?: string;
  }): TAddress => {
    const addressData: TAddress = {};

    if (address.countryId) addressData["countryId"] = address.countryId;
    if (address.state) addressData["state"] = address.state;
    if (address.city) addressData["city"] = address.city;
    if (address.address_line)
      addressData["address_line"] = address.address_line;

    return addressData;
  };

  // Function to handle form submission for profile update
  const handleUpdate = async (values: FieldValues) => {
    const { present_address, permanent_address, register_address, ...data } =
      values;

    const toastId = toast.loading("Please wait...");

    // Creating address data for each address type
    const presentAddressData = createAddressData(present_address);
    const permanentAddressData = createAddressData(permanent_address);
    const registerAddressData = createAddressData(register_address);

    // Add addresses to payload only if all required fields are present
    if (Object.keys(presentAddressData).length > 0) {
      data["present_address"] = presentAddressData;
    }
    if (Object.keys(permanentAddressData).length > 0) {
      data["permanent_address"] = permanentAddressData;
    }
    if (Object.keys(registerAddressData).length > 0) {
      data["register_address"] = registerAddressData;
    }

    try {
      const res = await updateProfile({ ...data }).unwrap();
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

  // Default form values for user profile, used as initial form state
  const default_values = {
    name_of_entity: client_data?.name_of_entity,
    owner_name: client_data?.owner_name,
    phone: client_data?.phone,
    father_name: client_data?.father_name,
    mother_name: client_data?.mother_name,
    nid: client_data?.nid,
    trade_license: client_data?.trade_license,
    incorporation: client_data?.incorporation,
    e_tin: client_data?.e_tin,
    e_bin: client_data?.e_bin,
    zone: client_data?.zone,
    circle: client_data?.circle,

    present_address: {
      countryId: client_data?.presentAddress?.countryId,
      state: client_data?.presentAddress?.state,
      city: client_data?.presentAddress?.city,
      address_line: client_data?.presentAddress?.address_line,
    },

    permanent_address: {
      countryId: client_data?.permanentAddress?.countryId,
      state: client_data?.permanentAddress?.state,
      city: client_data?.permanentAddress?.city,
      address_line: client_data?.permanentAddress?.address_line,
    },

    register_address: {
      countryId: client_data?.registerAddress?.countryId,
      state: client_data?.registerAddress?.state,
      city: client_data?.registerAddress?.city,
      address_line: client_data?.registerAddress?.address_line,
    },
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box mt={6}>
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
            {/* Avatar */}
            <Grid
              size={{ xs: 12, lg: 4 }}
              sx={{
                p: 2,
                borderRadius: "8px",
              }}
            >
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
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={client_data?.profile_image}
                    alt={client_data?.owner_name}
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      border: "2px solid black",
                    }}
                  />
                  {/* <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: "calc(50% - 20px)",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  width: 40,
                  height: 40,
                }}
              >
                <CameraAltIcon fontSize="small" />
              </IconButton> */}
                </Box>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {client_data?.owner_name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {client_data?.clientType?.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Form */}
            <Grid
              size={{ xs: 12, lg: 8 }}
              sx={{
                p: 2,
                borderRadius: "8px",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  {/* Tabs for switching between Personal Details and Change Password */}
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Personal Details" {...a11yProps(0)} />
                    <Tab label="Address" {...a11yProps(1)} />
                  </Tabs>
                </Box>

                {/* Form for updating personal details and address */}
                <CMForm onSubmit={handleUpdate} defaultValues={default_values}>
                  <CustomTabPanel value={value} index={0}>
                    <Stack spacing={2}>
                      {/* Entity Name */}
                      <Stack>
                        <CMInput
                          name="name_of_entity"
                          fullWidth={true}
                          label="Company Name"
                          size="small"
                        />
                      </Stack>
                      {/* Name and Phone Fields */}
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMInput
                          name="owner_name"
                          fullWidth={true}
                          label="Name"
                          size="small"
                        />
                        <CMInput
                          name="phone"
                          fullWidth={true}
                          label="Gender"
                          size="small"
                        />
                      </Stack>
                      {/* Father and Mother Name Fields */}
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMInput
                          name="father_name"
                          fullWidth={true}
                          label="Father Name"
                          size="small"
                        />
                        <CMInput
                          name="mother_name"
                          fullWidth={true}
                          label="Mother Name"
                          size="small"
                        />
                      </Stack>

                      {/* NID and Trade License Fields */}
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMInput
                          name="nid"
                          fullWidth={true}
                          label="NID No"
                          size="small"
                        />
                        <CMInput
                          name="trade_license"
                          fullWidth={true}
                          label="Trade License"
                          size="small"
                        />
                      </Stack>

                      {/* NID and Trade License Fields */}
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMInput
                          name="e_tin"
                          fullWidth={true}
                          label="E-TIN No"
                          size="small"
                        />
                        <CMInput
                          name="e_bin"
                          fullWidth={true}
                          label="E-BIN No"
                          size="small"
                        />
                      </Stack>

                      {/* NID and Trade License Fields */}
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMInput
                          name="incorporation"
                          fullWidth={true}
                          label="Incorporation"
                          size="small"
                        />
                        <CMInput
                          name="zone"
                          fullWidth={true}
                          label="Zone"
                          size="small"
                        />
                      </Stack>
                    </Stack>
                  </CustomTabPanel>

                  <CustomTabPanel value={value} index={1}>
                    <Stack spacing={2}>
                      {/* Present Address Section */}
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

                      {/* Permanent Address Section */}
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

                      {/* Register Address Section */}
                      <Typography pt={2} variant="body1" fontWeight="500">
                        Register Address:
                      </Typography>
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMSelectWithWatch
                          name="register_address.countryId"
                          label={"Country"}
                          options={country_options}
                          setState={setRegisterCountryId}
                        />
                        <CMInput
                          name="register_address.state"
                          fullWidth={true}
                          label="State"
                          size="small"
                          required={!!registerCountryId}
                        />
                      </Stack>
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", lg: "row" }}
                      >
                        <CMInput
                          name="register_address.city"
                          fullWidth={true}
                          label="City"
                          size="small"
                          required={!!registerCountryId}
                        />

                        <CMInput
                          name="register_address.address_line"
                          fullWidth={true}
                          label="Address Line"
                          size="small"
                          required={!!registerCountryId}
                        />
                      </Stack>
                    </Stack>
                  </CustomTabPanel>
                  {/* Submit button to update both tabs */}
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
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ClientProfile;
