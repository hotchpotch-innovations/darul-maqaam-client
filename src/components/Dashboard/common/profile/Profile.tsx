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

import { getUserInfoFromLocalStorage } from "@/services/auth.Services.Loacl";
import { useGetMyProfileQuery } from "@/redux/api/user/userApi";

const Profile = () => {
  // State variables for handling active tab and country IDs
  const [value, setValue] = useState(0);
  const [presentCountryId, setPresentCountryId] = useState(null);
  const [permanentCountryId, setPermanentCountryId] = useState(null);

  // Fetching user data from the API
  const { data, isLoading } = useGetMyProfileQuery("");
  console.log(data?.data);

  // User data role from localStorage
  const userRole = getUserInfoFromLocalStorage();

  // Handle tab changes
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Function to handle profile update
  const handleUpdate = async (values: FieldValues) => {
    console.log(values);
  };

  // Default form values
  const default_values = {
    departmentId: 101,
    name: "John Doe",
    gender: "Male",
    web_mail: "admin@example.com",
    phone: "+1 234 567 890",
    designationId: 202,

    present_address: {
      countryId: 1,
      state: "California",
      city: "Los Angeles",
      address_line: "123 Sunset Blvd, Apt 101",
    },

    permanent_address: {
      countryId: 1,
      state: "Texas",
      city: "Houston",
      address_line: "456 Oak Street, Suite 202",
    },

    // social_links: {
    //   facebook: "https://facebook.com/johndoe",
    //   twitter: "https://twitter.com/johndoe",
    //   linkedIn: "https://linkedin.com/in/johndoe",
    //   instagram: "https://instagram.com/johndoe",
    // },
  };

  return (
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

            {userRole?.role !== "CLIENT" && (
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
            )}
          </Box>
        </Grid>

        {/* Personal details */}
        <Grid
          size={{ xs: 12, lg: 8 }}
          sx={{
            p: 2,
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
              <CMForm onSubmit={handleUpdate} defaultValues={default_values}>
                <Stack spacing={2}>
                  <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
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

                  <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
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
                  <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
                    <CMSelectWithWatch
                      name="present_address.countryId"
                      label={"Country"}
                      // options={present_country_options}
                      setState={setPresentCountryId}
                    />
                    <CMInput
                      name="present_address.state"
                      fullWidth={true}
                      label="State"
                      size="small"
                    />
                  </Stack>
                  <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
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
                  {/* Present Address End */}

                  {/* Permanent Address Start */}
                  <Typography pt={2} variant="body1" fontWeight="500">
                    Permanent Address:
                  </Typography>
                  <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
                    <CMSelectWithWatch
                      name="permanent_address.countryId"
                      label={"Country"}
                      // options={}
                      setState={setPermanentCountryId}
                    />
                    <CMInput
                      name="permanent_address.state"
                      fullWidth={true}
                      label="State"
                      size="small"
                    />
                  </Stack>
                  <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
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
                    // disabled={isUpdateLoading}
                    sx={{
                      mt: "30px",
                    }}
                  >
                    Update
                  </Button>
                </Box>
              </CMForm>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Item Two
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
