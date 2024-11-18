"use client";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  CardHeader,
  Grid2,
  Stack,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

type TProps = {
  userId: String;
};

const UserDetailsPage = ({ userId }: TProps) => {
  const userInfo = [
    { label: "Name", value: "Md Rakibul Hasan" },
    { label: "Department", value: "Developer" },
    { label: "Designation", value: "Senior Developer" },
    { label: "Email", value: "rakibul@example.com" },
    { label: "Web Mail", value: "rakibul@example.com" },
    { label: "Gender", value: "Male" },
    { label: "Phone", value: "+1234567890" },
  ];

  return (
    <Grid2 container spacing={2} sx={{ m: "30px 60px" }}>
      <Grid2 size={{ xs: 12 }}>
        {/* User profile card */}
        <Card
          sx={{
            width: { xs: "100%" },
            textAlign: "center",
            borderRadius: 1,
            padding: 2,
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
              src="https://via.placeholder.com/150"
              alt="Profile Picture"
              sx={{ width: 100, height: 100 }}
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
              Anna Adame
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lead Designer / Developer
            </Typography>
          </CardContent>
        </Card>

        {/* User address information */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ mb: 2, textAlign: "center" }}
          >
            User Information
          </Typography>

          <Stack spacing={3} sx={{ textAlign: "center", mx: 3 }}>
            {/* Using Stack for consistent vertical spacing */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h6" component="div">
                Present Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                123 Main Street, Apt 4B, Springfield, IL 62704
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="h6" component="div">
                Permanent Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                456 Oak Avenue, Apt 12C, Springfield, IL 62704
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h6" component="div">
                Registered Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                789 Pine Road, Springfield, IL 62704
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* User social media */}
        <Box sx={{ mt: 4 }}>
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
            <span>
              <FacebookIcon />
            </span>
            <span>
              <LinkedInIcon />
            </span>
            <span>
              <GitHubIcon />
            </span>
            <span>
              <TwitterIcon />
            </span>
          </Stack>
        </Box>
      </Grid2>

      {/* User personal details */}
      <Grid2 container size={{ xs: 12, md: 4 }} sx={{ alignItems: "center" }}>
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Personal Info
          </Typography>

          <Box sx={{ textAlign: "center", mx: 3 }}>
            {/* Using Stack for consistent vertical spacing */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: 2,
              }}
            >
              <Typography variant="h6" component="div">
                Present Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                123 Main Street, Apt 4B, Springfield, IL 62704
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: 2,
              }}
            >
              <Typography variant="h6" component="div">
                Permanent Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                456 Oak Avenue, Apt 12C, Springfield, IL 62704
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography variant="h6" component="div">
                Registered Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                789 Pine Road, Springfield, IL 62704
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default UserDetailsPage;
