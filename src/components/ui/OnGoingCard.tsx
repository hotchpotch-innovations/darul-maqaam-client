import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

const OnGoingCard = ({ data }: { data: Record<string, any> }) => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={4}
      className="  bg-green-500 hover:shadow-xl transition-all duration-500 border-gray-300 border-[1px] h-[505px] max-w-[420px]"
    >
      <Image
        src={data?.cover_image?.url || ""}
        alt={data?.title || ""}
        height={300}
        width={200}
        className="rounded-se-[50px] rounded-es-[50px] h-[300px] w-full"
      />
      <Box px={2} pb={4} height={"200px"} bgcolor={"white"}>
        <Typography
          color={"primary.main"}
          align="center"
          variant="h6"
          pt={3}
          pb={1}
        >
          {data?.title}
        </Typography>
        <Typography fontSize={14} className="text-justify pb-8 text-gray-500">
          {data?.summary?.length > 200
            ? data?.summary?.slice(0, 200) + "..."
            : data?.summary}
        </Typography>
      </Box>
    </Grid>
  );
};

export default OnGoingCard;
