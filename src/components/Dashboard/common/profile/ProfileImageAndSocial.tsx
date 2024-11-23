import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const ProfileImageAndSocial = () => {
  const social_links = {
    facebook: "https://facebook.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    linkedIn: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
  };

  return (
    <>
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
            <TextField
              fullWidth
              defaultValue={social_links.facebook}
              id="fullWidth"
              size="small"
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
            <TextField
              fullWidth
              defaultValue={social_links.twitter}
              id="fullWidth"
              size="small"
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
            <TextField
              fullWidth
              defaultValue={social_links.linkedIn}
              id="fullWidth"
              size="small"
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
            <TextField
              fullWidth
              defaultValue={social_links.instagram}
              id="fullWidth"
              size="small"
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default ProfileImageAndSocial;
