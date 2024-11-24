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
import { useGetMyProfileQuery } from "@/redux/api/user/userApi";

// API hook to fetch country options
import { useCountryOptions } from "@/hooks/useCountryOptions";
import Loading from "@/components/ui/LoadingBar";

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

  // User data role from localStorage
  const userRole = getUserInfoFromLocalStorage();

  // Country options
  const { options: country_options } = useCountryOptions();

  // Function to handle tab switch
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Function to handle form submission for profile update
  const handleUpdate = async (values: FieldValues) => {
    console.log(values);
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
      countryId: client_data?.present_address?.countryId,
      state: client_data?.present_address?.state,
      city: client_data?.present_address?.city,
      address_line: client_data?.present_address?.address_line,
    },
    permanent_address: {
      countryId: client_data?.permanent_address?.countryId,
      state: client_data?.permanent_address?.state,
      city: client_data?.permanent_address?.city,
      address_line: client_data?.permanent_address?.address_line,
    },
    register_address: {
      countryId: client_data?.register_address?.countryId,
      state: client_data?.register_address?.state,
      city: client_data?.register_address?.city,
      address_line: client_data?.register_address?.address_line,
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 220,
                }}
              >
                <CardActionArea sx={{ paddingTop: "20px" }}>
                  <Stack sx={{ alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "red" }}>MRH</Avatar>
                  </Stack>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "center" }}
                    >
                      Lizard
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", textAlign: "center" }}
                    >
                      Developer
                    </Typography>
                  </CardContent>
                </CardActionArea>
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
                        />

                        <CMInput
                          name="present_address.address_line"
                          fullWidth={true}
                          label="Address Line"
                          size="small"
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
                        />

                        <CMInput
                          name="permanent_address.address_line"
                          fullWidth={true}
                          label="Address Line"
                          size="small"
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
                        />

                        <CMInput
                          name="register_address.address_line"
                          fullWidth={true}
                          label="Address Line"
                          size="small"
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
                      // disabled={isUpdateLoading}
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
