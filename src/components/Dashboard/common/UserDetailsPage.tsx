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

type TInfoRowProps = {
  label: string;
  value: string | undefined;
};

type TProps = {
  isLoading: boolean;
  userData: Record<string, any>;
};

const InfoRow = ({ label, value }: TInfoRowProps) => (
  <Box sx={{ display: "flex", gap: 1, textAlign: "left" }}>
    <Typography variant="subtitle1" fontWeight="bold">
      {label}:
    </Typography>
    <Typography variant="subtitle1">{value}</Typography>
  </Box>
);

const UserDetailsPage = ({ isLoading, userData }: TProps) => {
  const {
    name,
    profile_image,
    gender,
    email,
    web_mail,
    phone,
    department,
    designation,
    permanentAddress,

    // Client data
    owner_name,
    father_name,
    mother_name,
    incorporation,
    e_bin,
    e_tin,
    nid,
    trade_license,
    circle,
    name_of_entity, //company name
    clientType,
  } = userData || {};

  //
  const userInfo = {
    "Full Name": name || owner_name,
    Gender: gender,
    "Email Address": email,
    "Web Mail": web_mail,
    "Phone Number": phone,
    Department: department?.title ?? null,
    Designation: designation?.title ?? null,
    Address: permanentAddress
      ? `${permanentAddress.address_line}, ${permanentAddress.city ?? ""}, ${
          permanentAddress.state ?? ""
        }, ${permanentAddress.country?.name ?? ""}`.trim()
      : null,
    "Father's Name": father_name,
    "Mother's Name": mother_name,
    Incorporation: incorporation,
    "E-BIN": e_bin,
    "E-TIN": e_tin,
    NID: nid,
    "Trade License": trade_license,
    Circle: circle,
    "Company Name": name_of_entity,
  };

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

                  {(designation || clientType) && (
                    <Typography variant="body2" color="text.secondary">
                      {designation?.title || clientType?.title}
                    </Typography>
                  )}
                </CardContent>
                <Stack
                  spacing={4}
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "25px",
                  }}
                >
                  <FacebookIcon />
                  <LinkedInIcon />
                  <GitHubIcon />
                  <TwitterIcon />
                </Stack>
              </Card>
            </Grid2>

            {/* Details */}
            <Grid2 size={{ xs: 12, lg: 7 }}>
              <Box ml={6} mt={5}>
                {Object.entries(userInfo).map(
                  ([label, value]) =>
                    value && (
                      <InfoRow
                        key={label}
                        label={label}
                        value={value.toString()}
                      />
                    )
                )}
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      )}
    </>
  );
};

export default UserDetailsPage;
