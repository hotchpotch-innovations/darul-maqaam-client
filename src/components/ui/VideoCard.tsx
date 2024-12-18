import { Box, Grid, Typography } from "@mui/material";

const VideoCard = ({ data }: { data: Record<string, any> }) => {
  return (
    <Grid item xs={12} sm={6} md={4} paddingY={2}>
      <Box>
        <iframe
          width="100%"
          height="315"
          src={data?.yt_video_url || ""}
          style={{ border: "none", borderRadius: "6px" }}
        ></iframe>
        <Typography variant="h6" fontSize={18} textAlign={"center"}>
          {data?.title}
        </Typography>
      </Box>
    </Grid>
  );
};

export default VideoCard;
