"use client";
import {
  a11yProps,
  TabPanel,
} from "@/components/Dashboard/common/tabPanel/TabPanel";
import { Box, Tab, Tabs } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { SyntheticEvent, useState } from "react";
import OrganizationBuisness from "./OrganizationBuisness";
import OrganizationSocial from "./OrganizationSocial";
import OrganizationFooter from "./OrganizationFooter";
import OrganizationLogo from "./OrganizationLogo";
import OrganizationGetUs from "./OrganizationGetUs";

const ManageOrganization = () => {
  // Tab change
  const [value, setValue] = useState(0);
  // Handle tab changes
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        {/* Logo */}
        <Grid
          size={{ xs: 12, lg: 4 }}
          sx={{
            borderRadius: "8px",
            width: "100%",
            mt: { xs: 0, lg: 6 },
          }}
        >
          <OrganizationLogo />
        </Grid>

        {/* Business details */}
        <Grid
          size={{ xs: 12, lg: 8 }}
          sx={{
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
                <Tab label="Business Details" {...a11yProps(0)} />
                <Tab label="Socail Links" {...a11yProps(1)} />
                <Tab label="Footer Links" {...a11yProps(2)} />
                <Tab label="Footer Get Us" {...a11yProps(3)} />
              </Tabs>
            </Box>

            {/* Business Details */}
            <TabPanel value={value} index={0}>
              <OrganizationBuisness />
            </TabPanel>

            {/* Social Links */}
            <TabPanel value={value} index={1}>
              <OrganizationSocial />
            </TabPanel>

            {/* Footer Links */}
            <TabPanel value={value} index={2}>
              <OrganizationFooter />
            </TabPanel>

            {/* Footer Get Us */}
            <TabPanel value={value} index={3}>
              <OrganizationGetUs />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManageOrganization;
