import { Box, Tab, Tabs } from "@mui/material";
import Grid from "@mui/material/Grid2";

import ProfileImageAndSocial from "./utils/ProfileImageAndSocial";
import ProfileData from "./utils/ProfileData";
import ProfileTab from "./utils/ProfileTab";

const UserProfile = () => {
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
            // backgroundColor: "lightblue",
            // boxShadow: 3,
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
            // backgroundColor: "lightblue",
            // boxShadow: 3,
            borderRadius: "8px",
          }}
        >
          <ProfileTab />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
