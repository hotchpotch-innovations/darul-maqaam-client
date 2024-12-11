import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
type TCardProps = {
  _id?: string;
  image?: string;
  found?: string;
  donationDetails?: string;
};

const OnGoingCard = ({ data }: { data: TCardProps }) => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={4}
      className="  bg-green-500 hover:shadow-xl transition-all duration-500 border-gray-300 border-[1px] max-w-[420px] "
    >
      <Image
        src={data?.image ? data.image : ""}
        alt="Card Image"
        height={300}
        width={200}
        className="rounded-se-[50px] rounded-es-[50px] w-full "
      />
      <Box px={2} pb={4} bgcolor={"white"}>
        <Typography
          color={"primary.main"}
          align="center"
          variant="h6"
          pt={3}
          pb={1}
        >
          {data.found}
        </Typography>
        <Typography fontSize={14} className="text-justify pb-8 text-gray-500">
          {data.donationDetails}
        </Typography>
      </Box>
    </Grid>
  );
};

export default OnGoingCard;
