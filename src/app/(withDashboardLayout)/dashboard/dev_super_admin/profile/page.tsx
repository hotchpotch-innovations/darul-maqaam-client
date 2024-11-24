"use client";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect } from "react";
import { useGetMyProfileQuery } from "@/redux/api/user/userApi";
import { setLoading, setUser } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";

import ProfileImageAndSocial from "@/components/Dashboard/common/profile/ProfileImageAndSocial";
import ProfileTab from "@/components/Dashboard/common/profile/ProfileTab";

const SuperAdminProfile = () => {
  const { data, isLoading } = useGetMyProfileQuery("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));

    if (data?.data) {
      dispatch(setUser(data?.data));
    }
  }, [data, isLoading, dispatch]);

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
          <ProfileImageAndSocial />
        </Grid>

        {/* Personal details */}
        <Grid
          size={{ xs: 12, lg: 8 }}
          sx={{
            p: 2,
            borderRadius: "8px",
          }}
        >
          <ProfileTab />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperAdminProfile;
