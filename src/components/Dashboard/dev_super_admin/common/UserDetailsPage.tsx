"use client";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  CardHeader,
  Stack,
  Grid2,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useGetSingleAdminQuery } from "@/redux/api/user/adminAip";
import Loading from "@/components/ui/LoadingBar";

type TProps = {
  userId: String;
};

type TInfoRowProps = {
  label: string;
  value: string | undefined;
};

const InfoRow = ({ label, value }: TInfoRowProps) => (
  <Box sx={{ display: "flex", gap: 1, textAlign: "left" }}>
    <Typography variant="subtitle1" fontWeight="bold">
      {label}:
    </Typography>
    <Typography variant="subtitle1">{value}</Typography>
  </Box>
);

const UserDetailsPage = ({ userId }: TProps) => {
  const { data, isLoading } = useGetSingleAdminQuery(userId);
  console.log(data?.data);
  const {
    profile_image,
    name,
    email,
    web_mail,
    gender,
    phone,
    designation,
    department,
    permanentAddress,
  } = data?.data || {};
  console.log(profile_image, name);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            marginTop: 6,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid2 container spacing={2} sx={{ maxWidth: "lg", width: "100%" }}>
            {/* User avatar */}
            <Grid2 size={{ xs: 12, lg: 5 }}>
              {/* User profile card */}
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
                    src={profile_image}
                    alt="Profile Picture"
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
                    {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lead Designer / Developer
                  </Typography>
                </CardContent>
                <Stack
                  spacing={4}
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FacebookIcon />
                  <LinkedInIcon />
                  <GitHubIcon />
                  <TwitterIcon />
                </Stack>
              </Card>

              {/* User social media */}
              {/* <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ mb: 2, textAlign: "center" }}
                >
                  Social
                </Typography>
                <Stack
                  spacing={4}
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FacebookIcon />
                  <LinkedInIcon />
                  <GitHubIcon />
                  <TwitterIcon />
                </Stack>
              </Box> */}
            </Grid2>

            {/* Details */}
            <Grid2 size={{ xs: 12, lg: 7 }}>
              <Box ml={6}>
                {name && <InfoRow label="Full Name" value={name} />}
                {gender && <InfoRow label="Gender" value={gender} />}
                {email && <InfoRow label="Email Address" value={email} />}
                {web_mail && <InfoRow label="Web Mail" value={web_mail} />}
                {phone && <InfoRow label="Phone Number" value={phone} />}
                {department?.title && (
                  <InfoRow label="Department" value={department?.title} />
                )}
                {designation?.title && (
                  <InfoRow label="Designation" value={designation?.title} />
                )}
                {permanentAddress && (
                  <InfoRow
                    label="Address"
                    value={`${permanentAddress?.address_line}, ${permanentAddress?.city}, ${permanentAddress?.state}, ${permanentAddress?.country?.name}`}
                  />
                )}
                {/* <Grid2 container>
                  <Grid2 size={{ xs: 12, lg: 6 }}></Grid2>
                  <Grid2 size={{ xs: 12, lg: 6 }}></Grid2>
                </Grid2> */}
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      )}
    </>
  );
};

export default UserDetailsPage;
