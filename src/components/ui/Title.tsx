import { Box, capitalize, Typography } from "@mui/material";

const Title = ({ title }: { title: string }) => {
  return (
    <Box bgcolor="primary.main">
      <Typography
        textAlign={"center"}
        color={"white"}
        fontWeight={600}
        py={2}
        className="capitalize"
        sx={{
          fontSize: {
            xs: "24px",
            md: "36px",
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Title;
